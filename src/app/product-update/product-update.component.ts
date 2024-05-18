import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { catchError, tap, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.scss'
})
export class ProductUpdateComponent {
  // favoriteColorControl = new FormControl('');
  updateForm!: FormGroup;
  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService, private fb: FormBuilder) {

  }
  productId!: number;
  product!: Product;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.productService.getProductById(this.productId).subscribe(product => {
        this.product = product;
        if (this.product) {
          this.createForm();
        }
      });
    });
  }

  createForm() {
    this.updateForm = this.fb.group({
      name: [this.product.name],
      unitPrice: [this.product.unitPrice],
      quantityPerUnit: [this.product.quantityPerUnit],
      unitsInStock: [this.product.unitsInStock],
      unitsOnOrder: [this.product.unitsOnOrder],
      categoryId: [this.product.categoryId],
      discontinued: [this.product.discontinued],
      supplierId: [this.product.supplierId],
      reorderLevel: [this.product.reorderLevel],

    });
  }

  onSubmit(event: Event) {

    event.preventDefault(); // HTML formunun varsayılan davranışını engellemek için kullanılır. 
    //Genellikle form gönderildiğinde sayfanın yeniden yüklenmesini veya URL'nin değişmesini engellemek için kullanılır.

    if (this.updateForm.valid) {
      const formData: Product = this.updateForm.value;
      formData.id = this.productId
      console.log(this.product)
      this.productService.updateProduct(formData).pipe(
        tap(response => {
          console.log('Kategori güncellendi:', response);
          this.router.navigate(['products']);
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
