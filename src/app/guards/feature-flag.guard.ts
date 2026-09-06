import { CanMatchFn } from '@angular/router';

export const featureFlagGuard: CanMatchFn = () => {
    return localStorage.getItem('betaFeature') === 'true';
};