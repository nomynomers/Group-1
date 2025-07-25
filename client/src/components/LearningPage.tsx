
import { useEffect, useState, useRef } from 'react';
import type { FC } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import YouTube from 'react-youtube';
import { useNavigate } from "react-router-dom";
declare global {
  interface Window {
    YT: any;
  }
}

interface Module {
  moduleID: number;
  courseID: number;
  moduleName: string;
  description: string;
  durationMinutes: number;
  content: string;
  videoUrl: string;
}

const LearningPage: FC = () => {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isVideoCompleted, setIsVideoCompleted] = useState(false);
  const [completedModules, setCompletedModules] = useState<boolean[]>([]);
  const maxWatchTimeRef = useRef(0);
  const playerRef = useRef<any>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isSeekingRef = useRef(false);

  const selectedModule = modules[selectedIndex];

  const handleVideoEnd = async () => {
    try {
      await axios.post('http://localhost:8080/api/progress/complete', {
        enrollId: localStorage.getItem("enrollId"),
        moduleId: selectedModule.moduleID,
        completionStatus: true,
        completionDate: new Date().toISOString()
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      setIsVideoCompleted(true);
      console.log("Marked as completed");

      setCompletedModules(prev => {
        const updated = [...prev];
        updated[selectedIndex] = true;
        return updated;
      });

      if (selectedIndex === modules.length - 1) {
        const res = await axios.get("http://localhost:8080/api/progress/course-complete", {
          params: {
            enrollId: localStorage.getItem("enrollId"),
            courseId: courseId
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        if (res.data.courseCompleted) {
          console.log("All modules completed. Navigating to course info...");
          navigate(`/courses/${courseId}`);
        }
      }

    } catch (error) {
      console.error("Failed to save progress", error);
    }
  };

  // const onPlayerReady = (event: any) => {
  //   playerRef.current = event.target;

  //   if (intervalRef.current) {
  //     clearInterval(intervalRef.current);
  //   }



  //   intervalRef.current = setInterval(() => {
  //     if (playerRef.current && playerRef.current.getCurrentTime) {
  //       const currentTime = playerRef.current.getCurrentTime();

  //       if (!isSeekingRef.current && currentTime > maxWatchTimeRef.current + 2) {
  //         isSeekingRef.current = true;
  //         playerRef.current.seekTo(maxWatchTimeRef.current, true);
  //         setTimeout(() => {
  //           isSeekingRef.current = false;
  //         }, 1000);
  //       } else if (currentTime > maxWatchTimeRef.current) {
  //         maxWatchTimeRef.current = currentTime;
  //       }
  //     }

  //     console.log(playerRef.current.getCurrentTime(), maxWatchTimeRef.current)
  //   }, 1000);
  // };

  const onPlayerStateChange = (event: any) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      handleVideoEnd();
    }
  };

  const getYoutubeOpts = () => ({
    width: '1120',
    height: '630',
    playerVars: {
      autoplay: 0,
      controls: isVideoCompleted ? 1 : 0,
      // controls: 1,
      modestbranding: 1,
      rel: 0,
    },
  });


  useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await axios.get<Module[]>(`http://localhost:8080/api/modules/${courseId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setModules(res.data);

        const moduleCompletion: boolean[] = await Promise.all(
          res.data.map(async (mod) => {
            try {
              const response = await axios.get(`http://localhost:8080/api/progress/status`, {
                params: {
                  enrollId: localStorage.getItem("enrollId"),
                  moduleId: mod.moduleID
                },
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`
                }
              });
              return response.data.completionStatus === true || response.data.completionStatus === 1;
            } catch {
              return false;
            }
          })
        );

        setCompletedModules(moduleCompletion);
        setSelectedIndex(0);
      } catch (error) {
        console.error("Failed to load modules:", error);
      }
    };

    fetchModules();
  }, [courseId]);

  const goToNextModule = () => {
    if (selectedIndex < modules.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  useEffect(() => {
    const checkCompletionStatus = async () => {
      const enrollId = localStorage.getItem("enrollId");
      const moduleId = modules[selectedIndex]?.moduleID;

      if (!enrollId || !moduleId) return;

      try {
        const res = await axios.get(`http://localhost:8080/api/progress/status`, {
          params: {
            enrollId,
            moduleId
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        setIsVideoCompleted(res.data.completionStatus === true || res.data.completionStatus === 1);
      } catch (error) {
        console.error("Error checking completion status", error);
      }
    };

    checkCompletionStatus();
  }, [selectedIndex, modules]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const getYouTubeVideoId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : '';
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ width: '250px', backgroundColor: '#f0f1ff', padding: '1rem', marginTop: '4rem' }}>
        <h2 style={{ color: '#272b69', marginBottom: '1rem' }}>Modules</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {modules.map((mod, index) => (
            <li
              key={mod.moduleID}
              onClick={() => {
                const canAccess = index === 0 || completedModules.slice(0, index).every(Boolean);
                if (canAccess) {
                  setSelectedIndex(index);
                  maxWatchTimeRef.current = 0;
                } else {
                  alert("❗Please complete the current module before continuing.");
                }
              }}
              style={{
                padding: '0.75rem',
                backgroundColor: index === selectedIndex ? '#272b69' : 'transparent',
                color: index === selectedIndex ? '#fff' : '#000',
                cursor: 'pointer',
                borderRadius: '4px',
                marginBottom: '0.5rem',
              }}
            >
              {mod.moduleName}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ flex: 1, padding: '2rem', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginTop: '4rem', textAlign: 'left' }}>
        {selectedModule ? (
          <>
            <div>
              <Link to={`/courses/${courseId}`} style={{ display: 'block', marginBottom: '1rem', color: '#272b69', fontWeight: 'bold', textDecoration: 'none' }}>
                ← Back to Course
              </Link>
              <h2 style={{ fontSize: '1.8rem', color: '#272b69', marginBottom: '1rem' }}>
                {selectedModule.moduleName}
              </h2>
              <p style={{ fontStyle: 'italic', marginTop: '1rem', color: '#777' }}>
                Duration: {selectedModule.durationMinutes} minutes
              </p>
              <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.6' }}>
                {selectedModule.description}
              </p>

              <YouTube
                key={selectedModule.moduleID}
                videoId={getYouTubeVideoId(selectedModule.videoUrl)}
                opts={getYoutubeOpts()}
                onStateChange={onPlayerStateChange}
              />


              <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.6' }}>
                {selectedModule.content}
              </p>
            </div>
            <div>
              <button
                onClick={() => {
                  if (completedModules[selectedIndex]) {
                    goToNextModule();
                    maxWatchTimeRef.current = 0;
                  } else {
                    alert("Please complete the current module before continuing.");
                  }
                }}
                disabled={
                  selectedIndex >= modules.length - 1 ||
                  !completedModules[selectedIndex]
                }
                style={{
                  marginTop: '2rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor:
                    selectedIndex < modules.length - 1 && completedModules[selectedIndex]
                      ? '#272b69'
                      : '#ccc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor:
                    selectedIndex < modules.length - 1 && completedModules[selectedIndex]
                      ? 'pointer'
                      : 'not-allowed',
                  alignSelf: 'flex-start',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                }}
              >
                Next Module →
              </button>

              {isVideoCompleted && (
                <span style={{ color: 'green', fontWeight: 'bold', marginLeft: '30px' }}>
                  Module Completed!
                </span>
              )}
            </div>
          </>
        ) : (
          <p>Loading module content...</p>
        )}
      </div>
    </div>
  );
};

export default LearningPage;
