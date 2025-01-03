import { Component, effect, inject, OnInit } from '@angular/core';
import { PostSavingService } from '../../services/post-saving.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Post } from '../../models/post.interface';
import { CommonModule } from '@angular/common';
import { TimestampToDatePipe } from '../../pipes/timestamp-to-date.pipe';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { distinctUntilChanged, filter, map, of, switchMap } from 'rxjs';

@Component({
    selector: 'app-saved-posts',
    imports: [CommonModule, TimestampToDatePipe, RouterLink, RouterLinkActive],
    templateUrl: './saved-posts.component.html',
    styleUrl: './saved-posts.component.scss'
})
export class SavedPostsComponent implements OnInit {
  savedPosts: Post[] = [];

  private savedPostsService = inject(PostSavingService);
  private authService = inject(AuthenticationService);

  userSignal = this.authService.getUser();

  ngOnInit(): void {
    this.authService.userIsAvailable$
      .pipe(
        distinctUntilChanged(),
        filter(Boolean),
        map(() => this.userSignal()?.uid),
        filter((uid): uid is string => !!uid),
        switchMap((uid) => {
          return this.savedPostsService.getSavedPosts(uid);
        })
      )
      .subscribe((posts: Post[]) => {
        this.savedPosts = posts;
      });
  }
}
