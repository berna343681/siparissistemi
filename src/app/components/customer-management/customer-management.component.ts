import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.css']
})
export class CustomerManagementComponent implements OnInit,AfterViewInit{
  customers:Customer[] =[];
  dataLoaded = false;
  displayedColumns: string[] = [
    'createdUserId', 'createdDate', 'lastUpdatedUserId', 'lastUpdatedDate','status', 'isDeleted', 'customerId', 'name', 'address', 'phoneNo', 'email'
  ];
  dataSource = new MatTableDataSource<Customer>(this.customers);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private toastrService:ToastrService, 
    private customerService: CustomerService ) {}

  ngOnInit(): void {
    this.getCustomers()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getCustomers() {

    this.customerService.getCustomers().subscribe(
      response => {
        console.log('Response Data:', response); // Burada kontrol edin
        this.customers = response; 
        this.dataSource.data = this.customers;
        this.dataLoaded = true;
      },
      error => {
        console.error('Error:', error);
        this.toastrService.error('Veri yüklenemedi.');
      }
    );
  }
}
