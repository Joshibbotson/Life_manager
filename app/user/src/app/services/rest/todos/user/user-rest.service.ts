import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class UserRestService {
  private readonly url = 'http://localhost:8080'
  constructor(private http: HttpClient) {}

  searchUsers(searchTerm: string) {
    return this.http
      .get(`${this.url}/user/read?term=${searchTerm}&take=10`)
      .pipe(map((response: any) => response))
    // update take via NgRx in future
  }
}
