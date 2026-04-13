import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Signup } from './auth/signup/signup';
import { ListComponent } from './employees/list/list';
import { Add } from './employees/add/add';
import { Update } from './employees/update/update';
import { View } from './employees/view/view';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'employees', component: ListComponent },
  { path: 'employees/add', component: Add },
  { path: 'employees/update/:id', component: Update },
  { path: 'employees/view/:id', component: View },
];