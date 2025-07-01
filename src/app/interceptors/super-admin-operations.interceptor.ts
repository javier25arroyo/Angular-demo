import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IRoleType } from '../interfaces';

@Injectable()
export class SuperAdminOperationsInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Verificamos si la petición es para productos o categorías
    const isProductOrCategory = 
      request.url.includes('products') || 
      request.url.includes('categories');
      
    const isModificationMethod = 
      request.method === 'POST' || 
      request.method === 'PUT' || 
      request.method === 'DELETE';
    
    console.log('Request URL:', request.url);
    console.log('Request Method:', request.method);
    console.log('Is Product or Category:', isProductOrCategory);
    console.log('Is Modification Method:', isModificationMethod);
    console.log('User is SuperAdmin:', this.authService.hasRole(IRoleType.superAdmin));
      
    // Solo bloqueamos operaciones de modificación (POST, PUT, DELETE), no operaciones de lectura (GET)
    if (isProductOrCategory && isModificationMethod) {
      // Verificamos si el usuario tiene el rol de SUPER_ADMIN
      if (!this.authService.hasRole(IRoleType.superAdmin)) {
        // Si no es superadmin, redirigimos a la página de acceso denegado
        this.router.navigate(['/access-denied']);
        
        // Y retornamos un error
        return throwError(() => new HttpErrorResponse({
          error: 'Operación no permitida. Se requiere rol de SUPER_ADMIN.',
          status: 403,
          statusText: 'Forbidden'
        }));
      }
    }
    
    // Si no es una operación protegida o el usuario es superadmin, dejamos pasar la petición
    return next.handle(request).pipe(
      catchError((error) => {
        // Capturamos errores para mejorar el manejo de excepciones
        console.error('Error en interceptor SuperAdminOperations:', error);
        return throwError(() => error);
      })
    );
  }
}
