import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { validateBody, validateParams } from "../../../middleware/validation.middleware";
import { IdParam } from "../../../types/base.dto";
import { PlayerDto } from "../../../types/dto/player.dto";
import { playerService } from "../../../services/player.service";
import { ApiError } from "../../../types/api.error";

export class PlayerController {

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const playerData = await validateBody(req, PlayerDto);
            const newPlayer = await playerService.create(playerData);
            res.status(201).json(newPlayer);
        } catch (e) {
            next(e);
        }
    }

}