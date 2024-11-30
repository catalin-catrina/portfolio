import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { Comment } from '../models/comment.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  firestore = inject(Firestore);

  writeCommentToFirestore(comment: string, postId: string, userId: string) {
    const commentsCollection = collection(this.firestore, 'comments');
    addDoc(commentsCollection, {
      comment: comment,
      postId: postId,
      userId: userId,
      createdAt: new Date().toISOString(),
    });
  }

  getCommentsAndUserByPostId(postId: string): Promise<Comment[]> {
    const commentsCollection = collection(this.firestore, 'comments');
    const q = query(commentsCollection, where('postId', '==', postId));

    return getDocs(q).then((querySnap) => {
      const commentPromises = querySnap.docs.map((document) => {
        let commentData = document.data() as Comment;
        const userDocRef = doc(this.firestore, 'users', commentData.userId);
        return getDoc(userDocRef).then((userDocSnap) => {
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            const userName = userData['fullname'];
            const commentAndUserData = {
              ...commentData,
              createdAt: new Date(commentData.createdAt),
              userName: userName,
            };
            return commentAndUserData;
          } else {
            return { ...commentData, userName: 'Unknown User' };
          }
        });
      });
      return Promise.all(commentPromises);
    });
  }
}
