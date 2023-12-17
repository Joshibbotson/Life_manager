import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { DashboardComponent } from './modules/dashboard/dashboard.component'
import { ModuleTabComponent } from './ui/module-tab/module-tab.component'
import { DashboardModulesComponent } from './modules/dashboard-modules/dashboard-modules.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { CommonModalComponent } from './ui/common-modal/common-modal.component'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { todosReducer } from './state/todos/todos.reducer'
import { todoReducer } from './state/todos/todos.reducer'
import { TodosEffects } from './state/todos/todos.effects'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ModuleTabComponent,
    DashboardModulesComponent,
    CommonModalComponent,
  ],
  imports: [
    FontAwesomeModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      todos: todosReducer,
      selectedTodo: todoReducer,
    }),
    EffectsModule.forRoot([TodosEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
