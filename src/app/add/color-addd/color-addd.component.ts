import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-addd',
  templateUrl: './color-addd.component.html',
  styleUrls: ['./color-addd.component.css']
})
export class ColorAdddComponent implements OnInit {

  colorAdddForm: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private colorService: ColorService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createColorAdddForm();
  }

  createColorAdddForm() {
    this.colorAdddForm = this.formbuilder.group({
      name: ['', Validators.required],
      lastUpdatedUserId: [0, Validators.required] // Ekledik
    });
  }

  add() {
    if (this.colorAdddForm.valid) {
      let colorModel: Color = Object.assign({}, this.colorAdddForm.value);

      this.colorService.add(colorModel).subscribe(
        response => {
          this.toastrService.success(response, "Başarılı");
          this.colorAdddForm.reset();
        },
        responseError => {
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
  }

}
