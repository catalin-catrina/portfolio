import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login/login.component';
import { SignupComponent } from './features/auth/components/signup/signup.component';
import { HomeComponent } from './core/layout/home/home.component';
import { CreatePostComponent } from './features/post/create-post/create-post.component';
import { PostComponent } from './features/post/post/post.component';
import { ProfileComponent } from './features/profile/components/profile.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'create', component: CreatePostComponent },
  { path: 'post/:id', component: PostComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
