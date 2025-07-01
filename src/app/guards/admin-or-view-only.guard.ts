import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IRoleType } from '../interfaces';

export const AdminOrViewOnlyGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  
  // Verificamos primero si el usuario está autenticado
  if (!authService.check()) {
    router.navigateByUrl('/login');
    return false;
  }
  
  // Si la ruta incluye operaciones de edición (es decir, no es solo consulta)
  // verificamos si el usuario es admin o superadmin
  const isEditOperation = route.data && route.data['requiresAdmin'] === true;
  
  if (isEditOperation) {
    const isAdmin = authService.hasRole(IRoleType.admin) || 
                   authService.hasRole(IRoleType.superAdmin);
    
    if (!isAdmin) {
      // Si no es admin y la operación requiere privilegios, redirigir a acceso denegado
      router.navigate(['/access-denied']);
      return false;
    }
  }
  
  // Si el usuario es admin o si la operación es de solo consulta, permitir acceso
  return true;
};
