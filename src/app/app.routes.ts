import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home-page/home-page').then(m => m.HomePage) // m stands for module (or file module).
    }, // loadComponent uses lazy loading — it downloads the component JavaScript 
       // file only when the user actually navigates to that route.
    {
        path: 'signal-use-cases',
        loadComponent: () => import('./signal-use-cases/signal-use-cases').then(m => m.SignalUseCases)
    },
    {
        path: 'rxjs-stream-use-cases',
        loadComponent: () =>
            import('./rxjs-stream-use-cases/rxjs-stream-use-cases').then(m => m.RxjsStreamUseCases)
    },
    {
        path: 'pipes-use-cases',
        loadComponent: () => import('./pipes-use-cases/pipes-use-cases').then(m => m.PipesUseCases)
    },
    { // ** (Catch-all): Redirects any invalid or unknown URL back to the home page (/).
        path: '**',
        redirectTo: ''
    }
];
