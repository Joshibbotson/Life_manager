import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, map } from 'rxjs'
import { IChore, IChoreReadRequest } from '../../../../../../api/dist/chores'
import { Store } from '@ngrx/store'
import * as ChoresActions from '../../../state/chores/chores.actions'

@Injectable({
  providedIn: 'root',
})
export class ChoresRestService {
  private readonly url = 'http://localhost:8080'

  constructor(
    private http: HttpClient,
    private store: Store,
  ) {}

  public create(request: any): Observable<IChore> {
    console.log('client side create req:', request)
    return this.http.post(`${this.url}/chores/create`, request).pipe(
      map((response: any) => {
        return response
      }),
    )
  }

  public update(id: any): Observable<IChore> {
    const payload = { id }
    return this.http.put(`${this.url}/chores/update/${id}`, payload).pipe(
      map((response: any) => {
        return response
      }),
    )
  }

  public read(skip: number, take: number): Observable<IChoreReadRequest> {
    console.log('skip: ', skip)
    console.log('take: ', take)
    return this.http
      .get<IChore[]>(`${this.url}/chores/read?skip=${skip}&take=${take}`)
      .pipe(map((response: any) => response))
  }

  public readById(id: number): Observable<IChore> {
    console.log('read by Id: ', id)
    return this.http
      .get<IChore>(`${this.url}/chores/read/${id}`)
      .pipe(map((response: any) => response))
  }

  public delete(id: number) {
    const payload = { id } // we need to change the ID to json by placing it in an object.
    //this allow's angular's HTTP library to serialize the id.
    return this.http.put(`${this.url}/chores/delete/${id}`, payload).pipe(
      map((response: any) => {
        // this.store.dispatch(
        //   ChoresActions.deleteChoreSuccess({ chore: response }),
        // )
        return response
      }),
    )
  }
}
