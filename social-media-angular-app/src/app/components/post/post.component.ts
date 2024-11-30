import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { CommonModule } from '@angular/common';

import { months } from '../../constants/constants';
import { CreateCommentComponent } from '../create-comment/create-comment.component';
import { CommentsComponent } from '../comments/comments.component';
import { Post } from '../../models/post.interface';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, CreateCommentComponent, CommentsComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  months = months;
  postId!: string;
  post!: (Post & { userName: string }) | null;

  private route = inject(ActivatedRoute);
  private postsService = inject(PostsService);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.postId = params['id'];
    });

    this.postsService
      .getUserPostById(this.postId)
      .then((post) => {
        if (post) {
          this.post = {
            ...post,
            id: this.postId,
          };
        } else {
          console.warn('Post not found');
        }
      })
      .catch((error) => {
        console.error('Failed to load post:', error.message);
      });
  }
}
