import { computed, effect, inject, Injectable, signal } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from '@angular/fire/firestore';

import { Notification } from '../models/notification.interface';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  notifications = signal<Notification[]>([]);

  unseenNotifCount = computed(() => {
    let count = 0;
    this.notifications().forEach((notification) => {
      if (!notification.seen) {
        count++;
      }
    });
    return count;
  });

  private firestore: Firestore = inject(Firestore);
  private profileService = inject(ProfileService);
  user = this.profileService.userProfile;

  notificationsEffect = effect(async () => {
    const loggedInUser = this.user();
    if (loggedInUser && loggedInUser.id) {
      const notifications = await this.getNotifications(loggedInUser.id);
      this.notifications.set(notifications);
    }
  });

  createNotification(
    resource_id: string | null,
    from_id: string,
    from_name: string,
    to_id: string,
    to_name: string,
    type: string
  ): void {
    if (!from_id || !from_name || !to_id || !to_name || !type) {
      return;
    }

    const notificationsCollection = collection(this.firestore, 'notifications');
    addDoc(notificationsCollection, {
      resource_id,
      from_id,
      from_name,
      to_id,
      to_name,
      type,
      seen: false,
      createdAt: serverTimestamp(),
    } as Notification);
  }

  async getNotifications(to_id: string): Promise<Notification[]> {
    const notificationsCollection = collection(this.firestore, 'notifications');
    const q = query(
      notificationsCollection,
      where('to_id', '==', to_id),
      orderBy('createdAt', 'desc'),
      limit(5)
    );
    const querySnapshot = await getDocs(q);
    const notifications = querySnapshot.docs.map((doc) => {
      return {
        ...(doc.data() as Notification),
        id: doc.id,
      };
    });
    return notifications;
  }

  markAsSeen(id: string): void {
    const notificationsCollection = collection(this.firestore, 'notifications');
    const docRef = doc(notificationsCollection, id);
    updateDoc(docRef, {
      seen: true,
    });
  }
}
