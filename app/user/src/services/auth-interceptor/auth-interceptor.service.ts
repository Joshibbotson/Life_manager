import { Injectable } from '@angular/core'
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const loginToken = localStorage.getItem('loginToken')
    if (loginToken) {
      const modifiedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${loginToken}`,
        },
      })
      return next.handle(modifiedRequest)
    }
    return next.handle(req)
  }
}
