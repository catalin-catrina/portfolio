import {
  Component,
  effect,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Post } from '../../models/post.interface';
import { PostsService } from '../../services/posts.service';
import { AuthenticationService } from '../../services/authentication.service';
import { TimestampToDatePipe } from '../../pipes/timestamp-to-date.pipe';
import { LikesComponent } from '../likes/likes.component';
import { SavePostComponent } from '../save-post/save-post.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
    TimestampToDatePipe,
    DatePipe,
    LikesComponent,
    SavePostComponent,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnChanges {
  @Input() userId!: string | null;

  visitedProfilePosts!: Promise<Post[]>;
  userPosts!: Promise<Post[]>;

  private postsService = inject(PostsService);
  private authService = inject(AuthenticationService);

  userSignal = this.authService.getUser();

  constructor() {
    effect(() => {
      if (this.userSignal()) {
        const userId = this.userSignal()?.uid;
        if (userId) {
          this.userPosts = this.postsService.getUserPosts(userId);
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId']) {
      this.visitedProfilePosts = this.postsService.getProfileUserPosts(
        this.userId
      );
    }
  }
}
