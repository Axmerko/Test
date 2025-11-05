import { beforeEach, describe, expect, it } from "vitest";
import request from "../request";
import { ObjectId } from "mongodb";
import mongo from "../../src/database/mongo";

describe("Trade System", () => {
    beforeEach(async () => {
        // Create players
        await mongo.db!.collection("players").insertMany([
            {
                _id: new ObjectId("507f1f77bcf86cd799439011"),
                username: "player1",
                email: "player1@game.com",
                displayName: "Player One",
                inventory: [
                    {
                        _id: new ObjectId("607f1f77bcf86cd799439101"),
                        itemId: new ObjectId("507f1f77bcf86cd799439021"),
                        acquiredAt: new Date(),
                        bound: false,
                    },
                    {
                        _id: new ObjectId("607f1f77bcf86cd799439102"),
                        itemId: new ObjectId("507f1f77bcf86cd799439022"),
                        acquiredAt: new Date(),
                        bound: true,
                    },
                    {
                        _id: new ObjectId("607f1f77bcf86cd799439103"),
                        itemId: new ObjectId("507f1f77bcf86cd799439023"),
                        acquiredAt: new Date(),
                        bound: false,
                    },
                ],
                maxInventorySize: 50,
                trades: [],
                createdAt: new Date(),
            },
            {
                _id: new ObjectId("507f1f77bcf86cd799439012"),
                username: "player2",
                email: "player2@game.com",
                displayName: "Player Two",
                inventory: [
                    {
                        _id: new ObjectId("607f1f77bcf86cd799439201"),
                        itemId: new ObjectId("507f1f77bcf86cd799439024"),
                        acquiredAt: new Date(),
                        bound: false,
                    },
                    {
                        _id: new ObjectId("607f1f77bcf86cd799439202"),
                        itemId: new ObjectId("507f1f77bcf86cd799439025"),
                        acquiredAt: new Date(),
                        bound: false,
                    },
                ],
                maxInventorySize: 50,
                trades: [],
                createdAt: new Date(),
            },
            {
                _id: new ObjectId("507f1f77bcf86cd799439013"),
                username: "player3",
                email: "player3@game.com",
                displayName: "Player Three",
                inventory: [],
                maxInventorySize: 2,
                trades: [],
                createdAt: new Date(),
            },
        ]);

        // Create items
        await mongo.db!.collection("items").insertMany([
            {
                _id: new ObjectId("507f1f77bcf86cd799439021"),
                name: "Fire Sword",
                description: "A sword engulfed in flames",
                rarity: "epic",
                value: 500,
                tradeable: true,
                createdAt: new Date(),
            },
            {
                _id: new ObjectId("507f1f77bcf86cd799439022"),
                name: "Soul-Bound Ring",
                description: "A ring bound to the player's soul",
                rarity: "legendary",
                value: 1000,
                tradeable: true,
                createdAt: new Date(),
            },
            {
                _id: new ObjectId("507f1f77bcf86cd799439023"),
                name: "Health Potion",
                description: "Restores health",
                rarity: "common",
                value: 10,
                tradeable: true,
                createdAt: new Date(),
            },
            {
                _id: new ObjectId("507f1f77bcf86cd799439024"),
                name: "Magic Staff",
                description: "A powerful magical staff",
                rarity: "rare",
                value: 300,
                tradeable: true,
                createdAt: new Date(),
            },
            {
                _id: new ObjectId("507f1f77bcf86cd799439025"),
                name: "Quest Item",
                description: "Cannot be traded",
                rarity: "rare",
                value: 0,
                tradeable: false,
                createdAt: new Date(),
            },
        ]);
    });

    describe("POST /trades", () => {
        it("successfully creates a trade with valid items [2pts]", async () => {
            const tradeData = {
                fromPlayerId: "507f1f77bcf86cd799439011",
                toPlayerId: "507f1f77bcf86cd799439012",
                fromItems: [
                    {
                        itemId: "507f1f77bcf86cd799439021",
                        playerItemId: "607f1f77bcf86cd799439101",
                    },
                ],
                toItems: [
                    {
                        itemId: "507f1f77bcf86cd799439024",
                        playerItemId: "607f1f77bcf86cd799439201",
                    },
                ],
            };

            const res = await request.post("/trades").send(tradeData);

            expect(res.status).toBe(201);
            expect(res.body.fromPlayerId).toBe("507f1f77bcf86cd799439011");
            expect(res.body.toPlayerId).toBe("507f1f77bcf86cd799439012");
            expect(res.body.fromItems).toHaveLength(1);
            expect(res.body.toItems).toHaveLength(1);
            expect(res.body._id).toBeDefined();

            // Verify items were transferred
            const player1 = await mongo.db!.collection("players").findOne({
                _id: new ObjectId("507f1f77bcf86cd799439011"),
            });
            const player2 = await mongo.db!.collection("players").findOne({
                _id: new ObjectId("507f1f77bcf86cd799439012"),
            });

            // Player 1 should have lost their item and gained player 2's item
            expect(player1?.inventory).toHaveLength(3);
            expect(
                player1?.inventory.some(
                    (inv: any) =>
                        inv.itemId.toString() === "507f1f77bcf86cd799439024"
                )
            ).toBe(true);

            // Player 2 should have lost their item and gained player 1's item
            expect(player2?.inventory).toHaveLength(2);
            expect(
                player2?.inventory.some(
                    (inv: any) =>
                        inv.itemId.toString() === "507f1f77bcf86cd799439021"
                )
            ).toBe(true);

            // Verify trade was added to both players
            expect(player1?.trades).toHaveLength(1);
            expect(player2?.trades).toHaveLength(1);
        });

        it("successfully creates a one-way trade (gift) [2pts]", async () => {
            const tradeData = {
                fromPlayerId: "507f1f77bcf86cd799439011",
                toPlayerId: "507f1f77bcf86cd799439012",
                fromItems: [
                    {
                        itemId: "507f1f77bcf86cd799439023",
                        playerItemId: "607f1f77bcf86cd799439103",
                    },
                ],
                toItems: [],
            };

            const res = await request.post("/trades").send(tradeData);

            expect(res.status).toBe(201);
            expect(res.body.fromItems).toHaveLength(1);
            expect(res.body.toItems).toHaveLength(0);
        });

        it("returns 400 when trying to trade with yourself [1pts]", async () => {
            const res = await request.post("/trades").send({
                fromPlayerId: "507f1f77bcf86cd799439011",
                toPlayerId: "507f1f77bcf86cd799439011",
                fromItems: [
                    {
                        itemId: "507f1f77bcf86cd799439021",
                        playerItemId: "607f1f77bcf86cd799439101",
                    },
                ],
                toItems: [],
            });

            expect(res.status).toBe(400);
            expect(res.body.message).toContain("Cannot trade with yourself");
        });

        it("returns 404 when source player not found [1pts]", async () => {
            const res = await request.post("/trades").send({
                fromPlayerId: "507f1f77bcf86cd799439999",
                toPlayerId: "507f1f77bcf86cd799439012",
                fromItems: [],
                toItems: [],
            });

            expect(res.status).toBe(404);
            expect(res.body.message).toContain("Source player not found");
        });

        it("returns 404 when destination player not found [1pts]", async () => {
            const res = await request.post("/trades").send({
                fromPlayerId: "507f1f77bcf86cd799439011",
                toPlayerId: "507f1f77bcf86cd799439999",
                fromItems: [],
                toItems: [],
            });

            expect(res.status).toBe(404);
            expect(res.body.message).toContain("Destination player not found");
        });

        it("returns 404 when item does not exist [1pts]", async () => {
            const res = await request.post("/trades").send({
                fromPlayerId: "507f1f77bcf86cd799439011",
                toPlayerId: "507f1f77bcf86cd799439012",
                fromItems: [
                    {
                        itemId: "507f1f77bcf86cd799439999",
                        playerItemId: "607f1f77bcf86cd799439101",
                    },
                ],
                toItems: [],
            });

            expect(res.status).toBe(404);
            expect(res.body.message).toContain("not found");
        });

        it("returns 409 when item is not tradeable [2pts]", async () => {
            const res = await request.post("/trades").send({
                fromPlayerId: "507f1f77bcf86cd799439012",
                toPlayerId: "507f1f77bcf86cd799439011",
                fromItems: [
                    {
                        itemId: "507f1f77bcf86cd799439025",
                        playerItemId: "607f1f77bcf86cd799439202",
                    },
                ],
                toItems: [],
            });

            expect(res.status).toBe(409);
            expect(res.body.message).toContain("not tradeable");
        });

        it("returns 404 when player does not own the item [2pts]", async () => {
            const res = await request.post("/trades").send({
                fromPlayerId: "507f1f77bcf86cd799439011",
                toPlayerId: "507f1f77bcf86cd799439012",
                fromItems: [
                    {
                        itemId: "507f1f77bcf86cd799439021",
                        playerItemId: "607f1f77bcf86cd799439999", // Non-existent player item ID
                    },
                ],
                toItems: [],
            });

            expect(res.status).toBe(404);
            expect(res.body.message).toContain("does not own item");
        });

        it("returns 409 when item is bound [2pts]", async () => {
            const res = await request.post("/trades").send({
                fromPlayerId: "507f1f77bcf86cd799439011",
                toPlayerId: "507f1f77bcf86cd799439012",
                fromItems: [
                    {
                        itemId: "507f1f77bcf86cd799439022",
                        playerItemId: "607f1f77bcf86cd799439102",
                    },
                ],
                toItems: [],
            });

            expect(res.status).toBe(409);
            expect(res.body.message).toContain("bound and cannot be traded");
        });

        it("returns 400 when item ID does not match player item [2pts]", async () => {
            const res = await request.post("/trades").send({
                fromPlayerId: "507f1f77bcf86cd799439011",
                toPlayerId: "507f1f77bcf86cd799439012",
                fromItems: [
                    {
                        itemId: "507f1f77bcf86cd799439022", // Wrong item ID
                        playerItemId: "607f1f77bcf86cd799439101",
                    },
                ],
                toItems: [],
            });

            expect(res.status).toBe(400);
            expect(res.body.message).toContain("Item ID mismatch");
        });
    });
});