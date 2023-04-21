import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = '';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<any[]>(`${this.apiUrl}/products`);
  }

  getProduct(id: number) {
    return this.http.get<any>(`${this.apiUrl}/products/${id}`);
  }
}
