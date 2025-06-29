import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, computed, inject, signal } from '@angular/core';
import { IProduct, ISearch } from '../interfaces';
import { toObservable } from '@angular/core/rxjs-interop';
import { finalize, tap } from 'rxjs';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService <IProduct> {
  private http = inject(HttpClient);
  private alertService = inject(AlertService);
  
  private _products = signal<IProduct[]>([]);
  
  products$ = computed(() => this._products());
  
  search: ISearch = {
    pageSize: 5,
    page: 1,
  };

  isLoading = signal<boolean>(false);

  getAll() {
    this.isLoading.set(true);
    return this.http
      .get<IProduct[]>(`products?page=${this.search.page}&size=${this.search.pageSize}`)
      .pipe(
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (resp: any) => {
          this._products.set(resp.data);
          this.search.totalPages = resp.meta.totalPages;
        },
        error: () => {
          this.alertService.error('Error al cargar los productos');
        },
      });
  }

  save(product: IProduct) {
    return this.http.post<IProduct>('products', product).subscribe({
      next: () => {
        this.alertService.success('Producto guardado correctamente');
        this.getAll();
      },
      error: () => {
        this.alertService.error('Error al guardar el producto');
      },
    });
  }

  update(product: IProduct) {
    return this.http.put<IProduct>(`products/${product.id}`, product).subscribe({
      next: () => {
        this.alertService.success('Producto actualizado correctamente');
        this.getAll();
      },
      error: () => {
        this.alertService.error('Error al actualizar el producto');
      },
    });
  }

  delete(product: IProduct) {
    return this.http.delete<void>(`products/${product.id}`).subscribe({
      next: () => {
        this.alertService.success('Producto eliminado correctamente');
        this.getAll();
      },
      error: () => {
        this.alertService.error('Error al eliminar el producto');
      },
    });
  }
}
