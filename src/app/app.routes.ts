import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminChildGuard } from './guards/admin-child.guard';
import { unsavedChangesGuard } from './guards/unsaved-changes.guard';
import { featureFlagGuard } from './guards/feature-flag.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home-page/home-page').then(m => m.HomePage),
    },
    {
        path: 'signal-use-cases',
        loadComponent: () => import('./signal-use-cases/signal-use-cases').then(m => m.SignalUseCases),
    },
    {
        path: 'rxjs-stream-use-cases',
        loadComponent: () =>
            import('./rxjs-stream-use-cases/rxjs-stream-use-cases').then(m => m.RxjsStreamUseCases),
    },
    {
        path: 'pipes-use-cases',
        loadComponent: () => import('./pipes-use-cases/pipes-use-cases').then(m => m.PipesUseCases),
    },
    {
        path: 'forms-use-cases',
        loadComponent: () => import('./forms-use-cases/forms-use-cases').then(m => m.FormsUseCases),
    },
    {
        path: 'lifecycle-use-cases',
        loadComponent: () =>
            import('./lifecycle-use-cases/lifecycle-use-cases').then(m => m.LifecycleUseCases),
    },
    {
        path: 'route-guards-guide',
        loadComponent: () =>
            import('./route-guards-use-cases/guide-page/guide-page').then(m => m.GuidePage)
    },
    
    // --- ROUTE GUARDS DEMO ROUTE (Single Root Entry) ---
    {
        path: 'route-guards-use-cases',
        loadComponent: () => import('./route-guards-use-cases/route-guards-use-cases').then(m => m.RouteGuardsUseCases),
        canActivate: [authGuard],
        canDeactivate: [unsavedChangesGuard],
        canActivateChild: [adminChildGuard],
        children: [
            {
                path: 'child-a',
                loadComponent: () => import('./route-guards-use-cases/route-guards-use-cases').then(m => m.ChildAComponent)
            },
            {
                path: 'child-b',
                loadComponent: () => import('./route-guards-use-cases/route-guards-use-cases').then(m => m.ChildBComponent)
            },
            {
                path: 'feature',
                canMatch: [featureFlagGuard],
                loadComponent: () => import('./route-guards-use-cases/route-guards-use-cases').then(m => m.BetaFeatureComponent)
            },
            {
                path: 'feature',
                loadComponent: () => import('./route-guards-use-cases/route-guards-use-cases').then(m => m.StandardFeatureComponent)
            }
        ]
    },

    {
        path: '**',
        redirectTo: ''
    }
];