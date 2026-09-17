import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext.jsx'

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

const PARTICLE_COUNT = 40
const COLORS = ['#C8956C', '#d4a57a', '#fff', '#F3F0EB', '#8B7355']

function Confetti({ active }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  const createParticles = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 100,
      w: 4 + Math.random() * 6,
      h: 8 + Math.random() * 10,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      vx: (Math.random() - 0.5) * 4,
      vy: 2 + Math.random() * 3,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 8,
      opacity: 1,
    }))

    let startTime = performance.now()

    function draw(now) {
      const elapsed = (now - startTime) / 1000
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      let alive = false
      particles.forEach((p) => {
        if (p.opacity <= 0) return
        alive = true
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.05
        p.vx *= 0.99
        p.rotation += p.rotSpeed
        if (elapsed > 1.5) p.opacity -= 0.015

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.globalAlpha = Math.max(0, p.opacity)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()
      })

      if (alive) animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)
  }, [])

  useEffect(() => {
    if (active) {
      createParticles()
    }
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [active, createParticles])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999 }}
    />
  )
}

export default function CTASection() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const formRef = useRef(null)
  const contactRef = useRef(null)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({ name: '', phone: '', email: '', propertyType: '', budget: '', message: '' })
  const mobile = useIsMobile()
  const { t, isArabic } = useLanguage()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        opacity: 0, y: 50, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 90%', toggleActions: 'play none none none' },
      })
      gsap.from(formRef.current, {
        opacity: 0, x: 40, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 95%', toggleActions: 'play none none none' },
      })
      gsap.from(contactRef.current, {
        opacity: 0, x: -40, duration: 0.6, delay: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 95%', toggleActions: 'play none none none' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const validate = () => {
    const e = {}
    if (/\d/.test(form.name)) e.name = 'الاسم لا يجب أن يحتوي على أرقام'
    else if (form.name.trim().length < 2) e.name = 'الاسم قصير جداً'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'البريد الإلكتروني غير صحيح'
    const cleaned = form.phone.replace(/[\s\-()]/g, '')
    if (!cleaned) e.phone = 'رقم الجوال مطلوب'
    else if (!/^\+?[\d]+$/.test(cleaned)) e.phone = 'يرجى إدخال أرقام فقط'
    else if (cleaned.length < 8) e.phone = 'رقم الجوال قصير جداً'
    else if (cleaned.length > 15) e.phone = 'رقم الجوال طويل جداً'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length) return
    setSubmitted(true)
  }

  const onChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => { const n = { ...prev }; delete n[field]; return n })
  }

  const fieldWrap = { display: 'flex', flexDirection: 'column', gap: 6 }

  const labelStyle = (hasError) => ({
    fontFamily: "'Saudi', sans-serif", fontSize: '0.75rem', fontWeight: 600,
    color: hasError ? '#e74c3c' : 'rgba(255,255,255,0.45)',
    transition: 'color 0.3s',
  })

  const inputBase = {
    fontFamily: "'Saudi', sans-serif", fontSize: '0.85rem',
    color: '#fff', background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 10, padding: '12px 14px',
    outline: 'none', width: '100%', boxSizing: 'border-box',
    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
  }

  const inputFocusStyle = {
    ...inputBase,
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(200,149,108,0.5)',
  }

  const selectBase = {
    fontFamily: "'Saudi', sans-serif", fontSize: '0.85rem',
    color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 10, padding: '12px 14px',
    outline: 'none', width: '100%', boxSizing: 'border-box',
    appearance: 'none', cursor: 'pointer',
    transition: 'all 0.3s',
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='rgba(255,255,255,0.3)' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left 14px center',
  }

  const errorStyle = {
    fontFamily: "'Saudi', sans-serif", fontSize: '0.7rem',
    color: '#e74c3c', marginTop: 2,
  }

  return (
    <section ref={sectionRef} dir={isArabic ? 'rtl' : 'ltr'}>
      <Confetti active={submitted} />

      <div style={{ background: '#3A3530', padding: mobile ? '40px 5vw' : '56px 8vw' }}>
        <div ref={contentRef} style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1.2fr 0.8fr', gap: mobile ? 32 : 56, position: 'relative' }}>
          <svg style={{ position: 'absolute', top: 20, right: 30, opacity: 0.04 }} width="160" height="160" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="0.5">
            <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
          </svg>
          <svg style={{ position: 'absolute', bottom: 20, left: 40, opacity: 0.03 }} width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="0.5">
            <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" />
          </svg>

          {/* Form */}
          <div ref={formRef} style={{ position: 'relative', zIndex: 1 }}>
            {!submitted ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ marginBottom: 12 }}>
                  <h2 style={{ fontFamily: "'Saudi', sans-serif", fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', fontWeight: 700, color: '#fff', marginBottom: 6 }}>
                    {t('contact', 'title')}
                  </h2>
                  <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.82rem', color: '#fff', opacity: 0.35 }}>
                    {t('contact', 'subtitle')}
                  </p>
                </div>

                {/* Name + Email row */}
                <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 14 }}>
                  <div style={fieldWrap}>
                    <label style={labelStyle(!!errors.name)}>{t('contact', 'name')}</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => onChange('name', e.target.value)}
                      placeholder={t('contact', 'namePlaceholder')}
                      required
                      style={errors.name ? { ...inputBase, borderColor: 'rgba(231,76,60,0.5)' } : inputBase}
                      onFocus={(e) => { if (!errors.name) { e.target.style.background = 'rgba(255,255,255,0.07)'; e.target.style.borderColor = 'rgba(200,149,108,0.5)' } }}
                      onBlur={(e) => { e.target.style.background = 'rgba(255,255,255,0.04)'; e.target.style.borderColor = errors.name ? 'rgba(231,76,60,0.5)' : 'rgba(255,255,255,0.08)' }}
                    />
                    {errors.name && <p style={errorStyle}>{errors.name}</p>}
                  </div>
                  <div style={fieldWrap}>
                    <label style={labelStyle(!!errors.email)}>{t('contact', 'email')}</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => onChange('email', e.target.value)}
                      placeholder="email@example.com"
                      style={errors.email ? { ...inputBase, borderColor: 'rgba(231,76,60,0.5)' } : inputBase}
                      onFocus={(e) => { if (!errors.email) { e.target.style.background = 'rgba(255,255,255,0.07)'; e.target.style.borderColor = 'rgba(200,149,108,0.5)' } }}
                      onBlur={(e) => { e.target.style.background = 'rgba(255,255,255,0.04)'; e.target.style.borderColor = errors.email ? 'rgba(231,76,60,0.5)' : 'rgba(255,255,255,0.08)' }}
                    />
                    {errors.email && <p style={errorStyle}>{errors.email}</p>}
                  </div>
                </div>

                {/* Phone */}
                <div style={fieldWrap}>
                  <label style={labelStyle(!!errors.phone)}>{t('contact', 'phone')}</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => onChange('phone', e.target.value)}
                    placeholder="+966 5X XXX XXXX"
                    required
                    style={errors.phone ? { ...inputBase, borderColor: 'rgba(231,76,60,0.5)' } : inputBase}
                    onFocus={(e) => { if (!errors.phone) { e.target.style.background = 'rgba(255,255,255,0.07)'; e.target.style.borderColor = 'rgba(200,149,108,0.5)' } }}
                    onBlur={(e) => { e.target.style.background = 'rgba(255,255,255,0.04)'; e.target.style.borderColor = errors.phone ? 'rgba(231,76,60,0.5)' : 'rgba(255,255,255,0.08)' }}
                  />
                  {errors.phone && <p style={errorStyle}>{errors.phone}</p>}
                </div>

                {/* Property type + Budget row */}
                <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 14 }}>
                  <div style={fieldWrap}>
                    <label style={labelStyle(false)}>{t('contact', 'propertyType')}</label>
                    <select
                      value={form.propertyType}
                      onChange={(e) => onChange('propertyType', e.target.value)}
                      style={form.propertyType ? { ...selectBase, color: '#fff' } : selectBase}
                      onFocus={(e) => { e.target.style.background = 'rgba(255,255,255,0.07)'; e.target.style.borderColor = 'rgba(200,149,108,0.5)' }}
                      onBlur={(e) => { e.target.style.background = 'rgba(255,255,255,0.04)'; e.target.style.borderColor = 'rgba(255,255,255,0.08)' }}
                    >
                      <option value="" disabled>اختر النوع</option>
                      <option value="apartment">شقة</option>
                      <option value="penthouse">بنتهاوس</option>
                      <option value="duplex">دوبلكس</option>
                      <option value="studio">استوديو</option>
                      <option value="villa">فيلا</option>
                    </select>
                  </div>
                  <div style={fieldWrap}>
                    <label style={labelStyle(false)}>{t('contact', 'budget')}</label>
                    <select
                      value={form.budget}
                      onChange={(e) => onChange('budget', e.target.value)}
                      style={form.budget ? { ...selectBase, color: '#fff' } : selectBase}
                      onFocus={(e) => { e.target.style.background = 'rgba(255,255,255,0.07)'; e.target.style.borderColor = 'rgba(200,149,108,0.5)' }}
                      onBlur={(e) => { e.target.style.background = 'rgba(255,255,255,0.04)'; e.target.style.borderColor = 'rgba(255,255,255,0.08)' }}
                    >
                      <option value="" disabled>اختر الميزانية</option>
                      <option value="500k">أقل من 500,000</option>
                      <option value="1m">500,000 - 1,000,000</option>
                      <option value="2m">1,000,000 - 2,000,000</option>
                      <option value="3m">2,000,000 - 3,000,000</option>
                      <option value="5m">أكثر من 3,000,000</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div style={fieldWrap}>
                  <label style={labelStyle(false)}>{t('contact', 'message')}</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => onChange('message', e.target.value)}
                    rows={4}
                    placeholder="اكتب استفسارك أو طلبك هنا..."
                    style={{ ...inputBase, resize: 'none', lineHeight: 1.7 }}
                    onFocus={(e) => { e.target.style.background = 'rgba(255,255,255,0.07)'; e.target.style.borderColor = 'rgba(200,149,108,0.5)' }}
                    onBlur={(e) => { e.target.style.background = 'rgba(255,255,255,0.04)'; e.target.style.borderColor = 'rgba(255,255,255,0.08)' }}
                  />
                </div>

                {/* Submit */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
                  <button type="submit" style={{
                    fontFamily: "'Saudi', sans-serif", fontSize: '0.85rem', fontWeight: 700,
                    color: '#1B1815', background: '#C8956C', border: 'none', borderRadius: 10,
                    padding: '12px 32px', cursor: 'pointer', transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                    position: 'relative', overflow: 'hidden',
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#d4a57a'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(200,149,108,0.3)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#C8956C'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                  >
                    {t('contact', 'send')}
                  </button>
                  <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.7rem', color: '#fff', opacity: 0.2 }}>* الحقول المطلوبة</p>
                </div>
              </form>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', padding: '40px 0', animation: 'fadeUp 0.5s cubic-bezier(0.4,0,0.2,1) forwards' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(200,149,108,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, animation: 'scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.2s both' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: "'Saudi', sans-serif", fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: 8, animation: 'fadeUp 0.5s cubic-bezier(0.4,0,0.2,1) 0.3s both' }}>
                  شكراً لتواصلك
                </h3>
                <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.85rem', color: '#fff', opacity: 0.45, lineHeight: 1.7, animation: 'fadeUp 0.5s cubic-bezier(0.4,0,0.2,1) 0.4s both' }}>
                  فريقنا سيتواصل معك في أقرب وقت ممكن
                </p>
              </div>
            )}
          </div>

          {/* Contact info */}
          <div ref={contactRef} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1, borderRight: '1px solid rgba(255,255,255,0.06)', paddingRight: 48 }}>
            <h2 style={{ fontFamily: "'Saudi', sans-serif", fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', fontWeight: 700, color: '#fff', marginBottom: 16 }}>{t('common', 'contactUs')}</h2>
            <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.85rem', color: '#fff', opacity: 0.35, lineHeight: 1.8, marginBottom: 36 }}>
              نحن هنا لمساعدتك. لا تتردد في التواصل معنا في أي وقت
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                { icon: <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></>, label: 'الاسم', value: 'فريق روشن' },
                { icon: <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />, label: 'الجوال', value: '+966 12 345 6789', ltr: true },
                { icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>, label: 'البريد الإلكتروني', value: 'info@roshn.sa' },
                { icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></>, label: 'الموقع', value: 'جدة، المملكة العربية السعودية' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'default', transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.paddingRight = '8px'; e.currentTarget.style.borderBottomColor = 'rgba(200,149,108,0.2)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.paddingRight = '0'; e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.04)' }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(200,149,108,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{item.icon}</svg>
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.68rem', color: '#fff', opacity: 0.3, marginBottom: 2 }}>{item.label}</p>
                    <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.85rem', color: '#fff', fontWeight: 500, direction: item.ltr ? 'ltr' : undefined, textAlign: item.ltr ? 'right' : undefined }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  )
}
