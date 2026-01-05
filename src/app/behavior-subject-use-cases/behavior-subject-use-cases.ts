// BehaviorSubject is a type of Subject that always emits the most recent value to new subscribers. 
// It stores the current value of the observable sequence, which can be accessed using the .value property.
// It emits the current value immediately to new subscribers when they subscribe, before emitting any subsequent values.
// BehaviorSubject can be useful in situations where you need to share state between different parts of your application,
// and ensure that all subscribers receive the current state when they first subscribe, without having to wait for new values to be emitted.
// However, it's important to note that the use of BehaviorSubject should be carefully considered, as it can potentially lead to unexpected behavior if used incorrectly.

// Does BehaviorSubject store data?
// Yes, BehaviorSubject stores the most recently emitted value and new subscribers will receive that value immediately upon subscription. 
// In other words, BehaviorSubject has a concept of "current value" that is accessible through the value property, 
// and this value is updated whenever a new value is emitted by calling the next() method. 
// This makes BehaviorSubject a useful tool for sharing state across components in an Angular application.

// Does Observable store data?
// No, an Observable does not store data. It is simply a stream of data that can be subscribed to. When an Observable is created, it is just 
// a blueprint for a stream of data. The actual data is produced by the source of the Observable, such as a user event or an HTTP request. 
// Once the data is produced, it is emitted to all subscribers of the Observable, but it is not stored within the Observable itself.

import { Component, inject, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChildBehaviorSubjectUseCaseOne } from '../child-behavior-subject-use-case-one/child-behavior-subject-use-case-one';
import { ChildBehaviorSubjectUseCaseTwo } from '../child-behavior-subject-use-case-two/child-behavior-subject-use-case-two';
import { ChildBehaviorSubjectUseCaseThree } from '../child-behavior-subject-use-case-three/child-behavior-subject-use-case-three';
import { HttpClient } from '@angular/common/http';
import { ChangeStateService } from '../changestate-service';
import { AuthService } from '../auth.service';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

@Component({
  selector: 'app-behavior-subject-use-cases',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ChildBehaviorSubjectUseCaseOne,
    ChildBehaviorSubjectUseCaseTwo,
    ChildBehaviorSubjectUseCaseThree
  ],
  templateUrl: './behavior-subject-use-cases.html',
  styleUrls: ['./behavior-subject-use-cases.css']
})

export class BehaviorSubjectUseCases implements OnDestroy {
  // Use Case 1: Sharing state across components
  protected message!: string;

  // Use Case 2: Caching
  protected readonly fetchedData$ = new BehaviorSubject<Product[] | null>(null);
  private readonly cachedDataSubject = new BehaviorSubject<Product[] | null>(null);
  protected readonly cachedData$: Observable<Product[] | null>;
  private cachedDataSubscription!: Subscription;
  protected getCacheClicked = false;

  // Use Case 4: User Input
  private readonly inputSubject = new BehaviorSubject<string>('');
  private inputSubscription: Subscription;
  protected inputValue = '';

  // Use Case 5: Real-time Updates
  private readonly messagesSubject = new BehaviorSubject<string[]>([]);
  private messagesSubscription: Subscription;
  protected readonly messages$: Observable<string[]>;

  // Use inject() instead of constructor injection
  private http = inject(HttpClient);
  private stateService = inject(ChangeStateService);
  private authService = inject(AuthService);

  constructor() {
    // Use Case 2: Caching
    this.cachedData$ = this.cachedDataSubject.asObservable();
    // The asObservable() method is a utility method provided by RxJS that allows you to create a read-only version (Observable) of a BehaviorSubject.
    // The read-only Observable can be subscribed to, but it cannot emit new values to the stream directly.
    // Instead, new values must be emitted by the private Subject or BehaviorSubject that is being observed. 
    // This helps to ensure that all updates to the state are performed through a single source of truth and prevent unwanted state changes from external sources.

    // Use Case 4: User Input
    this.inputSubscription = this.inputSubject.subscribe(input => {
      this.inputValue = input;
    });
    // 👉 Subscribe where you consume the data; expose Observables when sharing data across components.
    
    // Use Case 5: Real-time Updates
    this.messages$ = this.messagesSubject.asObservable();
    this.messagesSubscription = this.getMessages().subscribe(message => {
      const messages = this.messagesSubject.getValue();
      messages.push(message);
      this.messagesSubject.next(messages);
    });
  }

  // Use Case 1: Sharing state across components
  protected shareState() {
    this.stateService.changeState(this.message);
  }

  // Use Case 2: Caching
  protected fetchData(): void {
    // Make a GET request to the API endpoint to fetch data
    this.cachedDataSubscription = this.http.get<Product[]>('https://fakestoreapi.com/products?limit=3').subscribe(response => {
      this.cachedDataSubject.next(response);
    });
  }

  protected getCachedData(): void {
    // Display the cached data
    const cachedData = this.cachedDataSubject.getValue();
    console.log('Cached Data:', cachedData);
    this.getCacheClicked = true;
  }

  // Use Case 3: Event Bus -->
  protected login() {
    // Update login status
    this.authService.setLoginStatus(true);
  }

  // Use Case 4: User Input -->
  protected updateInput(value: string): void {
    this.inputSubject.next(value);
  }

  // Use Case 5: Real-time Updates --> 
  getMessages(): Observable<string> {
    // Simulate real-time updates
    return new Observable(observer => {
      setTimeout(() => {
        observer.next('Hello');
      }, 1000);
      setTimeout(() => {
        observer.next('How are you?');
      }, 2000);
      setTimeout(() => {
        observer.next('I am fine, thanks');
      }, 3000);
      setTimeout(() => {
        observer.next('What about you?');
      }, 4000);
      setTimeout(() => {
        observer.next('Same here');
      }, 5000);
    });
  }

  protected sendMessage(message: string): void {
    const messages = this.messagesSubject.getValue();
    messages.push(message);
    this.messagesSubject.next(messages);
  }

  // Best practice to check the subscription to avoid runtime errors.
  // It's a good approach to place the `ngOnDestroy` method at the end of the component-class. - 
  // This can help make it easier to find the method when working with larger and more complex components.
  // This can also help the method to being strict to it's position when updating the code with new Subscription additions.
  ngOnDestroy(): void {
    // Clean up subscriptions
    if (this.cachedDataSubscription) {
      this.cachedDataSubscription.unsubscribe();
    }
    if (this.inputSubscription) {
      this.inputSubscription.unsubscribe();
    }
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
  }

}
