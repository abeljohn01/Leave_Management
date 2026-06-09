import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { LeaveService } from '../../services/leave.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss'],
})
export class EmployeeDashboardComponent {
  current = this.auth.current;
  months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  form = this.fb.group({
    month: [''],
    dates: [[], Validators.required],
  });

  leaves$ = this.leaveService.leaves$;

  selectedDates: Date[] = [];

  constructor(private fb: FormBuilder, private auth: AuthService, private leaveService: LeaveService, private snack: MatSnackBar) {}

  onDateChange(ev: any) {
    // For simplicity, support single date selection from datepicker; users can add multiple by pressing Add
    const d = ev.value as Date;
    if (d) this.selectedDates.push(d);
  }

  addSelected() {
    if (this.selectedDates.length === 0) return;
    const entries = this.leaveService.submitLeave(this.auth.current!, this.selectedDates);
    this.selectedDates = [];
    this.snack.open('Leave submitted', 'Close', { duration: 2000 });
  }
}
