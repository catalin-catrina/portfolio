import { TestBed } from '@angular/core/testing';

import { PostSavingService } from './post-saving.service';

describe('PostSavingService', () => {
  let service: PostSavingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostSavingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
