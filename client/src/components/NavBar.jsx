import React from 'react'

export default function NavBar() {
    return (
        <nav
            className="w-full bg-white shadow-sm"
            aria-label="תפריט ראשי"
            style={{ borderBottom: '1px solid #e5e7eb' }}
        >
            <ul 
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '32px',
                    padding: '16px 32px',
                    margin: 0,
                    listStyle: 'none',
                    direction: 'rtl'
                }}
            >
                <li style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                    <a href="#products" style={{
                        color: '#f2665e',
                        fontFamily: 'Noto Sans Hebrew, sans-serif',
                        fontSize: '16px',
                        fontWeight: 'normal',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.3s ease'
                    }} 
                    onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                    >
                        מוצרים
                    </a>
                </li>
                <li style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                    <a href="#photo-development" style={{
                        color: '#f2665e',
                        fontFamily: 'Noto Sans Hebrew, sans-serif',
                        fontSize: '16px',
                        fontWeight: 'normal',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                    >
                        פיתוח תמונות
                    </a>
                </li>
                <li style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                    <a href="#blog" style={{
                        color: '#f2665e',
                        fontFamily: 'Noto Sans Hebrew, sans-serif',
                        fontSize: '16px',
                        fontWeight: 'normal',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                    >
                        בלוג
                    </a>
                </li>
                <li style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                    <a href="#club" style={{
                        color: '#f2665e',
                        fontFamily: 'Noto Sans Hebrew, sans-serif',
                        fontSize: '16px',
                        fontWeight: 'normal',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                    >
                        תקנון הצטרפות למועדון
                    </a>
                </li>
                <li style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                    <a href="#catalog" style={{
                        color: '#f2665e',
                        fontFamily: 'Noto Sans Hebrew, sans-serif',
                        fontSize: '16px',
                        fontWeight: 'normal',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                    >
                        קטלוג
                    </a>
                </li>
            </ul>
        </nav>
    )
}

