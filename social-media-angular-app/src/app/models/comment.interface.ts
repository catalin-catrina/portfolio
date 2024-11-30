export interface Comment {
  id?: string;
  userId: string;
  postId: string;
  comment: string;
  createdAt: Date;
  userName?: string;
}
