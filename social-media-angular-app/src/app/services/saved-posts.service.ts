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
export class SavedPostsService {
  private firestore = inject(Firestore);
  private savedPostsSubscription: (() => void) | null = null;

  async savePost(postId: string, userId: string): Promise<void> {
    const savedPostRef = doc(
      this.firestore,
      `users/${userId}/saved-posts/${postId}`
    );
    await setDoc(savedPostRef, {});
  }

  async unsavePost(postId: string, userId: string): Promise<void> {
    const savedPostRef = doc(
      this.firestore,
      `users/${userId}/saved-posts/${postId}`
    );
    await deleteDoc(savedPostRef);
  }

  async hasUserSavedPost(postId: string, userId: string): Promise<boolean> {
    const savedPostRef = doc(
      this.firestore,
      `users/${userId}/saved-posts/${postId}`
    );
    const savedPostSnap = await getDoc(savedPostRef);
    return savedPostSnap.exists();
  }

  getSavedPosts(userId: string): Observable<Post[]> {
    if (this.savedPostsSubscription) {
      this.savedPostsSubscription();
    }

    const savedPostsCollection = collection(
      this.firestore,
      `users/${userId}/saved-posts`
    );

    return new Observable<string[]>((observer) => {
      const unsub = onSnapshot(
        savedPostsCollection,
        (snapshot) => {
          if (snapshot.metadata.hasPendingWrites) {
            return;
          }

          const posts = snapshot.docs.map((doc) => doc.id);
          observer.next(posts);
        },
        (error) => {
          observer.error(error);
        }
      );

      this.savedPostsSubscription = unsub;
    }).pipe(
      switchMap(async (posts: string[]) => {
        const postsCollection = collection(this.firestore, 'posts');
        const q = query(postsCollection, where(documentId(), 'in', posts));
        const querySnap = await getDocs(q);
        return Promise.all(querySnap.docs.map((doc) => doc.data() as Post));
      })
    );
  }
}
