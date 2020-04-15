import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../shared/item.model';
import {CartService} from '../../shared/cart.service';

@Component({
    selector: 'app-cart-item',
    templateUrl: './cart-item.component.html',
    styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {

    @Input() data: [Item, number];
    currentQuantity: number;

    constructor(private cartService: CartService) {
    }

    ngOnInit() {
        this.cartService.getItemQuantity(this.data[0]).subscribe(
            data => {
                this.currentQuantity = data[1];
            }
        );
    }

    onRemove() {
        this.cartService.removeCartItem(this.data[0]);
    }

    onUpdate() {
        this.currentQuantity = Number(this.currentQuantity);
        if (isNaN(this.currentQuantity) || this.currentQuantity < 1) {
                this.currentQuantity = 1;
                return;
        }
        if (this.currentQuantity > this.data[0].availableQuantity) {
            this.currentQuantity = this.data[0].availableQuantity;
            return;
        }
        this.cartService.updateCartItemQuantity(this.data[0], this.currentQuantity);
    }

}
