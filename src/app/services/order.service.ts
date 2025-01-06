// order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Order } from '../models/order';
import { environment } from 'src/environments/dev.environment';
import { WarehouseService } from './warehouse.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient, private warehouseService: WarehouseService) { }

  // Tüm siparişleri getirir
  getOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(environment.apiUrl + "Orders/getall");
  }

  // Yeni sipariş ekler
  add(order: Order): Observable<any> {
    return this.httpClient.post(environment.apiUrl + "Orders", order, { responseType: 'text' }).pipe(
      tap(() => {
        // Sipariş başarılı bir şekilde eklendiğinde depo miktarını güncelle
        this.updateWarehouseQuantityAfterOrder(order.productId, order.quantity);
      })
    );
  }

  // Sipariş silme işlemi
  deleteOrder(orderId: number): Observable<any> {
    const options = {
      body: {
        orderId: orderId,
      },
      responseType: 'text' as const // Cevabın text olduğunu belirtiyoruz
    };
  
    return this.httpClient.delete(`${environment.apiUrl}Orders`, options);
  }

  // Siparişi ID'ye göre getirir
  getOrdersById(orderId: number): Observable<Order> {
    return this.httpClient.get<Order>(`${environment.apiUrl}Orders/${orderId}`);
  }

  // Siparişi günceller
  updateOrder(order: any): Observable<any> {
    return this.httpClient.put(`${environment.apiUrl}Orders`, order, { responseType: 'text' }); // URL'ye ID eklemiyoruz
  }

  // Siparişten sonra depo miktarını günceller
  private updateWarehouseQuantityAfterOrder(productId: number, orderQuantity: number) {
    // İlk olarak, ilgili ürünün bulunduğu depoyu al
    this.warehouseService.getWarehouses().subscribe(warehouses => {
      const warehouseToUpdate = warehouses.find(w => w.productId === productId);

      if (warehouseToUpdate) {
        // Depo bulunduysa, miktarı azalt
        const newQuantity = warehouseToUpdate.quantity - orderQuantity;

        // Yeni miktarı güncelle
        this.warehouseService.updateWarehouseQuantity(warehouseToUpdate.wareHouseId, newQuantity).subscribe();
      }
    });
  }
}


