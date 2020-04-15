import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Item} from './item.model';
import {filter, map, switchMap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ItemsService {
    private itemsList = new BehaviorSubject<Item[]>([
        new Item(
            '1',
            2.00,
            'Regular Mask',
            new Date(),
            'Plain old ordinary mask. Keeps the germs in, but not out',
            '../../../assets/basicMask.jpg',
            5
        ),
        new Item(
            '2',
            5.00,
            'Advanced Mask',
            new Date(),
            'Keeps everything out. Pollen, bacteria, viruses, you name it. However, not very easy to breathe in.',
            '../../../assets/p95mask.jpg',
            5
        ),
        new Item(
            '3',
            25.00,
            'Gas Mask',
            new Date(),
            'Stuck in a place thats trying to take your life? We got you covered for that',
            '../../../assets/gasMask.jpg',
            5
        ),
        new Item(
            '4',
            1.00,
            'Cloth Mask',
            new Date(),
            'Not exactly effective, but its cheap',
            '../../../assets/clothMask.jpeg',
            5
        ),
        new Item(
            '5',
            3.00,
            'Cat Mask',
            new Date(),
            'Chotto Matte! No way can a face mask be this damn cute',
            '../../../assets/catMask.jpg',
            5
        ),
        new Item(
            '6',
            3.00,
            'Pizza Mask',
            new Date(),
            'Oh no! It looks like the cat is already eating the pizza inside. You gotta buy this quick then',
            '../../../assets/pizzaCatMask.jpg',
            5
        )
    ]);

    constructor() {
    }

    get items() {
        return this.itemsList.asObservable();
    }

    getItembyId(id: string) {
        return this.items.pipe(
            switchMap(data => data),
            filter(item => item.id === id)
        );
    }

    checkOutItems(cartItems: [Item, number][]) {
        console.log('I\'m running!');
        let itemsListCopy = [...this.itemsList.getValue()];
        cartItems.map(cartItem => {
            const idx = itemsListCopy.findIndex(elem => elem.id === cartItem[0].id);
            itemsListCopy[idx].availableQuantity = itemsListCopy[idx].availableQuantity - cartItem[1];
        });
        this.itemsList.next(itemsListCopy);
    }
}
