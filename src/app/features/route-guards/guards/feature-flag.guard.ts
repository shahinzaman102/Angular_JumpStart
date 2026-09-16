import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanMatchFn } from '@angular/router';

export const featureFlagGuard: CanMatchFn = () => {
    const platformId = inject(PLATFORM_ID);

    if (isPlatformBrowser(platformId)) {
        return localStorage.getItem('betaFeature') === 'true';
    }
    return false;
};