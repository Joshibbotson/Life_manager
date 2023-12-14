import { Component } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { AuthService } from 'src/app/services/auth/auth.service'
import { LinksService } from 'src/app/services/links/links.service'
@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule, RouterModule],
})
export class LoginComponent {
  public readonly loginForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private links: LinksService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })

    this.links.updateLinks([{ url: '/', name: 'home' }])
  }

  ngOnInit(): void {}

  //it would be nice if the router.navigate took us back to whatever page we were on...
  login(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value
      const password = this.loginForm.get('password')?.value
      this.authService.login(email, password).subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigate(['/'])
          } else {
            // Handle login failure, show error message?
          }
        },
        error: (err) => {
          console.error('HTTP error:', err)
        },
      })
    }
  }
}
