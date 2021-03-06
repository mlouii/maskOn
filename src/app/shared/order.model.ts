import {Item} from './item.model';

export class Order {
    constructor(
        public items: [Item, number][],
        public timeStamp: string,
        public totalPrice: number,
    ) {}
}
