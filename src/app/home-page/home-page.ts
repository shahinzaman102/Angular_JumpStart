import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Do NOT set `OnPush` explicitly cause it's the default in Angular v22+.
  // We've set to provide clarity..
})
export class HomePage {
  private readonly router = inject(Router);

  private readonly titles: Record<string, string> = {
    'signal-use-cases': 'Signals',
    'rxjs-stream-use-cases': 'RxJS',
    'pipes-use-cases': 'Pipes',
    'forms-use-cases': 'Forms',
    'lifecycle-use-cases': 'Lifecycle',
  };

  private readonly useCaseLabels: Record<string, string> = {
    'signal-use-cases': 'Use Cases (handles state):',
    'rxjs-stream-use-cases': 'Use Cases (handles event streams):',
    'pipes-use-cases': 'Use Cases (handles data transformation):',
    'forms-use-cases': 'Use Cases (handles user input):',
    'lifecycle-use-cases': 'Use Cases (handles component setup/teardown):',
  };

  private readonly descriptions: Record<string, string> = {
    'signal-use-cases': `
      Local & Shared State 
      Derived / Cached Values
      Reactive Side Effects
      Component APIs & DOM`,

    'rxjs-stream-use-cases': `
      High-Frequency Events
      Input Debouncing
      Sequential Async Processing
      Duplicate Event Handling
      Time-Based Streams
      Stream Cancellation`,

    'pipes-use-cases': `Formatting & Display
      Object & Data Inspection
      Asynchronous Data
      File Size Formatting
      Relative Time Display`,

    'forms-use-cases': `Simple Forms
      Complex & Dynamic Forms
      Signal-Based Forms(Experimental)`,

    'lifecycle-use-cases': `Construction & Injection Context
      Input Change Tracking
      Content & View Projection
      Post-Paint Render Hooks
      Cleanup & Teardown`
  };

  protected readonly routes = computed(() =>
    this.router.config.filter(
      (route) =>
        route.path &&
        route.path !== '**' &&
        (route.loadComponent || route.component)
    )
  );

  protected formatTitle(path: string): string {
    return (
      this.titles[path] ??
      path.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
    );
  }

  protected getUseCaseLabel(path: string): string {
    return this.useCaseLabels[path] ?? '';
  }

  protected splitDescription(path: string): string[] {
    const description = this.descriptions[path] ?? '';

    return description
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
  }
}