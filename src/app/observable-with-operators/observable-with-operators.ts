// **** Operators from RxJS (Reactive Extensions for JavaScript) ****

// ----------------- Creation Operators ----------------------------

// of --> It is used to create an observable sequence that emits a fixed set of values.
//        It can take any number of arguments, and each argument is emitted in sequence by the resulting observable.

// from --> It creates an observable sequence from an array, an array-like object, an iterable, or an Observable-like object.

// interval --> It creates an Observable that emits sequential integers at a specified interval of time.
//              It takes a parameter that specifies the time interval (in milliseconds) between each emission.
//              The first value emitted is 0, the next value is 1, then 2, and so on. The emissions continue indefinitely until unsubscribed.

//              setInterval is a built -in JavaScript function that repeatedly executes a function at a fixed time interval.
//              It does not return an observable and must be stopped manually using clearInterval.
//              In contrast, interval (from RxJS in Angular) returns an observable, making it more powerful and flexible for
//              handling asynchronous streams, subscriptions, and cleanup.
//              In short: Use interval when working with RxJS and Angular’s reactive patterns.Use setInterval for simple,
//              straightforward repeated execution when RxJS features are not needed.

// fromEvent --> It allows creating an observable from a DOM event or Node.js EventEmitter.
//               It takes two parameters - the source object (either a DOM element or an EventEmitter), and the name of the event to listen for.
//               It emits the event object whenever the specified event occurs.

// ----------------- Transformation Operators ------------------------

// map --> Transforms each value emitted by the source observable into a new value.

// switchMap --> Takes each value emitted by a source Observable
//               Maps that value to a NEW inner Observable
//               Automatically unsubscribes from the PREVIOUS inner Observable
//               Subscribes only to the LATEST inner Observable
//               Emits values ONLY from the most recent inner Observable

// filter --> It creates a new Observable that emits only the values from the source Observable that pass a provided condition.
//            It takes a predicate function as an argument and applies it to each value emitted by the source Observable.
//            If the predicate function returns true, the value is emitted by the new Observable, and if it returns false, the value is ignored.

// tap --> It allows you to perform a side effect on each emission of the source observable, without modifying the emitted values.
//         The tap operator takes as its argument a function that is called for each emitted value of the source observable.
//         This function can be used to perform any kind of side effect, such as logging, modifying external state, or triggering other side effects.

// ----------------- Combination Operators ----------------------------

// merge --> It combines multiple Observables into a single Observable that emits all the values from all the input Observables in any order.
//           When any of the input Observables emit a value, the merge operator immediately forwards the value to the output Observable.
//           This allows you to merge streams of data from multiple sources into a single stream, which can be useful in many scenarios
//           such as combining user input with server responses or combining data from multiple sensors in a real-time application.

// take --> It combines the source Observable with another Observable to limit the number of emissions from the source Observable.
//          take is used to limit the number of emissions from an Observable stream, effectively taking a "snapshot" of the first n values
//          that are emitted, and then completing. It is commonly used with interval and timer Observables to limit the number of times they emit values.

//                              **** Utility methods from RxJS ****

// ------------------------------------ next() -----------------------------------------

// next() is used to emit values to subscribers of an observable. It allows values to be pushed manually,
// making data streams more flexible and controllable.
// Values can be emitted from outside an observable by calling next() (commonly on a Subject).
// This lets developers control when and what data is sent to subscribers.
// In short: Use next() when you need to manually push values into a stream. 
// Use regular observables and operators when values are produced automatically.

// ---------------------------------- pipe() method -------------------------------------

// pipe --> pipe() is a method in RxJS that allows you to combine multiple pipeable operators into a single, composable transformation function.
//          It takes a sequence of operators as arguments, and returns a new function that applies those operators in sequence to an Observable.
//          The resulting function can be used in place of the original Observable, and any subscriptions to it will receive the transformed data stream.

// pipeable operators ---->

// map, filter, tap, take, switchMap, mergeMap, concatMap, scan, reduce, and many others

// pipeable operators are functions that can be composed together in a chain to form a pipeline that transforms the stream
// of data emitted by an Observable. They take an Observable as input and return a new Observable with the modified data stream.

// advantages over older, chained syntax for applying operators -->
// They are more composable and easier to read and maintain.
// They allow for better performance optimization, as they can apply multiple operators at once without creating intermediate Observables.
// They are tree-shakable, meaning that unused operators can be eliminated during the build process, reducing the size of the resulting bundle.

// ------------------------------ asObservable() method ------------------------------------

// It's discussed in the `BehaviorSubjectUseCasesComponent` --> Use Case 2: Caching

//-------------------------------------------------------------------------------------------

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, interval, of, from, fromEvent, merge, Subscription } from 'rxjs';
import { map, filter, take, tap, switchMap } from 'rxjs/operators';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-observable-with-operators',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './observable-with-operators.html',
  styleUrls: ['./observable-with-operators.css']
})
export class ObservableWithOperators implements OnInit, OnDestroy {
  protected title = 'rxjs-operators';
  protected greeting$: Observable<string> = of('');
  protected items$: Observable<any[]> = of([]); // `any` cause array of json objects
  protected lastKeyPressed = '';

  private evenNumbersSubscription?: Subscription; // to unsubscribe to avoid memory leak
  private mergeSubscription?: Subscription; // to unsubscribe to avoid memory leak
  private buttonClickSubscription?: Subscription; // to unsubscribe to avoid memory leak

  ngOnInit(): void {
    this.initializeGreeting();
    this.initializeItems();
    this.subscribeEvenNumbers();
    this.setupEventObservables();
  }

  private initializeGreeting(): void {
    // Create an Observable of a greeting string
    this.greeting$ = of('Hello, RxJS!').pipe(
      map(greeting => `${greeting} How are you today?`)
    );
  }

  private initializeItems(): void {
    // Create an Observable that emits an array of items every second
    this.items$ = interval(1000).pipe(
      take(10),
      map(num => {
        const items: Array<{ name: string, description: string }> = [];
        for (let i = 0; i <= num; i++) {
          items.push({
            name: `Item ${num}-${i}`, // static `num` - dynamic `i`
            description: `This is item ${num}-${i}` // static `num` - dynamic `i`  
          });
        }
        return items;
      }),
      tap(items => console.log(`Emitted ${items.length} items`))
    );
  }

  private subscribeEvenNumbers(): void {
    // Create an Observable from an array of numbers
    const numbers$ = from([1, 2, 3, 4, 5]);

    // Use the filter operator to create an Observable that emits only even numbers
    const evenNumbers$ = numbers$.pipe(filter(num => num % 2 === 0));

    // Subscribe to the evenNumbers$ Observable and log the values
    this.evenNumbersSubscription = evenNumbers$.subscribe(num => console.log('even', num));
  }

  private setupEventObservables(): void {
    // Create an Observable from a click event on a button element
    const documentClick$ = fromEvent<MouseEvent>(document, 'click');
    // this. for local variables
    const buttonClick$ = documentClick$.pipe(
      filter(ev => (ev.target as HTMLElement)?.id === 'myButton')
    );

    // Create an Observable from a mousemove event on the document
    const mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove');

    // Use the merge operator to merge the buttonClick$ and mouseMove$ Observables
    this.mergeSubscription = merge(buttonClick$, mouseMove$).pipe(
      tap(event => console.log(`Merged event: ${event.type}`))
    ).subscribe();

    // Use the switchMap operator to create an Observable that emits the last key pressed
    this.buttonClickSubscription = buttonClick$.pipe(
      switchMap(() => fromEvent<KeyboardEvent>(document, 'keydown')),
      filter(event => event.target instanceof HTMLInputElement),
      map(event => (event.target as HTMLInputElement).value),
      tap(key => console.log(`Last key pressed: ${key}`))
    ).subscribe(key => this.lastKeyPressed = key);
  }

  protected updateLastKeyPressed(event: KeyboardEvent): void {
    this.lastKeyPressed = event.key;
  }

  ngOnDestroy(): void {
    this.evenNumbersSubscription?.unsubscribe();
    this.mergeSubscription?.unsubscribe();
    this.buttonClickSubscription?.unsubscribe();
  }
}
