import { inject, Injectable } from '@angular/core';
import {
  collection,
  deleteDoc,
  doc,
  documentId,
  Firestore,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { Observable, switchMap } from 'rxjs';
import { Post } from '../models/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostSavingService {
  private savedPostsSubscription: (() => void) | null = null;

  private firestore = inject(Firestore);

  async savePost(postId: string, userId: string): Promise<void> {
    const savedPostRef = doc(
      this.firestore,
      `users/${userId}/saved_posts/${postId}`
    );
    await setDoc(savedPostRef, {});
  }

  async unsavePost(postId: string, userId: string): Promise<void> {
    const savedPostRef = doc(
      this.firestore,
      `users/${userId}/saved_posts/${postId}`
    );
    await deleteDoc(savedPostRef);
  }

  async hasUserSavedPost(postId: string, userId: string): Promise<boolean> {
    const savedPostRef = doc(
      this.firestore,
      `users/${userId}/saved_posts/${postId}`
    );
    const savedPostSnap = await getDoc(savedPostRef);
    return savedPostSnap.exists();
  }

  getSavedPosts(userId: string): Observable<Post[]> {
    if (this.savedPostsSubscription) {
      this.savedPostsSubscription();
      this.savedPostsSubscription = null;
    }

    const savedPostsCollection = collection(
      this.firestore,
      `users/${userId}/saved_posts`
    );

    return new Observable<string[]>((observer) => {
      const unsub = onSnapshot(
        savedPostsCollection,
        (snapshot) => {
          if (snapshot.metadata.hasPendingWrites) {
            return;
          }

          const postIDs = snapshot.docs.map((doc) => doc.id);
          observer.next(postIDs);
        },
        (error) => {
          observer.error(error);
        }
      );

      this.savedPostsSubscription = unsub;
    }).pipe(
      switchMap(async (postIDs: string[]) => {
        const postsCollection = collection(this.firestore, 'posts');
        const q = query(postsCollection, where(documentId(), 'in', postIDs));
        const querySnap = await getDocs(q);
        return Promise.all(
          querySnap.docs.map(
            (doc) =>
              ({
                ...doc.data(),
                id: doc.id,
              } as Post)
          )
        );
      })
    );
  }
}
