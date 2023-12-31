import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, map } from 'rxjs'
import {
  IFilter,
  IReadTodo,
  ISort,
  ITodo,
  ITodoCreateResponse,
  ITodoDeleteResponse,
  ITodoReadOneByIdResponse,
  ITodoReadRequest,
  ITodoReadResponse,
  ITodoUpdateResponse,
} from '../../../../../../api/dist/todos'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class TodosRestService {
  private readonly url = environment.apiBaseUrl

  constructor(private http: HttpClient) {}

  public create(request: any): Observable<ITodoCreateResponse> {
    console.log('client side create req:', request)
    return this.http.post(`${this.url}/todos/create`, request).pipe(
      map((response: any) => {
        console.log('create res: ', response)
        return response
      }),
    )
  }

  public update(id: any): Observable<ITodoUpdateResponse> {
    const payload = { id }
    return this.http.put(`${this.url}/todos/update/${id}`, payload).pipe(
      map((response: any) => {
        return response
      }),
    )
  }

  public read(
    skip: number,
    take: number,
    filter?: Partial<IFilter>,
    sort?: Partial<ISort>,
    term?: string,
  ): Observable<ITodoReadResponse> {
    console.log(filter)
    const filterParam = filter
      ? `&filter=${encodeURIComponent(JSON.stringify(filter))}`
      : ''
    const sortParam = sort
      ? `&sort=${encodeURIComponent(JSON.stringify(sort))}`
      : ''
    const termParam = term ? `&term=${encodeURIComponent(term)}` : ''

    console.log(filterParam)
    return this.http
      .get<ITodoReadResponse>(
        `${this.url}/todos/read?skip=${skip}&take=${take}${filterParam}${sortParam}${termParam}`,
      )
      .pipe(map((response: any) => response))
  }

  public readById(id: number): Observable<ITodoReadOneByIdResponse> {
    console.log('read by Id: ', id)
    return this.http
      .get<IReadTodo>(`${this.url}/todos/read/${id}`)
      .pipe(map((response: any) => response))
  }

  public delete(id: number): Observable<ITodoDeleteResponse> {
    const payload = { id } // we need to change the ID to json by placing it in an object.
    //this allow's angular's HTTP library to serialize the id.
    return this.http.put(`${this.url}/todos/delete/${id}`, payload).pipe(
      map((response: any) => {
        return response
      }),
    )
  }
}
