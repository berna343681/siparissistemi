import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/models/cartİtem';
import { Order } from 'src/app/models/order';
//import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  cartItems:CartItem[]=[];
  constructor(private cartService:CartService, private toastrService:ToastrService){}
  ngOnInit(): void {
    this.getCart();
  }

  getCart(){
    this.cartItems= this.cartService.list();
  }

  removeFromCart(order:Order){
    this.cartService.removeFromCart(order);
    this.toastrService.error("Silindi",order.orderId + "sepetten silindi")
  }

  
}
