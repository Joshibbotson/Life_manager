import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChoresComponent } from './modules/chores/chores.component';
import { DashboardModulesComponent } from './modules/dashboard-modules/dashboard-modules.component';

const routes: Routes = [
  { path: 'chores', component: ChoresComponent },
  { path: '', component: DashboardModulesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
