import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit {
  orderAddForm: FormGroup;
  order: Order;

  constructor(
    private formbuilder: FormBuilder,
    private orderService: OrderService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createOrderAddForm();
  }

  // ISO 8601 formatındaki tarihi 'YYYY-MM-DDTHH:MM' formatına çeviriyoruz
  convertToDateTimeLocalFormat(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  createOrderAddForm() {
    this.orderAddForm = this.formbuilder.group({
      orderId: ['', Validators.required],
      customerId: ['', Validators.required],
      productId: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  

  add() {
    if (this.orderAddForm.valid) {
      const orderModel: Order = {
        ...this.orderAddForm.value,
        orderId: this.order?.orderId, // Eğer orderId yoksa undefined hatasından kaçınmak için kontrol ekledik
        status: this.order?.status ?? true, // Varsayılan değer olarak true kullanabilirsiniz
        createdDate: this.order?.createdDate ?? new Date().toISOString(), // Varsayılan değer olarak şu anki tarihi kullanabilirsiniz
        lastUpdatedDate: new Date().toISOString(),
        isDeleted: this.order?.isDeleted ?? false // Varsayılan değer olarak false kullanabilirsiniz
      };

      this.orderService.add(orderModel).subscribe(
        response => {
          console.log(response); // Düz metin yanıtı konsola yazdırılır
          this.toastrService.success(response, "Başarılı"); // Yanıt mesajını kullanarak gösterim yapılır
        },
        responseError => {
          console.log(responseError); // Hata nesnesini konsola yazdırın
          if (responseError.error && responseError.error.errors) {
            for (let i = 0; i < responseError.error.errors.length; i++) {
              this.toastrService.error(
                responseError.error.errors[i].ErrorMessage,
                "Doğrulama Hatası"
              );
            }
          } else if (responseError.error) {
            this.toastrService.error(JSON.stringify(responseError.error), "Hata");
          } else {
            this.toastrService.error("Bilinmeyen bir hata oluştu.", "Hata");
          }
        }
      );
    } else {
      this.toastrService.error("Formunuz eksik veya hatalı", "Dikkat");
    }
  }
}

