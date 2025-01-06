import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit {
  customerUpdateForm: FormGroup;
  customer: Customer;

  constructor(private customerService: CustomerService,private route: ActivatedRoute,private router: Router,private formBuilder: FormBuilder,private toastr: ToastrService) {}

  ngOnInit() {
    this.createCustomerUpdateForm();
    const customerId = +this.route.snapshot.paramMap.get('id');
    this.customerService.getCustomerById(customerId).subscribe(response => {
      if (response) {
        this.customer = response;
        this.customerUpdateForm.patchValue(this.customer);
      } else {
        console.error('customer not found!');
      }
    }, error => {
      console.error('Error fetching customer:', error);
    });
  }
  

  createCustomerUpdateForm() {
    this.customerUpdateForm = this.formBuilder.group({
      customerId: ['', Validators.required],  
      name: ['', Validators.required],  
      address: ['', Validators.required],
      phoneNo: ['', Validators.required],
      email: ['', Validators.required],
    
    });
  }
  
  updateCustomer() {
    if (this.customerUpdateForm.valid) {
      const customerModel = { ...this.customerUpdateForm.value };
      this.customerService.updateCustomer(customerModel).subscribe(response => {
        this.toastr.success('Customer updated successfully!', 'Success'); // Success mesajı
        console.log('Customer updated successfully:', response);
      }, error => {
        this.toastr.error('Error updating user. Please try again later.', 'Error'); // Error mesajı
        console.error('Error updating user:', error);
      });
    }
  }
}
  
  

