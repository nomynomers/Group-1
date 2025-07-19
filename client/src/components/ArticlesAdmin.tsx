import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import AdminSidebar from './AdminSidebar';

interface Article {
  articleID: number;
  articleName: string;
  category: string;
  durationMinutes: number;
  imageCover: string;
  author: string;
}

const ArticleAdmin: FC = () => {
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
  }, [navigate]);

  const fetchArticles = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/articles', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setArticles(data);
      } else {
        setError('Unauthorized or failed to load articles.');
      }
    } catch (err) {
      setError('An error occurred while fetching articles.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteArticle = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/articles/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setArticles(articles.filter(article => article.articleID !== id));
      } else {
        setError('Failed to delete article.');
      }
    } catch (err) {
      setError('An error occurred while deleting article.');
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
                <th style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>Title</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>Category</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>Duration</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>Cover</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>Author</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles && articles.length > 0 ? (
                articles.map(article => (
                  <tr key={article.articleID} style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ padding: '1rem' }}>{article.articleName}</td>
                    <td style={{ padding: '1rem' }}>{article.category}</td>
                    <td style={{ padding: '1rem' }}>{article.durationMinutes} min</td>
                    <td style={{ padding: '1rem' }}>
                      <img src={article.imageCover} alt="cover" style={{ width: '80px', height: '50px', objectFit: 'cover' }} />
                    </td>
                    <td style={{ padding: '1rem' }}>{article.author}</td>
                    <td style={{ padding: '1rem', display: 'flex' }}>
                      <button
                        onClick={() => navigate(`/admin/articles/${article.articleID}`)}
                        style={{
                          backgroundColor: '#272b69',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '4px',
                          marginRight: '0.5rem',
                          cursor: 'pointer'
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteArticle(article.articleID)}
                        style={{
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={{ padding: '1rem', textAlign: 'center', color: '#333' }}>
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

export default ArticleAdmin;
