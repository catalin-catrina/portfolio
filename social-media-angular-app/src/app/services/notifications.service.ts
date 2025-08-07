import { computed, effect, inject, Injectable, signal } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from '@angular/fire/firestore';

import { Notification } from '../models/notification.interface';
import { ProfileService } from '../shared/services/profile.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  notifications = signal<Notification[]>([]);
  notificationsSub: (() => void) | null = null;

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
      this.getNotifications(loggedInUser.id);
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

  async getNotifications(to_id: string) {
    if (this.notificationsSub) {
      this.notificationsSub();
      this.notificationsSub = null;
    }

    const notificationsCollection = collection(this.firestore, 'notifications');
    const q = query(
      notificationsCollection,
      where('to_id', '==', to_id),
      orderBy('createdAt', 'desc'),
      limit(5)
    );

    const unsub = onSnapshot(q, (querySnapshot) => {
      const notifications = querySnapshot.docs.map(
        (notifDoc) => ({ id: notifDoc.id, ...notifDoc.data() } as Notification)
      );

      this.notifications.set(notifications);
    });

    this.notificationsSub = unsub;
  }

  markAsSeen(id: string): void {
    const notificationsCollection = collection(this.firestore, 'notifications');
    const docRef = doc(notificationsCollection, id);
    updateDoc(docRef, {
      seen: true,
    });
  }
}
