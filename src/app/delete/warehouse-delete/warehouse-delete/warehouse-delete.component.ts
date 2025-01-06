import { Component } from '@angular/core';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-warehouse-delete',
  templateUrl: './warehouse-delete.component.html',
  styleUrls: ['./warehouse-delete.component.css']
})
export class WarehouseDeleteComponent {
  createdUserId: number; // Bu iki değişkeni burada tanımlıyoruz
  wareHouseId: number;

  constructor(
    private warehouseService: WarehouseService,
    private toastrService:ToastrService) {}

    deleteWarehouse() {
      this.warehouseService.deleteWarehouse(this.createdUserId, this.wareHouseId)
        .subscribe(response => {
            this.toastrService.success( response  ); // Show success messag
        }, error => {
          this.toastrService.error( error + 'Silme hatası:'); // Show error message
        });
    }

}
