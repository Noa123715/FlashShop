const ViewContent = (
    <footer className="w-full bg-[#f2665e] py-14 px-8 text-white" dir="rtl" style={{ fontFamily: "'Noto Sans Hebrew', sans-serif" }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

            {/* טופס יצירת קשר */}
            <div className="sendANote">
                <h2 className="text-2xl font-semibold mb-4">{draft.noteTitle}</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder={draft.notePlaceholderName}
                        onChange={(e) => handleContactFormChange("name", e.target.value)}
                        className="w-full h-10 rounded px-4 text-[#f2665e] placeholder:text-[#f2665e] bg-white/80"
                    />
                    <input
                        type="email"
                        placeholder={draft.notePlaceholderEmail}
                        onChange={(e) => handleContactFormChange("email", e.target.value)}
                        className="w-full h-10 rounded px-4 text-[#f2665e] placeholder:text-[#f2665e] bg-white/80"
                    />
                    <textarea
                        placeholder={draft.notePlaceholderMessage}
                        onChange={(e) => handleContactFormChange("message", e.target.value)}
                        className="w-full h-24 rounded px-4 py-2 resize-none text-[#f2665e] placeholder:text-[#f2665e] bg-white/80"
                    />
                    <button className="bg-white text-[#f2665e] px-6 py-2 rounded hover:bg-gray-100 font-semibold transition-colors">
                        {draft.noteButtonText}
                    </button>
                </form>
            </div>

            {/* מידע ליצירת קשר + מפה */}
            <div className="contactInfo text-right">
                <iframe
                    title="map"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(draft.contactAddress)}&output=embed`}
                    height="250"
                    className="w-full rounded-md mb-4 border-0"
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>

                <p className="mb-2">{draft.contactAddress}</p>
                <p className="mb-2">
                    <a href={`tel:${draft.contactPhone}`} className="underline hover:text-gray-200">{draft.contactPhone}</a>
                </p>
                <p className="mb-2">
                    <a href={`mailto:${draft.contactEmail}`} className="underline hover:text-gray-200">{draft.contactEmail}</a>
                </p>
                <p className="text-sm mt-6 text-center opacity-90">{draft.creditNote}</p>
            </div>
        </div>
    </footer>
);
