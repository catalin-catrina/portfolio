import { Component, effect, inject } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Notification } from '../../models/notification.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  imports: [],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {
  panelOpened = false;
  notifications: Notification[] = [];

  private readonly router = inject(Router);
  private loginService = inject(AuthenticationService);
  private notificationsService = inject(NotificationsService);
  user = this.loginService.getUser();

  notificationsEffect = effect(async () => {
    const loggedInUser = this.user();
    if (loggedInUser && loggedInUser.uid) {
      this.notifications = await this.notificationsService.getNotifications(
        loggedInUser.uid
      );
    }
  });

  openPanel(): void {
    this.panelOpened = !this.panelOpened;
  }

  handleUsernameClick(userId: string) {
    this.router.navigate([`profile/${userId}`]);
  }

  handleNotificationClick(resourceId: string): void {
    this.router.navigate([`post/${resourceId}`]);
  }
}
