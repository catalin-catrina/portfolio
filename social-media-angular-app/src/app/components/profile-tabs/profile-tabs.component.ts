import { Component, Input, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { PostsComponent } from '../posts/posts.component';
import { LikedPostsComponent } from '../liked-posts/liked-posts.component';
import { SavedPostsComponent } from '../saved-posts/saved-posts.component';

@Component({
    selector: 'app-profile-tabs',
    imports: [
        MatTabsModule,
        CommonModule,
        PostsComponent,
        LikedPostsComponent,
        SavedPostsComponent,
    ],
    templateUrl: './profile-tabs.component.html',
    styleUrl: './profile-tabs.component.scss'
})
export class ProfileTabsComponent {
  @Input() profileUserId!: string | null;
  @Input() isCurrentUser!: boolean;
}
