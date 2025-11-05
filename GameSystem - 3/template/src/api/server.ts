import { PlayerController } from "./controllers/player/player.controller";
import { ItemController } from "./controllers/item/item.controller";
import { TradeController } from "./controllers/trade/trade.controller";
import { apiErrorHandler } from "../middleware/error.middleware";
import express = require('express');

export const server = express()

server.use(express.json());
server.use(express.urlencoded({ extended: true }))

// Players
const playerController = new PlayerController();
server.post('/players', playerController.create)

// Items
const itemController = new ItemController();
server.get('/items', itemController.getAll)
server.get('/items/search', itemController.search)
server.get('/items/:id', itemController.getById)
server.post('/items', itemController.create)
server.put('/items/:id', itemController.update)
server.delete('/items/:id', itemController.delete)

// Trades
const tradeController = new TradeController();
server.post('/trades', tradeController.create)

server.use(apiErrorHandler)
