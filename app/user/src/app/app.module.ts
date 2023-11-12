import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ModuleTabComponent } from './ui/module-tab/module-tab.component';
import { CommonInputComponent } from './ui/common-input/common-input.component';
import { DashboardModulesComponent } from './modules/dashboard-modules/dashboard-modules.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonCheckboxComponent } from './ui/common-checkbox/common-checkbox.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModalComponent } from './ui/common-modal/common-modal.component';
import { StoreModule } from '@ngrx/store';
import { ChoreComponent } from './modules/house/routes/chore/chore.component';
import { ChoresComponent } from './modules/house/routes/chores/chores.component';
import { EffectsModule } from '@ngrx/effects';
import { choresReducer } from './store/reducers/chores.reducer';
import { ChoresEffects } from './store/effects/chores.effects';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ModuleTabComponent,
    ChoresComponent,
    CommonInputComponent,
    DashboardModulesComponent,
    CommonCheckboxComponent,
    CommonModalComponent,
    PaginationComponent,
    ChoreComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      chores: choresReducer
    }),
    EffectsModule.forRoot([
      ChoresEffects
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
