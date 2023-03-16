export interface SinglePostTypes {
  id: string;
  title: string;
  intro: string;
  content: string;
  img: string;
  readTime: string;
  createdAt: Date;
  slug: string;
  comments: CommentTypes[];
  likes: any[];
}

export interface CommentTypes {
  id: string;
  author: string;
  text: string;
}
