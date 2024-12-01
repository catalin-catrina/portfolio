import { effect, inject, Injectable } from '@angular/core';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { AuthenticationService } from './authentication.service';
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
import { IUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private storage = inject(Storage);
  private firestore = inject(Firestore);
  private auth = inject(AuthenticationService);
  userSignal = this.auth.getUser();

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
          const userData = userDocSnapshot.data() as IUser;
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

  async getUserPosts(
    userId: string
  ): Promise<((Post & { userName: string }) | null)[]> {
    const postsCollection = collection(this.firestore, 'posts');
    const q = query(postsCollection, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    return Promise.all(
      querySnapshot.docs.map(async (document) => {
        const postData = document.data() as Post;

        const userDocRef = doc(this.firestore, 'users', postData.userId);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data() as IUser;
          const userName = userData.fullname;

          return {
            ...postData,
            id: document.id,
            userName,
          } as Post & { userName: string };
        } else {
          return null;
        }
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
