import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { validateBody, validateParams, validateQuery } from "../../../middleware/validation.middleware";
import { IdParam, SearchQuery } from "../../../types/base.dto";
import { ItemDto } from "../../../types/dto/item.dto";
import { itemService } from "../../../services/item.service";
import { ApiError } from "../../../types/api.error";

export class ItemController {

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const items = await itemService.getAll();
            res.status(200).json(items);
        } catch (e) {
            next(e);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = await validateParams(req, IdParam);
            const item = await itemService.getById(id!);
            res.status(200).json(item);
        } catch (e) {
            next(e);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const itemData = await validateBody(req, ItemDto);
            const newItem = await itemService.create(itemData);
            res.status(201).json(newItem);
        } catch (e) {
            next(e);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = await validateParams(req, IdParam);
            const itemData = await validateBody(req, ItemDto);
            const updatedItem = await itemService.update(id!, itemData);
            res.status(200).json(updatedItem);
        } catch (e) {
            next(e);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = await validateParams(req, IdParam);
            await itemService.delete(id!);
            res.status(204).send();
        } catch (e) {
            next(e);
        }
    }

    async search(req: Request, res: Response, next: NextFunction) {
        try {
            const { query } = await validateQuery(req, SearchQuery);
            const items = await itemService.search(query!);
            res.status(200).json(items);
        } catch (e) {
            next(e);
        }
    }
}