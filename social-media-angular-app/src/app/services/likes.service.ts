import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LikesService {
  constructor() {}

  likePost(postId: string, userId: string) {}

  unlikePost(postId: string, userId: string) {}

  hasUserLikedPost(postId: string, userId: string): Promise<boolean> {}

  getLikesCount(postId: string): Promise<number> {}
}
