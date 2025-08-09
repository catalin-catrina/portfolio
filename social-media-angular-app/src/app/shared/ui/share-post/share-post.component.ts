import { Component, computed, inject, input } from '@angular/core';
import { Post } from '../../../features/post/models/post.interface';
import { AuthenticationService } from '../../../features/auth/services/authentication.service';
import { PostSharingService } from '../../../features/post/services/post-sharing.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-share-post',
  imports: [FormsModule],
  templateUrl: './share-post.component.html',
  styleUrl: './share-post.component.scss',
})
export class SharePostComponent {
  post = input<Post>();
  modal = false;

  private postSharingService = inject(PostSharingService);
  private authService = inject(AuthenticationService);

  user = this.authService.getUser();
  userId = computed(() => this.user()?.uid);

  onShareClicked(post: Post | undefined, description: string) {
    const id = this.userId();
    if (id && post) {
      this.postSharingService.sharePost(id, post, description);
    }
  }
}
