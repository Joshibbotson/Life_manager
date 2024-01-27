import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import * as TodosActions from '../../state/todos/todos.actions'
import { Observable, combineLatest, map } from 'rxjs'
import { first, take, tap } from 'rxjs/operators'
import { selectTodos } from 'src/app/state/todos/todos.selectors'
import { Subject } from 'rxjs'
import { CommonModule } from '@angular/common'
import { selectCurrentUser } from 'src/app/state/auth/auth.selectors'
import { IReadUser } from '../../../../../api/dist/users'
import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'

// need to input or figure out best way to put handle what selector/actions to use so this is reusable.
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  standalone: true,
  imports: [CommonModule, FaIconComponent],
})
export class PaginationComponent implements OnInit, OnDestroy {
  readonly faChevronCircleLeft = faChevronLeft
  readonly faChevronCircleRight = faChevronRight
  readonly paginationData$ = this.store.select(selectTodos)
  public loggedInUser!: IReadUser | undefined
  public combinedData$!: Observable<{
    skip: number
    skipPlusTake: number
    count: number
  }>

  readonly skipPlusTake$: Observable<number> = this.paginationData$.pipe(
    map((x) => x.skip + x.take),
  )
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

  ngOnInit() {
    this.updatedCurrentUser()
    this.combinedData$ = combineLatest([
      this.skip$,
      this.skipPlusTake$,
      this.count$,
    ]).pipe(
      map(([skip, skipPlusTake, count]) => ({ skip, skipPlusTake, count })),
    )
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
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

  public loadTodos() {
    this.store
      .select(selectTodos)
      .pipe(take(1))
      .subscribe((todos) => {
        this.store.dispatch(
          TodosActions.loadTodos({
            skip: todos.skip,
            take: todos.take,
            filter: {
              createdById: this.loggedInUser?.id,
            },
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
          filter: {
            createdById: this.loggedInUser?.id,
          },
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
          TodosActions.loadTodos({
            skip: skip - take,
            take: take,
            filter: {
              createdById: this.loggedInUser?.id,
            },
            sort: undefined,
            term: '',
          }),
        )
      })
  }
  public nextPage() {
    combineLatest([this.skip$, this.take$])
      .pipe(take(1))
      .subscribe(([skip, take]) => {
        this.store.dispatch(
          TodosActions.loadTodos({
            skip: skip + take,
            take: take,
            filter: {
              createdById: this.loggedInUser?.id,
            },
            sort: undefined,
            term: '',
          }),
        )
      })
  }

  public getSkipValue() {
    console.log('called get skip ')
    return this.skip$.subscribe((skip) => skip)
  }

  public isNextDisabled() {}
}
