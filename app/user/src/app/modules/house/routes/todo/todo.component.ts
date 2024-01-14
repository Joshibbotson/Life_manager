import { Component, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, Subject } from 'rxjs'
import { Ilinks, LinksService } from 'src/app/services/links/links.service'
import { Store } from '@ngrx/store'
import { IReadTodo } from '../../../../../../../api/dist/todos'
import { selectedTodo } from 'src/app/state/todos/todos.selectors'
import {
  completeTodo,
  deleteTodo,
  loadTodoById,
} from 'src/app/state/todos/todos.actions'
import { takeUntil } from 'rxjs/operators'
import { CommonModule } from '@angular/common'
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { DateTime } from 'luxon'

@Component({
  standalone: true,
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  imports: [CommonModule, FontAwesomeModule],
})
export class TodoComponent implements OnDestroy {
  readonly faCheck = faCheck
  readonly faCross = faX

  public todo$: Observable<IReadTodo | null> = this.store.select(selectedTodo)
  public homeLinks: Ilinks[] = [{ url: '/todos', name: 'Todos' }]
  public loading = true
  private readonly destroy$: Subject<void> = new Subject<void>()

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
      }
    })
  }

  public deleteTodo(id: number) {
    this.store.dispatch(deleteTodo({ id: id }))
    this.router.navigate(['/todos'])
  }

  public completeTodo(id: number, version: number): void {
    this.store.dispatch(completeTodo({ id: id, version: version }))
  }

  public formatDate(date: any) {
    if (!date) {
      return '-'
    }
    return DateTime.fromJSDate(new Date(date)).toFormat('dd-MM-yyyy')
  }
}
