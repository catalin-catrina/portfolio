import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  authService = inject(AuthenticationService);

  onSubmit(form: NgForm) {
    const emailInput = form.value.email;
    const fullnameInput = form.value.fullname;
    const usernameInput = form.value.username;
    const passwordInput = form.value.password;

    this.authService.signupUser(emailInput, passwordInput, {
      fullname: fullnameInput,
      username: usernameInput,
    });
  }
}
