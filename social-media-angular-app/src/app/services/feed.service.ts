import { effect, inject, Injectable, OnDestroy } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import {
  collection,
  DocumentData,
  Firestore,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from '@angular/fire/firestore';
import { Post } from '../models/post.interface';

@Injectable({
  providedIn: 'root',
})
export class FeedService implements OnDestroy {
  private followedUsers: string[] = [];
  private lastVisible: DocumentData | null = null;

  private postsSubject = new BehaviorSubject<Post[]>([]);
  private noMoreDataSubject = new BehaviorSubject<boolean>(false);
  readonly posts$ = this.postsSubject.asObservable();
  readonly noMoreData$ = this.noMoreDataSubject.asObservable();

  private subscriptions: Subscription = new Subscription();
  private followSubscription: (() => void) | null = null;

  private firestore = inject(Firestore);
  private authService = inject(AuthenticationService);

  private user = this.authService.getUser();

  constructor() {
    effect(() => {
      if (this.user()) {
        this.resetFeed();
        this.initializeFeed();
      } else {
        this.resetFeed();
      }
    });
  }

  private initializeFeed() {
    if (this.followSubscription) {
      this.followSubscription();
      this.followSubscription = null;
    }

    const followCollection = collection(this.firestore, 'follow');
    const q = query(
      followCollection,
      where('followerId', '==', this.user()?.uid)
    );

    const unsub = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.metadata.hasPendingWrites) {
        return;
      }

      this.resetFeed();

      this.followedUsers = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return data['followedId'];
      });

      this.fetchPosts();
    });

    this.followSubscription = unsub;
  }

  async fetchPosts(): Promise<Post[]> {
    const postsCollection = collection(this.firestore, 'posts');
    let q;

    if (this.lastVisible) {
      q = query(
        postsCollection,
        where('userId', 'in', this.followedUsers),
        orderBy('createdAt', 'desc'),
        startAfter(this.lastVisible),
        limit(10)
      );
    } else {
      q = query(
        postsCollection,
        where('userId', 'in', this.followedUsers),
        orderBy('createdAt', 'desc'),
        limit(10)
      );
    }

    try {
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        this.noMoreDataSubject.next(true);
        return [];
      } else {
        this.noMoreDataSubject.next(false);

        const newPosts = querySnapshot.docs.map(
          (doc) =>
            ({
              ...doc.data(),
              id: doc.id,
            } as Post)
        );
        const currentPosts = this.postsSubject.value;

        this.postsSubject.next([...currentPosts, ...newPosts]);

        this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

        return newPosts;
      }
    } catch (error) {
      console.error('Error fetching posts');
      throw error;
    }
  }

  resetFeed() {
    this.postsSubject.next([]);
    this.noMoreDataSubject.next(false);
    this.lastVisible = null;
  }

  ngOnDestroy(): void {
    if (this.followSubscription) {
      this.followSubscription();
    }
    this.subscriptions.unsubscribe();
  }
}
