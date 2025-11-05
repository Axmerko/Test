import { ObjectId } from 'mongodb';
import mongo from '../database/mongo';
import Item from '../database/models/item.model';
import { ItemDto } from '../types/dto/item.dto';

export const itemService = {
    items_collection: mongo.db.collection("items"),

    async getAll() {
        //TODO

    },

    async getById(id: string) {
        //TODO

    },

    async create(data: ItemDto) {
        //TODO

    },

    async update(id: string, data: ItemDto) {
        //TODO

    },

    async delete(id: string) {
        //TODO
    },

    async search(query: string) {
        //TODO
    }
}
