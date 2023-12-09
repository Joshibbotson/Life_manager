import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly url = 'http://localhost:8080'

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  registerNewUser(name: string, email: string, password: string) {
    return this.http
      .post(`${this.url}/user/newuser`, {
        name: name,
        email: email,
        password: password,
      })
      .subscribe(
        (response: any) => {},
        (error) => {
          if (error.status === 409) {
          }
        },
      )
  }

  public login(email: string, password: string) {
    console.log('email:', email, 'pass:', password)
    const loginData = {
      email: email,
      password: password,
    }
    return this.http
      .post(`${this.url}/user/login`, loginData)
      .subscribe((response: any) => {
        localStorage.setItem('loginToken', response.token)
        localStorage.setItem('user', response.user)
        return true
      })
  }

  public logout() {
    localStorage.removeItem('loginToken')
    localStorage.removeItem('user')
    this.router.navigate(['/login'])
  }

  public validateToken(token: string) {
    console.log(token)
    const requestBody = { token: token }
    return this.http
      .post<{ valid: boolean }>(`${this.url}/user/validateToken`, requestBody)
      .subscribe((response) => {
        return response.valid ? true : false
      })
  }
}
