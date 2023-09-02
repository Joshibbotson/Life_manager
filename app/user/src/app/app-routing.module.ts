import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChoresComponent } from './modules/chores/chores.component';

const routes: Routes = [
  { path: 'chores', component: ChoresComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
