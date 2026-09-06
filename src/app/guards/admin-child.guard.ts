import { CanActivateChildFn } from '@angular/router';

export const adminChildGuard: CanActivateChildFn = () => {
    const isAdmin = localStorage.getItem('userRole') === 'admin';

    if (!isAdmin) {
        alert('CanActivateChild blocked! You need the Admin role to access this child tab.');
        return false;
    }
    return true;
};