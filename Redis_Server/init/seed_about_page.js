import redis from "../config/redis.js";
import { contactInfo, text } from "./about_text.js";

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    console.error("❌ Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN in .env");
    process.exit(1);
}

const seedData = async () => {
    try {
        console.log("Starting Redis seeding...");

        await redis.hset("header", {
            logo: "https://res.cloudinary.com/dwqywo11u/image/upload/v1762677723/flash_logo_g6ktps.png",
        });
        await redis.hset("about", {
            content: text,
            image1: "https://res.cloudinary.com/dwqywo11u/image/upload/v1762677724/1_gg2km0.png",
        });
        await redis.hset("footer", {
            noteTitle: "יש לך משהו לומר לנו? אפשר לכתוב...",
            notePlaceholderName: "קוראים לי",
            notePlaceholderEmail: "המייל שלי",
            notePlaceholderMessage: "רוצה לדבר אתכם על...",
            noteButtonText: "שלח",
            contactAddress: "דרך מרן 15 קומה 4, נוף כנרת פוריה",
            contactMap: "https://res.cloudinary.com/dwqywo11u/image/upload/v1762677724/map_ptpxxw.png",
            contactInfo: contactInfo,
        });
        await redis.hset("terms", {
            title: "תקנון הצטרפות למועדון הלקוחות שלנו",
            content:
                "ברוכים הבאים למועדון הלקוחות! על מנת להצטרף, אנא קראו את התקנון הבא בקפידה:\n" +
                "       1. הלקוח מסכים לקבל עדכונים והטבות מהמועדון.\n" +
                "       2. ניתן לבטל את ההצטרפות בכל עת דרך הגדרות החשבון.\n" +
                "       3. שימוש במידע אישי יעשה בהתאם למדיניות הפרטיות שלנו.\n" +
                "תקנון זה נועד להבטיח חווית שימוש טובה ומסודרת לכל חברי המועדון.",
            btnText: "אני מסכים",
            
        });
        console.log("✅ Redis seeding completed!");
        process.exit(0);
    } catch (err) {
        console.error("❌ Error seeding Redis:", err);
        process.exit(1);
    }
};

seedData();