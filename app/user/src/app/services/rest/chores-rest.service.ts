import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IChore } from '../../../../../api/dist/chores';
import { Store } from '@ngrx/store';
import * as ChoresActions from '../../../app/store/actions/chores.actions';

@Injectable({
  providedIn: 'root',
})
export class ChoresRestService {
  private readonly url = 'http://localhost:8080';

  constructor(private http: HttpClient, private store: Store) {}

  public create(request: any): Observable<IChore> {
    return this.http.post(`${this.url}/chores/create`, request)
    .pipe(
      map((response: any) => {
        // Dispatch createChoreSuccess action to update the store
        this.store.dispatch(ChoresActions.createChoreSuccess({ chore: response }));
        return response;
      })    );
  }

  public update(id: number) {
    return this.http.put(`${this.url}/chores/update`, id);
  }

  public read():Observable<IChore[]> {
    return this.http
      .get<IChore[]>(`${this.url}/chores/read`)
      .pipe(map((response: any) => response));
  }

  public readById(id: number):Observable<IChore> {
    return this.http
      .get<IChore>(`${this.url}/chores/read/${id}`)
      .pipe(map((response: any) => response));
  }

  public delete(id: number) {
    const payload = { id }; // we need to change the ID to json by placing it in an object.
    //this allow's angular's HTTP library to serialize the id.
    return this.http
        .put(`${this.url}/chores/delete/${id}`, payload)
        .pipe(map((response: any) => response));
}
}
