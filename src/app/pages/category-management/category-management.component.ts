import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService, Category } from '../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EntityFormComponent } from '../../shared/components/entity-form/entity-form.component';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { AuthService } from '../../services/auth.service';
import { IRoleType } from '../../interfaces';

@Component({
  selector: 'app-category-management',
  standalone: true,
  imports: [CommonModule, EntityFormComponent, ConfirmationDialogComponent],
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss']
})
export class CategoryManagementComponent implements OnInit {
  categories: Category[] = [];
  showForm = false;
  showConfirmDialog = false;
  categoryToDelete: Category | null = null;
  selectedCategory: Category | null = null;
  isSuperAdmin = false;
  
  constructor(
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    // Solo los superadministradores pueden modificar categorías
    this.isSuperAdmin = this.authService.hasRole(IRoleType.superAdmin);
  }
  
  ngOnInit(): void {
    this.loadCategories();
  }
  
  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
        console.log('Categorías cargadas correctamente:', data);
      },
      error: (error: any) => {
        console.error('Error completo al cargar categorías:', error);
        const errorMsg = error.error?.message || error.message || error.statusText || 'Error desconocido';
        this.showMessage(`Error al cargar las categorías: ${errorMsg} (${error.status})`);
      }
    });
  }
  
  openNewCategoryForm(): void {
    this.selectedCategory = null;
    this.showForm = true;
  }
  
  editCategory(category: Category): void {
    this.selectedCategory = category;
    this.showForm = true;
  }
  
  closeForm(): void {
    this.showForm = false;
    this.selectedCategory = null;
  }
  
  saveCategory(categoryData: any): void {
    const category: Category = {
      ...categoryData
    };
    
    if (categoryData.id) {
      // Actualizar categoría existente
      this.categoryService.updateCategory(categoryData.id, category).subscribe({
        next: () => {
          this.showMessage('Categoría actualizada correctamente');
          this.closeForm();
          this.loadCategories();
        },
        error: (error: any) => {
          this.showMessage('Error al actualizar la categoría: ' + error.message);
        }
      });
    } else {
      // Crear nueva categoría
      this.categoryService.createCategory(category).subscribe({
        next: () => {
          this.showMessage('Categoría creada correctamente');
          this.closeForm();
          this.loadCategories();
        },
        error: (error: any) => {
          this.showMessage('Error al crear la categoría: ' + error.message);
        }
      });
    }
  }
  
  deleteCategory(category: Category): void {
    if (!category.id) {
      this.showMessage('Error: La categoría no tiene un ID válido');
      return;
    }
    
    this.categoryToDelete = category;
    this.showConfirmDialog = true;
  }
  
  confirmDelete(): void {
    if (!this.categoryToDelete || !this.categoryToDelete.id) return;
    
    this.categoryService.deleteCategory(this.categoryToDelete.id).subscribe({
      next: () => {
        this.showMessage('Categoría eliminada correctamente');
        this.closeConfirmDialog();
        this.loadCategories();
      },
      error: (error: any) => {
        this.showMessage('Error al eliminar la categoría: ' + error.message);
        this.closeConfirmDialog();
      }
    });
  }
  
  closeConfirmDialog(): void {
    this.showConfirmDialog = false;
    this.categoryToDelete = null;
  }
  
  showMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
