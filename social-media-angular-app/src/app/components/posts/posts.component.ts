import {
  Component,
  effect,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Post } from '../../models/post.interface';
import { PostsService } from '../../services/posts.service';
import { AuthenticationService } from '../../services/authentication.service';
import { months } from '../../constants/constants';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit, OnChanges {
  @Input() userId!: string | null;

  months = months;

  visitedProfilePosts!: Promise<Post[]>;
  userPosts!: Promise<((Post & { userName: string }) | null)[]>;

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

  ngOnInit() {
    if (this.userId) {
      this.visitedProfilePosts = this.postsService.getProfileUserPosts(
        this.userId
      );
    } else {
      if (this.userSignal()) {
        const userId = this.userSignal()?.uid;
        if (userId) {
          this.userPosts = this.postsService.getUserPosts(userId);
        }
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId']) {
      this.visitedProfilePosts = this.postsService.getProfileUserPosts(
        this.userId
      );
    }
  }
}
