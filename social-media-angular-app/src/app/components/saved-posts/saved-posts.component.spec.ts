import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedPostsComponent } from './saved-posts.component';

describe('SavedPostsComponent', () => {
  let component: SavedPostsComponent;
  let fixture: ComponentFixture<SavedPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedPostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
