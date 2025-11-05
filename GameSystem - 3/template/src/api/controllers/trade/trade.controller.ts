import 'reflect-metadata';
import { Request, Response } from 'express';
import { validateBody, validateParams } from "../../../middleware/validation.middleware";
import { IdParam } from "../../../types/base.dto";
import { TradeDto } from "../../../types/dto/trade.dto";
import { tradeService } from "../../../services/trade.service";
import { ApiError } from "../../../types/api.error";

export class TradeController {

    async create(req: Request, res: Response) {
        //TODO

    }

}
