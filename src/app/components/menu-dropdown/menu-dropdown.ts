import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {AuthService} from '../../services/auth-service';
import {Subscription} from 'rxjs';
import {LoginFailure, User} from '../../services/auth-types';
// @ts-ignore
import {HttpErrorResponse} from '@angular/common/module.d';

@Component({
  selector: 'menu-dropdown',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './menu-dropdown.html',
  styleUrl: './menu-dropdown.css',
})
export class MenuDropdown implements OnInit, OnDestroy {

  @Input()menuType: string = 'ABOUT';

  public active: boolean = false;
  public menuLink: string = '/about';

  public userName: string | null = '';

  private subscription: Subscription | undefined;
  private loginSubscription: Subscription | undefined;
  private userSubscription: Subscription | undefined;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {

    if (this.menuType === 'ABOUT') {
      this.menuLink = '/about';
    }
    else if (this.menuType === 'ACCOUNT') {
      this.menuLink = '/personal';

      let isLogged: boolean = this.authService.isLoggedIn();

      if (isLogged) {
        this.getUserInfo();
      }
      this.loginSubscription = this.authService.loginStatus.subscribe(value => {
        if (value) {

          this.getUserInfo();
        }
      });
    }
  }

  private getUserInfo(): void {

    this.userSubscription = this.authService.getUserInfo().subscribe({
      next: (data: User | LoginFailure) => {
        if ((data as User).name !== undefined) {
          this.userName = (data as User).name;
        }
      },
      error: error => {
        this.userName = 'unknown user';
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  public openDropdown(): void {
    this.active = true;
  }

  public closeDropdown(): void {
    this.active = false;
  }

  public logout(): void {

    this.subscription = this.authService.logout().subscribe({
      next: (data: LoginFailure) => {

        if(data.error)
          console.log('error logged out', data.message);
        this.forceLogout();
      },
      error: (e: HttpErrorResponse) => {
        if (e.error && e.error.message) {
          console.error('error', e.error.message);
        }
        this.forceLogout();
      }
    });
  }

  private forceLogout(): void {
    this.authService.logoutSuccess();
    this.router.navigate(['/login']).then(() => {});
  }
}
