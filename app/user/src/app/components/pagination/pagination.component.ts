import { Component, OnDestroy } from '@angular/core'
import { Store } from '@ngrx/store'
import * as TodosActions from '../../state/todos/todos.actions'
import { Observable, combineLatest, map } from 'rxjs'
import { take } from 'rxjs/operators'
import { selectTodos } from 'src/app/state/todos/todos.selectors'
import { Subject } from 'rxjs'
import { CommonModule, NgFor } from '@angular/common'

// need to input or figure out best way to put handle what selector/actions to use so this is reusable.
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class PaginationComponent implements OnDestroy {
  readonly paginationData$ = this.store.select(selectTodos)
  readonly skip$: Observable<number> = this.paginationData$.pipe(
    map((x) => x.skip),
  )
  readonly take$: Observable<number> = this.paginationData$.pipe(
    map((x) => x.take),
  )
  readonly count$: Observable<number> = this.paginationData$.pipe(
    map((x) => x.count),
  )
  readonly pageCountArr$: Observable<number[]> = this.paginationData$.pipe(
    map((data) =>
      Array.from(
        { length: Math.ceil(data.count / data.take) },
        (_, index) => index,
      ),
    ),
  )
  readonly totalNumberOfPages$: Observable<number> = combineLatest([
    this.pageCountArr$,
    this.take$,
  ]).pipe(map(([pageCountArr, take]) => pageCountArr.length * take))
  readonly isNextButtonDisabled$ = combineLatest([
    this.skip$,
    this.take$,
    this.count$,
  ]).pipe(map(([skip, take, count]) => skip + take > count))
  private destroy$: Subject<void> = new Subject<void>()

  constructor(private store: Store) {}

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

  public loadTodos() {
    this.store
      .select(selectTodos)
      .pipe(take(1))
      .subscribe((todos) => {
        this.store.dispatch(
          TodosActions.loadTodos({
            skip: todos.skip,
            take: todos.take,
            filter: { createdById: 1 },
            sort: undefined,
            term: '',
          }),
        )
      })
  }

  public updatePage(page: number) {
    this.take$.pipe(take(1)).subscribe((take) => {
      this.store.dispatch(
        TodosActions.loadTodos({
          skip: page * take,
          take: take,
          filter: { createdById: 1 },
        }),
      )
    })
    this.skip$.subscribe((x) => console.log(x))
  }

  public previousPage() {
    combineLatest([this.skip$, this.take$])
      .pipe(take(1))
      .subscribe(([skip, take]) => {
        this.store.dispatch(
          TodosActions.loadTodos({ skip: skip - take, take: take }),
        )
      })
  }
  public nextPage() {
    combineLatest([this.skip$, this.take$])
      .pipe(take(1))
      .subscribe(([skip, take]) => {
        this.store.dispatch(
          TodosActions.loadTodos({ skip: skip + take, take: take }),
        )
      })
  }

  public getSkipValue() {
    console.log('called get skip ')
    return this.skip$.subscribe((skip) => skip)
  }

  public isNextDisabled() {}
}
