import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Ilinks, LinksService } from 'src/app/services/links/links.service'
import { IReadTodo, ITodo } from '../../../../../../../api/dist/todos'
import * as TodosActions from '../../../../state/todos/todos.actions'
import { Observable, Subject, Subscription, first, map, take, tap } from 'rxjs'
import { selectTodos } from 'src/app/state/todos/todos.selectors'
import { PaginationComponent } from 'src/app/components/common_pagination/pagination.component'
import { CommonCheckboxComponent } from 'src/app/ui/common-checkbox/common-checkbox.component'
import { CommonInputComponent } from 'src/app/ui/common-input/common-input.component'
import { CommonModule } from '@angular/common'
import { UserSelectDropdownComponent } from '../../../../ui/user-select-dropdown/user-select-dropdown/user-select-dropdown.component'
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { selectCurrentUser } from 'src/app/state/auth/auth.selectors'
import { IReadUser } from '../../../../../../../api/dist/users'
import { DateTime } from 'luxon'
import { WindowSizeService } from 'src/app/services/window-service/window-size.service'

@Component({
  standalone: true,
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  imports: [
    PaginationComponent,
    CommonCheckboxComponent,
    CommonInputComponent,
    ReactiveFormsModule,
    CommonModule,
    UserSelectDropdownComponent,
    FontAwesomeModule,
  ],
})
export class TodosComponent implements OnInit, OnDestroy {
  readonly faCheck = faCheck
  readonly faCross = faX
  public windowWidth: number = window.innerWidth
  public windowHeight: number = window.innerHeight
  private windowSizeSubscription!: Subscription

  public loading = true
  public homeLinks: Ilinks[] = [{ url: '/todos', name: 'Todos' }]
  editOpen: number | null = null
  readonly titleControlGroup: FormControl = new FormControl('')
  readonly descriptionControlGroup: FormControl = new FormControl('')
  readonly createdByControlGroup: FormControl = new FormControl('')
  readonly dueDateControlGroup: FormControl = new FormControl('')
  readonly completedControlGroup: FormControl<boolean | null> = new FormControl(
    false,
  )
  readonly todoFormGroup: FormGroup = new FormGroup({
    title: this.titleControlGroup,
    description: this.descriptionControlGroup,
    createdBy: this.createdByControlGroup,
    completed: this.completedControlGroup,
    dueDate: this.dueDateControlGroup,
  })
  public showForm: boolean = false
  public todos$!: Observable<IReadTodo[]>
  public loggedInUser!: IReadUser | undefined
  public destroy$: Subject<void> = new Subject()

  constructor(
    private links: LinksService,
    private router: Router,
    private store: Store,
    private windowSizeService: WindowSizeService,
  ) {}

  ngOnInit() {
    this.windowSizeSubscription = this.windowSizeService.windowSize.subscribe(
      (size) => {
        this.windowWidth = size.width
        this.windowHeight = size.height
      },
    )
    this.links.updateLinks(this.homeLinks)
    this.updatedCurrentUser()
    this.loadTodos()
    this.todos$ = this.store
      .select(selectTodos)
      .pipe(map((todoData) => todoData.todos))
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()

    if (this.windowSizeSubscription) {
      this.windowSizeSubscription.unsubscribe()
    }
  }

  public loadTodos() {
    this.store
      .select(selectTodos)
      .pipe(
        take(1),
        map((todos) => {
          this.store.dispatch(
            TodosActions.loadTodos({
              skip: todos.skip,
              take: todos.take,
              filter: this.loggedInUser?.id
                ? {
                    createdById: this.loggedInUser?.id,
                  }
                : undefined,
              sort: {},
              term: undefined,
            }),
          )
        }),
      )
      .subscribe(
        () => (
          (this.loading = false),
          (this.todos$ = this.store
            .select(selectTodos)
            .pipe(map((todoData) => todoData.todos)))
        ),
      )
  }

  public updatedCurrentUser() {
    this.store
      .select(selectCurrentUser)
      .pipe(
        first(),
        tap((response) => {
          this.loggedInUser = response?.user
        }),
      )
      .subscribe()
  }

  public createTodo(todo: ITodo) {
    this.store.dispatch(TodosActions.createTodo({ todo }))
  }

  public toggleShowForm() {
    this.showForm = !this.showForm
  }

  public navigate(id: number) {
    this.router.navigate([`todos/${id}`])
  }

  async handleSubmit() {
    this.todoFormGroup.patchValue({
      completed: this.todoFormGroup.value.completed === 'true' ? true : false,
      createdBy: this.loggedInUser?.id,
    })
    this.store.dispatch(
      TodosActions.createTodo({ todo: this.todoFormGroup.value }),
    )
    this.toggleShowForm()
  }

  public editTodo(id: number) {}

  public deleteTodo(id: number) {
    this.store.dispatch(TodosActions.deleteTodo({ id }))
  }

  public completeTodo(todo: IReadTodo) {
    console.log('called complete')
    const updatedTodo = {
      ...todo,
      completed: !todo.completed,
    }
    this.store.dispatch(TodosActions.updateTodo({ updatedTodo: updatedTodo }))
  }

  public formatDate(date: any) {
    if (!date) {
      return '-'
    }
    return DateTime.fromJSDate(new Date(date)).toFormat('dd-MM-yyyy')
  }
}
