import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
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

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private firestore = inject(Firestore);
  private notificationsService = inject(NotificationsService);

  postComment(comment: string, postId: string, userName: string) {
    const commentsCollection = collection(this.firestore, 'comments');
    addDoc(commentsCollection, {
      comment: comment,
      postId: postId,
      userName: userName,
      createdAt: serverTimestamp(),
    }).then(async (commRef) => {
      const commSnap = await getDoc(commRef);
      const commId = commSnap.id;
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
