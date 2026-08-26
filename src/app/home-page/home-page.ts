import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  private readonly router = inject(Router);

  private readonly titles: Record<string, string> = {
    'signal-use-cases': 'Signals',
    'rxjs-stream-use-cases': 'RxJS',
    'pipes-use-cases': 'Pipes',
  };

  private readonly useCaseLabels: Record<string, string> = {
    'signal-use-cases': 'Use Cases (handles state):',
    'rxjs-stream-use-cases': 'Use Cases (handles event streams):',
    'pipes-use-cases': 'Use Cases (handles data transformation):',
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

    'pipes-use-cases': `Built-in Pipes
      Custom Pipes`
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