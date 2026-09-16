import { ApplicationConfig, ErrorHandler, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';

import { routes } from './app.routes';
import { GlobalErrorHandlerService } from './global-error-handler.service';
import { errorInterceptor } from './error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // Forwards window-level 'error' and 'unhandledrejection' events to GlobalErrorHandlerService
    provideBrowserGlobalErrorListeners(),
    // Configures application routing with defined route table
    provideRouter(routes),
    // Enables hydration support for client-side rendering with SSR
    provideClientHydration(),

    // Overrides Angular's default ErrorHandler with custom centralized logging service
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    // Single HTTP client provider configured with functional error interceptor
    provideHttpClient(
      withInterceptors([errorInterceptor])
    ),
  ]
};