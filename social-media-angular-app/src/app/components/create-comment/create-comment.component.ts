import { Component, inject, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommentsService } from '../../services/comments.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Post } from '../../models/post.interface';

@Component({
  selector: 'app-create-comment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-comment.component.html',
  styleUrl: './create-comment.component.scss',
})
export class CreateCommentComponent {
  @Input() post: Post | null = null;

  private commentsService = inject(CommentsService);
  private authService = inject(AuthenticationService);

  currentUserSignal = this.authService.getUser();

  async onSubmit(form: NgForm) {
    const comment = form.value.comment;
    const postId = this.post?.id;
    const userId = this.currentUserSignal()?.uid;
    if (userId) {
      const userDetails = await this.authService.getUserDetails(userId);

      if (comment && postId && userDetails && userDetails.fullname) {
        this.commentsService.writeCommentToFirestore(
          comment,
          postId,
          userDetails.fullname
        );
      }
    }
  }
}
