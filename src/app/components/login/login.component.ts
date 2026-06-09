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
  employees = this.leaveService.getEmployees().filter((e) => e.role === 'employee');

  form = this.fb.group({
    role: ['employee', Validators.required],
    employeeId: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private leaveService: LeaveService, private auth: AuthService, private router: Router) {
    this.form.get('role')?.valueChanges.subscribe((value) => {
      const control = this.form.get('employeeId');
      if (value === 'employee') {
        control?.setValidators([Validators.required]);
      } else {
        control?.clearValidators();
        control?.setValue('');
      }
      control?.updateValueAndValidity();
    });
  }

  login() {
    const role = this.form.value.role as 'employee' | 'manager';
    const user =
      role === 'manager'
        ? this.leaveService.getEmployees().find((e) => e.role === 'manager')!
        : this.employees.find((e) => e.id === this.form.value.employeeId)!;

    if (!user) {
      return;
    }

    this.auth.loginAs({ ...user, role });
    this.router.navigate([role === 'manager' ? '/manager' : '/employee']);
  }
}
