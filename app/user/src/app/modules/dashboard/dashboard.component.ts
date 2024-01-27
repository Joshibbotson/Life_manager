import { Component, OnInit, WritableSignal, signal } from '@angular/core'
import { Ilinks, LinksService } from 'src/app/services/links/links.service'
import {
  faChevronCircleDown,
  faChevronCircleLeft,
  faChevronCircleRight,
  faChevronCircleUp,
  faHome,
} from '@fortawesome/free-solid-svg-icons'

import { WindowSizeService } from 'src/app/services/window-service/window-size.service'
import { Observable, Subscription, map } from 'rxjs'
import { Store } from '@ngrx/store'
import * as AuthActions from '../../state/auth/auth.actions'
import { toggleSidebar } from '../../state/sidebar/sidebar.actions'
import { Router } from '@angular/router'
import { isSidebarOpen } from 'src/app/state/sidebar/sidebar.selectors'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  public isSideBarOpen$!: Observable<boolean>
  readonly faHome = faHome

  readonly faChevronCircleLeft = faChevronCircleLeft
  readonly faChevronCircleRight = faChevronCircleRight
  readonly faChevronCircleDown = faChevronCircleDown
  readonly faChevronCircleUp = faChevronCircleUp

  public windowWidth: number = window.innerWidth
  public windowHeight: number = window.innerHeight
  public sideBarLinks$!: Observable<Ilinks[]>
  private windowSizeSubscription!: Subscription

  constructor(
    private links: LinksService,
    private windowSizeService: WindowSizeService,
    private store: Store,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.sideBarLinks$ = this.links.getLinks()
    this.windowSizeSubscription = this.windowSizeService.windowSize.subscribe(
      (size) => {
        this.windowWidth = size.width
        this.windowHeight = size.height
      },
    )
    this.isSideBarOpen$ = this.store.select(isSidebarOpen)
    this.isSideBarOpen$.subscribe()
  }

  public ngOnDestroy(): void {
    if (this.windowSizeSubscription) {
      this.windowSizeSubscription.unsubscribe()
    }
  }

  public shouldShowSidebar(): boolean {
    const excludedRoutes = ['/login', '/register', '/reset']
    return !excludedRoutes.includes(this.router.url)
  }

  public toggleSidebar() {
    this.store.dispatch(toggleSidebar())
  }

  public logout() {
    this.store.dispatch(AuthActions.logoutUser())
  }
}
