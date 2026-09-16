import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

/**
 * Intercepts outbound HTTP requests and responses globally to handle 
 * protocol-level status codes (e.g., auth redirects, global error alerts).
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                // Redirect unauthorized users to root since no dedicated /login route exists
                void router.navigate(['/']);
            } else if (error.status === 500) {
                // Handle server-side failures (e.g., show global notification toast)
                console.error('Server error occurred:', error.message);
            }

            // Re-throw the error so downstream callsites (e.g., httpResource/RxJS streams) 
            // can handle local state recovery if needed
            return throwError(() => error);
        })
    );
};