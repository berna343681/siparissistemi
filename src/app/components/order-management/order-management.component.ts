import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {
  orders: MatTableDataSource<Order>;
  displayedColumns: string[] = [
    'createdUserId', 'createdDate', 'lastUpdatedUserId', 'lastUpdatedDate',
    'status', 'isDeleted', 'orderId', 'customerId', 'productId', 'quantity', //'addToCart'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private toastrService: ToastrService,
    private orderService: OrderService,
    private cartService:CartService ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders().subscribe(
      response => {
        this.orders = new MatTableDataSource(response);
        this.orders.paginator = this.paginator;
        this.orders.sort = this.sort;
      },
      error => {
        console.error('Error:', error);
        this.toastrService.error('Veri yüklenemedi.');
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.orders.filter = filterValue.trim().toLowerCase();
  }

  addToCart(order: Order) {  // cart ingilizcede alışveriş sepeti demek 
    if(order.orderId===1){
      this.toastrService.error("Hata", "Bu ürün sepete eklenemez" )
    }else{
      this.toastrService.success( "Sepete Eklendi",)
      this.cartService.addToCart(order);
    }
  }
}
