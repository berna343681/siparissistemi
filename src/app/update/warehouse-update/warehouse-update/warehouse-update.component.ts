import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Warehouse } from 'src/app/models/warehouse';
import { WarehouseService } from 'src/app/services/warehouse.service';


@Component({
  selector: 'app-warehouse-update',
  templateUrl: './warehouse-update.component.html',
  styleUrls: ['./warehouse-update.component.css']
})
export class WarehouseUpdateComponent implements OnInit {
 
  warehouse:Warehouse;
  warehouseUpdateForm: FormGroup;


  constructor(
    private warehouseService: WarehouseService,
    private route: ActivatedRoute,
    private formbuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.createWarehouseUpdateForm();

    // Eğer URL'den orderId çekmeye çalışmıyorsanız bu kısmı kaldırabilirsiniz.
    // Siparişi API'den direkt alıyoruz.
    this.loadWarehouseData();
  }

  createWarehouseUpdateForm() {
    this.warehouseUpdateForm = this.formbuilder.group({
      createdUserId: ['', Validators.required],
      lastUpdatedUserId: ['', Validators.required],
      wareHouseId: ['', Validators.required],
      productId: ['', Validators.required],
      quantity: ['', Validators.required],
      IsReadyForSale: [false, Validators.required],  // Boolean başlangıç değeri
    });
  }
  

    loadWarehouseData() {
      // Order verisini API'den alıyoruz. Burada orderId parametresi olmadan çalıştırıyoruz.
      this.warehouseService.getWarehouses().subscribe(
        (response: Warehouse[]) => {
          if (response && response.length > 0) {
            // İlk siparişi aldığınızı varsayıyoruz.
            this.warehouse = response[0]; 
            this.warehouseUpdateForm.patchValue(this.warehouse);
          } else {
            console.error('Warehouse not found!');
            this.toastr.error('Warehouse not found!', 'Error');
          }
        },
        error => {
          console.error('Error fetching Warehouse:', error);
          this.toastr.error('Error fetching order data.', 'Error');
        }
      );
    }


    updateWarehouse() {
      if (this.warehouseUpdateForm.valid) {
        const formValues = this.warehouseUpdateForm.value;
    
        const warehouseModel = {
          ...formValues,
          isReadyForSale: formValues.IsReadyForSale === 'true' || formValues.IsReadyForSale === true, // Boolean dönüşüm sağlanıyor
          wareHouseId: this.warehouse?.wareHouseId,
          status: this.warehouse.status,
          createdDate: this.warehouse.createdDate,
          lastUpdatedDate: new Date().toISOString(),
          isDeleted: this.warehouse.isDeleted
        };
    
        this.warehouseService.updateWarehouse(warehouseModel).subscribe(
          response => {
            this.toastr.success('Warehouse updated successfully!', 'Success');
          },
          error => {
            console.error('Error updating warehouse:', error);
            this.toastr.error('Error updating warehouse.', 'Error');
          }
        );
      } else {
        this.toastr.error('Formunuz eksik veya hatalı', 'Dikkat');
      }
    }
    
    
  }    
