import redis from "../config/redis.js";

export const getAboutPage = async (req, res) => {
    try {
        const about = await redis.hgetall("about");
        res.json(about);
    } catch (err) {
        console.error("getAboutPage error:", err);
        res.status(500).json({ error: err.message });
    }
};

export const updateAboutPage = async (req, res) => {
    try {
        const data = req.body;
        const existingKeys = await redis.hkeys("about");
        const fieldsToUpdate = {};
        for (const key of existingKeys) {
            if (data.hasOwnProperty(key)) {
                fieldsToUpdate[key] = data[key];
            }
        }
        if (Object.keys(fieldsToUpdate).length > 0) {
            await redis.hset("about", fieldsToUpdate);
        }
        res.json({ success: true, updatedFields: Object.keys(fieldsToUpdate) });
    } catch (err) {
        console.error("updateAboutPage error:", err);
        res.status(500).json({ error: err.message });
    }
};
