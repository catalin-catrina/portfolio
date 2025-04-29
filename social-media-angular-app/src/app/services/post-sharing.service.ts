import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  serverTimestamp,
} from '@angular/fire/firestore';
import { Post } from '../models/post.interface';
import { AuthenticationService } from './authentication.service';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root',
})
export class PostSharingService {
  private firestore = inject(Firestore);
  private auth = inject(AuthenticationService);
  private notificationsService = inject(NotificationsService);

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
      originalPost: post.post,
      originalPoster: post.userName,
      originalPostId: post.id,
    }).then(async (newPostRef) => {
      const oldPostRef = doc(this.firestore, `posts/${post.id}`);
      const oldPostSnap = await getDoc(oldPostRef);
      const newPostSnap = await getDoc(newPostRef);

      const oldPost = oldPostSnap.data() as Post;
      const newPost = newPostSnap.data() as Post;

      const resourceId = newPostSnap.id;
      const fromName = newPost.userName;
      const toId = oldPost.userId;
      const toName = oldPost.userName;

      this.notificationsService.createNotification(resourceId, userId, fromName, toId, toName, 'share')
    });
  }
}
