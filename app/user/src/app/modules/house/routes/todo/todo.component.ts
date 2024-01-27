import { Component, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, Subject } from 'rxjs'
import { Ilinks, LinksService } from 'src/app/services/links/links.service'
import { Store } from '@ngrx/store'
import {
  IReadTodo,
  ITodoUpdateRequest,
} from '../../../../../../../api/dist/todos'
import { selectedTodo } from 'src/app/state/todos/todos.selectors'
import {
  completeTodo,
  deleteTodo,
  loadTodoById,
  updateTodo,
} from 'src/app/state/todos/todos.actions'
import { takeUntil } from 'rxjs/operators'
import { CommonModule } from '@angular/common'
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { DateTime } from 'luxon'
import { CommonInputComponent } from '../../../../ui/common-input/common-input.component'
import { FormControl, FormGroup } from '@angular/forms'

@Component({
  standalone: true,
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  imports: [CommonModule, FontAwesomeModule, CommonInputComponent],
})
export class TodoComponent implements OnDestroy {
  readonly faCheck = faCheck
  readonly faCross = faX

  public loading: boolean = true
  public editingStates = {
    title: false,
    description: false,
    dueDate: false,
  }

  public todo$: Observable<IReadTodo | null> = this.store.select(selectedTodo)
  public homeLinks: Ilinks[] = [{ url: '/todos', name: 'Todos' }]
  private readonly destroy$: Subject<void> = new Subject<void>()

  readonly titleControlGroup: FormControl = new FormControl('')
  readonly descriptionControlGroup: FormControl = new FormControl('')
  readonly dueDateControlGroup: FormControl = new FormControl('')

  readonly todoFormGroup: FormGroup = new FormGroup({
    title: this.titleControlGroup,
    description: this.descriptionControlGroup,
    dueDate: this.dueDateControlGroup,
  })
  constructor(
    private activatedRoute: ActivatedRoute,
    private links: LinksService,
    private router: Router,
    private store: Store,
  ) {
    this.links.updateLinks(this.homeLinks)
    this.loadTodo()
  }

  public ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  public loadTodo() {
    const todoId = Number(this.activatedRoute.snapshot.params['id'])
    this.store.dispatch(loadTodoById({ id: todoId }))

    this.todo$ = this.store.select(selectedTodo).pipe(takeUntil(this.destroy$))
    this.todo$.subscribe((todo) => {
      if (todo) {
        this.loading = false
        this.todoFormGroup.patchValue({
          title: todo.title,
          description: todo.description,
          dueDate: todo.dueDate,
        })
      }
    })
  }

  public deleteTodo(id: number) {
    this.store.dispatch(deleteTodo({ id: id }))
    this.router.navigate(['/todos'])
  }

  public completeTodo(todo: IReadTodo) {
    console.log('called complete')
    const updatedTodo = {
      ...todo,
      completed: !todo.completed,
    }
    this.store.dispatch(updateTodo({ updatedTodo: updatedTodo }))
  }

  public toggleEditing(field: keyof typeof this.editingStates): void {
    this.editingStates[field] = !this.editingStates[field]
  }

  public saveChanges(todo: IReadTodo) {
    this.resetEditState()

    const updatedTodo: ITodoUpdateRequest = Object.assign(
      {},
      todo,
      this.todoFormGroup.value,
    )

    this.store.dispatch(updateTodo({ updatedTodo }))
    this.todoFormGroup.patchValue(updatedTodo)
  }

  public checkForEditing() {
    return Object.values(this.editingStates).some((s) => s === true)
  }

  public resetEditState() {
    this.editingStates = {
      title: false,
      description: false,
      dueDate: false,
    }
  }

  public resetValue() {
    this.resetEditState()
  }

  public formatDate(date: any) {
    if (!date) {
      return '-'
    }
    return DateTime.fromJSDate(new Date(date)).toFormat('dd-MM-yyyy')
  }
}
