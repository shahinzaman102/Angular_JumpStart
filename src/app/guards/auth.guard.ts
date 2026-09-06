import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
    const router = inject(Router);
    const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';

    if (!isAuthenticated) {
        alert('CanActivate blocked access! Redirecting to home...');
        return router.createUrlTree(['/']);
    }
    return true;
};