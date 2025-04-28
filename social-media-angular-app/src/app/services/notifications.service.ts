import { inject, Injectable } from '@angular/core';
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

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private firestore: Firestore = inject(Firestore);

  createNotification(
    resource_id: string,
    from_id: string,
    from_name: string,
    to_id: string,
    to_name: string,
    type: string
  ): void {
    if (!resource_id || !from_id || !from_name || !to_id || !to_name || !type) {
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
    const notifications = querySnapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Notification),
    }));
    return notifications;
  }

  markAsSeen(id: string): void {
    const notificationsCollection = collection(this.firestore, 'notifications');
    const docSnapshot = doc(notificationsCollection, id);
    updateDoc(docSnapshot, {
      seen: true,
    });
  }
}
