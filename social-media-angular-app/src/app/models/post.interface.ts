import { Timestamp } from '@angular/fire/firestore';

export interface Post {
  id?: string;
  userId: string;
  post: string;
  imageUrl: string;
  likesCount: number;
  createdAt: Timestamp;
}
