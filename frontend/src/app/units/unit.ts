import { IUnit } from "../models";

/**
 * Unit class implementing interface for Store Model
 * @param id as number
 * @param name as string
 */
export class Unit implements IUnit {
    id: number
    name: string

    constructor(props: IUnit) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        })
    }
}