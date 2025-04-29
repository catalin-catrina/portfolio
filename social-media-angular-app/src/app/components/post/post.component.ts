import { Component, DoCheck, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { CommonModule } from '@angular/common';

import { months } from '../../constants/constants';
import { CreateCommentComponent } from '../create-comment/create-comment.component';
import { CommentsComponent } from '../comments/comments.component';
import { Post } from '../../models/post.interface';
import { switchMap } from 'rxjs';
import { TimestampToDatePipe } from "../../pipes/timestamp-to-date.pipe";
import { LikesComponent } from '../likes/likes.component';
import { SavePostComponent } from '../save-post/save-post.component';
import { SharePostComponent } from '../share-post/share-post.component';

@Component({
    selector: 'app-post',
    imports: [CommonModule, CreateCommentComponent, CommentsComponent, LikesComponent, SavePostComponent, SharePostComponent, TimestampToDatePipe],
    templateUrl: './post.component.html',
    styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit, DoCheck {
  ngDoCheck(): void {
    console.log(this.post)
  }
  months = months;
  post!: (Post & { userName: string }) | null;

  private route = inject(ActivatedRoute);
  private postsService = inject(PostsService);

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => this.postsService.getUserPostById(params['id']))
      )
      .subscribe((post) => {
        this.post = post;
      });
  }
}
