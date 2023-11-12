import { Injectable } from "@angular/core";
import {Actions, createEffect, ofType} from '@ngrx/effects'
import { catchError, map, mergeMap, of, switchMap, tap } from "rxjs";
import { ChoresRestService } from "src/app/services/rest/chores/chores-rest.service";
import * as ChoresActions from '../actions/chores.actions'

@Injectable()
export class ChoresEffects{
constructor(private actions$: Actions, private choresService: ChoresRestService){}

  readonly loadChores$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ChoresActions.loadChores),
    mergeMap(() => 
    this.choresService.read().pipe(
      map((chores) => ChoresActions.loadChoresSuccess({ chores })),
      tap(x => console.log(x.chores.data)),
      catchError((error) => of(error))
    )))
  )

  createChore$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ChoresActions.createChore),
    switchMap((action) =>
      this.choresService.create(action.chore).pipe(
        map((chore) => ChoresActions.createChoreSuccess({ chore })),
        catchError((error) => of(error))
      )
    )
  )
);
}