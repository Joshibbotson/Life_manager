import { Component, OnInit } from '@angular/core'
import { LinksService } from 'src/app/services/links/links.service'
import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faHome,
} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  isSidebarOpen = true
  readonly faHome = faHome
  readonly faChevronCircleLeft = faChevronCircleLeft
  readonly faChevronCircleRight = faChevronCircleRight
  public sideBarLinks$

  constructor(private links: LinksService) {
    this.sideBarLinks$ = this.links.getLinks()
  }

  ngOnInit(): void {
    this.sideBarLinks$ = this.links.getLinks()
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen
  }
}
