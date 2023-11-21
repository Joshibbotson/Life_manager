import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs'
import { ChoresRestService } from 'src/app/services/rest/chores/chores-rest.service'
import {
  loadChores,
  setSkipAndTake,
  loadChoresSuccess,
  createChore,
  createChoreSuccess,
  loadChoreById,
  loadChoreByIdSuccess,
} from './chores.actions'

@Injectable()
export class ChoresEffects {
  constructor(
    private actions$: Actions,
    private choresService: ChoresRestService,
  ) {}

  readonly loadChores$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadChores, setSkipAndTake), // Listen for setPageAndPageSize action
      mergeMap(
        (
          action, //merge streams together into one
        ) =>
          this.choresService.read(action.skip, action.take).pipe(
            map((chores) => loadChoresSuccess({ chores })),
            catchError((error) => of(error)),
          ),
      ),
    ),
  )

  readonly loadChoreById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadChoreById),
      mergeMap((action) =>
        this.choresService.readById(action.id).pipe(
          map((chore) => loadChoreByIdSuccess({ chore })),
          catchError((error) => of(error)),
        ),
      ),
    ),
  )

  createChore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createChore),
      switchMap((action) =>
        this.choresService.create(action.chore).pipe(
          map((chore) => createChoreSuccess({ chore })),
          catchError((error) => of(error)),
        ),
      ),
    ),
  )
}
