import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Item} from './item.model';
import {Order} from './order.model';
import {filter, switchMap, take} from 'rxjs/operators';
import {ItemsService} from './items.service';
import {ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})

export class CartService {
    private cartItemsList = new BehaviorSubject<[Item, number][]>([[new Item(
        '5',
        3.00,
        'Cat Mask',
        new Date(),
        'Chotto Matte! No way can a face mask be this damn cute',
        '../../../assets/catMask.jpg',
        5
    ), 3]]);
    private ordersList = new BehaviorSubject<Order[]>([]);

    constructor(private itemsService: ItemsService, private toastController: ToastController) {
    }

    get cartItems() {
        return this.cartItemsList.asObservable();
    }

    get orders() {
        return this.ordersList.asObservable();
    }

    addCartItem(toAdd: Item, quantity: number) {
        this.cartItems.pipe(take(1)).subscribe(
            (cartItemData: [Item, number][]) => {
                let didChange = false;
                let isSuccess = false;
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < cartItemData.length; i++) {
                    if (cartItemData[i][0].id === toAdd.id) {
                        didChange = true;
                        if (cartItemData[i][0].availableQuantity >= cartItemData[i][1] + quantity) {
                            cartItemData[i][1] = cartItemData[i][1] + quantity;
                            isSuccess = true;
                        } else {
                            this.presentToast('Already hit max quantity!');
                        }
                    }
                }
                if (!didChange && toAdd.availableQuantity >= quantity) {
                    cartItemData.push([toAdd, quantity]);
                    isSuccess = true;
                } else {
                    this.presentToast('Already hit max quantity!');
                }
                this.cartItemsList.next(cartItemData);
                if (isSuccess) {
                    this.presentToast(`${toAdd.modelType} has been added to the cart`);
                }
            }
        );
    }

    removeCartItem(toRemove: Item) {
        this.cartItems.pipe(take(1)).subscribe(
            (cartItemData: [Item, number][]) => {
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < cartItemData.length; i++) {
                    if (cartItemData[i][0].id === toRemove.id) {
                        cartItemData.splice(i, 1);
                    }
                }
                this.cartItemsList.next(cartItemData);
            }
        );
    }

    updateCartItemQuantity(toChange: Item, newQuantity: number) {
        this.cartItems.pipe(take(1)).subscribe(
            (cartItemData: [Item, number][]) => {
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < cartItemData.length; i++) {
                    if (cartItemData[i][0].id === toChange.id) {
                        cartItemData[i][1] = newQuantity;
                    }
                }
                this.cartItemsList.next(cartItemData);
            }
        );
    }

    checkOutCart() {
        this.itemsService.checkOutItems(this.cartItemsList.getValue());
        this.cartItemsList.next([]);
    }

    getItemQuantity(toGet: Item) {
        return this.cartItems.pipe(
            switchMap(data => data),
            filter(item => item[0].id === toGet.id)
        );
    }

    async presentToast(message: string) {
        const toast = await this.toastController.create({
            message,
            duration: 2000,
        });
        toast.present();
    }


}
