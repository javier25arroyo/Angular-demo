import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-entity-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.scss']
})
export class EntityFormComponent implements OnInit, OnChanges {
  @Input() entityType: 'product' | 'category' = 'product';
  @Input() entity: any = null;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;
  submitted = false;
  
  constructor(private fb: FormBuilder) {}
  
  ngOnInit(): void {
    this.initForm();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['entity'] && this.form) {
      this.updateForm();
    }
  }
  
  initForm(): void {
    if (this.entityType === 'product') {
      this.form = this.fb.group({
        id: [null],
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: [0, [Validators.required, Validators.min(0)]],
        stock: [0, [Validators.required, Validators.min(0)]]
      });
    } else {
      this.form = this.fb.group({
        id: [null],
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required]
      });
    }
    
    this.updateForm();
  }
  
  updateForm(): void {
    if (this.entity) {
      this.form.patchValue(this.entity);
    }
  }
  
  onSubmit(): void {
    this.submitted = true;
    
    if (this.form.valid) {
      const formData = this.form.value;
      
      // Asegurar que los campos numéricos sean números
      if (this.entityType === 'product') {
        formData.price = Number(formData.price);
        formData.stock = Number(formData.stock);
      }
      
      this.save.emit(formData);
    }
  }
  
  onCancel(): void {
    this.cancel.emit();
  }
  
  // Helpers para la validación de formularios
  get isEditing(): boolean {
    return !!this.entity?.id;
  }
  
  get f() {
    return this.form.controls;
  }
  
  hasError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return control ? (control.invalid && (control.dirty || control.touched || this.submitted)) : false;
  }
}
