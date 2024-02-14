import { Component } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { Store } from '@ngrx/store'
import { Ilinks, LinksService } from 'src/app/services/links/links.service'
import { Subject, takeUntil } from 'rxjs'
import { AuthService } from 'src/app/services/auth/auth.service'
import * as AuthActions from '../../state/auth/auth.actions'
import {
  selectCurrentUser,
  selectAuthError,
} from 'src/app/state/auth/auth.selectors'
import { IAuthLoginReponse } from '../../../../../api/dist/auth/types.module'
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha'
import * as environment from '../../../environments/environment'

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    ReactiveFormsModule,
    RouterModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
})
export class RegisterComponent {
  public homeLinks: Ilinks[] = [{ url: '/todos', name: 'Todos' }]
  public destroy$: Subject<void> = new Subject()
  public captchaResponse: string | null = null
  public emailInUse$ = this.authService.emailInUse$
  public reCaptchaKey = environment.environment.reCapatchaKey
  registerForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.email],
    password: ['', [Validators.required, Validators.minLength(8)]],
  })

  constructor(
    private links: LinksService,
    private router: Router,
    private store: Store,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(store: Store) {}

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

  registerNewUser() {
    const userInfo = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      locale: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }

    this.store.dispatch(AuthActions.registerUser(userInfo))
    this.store
      .select(selectCurrentUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: IAuthLoginReponse | null) => {
        console.log(user)
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

  public resolvedCaptcha(response: string | null) {
    this.captchaResponse = response
  }
}
