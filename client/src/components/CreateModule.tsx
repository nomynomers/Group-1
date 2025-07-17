import type { FC, FormEvent, ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface CreateModuleForm {
  courseID: number;
  moduleName: string;
  description: string;
  durationMinutes: number;
  content: string;
  videoUrl: string;
  moduleOrder: number;
}

const CreateModule: FC = () => {
  const navigate = useNavigate();
  const { courseID } = useParams();

  const [formData, setFormData] = useState<CreateModuleForm>({
    courseID: 0,
    moduleName: '',
    description: '',
    durationMinutes: 0,
    content: '',
    videoUrl: '',
    moduleOrder: '',
  });

  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    if (courseID) {
      setFormData(prev => ({
        ...prev,
        courseID: parseInt(courseID)
      }));
    }
  }, [courseID, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: id === 'durationMinutes' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/modules/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        navigate(`/admin/courses/${formData.courseID}/modules`);
      } else {
        const error = await response.json();
        setMessage(error.message || 'Failed to create module');
      }
    } catch (err) {
      setMessage('An error occurred while creating the module');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '120px 2rem 2rem', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ color: '#272b69', marginBottom: '2rem', fontSize: '2rem', fontWeight: '600' }}>
          Create New Module
        </h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {[ 
            { id: 'moduleName', label: 'Module Name', type: 'text' },
            { id: 'description', label: 'Description', type: 'textarea' },
            { id: 'durationMinutes', label: 'Duration (minutes)', type: 'number' },
            { id: 'content', label: 'Content', type: 'textarea' },
            { id: 'videoUrl', label: 'Video URL', type: 'text' },
            { id: 'moduleOrder', label: 'Module Order', type: 'number' },
          ].map(({ id, label, type }) => (
            <div key={id}>
              <label htmlFor={id} style={labelStyle}>{label}</label>
              {type === 'textarea' ? (
                <textarea
                  id={id}
                  value={(formData as any)[id]}
                  onChange={handleChange}
                  required
                  rows={4}
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
              {loading ? 'Creating...' : 'Create Module'}
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

const labelStyle = {
  display: 'block',
  marginBottom: '0.5rem',
  color: '#272b69'
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

export default CreateModule;
