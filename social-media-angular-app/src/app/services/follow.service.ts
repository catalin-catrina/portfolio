import { inject, Injectable } from '@angular/core';
import {
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { Follow } from '../models/follow.interface';

@Injectable({
  providedIn: 'root',
})
export class FollowService {
  private firestore = inject(Firestore);

  async followUser(followerId: string, followedId: string) {
    try {
      if (followedId !== followerId) {
        const followCollection = collection(this.firestore, 'follow');
        const followId = `${followerId}_${followedId}`;
        const followDocRef = doc(followCollection, followId);
        const data: Follow = {
          followerId,
          followedId,
          followedAt: serverTimestamp(),
        };
        await setDoc(followDocRef, data);
      }
    } catch (error) {
      console.error(
        'There has been an error in following the user, please try again later',
        error
      );
      throw new Error(
        'There has been an error in following the user, please try again later'
      );
    }
  }

  async unfollowUser(followerId: string, followedId: string) {
    try {
      if (followedId !== followerId) {
        const followCollection = collection(this.firestore, 'follow');
        const followId = `${followerId}_${followedId}`;
        const followDocRef = doc(followCollection, followId);
        await deleteDoc(followDocRef);
      }
    } catch (error) {
      console.error(
        'There has been an error in unfollowing the user, please try again later',
        error
      );
      throw new Error(
        'There has been an error in unfollowing the user, please try again later'
      );
    }
  }

  async isFollowing(followerId: string, followedId: string): Promise<Boolean> {
    try {
      if (followedId !== followerId) {
        const followCollection = collection(this.firestore, 'follow');
        const q = query(
          followCollection,
          where('followerId', '==', followerId),
          where('followedId', '==', followedId)
        );
        const isFollowing = (await getDocs(q)).empty === false;
        return isFollowing;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error fetching following data', error);
      throw new Error('Error fetching following data');
    }
  }

  async getFollowers(userId: string): Promise<Follow[]> {
    const followCollection = collection(this.firestore, 'follow');
    const q = query(followCollection, where('followedId', '==', userId));
    const querySnapshot = await getDocs(q);
    const followers = querySnapshot.docs.map((doc) => doc.data() as Follow);
    return followers;
  }

  async getFollowing(userId: string): Promise<Follow[]> {
    const followCollection = collection(this.firestore, 'follow');
    const q = query(followCollection, where('followerId', '==', userId));
    const querySnapshot = await getDocs(q);
    const followed = querySnapshot.docs.map((doc) => doc.data() as Follow);
    return followed;
  }
}
