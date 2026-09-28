import { Routes } from '@angular/router';
import { authGuard } from './features/route-guards/guards/auth.guard';
import { adminChildGuard } from './features/route-guards/guards/admin-child.guard';
import { unsavedChangesGuard } from './features/route-guards/guards/unsaved-changes.guard';
import { featureFlagGuard } from './features/route-guards/guards/feature-flag.guard';

export const routes: Routes = [
    {
        path: '', 
        loadComponent: () => import('./features/home/home').then(m => m.Home),
    },
    {
        path: 'signals',
        loadComponent: () => import('./features/signals/signals').then(m => m.Signals),
    },
    {
        path: 'rxjs-streams',
        loadComponent: () => 
            import('./features/rxjs-streams/rxjs-streams').then(m => m.RxjsStreams),
    },
    {
        path: 'lifecycle',
        loadComponent: () =>
            import('./features/lifecycle/lifecycle').then(m => m.Lifecycle),
    },
    {
        path: 'route-guards',
        loadComponent: () => import('./features/route-guards/route-guards').then(m => m.RouteGuards),
        canActivate: [authGuard],
        canActivateChild: [adminChildGuard],
        canDeactivate: [unsavedChangesGuard],
        children: [
            {
                path: 'child-a',
                loadComponent: () => import('./features/route-guards/route-guards').then(m => m.ChildAComponent)
            },
            {
                path: 'child-b',
                loadComponent: () => import('./features/route-guards/route-guards').then(m => m.ChildBComponent)
            },
            {
                path: 'feature',
                canMatch: [featureFlagGuard],
                loadComponent: () => import('./features/route-guards/route-guards').then(m => m.BetaFeatureComponent)
            },
            {
                path: 'feature',
                loadComponent: () => import('./features/route-guards/route-guards').then(m => m.StandardFeatureComponent)
            }
        ]
    },
    {
        path: 'pipes',
        loadComponent: () => import('./features/pipes/pipes').then(m => m.Pipes),
    },
    {
        path: 'forms',
        loadComponent: () => import('./features/forms/forms').then(m => m.Forms),
    },
    {
        path: 'wai-aria', 
        loadComponent: () => import('./features/wai-aria/wai-aria').then(m => m.WaiAria),
    },
    {
        path: 'no-wai-aria',
        loadComponent: () => import('./features/wai-aria/no-wai-aria/no-wai-aria').then(m => m.NoWaiAria),
    },
    {
        path: '**',
        redirectTo: ''
    }
];