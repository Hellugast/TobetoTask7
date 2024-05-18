import { ChangeDetectorRef, Component, input } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { finalize, tap } from 'rxjs';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getCategories();
    //console.log(this.categories)
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe((categories: any) => {
      this.categories = categories;
    });
  }

  deleteCategory(categoryId: number) {
    this.categoryService.deleteCategory(categoryId).pipe(
      finalize(() => {
        console.log("silme işlemi başarılı")
        this.ngOnInit()
      })).subscribe()
  }
}
