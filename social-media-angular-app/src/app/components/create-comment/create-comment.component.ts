import { Component, inject, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommentsService } from '../../services/comments.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Post } from '../../models/post.interface';
import { ProfileService } from '../../services/profile.service';
import { IUser } from '../../models/user.interface';

@Component({
  selector: 'app-create-comment',
  imports: [FormsModule],
  templateUrl: './create-comment.component.html',
  styleUrl: './create-comment.component.scss',
})
export class CreateCommentComponent {
  @Input() post: Post | null = null;

  private commentsService = inject(CommentsService);
  private profileService = inject(ProfileService);

  userProfile = this.profileService.userProfile;

  async onSubmit(form: NgForm) {
    const comment = form.value.comment;
    const postId = this.post?.id;
    const profile = this.userProfile();

    if (comment && postId && profile && profile.fullname && profile.id) {
      this.commentsService.postComment(
        comment,
        postId,
        profile.fullname,
        profile.id
      );
    }
  }
}
