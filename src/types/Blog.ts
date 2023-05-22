type Comment = {
  id: string;
  userId: string;
  content: string;
  createdOn: string;
  replies: Array<Comment>;
};

export type Blog = {
  id: string;
  userId: string;
  thumbnailUrl: string;
  coverImageUrl?: string;
  title: string;
  htmlContent: string;
  createdOn: number;
  comments: Array<Comment>;
};
