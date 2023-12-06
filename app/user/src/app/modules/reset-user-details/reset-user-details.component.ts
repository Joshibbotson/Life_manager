import { Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Ilinks, LinksService } from 'src/app/services/links/links.service'
import { Subject } from 'rxjs'

@Component({
  standalone: true,
  selector: 'app-reset-user-details',
  templateUrl: './reset-user-details.component.html',
  imports: [],
})
export class ResetUserDetailsComponent {
  public homeLinks: Ilinks[] = [{ url: '/chores', name: 'Chores' }]

  public destroy$: Subject<void> = new Subject()

  constructor(
    private links: LinksService,
    private router: Router,
    private store: Store,
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
