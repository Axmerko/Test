import 'reflect-metadata';
import {server} from './api/server';
import mongo from "./database/mongo";
import {Config} from "../config";

const port = Config.port || 3000

async function init() {
    await mongo.connect()

    server.listen(port, () => {
        console.log(`Listening on http://localhost:${port}`)
    })
}

init()
