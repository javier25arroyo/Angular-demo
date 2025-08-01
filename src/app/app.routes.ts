import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { SigUpComponent } from './pages/auth/sign-up/signup.component';
import { UsersComponent } from './pages/users/users.component';
import { AuthGuard } from './guards/auth.guard';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { AdminRoleGuard } from './guards/admin-role.guard';
import { SuperAdminRoleGuard } from './guards/super-admin-role.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GuestGuard } from './guards/guest.guard';
import { IRoleType } from './interfaces';
import { ProfileComponent } from './pages/profile/profile.component';
import { GamesComponent } from './pages/games/games.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductManagementComponent } from './pages/product-management/product-management.component';
import { CategoryManagementComponent } from './pages/category-management/category-management.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'signup',
    component: SigUpComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'app',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'app',
        redirectTo: 'users',
        pathMatch: 'full',
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [SuperAdminRoleGuard],
        data: { 
          authorities: [
            IRoleType.superAdmin
          ],
          name: 'Users',
          showInSidebar: true,
          // Indicamos claramente que solo SUPER_ADMIN puede acceder
          superAdminOnly: true
        }
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { 
          authorities: [
            IRoleType.admin, 
            IRoleType.superAdmin,
            IRoleType.user
          ],
          name: 'Dashboard',
          showInSidebar: true
        }
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: { 
          authorities: [
            IRoleType.admin, 
            IRoleType.superAdmin,
            IRoleType.user
          ],
          name: 'profile',
          showInSidebar: false
        }
      },
      {
        path: 'games',
        component: GamesComponent,
        data: { 
          authorities: [
            IRoleType.admin, 
            IRoleType.superAdmin,
            IRoleType.user,
          ],
          name: 'games',
          showInSidebar: true
        }
      },
      {
        path: 'orders',
        component: OrdersComponent,
        data: { 
          authorities: [
            IRoleType.admin, 
            IRoleType.superAdmin,
            IRoleType.user,
          ],
          name: 'orders',
          showInSidebar: true
        }
      },
      {
        path: 'products',
        component: ProductManagementComponent,
        canActivate: [AuthGuard], // Solo requiere autenticación, las restricciones de edición están en el componente
        data: { 
          authorities: [
            IRoleType.admin, 
            IRoleType.superAdmin,
            IRoleType.user
          ],
          name: 'Productos',
          showInSidebar: true,
          // Indicamos que solo SUPER_ADMIN puede modificar
          editPermission: IRoleType.superAdmin
        }
      },
      {
        path: 'categories',
        component: CategoryManagementComponent,
        canActivate: [AuthGuard], // Solo requiere autenticación, las restricciones de edición están en el componente
        data: { 
          authorities: [
            IRoleType.admin, 
            IRoleType.superAdmin,
            IRoleType.user
          ],
          name: 'Categorías',
          showInSidebar: true,
          // Indicamos que solo SUPER_ADMIN puede modificar
          editPermission: IRoleType.superAdmin
        }
      },
    ],
  },
];
