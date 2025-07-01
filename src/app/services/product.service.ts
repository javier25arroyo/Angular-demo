import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { IRoleType } from '../interfaces';

export interface Product {
  id?: number;
  name: string;
  price: number;
  categoryId: number;
  description?: string; 
  stock?: number; 
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'products';
  private authService = inject(AuthService);

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Método para verificar si el usuario tiene permisos de administrador
  isSuperAdmin(): boolean {
    return this.authService.hasRole(IRoleType.superAdmin);
  }
}