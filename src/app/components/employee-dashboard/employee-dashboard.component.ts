import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
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
  form = this.fb.group({
    dates: [[], Validators.required],
  });

  leaves$ = this.leaveService.leaves$.pipe(
    map((leaves) => leaves.filter((leave) => leave.employeeId === this.current?.id))
  );

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
