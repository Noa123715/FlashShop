import { useState, useEffect } from "react";
import axios from "axios";
import AdminControls from "./AdminControls";

export default function TermsModal({ isAdmin }) {
    const [page, setPage] = useState({ title: "", content: "" });
    const [editMode, setEditMode] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);
    const [draft, setDraft] = useState({ title: "", content: "" });
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:4000/api/page/terms").then((res) => {
            setPage(res.data);
            setDraft(res.data);
            console.log(res.data);
        });
    }, []);

    const saveChanges = async () => {
        await axios.put("http://localhost:4000/api/page/terms", draft);
        setPage(draft);
        setEditMode(false);
        setPreviewMode(false);
    };

    const cancelEdit = () => {
        setDraft(page);
        setEditMode(false);
        setPreviewMode(false);
    };

    const handleAgree = () => {
        localStorage.setItem("termsAgreed", "true");
        setIsOpen(false);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-6">
            <div className="bg-white rounded-lg w-full max-w-lg relative shadow-lg p-6">
                {/* כפתור סגירה X */}
                <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    ❌
                </button>

                {/* תוכן התקנון */}
                {isAdmin && editMode && !previewMode ? (
                    <>
                        <input
                            type="text"
                            value={draft.title}
                            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                        />
                        <input
                            type="text"
                            value={draft.content}
                            onChange={(e) => setDraft({ ...draft, content: e.target.value })}
                            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                        />
                        <input
                            type="text"
                            value={draft.btnText}
                            onChange={(e) => setDraft({ ...draft, btnText: e.target.value })}
                            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                        />
                    </>
                ) : (
                    <>
                        <h2 className="text-xl font-bold mb-4">{draft.title}</h2>
                        <p>{draft.content}</p>
                        <button
                            onClick={handleAgree}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >{draft.btnText}</button>
                    </>
                )}
                {/* Admin Controls */}
                {isAdmin && (
                    <AdminControls
                        editMode={editMode}
                        setEditMode={setEditMode}
                        saveChanges={saveChanges}
                        cancelEdit={cancelEdit}
                        previewMode={previewMode}
                        setPreviewMode={setPreviewMode}
                    />
                )}
            </div>
        </div>
    );
}
