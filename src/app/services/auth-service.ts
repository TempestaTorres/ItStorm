import { Injectable } from '@angular/core';
import {Observable, Observer, Subject} from 'rxjs';
import {LoginFailure, LoginSuccess, LoginType, SignupType, User} from './auth-types';
import {Environment} from '../environment/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authorized: boolean = false;
  public loginStatus: Subject<boolean> = new Subject<boolean>();

  public accessTokenKey: string = 'accessToken';
  public refreshTokenKey: string = 'refreshToken';
  public userIdKey: string = 'userId';

  constructor(private http: HttpClient) {
    this.authorized = !!localStorage.getItem(this.accessTokenKey);
  }

  public login(data: LoginType) : Observable<LoginSuccess | LoginFailure> {
    return this.http.post<LoginSuccess | LoginFailure>(Environment.api + 'login',data);
  }
  public signup(data: SignupType) : Observable<LoginSuccess | LoginFailure> {
    return this.http.post<LoginSuccess | LoginFailure>(Environment.api + 'signup',data);
  }

  public getUserInfo(): Observable<User | LoginFailure> {
    let accessToken: string | null = localStorage.getItem(this.accessTokenKey);
    if (accessToken) {
      return this.http.get<User>(Environment.api + 'users',  {
        headers: {
          'x-auth': accessToken,
        }});
    }
    else {
      return new Observable(observer => {
        observer.next({error: true, message: 'Unauthorized'});
      })
    }
  }

  public logout(): Observable<LoginFailure> {

    let token: string | null = localStorage.getItem(this.refreshTokenKey);

    if (token) {
      return this.http.post<LoginFailure>(Environment.api + 'logout', {
        refreshToken: token
      });
    }
    else {
      return new Observable<LoginFailure>((observer: Observer<LoginFailure>) => {
        observer.next({
          error: true,
          message: 'the token not found',
        })
      })
    }
  }

  public logoutSuccess(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.userIdKey);

    this.authorized = false;
    this.loginStatus.next(this.authorized);
  }

  public isLoggedIn(): boolean {
    return this.authorized;
  }

  public loginSuccess(data: LoginSuccess): void {

    localStorage.setItem(this.accessTokenKey, data.accessToken);
    localStorage.setItem(this.refreshTokenKey, data.refreshToken);
    localStorage.setItem(this.userIdKey, data.userId);

    this.authorized = true;
    this.loginStatus.next(this.authorized);
  }

  public getTokens(): { accessToken: string | null, refreshToken: string | null } {

    return {
      accessToken: localStorage.getItem(this.accessTokenKey),
      refreshToken: localStorage.getItem(this.refreshTokenKey)
    }
  }

  get userId(): string | null {
    return localStorage.getItem(this.userIdKey);
  }

}
