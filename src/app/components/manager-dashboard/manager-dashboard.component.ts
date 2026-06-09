import { Component } from '@angular/core';
import { LeaveService } from '../../services/leave.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.scss'],
})
export class ManagerDashboardComponent {
  leaves$ = this.leaveService.leaves$;
  employees = this.leaveService.getEmployees();
  displayedColumns = ['employeeName','date','status','actions'];

  constructor(private leaveService: LeaveService, private snack: MatSnackBar) {}

  approve(id: string) {
    this.leaveService.approveLeave(id);
    this.snack.open('Approved', 'Close', { duration: 1500 });
  }

  reject(id: string) {
    this.leaveService.rejectLeave(id);
    this.snack.open('Rejected', 'Close', { duration: 1500 });
  }
}
