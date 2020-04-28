import {Component, OnInit} from '@angular/core';
import {Item} from '../../shared/item.model';
import {ActivatedRoute} from '@angular/router';
import {NavController, ToastController} from '@ionic/angular';
import {ItemsService} from '../../shared/items.service';
import {Subscription} from 'rxjs';
import {CartService} from '../../shared/cart.service';

@Component({
    selector: 'app-item-detail',
    templateUrl: './item-detail.page.html',
    styleUrls: ['./item-detail.page.scss'],
})
export class ItemDetailPage implements OnInit {
    item: Item;
    quantity: number;
    private itemsSub: Subscription;

    constructor(private route: ActivatedRoute,
                private navCtrl: NavController,
                private itemsService: ItemsService,
                private cartService: CartService,
                private toastController: ToastController,) {}

    ngOnInit() {
        this.quantity = 1;
        this.route.paramMap.subscribe(paramMap => {
            if (!paramMap.has('itemId')) {
                this.navCtrl.navigateBack('/shop');
                return;
            }
            this.itemsSub = this.itemsService.getItembyId(paramMap.get('itemId')).subscribe(data => {
                    this.item = data;
                }
            );
        });
    }

    addToCart() {
        this.quantity = Number(this.quantity);
        if (isNaN(this.quantity) || this.quantity <= 0) {
            return;
        }
        if (this.quantity > this.item.availableQuantity) {
            return;
        }
        this.cartService.addCartItem(this.item, this.quantity);
    }




}
