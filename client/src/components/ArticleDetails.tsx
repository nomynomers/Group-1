import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import type { Article } from '../types/Articles';

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    axios.get(`/api/articles/${id}`)
      .then(res => setArticle(res.data))
      .catch(err => console.error('Error loading article:', err));
  }, [id]);

  if (!article) return <div className="pt-32 text-center">Loading...</div>;

  return (
    <div
      className="px-6 max-w-4xl mx-auto"
      style={{ paddingTop: '120px', paddingBottom: '60px' }} // fixes title cutoff
    >
      <h1 className="text-4xl font-bold mb-4 text-[#272b69]">
        {article.articleName}
      </h1>
      <p className="text-sm text-gray-500 mb-2">
        By {article.authorName} • {new Date(article.creationDate).toLocaleDateString()}
      </p>
      <img
        src={article.imageCover}
        alt="Cover"
        className="w-full h-64 object-cover rounded mb-6"
      />
      <div className="text-base text-gray-800 leading-relaxed whitespace-pre-line" style ={{ color: 'black', textAlign: 'left', padding: '50px 100px 0 100px'}}>
        {article.content}
      </div>
    </div>
  );
};

export default ArticleDetails;
