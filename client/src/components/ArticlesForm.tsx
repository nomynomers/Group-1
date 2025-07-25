import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ArticleFormProps } from '../types/Article';
import AdminSidebar from './AdminSidebar';

const ArticlesForm: FC<ArticleFormProps> = ({ mode, article, onSuccess }) => {
  const navigate = useNavigate();

  const [articleName, setArticleName] = useState(article?.articleName || '');
  const [category, setCategory] = useState(article?.category || '');
  const [durationMinutes, setDurationMinutes] = useState(article?.durationMinutes || 0);
  const [imageCover, setImageCover] = useState(article?.imageCover || '');
  const [description, setDescription] = useState(article?.description || '');
  const [content, setContent] = useState(article?.content || '');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      articleName,
      category,
      durationMinutes,
      imageCover,
      description,
      content
    };

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(
        mode === 'edit'
          ? `http://localhost:8080/api/admin/articles/${article?.articleID}`
          : `http://localhost:8080/api/admin/articles`,
        {
          method: mode === 'edit' ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        }
      );

      if (response.ok) {
        onSuccess?.();
        navigate('/admin/articles');
      } else {
        const resText = await response.text();
        setError(`Failed to ${mode === 'edit' ? 'update' : 'create'} article: ${resText}`);
      }
    } catch (err) {
      setError('Something went wrong.');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <AdminSidebar />

      <div style={{ padding: '2rem', width: '100%', marginLeft: '300px' }}>
        <h1 style={{ color: '#272b69', marginBottom: '1rem' }}>
          {mode === 'edit' ? 'Edit Article' : 'Create New Article'}
        </h1>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            maxWidth: '800px'
          }}
        >
          <div style={{ marginBottom: '1rem' }}>
            <label>Article Name</label>
            <input
              type="text"
              value={articleName}
              onChange={(e) => setArticleName(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>Duration (minutes)</label>
            <input
              type="number"
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(Number(e.target.value))}
              required
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>Image URL</label>
            <input
              type="text"
              value={imageCover}
              onChange={(e) => setImageCover(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              required
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              required
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              style={{
                backgroundColor: '#272b69',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              {mode === 'edit' ? 'Update Article' : 'Create Article'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArticlesForm;
