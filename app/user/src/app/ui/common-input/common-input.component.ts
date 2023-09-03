import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'common-input',
  templateUrl: './common-input.component.html',
})
export class CommonInputComponent {
  @Input() type: string = 'text';
  @Input() min!: number;
  @Input() max!: number;
  @Input() readOnly: boolean = false;
  @Input() placeholder: string = '';
  @Input() required: boolean = false;

  @Output() inputValue = new EventEmitter<any>();

  public onInputChange(): void {
    this.inputValue.emit();
  }
}
