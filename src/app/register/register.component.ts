import { Router } from '@angular/router';
import { AuthService } from './../shared/auth.service';
import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  email;
  message: {};

  // MD-Bootstrap Form
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router
  ) {
    this.registerForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  getErrorMessage() {
    return this.email.hasError('required')
      ? 'You must enter a value'
      : this.email.hasError('email')
        ? 'Not a valid email'
        : '';
  }

  tryRegister(value) {
    this.authService.doRegister(value).then(
      res => {
        console.log(res);
        this.errorMessage = '';
        this.successMessage = 'Tu cuenta ha sido creada, ya puedes inciar sesión';
      },
      err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      }
    );
  }

  tryFacebookLogin() {
    this.authService.doFacebookLogin().then(
      res => {
        this.router.navigate(['/muro']);
      },
      err => console.log(err)
    );
  }

  tryGoogleLogin() {
    this.authService.doGoogleLogin().then(
      res => {
        this.router.navigate(['/muro']);
      },
      err => console.log(err)
    );
  }

  // tryTwitterLogin() {
  //   this.authService.doTwitterLogin().then(
  //     res => {
  //       this.router.navigate(['/muro']);
  //     },
  //     err => console.log(err)
  //   );
  // }
}

