/**
 * Main model interface for accessing data in database
 * @param id as number
 */
interface IModel {
    id: number
}

/**
 * Food Model interface extended by IModel
 * @param name as string
 * @param category as Category class
 */
export interface IFood extends IModel {
    name: string
    category?: Category
}

/**
 * Category Model interface extended by IModel
 * @param name as string
 */
export interface ICategory extends IModel {
    name: string
}

/**
 * Food class implmenting interface for Food Model
 * @param id as number
 * @param name as string
 * @param category as Category
 */
export class Food implements IFood {
    id: number
    name: string
    category: Category

    constructor(props: IFood) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        })
    }
}

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