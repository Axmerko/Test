import { ObjectId } from 'mongodb';
import mongo from '../database/mongo';
import Player from '../database/models/player.model';
import { PlayerDto } from '../types/dto/player.dto';

export const playerService = {
    players_collection: mongo.db.collection("players"),

    async create(data: PlayerDto) {
        //TODO
    },

}
