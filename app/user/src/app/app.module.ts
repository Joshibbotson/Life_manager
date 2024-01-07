import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import * as AuthActions from '../app/state/auth/auth.actions'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { DashboardComponent } from './modules/dashboard/dashboard.component'
import { ModuleTabComponent } from './ui/module-tab/module-tab.component'
import { DashboardModulesComponent } from './modules/dashboard-modules/dashboard-modules.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { CommonModalComponent } from './ui/common-modal/common-modal.component'
import { Store, StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { todosReducer } from './state/todos/todos.reducer'
import { todoReducer } from './state/todos/todos.reducer'
import { TodosEffects } from './state/todos/todos.effects'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { authReducer } from './state/auth/auth.reducer'
import { AuthEffects } from './state/auth/auth.effects'
import { environment } from 'src/environments/environment'
import { reducers } from './state/index'
import { clearStateMetaReducer } from './state/meta.reducer'
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
      auth: authReducer,
    }),
    StoreModule.forRoot(reducers, { metaReducers: [clearStateMetaReducer] }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),

    EffectsModule.forRoot([TodosEffects, AuthEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private store: Store) {
    this.rehydrateAuthState()
  }

  private rehydrateAuthState(): void {
    const userJson = localStorage.getItem('user')
    const token = localStorage.getItem('loginToken')
    if (userJson && token) {
      const user = JSON.parse(userJson)
      this.store.dispatch(AuthActions.rehydrateUser({ user, token }))
    }
  }
}
