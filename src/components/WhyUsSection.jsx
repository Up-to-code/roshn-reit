import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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

const features = [
  {
    id: 1,
    title: 'خبرة عقارية',
    desc: 'أكثر من 15 عاماً من الخبرة في السوق العقاري السعودي',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'موقع استراتيجي',
    desc: 'عقارات في أفضل المواقع في جدة والمدن الكبرى',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'استثمار آمن',
    desc: 'فرص استثمارية موثوقة مع عوائد مجزية على المدى الطويل',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'تصميم عصري',
    desc: 'تصميم داخلي مستوحى من أحدث التوجهات العالمية مع لمسة عربية',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
]

const bgSvgs = [
  // Building
  <svg key="b" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.06">
    <rect x="4" y="2" width="16" height="20" rx="1" />
    <line x1="8" y1="6" x2="8" y2="6.01" />
    <line x1="12" y1="6" x2="12" y2="6.01" />
    <line x1="16" y1="6" x2="16" y2="6.01" />
    <line x1="8" y1="10" x2="8" y2="10.01" />
    <line x1="12" y1="10" x2="12" y2="10.01" />
    <line x1="16" y1="10" x2="16" y2="10.01" />
    <line x1="8" y1="14" x2="8" y2="14.01" />
    <line x1="12" y1="14" x2="12" y2="14.01" />
    <line x1="16" y1="14" x2="16" y2="14.01" />
    <rect x="10" y="18" width="4" height="4" />
  </svg>,
  // Circle
  <svg key="c" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.05">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>,
  // Diamond
  <svg key="d" width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.06">
    <polygon points="12 2 22 12 12 22 2 12" />
    <polygon points="12 6 18 12 12 18 6 12" />
  </svg>,
  // Lines
  <svg key="l" width="140" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.04">
    <line x1="2" y1="4" x2="22" y2="4" />
    <line x1="2" y1="8" x2="22" y2="8" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="2" y1="16" x2="22" y2="16" />
    <line x1="2" y1="20" x2="22" y2="20" />
  </svg>,
]

const variants = {
  default: {
    bg: '#F3F0EB',
    iconBg: 'rgba(200,149,108,0.1)',
    iconColor: '#C8956C',
    titleColor: '#1B1815',
    descColor: '#1B1815',
    descOpacity: 0.5,
    svgColor: '#1B1815',
  },
  dark: {
    bg: '#1B1815',
    iconBg: 'rgba(200,149,108,0.15)',
    iconColor: '#C8956C',
    titleColor: '#fff',
    descColor: '#fff',
    descOpacity: 0.5,
    svgColor: '#fff',
  },
  darkInner: {
    bg: '#1B1815',
    iconBg: '#2A2520',
    iconColor: '#C8956C',
    titleColor: '#fff',
    descColor: '#fff',
    descOpacity: 0.4,
    svgColor: '#fff',
  },
}

function WhyCard({ feature, variant, gridStyle, cardRef }) {
  const v = variants[variant]

  return (
    <div
      ref={cardRef}
      className="why-card"
      style={{
        ...gridStyle,
        borderRadius: 16,
        background: v.bg,
        padding: 36,
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Floating SVGs */}
      <div
        className="floating-svg svg-1"
        style={{ position: 'absolute', top: -10, right: -10, color: v.svgColor }}
      >
        {bgSvgs[0]}
      </div>
      <div
        className="floating-svg svg-2"
        style={{ position: 'absolute', bottom: -15, left: -15, color: v.svgColor }}
      >
        {bgSvgs[1]}
      </div>
      <div
        className="floating-svg svg-3"
        style={{ position: 'absolute', top: '40%', right: '20%', color: v.svgColor }}
      >
        {bgSvgs[2]}
      </div>
      <div
        className="floating-svg svg-4"
        style={{ position: 'absolute', bottom: '20%', left: '10%', color: v.svgColor }}
      >
        {bgSvgs[3]}
      </div>

      {/* Icon */}
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 16,
          background: v.iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 24,
          color: v.iconColor,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {feature.icon}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Saudi', sans-serif",
          fontSize: '1.25rem',
          fontWeight: 700,
          color: v.titleColor,
          marginBottom: 10,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {feature.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "'Saudi', sans-serif",
          fontSize: '0.88rem',
          color: v.descColor,
          opacity: v.descOpacity,
          lineHeight: 1.7,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {feature.desc}
      </p>
    </div>
  )
}

export default function WhyUsSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const cardsRef = useRef([])
  const mobile = useIsMobile()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })

      cardsRef.current.filter(Boolean).forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        })
      })

      // Animate floating SVGs
      document.querySelectorAll('.floating-svg').forEach((svg) => {
        gsap.to(svg, {
          y: gsap.utils.random(-8, 8),
          x: gsap.utils.random(-5, 5),
          duration: gsap.utils.random(3, 5),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      dir="rtl"
      style={{ padding: mobile ? '50px 5vw' : '80px 8vw' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div ref={titleRef} style={{ marginBottom: 48 }}>
          <h2
            style={{
              fontFamily: "'Saudi', sans-serif",
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 700,
              color: '#1B1815',
              marginBottom: 12,
            }}
          >
            لماذا نحن
          </h2>
          <p
            style={{
              fontFamily: "'Saudi', sans-serif",
              fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
              color: '#1B1815',
              opacity: 0.6,
            }}
          >
            نقدم لك أفضل الفرص العقارية في المملكة
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)',
            gridTemplateRows: mobile ? 'auto' : '320px 320px',
            gap: mobile ? 16 : 24,
          }}
        >
          <WhyCard feature={features[0]} variant="default" gridStyle={{ gridColumn: mobile ? 'span 1' : 'span 2' }} cardRef={(el) => { cardsRef.current[0] = el }} />
          <WhyCard feature={features[1]} variant="dark" gridStyle={{ gridColumn: 'span 1' }} cardRef={(el) => { cardsRef.current[1] = el }} />
          <WhyCard feature={features[2]} variant="darkInner" gridStyle={{ gridColumn: 'span 1' }} cardRef={(el) => { cardsRef.current[2] = el }} />
          <WhyCard feature={features[3]} variant="default" gridStyle={{ gridColumn: mobile ? 'span 1' : 'span 2' }} cardRef={(el) => { cardsRef.current[3] = el }} />
        </div>
      </div>

      {/* Footer section */}
      <div
        style={{
          maxWidth: 1200,
          margin: '80px auto 0',
          textAlign: 'center',
          padding: '60px 0',
          borderTop: '1px solid rgba(27,24,21,0.08)',
        }}
      >
        <h3
          style={{
            fontFamily: "'Saudi', sans-serif",
            fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
            fontWeight: 700,
            color: '#1B1815',
            marginBottom: 12,
          }}
        >
          ابدأ رحلتك العقارية معنا
        </h3>
        <p
          style={{
            fontFamily: "'Saudi', sans-serif",
            fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)',
            color: '#1B1815',
            opacity: 0.5,
          }}
        >
          تواصل معنا اليوم لاكتشاف أفضل الفرص العقارية
        </p>
      </div>

      <style>{`
        .why-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.1);
        }
        .why-card:hover > div:first-child {
          transform: scale(1.05);
        }
        .floating-svg {
          pointer-events: none;
          transition: opacity 0.4s;
        }
      `}</style>
    </section>
  )
}
