# אפליקציית Flash Shop 📸

# סקירת האפליקציה
אתר חנות אונליין להדפסות על מוצרים ולפיתוח תמונות, כולל קטגוריות של מתנות, מוצרים נלווים וקורסים 
האתר מאפשר למשתמשים להעלות תמונה ולראות איך היא נראית על מוצרים שונים (כמו ספלים, חולצות, מגנטים ועוד).
המערכת כוללת ממשק משתמש (Frontend) שנבנה ב-React, ושרת (Backend) ב-Node.js האתר מטפל בהעלאת התמונות, עיבודן והצגתן בצורה מיידית.

# התקנה והפעלה
כדי להריץ את האפליקציה באופן מקומי, עקוב אחרי השלבים הבאים:
- פתח את שורת הפקודה (Command Line):
(1. לחץ על מקש Windows + R, 2. הקלד cmd, 3. לחץ Enter)
- הורד את המאגר (repository) מגיטהאב:

    ```bash
    git clone https://github.com/Noa123715/FlashShop.git
    ```

- התקן את התלויות (dependencies) גם בצד הלקוח וגם בצד השרת:

    ```bash
    cd client
    ```

    ```bash
    npm install
    ```

    ```bash
    cd ../server
    ```

    ```bash 
    npm install
    ```

- הפעל את השרת (Backend):

    ```bash
    node index.js &
    ```

- הפעל את האפליקציה (Frontend):

    ```bash
    cd ../client
    ```

    ```bash
    npm start &
    ```

- אם הדפדפן לא נפתח אוטומטית, ניתן לגשת לכתובת: http://localhost:3000

# הוראות שימוש
לאחר שהאפליקציה פועלת, ניתן להשתמש בה כך:
ניתן לבחור בין קורסים או מוצרים
*בחירת מוצר*
- בחר מוצר מתוך הרשימה (כגון ספל, חולצה, פוסטר וכו').
- העלה תמונה מהמחשב שלך.
- התצוגה תתעדכן מיידית ותראה לך איך התמונה נראית על גבי המוצר שנבחר.
- ניתן לבחור כמויות והמחיר יתעדכן בהתאם

# נקודות קצה (API Endpoints)
השרת מספק את הנתיבים הבאים

    GET /api/getMetrics: Retrieves all surgical data.

# צילומי מסך
- דף הכניסה:
  <img src="https://github.com/noa123715/surgical-data-app/blob/main/screenshots/landingPage.png"> <br><br>
- תצוגת התמונה על מוצר:
  <img src="https://github.com/Noa123715/surgical-data-app/blob/main/screenshots/Metrics.png"><br><br>
- הודעת שגיאה:
  <img src="https://github.com/noa123715/surgical-data-app/blob/main/screenshots/noAvailableData.png"><br><br>

<br/><br/>

#### האפליקציה פותחה על-ידי חני חלמיש ונועה אבקסיס בנובמבר 2025.
#### זוהי הגרסה הראשונה של האפליקציה.
#### אני מקווה שתהנו להשתמש בה, ושהיא תעזור לעסקים וללקוחות לראות את החלום שלהם מתגשם בתמונה אחת ❤️

# שימוש מהנה 😊