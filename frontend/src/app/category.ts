/**
 * Category class
 */

export class Category {
    id: number;
    name: string;

    constructor(data: any) {
        Object.assign(this, data)
    }
}