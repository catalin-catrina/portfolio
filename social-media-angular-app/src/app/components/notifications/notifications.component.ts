import { Component, effect, inject } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-notifications',
  imports: [],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {
  panelOpened = false;

  private readonly router = inject(Router);
  private notificationsService = inject(NotificationsService);
  private profileService = inject(ProfileService);

  notifications = this.notificationsService.notifications;
  unseenNotifCount = this.notificationsService.unseenNotifCount;
  user = this.profileService.userProfile;

  openPanel(): void {
    this.panelOpened = !this.panelOpened;
    this.notifications().forEach((notification) => {
      if (!notification.seen) {
        this.notificationsService.markAsSeen(notification.id);
      }
    });
  }

  handleUsernameClick(userId: string) {
    this.router.navigate([`profile/${userId}`]);
  }

  handleNotificationClick(resourceId: string | null): void {
    this.router.navigate([`post/${resourceId}`]);
  }
}
