import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'common-input',
  templateUrl: './common-input.component.html',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class CommonInputComponent {
  @Input() label: string = ''
  @Input() type: string = 'text'
  @Input() min!: number
  @Input() max!: number
  @Input() readOnly: boolean = false
  @Input() placeholder: string = ''
  @Input() required: boolean = false
  @Input() value: string | number | undefined
  @Input() control!: FormControl

  @Output() inputValue = new EventEmitter<Event>()

  public onInputChange(value: Event) {
    this.inputValue.emit(value)
  }
}
