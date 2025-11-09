import { useState, useEffect } from "react";
import axios from "axios";

export default function AboutPage({ isAdmin }) {
    const [page, setPage] = useState({ title: "", content: "" });
    const [editMode, setEditMode] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);
    const [draft, setDraft] = useState({ title: "", content: "" });

    useEffect(() => {
        axios.get("http://localhost:4000/api/page/header").then((res) => {
            setPage(res.data);
            setDraft(res.data);
            console.log(res.data);
        });
    }, []);

    const saveChanges = async () => {
        await axios.put("http://localhost:4000/api/page/header", draft);
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
            {/* Logo */}
            {
                isAdmin && editMode && !previewMode ? (
                    <>
                        <label>🔗 Logo URL:</label>
                        <input
                            type="text"
                            value={draft.logo}
                            onChange={(e) => setDraft({ ...draft, logo: e.target.value })}
                            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                        />
                    </>
                ) : (
                    <img src={draft.logo} alt="Flash Logo" style={{ maxWidth: "100%", marginBottom: "10px" }} />
                )
            }
            {/* Admin Controls */}
            {isAdmin && (
                <div style={{ marginTop: "20px" }}>
                    {!editMode ? (
                        <button onClick={() => setEditMode(true)}>✏️ Edit</button>
                    ) : (
                        <>
                            <button onClick={saveChanges}>💾 Save</button>
                            <button onClick={cancelEdit} style={{ marginLeft: "10px" }}>
                                Cancel
                            </button>
                            <button
                                onClick={() => setPreviewMode(!previewMode)}
                                style={{ marginLeft: "10px" }}
                            >
                                👁 {previewMode ? "Edit" : "Preview"}
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
