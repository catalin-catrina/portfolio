import { inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  user,
  UserCredential,
} from '@angular/fire/auth';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { IUser } from '../models/user.interface';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userDetails!: IUser | null;
  userIsAvailableSubject = new BehaviorSubject(false);
  userIsAvailable$ = this.userIsAvailableSubject.asObservable();

  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);

  // how to get current user
  private _user$ = user(this.auth);
  private _userSignal: Signal<User | null> = toSignal(this._user$, {
    initialValue: null,
  });

  constructor() {
    this._user$.subscribe((user: User | null) => {
      if (user) {
        this.userIsAvailableSubject.next(true);
        this.getUserDetails(user.uid).then((user: IUser | null) => {
          this.userDetails = user;
        });
      } else {
        this.userIsAvailableSubject.next(false);
      }
    });
  }

  getUser(): Signal<User | null> {
    return this._userSignal;
  }

  async getUserDetails(userId: string): Promise<IUser | null> {
    const userDoc = doc(this.firestore, 'users', userId);
    const docSnap = await getDoc(userDoc);
    if (docSnap.exists()) {
      return docSnap.data() as IUser;
    } else {
      return null;
    }
  }

  signupUser(
    email: string,
    password: string,
    additionalData: { fullname: string; username: string }
  ) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // logged in user
        const user = userCredential.user;

        // this gives us access to user's uid which is created when he registers, which we save into firestore
        // we create a new document with the uid of the registered user which will become the id of the document in which we'll save additional data about the user

        // create a document with the id user.uid into the 'users' collection
        const userDocRef = doc(this.firestore, 'users', user.uid);

        // write into that document
        setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          fullname: additionalData.fullname,
          displayName: additionalData.username,
          createdAt: new Date().toISOString(),
        });

        this.router.navigate(['/login']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(`Error code: ${errorCode}, error message: ${errorMessage}`);
      });
  }

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential: UserCredential) => {
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.log('Error logging in: ', error.message);
      });
  }

  logout() {
    this.auth
      .signOut()
      .then(() => {
        this.router.navigate(['/login']);
        this.userIsAvailableSubject.next(false);
      })
      .catch((error) => {
        console.log('Error logging out: ', error.message);
      });
  }
}
