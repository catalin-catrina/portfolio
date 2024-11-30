import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedComponent } from './feed.component';

describe('FeedComponent', () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
<<<<<<<< HEAD:social-media-angular-app/src/app/components/feed/feed.component.spec.ts
      imports: [FeedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedComponent);
========
      imports: [FooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterComponent);
>>>>>>>> 7679a18108a523adf369f9187c24228263cf1d52:netflix-clone-angular-app (in-progress)/src/app/footer/footer.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
