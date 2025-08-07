import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:social-media-angular-app/src/app/components/create-comment/create-comment.component.spec.ts
import { CreateCommentComponent } from './create-comment.component';

describe('CreateCommentComponent', () => {
  let component: CreateCommentComponent;
  let fixture: ComponentFixture<CreateCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCommentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCommentComponent);
========
import { SwiperComponent } from './swiper.component';

describe('SwiperComponent', () => {
  let component: SwiperComponent;
  let fixture: ComponentFixture<SwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwiperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SwiperComponent);
>>>>>>>> 7679a18108a523adf369f9187c24228263cf1d52:netflix-clone-angular-app (in-progress)/src/app/swiper/swiper.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
