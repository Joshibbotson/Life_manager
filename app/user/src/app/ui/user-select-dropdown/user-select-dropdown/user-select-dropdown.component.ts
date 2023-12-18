import { Component } from '@angular/core'

@Component({
  selector: 'app-user-select-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './user-select-dropdown.component.html',
})
// in short we should use userService here
// alternatively we could do some kind of dynamic search
// where we type a name in and a drop down is formed?
export class UserSelectDropdownComponent {}
