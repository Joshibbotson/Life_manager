import { NgIf } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  standalone: true,
  selector: 'common-checkbox',
  templateUrl: './common-checkbox.component.html',
  imports: [NgIf],
})
export class CommonCheckboxComponent {
  @Input() label: string = ''
  @Input() min!: number
  @Input() max!: number
  @Input() readOnly: boolean = false
  @Input() placeholder: string = ''
  @Input() required: boolean = false

  public booleanSwitch: boolean = false
  public onInputChange() {
    this.booleanSwitch = !this.booleanSwitch
  }
}
