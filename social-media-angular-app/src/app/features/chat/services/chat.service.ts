import { inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, doc, serverTimestamp, setDoc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private firestore = inject(Firestore);

  sendMessage(
    fromId: string,
    fromName: string,
    toId: string,
    content: string
  ): void {
    const chatCollection = collection(this.firestore, 'chat');
    const sortedId = [fromId, toId].sort().join('_');
    const chatDocRef = doc(chatCollection, sortedId);

    setDoc(chatDocRef, { createdAt: serverTimestamp() }, { merge: true });

    const messagesSubcollection = collection(
      this.firestore,
      `chat/${sortedId}/messages`
    );
  }
}
