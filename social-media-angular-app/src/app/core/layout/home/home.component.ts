import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FeedComponent } from '../../../features/feed/components/feed/feed.component';
import { ProfileService } from '../../../shared/services/profile.service';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, FeedComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private profileService = inject(ProfileService);
  userProfile = this.profileService.userProfile;
}
