import { NgModule }                 from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';
import { UserDashComponent } from './user-dash/user-dash.component';


const userRoutes:Routes = [
  {path: '', component: UserDashComponent},

];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})

export class UserDashRoutingModule { }
