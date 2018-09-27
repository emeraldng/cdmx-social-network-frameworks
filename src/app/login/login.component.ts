// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }


import { Router } from '@angular/router';
import { AuthService } from './../shared/auth.service';
import { Component, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;

  @Input()
  id: string;
  errorMessage: string;
  loginForm: FormGroup;
  email;

  // MD-Bootstrap Form
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router
  ) {
    this.loginForm = fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required]
    });
  }

  getErrorMessage() {
    return this.email.hasError('required')
      ? 'You must enter a value'
      : this.email.hasError('email')
        ? 'Not a valid email'
        : '';
  }

  tryLogin(value) {
    this.authService.doLogin(value).then(
      res => {
        this.router.navigate(['/muro']);
      },
      err => {
        console.log(err);
        this.errorMessage = err.message;
      }
    );
  }

  tryFacebookLogin() {
    this.authService.doFacebookLogin().then(res => {
      this.router.navigate(['/muro']);
    });
  }

  tryGoogleLogin() {
    this.authService.doGoogleLogin().then(res => {
      this.router.navigate(['/muro']);
    });
  }

  // tryTwitterLogin() {
  //   this.authService.doTwitterLogin().then(res => {
  //     this.router.navigate(['/muro']);
  //   });
  // }
}
