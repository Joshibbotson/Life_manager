import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ModuleTabComponent } from './ui/module-tab/module-tab.component';
import { ChoresComponent } from './modules/chores/chores.component';
import { CommonInputComponent } from './ui/common-input/common-input.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ModuleTabComponent,
    ChoresComponent,
    CommonInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
