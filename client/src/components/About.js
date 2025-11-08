import { useState, useEffect } from "react";
import axios from "axios";
import logo from '../img/flash_logo.png'; /* https://drive.google.com/file/d/1Cz5JXJ8GMyu9A0-BAzJquH8hy3EcQq1U/view?usp=sharing */
import img1 from '../img/1.png'; /* https://drive.google.com/file/d/1-1v6ZYy99AsMnYrsrZK1GoDbkhwni_AR/view?usp=sharing */
import map from '../img/map.png'; /* https://drive.google.com/file/d/1bj_CCfeeQFI4OiNuYQuI2lcz8eflJN3D/view?usp=sharing */

export default function AboutPage({ isAdmin }) {

    return (
        <div style={{ padding: "20px", maxWidth: 800, margin: "auto" }}>
            <img src={logo} alt="Flash Logo" />
            <p>התמונות שלכם מפוזרות במעטפות, האלבומים מלאים בתמונות בלי סדר, או פשוט לא פיתחתם? כל הטיפים לארגון אלבומים משפחתיים שיספרו את הסיפור הכי מעניין. הסיפור שלכם. </p>
            <p>פלאש הוא שירות פיתוח תמונות דיגיטלי המאפשר לכם להעלות את התמונות הדיגיטליות שלכם וליצור אלבומים מודפסים באיכות גבוהה. השירות מציע מגוון רחב של אפשרויות התאמה אישית, כולל עיצובים שונים, גדלים וסוגי נייר, כך שתוכלו ליצור אלבומים שמתאימים לטעם האישי שלכם.</p>
            <p>עם פלאש, תוכלו לשמור על הזיכרונות היקרים שלכם בצורה מסודרת ויפה, ולשתף אותם עם משפחה וחברים. השירות נוח לשימוש ומאפשר לכם ליצור אלבומים מרהיבים בקלות ובמהירות, מבלי לצאת מהבית.</p>
            <img src={img1} alt="Flash Logo" style={{ marginTop: "20px" }} />
            <div className="sendANote">
                <h2>יש לך משהו לומר לנו? אפשר לכתוב...</h2>
                <input type="text" placeholder="קוראים לי" style={{ width: "100%", padding: "10px", marginBottom: "10px" }} />
                <input type="email" placeholder="המייל שלי" style={{ width: "100%", padding: "10px", marginBottom: "10px" }} />
                <textarea placeholder="רוצה לדבר אתכם על..." style={{ width: "100%", height: "100px", padding: "10px", marginBottom: "10px" }}></textarea>
                <button style={{ padding: "10px 20px", backgroundColor: "#007BFF", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>שלח</button>
            </div>
            <div className="contactInfo">
                <p>דרך מרן 15 קומה 4, נוף כנרת פוריה</p>
                <img src={map} alt="Flash Logo" />
                <p>שעות פעילות: ימים א-ד 20:30-22:30 בוקר וימי חמישי בתאום מראש
                    054-8486485
                    f486485@gmail.com</p>
            </div>
        </div>
    );
}