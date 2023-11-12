import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'common-input',
  templateUrl: './common-input.component.html',
})
export class CommonInputComponent {
  // need to figure this out.
  // @Input() formGroup!: FormGroup;
  // @Input() formControlId!: FormControl;
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() min!: number;
  @Input() max!: number;
  @Input() readOnly: boolean = false;
  @Input() placeholder: string = '';
  @Input() required: boolean = false;

  @Output() inputValue = new EventEmitter<any>();

  public onInputChange(value: Event) {
    this.inputValue.emit(value);
  }
}