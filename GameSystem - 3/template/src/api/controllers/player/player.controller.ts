import 'reflect-metadata';
import { Request, Response } from 'express';
import { validateBody, validateParams } from "../../../middleware/validation.middleware";
import { IdParam } from "../../../types/base.dto";
import { PlayerDto } from "../../../types/dto/player.dto";
import { playerService } from "../../../services/player.service";
import { ApiError } from "../../../types/api.error";

export class PlayerController {

    async create(req: Request, res: Response) {
        //TODO

    }


}
