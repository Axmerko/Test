import { beforeEach, describe, expect, it } from "vitest";
import request from "../request";
import { ObjectId } from "mongodb";
import mongo from "../../src/database/mongo";

describe("Item Management", () => {
    beforeEach(async () => {
        await mongo.db!.collection("items").insertMany([
            {
                _id: new ObjectId("507f1f77bcf86cd799439011"),
                name: "Iron Sword",
                description: "A basic sword made of iron",
                rarity: "common",
                value: 50,
                tradeable: true,
                createdAt: new Date(),
            },
            {
                _id: new ObjectId("507f1f77bcf86cd799439012"),
                name: "Magic Wand",
                description: "A wand imbued with magical powers",
                rarity: "rare",
                value: 200,
                tradeable: true,
                createdAt: new Date(),
            },
        ]);
    });

    describe("GET /items", () => {
        it("returns all items [0.5pts]", async () => {
            const res = await request.get("/items");
            expect(res.status).toBe(200);
            expect(res.body).toHaveLength(2);
            expect(res.body[0].name).toBe("Iron Sword");
        });
    });

    describe("GET /items/:id", () => {
        it("returns item by id [0.5pts]", async () => {
            const res = await request.get("/items/507f1f77bcf86cd799439011");
            expect(res.status).toBe(200);
            expect(res.body.name).toBe("Iron Sword");
            expect(res.body.rarity).toBe("common");
        });

        it("returns 404 for non-existent item [1pts]", async () => {
            const res = await request.get("/items/507f1f77bcf86cd799439999");
            expect(res.status).toBe(404);
        });

        it("returns 400 for invalid id format [0.5pts]", async () => {
            const res = await request.get("/items/invalid-id");
            expect(res.status).toBe(400);
        });
    });

    describe("POST /items", () => {
        it("creates a new item with valid data [1pts]", async () => {
            const itemData = {
                name: "Fire Staff",
                description: "A staff that harnesses the power of fire",
                rarity: "epic",
                value: 500,
                tradeable: true,
            };

            const res = await request.post("/items").send(itemData);
            expect(res.status).toBe(201);
            expect(res.body.name).toBe("Fire Staff");
            expect(res.body.rarity).toBe("epic");
            expect(res.body._id).toBeDefined();
        });

        it("returns 400 for missing name [0.5pts]", async () => {
            const res = await request.post("/items").send({
                description: "Test description here",
                rarity: "common",
                value: 10,
                tradeable: true,
            });
            expect(res.status).toBe(400);
        });

        it("returns 400 for name less than 2 characters [0.5pts]", async () => {
            const res = await request.post("/items").send({
                name: "A",
                description: "Test description here",
                rarity: "common",
                value: 10,
                tradeable: true,
            });
            expect(res.status).toBe(400);
        });

        it("returns 400 for description less than 5 characters [0.5pts]", async () => {
            const res = await request.post("/items").send({
                name: "Test Item",
                description: "Desc",
                rarity: "common",
                value: 10,
                tradeable: true,
            });
            expect(res.status).toBe(400);
        });

        it("returns 400 for invalid rarity [1pts]", async () => {
            const res = await request.post("/items").send({
                name: "Test Item",
                description: "A test item description",
                rarity: "invalid-rarity",
                value: 10,
                tradeable: true,
            });
            expect(res.status).toBe(400);
        });

        it("returns 400 for negative value [0.5pts]", async () => {
            const res = await request.post("/items").send({
                name: "Test Item",
                description: "A test item description",
                rarity: "common",
                value: -10,
                tradeable: true,
            });
            expect(res.status).toBe(400);
        });

        it("returns 400 for missing tradeable field [0.5pts]", async () => {
            const res = await request.post("/items").send({
                name: "Test Item",
                description: "A test item description",
                rarity: "common",
                value: 10,
            });
            expect(res.status).toBe(400);
        });
    });

    describe("PUT /items/:id", () => {
        it("updates existing item [1pts]", async () => {
            const updateData = {
                name: "Steel Sword",
                description: "An upgraded sword made of steel",
                rarity: "rare",
                value: 100,
                tradeable: true,
            };

            const res = await request
                .put("/items/507f1f77bcf86cd799439011")
                .send(updateData);
            expect(res.status).toBe(200);
            expect(res.body.name).toBe("Steel Sword");
            expect(res.body.rarity).toBe("rare");
        });

        it("returns 404 for non-existent item [2pts]", async () => {
            const res = await request
                .put("/items/507f1f77bcf86cd799439999")
                .send({
                    name: "Updated Item",
                    description: "Updated description here",
                    rarity: "common",
                    value: 50,
                    tradeable: true,
                });
            expect(res.status).toBe(404);
        });
    });

    describe("DELETE /items/:id", () => {
        it("deletes existing item [1pts]", async () => {
            const res = await request.delete("/items/507f1f77bcf86cd799439011");
            expect(res.status).toBe(204);
        });
    });
});