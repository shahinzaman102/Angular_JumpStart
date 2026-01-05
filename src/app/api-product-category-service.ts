import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

@Injectable({ providedIn: 'root' })
export class ApiProductCategoryService {
  private apiUrl = 'https://fakestoreapi.com/products';

  private http = inject(HttpClient);

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/category/${category}`);
  }
}

// Placeholder (Placeholder syntax):
//----------------------------------
// {{}} --> used in Template (to dynamically replace variable values or expressions in the output)
// `${}` --> used in TypeScript (to dynamically replace variable values or expressions in the output)
