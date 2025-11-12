import { useEffect, useState } from "react";
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
            creditNote: "",
            contactAddress: "",
            contactPhone: "",
            contactEmail: "",
            contactInfo: "",
        },
        "footer"
    );
    const { draft, updateDraft, editMode } = adminControls;
    const [contactForm, setContactForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleContactFormChange = (field, value) => {
        setContactForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Contact form submitted:", contactForm);
    };

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
                <input
                    type="text"
                    value={draft.contactInfo}
                    onChange={(e) => updateDraft({ contactInfo: e.target.value })}
                    placeholder="Contact Information"
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                />
                <input
                    type="text"
                    value={draft.contactPhone}
                    onChange={(e) => updateDraft({ contactPhone: e.target.value })}
                    placeholder={draft.contactPhone}
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                />
                <input
                    type="email"
                    value={draft.contactEmail}
                    onChange={(e) => updateDraft({ contactEmail: e.target.value })}
                    placeholder={draft.contactEmail}
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                />
                <input
                    type="text"
                    value={draft.creditNote}
                    onChange={(e) => updateDraft({ creditNote: e.target.value })}
                    placeholder="Credit Note"
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                />
            </div>
        </>
    );

    const ViewContent = (
        <footer className="w-full bg-[#f2665e] py-16 px-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12" dir="rtl">
                <div className="sendANote" style={{ marginTop: "30px" }}>
                    <h2 className="text-2xl font-semibold text-white mb-6" style={{ fontFamily: 'Noto Sans Hebrew, sans-serif' }}>
                        {draft.noteTitle}
                    </h2>
                    <form
                        className="absolute top-[105px] right-[439px] w-[400px]"
                        onSubmit={handleSubmit}
                    >
                        <div className="relative mb-[8px]">
                            <input
                                type="text"
                                placeholder={draft.notePlaceholderName}
                                className="w-full h-10 bg-white/70 px-4 rounded text-[#f2665e] placeholder:text-[#f2665e]/70"
                                style={{ fontFamily: 'Noto Sans Hebrew, sans-serif' }}
                                onChange={(e) => handleContactFormChange("name", e.target.value)}
                            />
                        </div>
                        <div className="relative mb-[8px]">
                            <input
                                type="email"
                                placeholder={draft.notePlaceholderEmail}
                                className="w-full h-10 bg-white/70 px-4 rounded text-[#f2665e] placeholder:text-[#f2665e]/70"
                                style={{ fontFamily: 'Noto Sans Hebrew, sans-serif' }}
                                onChange={(e) => handleContactFormChange("email", e.target.value)}
                                aria-label="אימייל"
                            />
                        </div>
                        <div className="relative">
                            <textarea
                                placeholder={draft.notePlaceholderMessage}
                                className="w-full h-24 bg-white/70 px-4 py-2 rounded resize-none text-[#f2665e] placeholder:text-[#f2665e]/70"
                                style={{ fontFamily: 'Noto Sans Hebrew, sans-serif' }}
                                onChange={(e) => handleContactFormChange("message", e.target.value)}
                                aria-label="ההודעה שלי"
                            />
                        </div>
                        <button
                            className="bg-white text-[#f2665e] px-6 py-2 rounded hover:bg-gray-100 font-semibold transition-colors"
                            style={{ fontFamily: 'Noto Sans Hebrew, sans-serif' }}>
                            {draft.noteButtonText}
                        </button>
                    </form>
                </div>
                <div className="contactInfo" style={{ marginTop: "30px" }}>
                    <address className="absolute top-[72px] left-[461px] w-[357px] font-normal text-white text-base [font-family:'Noto_Sans_Hebrew',Helvetica] tracking-[0] leading-[normal] [direction:rtl] not-italic">{draft.contactAddress}</address>
                    <iframe
                        title="map"
                        src={`https://www.google.com/maps?q=${encodeURIComponent(draft.contactAddress)}&output=embed`}
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                    <p className="absolute top-[249px] left-[347px] w-[471px] [font-family:'Noto_Sans_Hebrew',Helvetica] font-normal text-white text-base tracking-[0] leading-[normal] [direction:rtl]">
                        {draft.contactInfo}
                        <a href="tel:0548486485" className="hover:underline">
                            {draft.contactPhone}
                        </a>
                        <br />
                        <a href="mailto:f486485@gmail.com" className="hover:underline">
                            {draft.contactEmail}
                        </a>
                    </p>
                    <p className="absolute top-[345px] left-1/2 -translate-x-1/2 w-[357px] font-normal text-white text-base text-center [font-family:'Noto_Sans_Hebrew',Helvetica] tracking-[0] leading-[normal] [direction:rtl]">
                        {draft.creditNote}
                    </p>
                </div>
            </div>
        </footer>
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