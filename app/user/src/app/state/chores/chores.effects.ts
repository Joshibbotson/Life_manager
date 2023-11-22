import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap, of, switchMap } from 'rxjs'
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
  completeChore,
  completeChoreSuccess,
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

  readonly completeChoreById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(completeChore),
      mergeMap((action) =>
        this.choresService.update(action.id).pipe(
          map((chore) => completeChoreSuccess({ chore })),
          catchError((error) => of(error)),
        ),
      ),
    ),
  )
}
