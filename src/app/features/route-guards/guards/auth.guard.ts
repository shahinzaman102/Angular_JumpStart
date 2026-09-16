import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
    const router = inject(Router);
    const platformId = inject(PLATFORM_ID);

    let isAuthenticated = false;

    if (isPlatformBrowser(platformId)) {
        try {
            isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
        } catch {
            isAuthenticated = false;
        }
    }

    if (!isAuthenticated) {
        // Only trigger browser dialogs when running on the client platform
        if (isPlatformBrowser(platformId)) {
            alert('CanActivate blocked access! Redirecting to home...');
        }
        return router.createUrlTree(['/']);
    }

    return true;
};