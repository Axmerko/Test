import { ObjectId } from 'mongodb';
import mongo from '../database/mongo';
import Item from '../database/models/item.model';
import { ItemDto } from '../types/dto/item.dto';
import { ApiError } from '../types/api.error';

export const itemService = {
    items_collection: mongo.db!.collection<Item>("items"),

    async getAll() {
        return await this.items_collection.find().toArray();
    },

    async getById(id: string) {
        if (!ObjectId.isValid(id)) {
            throw new ApiError('Invalid ID', 'Invalid ID format', 400);
        }
        const item = await this.items_collection.findOne({ _id: new ObjectId(id) });
        if (!item) {
            throw new ApiError('Not Found', 'Item not found', 404);
        }
        return item;
    },

    async create(data: ItemDto) {
        const newItem = new Item(
            data.name,
            data.description,
            data.rarity,
            data.value,
            data.tradeable,
            new Date()
        );
        const result = await this.items_collection.insertOne(newItem);
        return { ...newItem, _id: result.insertedId };
    },

    async update(id: string, data: ItemDto) {
        if (!ObjectId.isValid(id)) {
            throw new ApiError('Invalid ID', 'Invalid ID format', 400);
        }
        const result = await this.items_collection.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: data },
            { returnDocument: 'after' }
        );

        if (!result) {
            throw new ApiError('Not Found', 'Item not found', 404);
        }
        return result;
    },

    async delete(id: string) {
        if (!ObjectId.isValid(id)) {
            throw new ApiError('Invalid ID', 'Invalid ID format', 400);
        }
        const result = await this.items_collection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            throw new ApiError('Not Found', 'Item not found', 404);
        }
    },

    async search(query: string) {
        // Vyhledávání case-insensitive
        const regex = new RegExp(query, 'i');
        const items = await this.items_collection.find({
            $or: [
                { name: regex },
                { description: regex },
                { rarity: regex }
            ]
        }).toArray();
        return items;
    }
}