import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext.jsx'

gsap.registerPlugin(ScrollTrigger)

const allProjects = [
  { id: 1, name: 'أبراج روشن السكنية', location: 'جدة', price: '1,200,000', area: '185 م²', desc: 'مجمع سكني فاخر يطل على كورنيش جدة بتصميم عصري يجمع بين الراحة والأناقة', tag: 'جديد', features: ['3 غرف', '2 حمامات', 'مطبخ', 'شرفة', 'موقف'], img: '/assts/Projects.png', type: 'apartment' },
  { id: 2, name: 'بنتهاوس الواحة', location: 'جدة', price: '3,500,000', area: '320 م²', desc: 'بنتهاوس فاخر مع إطلالة بحرية 360° وتشطيبات من أرقى الماركات العالمية', tag: 'حصري', features: ['5 غرف', 'مسبح', 'حديقة'], img: '/assts/Project2.png', type: 'penthouse' },
  { id: 3, name: 'دوبلكس النخبة', location: 'جدة', price: '2,100,000', area: '240 م²', desc: 'دوبلكس بتصميم معماري استثنائي يقع في حي النخبة بمدينة جدة', tag: 'مميز', features: ['4 غرف', 'جاكوزي', 'صالة'], img: '/assts/Project3.png', type: 'duplex' },
  { id: 4, name: 'شقة الميناء', location: 'جدة', price: '1,800,000', area: '160 م²', desc: 'شقة ساحرة مطلة على الشاطئ مباشرة مع إطلالة بحرية خلابة', tag: null, features: ['3 غرف', '2 حمامات', 'شرفة بحرية', 'موقف'], img: '/assts/Projects.png', type: 'apartment' },
  { id: 5, name: 'استوديو النخبة', location: 'جدة', price: '850,000', area: '95 م²', desc: 'استوديو عصري مع تشطيبات عالية الجودة في موقع مميز', tag: null, features: ['استوديو', '1 حمام', 'صالة رياضية'], img: '/assts/Project2.png', type: 'studio' },
  { id: 6, name: 'فيلا المحيط', location: 'جدة', price: '4,200,000', area: '450 م²', desc: 'فيلا فاخرة مع حديقة خاصة ومسبح و إطلالة بحرية ساحرة', tag: 'جديد', features: ['6 غرف', 'مسبح', 'حديقة', 'موقف'], img: '/assts/Project3.png', type: 'villa' },
]

const filters = [
  { key: 'all', value: 'all' },
  { key: 'apartment', value: 'apartment' },
  { key: 'penthouse', value: 'penthouse' },
  { key: 'duplex', value: 'duplex' },
  { key: 'studio', value: 'studio' },
  { key: 'villa', value: 'villa' },
]

export default function ProjectsPage() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const { t, isArabic } = useLanguage()

  const filtered = activeFilter === 'all' ? allProjects : allProjects.filter((p) => p.type === activeFilter)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 90%', toggleActions: 'play none none none' },
      })
      if (gridRef.current) {
        Array.from(gridRef.current.children).forEach((card, i) => {
          gsap.from(card, {
            opacity: 0, y: 40, duration: 0.6, delay: i * 0.06,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 95%', toggleActions: 'play none none none' },
          })
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [activeFilter])

  const projectNames = {
    1: 'ROSHN Residential Towers', 2: 'Oasis Penthouse', 3: 'Elite Duplex',
    4: 'Harbor Apartment', 5: 'Elite Studio', 6: 'Ocean Villa',
  }
  const projectDescriptions = {
    1: 'A premium residential community overlooking the Jeddah Corniche.', 2: 'A luxury penthouse with a 360° sea view and world-class finishes.', 3: 'An exceptional duplex in Jeddah’s elite district.',
    4: 'A charming beachfront apartment with a breathtaking sea view.', 5: 'A modern studio with high-quality finishes in a prime location.', 6: 'A luxury villa with a private garden, pool, and sea view.',
  }

  return (
    <section ref={sectionRef} dir={isArabic ? 'rtl' : 'ltr'} style={{ padding: '120px 8vw 80px', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 32, height: 2, background: '#C8956C', borderRadius: 1 }} />
            <span style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.75rem', color: '#C8956C', fontWeight: 700, letterSpacing: 1 }}>{t('projects', 'eyebrow')}</span>
          </div>
          <h1 style={{ fontFamily: "'Saudi', sans-serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: '#1B1815', marginBottom: 8 }}>
            {t('projects', 'title')}
          </h1>
          <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: 'clamp(0.85rem, 1.8vw, 1rem)', color: '#1B1815', opacity: 0.5, maxWidth: 520, lineHeight: 1.7 }}>
            {t('projects', 'subtitle')}
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 40, flexWrap: 'wrap' }}>
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              style={{
                fontFamily: "'Saudi', sans-serif", fontSize: '0.8rem', fontWeight: 600,
                color: activeFilter === f.value ? '#fff' : '#1B1815',
                background: activeFilter === f.value ? '#1B1815' : 'transparent',
                border: activeFilter === f.value ? 'none' : '1px solid rgba(27,24,21,0.12)',
                borderRadius: 8, padding: '8px 20px', cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
              }}
            >
              {t('projects', f.key)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {filtered.map((p) => (
            (() => {
              const name = isArabic ? p.name : projectNames[p.id]
              const description = isArabic ? p.desc : projectDescriptions[p.id]
              return (
            <Link
              key={p.id}
              to={`/projects/${p.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div
                style={{
                  borderRadius: 14, overflow: 'hidden', background: '#F3F0EB', cursor: 'pointer',
                  transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                {/* Image */}
                <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16 / 10' }}>
                  <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${p.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                  {p.tag && (
                    <div style={{ position: 'absolute', top: 12, right: 12, fontFamily: "'Saudi', sans-serif", fontSize: '0.65rem', fontWeight: 700, color: '#1B1815', background: '#C8956C', padding: '3px 10px', borderRadius: 5 }}>
                      {p.tag}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: '20px 18px' }}>
                  <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.65rem', color: '#C8956C', fontWeight: 700, marginBottom: 4 }}>{p.location}</p>
                  <h3 style={{ fontFamily: "'Saudi', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#1B1815', marginBottom: 6 }}>{name}</h3>
                  <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.75rem', color: '#1B1815', opacity: 0.45, lineHeight: 1.6, marginBottom: 14 }}>{description}</p>

                  {/* Features */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 }}>
                    {p.features.slice(0, 3).map((f, fi) => (
                      <span key={fi} style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.6rem', color: '#1B1815', opacity: 0.5, background: 'rgba(200,149,108,0.08)', padding: '3px 8px', borderRadius: 4 }}>{f}</span>
                    ))}
                    {p.features.length > 3 && (
                      <span style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.6rem', color: '#C8956C', padding: '3px 8px' }}>+{p.features.length - 3}</span>
                    )}
                  </div>

                  {/* Price */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, borderTop: '1px solid rgba(27,24,21,0.06)', paddingTop: 12 }}>
                    <span style={{ fontFamily: "'Saudi', sans-serif", fontSize: '1.1rem', fontWeight: 700, color: '#C8956C' }}>{p.price}</span>
                    <span style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.58rem', color: '#1B1815', opacity: 0.3 }}>{t('common', 'sar')}</span>
                    <span style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.62rem', color: '#1B1815', opacity: 0.25, marginRight: 'auto' }}>{p.area}</span>
                  </div>
                </div>
              </div>
            </Link>
              )
            })()
          ))}
        </div>
      </div>
    </section>
  )
}
