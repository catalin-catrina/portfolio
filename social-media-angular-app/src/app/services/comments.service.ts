import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from '@angular/fire/firestore';
import { Comment } from '../models/comment.interface';
import { Observable } from 'rxjs';
import { NotificationsService } from './notifications.service';
import { Post } from '../models/post.interface';
import { ProfileService } from '../shared/services/profile.service';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private firestore = inject(Firestore);
  private notificationsService = inject(NotificationsService);
  private profileService = inject(ProfileService);

  postComment(
    comment: string,
    postId: string,
    userName: string,
    userId: string
  ) {
    const commentsCollection = collection(this.firestore, 'comments');
    addDoc(commentsCollection, {
      postId: postId,
      userId: userId,
      comment: comment,
      userName: userName,
      createdAt: serverTimestamp(),
    }).then(async (commRef) => {
      const postRef = doc(this.firestore, `posts/${postId}`);
      const postSnap = await getDoc(postRef);
      const postData = postSnap.data() as Post;
      const posterId = postData.userId;
      const commenterProfile = this.profileService.userProfile();
      const originalPosterProfile = await this.profileService.fetchUserById(
        posterId
      );
      if (commenterProfile && originalPosterProfile && posterId) {
        const commenterName = commenterProfile.displayName;
        const originalPosterName = originalPosterProfile.displayName;

        this.notificationsService.createNotification(
          postId,
          userId,
          commenterName,
          posterId,
          originalPosterName,
          'comment'
        );
      }
    });
  }

  getCommentsAndUserByPostId(postId: string): Observable<Comment[]> {
    return new Observable((observer) => {
      const commentsCollection = collection(this.firestore, 'comments');
      const q = query(
        commentsCollection,
        where('postId', '==', postId),
        orderBy('createdAt')
      );

      const unsubscribe = onSnapshot(
        q,
        (querySnap) => {
          if (querySnap.metadata.hasPendingWrites) {
            return;
          }
          const data = querySnap.docs.map(
            (document) => document.data() as Comment
          );
          observer.next(data);
        },
        (error) => {
          observer.error(error);
        }
      );

      return () => {
        unsubscribe();
      };
    });
  }
}
