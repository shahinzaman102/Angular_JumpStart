import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule], // Provides common directives and pipes
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.css']
})
export class HomePage {

  private readonly router = inject(Router);

  // Dynamically get all configured routes with a component
  protected get routes() {
    return this.router.config.filter(r => r.path && r.component);
  }

  // Descriptions for each route
  protected readonly descriptions: { [key: string]: string } = {
    'js_ts-builtin-funcs': 'Most used Built-in JavaScript & TypeScript functions.',
    'student-table': 'Tables created using JavaScript data structures, interfaces & types.',
    'apiProduct-category': 'Products Category via Angular HttpClient and RxJS Observable.',
    'observable-use-cases': 'Async data handling, event handling & reactive programming.',
    'observable-with-operators': 'Observable operators - RxJS integration.',
    'behavior-subject-use-cases': 'Sharing state, caching, event bus, real-time updates.',
    'signal-use-cases': 'Local state, derived state, side effects, reactive UI.',
    'builtin-pipes': 'Using built-in Angular pipes for data transformation.',
    'custom-pipe': 'Creating custom pipes in Angular.'
  };

  // Format route path to a readable title
  protected formatTitle(path: string): string {
    return path.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  }

  // Split description into lines for bullet points
  protected splitDescription(path: string): string[] {
    const description = this.descriptions[path];
    return description.split('\n');
  }

  // Open route in a new browser tab
  protected openLinkInNewTab(path: string): void {
    const url = this.router.serializeUrl(this.router.createUrlTree([path]));
    window.open(url, '_blank');
  }
}
