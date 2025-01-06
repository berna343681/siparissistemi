import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
})
export class ProductUpdateComponent implements OnInit {
  product: Product;
  productUpdateForm: FormGroup;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private formbuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.createProductUpdateForm();

    // Eğer URL'den orderId çekmeye çalışmıyorsanız bu kısmı kaldırabilirsiniz.
    // Siparişi API'den direkt alıyoruz.
    this.loadProductData();
  }

  createProductUpdateForm() {
    this.productUpdateForm = this.formbuilder.group({
      productId: ['', Validators.required],
      createdUserId: ['', Validators.required],
      productName: ['', Validators.required],
      colorId: ['', Validators.required],
      size: ['', Validators.required],
    });
  }
  loadProductData() {
    // Order verisini API'den alıyoruz. Burada orderId parametresi olmadan çalıştırıyoruz.
    this.productService.getProducts().subscribe(
      (response: Product[]) => {
        if (response && response.length > 0) {
          // İlk siparişi aldığınızı varsayıyoruz.
          this.product = response[0]; 
          this.productUpdateForm.patchValue(this.product);
        } else {
          console.error('Product not found!');
          this.toastr.error('Product not found!', 'Error');
        }
      },
      error => {
        console.error('Error fetching product:', error);
        this.toastr.error('Error fetching product data.', 'Error');
      }
    );
  }


  updateProduct() {
    if (this.productUpdateForm.valid) {
      const productModel = {
        ...this.productUpdateForm.value,
        productId: this.product?.productId, // Eğer orderId yoksa undefined hatasından kaçınmak için kontrol ekledik
        status: this.product.status,
        createdDate: this.product.createdDate,
        lastUpdatedDate: new Date(),
        isDeleted: this.product.isDeleted
      };

      this.productService.updateProduct(productModel).subscribe(
        response => {
          this.toastr.success('Product updated successfully!', 'Success');
        },
        error => {
          console.error('Error updating product:', error);
          this.toastr.error('Error updating product.', 'Error');
        }
      );
    }
  }
}
