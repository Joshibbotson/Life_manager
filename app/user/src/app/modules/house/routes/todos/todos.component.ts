import { Component, Output } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Ilinks, LinksService } from 'src/app/services/links/links.service'
import { ITodo } from '../../../../../../../api/dist/todos'
import * as TodosActions from '../../../../state/todos/todos.actions'
import { Observable, Subject, map, take } from 'rxjs'
import { selectTodos } from 'src/app/state/todos/todos.selectors'
import { PaginationComponent } from 'src/app/components/pagination/pagination.component'
import { CommonCheckboxComponent } from 'src/app/ui/common-checkbox/common-checkbox.component'
import { CommonInputComponent } from 'src/app/ui/common-input/common-input.component'
import { CommonModule, NgFor, NgIf } from '@angular/common'
import { UserSelectDropdownComponent } from '../../../../ui/user-select-dropdown/user-select-dropdown/user-select-dropdown.component'

@Component({
  standalone: true,
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  imports: [
    PaginationComponent,
    CommonCheckboxComponent,
    CommonInputComponent,
    ReactiveFormsModule,
    NgIf,
    NgFor,
    CommonModule,
    UserSelectDropdownComponent,
  ],
})
export class TodosComponent {
  public loading = true
  public homeLinks: Ilinks[] = [{ url: '/todos', name: 'Todos' }]
  editOpen: number | null = null
  readonly nameControlGroup: FormControl = new FormControl('')
  readonly descriptionControlGroup: FormControl = new FormControl('')
  readonly createdByControlGroup: FormControl = new FormControl('')
  readonly assignedToControlGroup: FormControl = new FormControl('')
  readonly completedControlGroup: FormControl<boolean | null> = new FormControl(
    false,
  )
  readonly todoFormGroup: FormGroup = new FormGroup({
    name: this.nameControlGroup,
    description: this.descriptionControlGroup,
    createdBy: this.createdByControlGroup,
    assignedTo: this.assignedToControlGroup,
    completed: this.completedControlGroup,
  })
  public showForm: boolean = true // change back to false.
  public todos$!: Observable<ITodo[]>
  public destroy$: Subject<void> = new Subject()
  trackById = this.trackByProperty('id')

  constructor(
    private links: LinksService,
    private router: Router,
    private store: Store,
  ) {}

  ngOnInit() {
    this.links.updateLinks(this.homeLinks)
    this.loadTodos()
    this.todos$ = this.store
      .select(selectTodos)
      .pipe(map((todoData) => todoData.data))
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

  public loadTodos() {
    this.store
      .select(selectTodos)
      .pipe(
        take(1),
        map((todos) => {
          this.store.dispatch(
            TodosActions.loadTodos({ skip: todos.skip, take: todos.take }),
          )
        }),
      )
      .subscribe(
        () => (
          (this.loading = false),
          (this.todos$ = this.store
            .select(selectTodos)
            .pipe(map((todoData) => todoData.data)))
        ),
      )
  }

  public createTodo(todo: ITodo) {
    this.store.dispatch(TodosActions.createTodo({ todo }))
  }

  public toggleShowForm() {
    this.showForm = !this.showForm
  }

  public toggleEditOptions(index: number | null, event: Event) {
    event.stopPropagation()

    console.log('toggled:', index)

    if (this.editOpen === index) {
      this.editOpen = null // Close if already open
    } else {
      this.editOpen = index // Open specific row
    }
  }
  public navigate(id: number) {
    this.router.navigate([`todos/${id}`])
  }

  async handleSubmit() {
    this.todoFormGroup.patchValue({
      completed: this.todoFormGroup.value.completed === 'true' ? true : false,
    })
    this.store.dispatch(
      TodosActions.createTodo({ todo: this.todoFormGroup.value }),
    )
    this.toggleShowForm()
  }

  trackByProperty<T = any>(property: keyof T) {
    return (index: number, object: T) => object[property]
  }

  public editTodo(id: number) {}
  public deleteTodo(id: number) {
    this.store.dispatch(TodosActions.deleteTodo({ id }))
  }

  public completeTodo(id: number) {
    this.store.dispatch(TodosActions.completeTodo({ id }))
  }
}
