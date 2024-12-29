import { inject, Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { AlgoliaService } from './algolia.service';
import { IUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserSearchService {
  private firestore = inject(Firestore);
  private algoliaService = inject(AlgoliaService);

  async searchUsers(query: string) {
    const response = await this.algoliaService.search(query);
    return response.hits;
  }

  async getUsersFromFirestore(searchResults: any[]): Promise<IUser[]> {
    const usersCollection = collection(this.firestore, 'users');
    const nestedUsers = await Promise.all(
      searchResults.map(async (user: any) => {
        const q = query(
          usersCollection,
          where('displayName', '==', user.displayName)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => {
          return doc.data() as IUser;
        });
      })
    );

    return nestedUsers.flat();
  }
}
