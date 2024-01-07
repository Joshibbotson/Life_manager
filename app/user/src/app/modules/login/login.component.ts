import { Component, OnDestroy } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { Store } from '@ngrx/store'
import { AuthService } from 'src/app/services/auth/auth.service'
import { LinksService } from 'src/app/services/links/links.service'
import * as AuthActions from '../../state/auth/auth.actions'
import {
  selectAuthError,
  selectCurrentUser,
} from 'src/app/state/auth/auth.selectors'
import { Subject, takeUntil } from 'rxjs'
import { IAuthLoginReponse } from '../../../../../api/dist/auth/types.module'

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule, RouterModule],
})
export class LoginComponent implements OnDestroy {
  public readonly loginForm: FormGroup
  private destroy$ = new Subject<void>()

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private links: LinksService,
    private store: Store,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })

    this.links.updateLinks([{ url: '/', name: 'home' }])
  }

  ngOnInit(): void {}
  public ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
  //it would be nice if the router.navigate took us back to whatever page we were on...
  login(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value
      const password = this.loginForm.get('password')?.value

      this.store.dispatch(AuthActions.loginUser({ email, password }))
      this.store
        .select(selectCurrentUser)
        .pipe(takeUntil(this.destroy$))
        .subscribe((user: IAuthLoginReponse | null) => {
          if (user) {
            this.router.navigate(['/'])
          }
        })

      const errorSubscription = this.store
        .select(selectAuthError)
        .subscribe((error) => {
          if (error) {
            console.error('Login error:', error)
            // Handle login error, show error message?
          }
        })
    }
  }
}
