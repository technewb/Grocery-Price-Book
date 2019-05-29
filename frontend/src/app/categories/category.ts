import { ICategory } from '../models';

/**
 * Category class implmenting interface for Category Model
 * @param id as number 
 * @param name as string
 */
export class Category implements ICategory {
    id: number
    name: string

    constructor(props: ICategory) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        })
    }
}