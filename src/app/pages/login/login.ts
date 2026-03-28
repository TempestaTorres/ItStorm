import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthService} from '../../services/auth-service';
import {LoginFailure, LoginSuccess, LoginType} from '../../services/auth-types';
// @ts-ignore
import {HttpErrorResponse} from '@angular/common/module.d';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
})
export class Login implements OnDestroy {

  private subscription: Subscription | undefined;

  public processing: boolean = false;
  public formError: boolean = false;
  public errorMsg: string = '';

  public inputType: string = 'password';

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    remember: new FormControl(false),
  });

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  get email() {return this.loginForm.get('email');};
  get password() {return this.loginForm.get('password');};

  public onSubmit() {

    this.processing = true;

    if (this.loginForm.status === 'VALID') {

      this.formError = false;

        setTimeout(() => {
          this.processing = false;

          let data: LoginType = {
            email: this.loginForm.value.email,
            password: this.loginForm.value.password,
            rememberMe: this.loginForm.value.remember
          }
          this.subscription = this.authService.login(data).subscribe({
            next: (data: LoginSuccess | LoginFailure) => {

              if ((data as LoginFailure).error !== undefined) {
                this.errorMsg = (data as LoginFailure).message;
                this.formError = true;
              }

              if (!this.formError) {

                this.loginForm.reset();
                let response = data as LoginSuccess;

                this.authService.loginSuccess(response);
                this.router.navigate(['/']).then(() => {});
              }

            },
            error: (e: HttpErrorResponse) => {

              if (e.error && e.error.message) {
                this.errorMsg = e.error.message;
                this.formError = true;
              }
            }
          });

        }, 500);
    }
    else {
      setTimeout(() => {
        this.processing = false;
        this.formError = true;
        this.errorMsg = "Заполните обязательные поля!";
      }, 500);
    }

  }

  public eye(): void {
    if (this.inputType === 'password') {
      this.inputType = 'text';
    }
    else if (this.inputType === 'text') {
      this.inputType = 'password';
    }
  }
}
