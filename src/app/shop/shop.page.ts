import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ItemsService} from '../shared/items.service';
import {Item} from '../shared/item.model';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.page.html',
    styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {

    itemsSub: Subscription;
    loadedItems: Item[];

    constructor(private itemsService: ItemsService) {
    }

    ngOnInit() {
        this.itemsSub = this.itemsService.items.subscribe(items => {
                this.loadedItems = items;
            }
        );
    }


}
