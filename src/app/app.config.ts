import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule } from '@angular/forms';

import { routes } from './app.routes';
import { baseUrlInterceptor } from './interceptors/base-url.interceptor';
import { accessTokenInterceptor } from './interceptors/access-token.interceptor';
import { SuperAdminOperationsInterceptor } from './interceptors/super-admin-operations.interceptor';
import { handleErrorsInterceptor } from './interceptors/handle-errors.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(
      withInterceptors([
        baseUrlInterceptor,
        accessTokenInterceptor,
        handleErrorsInterceptor
      ])
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SuperAdminOperationsInterceptor,
      multi: true
    },
    provideAnimationsAsync(),
    importProvidersFrom(FormsModule) // ✅ aquí se importa FormsModule
  ]
};
