import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { LikesService } from '../../services/likes.service';
import { Post } from '../../models/post.interface';
import { AuthenticationService } from '../../services/authentication.service';
import { IUser } from '../../models/user.interface';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-likes',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './likes.component.html',
  styleUrl: './likes.component.scss',
})
export class LikesComponent implements OnInit {
  @Input() post!: Post | ((Post & { userName: string }) | null);
  @Input() feedLikes = false;
  @Input() profileLikes = false;

  postLikers: IUser[] = [];

  private likesService = inject(LikesService);
  private authService = inject(AuthenticationService);

  private userSignal = this.authService.getUser();
  user = this.userSignal();

  userLikedPost = false;

  ngOnInit(): void {
    if (this.post && this.post.id && this.user) {
      this.likesService
        .hasUserLikedPost(this.post.id, this.user.uid)
        .then((hasUserLikedPost) => {
          this.userLikedPost = hasUserLikedPost;
        });
    }
  }

  async handleLike(postId: string | undefined) {
    if (this.post && this.user && postId) {
      if (this.userLikedPost) {
        this.likesService.unlikePost(postId, this.user.uid);
        this.userLikedPost = false;
        this.post.likesCount--;
      } else {
        this.likesService.likePost(postId, this.user.uid);
        this.userLikedPost = true;
        this.post.likesCount++;
      }
    }
  }

  oneLikesClicked(postId: string | undefined) {
    if (postId) {
      this.likesService
        .getUsersWhoLikedPost(postId)
        .subscribe((users: IUser[]) => {
          console.log(users);
          this.postLikers = users;
        });
    }
  }
}
