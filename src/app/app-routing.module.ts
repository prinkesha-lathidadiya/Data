import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCrudComponent } from './user-crud/user-crud.component';
import { ViewCrudComponent } from './view-crud/view-crud.component';

const routes: Routes = [
  {path:'', component:UserCrudComponent},
  {path:'user-crud', component:UserCrudComponent},
  {path:'view', component:ViewCrudComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
