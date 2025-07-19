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
<<<<<<< Updated upstream
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
=======
  const [error, setError] = useState('');

  const fetchArticles = () => {
    const token = localStorage.getItem('token');

    axios.get('/api/admin/articles', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setArticles(res.data);
        setError('');
      })
      .catch(err => {
        console.error('Failed to fetch articles:', err);
        setError('Failed to load articles. Please make sure you are logged in as admin and your token is valid.');
      });
  };
>>>>>>> Stashed changes

    fetchArticles();
  }, [navigate]);

  const fetchArticles = async () => {
    try {
      const token = localStorage.getItem('token');
<<<<<<< Updated upstream
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
=======
      await axios.delete(`/api/admin/articles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchArticles(); // Refresh
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete article');
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#272b69]">Article Management</h2>
        <Link to="/admin/articles/create" className="bg-green-600 text-white px-4 py-2 rounded">
          Create New Article
        </Link>
      </div>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <table className="w-full border-collapse bg-white rounded-lg shadow overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Duration</th>
            <th className="p-4 text-left">Cover</th>
            <th className="p-4 text-left">Author</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map(article => (
            <tr key={article.articleID} className="border-t">
              <td className="p-4">{article.articleName}</td>
              <td className="p-4">{article.category}</td>
              <td className="p-4">{article.durationMinutes} min</td>
              <td className="p-4">
                <img src={article.imageCover} alt="cover" className="h-10 w-16 object-cover rounded" />
              </td>
              <td className="p-4">{article.authorName}</td>
              <td className="p-4 flex gap-2">
                <Link to={`/admin/articles/edit/${article.articleID}`} className="bg-[#272b69] text-white px-3 py-1 rounded">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(article.articleID)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
>>>>>>> Stashed changes
