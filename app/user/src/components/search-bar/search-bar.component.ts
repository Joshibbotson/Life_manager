import { Component } from '@angular/core'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { debounceTime, switchMap, catchError, of, map } from 'rxjs'
import { AppRoutingModule } from 'src/app-routing.module'
import { TodosRestService } from 'src/services/rest/todos/todos-rest.service'

@Component({
  selector: 'search-bar',
  standalone: true,
  imports: [
    FormsModule,
    FontAwesomeModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {
  public searchTerm = new FormControl('')
  public loading: boolean = false

  constructor(private rest: TodosRestService) {
    this.initializeSearchTermListener()
  }

  private initializeSearchTermListener(): void {
    this.searchTerm.valueChanges
      .pipe(
        debounceTime(300),
        switchMap((term) =>
          this.rest.searchTodos(term).pipe(catchError(() => of([]))),
        ),
      )
      .subscribe((results) => {
        console.log(results)
        this.loading = false
      })
  }
}
