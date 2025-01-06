import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html'
})
export class ProductDeleteComponent {
  createdUserId: number; // Bu iki değişkeni burada tanımlıyoruz
  productId: number;
  
 
  constructor(
    private productService: ProductService,
    private toastrService:ToastrService) {}

  deleteProduct() {
    this.productService.deleteProduct(this.createdUserId, this.productId)
      .subscribe(response => {
          this.toastrService.success( response  ); // Show success message
      }, error => {
        this.toastrService.error( error + 'Silme hatası:'); // Show error message
      });
  }
}
