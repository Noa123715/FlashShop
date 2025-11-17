import { useEffect } from "react";
import axios from "axios";
import AdminControls from "./AdminControls.jsx";
import { useLocation } from "react-router-dom";
import { useAdminControl } from "../hooks/useAdminControl.jsx";

export default function AboutPage() {
    const isAdmin = localStorage.getItem("admin");
    const adminControls = useAdminControl({ content: "", image1: "" }, "about");
    const { draft, updateDraft, editMode, previewMode } = adminControls;
    const location = useLocation();
    const tip = location.state?.tip;

    if (!tip) {
        return <div>טיפ לא נמצא</div>;
    }
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <img src={tip.img} alt={tip.title} className="w-full h-96 object-cover rounded-lg mb-6" />
            <h1 className="text-5xl font-bold mb-4">{tip.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{tip.summary}</p>
            <p className="text-lg text-gray-700 leading-relaxed">{tip.content}</p>
        </div>
    );
    // const EditContent = (
    //     <div className="p-8 bg-white">
    //         <textarea
    //             className="w-full h-64 p-4 border border-gray-300 rounded mb-4"
    //             value={draft.content}
    //             onChange={(e) => updateDraft({ content: e.target.value })}
    //         />
    //         <label className="block mb-2 font-semibold">🔗 Main Image URL:</label>
    //         <input
    //             className="w-full p-2 border border-gray-300 rounded"
    //             type="text"
    //             value={draft.image1}
    //             onChange={(e) => updateDraft({ image1: e.target.value })}
    //         />
    //     </div>
    // );

    // const ViewContent = (
    //     <div className="w-full">
    //         <p>{draft.content}</p>
    //         <img
    //             src={draft.image1}
    //             alt="Flash main"
    //         />
    //     </div>
    // );

    // console.log("isAdmin:", isAdmin);
    // return (
    //     <div style={{ padding: "20px", maxWidth: 800, margin: "auto" }}>
    //         {/* Admin Controls */}
    //         {isAdmin && (
    //             <AdminControls
    //                 isAdmin={isAdmin}
    //                 editMode={editMode}
    //                 previewContent={EditContent}
    //                 adminControls={adminControls}
    //             >
    //                 {ViewContent}
    //             </AdminControls>
    //         )}
    //     </div>
    // );
}
