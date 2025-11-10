import { useEffect } from "react";
import axios from "axios";
import AdminControls from "./AdminControls";
import { useAdminControl } from "../hooks/useAdminControl";

export default function Footer() {
    const isAdmin = localStorage.getItem("admin");
    const adminControls = useAdminControl(
        {
            noteTitle: "",
            notePlaceholderName: "",
            notePlaceholderEmail: "",
            notePlaceholderMessage: "",
            noteButtonText: "",
            contactAddress: "",
            contactMap: "",
            contactInfo: "",
        },
        "footer"
    );

    const { draft, updateDraft, editMode } = adminControls;

    useEffect(() => {
        axios.get("http://localhost:4000/api/page/footer").then((res) => {
            adminControls.setPage(res.data);
            adminControls.setDraft(res.data);
        });
    }, []);

    const EditContent = (
        <>
            <div className="sendANote">
                <input
                    type="text"
                    value={draft.noteTitle}
                    onChange={(e) => updateDraft({ noteTitle: e.target.value })}
                    placeholder="Note Title"
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                />
                <input
                    type="text"
                    value={draft.notePlaceholderName}
                    onChange={(e) => updateDraft({ notePlaceholderName: e.target.value })}
                    placeholder="Name Placeholder"
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                />
                <input
                    type="text"
                    value={draft.notePlaceholderEmail}
                    onChange={(e) => updateDraft({ notePlaceholderEmail: e.target.value })}
                    placeholder="Email Placeholder"
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                />
                <input
                    type="text"
                    value={draft.notePlaceholderMessage}
                    onChange={(e) => updateDraft({ notePlaceholderMessage: e.target.value })}
                    placeholder="Message Placeholder"
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                />
            </div>
            <div className="contactInfo" style={{ marginTop: "30px" }}>
                <input
                    type="text"
                    value={draft.contactAddress}
                    onChange={(e) => updateDraft({ contactAddress: e.target.value })}
                    placeholder="Contact Address"
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                />
                <label>🔗 Map Image URL:</label>
                <input
                    type="text"
                    value={draft.contactMap}
                    onChange={(e) => updateDraft({ contactMap: e.target.value })}
                    placeholder="Map URL"
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                />
                <textarea
                    value={draft.contactInfo}
                    onChange={(e) => updateDraft({ contactInfo: e.target.value })}
                    placeholder="Contact Information"
                    style={{ width: "100%", height: "100px", padding: "8px" }}
                />
            </div>
        </>
    );

    const ViewContent = (
        <div className="preview-content">
            <div className="sendANote" style={{ marginTop: "30px" }}>
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
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    {draft.noteButtonText}
                </button>
            </div>
            <div className="contactInfo" style={{ marginTop: "30px" }}>
                <p>{draft.contactAddress}</p>
                <img
                    src={draft.contactMap}
                    alt="Map"
                    style={{ maxWidth: "100%", margin: "10px 0" }}
                />
                <pre style={{ whiteSpace: "pre-line" }}>{draft.contactInfo}</pre>
            </div>
        </div>
    );

    return (
        <div style={{ padding: "20px", maxWidth: 800, margin: "auto" }}>
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

// to add map iframe back in future:
{/* <iframe
    title="map"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54448.84212075103!2d34.74724735!3d32.08088095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4ca6193b7c1f%3A0xc1fb72a2c0963f90!2z16rXnCDXkNeb15nXkSwg15rXqNeZ15A!5e0!3m2!1siw!2sil!4v1234567890"
    width="100%"
    height="300"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
></iframe> */}