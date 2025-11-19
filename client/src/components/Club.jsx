import { useState, useEffect } from "react";
import { getPage } from "../api/pages";
import AdminControls from "./AdminControls.jsx";
import { useAdminControl } from "../hooks/useAdminControl.jsx";
import useAuthStore from '../store/authStore';
import useAppStore from '../store/appStore';

export default function Club() {
    const isAdmin = useAuthStore(state => state.isAdmin());
    const adminControls = useAdminControl(
        { title: "", content: "", btnText: "" },
        "club"
    );
    const { draft, updateDraft, editMode, previewMode } = adminControls;
    const [isOpen, setIsOpen] = useState(true);
    const setTermsAgreed = useAppStore(state => state.setTermsAgreed);

    useEffect(() => {
        getPage("club").then((data) => {
            adminControls.setPage(data);
            adminControls.setDraft(data);
        });
    }, []);

    const handleAgree = () => {
        setTermsAgreed(true);
        setIsOpen(false);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const EditContent = (
        <>
            <input
                type="text"
                value={draft.title}
                onChange={(e) => updateDraft({ title: e.target.value })}
                style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            />
            <textarea
                value={draft.content}
                onChange={(e) => updateDraft({ content: e.target.value })}
                style={{ width: "100%", height: "250px", marginBottom: "10px", padding: "8px" }}
            />
            <input
                type="text"
                value={draft.btnText}
                onChange={(e) => updateDraft({ btnText: e.target.value })}
                style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            />
        </>
    );

    const ViewContent = (
        <>
            <h2 className="text-xl font-bold mb-4">{draft.title}</h2>
            <p style={{ whiteSpace: "pre-line" }}>{draft.content}</p>
            <button
                onClick={handleAgree}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                {draft.btnText}
            </button>
        </>
    );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-6">
            <div className="bg-white rounded-lg w-full max-w-lg relative shadow-lg p-6">
                <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    ❌
                </button>

                {isAdmin && (
                    <AdminControls
                        editMode={editMode}
                        previewContent={EditContent}
                        adminControls={adminControls}
                    >
                        {ViewContent}
                    </AdminControls>
                )}
            </div>
        </div>
    );
}

// import useAppStore from '../store/appStore';

// // בתוך קומפוננטה:
// const termsAgreed = useAppStore(state => state.termsAgreed);

// if (termsAgreed) {
//     // בצע פעולה...
// }