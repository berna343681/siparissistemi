import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {


  products: MatTableDataSource<Product>;
  displayedColumns: string[] = [
    'createdUserId', 'createdDate', 'lastUpdatedUserId', 'lastUpdatedDate',
    'status', 'isDeleted', 'productId', 'colorId', 'productName', 'size', 
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private toastrService: ToastrService, private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      response => {
        this.products = new MatTableDataSource(response);
        this.products.paginator = this.paginator;
        this.products.sort = this.sort;
      },
      error => {
        console.error('Error:', error);
        this.toastrService.error('Veri yüklenemedi.');
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.products.filter = filterValue.trim().toLowerCase();
  }
}

