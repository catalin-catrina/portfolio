import { inject, Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { AlgoliaService } from './algolia.service';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserSearchService {
  private firestore = inject(Firestore);
  private algoliaService = inject(AlgoliaService);

  async searchUsers(query: string) {
    //   const usersCollection = collection(this.firestore, 'users');
    //   const q = query(usersCollection, where('fullname', '==', name));
    //   const querySnapshot = await getDocs(q);
    //   return querySnapshot.docs.map((doc) => doc.data());
    const response = await this.algoliaService.search(query);
    return response.hits;
  }

  async getUsersFromFirestore(searchResults: any[]): Promise<User[]> {
    const usersCollection = collection(this.firestore, 'users');
    const nestedUsers = await Promise.all(
      searchResults.map(async (user: any) => {
        const q = query(
          usersCollection,
          where('displayName', '==', user.displayName)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => {
          return doc.data() as User;
        });
      })
    );

    return nestedUsers.flat();
  }
}
