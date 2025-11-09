import redis from "../config/redis.js";

// Get Header Page Data
export const getHeaderPage = async (req, res) => {
    try {
        const header = await redis.hgetall("header");
        res.json(header);
    } catch (err) {
        console.error("getHeaderPage error:", err);
        res.status(500).json({ error: err.message });
    }
};

// Update Header Page Data
export const updateHeaderPage = async (req, res) => {
    try {
        const data = req.body;
        const existingKeys = await redis.hkeys("header");
        const fieldsToUpdate = {};
        for (const key of existingKeys) {
            if (data.hasOwnProperty(key)) {
                fieldsToUpdate[key] = data[key];
            }
        }
        if (Object.keys(fieldsToUpdate).length > 0) {
            await redis.hset("header", fieldsToUpdate);
        }
        res.json({ success: true, updatedFields: Object.keys(fieldsToUpdate) });
    } catch (err) {
        console.error("updateHeaderPage error:", err);
        res.status(500).json({ error: err.message });
    }
};

// Get About Page Data
export const getAboutPage = async (req, res) => {
    try {
        const about = await redis.hgetall("about");
        res.json(about);
    } catch (err) {
        console.error("getAboutPage error:", err);
        res.status(500).json({ error: err.message });
    }
};

// Update About Page Data
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

// Get Terms Page Data
export const getTermsPage = async (req, res) => {
    try {
        const footer = await redis.hgetall("terms");
        res.json(footer);
    } catch (err) {
        console.error("getTermsPage error:", err);
        res.status(500).json({ error: err.message });
    }
};

// Update Terms Page Data
export const updateTermsPage = async (req, res) => {
    try {
        const data = req.body;
        const existingKeys = await redis.hkeys("terms");
        const fieldsToUpdate = {};
        for (const key of existingKeys) {
            if (data.hasOwnProperty(key)) {
                fieldsToUpdate[key] = data[key];
            }
        }
        if (Object.keys(fieldsToUpdate).length > 0) {
            await redis.hset("terms", fieldsToUpdate);
        }
        res.json({ success: true, updatedFields: Object.keys(fieldsToUpdate) });
    } catch (err) {
        console.error("updateTermsPage error:", err);
        res.status(500).json({ error: err.message });
    }
};

// Get Footer Page Data
export const getFooterPage = async (req, res) => {
    try {
        const footer = await redis.hgetall("footer");
        res.json(footer);
    } catch (err) {
        console.error("getFooterPage error:", err);
        res.status(500).json({ error: err.message });
    }
};

// Update Footer Page Data
export const updateFooterPage = async (req, res) => {
    try {
        const data = req.body;
        const existingKeys = await redis.hkeys("footer");
        const fieldsToUpdate = {};
        for (const key of existingKeys) {
            if (data.hasOwnProperty(key)) {
                fieldsToUpdate[key] = data[key];
            }
        }
        if (Object.keys(fieldsToUpdate).length > 0) {
            await redis.hset("footer", fieldsToUpdate);
        }
        res.json({ success: true, updatedFields: Object.keys(fieldsToUpdate) });
    } catch (err) {
        console.error("updateFooterPage error:", err);
        res.status(500).json({ error: err.message });
    }
};
