import { inject, Injectable } from '@angular/core';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { AuthenticationService } from './authentication.service';
import { catchError, filter, from, map, Observable, of, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from '@angular/fire/firestore';
import { Post } from '../models/post.interface';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private storage = inject(Storage);
  private firestore = inject(Firestore);
  private auth = inject(AuthenticationService);

  userSignal = this.auth.getUser();
  user$ = toObservable(this.auth.getUser());

  postsSignal = toSignal(this.getUserPosts());

  async getUserPostById(
    id: string
  ): Promise<(Post & { userName: string }) | null> {
    try {
      const postDocRef = doc(this.firestore, 'posts', id);
      const postDocSnapshot = await getDoc(postDocRef);
      if (postDocSnapshot.exists()) {
        const postData = postDocSnapshot.data() as Post;
        
        const userDocRef = doc(this.firestore, 'users', postData.userId);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data() as User;
          const userName = userData.fullname;

          return { ...postData, userName } as Post & { userName: string };
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching post by ID:', error);
      throw new Error('An unexpected error occurred while fetching the post');
    }
  }

  getUserPosts(): Observable<Post[]> {
    return this.user$.pipe(
      filter(Boolean),
      switchMap((user) => {
        const postsCollection = collection(this.firestore, 'posts');
        const q = query(postsCollection, where('userId', '==', user?.uid));

        return from(
          getDocs(q).then((querySnapshot) =>
            querySnapshot.docs.map(
              (doc) =>
                ({
                  ...doc.data(),
                  id: doc.id,
                  createdAt: new Date(doc.data()['createdAt']),
                } as Post)
            )
          )
        ).pipe(
          catchError((error) => {
            console.error('Error fetching posts: ', error);
            return of([]);
          })
        );
      })
    );
  }

  async getProfileUserPosts(id: string | null): Promise<Post[]> {
    const postsCollection = collection(this.firestore, 'posts');
    const q = query(postsCollection, where('userId', '==', id));
    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map(
      (doc) =>
        ({
          ...doc.data(),
          id: doc.id,
          createdAt: new Date(doc.data()['createdAt']),
        } as Post)
    );
    return posts;
  }

  writePostToFirestore(post: string, imageUrl: any) {
    const postsCollection = collection(this.firestore, 'posts');
    addDoc(postsCollection, {
      userId: this.userSignal()?.uid,
      post: post,
      imageUrl: imageUrl,
      createdAt: serverTimestamp(),
    });
  }

  writeImageToStorage(file: File) {
    const storageRef = ref(
      this.storage,
      `users/${this.userSignal()?.uid}/${file.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        () => {},
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>
            resolve(downloadUrl)
          );
        }
      );
    });
  }
}
