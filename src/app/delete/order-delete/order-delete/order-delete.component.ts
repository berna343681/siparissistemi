import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-delete',
  templateUrl: './order-delete.component.html',
  styleUrls: ['./order-delete.component.css']
})
export class OrderDeleteComponent {
  orderId: number; // 
  
  constructor(
    private orderService: OrderService,
    private toastrService:ToastrService) {}

  deleteOrder() {
    this.orderService.deleteOrder(this.orderId)
      .subscribe(response => {
          this.toastrService.success( response  ); // Show success message
      }, error => {
        this.toastrService.error( error + 'Silme hatası:'); // Show error message
      });
  }
}



