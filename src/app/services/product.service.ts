import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<any[]>(`${this.apiUrl}/products`);
  }

  getProduct(id: number) {
    return this.http.get<any>(`${this.apiUrl}/products/${id}`);
  }

  addProduct(product: any) {
    return this.http.post(`${this.apiUrl}/products`, product);
  }

  updateProduct(id: number, product: any) {
    return this.http.put(`${this.apiUrl}/products/${id}`, product);
  }
}
