import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { validateBody, validateParams } from "../../../middleware/validation.middleware";
import { IdParam } from "../../../types/base.dto";
import { TradeDto } from "../../../types/dto/trade.dto";
import { tradeService } from "../../../services/trade.service";
import { ApiError } from "../../../types/api.error";

export class TradeController {

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const tradeData = await validateBody(req, TradeDto);
            const newTrade = await tradeService.create(tradeData);
            res.status(201).json(newTrade);
        } catch (e) {
            next(e);
        }
    }

}