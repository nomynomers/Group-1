export type Article = {
  articleID: number;
  articleName: string;
  description: string;
  category: string;
  durationMinutes: number;
  imageCover: string;
  content: string;
  creationDate: string;
  authorName?: string; // 
};

export interface ArticleFormProps {
  mode: 'create' | 'edit';
  article?: Article;
  onSuccess: () => void;
  onCancel: () => void;
}
