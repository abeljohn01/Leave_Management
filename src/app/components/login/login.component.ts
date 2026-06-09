import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LeaveService } from '../../services/leave.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  employees = this.leaveService.getEmployees();

  form = this.fb.group({
    employeeId: ['', Validators.required],
    role: ['employee', Validators.required],
  });

  constructor(private fb: FormBuilder, private leaveService: LeaveService, private auth: AuthService, private router: Router) {}

  login() {
    const id = this.form.value.employeeId as string;
    const role = this.form.value.role as 'employee' | 'manager';
    const emp = this.employees.find((e) => e.id === id) || this.employees[0];
    const user = { ...emp, role };
    this.auth.loginAs(user as any);
    if (role === 'manager') this.router.navigate(['/manager']);
    else this.router.navigate(['/employee']);
  }
}
