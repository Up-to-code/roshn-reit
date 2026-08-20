import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const advantages = [
  { title: 'جودة لا تُضاهى', desc: 'نستخدم أفخم المواد وأحدث التقنيات في كل مشروع لضمان أعلى معايير الجودة.', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> },
  { title: 'تصميم عصري', desc: 'مشاريعنا بتصاميم معمارية فريدة تجمع بين الأناقة والعمليّة.', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg> },
  { title: 'موقع استراتيجي', desc: 'مشاريعنا في أفضل المواقع في جدة قرب الخدمات والمرافق الحيوية.', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg> },
  { title: 'خدمة ما بعد البيع', desc: 'فريق دعم متخصص جاهز لمساعدتك في أي وقت بعد تسليم المشروع.', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg> },
  { title: 'استثمار آمن', desc: 'مشاريعنا توفر عائد استثماري مجزي مع ضمان قيمة العقار على المدى الطويل.', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
  { title: 'شفافية تامة', desc: 'نلتزم بالشفافية الكاملة في جميع تعاملاتنا ونوفر كل المعلومات اللازمة لاتخاذ قرارك.', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
]

const testimonials = [
  { name: 'خالد العتيبي', text: 'تجربة ممتازة مع روشن. المشروع تم تسليمه في الوقت المحدد وبجودة عالية جداً.', rating: 5 },
  { name: 'نورة الشمري', text: 'أحب التصميم الداخلي والموقع المميز. أنصح الجميع بالتعامل مع روشن.', rating: 5 },
  { name: 'عبدالله القحطاني', text: 'استثمار ممتاز. قيمة العقار ارتفعت بشكل ملحوظ خلال سنة واحدة فقط.', rating: 5 },
]

export default function WhyUsPage() {
  const sectionRef = useRef(null)
  const heroRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current, { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' })
      gsap.from('.adv-card', {
        opacity: 0, y: 40, stagger: 0.08, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: contentRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div dir="rtl" style={{ minHeight: '100vh' }}>
      {/* Hero */}
      <div ref={heroRef} style={{ padding: '140px 8vw 60px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 32, height: 2, background: '#C8956C', borderRadius: 1 }} />
          <span style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.75rem', color: '#C8956C', fontWeight: 700, letterSpacing: 1 }}>لماذا روشن</span>
          <div style={{ width: 32, height: 2, background: '#C8956C', borderRadius: 1 }} />
        </div>
        <h1 style={{ fontFamily: "'Saudi', sans-serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: '#1B1815', marginBottom: 12 }}>
          لماذا تختارنا؟
        </h1>
        <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: 'clamp(0.85rem, 1.8vw, 1rem)', color: '#1B1815', opacity: 0.5, maxWidth: 600, margin: '0 auto', lineHeight: 1.8 }}>
          نقدم لك مزايا فريدة تجعل تجربتك معنا استثنائية من البداية إلى النهاية
        </p>
      </div>

      {/* Advantages grid */}
      <div ref={contentRef} style={{ maxWidth: 1200, margin: '0 auto', padding: '0 8vw 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 64 }}>
          {advantages.map((a, i) => (
            <div
              key={i}
              className="adv-card"
              style={{ padding: '28px 24px', background: '#F3F0EB', borderRadius: 14, cursor: 'default', transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.06)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(200,149,108,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                {a.icon}
              </div>
              <h3 style={{ fontFamily: "'Saudi', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#1B1815', marginBottom: 8 }}>{a.title}</h3>
              <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.82rem', color: '#1B1815', opacity: 0.5, lineHeight: 1.7 }}>{a.desc}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div style={{ marginBottom: 64 }}>
          <h2 style={{ fontFamily: "'Saudi', sans-serif", fontSize: '1.6rem', fontWeight: 700, color: '#1B1815', marginBottom: 8 }}>ماذا يقول عملاؤنا</h2>
          <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.85rem', color: '#1B1815', opacity: 0.45, marginBottom: 32 }}>تجارب حقيقية من عملاء راضين</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ padding: '24px 20px', background: '#F3F0EB', borderRadius: 14 }}>
                <div style={{ display: 'flex', gap: 2, marginBottom: 12 }}>
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <svg key={si} width="14" height="14" viewBox="0 0 24 24" fill="#C8956C" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.82rem', color: '#1B1815', opacity: 0.6, lineHeight: 1.7, marginBottom: 14 }}>{t.text}</p>
                <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.78rem', fontWeight: 700, color: '#1B1815' }}>{t.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: '#1B1815', borderRadius: 16, padding: '48px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <svg style={{ position: 'absolute', top: 20, left: 30, opacity: 0.04 }} width="160" height="160" viewBox="0 0 140 140" fill="none" stroke="#C8956C" strokeWidth="0.8">
            <circle cx="70" cy="70" r="60" /><circle cx="70" cy="70" r="40" /><circle cx="70" cy="70" r="20" />
          </svg>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontFamily: "'Saudi', sans-serif", fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: 12 }}>جاهز لبدء رحلتك العقارية؟</h2>
            <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.88rem', color: '#fff', opacity: 0.5, marginBottom: 24 }}>تواصل معنا اليوم ودعنا نساعدك في إيجاد المنزل المثالي</p>
            <Link to="/contact" style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.85rem', fontWeight: 700, color: '#1B1815', background: '#C8956C', border: 'none', borderRadius: 8, padding: '12px 32px', cursor: 'pointer', textDecoration: 'none', display: 'inline-block', transition: 'all 0.3s' }}>
              تواصل معنا
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
