import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import type { IProduct } from '../../../interfaces';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  @Input() productForm!: FormGroup;
  @Output() saveProduct = new EventEmitter<IProduct>();
  @Output() updateProduct = new EventEmitter<IProduct>();

  fb = inject(FormBuilder);

  ngOnInit() {
    if (!this.productForm) {
      this.productForm = this.fb.group({
        id: [''],
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: [0, [Validators.required, Validators.min(0)]],
        stock: [0, [Validators.required, Validators.min(0)]],
        categoryId: ['', Validators.required],
      });
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const product = this.productForm.value;
      if (product.id) {
        this.updateProduct.emit(product);
      } else {
        this.saveProduct.emit(product);
      }
      this.productForm.reset();
    }
  }

  onCancel() {
    this.productForm.reset();
  }
}