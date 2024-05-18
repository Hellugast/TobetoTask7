import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-category-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './category-update.component.html',
  styleUrl: './category-update.component.scss'
})
export class CategoryUpdateComponent {
  // favoriteColorControl = new FormControl('');
  updateForm!: FormGroup;
  constructor(private route: ActivatedRoute, private router: Router, private categoryService: CategoryService, private fb: FormBuilder) {

  }
  categoryId!: number;
  category!: Category;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryId = params['id'];
      this.categoryService.getCategoryById(this.categoryId).subscribe(category => {
        this.category = category;
        if (this.category) {
          this.createForm();
        }
      });
    });
  }

  createForm() {
    this.updateForm = this.fb.group({
      name: [this.category.name],
      description: [this.category.description],
    });
  }

  onSubmit(event: Event) {

    event.preventDefault(); // HTML formunun varsayılan davranışını engellemek için kullanılır. 
    //Genellikle form gönderildiğinde sayfanın yeniden yüklenmesini veya URL'nin değişmesini engellemek için kullanılır.

    if (this.updateForm.valid) {
      const formData: Category = this.updateForm.value;
      formData.id = this.categoryId
      this.categoryService.updateCategory(formData).pipe(
        tap(response => {
          console.log('Kategori güncellendi:', response);
          this.router.navigate(['categories']);
        }),
        catchError(error => {
          console.error('Kategori güncelleme hatası:', error);
          return throwError(() => new Error(error));
        })
      ).subscribe();
    }
    // Yukarıdaki yapının çok sayıda farklı kullanımı bulunmakta, bulabildiğim en güncel hali bu
  }

}

