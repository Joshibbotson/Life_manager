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
import { IReadUser } from '../../../../../api/dist/users'

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
    private authService: AuthService,
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
    console.log('called')
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value
      const password = this.loginForm.get('password')?.value

      // Dispatch the login action
      this.store.dispatch(AuthActions.loginUser({ email, password }))

      // Subscribe to the Auth State to handle the response
      const userSubscription = this.store
        .select(selectCurrentUser)
        .subscribe((user) => {
          console.log(user)

          // Optionally, handle null user case (not logged in or failed)
        })
      this.store
        .select(selectCurrentUser)
        .pipe(takeUntil(this.destroy$))
        .subscribe((user: IReadUser | null) => {
          console.log('i select user: ', user)
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
