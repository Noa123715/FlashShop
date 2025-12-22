import { useEffect, useState } from "react";
import { FaClock, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { sendMessageRequest } from "../api/messages";
import { getPage } from "../api/pages";
import AdminControls from "./AdminControls";
import { useAdminControl } from "../hooks/useAdminControl";

export default function Footer() {
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
    const [sending, setSending] = useState(false);
    const [statusMsg, setStatusMsg] = useState(null);
    
    // מצב חדש לשליטה על הצגת הטופס במובייל
    const [showMobileForm, setShowMobileForm] = useState(false);

    const handleContactFormChange = (field, value) => {
        setContactForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!contactForm.name?.trim() || !contactForm.email?.trim() || !contactForm.message?.trim()) {
            setStatusMsg({ type: 'error', text: 'מלא/י שם, אימייל והודעה.' });
            return;
        }
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(contactForm.email)) {
            setStatusMsg({ type: 'error', text: 'כתובת אימייל לא תקינה.' });
            return;
        }

        try {
            setSending(true);
            setStatusMsg(null);
            const res = await sendMessageRequest(contactForm)
            console.log(res)
            if (res.ok ) {
                setStatusMsg({ type: 'success', text: 'ההודעה נשלחה בהצלחה. תודה!' });
                setContactForm({ name: '', email: '', message: '' });
                // סגירת הטופס במובייל לאחר שליחה מוצלחת (אופציונלי)
                setTimeout(() => setShowMobileForm(false), 2000);
            } else {
                setStatusMsg({ type: 'error', text: 'אירעה שגיאה בשליחת ההודעה.' });
            }
        } catch (err) {
            console.error('contact send error', err);
            setStatusMsg({ type: 'error', text: 'שגיאה ברשת או בשרת.' });
        } finally {
            setSending(false);
        }
    };

    const formatPhoneForLink = (phone) => {
        if (!phone) return "";
        return phone.replace(/[^+\d]/g, "");
    };

    const formatEmailForLink = (email) => {
        if (!email) return "";
        return encodeURIComponent(email);
    };

    useEffect(() => {
        getPage("footer").then((data) => {
            adminControls.setPage(data);
            adminControls.setDraft(data);
        });
    }, []);

    const EditContent = (
        <div className="bg-white p-4 rounded text-black space-y-2">
            <input type="text" value={draft.noteTitle} onChange={(e) => updateDraft({ noteTitle: e.target.value })} className="border p-1 w-full" placeholder="כותרת טופס" />
            <input type="text" value={draft.contactAddress} onChange={(e) => updateDraft({ contactAddress: e.target.value })} className="border p-1 w-full" placeholder="כתובת" />
            <input type="text" value={draft.contactInfo} onChange={(e) => updateDraft({ contactInfo: e.target.value })} className="border p-1 w-full" placeholder="שעות פעילות" />
            <input type="text" value={draft.contactPhone} onChange={(e) => updateDraft({ contactPhone: e.target.value })} className="border p-1 w-full" placeholder="טלפון" />
            <input type="text" value={draft.contactEmail} onChange={(e) => updateDraft({ contactEmail: e.target.value })} className="border p-1 w-full" placeholder="אימייל" />
            <input type="text" value={draft.creditNote} onChange={(e) => updateDraft({ creditNote: e.target.value })} className="border p-1 w-full" placeholder="קרדיט" />
        </div>
    );

    const ViewContent = (
        <footer className="w-full bg-[#f2665e] py-6 px-4 sm:px-8 text-white mt-auto">
            <div className="max-w-screen-xl mx-auto flex flex-col md:grid md:grid-cols-2 gap-6 items-start" dir="rtl">

                {/* חלק פרטי קשר - מוצג תמיד */}
                <div className="w-full flex flex-col items-center md:items-start text-center md:text-right order-1 md:order-2">
                    {/* המפה מוסתרת במובייל ומוצגת רק ב-md ומעלה */}
                    <iframe
                        title="map"
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(draft.contactAddress)}&output=embed&t=m`}
                        height="110"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        className="hidden md:block w-full max-w-[260px] mx-auto md:mx-0 mb-3 rounded shadow-md opacity-90"
                    ></iframe>
                    
                    <address className="font-normal text-sm [font-family:'Noto_Sans_Hebrew',Helvetica] not-italic mb-2 flex items-center justify-center md:justify-start">
                        <FaMapMarkerAlt className="inline-block w-3 h-3 ml-2" />
                        {draft.contactAddress}
                    </address>

                    <div className="font-normal text-sm tracking-[0] leading-[normal] mb-2">
                        <span className="flex items-center justify-center md:justify-start mb-1">
                            <FaClock className="inline-block w-3 h-3 ml-2" />
                            <span>{draft.contactInfo}</span>
                        </span>
                        
                        <div className="flex flex-col gap-1 mt-1">
                            <a href={`tel:${formatPhoneForLink(draft.contactPhone)}`} className="hover:underline flex items-center justify-center md:justify-start">
                                <FaPhoneAlt className="inline-block w-3 h-3 ml-2" />
                                {draft.contactPhone}
                            </a>

                            <a href={`mailto:${formatEmailForLink(draft.contactEmail)}`} className="hover:underline flex items-center justify-center md:justify-start">
                                <FaEnvelope className="inline-block w-3 h-3 ml-2" />
                                {draft.contactEmail}
                            </a>
                        </div>
                    </div>
                </div>

                {/* חלק הטופס - במובייל נפתח מכפתור */}
                <div className="sendANote w-full md:pr-8 order-2 md:order-1">
                    {/* כפתור "דברו איתנו" - מוצג רק במובייל */}
                    <button 
                        onClick={() => setShowMobileForm(!showMobileForm)}
                        className="md:hidden w-full bg-white text-[#f2665e] py-2 rounded-lg font-bold mb-4 shadow-sm"
                    >
                        {showMobileForm ? "סגור טופס" : "דברו איתנו"}
                    </button>

                    {/* הטופס עצמו - מוסתר במובייל אלא אם לחצו על הכפתור, מוצג תמיד ב-Desktop */}
                    <div className={`${showMobileForm ? 'block' : 'hidden'} md:block transition-all duration-300`}>
                        <h2 dir="rtl" className="text-lg font-semibold mb-2 text-right md:block hidden" style={{ fontFamily: 'Noto Sans Hebrew, sans-serif' }}>
                            {draft.noteTitle}
                        </h2>
                        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder={draft.notePlaceholderName}
                                value={contactForm.name}
                                className="w-full h-8 bg-white/70 px-3 rounded text-[#f2665e] placeholder:text-[#f2665e]/70 text-right text-sm outline-none focus:bg-white"
                                onChange={(e) => handleContactFormChange("name", e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder={draft.notePlaceholderEmail}
                                value={contactForm.email}
                                className="w-full h-8 bg-white/70 px-3 rounded text-[#f2665e] placeholder:text-[#f2665e]/70 text-right text-sm outline-none focus:bg-white"
                                onChange={(e) => handleContactFormChange("email", e.target.value)}
                            />
                            <textarea
                                placeholder={draft.notePlaceholderMessage}
                                value={contactForm.message}
                                className="w-full h-16 bg-white/70 px-3 py-2 rounded resize-none text-[#f2665e] placeholder:text-[#f2665e]/70 text-right text-sm outline-none focus:bg-white"
                                onChange={(e) => handleContactFormChange("message", e.target.value)}
                            />
                            {statusMsg && (
                                <div className={`text-xs ${statusMsg.type === 'error' ? 'text-red-200' : 'text-green-200'}`}>
                                    {statusMsg.text}
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={sending}
                                className="bg-white text-[#f2665e] px-6 py-2 rounded hover:bg-gray-100 font-semibold transition-colors">
                                {sending ? 'שולח...' : 'שלח'}
                            </button>
                        </form>
                    </div>
                </div>

            </div>
            <p className="w-full text-center font-normal text-xs tracking-[0] mt-4 pt-3 border-t border-white/20 opacity-80">
                © {draft.creditNote}
            </p>
        </footer>
    );

    return (
        <AdminControls
            editMode={editMode}
            previewContent={EditContent}
            adminControls={adminControls}
        >
            {ViewContent}
        </AdminControls>
    );
}