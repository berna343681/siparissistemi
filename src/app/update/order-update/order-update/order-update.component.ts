import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-update',
  templateUrl: './order-update.component.html',
  styleUrls: ['./order-update.component.css']
})
export class OrderUpdateComponent implements OnInit {
  order: Order;
  orderUpdateForm: FormGroup;

  constructor(
    private orderService: OrderService,
    private formbuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.createOrderUpdateForm();

    // Eğer URL'den orderId çekmeye çalışmıyorsanız bu kısmı kaldırabilirsiniz.
    // Siparişi API'den direkt alıyoruz.
    this.loadOrderData();
  }

  createOrderUpdateForm() {
    this.orderUpdateForm = this.formbuilder.group({
      createdUserId: ['', Validators.required],
      lastUpdatedUserId: ['', Validators.required],
      customerId: ['', Validators.required],
      productId: ['', Validators.required],
      quantity: ['', Validators.required],
      orderId: ['', Validators.required]  // orderId kontrolünü ekledik
    });
  }

  loadOrderData() {
    // Order verisini API'den alıyoruz. Burada orderId parametresi olmadan çalıştırıyoruz.
    this.orderService.getOrders().subscribe(
      (response: Order[]) => {
        if (response && response.length > 0) {
          // İlk siparişi aldığınızı varsayıyoruz.
          this.order = response[0]; 
          this.orderUpdateForm.patchValue(this.order);
        } else {
          console.error('Order not found!');
          this.toastr.error('Order not found!', 'Error');
        }
      },
      error => {
        console.error('Error fetching order:', error);
        this.toastr.error('Error fetching order data.', 'Error');
      }
    );
  }

  updateOrder() {
    if (this.orderUpdateForm.valid) {
      const orderModel = {
        ...this.orderUpdateForm.value,
        orderId: this.order?.orderId, // Eğer orderId yoksa undefined hatasından kaçınmak için kontrol ekledik
        status: this.order.status,
        createdDate: this.order.createdDate,
        lastUpdatedDate: new Date(),
        isDeleted: this.order.isDeleted
      };

      this.orderService.updateOrder(orderModel).subscribe(
        response => {
          this.toastr.success('Order updated successfully!', 'Success');
        },
        error => {
          console.error('Error updating order:', error);
          this.toastr.error('Error updating order.', 'Error');
        }
      );
    }
  }
}

  







