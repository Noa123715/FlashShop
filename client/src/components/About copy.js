import { useState, useEffect } from "react";
import axios from "axios";

export default function AboutPage({ isAdmin }) {
    const [page, setPage] = useState({ title: "", content: "" });
    const [editMode, setEditMode] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);
    const [draft, setDraft] = useState({ title: "", content: "" });

    // Fetch content from server / Redis on mount
    useEffect(() => {
        axios.get("http://localhost:4000/api/page/about").then((res) => {
            setPage({ title: res.data.title, content: res.data.content });
            setDraft({ title: res.data.title, content: res.data.content });
        });
    }, []);

    // Save changes to server / Redis
    const saveChanges = async () => {
        await axios.put("http://localhost:4000/api/page/about", draft);
        setPage(draft);
        setEditMode(false);
        setPreviewMode(false);
    };

    // Cancel edit
    const cancelEdit = () => {
        setDraft(page);
        setEditMode(false);
        setPreviewMode(false);
    };

    return (
        <div style={{ padding: "20px", maxWidth: 800, margin: "auto" }}>
            {/* Logo */}
            {isAdmin && editMode && !previewMode ? (
                <>
                    <label>🔗 Logo URL:</label>
                    <input
                        type="text"
                        value={draft.logoUrl}
                        onChange={(e) => setDraft({ ...draft, logoUrl: e.target.value })}
                        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                    />
                </>
            ) : (
                <img src={draft.logoUrl} alt="Flash Logo" style={{ maxWidth: "100%", marginBottom: "10px" }} />
            )}

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
                        value={draft.img1Url}
                        onChange={(e) => setDraft({ ...draft, img1Url: e.target.value })}
                        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                    />
                </>
            ) : (
                <img src={draft.img1Url} alt="Flash main" style={{ marginTop: "20px", maxWidth: "100%" }} />
            )}

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
                            value={draft.placeholderName}
                            onChange={(e) => setDraft({ ...draft, placeholderName: e.target.value })}
                            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                        />
                        <input
                            type="text"
                            value={draft.placeholderEmail}
                            onChange={(e) => setDraft({ ...draft, placeholderEmail: e.target.value })}
                            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                        />
                        <input
                            type="text"
                            value={draft.placeholderMessage}
                            onChange={(e) => setDraft({ ...draft, placeholderMessage: e.target.value })}
                            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                        />
                    </>
                ) : (
                    <>
                        <h2>{draft.noteTitle}</h2>
                        <input
                            type="text"
                            placeholder={draft.placeholderName}
                            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                        />
                        <input
                            type="email"
                            placeholder={draft.placeholderEmail}
                            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                        />
                        <textarea
                            placeholder={draft.placeholderMessage}
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
                            {draft.buttonText}
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
                            value={draft.address}
                            onChange={(e) => setDraft({ ...draft, address: e.target.value })}
                            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                        />

                        <label>🔗 Map Image URL:</label>
                        <input
                            type="text"
                            value={draft.mapUrl}
                            onChange={(e) => setDraft({ ...draft, mapUrl: e.target.value })}
                            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                        />

                        <textarea
                            value={draft.contact}
                            onChange={(e) => setDraft({ ...draft, contact: e.target.value })}
                            style={{ width: "100%", height: "100px", padding: "8px" }}
                        />
                    </>
                ) : (
                    <>
                        <p>{draft.address}</p>
                        <img src={draft.mapUrl} alt="Map" style={{ maxWidth: "100%", margin: "10px 0" }} />
                        <pre style={{ whiteSpace: "pre-line" }}>{draft.contact}</pre>
                    </>
                )}
            </div>

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