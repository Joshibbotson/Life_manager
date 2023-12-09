import { Component } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth/auth.service'
@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule],
})
export class LoginComponent {
  public readonly loginForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit(): void {}

  //it would be nice if the router.navigate took us back to whatever page we were on...
  login(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('email')?.value
      const password = this.loginForm.get('password')?.value
      if (this.authService.login(username, password)) {
        this.router.navigate(['/'])
      } else {
        console.log('incorrect login details')
        // pop up an invalid log in error here? Use server error?
      }
    }
  }
}
