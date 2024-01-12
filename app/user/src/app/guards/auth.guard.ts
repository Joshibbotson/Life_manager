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
  ): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const loginToken = localStorage.getItem('loginToken')
      if (loginToken) {
        this.authService.validateToken(loginToken).subscribe((tkn) => {
          if (tkn) {
            console.log('true token exists')
            resolve(true)
          } else {
            console.log('false token none existant')

            this.authService.logout()

            resolve(false)
          }
        })
      } else {
        console.log('no token')
        this.router.navigate(['/login'])
        resolve(false)
      }
    })
  }
}
