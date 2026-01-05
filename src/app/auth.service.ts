import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject acts as an event bus for login status
  private loginStatus = new BehaviorSubject<boolean>(false);

  constructor() { }

  // Update login status and emit to subscribers
  setLoginStatus(status: boolean) {
    this.loginStatus.next(status);
  }

  // Return login status as an Observable for real-time updates
  getLoginStatus() {
    return this.loginStatus.asObservable();
  }
}
