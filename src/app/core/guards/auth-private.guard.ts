import {CanActivateFn, CanMatchFn, Router} from '@angular/router';
import { inject } from "@angular/core";
import { tap } from "rxjs";
import {AuthService} from "../../modules/auth/services/auth.service";

export const authPrivateGuard: CanActivateFn = (route, state) => {
  return checkAuthStatus();
};

const checkAuthStatus = () => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  return authService.checkAuthentication()
    .pipe(
      tap( isAuthenticated => {
        if ( !isAuthenticated ) {
          router.navigate(['/auth/login']);
        }
      })
    );
}
