import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product.service';
import { CategoryService, Category } from '../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EntityFormComponent } from '../../shared/components/entity-form/entity-form.component';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { AuthService } from '../../services/auth.service';
import { IRoleType } from '../../interfaces';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, EntityFormComponent, ConfirmationDialogComponent],
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  showForm = false;
  showConfirmDialog = false;
  productToDelete: Product | null = null;
  selectedProduct: Product | null = null;
  isSuperAdmin = false;
  
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    // Solo los superadministradores pueden modificar productos
    this.isSuperAdmin = this.authService.hasRole(IRoleType.superAdmin);
  }
  
  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }
  
  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
      },
      error: (error: any) => {
        this.showMessage('Error al cargar los productos: ' + error.message);
      }
    });
  }
  
  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
      },
      error: (error: any) => {
        this.showMessage('Error al cargar las categorías: ' + error.message);
      }
    });
  }
  
  openNewProductForm(): void {
    this.selectedProduct = null;
    this.showForm = true;
  }
  
  editProduct(product: Product): void {
    this.selectedProduct = product;
    this.showForm = true;
  }
  
  closeForm(): void {
    this.showForm = false;
    this.selectedProduct = null;
  }
  
  saveProduct(productData: any): void {
    const product: Product = {
      ...productData,
      categoryId: productData.categoryId || 1 // Valor predeterminado si no se selecciona categoría
    };
    
    if (productData.id) {
      // Actualizar producto existente
      this.productService.updateProduct(productData.id, product).subscribe({
        next: () => {
          this.showMessage('Producto actualizado correctamente');
          this.closeForm();
          this.loadProducts();
        },
        error: (error: any) => {
          this.showMessage('Error al actualizar el producto: ' + error.message);
        }
      });
    } else {
      // Crear nuevo producto
      this.productService.createProduct(product).subscribe({
        next: () => {
          this.showMessage('Producto creado correctamente');
          this.closeForm();
          this.loadProducts();
        },
        error: (error: any) => {
          this.showMessage('Error al crear el producto: ' + error.message);
        }
      });
    }
  }
  
  deleteProduct(product: Product): void {
    if (!product.id) {
      this.showMessage('Error: El producto no tiene un ID válido');
      return;
    }
    
    this.productToDelete = product;
    this.showConfirmDialog = true;
  }
  
  confirmDelete(): void {
    if (!this.productToDelete || !this.productToDelete.id) return;
    
    this.productService.deleteProduct(this.productToDelete.id).subscribe({
      next: () => {
        this.showMessage('Producto eliminado correctamente');
        this.closeConfirmDialog();
        this.loadProducts();
      },
      error: (error: any) => {
        this.showMessage('Error al eliminar el producto: ' + error.message);
        this.closeConfirmDialog();
      }
    });
  }
  
  closeConfirmDialog(): void {
    this.showConfirmDialog = false;
    this.productToDelete = null;
  }
  
  getCategory(categoryId: number): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.nombre : 'Sin categoría';
  }
  
  showMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
