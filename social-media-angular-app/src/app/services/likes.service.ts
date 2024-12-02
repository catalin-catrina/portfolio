import { inject, Injectable } from '@angular/core';
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  increment,
  onSnapshot,
  query,
  runTransaction,
  serverTimestamp,
  where,
} from '@angular/fire/firestore';
import { IUser } from '../models/user.interface';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LikesService {
  private firestore = inject(Firestore);

  async likePost(postId: string, userId: string): Promise<void> {
    const postRef = doc(this.firestore, `posts/${postId}`);
    const userLikeRef = doc(this.firestore, `users/${userId}/likes/${postId}`);
    const postLikeRef = doc(this.firestore, `posts/${postId}/likes/${userId}`);

    await runTransaction(this.firestore, async (transaction) => {
      const postSnap = await transaction.get(postRef);
      if (!postSnap.exists()) {
        throw new Error('Document does not exist');
      }

      transaction.set(userLikeRef, { postId, likedAt: serverTimestamp() });
      transaction.set(postLikeRef, { userId, likedAt: serverTimestamp() });

      transaction.update(postRef, { likesCount: increment(1) });
    });
  }

  async unlikePost(postId: string, userId: string): Promise<void> {
    const postRef = doc(this.firestore, `posts/${postId}`);
    const userLikeRef = doc(this.firestore, `users/${userId}/likes/${postId}`);
    const postLikeRef = doc(this.firestore, `posts/${postId}/likes/${userId}`);

    await runTransaction(this.firestore, async (transaction) => {
      const postSnap = await transaction.get(postRef);
      if (!postSnap.exists()) {
        throw new Error('Document does not exist');
      }

      transaction.delete(userLikeRef);
      transaction.delete(postLikeRef);

      transaction.update(postRef, { likesCount: increment(-1) });
    });
  }

  async hasUserLikedPost(postId: string, userId: string): Promise<boolean> {
    const likeRef = doc(this.firestore, `posts/${postId}/likes/${userId}`);
    const likeSnap = await getDoc(likeRef);
    return likeSnap.exists();
  }

  async getLikesCount(postId: string): Promise<number> {
    try {
      const postRef = doc(this.firestore, `posts/${postId}`);
      const postSnap = await getDoc(postRef);
      if (!postSnap.exists()) {
        throw new Error('Post does not exist');
      }
      return postSnap.data()['likesCount'];
    } catch (error) {
      console.error('Error fetching the number of likes', error);
    }
  }

  getUsersWhoLikedPost(postId: string): Observable<IUser[]> {
    const likesCollection = collection(this.firestore, `posts/${postId}/likes`);
    return new Observable<string[]>((observer) => {
      const unsub = onSnapshot(
        likesCollection,
        (snapshot) => {
          const likers = snapshot.docs.map((doc) => doc.id);
          observer.next(likers);
        },
        (error) => {
          observer.error(error);
        }
      );
    }).pipe(
      switchMap(async (usersIds: string[]) => {
        const usersCollection = collection(this.firestore, 'users');
        const q = query(usersCollection, where('uid', 'in', usersIds));
        const querySnap = await getDocs(q);
        return Promise.all(querySnap.docs.map((doc) => doc.data() as IUser));
      })
    );
  }

  getLikedPosts(userId: string): Promise<Post[]> {}
}
