export interface Article {
  articleID: number;
  articleName: string;
  description: string;
  category: string;
  durationMinutes: number;
  imageCover: string;
  content?: string;
  creationDate: string;
  authorName?: string;
}