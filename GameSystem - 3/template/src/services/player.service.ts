import { ObjectId } from 'mongodb';
import mongo from '../database/mongo';
import Player from '../database/models/player.model';
import { PlayerDto } from '../types/dto/player.dto';

export const playerService = {
    players_collection: mongo.db!.collection<Player>("players"),

    async create(data: PlayerDto) {
        const newPlayer = new Player(
            data.username,
            data.email,
            data.displayName,
            [], // default inventory
            50, // default maxInventorySize
            [], // default trades
            new Date()
        );

        const result = await this.players_collection.insertOne(newPlayer);
        return { ...newPlayer, _id: result.insertedId };
    },

}