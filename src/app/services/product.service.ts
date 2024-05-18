import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private northwindAPIURL = 'https://northwind.vercel.app/api/products'

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.northwindAPIURL)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProductById(productId: number): Observable<Product> {
    const apiUrl = `${this.northwindAPIURL}/${productId}`;
    return this.httpClient.get<Product>(apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateProduct(product: Product): Observable<Product> {
    const apiUrl = `${this.northwindAPIURL}/${product.id}`;
    return this.httpClient.put<Product>(apiUrl, product)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteProduct(productId: number): Observable<any> {
    const apiUrl = `${this.northwindAPIURL}/${productId}`;
    return this.httpClient.delete<any>(apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // addProduct(Product: Product): Observable<Product> {
  //   const apiUrl = `${this.northwindAPIURL}`;
  //   return this.httpClient.post<Product>(apiUrl, Product)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error));
  }

}
