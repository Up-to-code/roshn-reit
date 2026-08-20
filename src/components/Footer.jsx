import { useState, useEffect } from 'react'

function useIsMobile() {
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return mobile
}

export default function Footer() {
  const mobile = useIsMobile()
  return (
    <footer
      dir="rtl"
      style={{
        background: '#1B1815',
        padding: mobile ? '40px 5vw 24px' : '60px 8vw 32px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Top section */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(4, 1fr)',
            gap: mobile ? 28 : 40,
            paddingBottom: 40,
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <img src="/logo/logo.png" alt="ROSHN" style={{ height: 40, width: 40, objectFit: 'contain' }} />
              <img src="/logo/logo_world.png" alt="ROSHN" style={{ height: 18, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
            </div>
            <p
              style={{
                fontFamily: "'Saudi', sans-serif",
                fontSize: '0.85rem',
                color: '#fff',
                opacity: 0.4,
                lineHeight: 1.7,
                maxWidth: 260,
              }}
            >
              منصة روشن العقارية للاستثمار والتطوير في المملكة العربية السعودية
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4
              style={{
                fontFamily: "'Saudi', sans-serif",
                fontSize: '0.9rem',
                fontWeight: 700,
                color: '#fff',
                marginBottom: 20,
              }}
            >
              روابط سريعة
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['الرئيسية', 'العقارات', 'لوحة التحكم', 'من نحن'].map((link) => (
                <li key={link} style={{ marginBottom: 10 }}>
                  <a
                    href="#"
                    style={{
                      fontFamily: "'Saudi', sans-serif",
                      fontSize: '0.82rem',
                      color: '#fff',
                      opacity: 0.4,
                      textDecoration: 'none',
                      transition: 'opacity 0.3s',
                    }}
                    onMouseEnter={(e) => { e.target.style.opacity = '0.8' }}
                    onMouseLeave={(e) => { e.target.style.opacity = '0.4' }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              style={{
                fontFamily: "'Saudi', sans-serif",
                fontSize: '0.9rem',
                fontWeight: 700,
                color: '#fff',
                marginBottom: 20,
              }}
            >
              خدماتنا
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['إدارة العقارات', 'الاستشارات العقارية', 'التقييم', 'التطوير'].map((link) => (
                <li key={link} style={{ marginBottom: 10 }}>
                  <a
                    href="#"
                    style={{
                      fontFamily: "'Saudi', sans-serif",
                      fontSize: '0.82rem',
                      color: '#fff',
                      opacity: 0.4,
                      textDecoration: 'none',
                      transition: 'opacity 0.3s',
                    }}
                    onMouseEnter={(e) => { e.target.style.opacity = '0.8' }}
                    onMouseLeave={(e) => { e.target.style.opacity = '0.4' }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Social */}
          <div>
            <h4
              style={{
                fontFamily: "'Saudi', sans-serif",
                fontSize: '0.9rem',
                fontWeight: 700,
                color: '#fff',
                marginBottom: 20,
              }}
            >
              تواصل معنا
            </h4>
            <p
              style={{
                fontFamily: "'Saudi', sans-serif",
                fontSize: '0.82rem',
                color: '#fff',
                opacity: 0.4,
                marginBottom: 6,
                direction: 'ltr',
                textAlign: 'right',
              }}
            >
              info@roshn.sa
            </p>
            <p
              style={{
                fontFamily: "'Saudi', sans-serif",
                fontSize: '0.82rem',
                color: '#fff',
                opacity: 0.4,
                marginBottom: 24,
                direction: 'ltr',
                textAlign: 'right',
              }}
            >
              +966 12 345 6789
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: 12 }}>
              {/* Twitter / X */}
              <a href="#" style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                  <path d="M4 4l11.733 16h4.267l-11.733-16z" />
                  <path d="M4 20l6.768-6.768m2.46-2.46L20 4" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="#fff" stroke="none" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 24,
          }}
        >
          <p
            style={{
              fontFamily: "'Saudi', sans-serif",
              fontSize: '0.75rem',
              color: '#fff',
              opacity: 0.3,
            }}
          >
            © 2026 روشن. جميع الحقوق محفوظة
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['سياسة الخصوصية', 'الشروط والأحكام'].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  fontFamily: "'Saudi', sans-serif",
                  fontSize: '0.75rem',
                  color: '#fff',
                  opacity: 0.3,
                  textDecoration: 'none',
                  transition: 'opacity 0.3s',
                }}
                onMouseEnter={(e) => { e.target.style.opacity = '0.6' }}
                onMouseLeave={(e) => { e.target.style.opacity = '0.3' }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
