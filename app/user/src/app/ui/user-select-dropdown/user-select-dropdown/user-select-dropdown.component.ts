import { CommonModule } from '@angular/common'
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { catchError, debounceTime, map, of, switchMap } from 'rxjs'
import { Subscription } from 'rxjs'
import { UserRestService } from 'src/app/services/rest/todos/user/user-rest.service'

interface iUserRef {
  name: string
  id: number
}
@Component({
  selector: 'user-select-dropdown',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './user-select-dropdown.component.html',
})
export class UserSelectDropdownComponent implements OnDestroy {
  @Input() label: string = ''
  @Input() maxSelectedUsers: number | undefined
  @Output() selectedUser = new EventEmitter<number[]>()
  @ViewChild('focusableInput') focusableInput!: ElementRef
  public loading: boolean = true
  public searchTermControl = new FormControl()
  public selectedUserIdsArr: iUserRef[] = []
  public suggestedUsers: iUserRef[] = []
  private subscription: Subscription
  public isInputFocused: boolean = true
  public isInteractingWithList: boolean = false

  // input for max amount of selected users/ no max
  public searchTerm: string = ''
  constructor(private usersService: UserRestService) {
    this.subscription = this.searchTermControl.valueChanges
      .pipe(
        debounceTime(200),
        switchMap((value) => {
          this.loading = true
          return this.usersService.searchUsers(value).pipe(
            catchError((error) => {
              console.error('Error calling searchUsers:', error)
              return of([])
            }),
          )
        }),
        map((users) => {
          return Array.isArray(users.data)
            ? users.data.map(
                (user: { name: any; id: any }) =>
                  ({ name: user.name, id: user.id }) as iUserRef,
              )
            : []
        }),
      )
      .subscribe((transformedUsers) => {
        this.loading = false
        this.suggestedUsers = transformedUsers
      })
  }

  // really should basically emit if a name is selected
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  onBlur() {
    setTimeout(() => {
      if (!this.isInteractingWithList) {
        this.isInputFocused = false
      }
    }, 100)
  }

  onFocus() {
    this.isInputFocused = true
  }

  onListItemClick(user: iUserRef) {
    this.selectedUserIdsArr.push(user)
    this.searchTermControl.patchValue('')
    this.isInputFocused = true
    this.isInteractingWithList = true
    this.focusOnDiv()
  }

  onListMouseDown() {
    this.isInteractingWithList = true
  }

  onListMouseUp() {
    this.isInteractingWithList = false
  }

  focusOnDiv() {
    this.focusableInput.nativeElement.focus()
  }
}
