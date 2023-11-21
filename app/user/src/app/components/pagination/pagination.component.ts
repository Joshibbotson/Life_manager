import { Component, OnDestroy } from '@angular/core'
import { Store } from '@ngrx/store'
import * as ChoresActions from '../../state/chores/chores.actions'
import { Observable, combineLatest, map } from 'rxjs'
import { take } from 'rxjs/operators'
import { selectChores } from 'src/app/state/chores/chores.selectors'
import { Subject } from 'rxjs'
import { CommonModule, NgFor } from '@angular/common'

// need to input or figure out best way to put handle what selector/actions to use so this is reusable.
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  standalone: true,
  imports: [NgFor, CommonModule],
})
export class PaginationComponent implements OnDestroy {
  readonly paginationData$ = this.store.select(selectChores)
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

  public loadChores() {
    this.store
      .select(selectChores)
      .pipe(take(1))
      .subscribe((chores) => {
        this.store.dispatch(
          ChoresActions.loadChores({ skip: chores.skip, take: chores.take }),
        )
      })
  }

  public updatePage(page: number) {
    this.take$.pipe(take(1)).subscribe((take) => {
      this.store.dispatch(
        ChoresActions.loadChores({ skip: page * take, take: take }),
      )
    })
    this.skip$.subscribe((x) => console.log(x))
  }

  public previousPage() {
    combineLatest([this.skip$, this.take$])
      .pipe(take(1))
      .subscribe(([skip, take]) => {
        this.store.dispatch(
          ChoresActions.loadChores({ skip: skip - take, take: take }),
        )
      })
  }
  public nextPage() {
    combineLatest([this.skip$, this.take$])
      .pipe(take(1))
      .subscribe(([skip, take]) => {
        this.store.dispatch(
          ChoresActions.loadChores({ skip: skip + take, take: take }),
        )
      })
  }

  public getSkipValue() {
    console.log('called get skip ')
    return this.skip$.subscribe((skip) => skip)
  }

  public isNextDisabled() {}
}
