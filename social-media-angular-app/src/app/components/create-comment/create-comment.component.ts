import { Component, inject, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommentsService } from '../../services/comments.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Post } from '../../models/post.interface';

@Component({
  selector: 'app-create-comment',
  imports: [FormsModule],
  templateUrl: './create-comment.component.html',
  styleUrl: './create-comment.component.scss',
})
export class CreateCommentComponent {
  @Input() post: Post | null = null;

  private commentsService = inject(CommentsService);
  private authService = inject(AuthenticationService);

  currentUserSignal = this.authService.getUser();
  userDetails = this.authService.userDetails;

  async onSubmit(form: NgForm) {
    const comment = form.value.comment;
    const postId = this.post?.id;

    if (comment && postId && this.userDetails && this.userDetails.fullname) {
      this.commentsService.postComment(
        comment,
        postId,
        this.userDetails.fullname
      );
    }
  }
}
