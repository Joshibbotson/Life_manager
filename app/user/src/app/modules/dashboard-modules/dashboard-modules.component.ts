import { Component } from '@angular/core'

interface Ilink {
  linkName: string
  routerLink: string
}

@Component({
  selector: 'app-dashboard-modules',
  templateUrl: './dashboard-modules.component.html',
})
export class DashboardModulesComponent {
  public readonly todosLink: Ilink = { linkName: 'Todos', routerLink: 'todos' }
  public readonly choresLink: Ilink = {
    linkName: 'Chores',
    routerLink: 'chores',
  }
}
