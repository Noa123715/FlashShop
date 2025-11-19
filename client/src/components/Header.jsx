import { useEffect } from "react";
import axios from "axios";
import AdminControls from "./AdminControls";
import { useAdminControl } from "../hooks/useAdminControl";

export default function Header() {
    const adminControls = useAdminControl({ logo: null }, "header");
    const { draft, updateDraft, editMode } = adminControls;

    useEffect(() => {
        axios.get("http://localhost:4000/api/page/header").then((res) => {
            adminControls.setPage(res.data);
            adminControls.setDraft(res.data);
        });
    }, []);

    const EditContent = (
        <>
            <label className="block mb-2 font-semibold">🔗 Logo URL:</label>
            <input
                type="text"
                value={draft.logo}
                onChange={(e) => updateDraft({ logo: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
            />
        </>
    );

    const ViewContent = (
        <div className="preview-content">
            <img
                src={draft.logo}
                alt="Flash Logo"
                style={{ maxWidth: "100%", marginBottom: "10px" }}
            />
        </div>
    );

    return (
        <div style={{ padding: "20px", maxWidth: 800, margin: "auto" }}>
                <AdminControls
                    editMode={editMode}
                    previewContent={EditContent}
                    adminControls={adminControls}
                >
                    {ViewContent}
                </AdminControls>
        </div>
    );
}
