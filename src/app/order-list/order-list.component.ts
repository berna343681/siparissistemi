import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: Order[] = [];
  newOrder: Order = {} as Order; // Boş bir nesneyi 'Order' olarak başlatıyoruz

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  // Siparişleri yükle
  loadOrders() {
    this.orderService.getOrders().subscribe((data: Order[]) => {
      this.orders = data;
    });
  }

  // Yeni sipariş ekle
  add() {
    this.orderService.add(this.newOrder).subscribe(response => {
      console.log('Sipariş eklendi:', response);
      this.loadOrders(); // Listeyi güncelle
    });
  }
}
