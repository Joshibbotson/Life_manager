import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, Observable, map, tap } from 'rxjs'
import { environment } from '../../environments/environment'
import {
  IAuthLoginReponse,
  IValidateTknResponse,
} from '../../../../api/dist/auth/types.module'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly url = environment.apiBaseUrl
  emailInUse$ = new BehaviorSubject<boolean>(false)

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  registerNewUser(
    name: string,
    email: string,
    password: string,
    locale: string,
  ): Observable<IAuthLoginReponse> {
    return this.http
      .post<IAuthLoginReponse>(`${this.url}/user/newuser`, {
        name: name,
        email: email,
        password: password,
        locale: locale,
      })
      .pipe(
        tap((response) => {
          if (response.success) {
            localStorage.setItem('loginToken', response.token)
            localStorage.setItem('user', JSON.stringify(response.user))
          }
        }),
      )
  }

  public login(email: string, password: string): Observable<IAuthLoginReponse> {
    const loginData = { email, password }
    return this.http
      .post<IAuthLoginReponse>(`${this.url}/user/login`, loginData)
      .pipe(
        tap((response) => {
          console.log(response)
          if (response.success) {
            localStorage.setItem('loginToken', response.token)
            localStorage.setItem('user', JSON.stringify(response.user))
          }
        }),
      )
  }

  public logout(): void {
    localStorage.removeItem('loginToken')
    localStorage.removeItem('user')
    this.router.navigate(['/login'])
  }

  public validateToken(token: string) {
    const requestBody = { token: token }
    return this.http
      .post<IValidateTknResponse>(`${this.url}/user/validateToken`, requestBody)
      .pipe(
        map((response) => {
          return response.valid
        }),
      )
  }
}
