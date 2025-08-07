import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentsService } from '../../../services/comments.service';
import { Comment } from '../../../models/comment.interface';
import { Post } from '../../../models/post.interface';
import { months } from '../../../constants/constants';

@Component({
  selector: 'app-comments',
  imports: [CommonModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent implements OnChanges {
  @Input() post: Post | null = null;
  months = months;

  comments!: Comment[];

  private commentsService = inject(CommentsService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post'].currentValue && this.post && this.post.id) {
      this.commentsService
        .getCommentsAndUserByPostId(this.post.id)
        .subscribe((comments: Comment[]) => {
          this.comments = comments;
        });
    }
  }
}
