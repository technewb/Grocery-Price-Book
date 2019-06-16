import { IPrice } from '../models';

export class Price implements IPrice {
    id: number;
    store: number;
    food: number;
    price: Number;
    on_sale: boolean;
    date: Date;
    expiration_date: Date;
    unit: number;
    amount: Number;

    constructor(props: IPrice) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        })
    }
}