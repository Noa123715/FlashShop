import { useEffect } from "react";
import axios from "axios";
import AdminControls from "../components/AdminControls.jsx";
import { useAdminControl } from "../hooks/useAdminControl.jsx";

export default function Tips() {
    const isAdmin = localStorage.getItem("admin");
    const adminControls = useAdminControl({ title: "", img: "" }, "tips");
    const { draft, updateDraft, editMode, previewMode } = adminControls;

    useEffect(() => {
        axios.get("http://localhost:4000/api/page/tips").then((res) => {
            adminControls.setPage(res.data);
            adminControls.setDraft(res.data);
        });

        // axios.get("http://localhost:4000/api/page/tips").then((res) => {
        //     adminControls.setPage(res.data);
        //     adminControls.setDraft(res.data);
        // });
    }, []);

    const EditContent = (
        <div className="p-8 bg-white">
            <input
                className="w-full h-64 p-4 border border-gray-300 rounded mb-4"
                value={draft.title}
                onChange={(e) => updateDraft({ title: e.target.value })}
            />
            <label className="block mb-2 font-semibold">🔗 Main Image URL:</label>
            <input
                className="w-full p-2 border border-gray-300 rounded"
                type="text"
                value={draft.img}
                onChange={(e) => updateDraft({ img: e.target.value })}
            />
        </div>
    );

    const ViewContent = (
        <div className="w-full">
            <h2>{draft.title}</h2>
            <img
                src={draft.img}
                alt="main image"
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