import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastService} from '../../../shared/Services/toast.service';
import {AuthenticationServiceService} from '../../../shared/Services/authentication-service.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  vMsg = {
    username: [
      { type: 'required', message: 'User Name is required' },
      // { type: 'minlength', message: 'User Name must be at least 4 characters long' },
      // { type: 'maxlength', message: 'User Name cannot be more than 25 characters long' },
      // { type: 'pattern', message: 'Your User Name must contain only numbers and letters' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      // { type: 'minlength', message: 'Password must be at least 8 characters long' },
      // { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ]
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationServiceService,
    private router: Router,
    private toastService: ToastService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.authService.logout();
    this.loginForm = this.fb.group({
      username: ['', Validators.compose([
        // Validators.maxLength(25),
        // Validators.minLength(4),
        // Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required,
        // Validators.minLength(8),
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])],
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';

  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.username, this.loginForm.value.password)
        .pipe(first())
        .subscribe(
          data => {
            if (this.returnUrl.length > 1) {
              this.router.navigate([this.returnUrl]);
              // this.toastService.listOfErrors(data.)
            } else if (localStorage.getItem(this.authService.passwordChanged) === 'false') {
              this.router.navigate(['/profile/change-password']);
            } else {
              this.toastService.success('Success', 'Success');
              this.router.navigate(['/dashboard']);
              // this.router.navigate(['/profile/change-password']);
            }
          }
        );
    }
  }

  cancel() {
    this.loginForm.reset();
  }

}
