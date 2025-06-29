import { Component, inject, ViewChild } from '@angular/core';
import { ProductListComponent } from '../../components/product/product-list/product-list.component';
import { ProductFormComponent } from '../../components/product/product-form/product-form.component';
import { ProductService } from '../../services/product.service';
import { ModalService } from '../../services/modal.service';
import { FormBuilder, Validators } from '@angular/forms';
import type { IProduct } from '../../interfaces';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ProductListComponent,
    ProductFormComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  productService = inject(ProductService);
  modalService = inject(ModalService);

  @ViewChild('addProductsModal') addProductsModal: any;

  fb = inject(FormBuilder);
  productForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    categoryId: ['', Validators.required],
  });

  constructor() {
    this.productService.search.page = 1;
    this.productService.getAll();
  }

  saveProduct(p: IProduct) {
    this.productService.save(p);
    this.modalService.closeAll();
  }

  callEdition(prod: IProduct) {
    this.productForm.patchValue({
      id: prod.id?.toString() || '',
      name: prod.name,
      description: prod.description,
      price: prod.price,
      stock: prod.stock,
      categoryId: prod.categoryId?.toString() || ''
    });
    this.modalService.displayModal('md', this.addProductsModal);
  }

  updateProduct(p: IProduct) {
    this.productService.update(p);
    this.modalService.closeAll();
  }
}
