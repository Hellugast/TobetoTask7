import { ChangeDetectorRef, Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../models/product.model';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router, private cdr: ChangeDetectorRef, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProducts();
    //console.log(this.products)
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((products: any) => {
      this.products = products;
    });
  }

  deleteProduct(productId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: {
        title: 'Product Sil',
        message: 'Product silmek istediğinize emin misiniz?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.deleteProduct(productId).pipe(
          finalize(() => {
            console.log("silme işlemi başarılı")
            this.ngOnInit()
          })).subscribe()
      }
    });

  }
}
