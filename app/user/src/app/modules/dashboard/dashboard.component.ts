import {
  Component,
  OnInit,
  SimpleChanges,
  WritableSignal,
  signal,
} from '@angular/core'
import { Ilinks, LinksService } from 'src/app/services/links/links.service'
import {
  faChevronCircleDown,
  faChevronCircleLeft,
  faChevronCircleRight,
  faChevronCircleUp,
  faHome,
} from '@fortawesome/free-solid-svg-icons'
import { AuthService } from 'src/app/services/auth/auth.service'
import { WindowSizeService } from 'src/app/services/window-service/window-size.service'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import * as AuthActions from '../../state/auth/auth.actions'
import * as SidebarActions from '../../state/sidebar/sidebar.actions'
import { Router } from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  public isSidebarOpen: WritableSignal<boolean> = signal(false)

  readonly faHome = faHome

  readonly faChevronCircleLeft = faChevronCircleLeft
  readonly faChevronCircleRight = faChevronCircleRight
  readonly faChevronCircleDown = faChevronCircleDown
  readonly faChevronCircleUp = faChevronCircleUp

  public windowWidth!: number
  public windowHeight!: number
  public sideBarLinks$!: Observable<Ilinks[]>

  constructor(
    private links: LinksService,
    private windowSizeService: WindowSizeService,
    private store: Store,
    private router: Router,
  ) {
    this.sideBarLinks$ = this.links.getLinks()

    const size = this.windowSizeService.windowSize()
    this.windowHeight = size.height
    this.windowWidth = size.width
    if (this.windowWidth < 727) {
      this.isSidebarOpen.set(false)
    } else {
      console.log(this.windowWidth)
      this.isSidebarOpen.set(true)
    }
  }

  shouldShowSidebar(): boolean {
    const excludedRoutes = ['/login', '/register', '/reset']
    return !excludedRoutes.includes(this.router.url)
  }
  ngOnInit(): void {
    this.sideBarLinks$ = this.links.getLinks()
  }

  toggleSidebar() {
    this.isSidebarOpen.set(!this.isSidebarOpen())
  }

  openSidebar() {
    this.store.dispatch(SidebarActions.openSidebar())
  }

  closeSidebar() {
    this.store.dispatch(SidebarActions.closeSidebar())
  }

  logout() {
    this.store.dispatch(AuthActions.logoutUser())
  }

  getSideBarStyle() {
    if (this.windowWidth > 767 && this.isSidebarOpen()) {
      return 'w-64  h-screen'
    } else if (this.windowWidth > 767 && !this.isSidebarOpen()) {
      return 'w-24  h-screen'
    } else if (this.windowWidth < 767 && this.isSidebarOpen()) {
      return 'sm:min-h-screen w-full'
    } else if (this.windowHeight < 767 && !this.isSidebarOpen()) {
      return 'h-12 w-full'
    }
    return ''
  }

  getMainContentStyle() {
    if (this.windowWidth > 767) {
      return 'min-h-screen'
    }

    return 'min-h-90'
  }
}
