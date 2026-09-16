import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

export interface RouteGuideLink {
  url: string;
  label: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly router = inject(Router);

  private readonly titles: Record<string, string> = {
    'signals': 'Signals',
    'rxjs-streams': 'RxJS',
    'pipes': 'Pipes',
    'forms': 'Forms',
    'lifecycle': 'Lifecycle',
    'route-guards': 'Route Guards',
    'wai-aria': 'WAI-ARIA'
  };

  private readonly useCaseLabels: Record<string, string> = {
    'signals': 'Use Cases (handles state):',
    'rxjs-streams': 'Use Cases (handles event streams):',
    'pipes': 'Use Cases (handles data transformation):',
    'forms': 'Use Cases (handles user input):',
    'lifecycle': 'Use Cases (handles component setup/teardown):',
    'route-guards': 'Use Cases (handles navigation & access control):',
    'wai-aria': 'Use Cases (handles UI accessibility & ARIA bindings):'
  };

  private readonly guideLinks: Record<string, RouteGuideLink> = {
    'route-guards': {
      url: 'https://docs.google.com/document/d/1RNCyDn1otQr-SROdiGKYvlVWvAaPtHyyU3UzeKvoO8c/edit?usp=sharing',
      label: '📖 View Route Guards Testing Guide & Instructions 🡥'
    },
    'wai-aria': {
      url: 'https://docs.google.com/document/d/1d-f7dUi-_PUO4HNfNJMjvIHbSirTVHyqLoWoFb0E3Xk/edit?usp=sharing',
      label: '📖 View WAI-ARIA Accessibility Testing Guide & Instructions 🡥'
    }
  };

  private readonly descriptions: Record<string, string> = {
    'signals': `
      Local & Shared State 
      Derived / Cached Values
      Reactive Side Effects
      Component APIs & DOM`,

    'rxjs-streams': `
      High-Frequency Events
      Input Debouncing
      Sequential Async Processing
      Duplicate Event Handling
      Time-Based Streams
      Stream Cancellation`,

    'pipes': `
      Formatting & Display
      Object & Data Inspection
      Asynchronous Data
      File Size Formatting
      Relative Time Display`,

    'forms': `
      Simple Forms
      Complex & Dynamic Forms
      Signal-Based Forms(Experimental)`,

    'lifecycle': `
      Construction & Injection Context
      Input Change Tracking
      Content & View Projection
      Post-Paint Render Hooks
      Cleanup & Teardown`,

    'route-guards': `
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