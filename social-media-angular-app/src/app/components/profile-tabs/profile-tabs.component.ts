import { Component, Input, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { PostsComponent } from '../posts/posts.component';

@Component({
  selector: 'app-profile-tabs',
  standalone: true,
  imports: [MatTabsModule, CommonModule, PostsComponent],
  templateUrl: './profile-tabs.component.html',
  styleUrl: './profile-tabs.component.scss',
})
export class ProfileTabsComponent {
  @Input() profileUserId!: string | null;
  @Input() isCurrentUser!: boolean;
}
