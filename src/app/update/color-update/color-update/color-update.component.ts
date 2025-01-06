import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ColorService } from 'src/app/services/color.service';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
  colorUpdateForm: FormGroup;
  color: Color;

  constructor(
    private colorService: ColorService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.createColorUpdateForm();
    const colorId = +this.route.snapshot.paramMap.get('id');
    this.colorService.getColorById(colorId).subscribe(response => {
      if (response) {
        this.color = response;
        this.colorUpdateForm.patchValue(this.color);
      } else {
        console.error('Color not found!');
      }
    }, error => {
      console.error('Error fetching color:', error);
    });
  }

  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      colorId: ['', Validators.required],
      name: ['', Validators.required],
      
    });
  }

  updateColor() {
    if (this.colorUpdateForm.valid) {
      const colorModel = { ...this.colorUpdateForm.value };
      this.colorService.updateColor(colorModel).subscribe(response => {
        this.toastr.success('Color updated successfully!', 'Success'); // Başarı mesajı
        console.log('Color updated successfully:', response);
      }, error => {
        this.toastr.error('Error updating color. Please try again later.', 'Error'); // Hata mesajı
        console.error('Error updating color:', error);
      });
    }
  }
}
