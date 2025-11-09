import { useState, useEffect } from "react";
import axios from "axios";
import AdminControls from "./AdminControls";

export default function Footer({ isAdmin }) {
    const [page, setPage] = useState({ title: "", content: "" });
    const [editMode, setEditMode] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);
    const [draft, setDraft] = useState({ title: "", content: "" });

    useEffect(() => {
        axios.get("http://localhost:4000/api/page/footer").then((res) => {
            setPage(res.data);
            setDraft(res.data);
            console.log(res.data);
        });
    }, []);

    const saveChanges = async () => {
        await axios.put("http://localhost:4000/api/page/footer", draft);
        setPage(draft);
        setEditMode(false);
        setPreviewMode(false);
    };

    const cancelEdit = () => {
        setDraft(page);
        setEditMode(false);
        setPreviewMode(false);
    };

    return (
        <div style={{ padding: "20px", maxWidth: 800, margin: "auto" }}>
            {/* sendANote Section */}
            <div className="sendANote" style={{ marginTop: "30px" }}>
                {isAdmin && editMode && !previewMode ? (
                    <>
                        <input
                            type="text"
                            value={draft.noteTitle}
                            onChange={(e) => setDraft({ ...draft, noteTitle: e.target.value })}
                            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                        />
                        <input
                            type="text"
                            value={draft.notePlaceholderName}
                            onChange={(e) => setDraft({ ...draft, notePlaceholderName: e.target.value })}
                            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                        />
                        <input
                            type="text"
                            value={draft.notePlaceholderEmail}
                            onChange={(e) => setDraft({ ...draft, notePlaceholderEmail: e.target.value })}
                            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                        />
                        <input
                            type="text"
                            value={draft.notePlaceholderMessage}
                            onChange={(e) => setDraft({ ...draft, notePlaceholderMessage: e.target.value })}
                            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                        />
                    </>
                ) : (
                    <>
                        <h2>{draft.noteTitle}</h2>
                        <input
                            type="text"
                            placeholder={draft.notePlaceholderName}
                            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                        />
                        <input
                            type="email"
                            placeholder={draft.notePlaceholderEmail}
                            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                        />
                        <textarea
                            placeholder={draft.notePlaceholderMessage}
                            style={{ width: "100%", height: "100px", padding: "10px", marginBottom: "10px" }}
                        ></textarea>
                        <button
                            style={{
                                padding: "10px 20px",
                                backgroundColor: "#007BFF",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            {draft.noteButtonText}
                        </button>
                    </>
                )}
            </div>

            {/* Contact Info Section */}
            <div className="contactInfo" style={{ marginTop: "30px" }}>
                {isAdmin && editMode && !previewMode ? (
                    <>
                        <input
                            type="text"
                            value={draft.contactAddress}
                            onChange={(e) => setDraft({ ...draft, contactAddress: e.target.value })}
                            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                        />

                        <label>🔗 Map Image URL:</label>
                        <input
                            type="text"
                            value={draft.contactMap}
                            onChange={(e) => setDraft({ ...draft, contactMap: e.target.value })}
                            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                        />

                        <textarea
                            value={draft.contactInfo}
                            onChange={(e) => setDraft({ ...draft, contactInfo: e.target.value })}
                            style={{ width: "100%", height: "100px", padding: "8px" }}
                        />
                    </>
                ) : (
                    <>
                        <p>{draft.contactAddress}</p>
                        <img src={draft.contactMap} alt="Map" style={{ maxWidth: "100%", margin: "10px 0" }} />
                        <pre style={{ whiteSpace: "pre-line" }}>{draft.contactInfo}</pre>
                    </>
                )}
            </div>
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
    );
}
