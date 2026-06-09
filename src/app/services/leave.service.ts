import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LeaveRequest } from '../models/leave-request';
import { Employee } from '../models/employee';

@Injectable()
export class LeaveService {
  private _leaves = new BehaviorSubject<LeaveRequest[]>([]);
  leaves$ = this._leaves.asObservable();

  private employees: Employee[] = [
    { id: 'e1', name: 'Alice Johnson', department: 'Engineering', role: 'employee' },
    { id: 'e2', name: 'Bob Smith', department: 'Design', role: 'employee' },
    { id: 'm1', name: 'Carol Williams', department: 'HR', role: 'manager' },
  ];

  constructor() {
    // seed sample data
    const sample: LeaveRequest[] = [
      { id: 'l1', employeeId: 'e1', employeeName: 'Alice Johnson', date: new Date().toISOString(), status: 'approved' },
      { id: 'l2', employeeId: 'e2', employeeName: 'Bob Smith', date: new Date().toISOString(), status: 'pending' },
    ];
    this._leaves.next(sample);
  }

  getEmployees() {
    return this.employees;
  }

  submitLeave(employee: Employee, dates: Date[]) {
    const entries = dates.map((d) => {
      return {
        id: Math.random().toString(36).substr(2, 9),
        employeeId: employee.id,
        employeeName: employee.name,
        date: d.toISOString(),
        status: 'pending' as const,
      } as LeaveRequest;
    });

    const current = this._leaves.value;
    this._leaves.next([...entries, ...current]);
    return entries;
  }

  approveLeave(id: string) {
    const updated = this._leaves.value.map((l) => (l.id === id ? { ...l, status: 'approved' } : l));
    this._leaves.next(updated);
  }

  rejectLeave(id: string) {
    const updated = this._leaves.value.map((l) => (l.id === id ? { ...l, status: 'rejected' } : l));
    this._leaves.next(updated);
  }
}
