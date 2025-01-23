import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  Firestore,
  serverTimestamp,
} from '@angular/fire/firestore';
import { Post } from '../models/post.interface';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class PostSharingService {
  private firestore = inject(Firestore);
  private auth = inject(AuthenticationService);

  sharePost(userId: string, post: Post, description: string): void {
    const postsCollection = collection(this.firestore, 'posts');
    addDoc(postsCollection, {
      userId: userId,
      userName: this.auth.userDetails?.displayName,
      post: description,
      imageUrl: post.imageUrl,
      createdAt: serverTimestamp(),
      likesCount: 0,
      isShared: true, 
      originalPostId: post.id,
    });
  }
}
