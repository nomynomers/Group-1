import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { useUser } from '../context/UserContext';

interface Article {
  articleID: number;
  articleName: string;
  description: string;
  category: string;
  durationMinutes: number;
  imageCover: string;
  authorName: string;
}

const ArticlesManage: FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/articles', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Articles from API:', data);
        setArticles(data);
      } else {
        setError('Failed to fetch articles');
      }
    } catch {
      setError('An error occurred while fetching articles');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/admin/articles/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        setArticles(articles.filter(a => a.articleID !== id));
      } else {
        setError('Failed to delete article');
      }
    } catch {
      setError('Error deleting article');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <AdminSidebar />

      <div style={{ padding: '20px 2rem 2rem', width: '100%', marginLeft: '300px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            onClick={() => navigate('/admin/articles/create')}
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
            Create New Article
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
        <h1 style={{ color: '#272b69', marginBottom: '2rem' }}>Article Management</h1>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          marginTop: '2rem'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            color: '#333'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Description</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Duration</th>
                <th style={thStyle}>Image</th>
                <th style={thStyle}>Author</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.length > 0 ? (
                articles.map(article => (
                  <tr key={article.articleID} style={{ borderBottom: '1px solid #dee2e6', backgroundColor: 'white' }}>
                    <td style={tdStyle}>{article.articleName}</td>
                    <td style={tdStyle}>{article.description}</td>
                    <td style={tdStyle}>{article.category}</td>
                    <td style={tdStyle}>{article.durationMinutes}</td>
                    <td style={tdStyle}>
                      <img src={article.imageCover} alt="cover" style={{ width: '80px', height: '50px', objectFit: 'cover' }} />
                    </td>
                    <td style={tdStyle}>{article.authorName}</td>
                    <td style={{ ...tdStyle, display: 'flex' }}>
                      <button
                        onClick={() => navigate(`/admin/articles/view/${article.articleID}`)}
                        style={actionButton('#17a2b8')}
                      >
                        View
                      </button>
                      <button
                        onClick={() => navigate(`/admin/articles/edit/${article.articleID}`)}
                        style={actionButton('#272b69')}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(article.articleID)}
                        style={actionButton('#dc3545')}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} style={{ padding: '1rem', textAlign: 'center', color: '#333' }}>
                    No articles found
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

const thStyle = {
  padding: '1rem',
  borderBottom: '1px solid #dee2e6',
  color: '#272b69'
};

const tdStyle = {
  padding: '1rem'
};

const actionButton = (color: string) => ({
  backgroundColor: color,
  color: 'white',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  marginRight: '0.5rem',
  cursor: 'pointer'
});

export default ArticlesManage;
