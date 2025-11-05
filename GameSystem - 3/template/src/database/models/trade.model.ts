import { ObjectId } from "mongodb";

export class TradeItem {
    constructor(
        public itemId: ObjectId,
        public playerItemId: ObjectId
    ) {}
}

export default class Trade {
    constructor(
        public fromPlayerId: ObjectId,
        public toPlayerId: ObjectId,
        public fromItems: TradeItem[],
        public toItems: TradeItem[],
        public status: 'pending' | 'accepted' | 'rejected' | 'cancelled' = 'accepted',
        public createdAt: Date = new Date(),
        public completedAt: Date = new Date(),
        public _id?: ObjectId
    ) {}
}
