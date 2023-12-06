// auth.guard.ts

import { Injectable } from '@angular/core'
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router'
import { AuthService } from '../services/auth/auth.service'
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    if (this.authService.isLoggedIn()) {
      // Implement your own isLoggedIn method in AuthService
      return true // User is logged in, allow access to the route
    } else {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url },
      })
      return false // User is not logged in, redirect to login page
    }
  }
}
