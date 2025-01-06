import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
 
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  
  ngOnInit():void{ }

  
  userManagementCollapsed = true;
  roleManagementCollapsed = true;
  customerManagementCollapsed = true;
  productManagementCollapsed = true;
  orderManagementCollapsed = true;
  warehouseReportCollapsed = true;
  orderReportCollapsed = true;

  toggleMenu(section: string) {
    switch(section) {
      case 'userManagement':
        this.userManagementCollapsed = !this.userManagementCollapsed;
        break;
      case 'roleManagement':
        this.roleManagementCollapsed = !this.roleManagementCollapsed;
        break;
      case 'customerManagement':
        this.customerManagementCollapsed = !this.customerManagementCollapsed;
        break;
      case 'productManagement':
        this.productManagementCollapsed = !this.productManagementCollapsed;
        break;
      case 'orderManagement':
        this.orderManagementCollapsed = !this.orderManagementCollapsed;
        break;
      case 'warehouseReport':
        this.warehouseReportCollapsed = !this.warehouseReportCollapsed;
        break;
      case 'orderReport':
        this.orderReportCollapsed = !this.orderReportCollapsed;
        break;
    }
  }
}
