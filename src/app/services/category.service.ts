import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private northwindAPIURL = 'https://northwind.vercel.app/api/categories'

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.northwindAPIURL)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCategoryById(categoryId: number): Observable<Category> {
    const apiUrl = `${this.northwindAPIURL}/${categoryId}`;
    return this.httpClient.get<Category>(apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateCategory(category: Category): Observable<Category> {
    const apiUrl = `${this.northwindAPIURL}/${category.id}`;
    return this.httpClient.put<Category>(apiUrl, category)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteCategory(categoryId: number): Observable<any> {
    const apiUrl = `${this.northwindAPIURL}/${categoryId}`;
    return this.httpClient.delete<any>(apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // addCategory(category: Category): Observable<Category> {
  //   const apiUrl = `${this.northwindAPIURL}`;
  //   return this.httpClient.post<Category>(apiUrl, category)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error));
  }

}
