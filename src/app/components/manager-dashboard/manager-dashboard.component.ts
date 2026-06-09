import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { LeaveService } from '../../services/leave.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.scss'],
})
export class ManagerDashboardComponent implements OnInit {
  section: 'overview' | 'employees' | 'requests' | 'reports' = 'overview';
  leaves$ = this.leaveService.leaves$;
  pendingCount$ = this.leaveService.leaves$.pipe(
    map((leaves) => leaves.filter((l) => l.status === 'pending').length)
  );
  approvedCount$ = this.leaveService.leaves$.pipe(
    map((leaves) => leaves.filter((l) => l.status === 'approved').length)
  );
  employees = this.leaveService.getEmployees().filter((e) => e.role === 'employee');
  displayedColumns = ['employeeName', 'date', 'status', 'actions'];

  constructor(
    private leaveService: LeaveService,
    private snack: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const section = params['section'];
      if (section === 'employees' || section === 'requests' || section === 'reports') {
        this.section = section;
      } else {
        this.section = 'overview';
      }
    });
  }

  switchSection(section: 'overview' | 'employees' | 'requests' | 'reports') {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { section },
      queryParamsHandling: 'merge',
    });
  }

  approve(id: string) {
    this.leaveService.approveLeave(id);
    this.snack.open('Approved', 'Close', { duration: 1500 });
  }

  reject(id: string) {
    this.leaveService.rejectLeave(id);
    this.snack.open('Rejected', 'Close', { duration: 1500 });
  }
}
