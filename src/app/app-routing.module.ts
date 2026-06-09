import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { ManagerDashboardComponent } from './components/manager-dashboard/manager-dashboard.component';
import { ManagerGuard } from './services/manager.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'employee', component: EmployeeDashboardComponent },
  { path: 'manager', component: ManagerDashboardComponent, canActivate: [ManagerGuard] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
