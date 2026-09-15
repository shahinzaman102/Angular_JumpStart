import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

export interface RouteGuideLink {
  url: string;
  label: string;
}

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
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
    'forms-use-cases': 'Forms',
    'lifecycle-use-cases': 'Lifecycle',
    'route-guards-use-cases': 'Route Guards',
    'wai-aria': 'WAI-ARIA'
  };

  private readonly useCaseLabels: Record<string, string> = {
    'signal-use-cases': 'Use Cases (handles state):',
    'rxjs-stream-use-cases': 'Use Cases (handles event streams):',
    'pipes-use-cases': 'Use Cases (handles data transformation):',
    'forms-use-cases': 'Use Cases (handles user input):',
    'lifecycle-use-cases': 'Use Cases (handles component setup/teardown):',
    'route-guards-use-cases': 'Use Cases (handles navigation & access control):',
    'wai-aria': 'Use Cases (handles UI accessibility & ARIA bindings):'
  };

  private readonly guideLinks: Record<string, RouteGuideLink> = {
    'route-guards-use-cases': {
      url: 'https://docs.google.com/document/d/1RNCyDn1otQr-SROdiGKYvlVWvAaPtHyyU3UzeKvoO8c/edit?usp=sharing',
      label: '📖 View Route Guards Testing Guide & Instructions 🡥'
    },
    'wai-aria': {
      url: 'https://docs.google.com/document/d/1d-f7dUi-_PUO4HNfNJMjvIHbSirTVHyqLoWoFb0E3Xk/edit?usp=sharing',
      label: '📖 View WAI-ARIA Accessibility Testing Guide & Instructions 🡥'
    }
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

    'pipes-use-cases': `
      Formatting & Display
      Object & Data Inspection
      Asynchronous Data
      File Size Formatting
      Relative Time Display`,

    'forms-use-cases': `
      Simple Forms
      Complex & Dynamic Forms
      Signal-Based Forms(Experimental)`,

    'lifecycle-use-cases': `
      Construction & Injection Context
      Input Change Tracking
      Content & View Projection
      Post-Paint Render Hooks
      Cleanup & Teardown`,

    'route-guards-use-cases': `
      CanActivate (Page Protection)
      CanActivateChild (Nested Route Protection)
      CanDeactivate (Unsaved Changes Warning)
      CanMatch (Dynamic Feature Flag Routing)`,

    'wai-aria': `
      Custom WAI-ARIA Slider Pattern
      Signal-Driven Host Style & Attribute Bindings
      Screen Reader Live Regions (aria-live)
      High Contrast & Forced Colors Mode Support
      Keyboard Navigation & Focus Management`
  };

  protected readonly routes = computed(() => {
    const targetOrder = Object.keys(this.titles);

    return this.router.config
      .filter(
        (route) =>
          route.path &&
          route.path !== '**' &&
          route.path !== 'no-wai-aria' &&
          (route.loadComponent || route.component)
      )
      .sort((a, b) => {
        const indexA = targetOrder.indexOf(a.path ?? '');
        const indexB = targetOrder.indexOf(b.path ?? '');

        if (indexA === -1) return 1;
        if (indexB === -1) return -1;

        return indexA - indexB;
      });
  });

  protected formatTitle(path: string): string {
    return (
      this.titles[path] ??
      path.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
    );
  }

  protected getUseCaseLabel(path: string): string {
    return this.useCaseLabels[path] ?? '';
  }

  protected getGuideLink(path: string): RouteGuideLink | undefined {
    return this.guideLinks[path];
  }

  protected splitDescription(path: string): string[] {
    const description = this.descriptions[path] ?? '';

    return description
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
  }
}