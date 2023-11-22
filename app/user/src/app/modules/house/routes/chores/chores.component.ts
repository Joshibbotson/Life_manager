import { Component, SimpleChanges } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Ilinks, LinksService } from 'src/app/services/links/links.service'
import { ChoresRestService } from 'src/app/services/rest/chores/chores-rest.service'
import { IChore } from '../../../../../../../api/dist/chores'
import * as ChoresActions from '../../../../state/chores/chores.actions'
import {
  BehaviorSubject,
  Observable,
  Subject,
  map,
  take,
  takeUntil,
} from 'rxjs'
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
  public chores$!: Observable<IChore[]>
  public destroy$: Subject<void> = new Subject()
  trackById = this.trackByProperty('id')

  constructor(
    private links: LinksService,
    private router: Router,
    private store: Store,
  ) {}

  ngOnInit() {
    this.links.updateLinks(this.homeLinks)
    this.loadChores()
    this.chores$ = this.store
      .select(selectChores)
      .pipe(map((choreData) => choreData.data))
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
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
      .subscribe(
        () => (
          (this.loading = false),
          (this.chores$ = this.store
            .select(selectChores)
            .pipe(map((choreData) => choreData.data)))
        ),
      )
  }

  public createChore(chore: IChore) {
    this.store.dispatch(ChoresActions.createChore({ chore }))
  }

  public toggleShowForm() {
    this.showForm = !this.showForm
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
    this.store.dispatch(
      ChoresActions.createChore({ chore: this.choreFormGroup.value }),
    )
    this.toggleShowForm()
  }

  trackByProperty<T = any>(property: keyof T) {
    return (index: number, object: T) => object[property]
  }

  public deleteChore(id: number) {
    this.store.dispatch(ChoresActions.deleteChore({ id }))
  }

  public completeChore(id: number) {
    this.store.dispatch(ChoresActions.completeChore({ id }))
  }
}
