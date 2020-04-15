import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../shared/item.model';
import {Router} from '@angular/router';

@Component({
    selector: 'app-item-tile',
    templateUrl: './item-tile.component.html',
    styleUrls: ['./item-tile.component.scss'],
})
export class ItemTileComponent implements OnInit {
    @Input() item: Item;

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    onClicked(itemId: string) {
        this.router.navigate(['/', 'shop', 'detail', itemId]);
    }

}
