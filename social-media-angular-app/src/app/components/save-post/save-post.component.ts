import { Component, inject, Input, OnInit } from '@angular/core';
import { Post } from '../../models/post.interface';
import { CommonModule } from '@angular/common';
import { SavedPostsService } from '../../services/saved-posts.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-save-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './save-post.component.html',
  styleUrl: './save-post.component.scss',
})
export class SavePostComponent implements OnInit {
  @Input() post!: Post;

  isSaved = false;

  private savedPostsService = inject(SavedPostsService);
  private authService = inject(AuthenticationService);
  userSignal = this.authService.getUser();
  user = this.userSignal();

  ngOnInit(): void {
    if (this.post.id && this.user) {
      this.savedPostsService
        .hasUserSavedPost(this.post.id, this.user.uid)
        .then((hasUserSavedPost: boolean) => {
          this.isSaved = hasUserSavedPost;
        });
    }
  }

  onSavePost(postId: string | undefined) {
    if (postId && this.user) {
      if (this.isSaved) {
        this.savedPostsService.unsavePost(postId, this.user.uid);
        this.isSaved = false;
      } else {
        this.savedPostsService.savePost(postId, this.user.uid);
        this.isSaved = true;
      }
    }
  }
}
