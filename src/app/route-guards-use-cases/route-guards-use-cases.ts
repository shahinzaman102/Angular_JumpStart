import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HasUnsavedChanges } from '../guards/unsaved-changes.guard';

@Component({
  imports: [RouterOutlet, RouterLink],
  selector: 'app-route-guards-use-cases',
  styleUrl: './route-guards-use-cases.css',
  templateUrl: './route-guards-use-cases.html',
})
export class RouteGuardsUseCases implements HasUnsavedChanges {
  isLoggedIn = signal(localStorage.getItem('isLoggedIn') === 'true');
  isAdmin = signal(localStorage.getItem('userRole') === 'admin');
  betaFeature = signal(localStorage.getItem('betaFeature') === 'true');
  dirtyForm = signal(false);

  // Implementation required by CanDeactivate interface
  hasUnsavedChanges(): boolean {
    return this.dirtyForm();
  }

  toggleLogin() {
    this.isLoggedIn.set(!this.isLoggedIn());
    localStorage.setItem('isLoggedIn', String(this.isLoggedIn()));
  }

  toggleAdmin() {
    this.isAdmin.set(!this.isAdmin());
    localStorage.setItem('userRole', this.isAdmin() ? 'admin' : 'user');
  }

  toggleBeta() {
    this.betaFeature.set(!this.betaFeature());
    localStorage.setItem('betaFeature', String(this.betaFeature()));
  }
}

// Dummy components for child routes and CanMatch tests
@Component({ template: `<h4>Child Route A Content</h4>` })
export class ChildAComponent { }

@Component({ template: `<h4>Child Route B Content</h4>` })
export class ChildBComponent { }

@Component({ template: `<h4 style="color: green;">Beta Feature Component Loaded!</h4>` })
export class BetaFeatureComponent { }

@Component({ template: `<h4 style="color: gray;">Standard Fallback Feature Component Loaded!</h4>` })
export class StandardFeatureComponent { }

/*
In Code(TypeScript & Component Hierarchy):
- They are Not child components: They are simply separate class definitions in the same file.
- To be a direct nestable child component in template terms, RouteGuardsUseCases would need to 
  import them in its @Component.imports array and use them directly in its HTML(e.g., <app-child - a > </app-child>).
*/
