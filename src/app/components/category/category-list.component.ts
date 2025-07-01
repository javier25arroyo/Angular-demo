import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService, Category } from '../../services/category.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-list.component.html'
})
export class CategoryListComponent {
  categories: Category[] = [];
  newCategoryName = '';
  editCategoryId: number | null = null;
  editCategoryName = '';

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(data => this.categories = data);
  }

  addCategory(): void {
    if (!this.newCategoryName.trim()) return;
    const category: Category = { name: this.newCategoryName };
    this.categoryService.createCategory(category).subscribe(() => {
      this.newCategoryName = '';
      this.loadCategories();
    });
  }

  startEdit(category: Category): void {
    this.editCategoryId = category.id!;
    this.editCategoryName = category.name;
  }

  updateCategory(): void {
    if (!this.editCategoryName.trim() || this.editCategoryId === null) return;
    const category: Category = { name: this.editCategoryName };
    this.categoryService.updateCategory(this.editCategoryId, category).subscribe(() => {
      this.editCategoryId = null;
      this.editCategoryName = '';
      this.loadCategories();
    });
  }

  deleteCategory(id: number): void {
    this.categoryService.deleteCategory(id).subscribe(() => this.loadCategories());
  }

  cancelEdit(): void {
    this.editCategoryId = null;
    this.editCategoryName = '';
  }
}
