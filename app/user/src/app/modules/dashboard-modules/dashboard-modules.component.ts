import { Component } from '@angular/core'

interface Ilinks {
  linkName: string
  routerLink: string
}

@Component({
  selector: 'app-dashboard-modules',
  templateUrl: './dashboard-modules.component.html',
})
export class DashboardModulesComponent {
  public readonly homeLinks: Ilinks[] = [
    { linkName: 'Todos', routerLink: 'todos' },
  ]
}
