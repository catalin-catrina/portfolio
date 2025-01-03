import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { MatButtonModule } from '@angular/material/button';
import { FeedComponent } from '../feed/feed.component';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, FeedComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private authService = inject(AuthenticationService);
  userDetails = this.authService.userDetails;
}
