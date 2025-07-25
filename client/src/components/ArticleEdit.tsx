import { useNavigate, useParams } from 'react-router-dom';
import ArticlesForm from './ArticlesForm';
import { useEffect, useState } from 'react';
import type { Article } from '../types/Article';
import axios from 'axios';

const ArticleEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token || !id) return;

  axios
    .get(`/api/articles/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => setArticle(res.data))
    .catch((err) => {
      console.error(err);
    });
}, [id]);

  if (!article) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Edit Article</h1>
      <ArticlesForm
        mode="edit"
        article={article}
        onSuccess={() => navigate('/admin/articles')}
        onCancel={() => navigate('/admin/articles')}
      />
    </div>
  );
};

export default ArticleEdit;
