import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Warehouse } from 'src/app/models/warehouse';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-warehouse-add',
  templateUrl: './warehouse-add.component.html',
  styleUrls: ['./warehouse-add.component.css']
})
export class WarehouseAddComponent implements OnInit {

  warehouseAddForm: FormGroup;
  warehouse: Warehouse;

  constructor(
    private formbuilder: FormBuilder,
    private warehouseService: WarehouseService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createWarehouseAddForm();
  }

  createWarehouseAddForm() {
    this.warehouseAddForm = this.formbuilder.group({
      //wareHouseId: ['', Validators.required],
      productId: ['', Validators.required],
      quantity: ['', Validators.required],
      isReadyForSale: ['', Validators.required] // 'İ' harfi büyük olarak güncellendi
    });
  }

  add() {
    if (this.warehouseAddForm.valid) {
      const formValues = this.warehouseAddForm.value;
      console.log("Form Values:", formValues); // Form verilerini kontrol edin
  
      const warehouseModel: any = {
       // wareHouseId: formValues.wareHouseId,
        productId: formValues.productId,
        quantity: formValues.quantity,
         isReadyForSale: formValues.isReadyForSale === 'true',
        status: this.warehouse?.status ?? true,
        createdDate: this.warehouse?.createdDate ?? new Date().toISOString(),
        lastUpdatedDate: new Date().toISOString(),
        isDeleted: this.warehouse?.isDeleted ?? false
      };
  
      this.warehouseService.add(warehouseModel).subscribe(
        response => {
          console.log(response);
          this.toastrService.success(response, "Başarılı");
        },
        responseError => {
          console.log(responseError);
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
  }}
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
