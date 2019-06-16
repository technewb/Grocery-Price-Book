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
 * @param category as number
 */
export interface IFood extends IModel {
    name: string
    category_id?: number
}

/**
 * Category Model interface extended by IModel
 * @param name as string
 */
export interface ICategory extends IModel {
    name: string
}

/**
 * Category Model interface extended by IModel
 * @param name as string
 * @param location as string
 */
export interface IStore extends IModel {
    name: string
    location: string
}

/**
 * Unit Model interface extended by IModel
 * @param name: string
 */
export interface IUnit extends IModel {
    name: string;
}

/**
 * Price Model interface extended by IModel
 */
export interface IPrice extends IModel {
    store: number;
    food: number;
    price: Number;
    on_sale: boolean;
    date: Date;
    expiration_date: Date;
    unit: number;
    amount: Number;
}