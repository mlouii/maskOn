export class Item {
    constructor(
        public id: string,
        public salePrice: number,
        public modelType: string,
        public manufacturedDate: string,
        public description: string,
        public image: string,
        public availableQuantity: number,
    ) {}
}
