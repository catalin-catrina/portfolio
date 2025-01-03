import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthenticationService } from '../../services/authentication.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserSearchComponent } from '../user-search/user-search.component';

@Component({
    selector: 'app-sidebar',
    imports: [MatButtonModule, RouterLink, RouterLinkActive, UserSearchComponent],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  private auth = inject(AuthenticationService);
  user = this.auth.getUser();

  logout() {
    this.auth.logout();
  }
}
