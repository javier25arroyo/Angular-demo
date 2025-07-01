import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const handleErrorsInterceptor: HttpInterceptorFn = (req, next) => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  return next(req).pipe(
    catchError((error: any): Observable<any> => {
      console.log('Error interceptado:', error);
      
      // Errores de autenticación
      if (error.status === 401 && !req.url.includes('auth')) {
        console.log('Error de autenticación, redirigiendo a login');
        authService.logout();
        router.navigateByUrl('/login');
        return of({ status: false });
      }
      
      // Error 403: solo redirigir si no es una operación de productos/categorías
      if (error.status === 403 && !req.url.includes('auth')) {
        if (req.url.includes('products') || req.url.includes('categories')) {
          console.log('Error 403 en productos/categorías, propagando error');
          throw error;
        } else {
          console.log('Error 403 en otra ruta, redirigiendo a login');
          authService.logout();
          router.navigateByUrl('/login');
          return of({ status: false });
        }
      }
      
      if (error.status === 422) {
        throw error.error;
      }
      if (error.status === 404) {
        throw { status: false };
      }
      
      // Para otros errores, propagamos el error para que los componentes puedan manejarlo
      throw error;
    })
  );
};
