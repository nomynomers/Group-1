import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { useUser } from '../context/UserContext';


const thStyle = {
    padding: '1rem',
    borderBottom: '1px solid #dee2e6',
    color: '#272b69'
};

const tdStyle = {
    padding: '1rem',
    verticalAlign: 'top',
};

const editBtnStyle = {
    backgroundColor: '#272b69',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    marginRight: '0.5rem',
    cursor: 'pointer'
};

const deleteBtnStyle = {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer'
};


interface Module {
    moduleID: number;
    courseID: number;
    moduleName: string;
    description: string;
    durationMinutes: string;
    content: string;
    videoUrl: string;
    moduleOrder: number;
}

const ModuleList = () => {
    const { courseID } = useParams();
    const [modules, setModules] = useState<Module[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { user, setUser } = useUser();

    const [expandedModules, setExpandedModules] = useState<number[]>([]);


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        const fetchModules = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:8080/api/modules/${courseID}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setModules(data);
                } else {
                    setError('Failed to load modules');
                }
            } catch (err) {
                setError('Error fetching modules');
            } finally {
                setLoading(false);
            }
        };

        fetchModules();
    }, [courseID]);

    const toggleExpand = (id: number) => {
        setExpandedModules((prev) =>
            prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
        );
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/');
    };

    const handleDelete = async (moduleID: number) => {
        if (!window.confirm('Are you sure you want to delete this module?')) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/api/modules/${moduleID}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setModules(modules.filter((mod) => mod.moduleID !== moduleID));
            } else {
                setError('Failed to delete module');
            }
        } catch (err) {
            setError('An error occurred while deleting the module');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <AdminSidebar />

            <div style={{ padding: '20px 2rem 2rem', width: '100%', marginLeft: '300px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button
                        onClick={() => navigate(`/admin/courses/${courseID}/modules/create`)}
                        style={{
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '4px',
                            marginTop: '1rem',
                            cursor: 'pointer',
                            fontSize: '1rem',
                        }}
                    >
                        Create New Module
                    </button>
                    <button
                        onClick={handleLogout}
                        style={{
                            backgroundColor: 'white',
                            color: '#272b69',
                            border: 'none',
                            padding: '0.5rem 1.5rem',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        Logout
                    </button>
                </div>

                <h1 style={{ color: '#272b69', marginBottom: '2rem' }}>
                    Modules for Course #{courseID}
                </h1>

                <div
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        overflow: 'hidden',
                        marginTop: '2rem',
                    }}
                >
                    <table
                        style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            color: '#333',
                        }}
                    >
                        <colgroup>
                            <col style={{ width: '15%' }} />
                            <col style={{ width: '17%' }} />
                            <col style={{ width: '10%' }} />
                            <col style={{ width: '23%' }} />
                            <col style={{ width: '10%' }} />
                            <col style={{ width: '10%' }} />
                            <col style={{ width: '10%' }} />
                        </colgroup>
                        <thead>
                            <tr style={{ backgroundColor: '#f8f9fa' }}>
                                <th style={thStyle}>Module Name</th>
                                <th style={thStyle}>Description</th>
                                <th style={thStyle}>Duration Minutes</th>
                                <th style={thStyle}>Content</th>
                                <th style={thStyle}>Video URL</th>
                                <th style={thStyle}>Order</th>
                                <th style={thStyle}>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {modules.length > 0 ? (
                                modules.map((mod) => (
                                    <tr key={mod.moduleID} style={{ borderBottom: '1px solid #dee2e6', backgroundColor: 'white' }}>
                                        <td style={tdStyle}>{mod.moduleName}</td>
                                        <td style={tdStyle}>{mod.description}</td>
                                        <td style={tdStyle}>{mod.durationMinutes}</td>
                                        <td style={tdStyle}>
                                            <div style={{ maxWidth: '300px', overflowWrap: 'break-word', textAlign: 'justify' }}>
                                                {expandedModules.includes(mod.moduleID)
                                                    ? mod.content
                                                    : `${mod.content.slice(0, 100)}${mod.content.length > 100 ? '...' : ''}`
                                                }
                                                {mod.content.length > 100 && (
                                                    <button
                                                        onClick={() => toggleExpand(mod.moduleID)}
                                                        style={{
                                                            marginLeft: '0.5rem',
                                                            color: '#007bff',
                                                            background: 'none',
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                            fontSize: '0.9rem',
                                                            textDecoration: 'underline'
                                                        }}
                                                    >
                                                        {expandedModules.includes(mod.moduleID) ? 'Hide' : 'Show more'}
                                                    </button>
                                                )}
                                            </div>
                                        </td>

                                        <td style={tdStyle}>
                                            <a href={mod.videoUrl} target="_blank" rel="noopener noreferrer">
                                                Video
                                            </a>
                                        </td>
                                        <td style={tdStyle}>{mod.moduleOrder}</td>
                                        <td style={{ ...tdStyle, display: 'flex' }}>
                                            <button
                                                onClick={() => navigate(`/admin/modules/${mod.moduleID}/edit`)}
                                                style={editBtnStyle}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(mod.moduleID)}
                                                style={deleteBtnStyle}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} style={{ padding: '1rem', textAlign: 'center', color: '#333' }}>
                                        No modules found
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default ModuleList;
