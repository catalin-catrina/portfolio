import { FieldValue, Timestamp } from '@angular/fire/firestore';

export interface Follow {
  followerId: string;
  followedId: string;
  followedAt: Timestamp | FieldValue;
}
