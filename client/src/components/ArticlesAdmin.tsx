import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import type { Article } from '../types/Articles';

export default function ArticlesAdmin() {
  const [articles, setArticles] = useState<Article[]>([]);

  const fetchArticles = () => {
    axios.get('/api/articles')
      .then(res => setArticles(res.data))
      .catch(err => console.error('Failed to fetch articles:', err));
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;

    try {
      await axios.delete(`/api/articles/${id}`);
      fetchArticles(); // refresh
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Article Management</h2>
        <Link to="/admin/articles/create" className="bg-green-600 text-white px-4 py-2 rounded">
          Create New Article
        </Link>
      </div>

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
                <button onClick={() => handleDelete(article.articleID)} className="bg-red-600 text-white px-3 py-1 rounded">
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