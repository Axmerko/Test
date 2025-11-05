import { beforeEach, describe, expect, it } from "vitest";
import request from "../request";
import { ObjectId } from "mongodb";
import mongo from "../../src/database/mongo";

describe("GET /items/search", () => {
    beforeEach(async () => {
        await mongo.db!.collection("items").insertMany([
            {
                name: "Dragon Sword",
                description: "A powerful sword forged by ancient dragons",
                rarity: "legendary",
                value: 1000,
                tradeable: true,
                createdAt: new Date(),
            },
            {
                name: "Dragon Shield",
                description: "A mighty shield crafted from dragon scales",
                rarity: "epic",
                value: 500,
                tradeable: true,
                createdAt: new Date(),
            },
            {
                name: "Health Potion",
                description: "Restores health to the player",
                rarity: "common",
                value: 10,
                tradeable: true,
                createdAt: new Date(),
            },
            {
                name: "Rare Artifact",
                description: "An ancient artifact of unknown origin",
                rarity: "rare",
                value: 300,
                tradeable: false,
                createdAt: new Date(),
            },
        ]);
    });

    it("searches items by name [1.5pts]", async () => {
        const res = await request.get("/items/search?query=dragon");
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(2);
        expect(res.body[0].name).toContain("Dragon");
    });

    it("searches items by description [1.5pts]", async () => {
        const res = await request.get("/items/search?query=health");
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(1);
        expect(res.body[0].name).toBe("Health Potion");
    });

    it("searches items by rarity [1.5pts]", async () => {
        const res = await request.get("/items/search?query=legendary");
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(1);
        expect(res.body[0].name).toBe("Dragon Sword");
    });

    it("returns empty array when no items match [1pts]", async () => {
        const res = await request.get("/items/search?query=nonexistent");
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(0);
    });

    it("returns 400 for query less than 2 characters [0.5pts]", async () => {
        const res = await request.get("/items/search?query=a");
        expect(res.status).toBe(400);
    });

    it("returns 400 for empty query [0.5pts]", async () => {
        const res = await request.get("/items/search?query=");
        expect(res.status).toBe(400);
    });

    it("returns 400 for missing query parameter [0.5pts]", async () => {
        const res = await request.get("/items/search");
        expect(res.status).toBe(400);
    });
});