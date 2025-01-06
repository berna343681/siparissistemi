import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColorManagementComponent } from './components/color-management/color-management.component';
import { CustomerManagementComponent } from './components/customer-management/customer-management.component';
import { LoginComponent } from './components/login/login.component';
import { OrderManagementComponent } from './components/order-management/order-management.component';
import { ProductManagementComponent } from './components/product-management/product-management.component';
import { RoleManagementComponent } from './components/role-management/role-management.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { WarehouseReportComponent } from './components/warehouse-report/warehouse-report.component';
import { NaviComponent } from './components/navi/navi.component';
import { SidebarComponent } from './components/sidebar/sidebar/sidebar.component';
import { LoginGuard } from './guards/login.guard';
import { OrderReportComponent } from './components/order-report/order-report.component';
import { ProductAddComponent } from './add/product-add/product-add.component';
import { ProductDeleteComponent } from './delete/product-delete/product-delete/product-delete.component';
import { ProductUpdateComponent } from './update/product-update/product-update/product-update.component';
import { WarehouseAddComponent } from './add/warehouse-add/warehouse-add/warehouse-add.component';
import { WarehouseUpdateComponent } from './update/warehouse-update/warehouse-update/warehouse-update.component';
import { WarehouseDeleteComponent } from './delete/warehouse-delete/warehouse-delete/warehouse-delete.component';
import { CustomerAddComponent } from './add/customer-add/customer-add/customer-add.component';
import { CustomerUpdateComponent } from './update/customer-update/customer-update/customer-update.component';
import { CustomerDeleteComponent } from './delete/customer-delete/customer-delete/customer-delete.component';
import { UserAddComponent } from './add/user-add/user-add/user-add.component';
import { UserUpdateComponent } from './update/user-update/user-update/user-update.component';
import { UserDeleteComponent } from './delete/user-delete/user-delete/user-delete.component';
import { ColorAddComponent } from './add/color-add/color-add/color-add.component';
import { ColorUpdateComponent } from './update/color-update/color-update/color-update.component';
import { ColorDeleteComponent } from './delete/color-delete/color-delete/color-delete.component';
import { OrderAddComponent } from './add/order-add/order-add/order-add.component';
import { OrderUpdateComponent } from './update/order-update/order-update/order-update.component';
import { OrderDeleteComponent } from './delete/order-delete/order-delete/order-delete.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderReportAddComponent } from './add/order-report-add/order-report-add.component';
import { OrderReportDeleteComponent } from './delete/order-report-delete/order-report-delete.component';
import { OrderReportUpdateComponent } from './update/order-report-update/order-report-update.component';
import { ColorAdddComponent } from './add/color-addd/color-addd.component';


const routes: Routes = [
  { path: 'navi',component:NaviComponent },
  { path: 'sidebar',component:SidebarComponent},

  { path: 'color-managemet',component:ColorManagementComponent,canActivate: [LoginGuard] },
  { path: 'customer-management', component: CustomerManagementComponent,canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'order-management', component: OrderManagementComponent,canActivate: [LoginGuard] },
  { path: 'product-management', component: ProductManagementComponent,canActivate: [LoginGuard]},
  { path: 'role-management', component: RoleManagementComponent,canActivate: [LoginGuard]},
  { path: 'user-management', component: UserManagementComponent,canActivate: [LoginGuard]},
  { path: 'warehouse-report', component: WarehouseReportComponent,canActivate: [LoginGuard]},
  { path: 'order-report', component: OrderReportComponent,canActivate: [LoginGuard]},

  { path: 'product-add', component: ProductAddComponent,canActivate: [LoginGuard]},
  { path: 'product-delete', component: ProductDeleteComponent,canActivate: [LoginGuard]},
  { path: 'product-update', component: ProductUpdateComponent,canActivate: [LoginGuard]},

  { path: 'warehouse-add', component: WarehouseAddComponent,canActivate: [LoginGuard]},
  { path: 'warehouse-update', component: WarehouseUpdateComponent,canActivate: [LoginGuard]},
  { path: 'warehouse-delete', component: WarehouseDeleteComponent,canActivate: [LoginGuard]},

  { path: 'customer-add', component: CustomerAddComponent,canActivate: [LoginGuard]},
  { path: 'customer-update', component: CustomerUpdateComponent, canActivate: [LoginGuard] },
  { path: 'customer-delete', component: CustomerDeleteComponent,canActivate: [LoginGuard]},

  { path: 'user-add', component: UserAddComponent,canActivate: [LoginGuard]},
  { path: 'user-update', component: UserUpdateComponent,canActivate: [LoginGuard]},
  { path: 'user-delete', component: UserDeleteComponent,canActivate: [LoginGuard]},

  { path: 'color-add', component: ColorAddComponent,canActivate: [LoginGuard]},
  { path: 'color-update', component: ColorUpdateComponent,canActivate: [LoginGuard]},
  { path: 'color-delete', component: ColorDeleteComponent,canActivate: [LoginGuard]},

  { path: 'order-list', component: OrderListComponent,canActivate: [LoginGuard]},
  { path: 'order-add', component: OrderAddComponent,canActivate: [LoginGuard]},
  { path: 'order-update', component: OrderUpdateComponent,canActivate: [LoginGuard]},
  { path: 'order-delete', component: OrderDeleteComponent,canActivate: [LoginGuard]},

 
  { path: 'order-report-add', component: OrderReportAddComponent,canActivate: [LoginGuard]},
  { path: 'order-report-delete', component: OrderReportDeleteComponent,canActivate: [LoginGuard]},
  { path: 'order-report-update', component: OrderReportUpdateComponent,canActivate: [LoginGuard]},

  { path: 'color-addd', component: ColorAdddComponent,canActivate: [LoginGuard]},
  { path: 'color-update', component: ColorUpdateComponent,canActivate: [LoginGuard]},
  { path: 'color-delete', component: ColorDeleteComponent,canActivate: [LoginGuard]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
