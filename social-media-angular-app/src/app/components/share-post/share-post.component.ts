import { Component, input } from '@angular/core';
import { Post } from '../../models/post.interface';

@Component({
  selector: 'app-share-post',
  imports: [],
  templateUrl: './share-post.component.html',
  styleUrl: './share-post.component.scss',
})
export class SharePostComponent {
  post = input<Post>();

  onShareClicked(postId: string | undefined) {}
}
