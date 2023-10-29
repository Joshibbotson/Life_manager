import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ChoresRestService {
  private readonly url = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  public async create(request: any) {
    return this.http.post(`${this.url}/chores/create`, request);
  }

  public update(id: number) {
    return this.http.put(`${this.url}/chores/update`, id);
  }

  public read() {
    return this.http
      .get(`${this.url}/chores/read`)
      .pipe(map((response: any) => response));
  }

  public readById(id: number) {
    return this.http
      .get(`${this.url}/chores/read/${id}`)
      .pipe(map((response: any) => response));
  }

  public delete(id:number){
    console.log(id)
    return this.http
    .put(`${this.url}/chores/delete/${id}`, id)
      .pipe(map((response: any) => response));  }
}
