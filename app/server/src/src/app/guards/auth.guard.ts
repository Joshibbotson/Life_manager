import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Router } from '@angular/router'
import { AuthService } from '../services/auth/auth.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    const loginToken = localStorage.getItem('loginToken')
    if (loginToken) {
      if (this.authService.validateToken(loginToken)) {
        return true
      } else {
        this.authService.logout()
        // this.router.navigate(['/login'])
        return false
      }
    }

    this.router.navigate(['/login'])
    return false
  }
}
