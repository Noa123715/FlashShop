import { useEffect } from "react";
import axios from "axios";
import AdminControls from "./AdminControls";
import { useAdminControl } from "../hooks/useAdminControl";

export default function AboutPage() {
    // Check admin status from localStorage - need to fix that
    const isAdmin = localStorage.getItem("admin");
    const adminControls = useAdminControl({ content: "", image1: "" }, "about");
    const { draft, updateDraft, editMode, previewMode } = adminControls;

    useEffect(() => {
        axios.get("http://localhost:4000/api/page/about").then((res) => {
            adminControls.setPage(res.data);
            adminControls.setDraft(res.data);
        });
    }, []);

    const EditContent = (
        <>
            <textarea
                style={{ width: "100%", height: "250px" }}
                value={draft.content}
                onChange={(e) => updateDraft({ content: e.target.value })}
            />
            <label>🔗 Main Image URL:</label>
            <input
                type="text"
                value={draft.image1}
                onChange={(e) => updateDraft({ image1: e.target.value })}
                style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            />
        </>
    );

    const ViewContent = (
        <div className="preview-content">
            <p style={{ whiteSpace: "pre-line" }}>{draft.content}</p>
            <img
                src={draft.image1}
                alt="Flash main"
                style={{ marginTop: "20px", maxWidth: "100%" }}
            />
        </div>
    );

    console.log("isAdmin:", isAdmin);
    return (
        <div style={{ padding: "20px", maxWidth: 800, margin: "auto" }}>
            {/* Admin Controls */}
            {isAdmin && (
                <AdminControls
                    isAdmin={isAdmin}
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
