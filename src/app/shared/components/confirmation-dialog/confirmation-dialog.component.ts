import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  @Input() title = '¿Está seguro?';
  @Input() message = '¿Está seguro que desea realizar esta acción?';
  @Input() confirmButtonText = 'Confirmar';
  @Input() cancelButtonText = 'Cancelar';
  @Input() dangerous = false;
  
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  
  onConfirm(): void {
    this.confirm.emit();
  }
  
  onCancel(): void {
    this.cancel.emit();
  }
}
