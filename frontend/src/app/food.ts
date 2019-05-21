import { Category } from "./category";

/**
 * Food class
 */

export class Food {
    id: number;
    name: string;
    category: Category;

    constructor(data: any) {
        Object.assign(this, data)
    }
}