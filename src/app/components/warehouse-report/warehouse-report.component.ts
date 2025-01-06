import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';


import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { WarehouseService } from 'src/app/services/warehouse.service';
import { ToastrService } from 'ngx-toastr';
import { Warehouse } from 'src/app/models/warehouse';



@Component({
  selector: 'app-warehouse-report',
  templateUrl: './warehouse-report.component.html',
  styleUrls: ['./warehouse-report.component.css']
})
export class WarehouseReportComponent implements OnInit {

  warehouses: MatTableDataSource<Warehouse>;
  displayedColumns: string[] = [
    'createdUserId', 'createdDate', 'lastUpdatedUserId', 
    'lastUpdatedDate', 'status', 'isDeleted', 'wareHouseId',
    'productId', 'quantity', 'isReadyForSale'
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private toastrService: ToastrService, private warehouseService: WarehouseService) {}

  ngOnInit(): void {
    this.getWarehouses();
  }

  getWarehouses() {
    this.warehouseService.getWarehouses().subscribe(
      response => {
        this.warehouses = new MatTableDataSource(response);
        this.warehouses.paginator = this.paginator;
        this.warehouses.sort = this.sort;
      },
      error => {
        console.error('Error:', error);
        this.toastrService.error('Veri yüklenemedi.');
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.warehouses.filter = filterValue.trim().toLowerCase();
  }
}
