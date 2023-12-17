import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TodosComponent } from './modules/house/routes/todos/todos.component'
import { DashboardModulesComponent } from './modules/dashboard-modules/dashboard-modules.component'
import { TodoComponent } from './modules/house/routes/todo/todo.component'
import { LoginComponent } from './modules/login/login.component'
import { ResetUserDetailsComponent } from './modules/reset-user-details/reset-user-details.component'
import { RegisterComponent } from './modules/register/register.component'
import { AuthGuardService } from './guards/auth.guard'

const routes: Routes = [
  { path: 'reset', component: ResetUserDetailsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'todos/:id',
    canActivate: [AuthGuardService],
    component: TodoComponent,
  },
  {
    path: 'todos',
    canActivate: [AuthGuardService],
    component: TodosComponent,
  },
  {
    path: '',
    canActivate: [AuthGuardService],
    component: DashboardModulesComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService],
})
export class AppRoutingModule {}
