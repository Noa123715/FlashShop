import React from 'react'

export default function Nav() {
    return (
        <nav
            className="absolute top-[35px] left-[591px] w-[740px] h-7"
            aria-label="תפריט ראשי"
        >
            <ul className="top-0 left-0 w-[738px] font-normal text-[#f2665e] text-base text-center absolute [font-family:'Noto_Sans_Hebrew',Helvetica] tracking-[0] leading-[normal] [direction:rtl] list-none flex justify-between">
                <li>
                    <a href="#products" className="hover:underline">
                        מוצרים
                    </a>
                </li>
                <li>
                    <a href="#photo-development" className="hover:underline">
                        פיתוח תמונות
                    </a>
                </li>
                <li>
                    <a href="#blog" className="hover:underline">
                        בלוג
                    </a>
                </li>
                <li>
                    <a href="#club" className="hover:underline">
                        הצטרפות למועדון
                    </a>
                </li>
                <li>
                    <a href="#catalog" className="hover:underline">
                        קטלוג
                    </a>
                </li>
            </ul>

            <img
                className="absolute w-0 h-[47.74%] top-[52.26%] left-[24.42%]"
                alt="Vector"
                src="https://c.animaapp.com/ssXwMPGd/img/vector-7.svg"
            />
        </nav>)
}

 