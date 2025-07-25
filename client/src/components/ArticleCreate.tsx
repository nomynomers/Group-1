import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticlesForm from './ArticlesForm';


const ArticleCreate: FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/admin/articles');
  };

  const handleCancel = () => {
    navigate('/admin/articles');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Create New Article</h1>
      <ArticlesForm mode="create" onSuccess={handleSuccess} onCancel={handleCancel} />
    </div>
  );
};

export default ArticleCreate;
