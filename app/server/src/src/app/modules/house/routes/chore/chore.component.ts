import { Component, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, Subject } from 'rxjs'
import { Ilinks, LinksService } from 'src/app/services/links/links.service'
import { ChoresRestService } from 'src/app/services/rest/chores/chores-rest.service'
import { IChore } from '../../../../../../../api/dist/chores'
import { Store } from '@ngrx/store'
import { selectedChore } from 'src/app/state/chores/chores.selectors'
import { loadChoreById } from 'src/app/state/chores/chores.actions'
import { filter, takeUntil } from 'rxjs/operators'
import { CommonModule, NgIf } from '@angular/common'

@Component({
  standalone: true,
  selector: 'app-chore',
  templateUrl: './chore.component.html',
  imports: [NgIf, CommonModule],
})
export class ChoreComponent implements OnDestroy {
  public readonly chore$: Observable<IChore | null> =
    this.store.select(selectedChore)
  public homeLinks: Ilinks[] = [{ url: '/chores', name: 'Chores' }]
  public loading = true
  private readonly destroy$: Subject<void> = new Subject<void>()

  constructor(
    private rest: ChoresRestService,
    private activatedRoute: ActivatedRoute,
    private links: LinksService,
    private router: Router,
    private store: Store,
  ) {
    this.links.updateLinks(this.homeLinks)
    this.loadChore()
    this.chore$.subscribe((x) => console.log('chore:', x))
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  public loadChore() {
    const choreId = Number(this.activatedRoute.snapshot.params['id'])
    this.store.dispatch(loadChoreById({ id: choreId }))

    this.chore$
      .pipe(
        filter((chore) => !!chore), // Filter out null or undefined values
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.loading = false
      })
  }

  async deleteChore(id: number) {
    try {
      ;(await this.rest.delete(id)).subscribe((x) => {
        console.log(x)
        this.router.navigate(['/chores'])
      })
    } catch (error) {
      console.log(error)
    }
  }
}
