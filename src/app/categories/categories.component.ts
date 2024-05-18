import { ChangeDetectorRef, Component, input } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { finalize, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService, private router: Router, private cdr: ChangeDetectorRef, private dialog: MatDialog) { }

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
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: {
        title: 'Category Sil',
        message: 'Category silmek istediğinize emin misiniz?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categoryService.deleteCategory(categoryId).pipe(
          finalize(() => {
            console.log("silme işlemi başarılı")
            this.ngOnInit()
          })).subscribe()
      }
    });

  }
}
