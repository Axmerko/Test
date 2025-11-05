import 'reflect-metadata';
import { Request, Response } from 'express';
import { validateBody, validateParams, validateQuery } from "../../../middleware/validation.middleware";
import { IdParam, SearchQuery } from "../../../types/base.dto";
import { ItemDto } from "../../../types/dto/item.dto";
import { itemService } from "../../../services/item.service";
import { ApiError } from "../../../types/api.error";

export class ItemController {

    async getAll(req: Request, res: Response) {
        //TODO

    }

    async getById(req: Request, res: Response) {
        //TODO

    }

    async create(req: Request, res: Response) {
        //TODO

    }

    async update(req: Request, res: Response) {
        //TODO

    }

    async delete(req: Request, res: Response) {
        //TODO

    }

    async search(req: Request, res: Response) {
        //TODO
    }
}
