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

const projects = [
  { id: 1, name: 'أبراج روشن السكنية', location: 'جدة', price: '1,200,000', area: '185 م²', desc: 'مجمع سكني فاخر يطل على كورنيش جدة', tag: 'جديد', features: ['3 غرف', '2 حمامات', 'مطبخ', 'شرفة', 'موقف'], img: '/assts/Projects.png' },
  { id: 2, name: 'بنتهاوس الواحة', location: 'جدة', price: '3,500,000', area: '320 م²', desc: 'بنتهاوس فاخر', tag: 'حصري', features: ['5 غرف', 'مسبح', 'حديقة'], img: '/assts/Project2.png' },
  { id: 3, name: 'دوبلكس النخبة', location: 'جدة', price: '2,100,000', area: '240 م²', desc: 'دوبلكس بتصميم معماري استثنائي', tag: 'مميز', features: ['4 غرف', 'جاكوزي', 'صالة'], img: '/assts/Project3.png' },
  { id: 4, name: 'شقة الميناء', location: 'جدة', price: '1,800,000', area: '160 م²', desc: 'شقة ساحرة مطلة على الشاطئ مباشرة', tag: null, features: ['3 غرف', '2 حمامات', 'شرفة بحرية', 'موقف'], img: '/assts/Projects.png' },
]

const featureIcons = {
  'غرف': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21V7l9-4 9 4v14"/><path d="M9 21V11h6v10"/></svg>,
  'حمامات': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h16a1 1 0 011 1v3a4 4 0 01-4 4H7a4 4 0 01-4-4v-3a1 1 0 011-1z"/><path d="M6 12V5a2 2 0 012-2h3a2 2 0 012 2v7"/><path d="M6 20v2"/><path d="M18 20v2"/></svg>,
  'مطبخ': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>,
  'شرفة': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-6h6v6"/></svg>,
  'موقف': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-3"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  'مسبح': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20c2-1 4-1 6 0s4 1 6 0 4-1 6 0"/><path d="M2 16c2-1 4-1 6 0s4 1 6 0 4-1 6 0"/></svg>,
  'حديقة': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V8"/><path d="M5 12c0-4 3-7 7-7s7 3 7 7"/><path d="M8 16c0-2.5 2-4.5 4-4.5s4 2 4 4.5"/></svg>,
  'جاكوزي': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="2"/><circle cx="16" cy="8" r="2"/><path d="M4 16h16a1 1 0 011 1v2a4 4 0 01-4 4H7a4 4 0 01-4-4v-2a1 1 0 011-1z"/></svg>,
  'صالة': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a2 2 0 100-4 2 2 0 000 4z"/><path d="M6 20l4-12h4l4 12"/><path d="M3 20h18"/></svg>,
  'شرفة بحرية': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M2 17c1.5-1 3.5-1 5 0s3.5 1 5 0 3.5-1 5 0"/></svg>,
}

const wideSvgs = [
  // Card 1: abstract circles
  <svg key="s1" style={{ position: 'absolute', top: 16, left: 16, opacity: 0.04 }} width="140" height="140" viewBox="0 0 140 140" fill="none" stroke="#C8956C" strokeWidth="0.8">
    <circle cx="70" cy="70" r="60" />
    <circle cx="70" cy="70" r="40" />
    <circle cx="70" cy="70" r="20" />
  </svg>,
  // Card 4: abstract grid
  <svg key="s4" style={{ position: 'absolute', top: 16, left: 16, opacity: 0.04 }} width="140" height="140" viewBox="0 0 140 140" fill="none" stroke="#C8956C" strokeWidth="0.8">
    <path d="M10 10h120v120H10z" />
    <path d="M10 70h120" />
    <path d="M70 10v120" />
    <circle cx="70" cy="70" r="30" />
  </svg>,
]

export default function AppearanceSection() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)
  const svg1Ref = useRef(null)
  const svg4Ref = useRef(null)
  const mobile = useIsMobile()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 90%', toggleActions: 'play none none none' },
      })

      const cards = Array.from(gridRef.current.children)

      gsap.from(cards[0], {
        opacity: 0, x: 60, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: cards[0], start: 'top 95%', toggleActions: 'play none none none' },
      })
      gsap.from(cards[1], {
        opacity: 0, y: 50, duration: 0.7, delay: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: cards[1], start: 'top 95%', toggleActions: 'play none none none' },
      })
      gsap.from(cards[2], {
        opacity: 0, y: 50, duration: 0.7, delay: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: cards[2], start: 'top 95%', toggleActions: 'play none none none' },
      })
      gsap.from(cards[3], {
        opacity: 0, x: -60, duration: 0.8, delay: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: cards[3], start: 'top 95%', toggleActions: 'play none none none' },
      })

      // Floating SVGs
      if (svg1Ref.current) {
        gsap.to(svg1Ref.current, {
          y: -8, rotation: 5, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1,
        })
      }
      if (svg4Ref.current) {
        gsap.to(svg4Ref.current, {
          y: 8, rotation: -3, duration: 3.5, ease: 'sine.inOut', yoyo: true, repeat: -1,
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} dir="rtl" style={{ padding: mobile ? '50px 5vw' : '80px 8vw' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div ref={headerRef} style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 32, height: 2, background: '#C8956C', borderRadius: 1 }} />
            <span style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.75rem', color: '#C8956C', fontWeight: 700, letterSpacing: 1 }}>المشاريع</span>
          </div>
          <h2 style={{ fontFamily: "'Saudi', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 700, color: '#1B1815', marginBottom: 8 }}>
            أحدث مشاريعنا
          </h2>
          <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: 'clamp(0.85rem, 1.8vw, 1rem)', color: '#1B1815', opacity: 0.5, maxWidth: 480, lineHeight: 1.7 }}>
            مجموعة مختارة من أفضل المشاريع السكنية في المملكة
          </p>
        </div>

        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)',
            gridAutoRows: 'minmax(280px, auto)',
            gap: mobile ? 12 : 16,
          }}
        >
          {projects.map((p, i) => {
            const isWide = i === 0 || i === 3

            return isWide ? (
              /* ---- 2-column wide card ---- */
              <div
                key={p.id}
                style={{
                  gridColumn: mobile ? 'span 1' : 'span 2',
                  borderRadius: 14,
                  overflow: 'hidden',
                  background: '#F3F0EB',
                  display: 'grid',
                  gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget.querySelector('.wimg'), { scale: 1.04, duration: 0.5, ease: 'power2.out' })
                  gsap.to(e.currentTarget.querySelector('.wcontent'), { x: i === 0 ? -4 : 4, duration: 0.4, ease: 'power2.out' })
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget.querySelector('.wimg'), { scale: 1, duration: 0.5, ease: 'power2.out' })
                  gsap.to(e.currentTarget.querySelector('.wcontent'), { x: 0, duration: 0.4, ease: 'power2.out' })
                }}
              >
                {/* Image */}
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <div className="wimg" style={{ position: 'absolute', inset: 0, backgroundImage: `url(${p.img})`, backgroundSize: 'cover', backgroundPosition: 'center', transformOrigin: 'center' }} />
                  {p.tag && <div style={{ position: 'absolute', top: 14, right: 14, zIndex: 2, fontFamily: "'Saudi', sans-serif", fontSize: '0.68rem', fontWeight: 700, color: '#1B1815', background: '#C8956C', padding: '4px 12px', borderRadius: 6 }}>{p.tag}</div>}
                </div>

                {/* Content with SVG */}
                <div className="wcontent" style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                  {i === 0 ? (
                    <svg ref={svg1Ref} style={{ position: 'absolute', top: 16, left: 16, opacity: 0.04 }} width="140" height="140" viewBox="0 0 140 140" fill="none" stroke="#C8956C" strokeWidth="0.8">
                      <circle cx="70" cy="70" r="60" />
                      <circle cx="70" cy="70" r="40" />
                      <circle cx="70" cy="70" r="20" />
                    </svg>
                  ) : (
                    <svg ref={svg4Ref} style={{ position: 'absolute', top: 16, left: 16, opacity: 0.04 }} width="140" height="140" viewBox="0 0 140 140" fill="none" stroke="#C8956C" strokeWidth="0.8">
                      <path d="M10 10h120v120H10z" />
                      <path d="M10 70h120" />
                      <path d="M70 10v120" />
                      <circle cx="70" cy="70" r="30" />
                    </svg>
                  )}

                  {/* Title */}
                  <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.68rem', color: '#C8956C', fontWeight: 700, marginBottom: 6, position: 'relative', zIndex: 1 }}>{p.location}</p>
                  <h3 style={{ fontFamily: "'Saudi', sans-serif", fontSize: '1.2rem', fontWeight: 700, color: '#1B1815', marginBottom: 4, position: 'relative', zIndex: 1 }}>{p.name}</h3>

                  {/* Subtitle */}
                  <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.72rem', color: '#1B1815', opacity: 0.4, marginBottom: 16, position: 'relative', zIndex: 1 }}>{p.area} — {p.tag || 'متاح'}</p>

                  {/* Content / description */}
                  <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.82rem', color: '#1B1815', opacity: 0.55, lineHeight: 1.8, marginBottom: 20, position: 'relative', zIndex: 1, flex: 1 }}>{p.desc}</p>

                  {/* Badges */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20, position: 'relative', zIndex: 1 }}>
                    {p.features.map((f, fi) => (
                      <div key={fi} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(200,149,108,0.08)', padding: '4px 9px', borderRadius: 5 }}>
                        {featureIcons[f] || featureIcons['غرف']}
                        <span style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.65rem', color: '#1B1815', opacity: 0.55 }}>{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* Rights / footer */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(27,24,21,0.06)', paddingTop: 14, marginTop: 'auto', position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                      <span style={{ fontFamily: "'Saudi', sans-serif", fontSize: '1.15rem', fontWeight: 700, color: '#C8956C' }}>{p.price}</span>
                      <span style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.58rem', color: '#1B1815', opacity: 0.3 }}>ريال</span>
                    </div>
                    <span style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.58rem', color: '#1B1815', opacity: 0.2 }}>روشن العقارية ©</span>
                  </div>
                </div>
              </div>
            ) : (
              /* ---- 1-column tall card ---- */
              <div
                key={p.id}
                style={{
                  position: 'relative',
                  borderRadius: 14,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  aspectRatio: mobile ? '1 / 1.2' : '1 / 1.5',
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget.querySelector('.timg'), { scale: 1.06, duration: 0.5, ease: 'power2.out' })
                  gsap.to(e.currentTarget.querySelector('.thover'), { opacity: 1, duration: 0.3 })
                  gsap.to(e.currentTarget.querySelector('.tprice'), { color: '#C8956C', scale: 1.05, duration: 0.3 })
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget.querySelector('.timg'), { scale: 1, duration: 0.5, ease: 'power2.out' })
                  gsap.to(e.currentTarget.querySelector('.thover'), { opacity: 0, duration: 0.3 })
                  gsap.to(e.currentTarget.querySelector('.tprice'), { color: '#fff', scale: 1, duration: 0.3 })
                }}
              >
                <div className="timg" style={{ position: 'absolute', inset: 0, backgroundImage: `url(${p.img})`, backgroundSize: 'cover', backgroundPosition: 'center', transformOrigin: 'center' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(27,24,21,0.88) 0%, rgba(27,24,21,0.2) 50%, transparent 100%)' }} />
                {p.tag && <div style={{ position: 'absolute', top: 14, right: 14, zIndex: 2, fontFamily: "'Saudi', sans-serif", fontSize: '0.62rem', fontWeight: 700, color: '#1B1815', background: '#C8956C', padding: '3px 10px', borderRadius: 5 }}>{p.tag}</div>}
                <div className="thover" style={{ position: 'absolute', inset: 0, opacity: 0, zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.8rem', color: '#1B1815', background: 'rgba(200,149,108,0.9)', padding: '8px 20px', borderRadius: 8, fontWeight: 700 }}>عرض التفاصيل</span>
                </div>
                <div style={{ position: 'absolute', bottom: 0, right: 0, left: 0, padding: '22px 20px', zIndex: 1 }}>
                  <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.65rem', color: '#fff', opacity: 0.45, marginBottom: 4 }}>{p.location}</p>
                  <h3 style={{ fontFamily: "'Saudi', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: 6 }}>{p.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span className="tprice" style={{ fontFamily: "'Saudi', sans-serif", fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>{p.price}</span>
                    <span style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.62rem', color: '#fff', opacity: 0.4 }}>{p.area}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
