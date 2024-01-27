import { Component } from '@angular/core'
import { Ilinks, LinksService } from 'src/app/services/links/links.service'

interface Ilink {
  linkName: string
  routerLink: string
}

@Component({
  selector: 'app-dashboard-modules',
  templateUrl: './dashboard-modules.component.html',
})
export class DashboardModulesComponent {
  public homeLinks: Ilinks[] = []
  constructor(private linksService: LinksService) {
    this.linksService.updateLinks(this.homeLinks)
  }
  ngOnInit() {}

  public readonly todosLink: Ilink = {
    linkName: 'Todo List',
    routerLink: 'todos',
  }
  public readonly choresLink: Ilink = {
    linkName: 'Chores',
    routerLink: 'chores',
  }
}
