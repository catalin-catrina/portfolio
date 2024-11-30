import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:social-media-angular-app/src/app/components/create-post/create-post.component.spec.ts
import { CreatePostComponent } from './create-post.component';

describe('CreatePostComponent', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePostComponent);
========
import { HeroComponent } from './hero.component';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroComponent);
>>>>>>>> 7679a18108a523adf369f9187c24228263cf1d52:netflix-clone-angular-app (in-progress)/src/app/hero/hero.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
