import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeStateService {
  public stateSource = new BehaviorSubject<string>("Initial State");
  currentMessage$ = this.stateSource.asObservable();

  constructor() { }

  changeState(message: string) {
    this.stateSource.next(message);
  }
}
