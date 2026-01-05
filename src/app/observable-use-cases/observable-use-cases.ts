//                  Observables
// Observables are powerful data types that allows us -->
// to handle asynchronous data streams & to model a variety of types of events
// An observable can emit one or more values over time, and can also emit an error or a completion signal.
// You can subscribe to an observable to receive these emitted values,
// and we can also transform, filter, and combine observables to create more complex data streams.
//-------------------------------------------------------------------------------------------------
//             Use Cases of Observables
// Use Case - 1: Asynchronous data handling --> In this example, we can create an observable that fetches data from a remote
// server asynchronously using the HttpClient service. We subscribe to the observable and update the UI with the fetched data.

// Use Case - 2: Data transformation -->  We can create an observable that performs operations
// on the data, such as filtering, mapping, and sorting, before sending it to the UI.

// Use Case - 3: Event handling --> We can create an observable that listens to events on a
// web page, such as a mouse click or a keyboard press, and performs an action based on the event.

// Use Case - 4: Reactive programming --> We can create an observable that responds to changes
// in a data source, such as a form input field or a database, and updates the UI accordingly.
//-------------------------------------------------------------------------------------------------
//             Advantages of Observables over Promises
// Advantage - 1: Observables are lazy --> Observables do not execute the code inside them until a subscription is made,
// which means that they don't start fetching data until the subscribe() method is called.
// This can be useful in scenarios where you want to delay fetching data until a certain condition is met,
// or where you want to fetch data on demand.

// Advantage - 2: Observables support cancellation --> Unlike Promises, Observables can be canceled.
// This means that you can stop the data stream at any time, which can help prevent memory leaks and improve performance.

// Advantage - 3: Observables can handle multiple events --> Observables emit multiple events over time, while Promises only emit a single value.
// This makes Observables more suited for scenarios where you want to stream real-time data or handle multiple HTTP requests.

// Advantage - 4: Observables provide powerful operators
// (which is discussed & implemented in the route [next route] - observable-with-operators) -->
// Observables provide a wide range of operators that allow you to transform, filter, and manipulate data streams.
// These operators can simplify complex data transformations and make it easier to work with asynchronous data streams.

import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, interval, BehaviorSubject } from 'rxjs';
import { switchMap, map, delay, takeUntil, finalize } from 'rxjs/operators';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-observable-use-cases',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './observable-use-cases.html',
  styleUrls: ['./observable-use-cases.css']
})
export class ObservableUseCases implements OnDestroy {
  protected isLoading = false;
  protected items$!: Observable<string[]>;

  private fetchTrigger$ = new Subject<void>();
  private cancelTrigger$ = new Subject<void>();

  // When we want to initialize-define & create a new instance for any declaration of variables/properties,
  // we have to use the `new` keyword along with the declaration.

  protected eventsStarted = false;
  private stopEvents$ = new Subject<void>();
  private eventsSubject$ = new BehaviorSubject<string[]>([]); // see the heading part of --> behavior-subject-use-cases.component.ts
  protected events$ = this.eventsSubject$.asObservable(); // bind this to template

  private http = inject(HttpClient);

  constructor() {
    // Reactive fetch with cancel support
    this.items$ = this.fetchTrigger$.pipe(
      switchMap(() => {
        this.isLoading = true;
        // Send an HTTP request to fetch the data
        return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos').pipe(
          delay(5000),
          // Use Case - 2: Data transformation --> 
          map(todos => todos.map(todo => todo.title)),
          takeUntil(this.cancelTrigger$),
          finalize(() => this.isLoading = false) // Set isLoading to false when data is fetched
        );
      })
    );
  }

  // Use Case - 1: Asynchronous data handling -->
  // Advantage - 1: Observables are lazy ---

  protected fetchData(): void {
    this.fetchTrigger$.next();
  }

  // cancellation from the UI to visually relate to the Advantage - 2: Observables support cancellation
  protected cancelRequest(): void {
    this.cancelTrigger$.next();
  }

  // Use Case - 3 & 4: Event handling & Reactive programming -->
  // Advantage - 3: Observables can handle multiple events ---
  protected startEvents(): void {
    if (this.eventsStarted) return;

    interval(1000)
      .pipe(takeUntil(this.stopEvents$))
      .subscribe(count => {
        // emit a new array so Angular detects change
        const current = this.eventsSubject$.value;
        this.eventsSubject$.next([...current, `Event ${count}`]);
      });

    // Advantage - 1: Observables are lazy ---
    this.eventsStarted = true;
  }

  protected stopEvents(): void {
    this.stopEvents$.next();
    this.eventsStarted = false;
  }

  ngOnDestroy(): void {
    this.cancelTrigger$.next();
    this.stopEvents$.next();
  }
}
