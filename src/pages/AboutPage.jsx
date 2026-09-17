import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext.jsx'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '+200', label: 'مشروع مكتمل' },
  { value: '15+', label: 'سنة خبرة' },
  { value: '+5000', label: 'عميل سعيد' },
  { value: '98%', label: 'نسبة الرضا' },
]

const team = [
  { name: 'محمد العتيبي', nameEn: 'Mohammed Al-Otaibi', role: 'الرئيس التنفيذي', roleEn: 'Chief Executive Officer', img: '/assts/Projects.png' },
  { name: 'فهد الشمري', nameEn: 'Fahad Al-Shammari', role: 'مدير المشاريع', roleEn: 'Projects Director', img: '/assts/Project2.png' },
  { name: 'سعود القحطاني', nameEn: 'Saud Al-Qahtani', role: 'مدير التسويق', roleEn: 'Marketing Director', img: '/assts/Project3.png' },
]

export default function AboutPage() {
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const { t, isArabic } = useLanguage()

  useEffect(() => {
    window.scrollTo(0, 0)
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current, { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' })
      gsap.from(contentRef.current.children, {
        opacity: 0, y: 40, stagger: 0.12, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: contentRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'} style={{ minHeight: '100vh' }}>
      {/* Hero */}
      <div ref={heroRef} style={{ padding: '140px 8vw 60px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 32, height: 2, background: '#C8956C', borderRadius: 1 }} />
          <span style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.75rem', color: '#C8956C', fontWeight: 700, letterSpacing: 1 }}>{t('about', 'eyebrow')}</span>
          <div style={{ width: 32, height: 2, background: '#C8956C', borderRadius: 1 }} />
        </div>
        <h1 style={{ fontFamily: "'Saudi', sans-serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: '#1B1815', marginBottom: 12 }}>
          {t('about', 'title')}
        </h1>
        <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: 'clamp(0.85rem, 1.8vw, 1rem)', color: '#1B1815', opacity: 0.5, maxWidth: 600, margin: '0 auto', lineHeight: 1.8 }}>
          {t('about', 'intro')}
        </p>
      </div>

      {/* Content */}
      <div ref={contentRef} style={{ maxWidth: 1200, margin: '0 auto', padding: '0 8vw 80px' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 64 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '32px 16px', background: '#F3F0EB', borderRadius: 14 }}>
              <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '2rem', fontWeight: 700, color: '#C8956C', marginBottom: 6 }}>{s.value}</p>
              <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.8rem', color: '#1B1815', opacity: 0.5 }}>{isArabic ? s.label : ['Completed projects', 'Years of experience', 'Happy clients', 'Satisfaction rate'][i]}</p>
            </div>
          ))}
        </div>

        {/* Story */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginBottom: 64, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: "'Saudi', sans-serif", fontSize: '1.6rem', fontWeight: 700, color: '#1B1815', marginBottom: 16 }}>{t('about', 'story')}</h2>
            <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.88rem', color: '#1B1815', opacity: 0.55, lineHeight: 1.9, marginBottom: 16 }}>
              {t('about', 'storyOne')}
            </p>
            <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.88rem', color: '#1B1815', opacity: 0.55, lineHeight: 1.9 }}>
              {t('about', 'storyTwo')}
            </p>
          </div>
          <div style={{ aspectRatio: '4 / 3', borderRadius: 14, overflow: 'hidden', backgroundImage: 'url(/assts/Projects.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </div>

        {/* Mission */}
        <div style={{ background: '#1B1815', borderRadius: 16, padding: '48px 40px', marginBottom: 64, position: 'relative', overflow: 'hidden' }}>
          <svg style={{ position: 'absolute', top: 20, left: 30, opacity: 0.04 }} width="160" height="160" viewBox="0 0 140 140" fill="none" stroke="#C8956C" strokeWidth="0.8">
            <circle cx="70" cy="70" r="60" /><circle cx="70" cy="70" r="40" /><circle cx="70" cy="70" r="20" />
          </svg>
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 700 }}>
            <h2 style={{ fontFamily: "'Saudi', sans-serif", fontSize: '1.6rem', fontWeight: 700, color: '#fff', marginBottom: 16 }}>{t('about', 'mission')}</h2>
            <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.9rem', color: '#fff', opacity: 0.6, lineHeight: 1.9 }}>
              {t('about', 'missionText')}
            </p>
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 style={{ fontFamily: "'Saudi', sans-serif", fontSize: '1.6rem', fontWeight: 700, color: '#1B1815', marginBottom: 8 }}>{t('about', 'team')}</h2>
          <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.85rem', color: '#1B1815', opacity: 0.45, marginBottom: 32 }}>{t('about', 'teamIntro')}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {team.map((t, i) => (
              <div key={i} style={{ borderRadius: 14, overflow: 'hidden', background: '#F3F0EB' }}>
                <div style={{ aspectRatio: '1 / 1', backgroundImage: `url(${t.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div style={{ padding: '18px 16px' }}>
                  <h3 style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.95rem', fontWeight: 700, color: '#1B1815', marginBottom: 4 }}>{isArabic ? t.name : t.nameEn}</h3>
                  <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.75rem', color: '#C8956C' }}>{isArabic ? t.role : t.roleEn}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
