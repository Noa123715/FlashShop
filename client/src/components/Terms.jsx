import { useEffect } from "react";
import { getPage } from "../api/pages";
import AdminControls from "./AdminControls.jsx";
import { useAdminControl } from "../hooks/useAdminControl.jsx";
import useAuthStore from '../store/authStore';
import useAppStore from '../store/appStore';

export default function Terms() {
    const isAdmin = useAuthStore(state => state.isAdmin());

    // שימוש ב-Store
    const { isTermsOpen, setTermsOpen, setClubOpen, setTermsAgreed } = useAppStore();

    const adminControls = useAdminControl(
        { title: "", content: "", btnText: "" },
        "terms"
    );
    const { draft, updateDraft, editMode } = adminControls;

    useEffect(() => {
        getPage("terms").then((data) => {
            adminControls.setPage(data);
            adminControls.setDraft(data);
        });
    }, []);

    const handleAgree = () => {
        setTermsAgreed(true);
        setTermsOpen(false); // סוגר את התקנון
        setClubOpen(true);   // פותח חזרה את המועדון
    };

    const handleClose = () => {
        setTermsOpen(false); // סוגר את התקנון
        setClubOpen(true);   // פותח חזרה את המועדון
    };

    const EditContent = (
        <>
            <input type="text" value={draft.title} onChange={(e) => updateDraft({ title: e.target.value })} style={{ width: "100%", marginBottom: "10px", padding: "8px" }} placeholder="כותרת" />
            <textarea value={draft.content} onChange={(e) => updateDraft({ content: e.target.value })} style={{ width: "100%", height: "250px", marginBottom: "10px", padding: "8px" }} placeholder="תוכן התקנון" />
            <input type="text" value={draft.btnText} onChange={(e) => updateDraft({ btnText: e.target.value })} style={{ width: "100%", marginBottom: "10px", padding: "8px" }} placeholder="טקסט כפתור" />
        </>
    );

    const ViewContent = (
        <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{draft.title}</h2>
            <p className="whitespace-pre-line text-gray-600 mb-6 leading-relaxed max-h-[60vh] overflow-y-auto text-right px-4">
                {draft.content}
            </p>
            <button onClick={handleAgree} className="bg-blue-600 text-white px-8 py-2 rounded-full hover:bg-blue-700 font-semibold transition-colors shadow-md">
                {draft.btnText}
            </button>
        </div>
    );

    if (!isTermsOpen && !editMode) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[60] p-4 animate-fade-in">
            <div className="bg-white rounded-2xl w-full max-w-lg relative shadow-2xl p-8 border border-gray-100">
                <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors text-xl font-bold p-2" aria-label="סגור">
                    ✕
                </button>

                <AdminControls
                    editMode={editMode}
                    previewContent={EditContent}
                    adminControls={adminControls}
                >
                    {ViewContent}
                </AdminControls>
            </div>
        </div>
    );
}