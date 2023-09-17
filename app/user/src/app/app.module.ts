import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ModuleTabComponent } from './ui/module-tab/module-tab.component';
import { ChoresComponent } from './modules/chores/chores.component';
import { CommonInputComponent } from './ui/common-input/common-input.component';
import { DashboardModulesComponent } from './modules/dashboard-modules/dashboard-modules.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonCheckboxComponent } from './ui/common-checkbox/common-checkbox.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ModuleTabComponent,
    ChoresComponent,
    CommonInputComponent,
    DashboardModulesComponent,
    CommonCheckboxComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
