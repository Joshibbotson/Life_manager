import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ChoresComponent } from './modules/house/routes/chores/chores.component'
import { DashboardModulesComponent } from './modules/dashboard-modules/dashboard-modules.component'
import { ChoreComponent } from './modules/house/routes/chore/chore.component'

const routes: Routes = [
  { path: 'chores/:id', component: ChoreComponent },
  { path: 'chores', component: ChoresComponent },
  { path: '', component: DashboardModulesComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
