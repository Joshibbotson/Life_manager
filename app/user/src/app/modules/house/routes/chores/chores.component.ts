import { Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Ilinks, LinksService } from 'src/app/services/links/links.service'
import { ChoresRestService } from 'src/app/services/rest/chores/chores-rest.service'
import { IChore } from '../../../../../../../api/dist/chores'
import * as ChoresActions from '../../../../state/chores/chores.actions'
import { Observable, map, take } from 'rxjs'
import { selectChores } from 'src/app/state/chores/chores.selectors'
import { PaginationComponent } from 'src/app/components/pagination/pagination.component'
import { CommonCheckboxComponent } from 'src/app/ui/common-checkbox/common-checkbox.component'
import { CommonInputComponent } from 'src/app/ui/common-input/common-input.component'
import { CommonModule, NgFor, NgIf } from '@angular/common'

@Component({
  standalone: true,
  selector: 'app-chores',
  templateUrl: './chores.component.html',
  imports: [
    PaginationComponent,
    CommonCheckboxComponent,
    CommonInputComponent,
    ReactiveFormsModule,
    NgIf,
    NgFor,
    CommonModule,
  ],
})
export class ChoresComponent {
  public loading = true
  public homeLinks: Ilinks[] = [{ url: '/chores', name: 'Chores' }]
  editOpen: number | null = null

  readonly nameControlGroup: FormControl = new FormControl('')
  readonly descriptionControlGroup: FormControl = new FormControl('')
  readonly createdByControlGroup: FormControl = new FormControl('')
  readonly assignedToControlGroup: FormControl = new FormControl('')
  readonly completedControlGroup: FormControl<boolean | null> = new FormControl(
    false,
  )
  readonly choreFormGroup: FormGroup = new FormGroup({
    name: this.nameControlGroup,
    description: this.descriptionControlGroup,
    createdBy: this.createdByControlGroup,
    assignedTo: this.assignedToControlGroup,
    completed: this.completedControlGroup,
  })
  public showForm: boolean = false
  public chores$: Observable<IChore[]>

  constructor(
    private rest: ChoresRestService,
    private links: LinksService,
    private router: Router,
    private store: Store,
  ) {
    const choreRead$ = this.store.select(selectChores)

    this.chores$ = choreRead$.pipe(map((x) => x.data))
    this.chores$.subscribe((x) => console.log('Chores$ data:', x))
  }

  ngOnInit() {
    this.links.updateLinks(this.homeLinks)
    this.loadChores()
  }

  public loadChores() {
    this.store
      .select(selectChores)
      .pipe(
        take(1),
        map((chores) => {
          this.store.dispatch(
            ChoresActions.loadChores({ skip: chores.skip, take: chores.take }),
          )
        }),
      )
      .subscribe(() => (this.loading = false))
  }

  public createChore(chore: IChore) {
    this.store.dispatch(ChoresActions.createChore({ chore }))
  }

  public toggleShowForm() {
    this.showForm = !this.showForm
    console.log(this.showForm)
  }

  public toggleEditOptions(index: number) {
    if (this.editOpen === index) {
      this.editOpen = null // Close if already open
    } else {
      this.editOpen = index // Open specific row
    }
  }
  public navigate(id: number) {
    this.router.navigate([`chores/${id}`])
  }

  async handleSubmit() {
    this.choreFormGroup.patchValue({
      completed: this.choreFormGroup.value.completed === 'true' ? true : false,
    })
    try {
      ;(await this.rest.create(this.choreFormGroup.value)).subscribe(() =>
        console.log('reloaded'),
      )
      this.toggleShowForm()
    } catch (error) {
      console.log(error)
    }
  }
}
