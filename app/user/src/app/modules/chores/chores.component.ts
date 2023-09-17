import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chores',
  templateUrl: './chores.component.html',
})
export class ChoresComponent {
  readonly nameControlGroup: FormControl = new FormControl('');
  readonly descriptionControlGroup: FormControl = new FormControl('');
  readonly createdByControlGroup: FormControl = new FormControl('');
  readonly assignedToControlGroup: FormControl = new FormControl('');
  readonly completedControlGroup: FormControl = new FormControl(false);
  readonly choreFormGroup: FormGroup = new FormGroup({
    name: this.nameControlGroup,
    description: this.descriptionControlGroup,
    createdBy: this.createdByControlGroup,
    assignedTo: this.assignedToControlGroup,
    completed: this.completedControlGroup,
  });

  constructor() {}

  // handleChange(value: any, formControlId: string) {
  //   if (formControlId === 'completed') {
  //     console.log(value.target.value);
  //     const boolValue = value.target.value === 'on' ? true : false;
  //     console.log(boolValue);
  //     this.choreFormGroup.patchValue({
  //       formControlId: boolValue,
  //     });
  //   }
  //   this.choreFormGroup.patchValue({ formControlId: value.target.value });
  // }

  handleSubmit() {
    if (this.completedControlGroup.value === 'on') {
      this.choreFormGroup.patchValue({ completed: true });
      console.log(this.choreFormGroup.value);
    } else {
      console.log(this.choreFormGroup.value);
    }
  }
}
