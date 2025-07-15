import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Article } from '../types/Articles';

const ArticlesPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);

    axios.get('/api/articles')
      .then(res => {
        console.log("API response:", res.data);
        setArticles(Array.isArray(res.data) ? res.data : []);
      })
      .catch(err => {
        console.error('Failed to fetch articles:', err);
      });
  }, []);

  const categories = ['All', ...Array.from(new Set(articles.map(a => a.category)))];

  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter(article => article.category === selectedCategory);

  return (
    <div className="pt-32 pb-20 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-[#272b69] mb-10">Medical Articles</h1>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded border transition-all ${selectedCategory === cat
                ? 'bg-[#272b69] text-white border-[#272b69]'
                : 'bg-white text-[#272b69] border-[#272b69] hover:bg-indigo-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => (
            <div key={article.articleID} className="bg-white shadow rounded-xl overflow-hidden">
              <img src={article.imageCover} alt={article.articleName} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">{article.category}</span>
                  <span>{article.durationMinutes} min read</span>
                </div>
                <h3 className="text-lg font-semibold text-[#272b69] mb-2">{article.articleName}</h3>
                <p className="text-gray-600 text-sm">{article.description}</p>
                <p className="text-sm text-gray-400 mt-4">{new Date(article.creationDate).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;
