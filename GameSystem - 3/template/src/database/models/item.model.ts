import { ObjectId } from "mongodb";

export default class Item {
    constructor(
        public name: string,
        public description: string,
        public rarity: 'common' | 'rare' | 'epic' | 'legendary',
        public value: number,
        public tradeable: boolean,
        public createdAt: Date = new Date(),
        public _id?: ObjectId
    ) {}
}
