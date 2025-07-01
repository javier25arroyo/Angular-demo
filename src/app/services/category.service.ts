import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { IRoleType } from '../interfaces';

export interface Category {
  id?: number;
  nombre: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'categories';
  private authService = inject(AuthService);

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    console.log('Solicitando categorías desde:', this.apiUrl);
    return this.http.get<Category[]>(this.apiUrl);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
  }

  updateCategory(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Método para verificar si el usuario tiene permisos de super administrador
  isSuperAdmin(): boolean {
    return this.authService.hasRole(IRoleType.superAdmin);
  }
}
