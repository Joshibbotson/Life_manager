import { Component } from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Ilinks, LinksService } from 'src/app/services/links/links.service'
import { Subject } from 'rxjs'
import { AuthService } from 'src/app/services/auth/auth.service'
import { NgIf } from '@angular/common'

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [ReactiveFormsModule, NgIf],
})
export class RegisterComponent {
  public homeLinks: Ilinks[] = [{ url: '/chores', name: 'Chores' }]
  registerForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.email],
    password: ['', [Validators.required, Validators.minLength(8)]],
  })
  emailInUse$ = this.authService.emailInUse$

  public destroy$: Subject<void> = new Subject()

  constructor(
    private links: LinksService,
    private router: Router,
    private store: Store,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

  registerNewUser() {
    const userInfo = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    }

    return this.authService.registerNewUser(
      userInfo.name,
      userInfo.email,
      userInfo.password,
    )
  }
}
