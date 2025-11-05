import { ObjectId } from "mongodb";

export class PlayerItem {
    constructor(
        public _id: ObjectId,
        public itemId: ObjectId,
        public acquiredAt: Date,
        public bound: boolean
    ) {}
}

export default class Player {
    constructor(
        public username: string,
        public email: string,
        public displayName: string,
        public inventory: PlayerItem[] = [],
        public maxInventorySize: number = 50,
        public trades: ObjectId[] = [],
        public createdAt: Date = new Date(),
        public _id?: ObjectId
    ) {}
}
