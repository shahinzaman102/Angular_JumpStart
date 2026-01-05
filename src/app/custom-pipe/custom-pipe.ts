import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CanFlyPipe, Hero } from '../can-fly-pipe';
import { CapitalizePipe } from '../capitalize-pipe';
import { HeroCountPipe } from '../hero-count-pipe';

@Component({
  selector: 'app-custom-pipe',
  standalone: true,
  imports: [
    CommonModule,
    CanFlyPipe,
    CapitalizePipe,
    HeroCountPipe
  ],
  templateUrl: './custom-pipe.html',
  styleUrls: ['./custom-pipe.css']
})
export class CustomPipe {
  private http = inject(HttpClient);

  protected heroes$: Observable<Hero[]> = this.http.get<Hero[]>('/heroes.json');
}

// We create custom pipes in an Angular app for various reasons
//-------------------------------------------------------------
// Code reuse: Custom pipes allow you to encapsulate and reuse complex data transformations in multiple components throughout
// your application. Rather than duplicating the transformation logic in each component, you can define the logic
// once in a custom pipe and use it anywhere in your app.

// Maintainability: By separating the data transformation logic from the component code, custom pipes can make your
// codebase more maintainable. If you need to update the logic for a particular transformation, you can simply update
// the custom pipe and the changes will be reflected throughout your app.

// Readability: Custom pipes can make your template code more readable and expressive by reducing the amount of logic and complexity
// that needs to be included in your component code. This can help make your templates more concise and easier to understand.

// Performance: Custom pipes can also help improve the performance of your application by reducing the amount of data that needs
// to be processed and rendered in the template. By transforming data before it is rendered in the template, you can reduce
// the workload on the browser and improve the perceived performance of your app.

// Service vs Pipe
// ----------------
// Service = data & logic
// Pipe = formatting & display transformation
