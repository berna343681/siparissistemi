import { Component } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-delete',
  templateUrl: './customer-delete.component.html',
  styleUrls: ['./customer-delete.component.css']
})
export class CustomerDeleteComponent {
  createdUserId:number;
  customerId:number;

  constructor(
    private customerService: CustomerService,
    private toastrService:ToastrService) {}

  deleteCustomer() {
    this.customerService.deleteCustomer(this.createdUserId, this.customerId)
      .subscribe(response => {
          this.toastrService.success( response  ); // Show success message
      }, error => {
        this.toastrService.error( error + 'Silme hatası:'); // Show error message
      });
  }
}



























