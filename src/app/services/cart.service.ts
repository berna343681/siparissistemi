import { Injectable } from '@angular/core';
import { CartItems } from '../models/cartİtems';
import { CartItem } from '../models/cartİtem';
import { Order } from '../models/order';
import { environment } from 'src/environments/dev.environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  constructor(private httpClient: HttpClient) { }

  addToCart(order:Order){
    let item = CartItems.find(c=>c.order.orderId===order.orderId);
    if(item){ 
      item.quantity+=1; // sepette ürün varsa 1 arttırır.
    } 
    else{               // yoksa ekleyeceğiz
      let cartItem = new CartItem(); 
      cartItem.order = order;
      cartItem.quantity =1;
      CartItems.push(cartItem)  // js de push eklemek demek 
    }
  }

  removeFromCart(order:Order){   // sepetten silme 
    let item:CartItem = CartItems.find(c=>c.order.orderId===order.orderId); // sepette varmı diye bakacağız 
    CartItems.splice(CartItems.indexOf(item),1);   // splice belirli indexten önce kaç elemanı simek istrsen 
  }
  list():CartItem[]{
    return CartItems;
  }

  // Sipariş oluşturma fonksiyonu
  createOrder(orderData: any) {
    return this.httpClient.post(`${environment.apiUrl}Orders`, orderData);
  }
}