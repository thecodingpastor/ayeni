export interface BlogImageType {
  public_id?: string;
  url?: string;
  size?: number;
  secure_url?: string;
  type?: string;
}

export interface InitialBlogStateType {
  blogs: SingleBlogType[];
  blogLoading: string;
  draftBlog: SingleBlogType;
  currentBlog: SingleBlogType;
}

export interface SingleBlogType {
  _id?: string;
  slug?: string;
  title: string;
  intro: string;
  mainContent: string;
  images: BlogImageType[];
  tags: string[];
  estimatedReadTime: string;
  createdAt?: Date;
  isPublished?: boolean;
  updatedAt?: Date;
}
