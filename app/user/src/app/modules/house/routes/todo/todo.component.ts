import { Component, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, Subject } from 'rxjs'
import { Ilinks, LinksService } from 'src/app/services/links/links.service'
import { TodosRestService } from 'src/app/services/rest/todos/todos-rest.service'
import { ITodo } from '../../../../../../../api/dist/todos'
import { Store } from '@ngrx/store'
import { selectedTodo } from 'src/app/state/todos/todos.selectors'
import { loadTodoById } from 'src/app/state/todos/todos.actions'
import { filter, takeUntil } from 'rxjs/operators'
import { CommonModule, NgIf } from '@angular/common'

@Component({
  standalone: true,
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  imports: [NgIf, CommonModule],
})
export class TodoComponent implements OnDestroy {
  public readonly todo$: Observable<ITodo | null> =
    this.store.select(selectedTodo)
  public homeLinks: Ilinks[] = [{ url: '/todos', name: 'Todos' }]
  public loading = true
  private readonly destroy$: Subject<void> = new Subject<void>()

  constructor(
    private rest: TodosRestService,
    private activatedRoute: ActivatedRoute,
    private links: LinksService,
    private router: Router,
    private store: Store,
  ) {
    this.links.updateLinks(this.homeLinks)
    this.loadTodo()
    this.todo$.subscribe((x) => console.log('todo:', x))
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  public loadTodo() {
    const todoId = Number(this.activatedRoute.snapshot.params['id'])
    this.store.dispatch(loadTodoById({ id: todoId }))

    this.todo$
      .pipe(
        filter((todo) => !!todo), // Filter out null or undefined values
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.loading = false
      })
  }

  async deleteTodo(id: number) {
    try {
      ;(await this.rest.delete(id)).subscribe((x) => {
        console.log(x)
        this.router.navigate(['/todos'])
      })
    } catch (error) {
      console.log(error)
    }
  }
}
