import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ChoresComponent } from './modules/house/routes/chores/chores.component'
import { DashboardModulesComponent } from './modules/dashboard-modules/dashboard-modules.component'
import { ChoreComponent } from './modules/house/routes/chore/chore.component'
import { LoginComponent } from './modules/login/login.component'
import { ResetUserDetailsComponent } from './modules/reset-user-details/reset-user-details.component'
import { RegisterComponent } from './modules/register/register.component'

const routes: Routes = [
  { path: 'reset', component: ResetUserDetailsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'chores/:id', component: ChoreComponent },
  { path: 'chores', component: ChoresComponent },
  { path: '', component: DashboardModulesComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
