import {beforeEach, describe, expect, it} from "vitest";
import request from "../request";
import mongo from "../../src/database/mongo";

describe('Player Management', () => {
    describe('POST /players', () => {
        it('creates a new player with valid data [1pts]', async () => {
            const playerData = {
                username: 'warrior123',
                email: 'warrior@game.com',
                displayName: 'The Warrior'
            };

            const res = await request.post('/players').send(playerData);
            expect(res.status).toBe(201);
            expect(res.body.username).toBe('warrior123');
            expect(res.body.inventory).toEqual([]);
        });

        it('returns 400 for invalid email [1pts]', async () => {
            const res = await request.post('/players').send({
                username: 'warrior123',
                email: 'invalid-email',
                displayName: 'The Warrior'
            });
            expect(res.status).toBe(400);
        });

        it('returns 400 for missing username [1pts]', async () => {
            const res = await request.post('/players').send({
                email: 'warrior@game.com',
                displayName: 'The Warrior'
            });
            expect(res.status).toBe(400);
        });

        it('returns 400 for username less than 3 characters [1pts]', async () => {
            const res = await request.post('/players').send({
                username: 'ab',
                email: 'warrior@game.com',
                displayName: 'The Warrior'
            });
            expect(res.status).toBe(400);
        });
    });
});