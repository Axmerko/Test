import { ObjectId } from 'mongodb';
import mongo from '../database/mongo';
import Trade, { TradeItem } from '../database/models/trade.model';
import { TradeDto } from '../types/dto/trade.dto';
import { ApiError } from '../types/api.error';

export const tradeService = {
    trades_collection: mongo.db.collection("trades"),
    players_collection: mongo.db.collection("players"),
    items_collection: mongo.db.collection("items"),

    async create(data: TradeDto) {
        //TODO
    },

}
