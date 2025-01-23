import { Timestamp } from '@angular/fire/firestore';

export interface Post {
  id?: string;
  originalPostId?: string;
  post: string;
  originalPost?: string;
  imageUrl: string;
  likesCount: number;
  createdAt: Timestamp;
  isShared: boolean;
  userId: string;
  userName: string;
  sharedUserName?: string;
  userProfilePhotoUrl?: string;
}
