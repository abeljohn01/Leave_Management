export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string; // ISO date
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
}
