import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FeedService } from '../../services/feed.service';
import { Subscription } from 'rxjs';
import { Post } from '../../models/post.interface';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TimestampToDatePipe } from '../../pipes/timestamp-to-date.pipe';
import { LikesComponent } from '../likes/likes.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    TimestampToDatePipe,
    LikesComponent,
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  noMoreData = false;
  isLoading = false;
  private scrollTimeout: any;
  private subscriptions: Subscription = new Subscription();

  private feedService = inject(FeedService);

  ngOnInit(): void {
    this.subscriptions.add(
      this.feedService.posts$.subscribe((posts) => {
        this.posts = posts;
      })
    );

    this.subscriptions.add(
      this.feedService.noMoreData$.subscribe((noMoreData) => {
        this.noMoreData = noMoreData;
      })
    );

    if (this.posts.length === 0) {
      this.loadMorePosts();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      const threshhold = 100;
      const position = window.innerHeight + window.scrollY;
      const height = document.body.offsetHeight;
      if (position > height - threshhold && height > window.innerHeight) {
        this.loadMorePosts();
      }
    }, 200);
  }

  async loadMorePosts() {
    if (this.isLoading || this.noMoreData) {
      return;
    }

    this.isLoading = true;

    try {
      this.feedService.fetchPosts();
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      this.isLoading = false;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
