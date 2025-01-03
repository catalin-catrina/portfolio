import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ProfileHeaderComponent } from '../profile-header/profile-header.component';
import { ProfileTabsComponent } from '../profile-tabs/profile-tabs.component';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-profile',
    imports: [ProfileHeaderComponent, ProfileTabsComponent, CommonModule],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private auth = inject(AuthenticationService);

  currentUserSignal = this.auth.getUser();
  profileUserId = signal<string | null>(null);
  isLoading = signal(true);

  isCurrentUser = computed(() => {
    return this.currentUserSignal()?.uid === this.profileUserId();
  });

  constructor() {
    effect(
      () => {
        if (this.currentUserSignal()?.uid && this.profileUserId()) {
          this.isLoading.set(false);
        }
      },
      { allowSignalWrites: true }
    );
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((data) => {
      const userId = data.get('id');
      this.profileUserId.set(userId);
    });
  }
}
