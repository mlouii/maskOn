import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from '../shared/cart.service';
import {Subscription} from 'rxjs';
import {Item} from '../shared/item.model';
import {Order} from '../shared/order.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit, OnDestroy {
  cartItemsSub: Subscription;
  cartOrdersSub: Subscription;
  cartItemsList: [Item, number][];
  ordersList: Order[];
  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.fetchOrders();
    this.cartItemsSub = this.cartService.cartItems.subscribe(cartItems => {
      this.cartItemsList = cartItems;
    });
    this.cartOrdersSub = this.cartService.orders.subscribe(orders => {
      this.ordersList = orders;
    });
  }

  ngOnDestroy() {
    this.cartOrdersSub.unsubscribe();
    this.cartItemsSub.unsubscribe();
  }

  checkOut() {
    this.cartService.checkOutCart();
  }

}
