import { effect, inject, Injectable, signal } from '@angular/core';
import {  doc, Firestore, getDoc } from '@angular/fire/firestore';
import { IUser } from '../../models/user.interface';
import { AuthenticationService } from '../../features/auth/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private _userProfile = signal<IUser | null>(null);
  readonly userProfile = this._userProfile.asReadonly();

  private authService = inject(AuthenticationService);
  private firestore = inject(Firestore);

  userEffect = effect(async () => {
    const userSignal = this.authService.getUser();
    const user = userSignal();
    if (user && user.uid) {
      this.fetchUserById(user.uid).then((profile) => {
        if (profile) {
          this._userProfile.set(profile);
        }
      });
    }
  });

  async fetchUserById(id: string | null): Promise<IUser | null> {
    try {
      if (id) {
        const docRef = doc(this.firestore, 'users', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return {
            id: docSnap.id,
            ...(docSnap.data() as IUser),
          };
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (error) {
      console.error('Could not find user', error);
      throw new Error('An unexpected error occured while fetching the user');
    }
  }
}
