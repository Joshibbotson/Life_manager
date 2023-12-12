import { Component, OnInit, SimpleChanges, effect } from '@angular/core'
import { LinksService } from 'src/app/services/links/links.service'
import {
  faChevronCircleDown,
  faChevronCircleLeft,
  faChevronCircleRight,
  faChevronCircleUp,
  faHome,
} from '@fortawesome/free-solid-svg-icons'
import { AuthService } from 'src/app/services/auth/auth.service'
import { WindowSizeService } from 'src/app/services/window-service/window-size.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  public isSidebarOpen = true
  readonly faHome = faHome
  readonly faChevronCircleLeft = faChevronCircleLeft
  readonly faChevronCircleRight = faChevronCircleRight
  readonly faChevronCircleDown = faChevronCircleDown
  readonly faChevronCircleUp = faChevronCircleUp

  windowWidth!: number
  windowHeight!: number
  public sideBarLinks$

  constructor(
    private links: LinksService,
    private auth: AuthService,
    private windowSizeService: WindowSizeService,
  ) {
    this.sideBarLinks$ = this.links.getLinks()
    effect(() => {
      const size = this.windowSizeService.windowSize()
      this.windowHeight = size.height
      this.windowWidth = size.width
    })
  }

  ngOnInit(): void {
    this.sideBarLinks$ = this.links.getLinks()
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {}
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen
  }

  logout() {
    this.auth.logout()
  }

  getSideBarStyle() {
    if (this.windowWidth > 767 && this.isSidebarOpen) {
      return 'w-64'
    } else if (this.windowWidth > 767 && !this.isSidebarOpen) {
      return 'w-24'
    } else if (this.windowWidth < 767 && this.isSidebarOpen) {
      return 'min-h-screen w-full'
    } else if (this.windowHeight < 767 && !this.isSidebarOpen) {
      return 'h-12 w-full'
    }
    return ''
  }
}
