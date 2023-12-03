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
import { choresReducer } from './state/chores/chores.reducer'
import { choreReducer } from './state/chores/chores.reducer'
import { ChoresEffects } from './state/chores/chores.effects'
import { CoreChoresComponent } from './modules/house/routes/core-chores/core-chores.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ModuleTabComponent,
    DashboardModulesComponent,
    CommonModalComponent,
    CoreChoresComponent,
  ],
  imports: [
    FontAwesomeModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      chores: choresReducer,
      selectedChore: choreReducer,
    }),
    EffectsModule.forRoot([ChoresEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
