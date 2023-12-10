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
        console.log('true a logntoken exist')
        this.authService.validateToken(loginToken).subscribe((tkn) => {
          console.log(tkn)
          if (tkn) {
            resolve(true)
          } else {
            this.authService.logout()
            resolve(false)
          }
        })
      } else {
        this.router.navigate(['/login'])
        resolve(false)
      }
    })
  }
}
