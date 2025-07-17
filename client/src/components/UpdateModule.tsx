import type { FC, ChangeEvent, FormEvent } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface ModuleForm {
  courseID: number;
  moduleName: string;
  description: string;
  durationMinutes: number;
  content: string;
  videoUrl: string;
  moduleOrder: number;
}

const UpdateModule: FC = () => {
  const navigate = useNavigate();
  const { moduleID } = useParams();
  const [formData, setFormData] = useState<ModuleForm>({
    courseID: 0,
    moduleName: '',
    description: '',
    durationMinutes: 0,
    content: '',
    videoUrl: '',
    moduleOrder: 0,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchModule = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/modules/get/${moduleID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch module');

        const data = await res.json();
        setFormData({
          courseID: data.courseID,
          moduleName: data.moduleName,
          description: data.description,
          durationMinutes: data.durationMinutes,
          content: data.content,
          videoUrl: data.videoUrl,
          moduleOrder: data.moduleOrder,
        });
      } catch (err) {
        setMessage('Error loading module');
      }
    };

    fetchModule();
  }, [moduleID, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === 'durationMinutes' || id === 'moduleOrder' || id === 'courseID'
        ? parseInt(value)
        : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');

      const res = await fetch(`http://localhost:8080/api/modules/${moduleID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        navigate(`/admin/courses/${formData.courseID}/modules`);
      } else {
        const error = await res.json();
        setMessage(error.message || 'Failed to update module');
      }
    } catch (err) {
      setMessage('An error occurred while updating the module');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '120px 2rem 2rem', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <div style={{
        maxWidth: '700px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ color: '#272b69', marginBottom: '2rem', fontSize: '2rem', fontWeight: '600' }}>
          Update Module
        </h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {[
            { id: 'courseID', label: 'Course ID', type: 'number' },
            { id: 'moduleName', label: 'Module Name', type: 'text' },
            { id: 'description', label: 'Description', type: 'textarea' },
            { id: 'durationMinutes', label: 'Duration (minutes)', type: 'number' },
            { id: 'content', label: 'Content', type: 'textarea' },
            { id: 'videoUrl', label: 'Video URL', type: 'text' },
            { id: 'moduleOrder', label: 'Module Order', type: 'number' },
          ].map(({ id, label, type }) => (
            <div key={id}>
              <label htmlFor={id} style={{ display: 'block', marginBottom: '0.5rem', color: '#272b69' }}>
                {label}
              </label>
              {type === 'textarea' ? (
                <textarea
                  id={id}
                  value={(formData as any)[id]}
                  onChange={handleChange}
                  required
                  rows={3}
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              ) : (
                <input
                  type={type}
                  id={id}
                  value={(formData as any)[id]}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              )}
            </div>
          ))}

          {message && <div style={{ color: 'red', marginBottom: '1rem' }}>{message}</div>}

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button
              type="submit"
              disabled={loading}
              style={submitButtonStyle}
            >
              {loading ? 'Updating...' : 'Update Module'}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/admin/courses/${formData.courseID}/modules`)}
              style={cancelButtonStyle}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  borderRadius: '4px',
  border: '1px solid #ddd',
  fontSize: '1rem',
  backgroundColor: 'white',
  color: 'black',
};

const submitButtonStyle = {
  backgroundColor: '#272b69',
  color: 'white',
  border: 'none',
  padding: '0.75rem 1.5rem',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1rem',
  flex: 1
};

const cancelButtonStyle = {
  backgroundColor: '#6c757d',
  color: 'white',
  border: 'none',
  padding: '0.75rem 1.5rem',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1rem',
  flex: 1
};

export default UpdateModule;
