import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/ListResponseModel';
import { Product } from '../models/product';

import { environment } from 'src/environments/dev.environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(environment.apiUrl + "Products/getall");
  }

  add(product: Product): Observable<any> {
    return this.httpClient.post(environment.apiUrl + "Products", product, { responseType: 'text' });
  }

  deleteProduct(createdUserId: number, productId: number): Observable<any> {
    const body = {
      createdUserId: createdUserId,
      productId: productId,
    };
  
    return this.httpClient.delete(`${environment.apiUrl}Products`, {
      body,
      responseType: 'text'  // Cevabın text olduğunu belirtiyoruz
    });
  }

  getProductsById(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(`${environment.apiUrl}Products/${productId}`);
  }

  updateProduct(product: any): Observable<any> {
    return this.httpClient.put(`${environment.apiUrl}Products`, product, { responseType: 'text' }); // URL'ye ID eklemiyoruz
  }
}




/*/ Ürünü ID'ye göre getiriyoruz
getProductById(productId: number): Observable<Product> {
  return this.httpClient.get<Product>(`${environment.apiUrl}Products/${productId}`);
}

// Ürün güncelleme işlemi için PUT isteği gönderiyoruz
updateProduct(product: Product): Observable<any> {
  return this.httpClient.put(`${environment.apiUrl}Products/${product.productId}`, product, { responseType: 'text' });
} */



 

