import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable()
export class AuthService {
  private _current = new BehaviorSubject<Employee | null>(null);
  current$ = this._current.asObservable();

  loginAs(employee: Employee) {
    this._current.next(employee);
  }

  logout() {
    this._current.next(null);
  }

  get current() {
    return this._current.value;
  }
}
