import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap, of, switchMap } from 'rxjs'
import { TodosRestService } from 'src/app/services/rest/todos/todos-rest.service'
import {
  loadTodos,
  setSkipAndTake,
  loadTodosSuccess,
  createTodo,
  createTodoSuccess,
  loadTodoById,
  loadTodoByIdSuccess,
  deleteTodo,
  deleteTodoSuccess,
  reloadTodos,
  completeTodo,
  completeTodoSuccess,
} from './todos.actions'

@Injectable()
export class TodosEffects {
  constructor(
    private actions$: Actions,
    private todosService: TodosRestService,
  ) {}

  readonly createTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createTodo),
      switchMap((action) =>
        this.todosService.create(action.todo).pipe(
          map((todo) => {
            return createTodoSuccess({ todo })
          }),
          catchError((error) => of(error)),
        ),
      ),
    ),
  )
  readonly loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos, setSkipAndTake), // Listen for setPageAndPageSize action
      mergeMap(
        (
          action, //merge streams together into one
        ) =>
          this.todosService
            .read(
              action.skip,
              action.take,
              action.filter,
              action.sort,
              action.term,
            )
            .pipe(
              map((todos) =>
                loadTodosSuccess({
                  todos: todos.data,
                  error: todos.error,
                  count: todos.count,
                  skip: todos.skip,
                  take: todos.take,
                  status: 'success',
                }),
              ),
              catchError((error) => of(error)),
            ),
      ),
    ),
  )

  readonly loadTodoById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodoById),
      mergeMap((action) =>
        this.todosService.readById(action.id).pipe(
          map((todo) =>
            loadTodoByIdSuccess({
              todo: todo.data,
              error: todo.error,
              status: 'success',
            }),
          ),
          catchError((error) => of(error)),
        ),
      ),
    ),
  )
  readonly deleteTodoById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTodo),
      mergeMap((action) =>
        this.todosService.delete(action.id).pipe(
          map((todo) => deleteTodoSuccess({ todo })),
          catchError((error) => of(error)),
        ),
      ),
    ),
  )

  readonly completeTodoById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(completeTodo),
      mergeMap((action) =>
        this.todosService.update(action.id).pipe(
          map((todo) => completeTodoSuccess({ todo })),
          catchError((error) => of(error)),
        ),
      ),
    ),
  )
}
