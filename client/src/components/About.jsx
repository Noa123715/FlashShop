import { useEffect } from "react";
import axios from "axios";
import AdminControls from "./AdminControls.jsx";
import { useAdminControl } from "../hooks/useAdminControl.jsx";
import { useParams } from "react-router-dom";
import { useTipsStore } from "../store/tipsStore";

export default function AboutPage() {
    const isAdmin = localStorage.getItem("admin");
    const adminControls = useAdminControl({ content: "", image1: "" }, "about");
    const { draft, updateDraft, editMode, previewMode } = adminControls;
    const { id } = useParams();
    const { currentTip, tipsList } = useTipsStore();

    const tip = currentTip || tipsList.find(t => t._id === id);

    if (!tip) return <p>טוען...</p>;
    return (
        <div className="container mx-auto px-4 py-12">
            <img src={tip.img} alt={tip.title} className="w-full h-80 object-cover rounded-xl" />
            <h1 className="text-4xl font-bold mt-6 mb-4">{tip.title}</h1>
            <p className="text-lg leading-relaxed">{tip.content}</p>
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
