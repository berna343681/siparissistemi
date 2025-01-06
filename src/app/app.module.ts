import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColorManagementComponent } from './components/color-management/color-management.component';
import { CustomerManagementComponent } from './components/customer-management/customer-management.component';
import { LoginComponent } from './components/login/login.component';
import { OrderManagementComponent } from './components/order-management/order-management.component';
import { OrderReportComponent } from './components/order-report/order-report.component';
import { ProductManagementComponent } from './components/product-management/product-management.component';
import { RoleManagementComponent } from './components/role-management/role-management.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { WarehouseReportComponent } from './components/warehouse-report/warehouse-report.component';
import { NaviComponent } from './components/navi/navi.component';
import { SidebarComponent } from './components/sidebar/sidebar/sidebar.component';
import {  HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptors/auth.interceptors';
import { ToastrModule} from "ngx-toastr";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';  
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductAddComponent } from './add/product-add/product-add.component';
import { ProductDeleteComponent } from './delete/product-delete/product-delete/product-delete.component';
import { ProductUpdateComponent } from './update/product-update/product-update/product-update.component';
import { WarehouseAddComponent } from './add/warehouse-add/warehouse-add/warehouse-add.component';
import { WarehouseDeleteComponent } from './delete/warehouse-delete/warehouse-delete/warehouse-delete.component';
import { WarehouseUpdateComponent } from './update/warehouse-update/warehouse-update/warehouse-update.component';
import { CustomerAddComponent } from './add/customer-add/customer-add/customer-add.component';
import { CustomerDeleteComponent } from './delete/customer-delete/customer-delete/customer-delete.component';
import { CustomerUpdateComponent } from './update/customer-update/customer-update/customer-update.component';
import { UserAddComponent } from './add/user-add/user-add/user-add.component';
import { UserDeleteComponent } from './delete/user-delete/user-delete/user-delete.component';
import { UserUpdateComponent } from './update/user-update/user-update/user-update.component';
import { OrderAddComponent } from './add/order-add/order-add/order-add.component';
import { ColorAddComponent } from './add/color-add/color-add/color-add.component';
import { ColorUpdateComponent } from './update/color-update/color-update/color-update.component';
import { OrderUpdateComponent } from './update/order-update/order-update/order-update.component';
import { ColorDeleteComponent } from './delete/color-delete/color-delete/color-delete.component';
import { OrderDeleteComponent } from './delete/order-delete/order-delete/order-delete.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderReportAddComponent } from './add/order-report-add/order-report-add.component';
import { OrderReportDeleteComponent } from './delete/order-report-delete/order-report-delete.component';
import { OrderReportUpdateComponent } from './update/order-report-update/order-report-update.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { ColorAdddComponent } from './add/color-addd/color-addd.component'; // Import edin



@NgModule({ 
  declarations: [   // bizim yazdıklarımız buraya 
    AppComponent,
    ColorManagementComponent,
    CustomerManagementComponent,
    LoginComponent,
    OrderManagementComponent,
    OrderReportComponent,
    ProductManagementComponent,
    RoleManagementComponent,
    UserManagementComponent,
    WarehouseReportComponent,
    NaviComponent,  
    SidebarComponent,
     CartSummaryComponent, 
     ProductAddComponent,
     ProductDeleteComponent,
     ProductUpdateComponent,
     WarehouseAddComponent,
     WarehouseDeleteComponent,
     WarehouseUpdateComponent,
     CustomerAddComponent,
     CustomerDeleteComponent,
     CustomerUpdateComponent,
     UserAddComponent,
     UserDeleteComponent,
     UserUpdateComponent,
     OrderAddComponent,
     ColorAddComponent,
     ColorUpdateComponent,
     OrderUpdateComponent,
     ColorDeleteComponent,
     OrderDeleteComponent,
     OrderListComponent,
     OrderReportAddComponent,
     OrderReportDeleteComponent,
     OrderReportUpdateComponent,
     ColorAdddComponent
    
  ],
  imports: [ // dışarıdan gelenler buraya 
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatListModule, 
    MatIconModule,// Buraya ekleyin
    
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    NgbModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
