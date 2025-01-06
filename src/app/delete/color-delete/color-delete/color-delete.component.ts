import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service'; // Renk servisinizi import edin

@Component({
  selector: 'app-color-delete',
  templateUrl: './color-delete.component.html',
  styleUrls: ['./color-delete.component.css']
})
export class ColorDeleteComponent {
  name: string; // Rengin adı

  constructor(
    private colorService: ColorService, // Renk servisinizi kullanın
    private toastrService: ToastrService
  ) {}

  deleteColor() {
    this.colorService.deleteColor(this.name)
      .subscribe(response => {
          this.toastrService.success('Renk başarıyla silindi.'); // Başarı mesajı göster
      }, error => {
        this.toastrService.error('Silme hatası: ' + error); // Hata mesajı göster
      });
  }
}
