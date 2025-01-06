import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ColorService } from 'src/app/services/color.service';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {
  colors: Color[] = [];

  constructor(
    private colorService: ColorService,
    public dialogRef: MatDialogRef<ColorAddComponent>
  ) {}

  ngOnInit(): void {
    this.colorService.getColors().subscribe(
      (response: Color[]) => {
        this.colors = response;
      },
      (error) => {
        console.error('Error fetching colors:', error);
      }
    );
  }

  selectColor(color: Color): void {
    // Seçilen rengin ID'sini döndürüyoruz
    this.dialogRef.close({ id: color.colorId });
  }
}

