export class OrderData {
    constructor(
        public orderNumber: string,
        public customerId: string,
        public modelNumber: string,
        public saleValue: number,
        public date: string,
        public quantity: number
    ) {}
}
