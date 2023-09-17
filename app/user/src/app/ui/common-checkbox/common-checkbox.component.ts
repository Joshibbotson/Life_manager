import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'common-checkbox',
  templateUrl: './common-checkbox.component.html',
  styleUrls: ['./common-checkbox.component.css'],
})
export class CommonCheckboxComponent {
  @Input() label: string = '';
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
