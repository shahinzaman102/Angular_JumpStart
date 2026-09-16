import { ErrorHandler, Service } from '@angular/core';

/**
 * Handles uncaught synchronous and asynchronous errors that occur within 
 * Angular's lifecycle and framework execution context.
 * 
 * Note: Early startup errors and window-level unhandled rejections are caught 
 * by `provideBrowserGlobalErrorListeners()` in `app.config.ts` and forwarded here.
 */
@Service()
export class GlobalErrorHandlerService implements ErrorHandler {
    handleError(error: unknown): void {
        // Technical stack traces should be logged to external tracking tools (e.g., Sentry)
        // rather than exposed raw to end users.
        console.error('Captured by Global Error Handler:', error);
    }
}