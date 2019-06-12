import { IFood } from '../models';

/**
 * Food class implmenting interface for Food Model
 * @param id as number
 * @param name as string
 * @param category as number
 */
export class Food implements IFood {
    id: number
    name: string
    category_id: number

    constructor(props: IFood) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        })
    }
}