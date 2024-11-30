import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsComponent } from './comments.component';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
<<<<<<<< HEAD:social-media-angular-app/src/app/components/comments/comments.component.spec.ts
      imports: [CommentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentsComponent);
========
      imports: [HeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderComponent);
>>>>>>>> 7679a18108a523adf369f9187c24228263cf1d52:netflix-clone-angular-app (in-progress)/src/app/header/header.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
