import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ICategory } from '../../../interfaces';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
})
export class CategoryFormComponent {
  private fb = inject(FormBuilder);

  @Input() categoryForm = this.fb.group({
    id: [''],
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
  });

  @Output() callSaveMethod = new EventEmitter<ICategory>();
  @Output() callUpdateMethod = new EventEmitter<ICategory>();

  callSave() {
    const dto: ICategory = this.categoryForm.getRawValue() as ICategory;
    dto.id ? this.callUpdateMethod.emit(dto) : this.callSaveMethod.emit(dto);
  }
}
