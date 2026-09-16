import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateChildFn } from '@angular/router';

export const adminChildGuard: CanActivateChildFn = () => {
    const platformId = inject(PLATFORM_ID);

    if (isPlatformBrowser(platformId)) {
        return localStorage.getItem('userRole') === 'admin';
    }
    return false;
};