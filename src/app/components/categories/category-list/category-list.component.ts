import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICategory } from '../../../interfaces';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent {
  @Input() title: string = '';
  @Input() categories: ICategory[] = [];

  @Output() callModalAction = new EventEmitter<ICategory>();
  @Output() callDeleteAction = new EventEmitter<ICategory>();
}
