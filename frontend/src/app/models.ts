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