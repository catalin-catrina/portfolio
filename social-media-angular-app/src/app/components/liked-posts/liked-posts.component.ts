import { Component, effect, inject } from '@angular/core';
import { LikesService } from '../../services/likes.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Post } from '../../models/post.interface';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TimestampToDatePipe } from '../../pipes/timestamp-to-date.pipe';

@Component({
  selector: 'app-liked-posts',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TimestampToDatePipe],
  templateUrl: './liked-posts.component.html',
  styleUrl: './liked-posts.component.scss',
})
export class LikedPostsComponent {
  likedPosts: Post[] = [];

  private likesService = inject(LikesService);
  private authService = inject(AuthenticationService);

  user = this.authService.getUser();

  getPostsEffect = effect(() => {
    const loggedInUser = this.user();
    if (loggedInUser && loggedInUser.uid) {
      this.likesService
        .getLikedPosts(loggedInUser.uid)
        .subscribe((posts: Post[]) => {
          this.likedPosts = posts;
        });
    }
  });
}
