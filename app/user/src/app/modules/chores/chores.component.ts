import { Component } from '@angular/core';

@Component({
  selector: 'app-chores',
  templateUrl: './chores.component.html',
})
export class ChoresComponent {
  log(value: any) {
    console.log(value.value);
  }
}
