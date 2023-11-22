import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, concatMap, map, mergeMap, of, switchMap, tap } from 'rxjs'
import { ChoresRestService } from 'src/app/services/rest/chores/chores-rest.service'
import {
  loadChores,
  setSkipAndTake,
  loadChoresSuccess,
  createChore,
  createChoreSuccess,
  loadChoreById,
  loadChoreByIdSuccess,
  deleteChore,
  deleteChoreSuccess,
  reloadChores,
} from './chores.actions'

@Injectable()
export class ChoresEffects {
  constructor(
    private actions$: Actions,
    private choresService: ChoresRestService,
  ) {}

  readonly createChore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createChore),
      switchMap((action) =>
        this.choresService.create(action.chore).pipe(
          map((chore) => {
            return createChoreSuccess({ chore })
          }),
          catchError((error) => of(error)),
        ),
      ),
    ),
  )
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
  readonly deleteChoreById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteChore),
      mergeMap((action) =>
        this.choresService.delete(action.id).pipe(
          map((chore) => deleteChoreSuccess({ chore })),
          catchError((error) => of(error)),
        ),
      ),
    ),
  )
}
