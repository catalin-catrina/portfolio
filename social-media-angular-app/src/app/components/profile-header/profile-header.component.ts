import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { IUser } from '../../models/user.interface';
import { ProfileService } from '../../services/profile.service';
import { FollowService } from '../../services/follow.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'app-profile-header',
    imports: [CommonModule],
    templateUrl: './profile-header.component.html',
    styleUrl: './profile-header.component.scss'
})
export class ProfileHeaderComponent implements OnChanges {
  @Input() profileUserId!: string | null;
  @Input() isCurrentUser!: boolean;

  user!: IUser | null;
  isFollowing!: Boolean;

  private profileService = inject(ProfileService);
  private followService = inject(FollowService);
  private authService = inject(AuthenticationService);

  loggedInUserSignal = this.authService.getUser();
  loggedInUserIdSignal = computed(() => this.loggedInUserSignal()?.uid);

  ngOnChanges(changes: SimpleChanges): void {
    this.profileService.fetchUserById(this.profileUserId).then((user) => {
      this.user = user;
    });

    this.getIsFollowing();
  }

  getIsFollowing() {
    if (this.loggedInUserIdSignal() && this.profileUserId)
      this.followService
        .isFollowing(this.loggedInUserIdSignal() as string, this.profileUserId)
        .then((isFollowing) => {
          this.isFollowing = isFollowing;
        });
  }

  followUser(followerId: string | undefined, followedId: string | null) {
    if (followerId && followedId) {
      this.followService.followUser(followerId, followedId);
      this.getIsFollowing();
    }
  }

  unfollowUser(followerId: string | undefined, followedId: string | null) {
    if (followerId && followedId) {
      this.followService.unfollowUser(followerId, followedId);
      this.getIsFollowing();
    }
  }
}
