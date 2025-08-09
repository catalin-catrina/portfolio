import { TestBed } from '@angular/core/testing';

import { PostSharingService } from './post-sharing.service';

describe('PostSharingService', () => {
  let service: PostSharingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostSharingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
