import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-color-management',
  templateUrl: './color-management.component.html',
  styleUrls: ['./color-management.component.css']
})
export class ColorManagementComponent implements OnInit {
  
  colors:Color[]=[];
  
  constructor() {}

  ngOnInit(): void {
    
  }


}
