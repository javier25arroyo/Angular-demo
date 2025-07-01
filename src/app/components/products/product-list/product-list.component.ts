import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {
  products: Product[] = [];
  newProductName = '';
  newProductPrice: number | null = null;
  newProductCategoryId: number | null = null;
  editProductId: number | null = null;
  editProductName = '';
  editProductPrice: number | null = null;
  editProductCategoryId: number | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => this.products = data);
  }

  addProduct(): void {
    if (!this.newProductName.trim() || this.newProductPrice == null || this.newProductCategoryId == null) return;
    const product: Product = {
      name: this.newProductName,
      price: this.newProductPrice,
      categoryId: this.newProductCategoryId
    };
    this.productService.createProduct(product).subscribe(() => {
      this.newProductName = '';
      this.newProductPrice = null;
      this.newProductCategoryId = null;
      this.loadProducts();
    });
  }

  startEdit(product: Product): void {
    this.editProductId = product.id!;
    this.editProductName = product.name;
    this.editProductPrice = product.price;
    this.editProductCategoryId = product.categoryId;
  }

  updateProduct(): void {
    if (!this.editProductName.trim() || this.editProductPrice == null || this.editProductCategoryId == null || this.editProductId == null) return;
    const product: Product = {
      name: this.editProductName,
      price: this.editProductPrice,
      categoryId: this.editProductCategoryId
    };
    this.productService.updateProduct(this.editProductId, product).subscribe(() => {
      this.editProductId = null;
      this.editProductName = '';
      this.editProductPrice = null;
      this.editProductCategoryId = null;
      this.loadProducts();
    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
  }

  cancelEdit(): void {
    this.editProductId = null;
    this.editProductName = '';
    this.editProductPrice = null;
    this.editProductCategoryId = null;
  }
}
