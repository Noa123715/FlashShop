import express from "express";
import { config } from "dotenv";
import { Redis } from "@upstash/redis";

config();

const app = express();
app.use(express.json());

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN
});

app.post("/upload", async (req, res) => {
    const { key, content } = req.body;
    await redis.set(key, content);
    res.json({ message: `Saved ${key}` });
});

app.get("/static/:key", async (req, res) => {
    const key = req.params.key;
    const val = await redis.get(key);
    if (!val) return res.status(404).send("Not found");
    res.send(val);
});

app.listen(process.env.PORT, () =>
    console.log(`Server running on http://localhost:${process.env.PORT}`)
);
