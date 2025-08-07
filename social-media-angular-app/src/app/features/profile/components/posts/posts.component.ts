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
import { Post } from '../../../../models/post.interface';
import { PostsService } from '../../../../shared/services/posts.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { TimestampToDatePipe } from '../../../../shared/pipes/timestamp-to-date.pipe';
import { LikesComponent } from '../../../../shared/ui/likes/likes.component';
import { SavePostComponent } from '../../../../shared/ui/save-post/save-post.component';

@Component({
  selector: 'app-posts',
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
