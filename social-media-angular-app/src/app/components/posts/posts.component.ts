import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from '../../models/post.interface';

import { PostsService } from '../../services/posts.service';
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

  private postsService = inject(PostsService);

  posts$!: Observable<Post[]> | Promise<Post[]>;

  ngOnInit() {
    if (this.userId) {
      this.posts$ = this.postsService.getProfileUserPosts(this.userId);
    } else {
      this.posts$ = this.postsService.getUserPosts();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId']) {
      this.posts$ = this.postsService.getProfileUserPosts(this.userId);
    }
  }
}
