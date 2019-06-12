import { IStore } from "../models";

/**
 * Store class implementing interface for Store Model
 * @param id as number
 * @param name as string
 * @param location as string
 */
export class Store implements IStore {
    id: number
    name: string
    location: string

    constructor(props: IStore) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        })
    }
}