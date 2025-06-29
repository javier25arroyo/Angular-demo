import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, computed, inject, signal } from '@angular/core';
import { ICategory, ISearch } from '../interfaces';
import { Observable, finalize, tap } from 'rxjs';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private alertService = inject(AlertService);
  
  private _categories = signal<ICategory[]>([]);
  
  categories$ = computed(() => this._categories());
  
  search: ISearch = {
    pageSize: 5,
    page: 1,
  };

  isLoading = signal<boolean>(false);

  getAll(): Observable<ICategory[]> {
    this.isLoading.set(true);
    return this.http
      .get<ICategory[]>(`categories?page=${this.search.page}&size=${this.search.pageSize}`)
      .pipe(
        tap((resp: any) => {
          this._categories.set(resp.data);
          this.search.totalPages = resp.meta.totalPages;
        }),
        finalize(() => this.isLoading.set(false))
      );
  }

  save(category: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>('categories', category).pipe(
      tap(() => {
        this.alertService.success('Categoría guardada correctamente');
        this.getAll().subscribe();
      })
    );
  }

  update(category: ICategory): Observable<ICategory> {
    return this.http.put<ICategory>(`categories/${category.id}`, category).pipe(
      tap(() => {
        this.alertService.success('Categoría actualizada correctamente');
        this.getAll().subscribe();
      })
    );
  }

  delete(category: ICategory): Observable<void> {
    return this.http.delete<void>(`categories/${category.id}`).pipe(
      tap(() => {
        this.alertService.success('Categoría eliminada correctamente');
        this.getAll().subscribe();
      })
    );
  }
}
