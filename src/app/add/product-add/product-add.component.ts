import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ColorAddComponent } from '../color-add/color-add/color-add.component';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  productAddForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private toastrService: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.createProductAddForm();
  }

  createProductAddForm() {
    this.productAddForm = this.formBuilder.group({
      productName: ['', Validators.required],
      colorId: [0, Validators.required],
      size: ['', Validators.required]
    });
  }

  openColorDialog(): void {
    const dialogRef = this.dialog.open(ColorAddComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.id) {
        this.productAddForm.patchValue({ colorId: result.id });
      }
    });
  }

  add() {
    if (this.productAddForm.valid) {
      let productModel: Product = Object.assign({}, this.productAddForm.value);

      this.productService.add(productModel).subscribe(
        response => {
          this.toastrService.success('Ürün başarıyla eklendi.', 'Başarılı');
        },
        error => {
          this.toastrService.error('Ürün eklenirken bir hata oluştu.', 'Hata');
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik veya hatalı.', 'Dikkat');
    }
  }
}

