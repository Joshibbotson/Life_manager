import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, map } from 'rxjs'
import { ITodo, ITodoReadRequest } from '../../../../../../api/dist/todos'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class TodosRestService {
  private readonly url = environment.apiBaseUrl

  constructor(private http: HttpClient) {}

  public create(request: any): Observable<ITodo> {
    console.log('client side create req:', request)
    return this.http.post(`${this.url}/todos/create`, request).pipe(
      map((response: any) => {
        return response
      }),
    )
  }

  public update(id: any): Observable<ITodo> {
    const payload = { id }
    return this.http.put(`${this.url}/todos/update/${id}`, payload).pipe(
      map((response: any) => {
        return response
      }),
    )
  }

  public read(skip: number, take: number): Observable<ITodoReadRequest> {
    console.log('read')
    return this.http
      .get<ITodo[]>(`${this.url}/todos/read?skip=${skip}&take=${take}`)
      .pipe(map((response: any) => response))
  }

  public readById(id: number): Observable<ITodo> {
    console.log('read by Id: ', id)
    return this.http
      .get<ITodo>(`${this.url}/todos/read/${id}`)
      .pipe(map((response: any) => response))
  }

  public delete(id: number) {
    const payload = { id } // we need to change the ID to json by placing it in an object.
    //this allow's angular's HTTP library to serialize the id.
    return this.http.put(`${this.url}/todos/delete/${id}`, payload).pipe(
      map((response: any) => {
        return response
      }),
    )
  }
}
