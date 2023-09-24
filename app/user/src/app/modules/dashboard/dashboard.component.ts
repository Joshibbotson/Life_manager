import { Component, OnInit } from '@angular/core';
import { LinksService } from 'src/app/services/links/links.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  isSidebarOpen = true;
  public sideBarLinks$;

  constructor(private links: LinksService) {
    this.sideBarLinks$ = this.links.getLinks();
  }

  ngOnInit(): void {
    this.sideBarLinks$ = this.links.getLinks();
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
