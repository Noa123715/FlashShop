import React, { useState } from "react";

export default function Footer() {
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

  return (
    <footer className="w-full h-[390px] bg-[#f2665e] relative">
      <h2 className="absolute top-[72px] right-[397px] w-[357px] font-semibold text-white text-xl [font-family:'Noto_Sans_Hebrew',Helvetica] tracking-[0] leading-[normal] [direction:rtl]">
        דברו איתנו
      </h2>

      <p className="absolute top-[345px] left-1/2 -translate-x-1/2 w-[357px] font-normal text-white text-base text-center [font-family:'Noto_Sans_Hebrew',Helvetica] tracking-[0] leading-[normal] [direction:rtl]">
        כל הזכויות שמורות למיכל וינר. קרדיט עיצוב ובנייה
      </p>

      <address className="absolute top-[72px] left-[461px] w-[357px] font-normal text-white text-base [font-family:'Noto_Sans_Hebrew',Helvetica] tracking-[0] leading-[normal] [direction:rtl] not-italic">
        דרך מרן 15 קומה 4 . נוף כנרת פוריה
      </address>

      <p className="absolute top-[249px] left-[347px] w-[471px] [font-family:'Noto_Sans_Hebrew',Helvetica] font-normal text-white text-base tracking-[0] leading-[normal] [direction:rtl]">
        שעות פעילות: ימים א-ד 20:30-22:30 בוקר וימי חמישי בתאום מראש <br />
        <a href="tel:0548486485" className="hover:underline">
          054-8486485
        </a>
        <br />
        <a href="mailto:F486485@gmail.com" className="hover:underline">
          F486485@gmail.com
        </a>
      </p>

      <form
        className="absolute top-[105px] right-[439px] w-[400px]"
        onSubmit={handleSubmit}
      >
        <div className="relative mb-[8px]">
          <input
            type="text"
            value={contactForm.name}
            onChange={(e) => handleContactFormChange("name", e.target.value)}
            className="w-full h-9 bg-[#ffffffab] px-4 [font-family:'Noto_Sans_Hebrew',Helvetica] font-normal text-[#f2665e] text-base tracking-[0] leading-[normal] [direction:rtl]"
            placeholder="קוראים לי"
            aria-label="שם"
          />
        </div>

        <div className="relative mb-[8px]">
          <input
            type="email"
            value={contactForm.email}
            onChange={(e) => handleContactFormChange("email", e.target.value)}
            className="w-full h-9 bg-[#ffffffab] px-4 [font-family:'Noto_Sans_Hebrew',Helvetica] font-normal text-[#f2665e] text-base tracking-[0] leading-[normal] [direction:rtl]"
            placeholder="המייל שלי"
            aria-label="אימייל"
          />
        </div>

        <div className="relative">
          <textarea
            value={contactForm.message}
            onChange={(e) =>
              handleContactFormChange("message", e.target.value)
            }
            className="w-full h-[87px] bg-[#ffffffab] px-4 py-2 resize-none [font-family:'Noto_Sans_Hebrew',Helvetica] font-normal text-[#f2665e] text-base tracking-[0] leading-[normal] [direction:rtl]"
            placeholder="רוצה לדבר אתכם על"
            aria-label="הודעה"
          />
        </div>
      </form>

      <img
        className="absolute top-[105px] left-[439px] w-[400px] h-[136px]"
        alt="Image"
        src="https://c.animaapp.com/ssXwMPGd/img/image-1@2x.png"
      />

      <img
        className="absolute w-0 h-0 top-[93.60%] left-[43.12%]"
        alt="Group"
        src="https://c.animaapp.com/ssXwMPGd/img/group-1@2x.png"
      />

      <img
        className="absolute w-0 h-0 top-[95.67%] left-[43.07%]"
        alt="Vector"
        src="https://c.animaapp.com/ssXwMPGd/img/vector-4.svg"
      />

      <img
        className="absolute w-0 h-0 top-[94.63%] left-[43.12%]"
        alt="Vector"
        src="https://c.animaapp.com/ssXwMPGd/img/vector-5.svg"
      />

      <img
        className="absolute w-0 h-0 top-[85.36%] left-[43.07%]"
        alt="Group"
        src="https://c.animaapp.com/ssXwMPGd/img/group-2@2x.png"
      />
    </footer>
  );
}