import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, Observable, map, tap } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly url = 'http://localhost:8080'
  emailInUse$ = new BehaviorSubject<boolean>(false)

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  // registerNewUser(name: string, email: string, password: string) {
  //   return this.http
  //     .post(`${this.url}/user/newuser`, {
  //       name: name,
  //       email: email,
  //       password: password,
  //     })
  //     .subscribe(
  //       (response: any) => {},
  //       (error) => {
  //         if (error.status === 409) {
  //         }
  //       },
  //     )
  // }

  // Should dispatch to user state here and user state should be something like {currUser: {}}
  registerNewUser(name: string, email: string, password: string) {
    return this.http
      .post(`${this.url}/user/newuser`, {
        name: name,
        email: email,
        password: password,
      })
      .subscribe(
        (response: any) => {
          this.emailInUse$.next(false)
          this.router.navigate(['/login'])
        },
        (error) => {
          if (error.status === 409) {
            this.emailInUse$.next(true)
          }
        },
      )
  }

  public login(email: string, password: string): Observable<any> {
    const loginData = { email, password }
    return this.http.post<any>(`${this.url}/user/login`, loginData).pipe(
      tap((response) => {
        if (response.success) {
          localStorage.setItem('loginToken', response.token)
          localStorage.setItem('user', JSON.stringify(response.user))
        }
      }),
    )
  }

  public logout() {
    console.log('this logout')
    localStorage.removeItem('loginToken')
    localStorage.removeItem('user')
    this.router.navigate(['/login'])
  }

  public validateToken(token: string) {
    console.log(token)
    const requestBody = { token: token }
    return this.http
      .post<{ valid: boolean }>(`${this.url}/user/validateToken`, requestBody)
      .pipe(
        map((response) => {
          console.log(response.valid)
          return response.valid
        }),
      )
  }
}
