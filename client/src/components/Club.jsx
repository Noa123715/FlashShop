import { useEffect, useState } from "react"; // useState רק לטופס
import { getPage } from "../api/pages";
import AdminControls from "./AdminControls.jsx";
import { useAdminControl } from "../hooks/useAdminControl.jsx";
import useAuthStore from '../store/authStore';
import useAppStore from '../store/appStore';

export default function Club() {
    const isAdmin = useAuthStore(state => state.isAdmin());

    // שימוש ב-Store הגלובלי לשליטה בפתיחה/סגירה
    const { isClubOpen, setClubOpen, setTermsOpen, termsAgreed } = useAppStore();

    const adminControls = useAdminControl(
        {
            title: "למועדון שלנו\nכבר הצטרפת?",
            subtitle: "הצטרף עכשיו וקבל בלוק עץ\nבגודל 10/10 מתנה!",
            description: "מוזמנים לקבל את כל הטיפים שלנו לפני כולם\nולהנות ממבצעים והטבות לחברים בלבד ;)",
            inputNamePlaceholder: "קוראים לי",
            inputEmailPlaceholder: "המייל שלי",
            inputDatePlaceholder: "תאריך לידה",
            checkboxText: "מאשר/ת את תקנון המועדון ורוצה לקבל עדכונים, קופונים,\nמבצעים והטבות מועדון אישיות.",
            btnText: "אני בפנים ;)"
        },
        "club"
    );

    const { draft, updateDraft, editMode } = adminControls;
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        birthdate: "",
        agreed: false
    });

    // סנכרון הצ'קבוקס עם האישור הגלובלי
    useEffect(() => {
        if (termsAgreed) {
            setFormData(prev => ({ ...prev, agreed: true }));
        }
    }, [termsAgreed]);

    useEffect(() => {
        getPage("club").then((data) => {
            if (data) {
                adminControls.setPage(data);
                adminControls.setDraft(data);
            }
        });
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.agreed) {
            alert("יש לאשר את התקנון");
            return;
        }
        console.log("Club registration:", formData);
        alert("תודה שהצטרפת!");
        setClubOpen(false);
    };

    const openTerms = (e) => {
        e.preventDefault();
        setClubOpen(false);
        setTermsOpen(true);
    };

    // אם המועדון סגור וגם לא במצב עריכה - לא נחזיר כלום
    if (!isClubOpen && !editMode) return null;

    const EditContent = (
        <div className="flex flex-col gap-4 p-4 text-right" dir="rtl">
            {/* ... תוכן העריכה נשאר ללא שינוי ... */}
            <h3 className="font-bold text-lg border-b pb-2">עריכת פופ-אפ מועדון</h3>
            <div>
                <label className="block text-sm font-bold">כותרת ראשית:</label>
                <textarea className="w-full border p-2 rounded" value={draft.title} onChange={(e) => updateDraft({ title: e.target.value })} />
            </div>
            {/* ... שאר שדות העריכה ... */}
        </div>
    );

    const ViewContent = (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setClubOpen(false)}></div>
            <div className="relative w-[500px] h-[500px] flex items-center justify-center animate-fade-in-up">

                {/* כפתור סגירה */}
                <button
                    onClick={() => setClubOpen(false)}
                    className="absolute top-4 right-4 text-gray-600 text-2xl font-thin z-50 hover:text-black"
                >
                    X
                </button>

                <div className="bg-[#f0645a] rounded-full w-full h-full flex flex-col items-center justify-center text-center p-10 shadow-2xl text-white relative z-10">
                    <h2 className="text-3xl font-bold mb-2 leading-tight whitespace-pre-line drop-shadow-md">{draft.title}</h2>
                    <h3 className="text-lg font-medium mb-4 opacity-90 whitespace-pre-line">{draft.subtitle}</h3>
                    <p className="text-sm mb-6 px-4 font-light whitespace-pre-line">{draft.description}</p>

                    <form onSubmit={handleSubmit} className="w-full max-w-xs flex flex-col gap-3 z-20">
                        <input type="text" name="name" placeholder={draft.inputNamePlaceholder} value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2 rounded-md text-gray-700 bg-white/90 text-right" />
                        <input type="email" name="email" placeholder={draft.inputEmailPlaceholder} value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 rounded-md text-gray-700 bg-white/90 text-right" />
                        <input type="text" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} name="birthdate" placeholder={draft.inputDatePlaceholder} value={formData.birthdate} onChange={handleInputChange} className="w-full px-4 py-2 rounded-md text-gray-700 bg-white/90 text-right" />

                        <div className="flex items-start gap-2 mt-2 justify-end w-full px-2">
                            <label className="text-[11px] leading-tight text-right cursor-pointer select-none" htmlFor="club-terms">
                                {draft.checkboxText}{" "}
                                <span onClick={openTerms} className="underline font-bold text-white hover:text-gray-200 cursor-pointer">
                                    (לקריאת התקנון)
                                </span>
                            </label>
                            <input type="checkbox" id="club-terms" name="agreed" checked={formData.agreed} onChange={handleInputChange} className="mt-0.5 w-4 h-4 accent-white cursor-pointer shrink-0" />
                        </div>

                        <button type="submit" className="bg-white text-[#f0645a] font-bold py-2 px-6 rounded-full mt-4 mx-auto hover:bg-gray-100 transition-colors shadow-lg">
                            {draft.btnText}
                        </button>
                    </form>

                    <div className="absolute top-1/4 -left-8 w-24 h-24 bg-pink-200 rounded-full -z-10 opacity-90"></div>
                    <div className="absolute top-1/3 -right-2 w-6 h-6 bg-[#a93636] rounded-full z-20"></div>
                    <div className="absolute bottom-12 right-12 w-5 h-5 bg-white rounded-full z-20"></div>
                    <div className="absolute top-1/2 -left-12 w-6 h-6 bg-[#f0645a] rounded-full z-0"></div>
                </div>
            </div>
        </div>
    );

    if (!isAdmin) {
        return isClubOpen ? ViewContent : null;
    }

    return (
        <div className={isClubOpen || editMode ? "relative z-50" : ""}>
            {!isClubOpen && (
                <button onClick={() => setClubOpen(true)} className="fixed bottom-4 left-4 bg-gray-800 text-white text-xs p-2 rounded shadow z-50 opacity-50 hover:opacity-100">
                    Club Popup (Admin)
                </button>
            )}
            {isClubOpen && (
                <AdminControls
                    editMode={editMode}
                    previewContent={EditContent}
                    adminControls={adminControls}
                >
                    {ViewContent}
                </AdminControls>
            )}
        </div>
    );
}