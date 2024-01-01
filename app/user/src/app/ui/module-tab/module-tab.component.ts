import { Component, Input } from '@angular/core'

interface ILink {
  linkName: string
  routerLink: string
}

@Component({
  selector: 'app-module-tab',
  templateUrl: './module-tab.component.html',
})
export class ModuleTabComponent {
  @Input()
  link!: ILink
  @Input() disabled: boolean = false

  constructor() {}
}
