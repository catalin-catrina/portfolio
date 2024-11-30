import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

<<<<<<<< HEAD:social-media-angular-app/src/app/app.component.spec.ts
  it(`should have the 'angular-instagram-clone' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-instagram-clone');
========
  it(`should have the 'netflix-clone-angular-app' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('netflix-clone-angular-app');
>>>>>>>> 7679a18108a523adf369f9187c24228263cf1d52:netflix-clone-angular-app (in-progress)/src/app/app.component.spec.ts
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
<<<<<<<< HEAD:social-media-angular-app/src/app/app.component.spec.ts
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, angular-instagram-clone');
========
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, netflix-clone-angular-app');
>>>>>>>> 7679a18108a523adf369f9187c24228263cf1d52:netflix-clone-angular-app (in-progress)/src/app/app.component.spec.ts
  });
});
