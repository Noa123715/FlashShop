import redis from "../config/redis.js";
import { contactInfo, text } from "./about_text.js";

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    console.error("❌ Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN in .env");
    process.exit(1);
}

const seedData = async () => {
    try {
        console.log("Starting Redis seeding...");

        // about data
        await redis.set("about:content", text);
        await redis.set("about:logo", "https://drive.google.com/file/d/1Cz5JXJ8GMyu9A0-BAzJquH8hy3EcQq1U/view?usp=sharing");
        await redis.set("about:image1", "https://drive.google.com/file/d/1-1v6ZYy99AsMnYrsrZK1GoDbkhwni_AR/view?usp=sharing");

        // send a note defaults
        await redis.set("about:noteTitle", "יש לך משהו לומר לנו? אפשר לכתוב...");
        await redis.set("about:notePlaceholderName", "קוראים לי");
        await redis.set("about:notePlaceholderEmail", "המייל שלי");
        await redis.set("about:notePlaceholderMessage", "רוצה לדבר אתכם על...");
        await redis.set("about:noteButtonText", "שלח");

        // contact info
        await redis.set("about:contactAddress", "דרך מרן 15 קומה 4, נוף כנרת פוריה");
        await redis.set("about:contactMap", "https://drive.google.com/file/d/1bj_CCfeeQFI4OiNuYQuI2lcz8eflJN3D/view?usp=sharing");
        await redis.set("about:contactInfo", contactInfo);

        console.log("✅ Redis seeding completed!");
        process.exit(0);
    } catch (err) {
        console.error("❌ Error seeding Redis:", err);
        process.exit(1);
    }
};

seedData();