import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  Firestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from '@angular/fire/firestore';
import { Comment } from '../models/comment.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  firestore = inject(Firestore);

  writeCommentToFirestore(comment: string, postId: string, userName: string) {
    const commentsCollection = collection(this.firestore, 'comments');
    addDoc(commentsCollection, {
      comment: comment,
      postId: postId,
      userName: userName,
      createdAt: serverTimestamp(),
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
