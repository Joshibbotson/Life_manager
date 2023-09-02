import { Component, Input } from '@angular/core';

interface ILinks{
  linkName:string;
  routerLink:string;
}

@Component({
  selector: 'app-module-tab',
  templateUrl: './module-tab.component.html',
})
export class ModuleTabComponent {

  @Input()
  title!: string;
  @Input()
  links: Array<ILinks> = [];
  

  constructor(){
  }

}
