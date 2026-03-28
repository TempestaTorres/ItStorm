import {CanActivateFn, RedirectCommand, Router} from '@angular/router';
import {AuthService} from '../services/auth-service';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    const loginPath = router.parseUrl("/");
    return new RedirectCommand(loginPath, {
      skipLocationChange: true,
    });
  }
  return true;
};
