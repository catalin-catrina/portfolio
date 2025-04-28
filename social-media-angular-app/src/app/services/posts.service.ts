import { inject, Injectable } from '@angular/core';
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
import { NotificationsService } from './notifications.service';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private storage = inject(Storage);
  private firestore = inject(Firestore);
  private auth = inject(AuthenticationService);
  private profileService = inject(ProfileService);
  private notificationsService = inject(NotificationsService);

  userSignal = this.auth.getUser();

  async getUserPostById(
    id: string
  ): Promise<(Post & { userName: string }) | null> {
    try {
      const postDocRef = doc(this.firestore, 'posts', id);
      const postDocSnapshot = await getDoc(postDocRef);
      if (postDocSnapshot.exists()) {
        const postData = postDocSnapshot.data() as Post;
        const id = postDocSnapshot.id;

        const userDocRef = doc(this.firestore, 'users', postData.userId);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data() as IUser;
          const userName = userData.fullname;

          return { ...postData, id, userName } as Post & {
            userName: string;
          };
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

  async getUserPosts(userId: string): Promise<Post[]> {
    const postsCollection = collection(this.firestore, 'posts');
    const q = query(postsCollection, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    const posts = querySnapshot.docs.map(async (postSnap) => {
      const post = postSnap.data() as Post;

      if (post.originalPostId) {
        const docRef = doc(this.firestore, 'posts', post.originalPostId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const originalPost = docSnap.data() as Post;
          return {
            ...post,
            id: post.id,
            originalPost: originalPost.post,
          } as Post;
        }
      }

      return {
        ...postSnap.data(),
        id: postSnap.id,
      } as Post;
    });

    return Promise.all(posts);
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
    const loggedUserId = this.userSignal()?.uid;

    if (loggedUserId) {
      const postsCollection = collection(this.firestore, 'posts');
      addDoc(postsCollection, {
        userId: loggedUserId,
        userName: this.auth.userDetails?.displayName,
        post: post,
        imageUrl: imageUrl,
        createdAt: serverTimestamp(),
        likesCount: 0,
        isShared: false,
      } as Post).then(async (docRef) => {
        // For every newly created post, get the followers of the logged in user and create notification for each
        const postId = docRef.id;
        const loggedInProfile = await this.profileService.fetchUserById(
          loggedUserId
        );

        const followCollection = collection(this.firestore, 'follows');
        const q = query(
          followCollection,
          where('followedId', '==', this.userSignal()?.uid)
        );
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (d) => {
          const userId = d.id;
          const followerProfile = await this.profileService.fetchUserById(
            userId
          );
          if (
            loggedInProfile &&
            loggedInProfile.uid &&
            followerProfile &&
            followerProfile.uid
          ) {
            this.notificationsService.createNotification(
              postId,
              loggedInProfile?.uid,
              loggedInProfile?.displayName,
              followerProfile?.uid,
              followerProfile?.displayName,
              'post'
            );
          }
        });
      });
    }
  }

  writeImageToStorage(file: File): Promise<string> {
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
