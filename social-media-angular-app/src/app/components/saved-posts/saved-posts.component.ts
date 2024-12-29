import { Component, effect, inject } from '@angular/core';
import { PostSavingService } from '../../services/post-saving.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Post } from '../../models/post.interface';
import { CommonModule } from '@angular/common';
import { TimestampToDatePipe } from '../../pipes/timestamp-to-date.pipe';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-saved-posts',
  standalone: true,
  imports: [CommonModule, TimestampToDatePipe, RouterLink, RouterLinkActive],
  templateUrl: './saved-posts.component.html',
  styleUrl: './saved-posts.component.scss',
})
export class SavedPostsComponent {
  savedPosts: Post[] = [];

  private savedPostsService = inject(PostSavingService);
  private authService = inject(AuthenticationService);
  userSignal = this.authService.getUser();

  getSavedPostsEffect = effect(() => {
    const loggedInUser = this.userSignal();
    if (loggedInUser && loggedInUser.uid) {
      this.savedPostsService
        .getSavedPosts(loggedInUser.uid)
        .subscribe((savedPosts: Post[]) => {
          this.savedPosts = savedPosts;
        });
    }
  });
}
