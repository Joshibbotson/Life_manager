import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class UserRestService {
  private readonly url = environment.apiBaseUrl
  constructor(private http: HttpClient) {}

  searchUsers(searchTerm: string) {
    return this.http
      .get(`${this.url}/user/read?term=${searchTerm}&take=10`)
      .pipe(map((response: any) => response))
    // update take via NgRx in future
  }
}
