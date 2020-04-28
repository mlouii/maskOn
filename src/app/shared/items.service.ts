import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Item} from './item.model';
import {filter, map, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class ItemsService {
    private itemsList = new BehaviorSubject<Item[]>([]);

    constructor(private http: HttpClient, private authService: AuthService) {
    }

    get items() {
        this.fetchItems();
        return this.itemsList.asObservable();
    }

    getItembyId(id: string) {
        return this.items.pipe(
            switchMap(data => data),
            filter(item => item.id === id)
        );
    }

    fetchItems() {
        const allItems = [];
        this.http.get('http://localhost:5000/items').subscribe(
            datas => {
                // @ts-ignore
                for (const data of datas) {
                    const toAdd = new Item(
                        data.modelnumber,
                        data.saleprice,
                        data.modeltype,
                        data.manufactureddate,
                        data.description,
                        data.imageUrl,
                        data.availableinventory
                    );
                    allItems.push(toAdd);
                }
                this.itemsList.next(allItems);
            }
        );
    }

    checkOutItems(cartItems: [Item, number][]) {
        const userName = this.authService.email;
        const key = (Math.floor(Math.random() * 99999) + 1).toString();
        let itemsListCopy = [...this.itemsList.getValue()];
        cartItems.map(cartItem => {
            const idx = itemsListCopy.findIndex(elem => elem.id === cartItem[0].id);
            itemsListCopy[idx].availableQuantity = itemsListCopy[idx].availableQuantity - cartItem[1];
            this.http.patch(`http://localhost:5000/items/${itemsListCopy[idx].id}`,
                {availableQuantity: itemsListCopy[idx].availableQuantity})
                .subscribe();
            this.http.post(`http://localhost:5000/${userName}/orders`, {
                orderNumber: key,
                empID: '422',
                Items: {
                    id: itemsListCopy[idx].id,
                    quantity: cartItem[1]
                },
                saleValue: itemsListCopy[idx].salePrice * cartItem[1],
                timeDate: new Date().toLocaleDateString()
            }).subscribe();
        });
        this.itemsList.next(itemsListCopy);
    }
}
