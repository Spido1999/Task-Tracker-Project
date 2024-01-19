import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskUpdateComponent } from './task-update/task-update.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'tasks', component:TaskListComponent},
  {path:'task/create', component:TaskCreateComponent},
  { path: 'tasks/update/:id', component: TaskUpdateComponent },
  {path:'task/details/id', component:TaskDetailComponent},
  {path:'register',component:RegisterComponent}, 
  {path:'login',component:LoginComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
