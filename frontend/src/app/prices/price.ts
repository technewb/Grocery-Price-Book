import { IPrice } from '../models';

export class Price implements IPrice {
    id: number;
    store: number;
    food: number;
    price: number;
    on_sale: boolean;
    date: Date;
    expiration_date: Date;
    unit: number;
    amount: number;

    constructor(props: IPrice) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        })
    }
}