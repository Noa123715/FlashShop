import redis from "../config/redis.js";

// מקבל את תוכן הדף
export const getAboutPage = async (req, res) => {
    try {
        const title = (await redis.get("about:title")) || "ברוכים הבאים לפלאש";
        const content = (await redis.get("about:content")) || "התוכן טרם הוזן";
        const logo = (await redis.get("about:logo")) || "";
        const image1 = (await redis.get("about:image1")) || "";
        const map = (await redis.get("about:map")) || "";

        res.json({ title, content, logo, image1, map });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// מעדכן את תוכן הדף
export const updateAboutPage = async (req, res) => {
    try {
        const { title, content, logo, image1, map } = req.body;
        if (title) await redis.set("about:title", title);
        if (content) await redis.set("about:content", content);
        if (logo) await redis.set("about:logo", logo);
        if (image1) await redis.set("about:image1", image1);
        if (map) await redis.set("about:map", map);

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
