import {CanActivateFn, CanMatchFn, Router} from '@angular/router';
import { inject } from "@angular/core";
import {map, tap} from "rxjs";
import {AuthService} from "../../modules/auth/services/auth.service";

export const authPublicGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  return authService.checkAuthentication()
    .pipe(
      tap(
        isAuthenticated => {
          if ( isAuthenticated ) {
            router.navigate(['/notes']);
          }
        }),
      map( isAuthenticated => !isAuthenticated)
    );
};
