import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  customerAddForm: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private customerService: CustomerService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createCustomerAddForm();
  }

  createCustomerAddForm() {
    this.customerAddForm = this.formbuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phoneNo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      lastUpdatedUserId: [0, Validators.required] // Ekledik
    });
  }

  add() {
    if (this.customerAddForm.valid) {
      let customerModel: Customer = Object.assign({}, this.customerAddForm.value);

      this.customerService.add(customerModel).subscribe(
        response => {
          this.toastrService.success(response, "Başarılı");
          this.customerAddForm.reset();
        },
        responseError => {
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
