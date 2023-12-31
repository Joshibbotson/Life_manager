import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, mergeMap, tap } from 'rxjs/operators'

import * as AuthActions from './auth.actions'
import { AuthService } from 'src/app/services/auth/auth.service'

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
  ) {}
  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginUser),
      mergeMap((action) =>
        this.authService.login(action.email, action.password).pipe(
          map((user) => AuthActions.loginUserSuccess({ user })),
          catchError((error) => of(AuthActions.loginUserFailure({ error }))),
        ),
      ),
    ),
  )

  // rehydrateUser$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthActions.rehydrateUser),

  //   ))

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutUser),
        tap(() => {
          this.authService.logout()
        }),
      ),
    { dispatch: false },
  )
}
