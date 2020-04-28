import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Item} from './item.model';
import {Order} from './order.model';
import {filter, switchMap, take} from 'rxjs/operators';
import {ItemsService} from './items.service';
import {ToastController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})

export class CartService {
    private cartItemsList = new BehaviorSubject<[Item, number][]>([]);
    private ordersList = new BehaviorSubject<Order[]>([]);

    constructor(private itemsService: ItemsService, private toastController: ToastController, private http: HttpClient, private authService: AuthService) {
    }

    get cartItems() {
        return this.cartItemsList.asObservable();
    }

    get orders() {
        return this.ordersList.asObservable();
    }

    fetchOrders() {
        console.log('fetching!!');
        const newOrdersList = [];
        this.http.get(`http://localhost:5000/${this.authService.email}/orders`).subscribe(
            data => {
                const keys = data.map(order => order.pertainingTo).filter((elem, index, self) => {
                    return index === self.indexOf(elem);
                });
                for (const key of keys) {
                    const relData = data.filter(order => order.pertainingTo === key);
                    const itemList = [];
                    let totalPrice = 0;
                    for (const ord of relData) {
                        let thisItem: Item;
                        this.itemsService.getItembyId(ord.modelnumber.toString()).subscribe(item => thisItem = item);
                        itemList.push([thisItem, ord.quantity]);
                        totalPrice += (ord.salevalue);
                    }
                    const newOrder = new Order(itemList, relData[0].timedate, totalPrice);
                    newOrdersList.push(newOrder);
                }
                this.ordersList.next(newOrdersList);
            }
        );
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
        if (this.cartItemsList.value.length < 1) {
            return;
        }
        this.itemsService.checkOutItems(this.cartItemsList.getValue());
        this.cartItemsList.next([]);
        this.fetchOrders();
    }

    totalCartCost() {
        let total = 0;
        this.cartItemsList.value.forEach(cartItem => {
            total = total + (cartItem[0].salePrice * cartItem[1]);
        });
        return total;
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
