import { useState, useEffect } from "react";
import axios from "axios";
import AdminControls from "./AdminControls";

export default function AboutPage({ isAdmin }) {
    const [page, setPage] = useState({ title: "", content: "" });
    const [editMode, setEditMode] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);
    const [draft, setDraft] = useState({ title: "", content: "" });

    useEffect(() => {
        axios.get("http://localhost:4000/api/page/about").then((res) => {
            setPage(res.data);
            setDraft(res.data);
            console.log(res.data);
        });
    }, []);

    const saveChanges = async () => {
        await axios.put("http://localhost:4000/api/page/about", draft);
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
            {/* Content */}
            <div>
                {isAdmin && editMode && !previewMode ? (
                    <textarea
                        style={{ width: "100%", height: "250px" }}
                        value={draft.content}
                        onChange={(e) => setDraft({ ...draft, content: e.target.value })}
                    />
                ) : (
                    <p>{draft.content}</p>
                )}
            </div>

            {/* Image 1 */}
            {isAdmin && editMode && !previewMode ? (
                <>
                    <label>🔗 Main Image URL:</label>
                    <input
                        type="text"
                        value={draft.image1}
                        onChange={(e) => setDraft({ ...draft, image1: e.target.value })}
                        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                    />
                </>
            ) : (
                <img
                    src={draft.image1}
                    alt="Flash main"
                    style={{ marginTop: "20px", maxWidth: "100%" }}
                />
            )
            }
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
