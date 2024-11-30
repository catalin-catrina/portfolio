import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent]
    })
    .compileComponents();
<<<<<<<< HEAD:social-media-angular-app/src/app/components/home/home.component.spec.ts

========
    
>>>>>>>> 7679a18108a523adf369f9187c24228263cf1d52:netflix-clone-angular-app (in-progress)/src/app/home/home.component.spec.ts
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
