import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signal-use-cases',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './signal-use-cases.html',
  styleUrls: ['./signal-use-cases.css']
})
export class SignalUseCases {

  // Use Case 1: Local component state (replaces BehaviorSubject)
  protected count = signal(0);

  // Use Case 2: Derived state (replaces RxJS map)
  protected doubleCount = computed(() => this.count() * 2);

  // Use Case 3: Side effect (replaces RxJS tap / subscribe)
  protected readonly logEffect = effect(() => {
    console.log('Count changed to:', this.count());
  });

  protected increment() {
    this.count.update(c => c + 1);
  }

  protected decrement() {
    this.count.update(c => c - 1);
  }
}

// Note: 👉 Signals reduce RxJS complexity for UI state, not replace RxJS for async streams.
