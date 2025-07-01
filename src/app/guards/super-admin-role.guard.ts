import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { IRoleType } from "../interfaces";

@Injectable({
  providedIn: 'root',
})
export class SuperAdminRoleGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isSuperAdmin = this.authService.hasRole(IRoleType.superAdmin);

    if (!isSuperAdmin) {
      this.router.navigate(['access-denied']);
      return false;
    }
    return true;
  }
}
