import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Subscription} from 'rxjs';
import {AuthService} from '../../services/auth-service';
import {Router, RouterLink} from '@angular/router';
import {LoginFailure, LoginSuccess, LoginType, SignupType} from '../../services/auth-types';
// @ts-ignore
import {HttpErrorResponse} from '@angular/common/module.d';

@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './signup.html',
})
export class Signup implements OnDestroy {

  private subscription: Subscription | undefined;

  public processing: boolean = false;
  public formError: boolean = false;
  public errorMsg: string = '';

  public signupForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    policy: new FormControl(false),
  });

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  get name() {return this.signupForm.get('name');};
  get email() {return this.signupForm.get('email');};
  get password() {return this.signupForm.get('password');};

  public onSubmit() {

    this.processing = true;

    if (this.signupForm.status === 'VALID') {

      this.formError = false;

      setTimeout(() => {
        this.processing = false;

        let data: SignupType = {
          name: this.signupForm.value.name,
          email: this.signupForm.value.email,
          password: this.signupForm.value.password,
        }
        this.subscription = this.authService.signup(data).subscribe({
          next: (data: LoginSuccess | LoginFailure) => {

            if ((data as LoginFailure).error !== undefined) {
              this.errorMsg = (data as LoginFailure).message;
              this.formError = true;
            }

            if (!this.formError) {

              this.signupForm.reset();
              this.router.navigate(['/login']).then(() => {});
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
}
