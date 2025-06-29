import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { PaginationComponent } from '../../pagination/pagination.component';
import type { IProduct } from '../../../interfaces';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  productService = inject(ProductService);

  @Output() editProduct = new EventEmitter<IProduct>();

  onEdit(product: IProduct) {
    this.editProduct.emit(product);
  }

  onDelete(product: IProduct) {
    if (confirm(`¿Está seguro de eliminar el producto "${product.name}"?`)) {
      this.productService.delete(product);
    }
  }
}