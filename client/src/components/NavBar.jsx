import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
        <nav
            className="w-full bg-white shadow-sm"
            aria-label="תפריט ראשי"
        >
            <ul>
                <li>
                    <Link to="/home"
                    onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                    >
                        מוצרים
                    </Link>
                </li>
                <li>
                    <Link to="/home"
                    onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                    >
                        פיתוח תמונות
                    </Link>
                </li>
                <li>
                    <Link to="/about"
                    onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                    >
                        בלוג
                    </Link>
                </li>
                <li>
                    <Link to="/terms"
                    onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                    >
                         הצטרפות למועדון
                    </Link>
                </li>
                <li>
                    <Link to="/tips"
                    onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                    >
                        טיפים לצילום
                    </Link>
                </li>
            </ul>
        </nav>
    )
}