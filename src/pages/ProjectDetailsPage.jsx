import { useEffect, useRef, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ModelViewer from '../components/ModelViewer'
import { useLanguage } from '../i18n/LanguageContext.jsx'

gsap.registerPlugin(ScrollTrigger)

const allProjects = [
  { id: 1, name: 'أبراج روشن السكنية', location: 'جدة', price: '1,200,000', area: '185 م²', desc: 'مجمع سكني فاخر يطل على كورنيش جدة بتصميم عصري يجمع بين الراحة والأناقة. يتميز المجمع بموقعه المميز على شاطئ البحر مباشرة، مما يوفر إطلالة خلابة على الأفق البحري.', tag: 'جديد', features: ['3 غرف', '2 حمامات', 'مطبخ', 'شرفة', 'موقف'], imgs: ['/assts/Projects.png', '/assts/Project2.png', '/assts/Project3.png'], type: 'apartment', year: '2024', developer: 'روشن العقارية', architect: 'مكتب أحمد العتيبي للمعمارية', style: 'عصري معاصر', interior: 'تصميم داخلي بسيط', rooms: ['غرفة معيشة رئيسية', 'غرفة نوم رئيسية', 'غرفة نوم ثانية', 'مطبخ مفتوح', 'حمام رئيسي', 'شرفة'], lat: 21.5433, lng: 39.1728, finishes: 'تشطيبات سوبر ديلوكس', floors: '20', parking: '2 مواقف' },
  { id: 2, name: 'بنتهاوس الواحة', location: 'جدة', price: '3,500,000', area: '320 م²', desc: 'بنتهاوس فاخر مع إطلالة بحرية 360° وتشطيبات من أرقى الماركات العالمية. يتميز البنتهاوس بتصميم داخلي عصري يجمع بين الفخامة والراحة.', tag: 'حصري', features: ['5 غرف', 'مسبح', 'حديقة'], imgs: ['/assts/Project2.png', '/assts/Project3.png', '/assts/Projects.png'], type: 'penthouse', year: '2024', developer: 'روشن العقارية', architect: 'استوديو المصمم خالد السبيعي', style: 'فاخر عصري', interior: 'كلاسيكي حديث', rooms: ['صالة استقبال واسعة', 'صالة معيشة عائلية', 'غرفة نوم ماستر', '3 غرف نوم إضافية', 'مطبخ شيف', 'مطبخ مساعد', '3 حمامات', 'جاكوزي', 'مسبح خاص', 'حديقة سطحية'], lat: 21.5895, lng: 39.1582, finishes: 'تشطيبات بريميوم', floors: '30', parking: '3 مواقف' },
  { id: 3, name: 'دوبلكس النخبة', location: 'جدة', price: '2,100,000', area: '240 م²', desc: 'دوبلكس بتصميم معماري استثنائي يقع في حي النخبة بمدينة جدة. يتميز الدوبلكس بمساحاته الواسعة وتصميمه الفريد.', tag: 'مميز', features: ['4 غرف', 'جاكوزي', 'صالة'], imgs: ['/assts/Project3.png', '/assts/Projects.png', '/assts/Project2.png'], type: 'duplex', year: '2023', developer: 'روشن العقارية', architect: 'جروب المعماريون', style: 'مودرن', interior: 'عصري أنيق', rooms: ['الطابق الأول: صالة معيشة + مطبخ + حمام', 'الطابق الثاني: 4 غرف نوم + جاكوزي', 'غرفة ماستر مع بلكون', 'صالة عائلية', 'مكتب منزلي'], lat: 21.5621, lng: 39.1984, finishes: 'تشطيبات ديلوكس', floors: '12', parking: '2 مواقف' },
  { id: 4, name: 'شقة الميناء', location: 'جدة', price: '1,800,000', area: '160 م²', desc: 'شقة ساحرة مطلة على الشاطئ مباشرة مع إطلالة بحرية خلابة. تتميز الشقة بتصميمها العصري وتشطيباتها عالية الجودة.', tag: null, features: ['3 غرف', '2 حمامات', 'شرفة بحرية', 'موقف'], imgs: ['/assts/Projects.png', '/assts/Project3.png', '/assts/Project2.png'], type: 'apartment', year: '2024', developer: 'روشن العقارية', architect: 'مكتب الدار للمعمارية', style: 'بحري عصري', interior: 'أنيق بسيط', rooms: ['غرفة معيشة مع إطلالة بحرية', 'غرفة نوم ماستر', 'غرفتا نوم', 'مطبخ عصري', '2 حمام', 'شرفة مطلة على البحر'], lat: 21.5147, lng: 39.1566, finishes: 'تشطيبات سوبر ديلوكس', floors: '18', parking: '1 موقف' },
  { id: 5, name: 'استوديو النخبة', location: 'جدة', price: '850,000', area: '95 م²', desc: 'استوديو عصري مع تشطيبات عالية الجودة في موقع مميّز. مثالي للشباب أو المستثمرين.', tag: null, features: ['استوديو', '1 حمام', 'صالة رياضية'], imgs: ['/assts/Project2.png', '/assts/Projects.png', '/assts/Project3.png'], type: 'studio', year: '2024', developer: 'روشن العقارية', architect: 'مكتب المستقبل للمعمارية', style: 'ماكسيماليستي', interior: 'عصري حيوي', rooms: ['مساحة معيشة مفتوحة', 'ركن نوم', 'مطبخ مدمج', 'حمام', 'مكتب'], lat: 21.5744, lng: 39.1396, finishes: 'تشطيبات ديلوكس', floors: '15', parking: '1 موقف' },
  { id: 6, name: 'فيلا المحيط', location: 'جدة', price: '4,200,000', area: '450 م²', desc: 'فيلا فاخرة مع حديقة خاصة ومسبح وإطلالة بحرية ساحرة. تتميز الفيلا بتصميمها المعماري الفريد ومساحاتها الواسعة.', tag: 'جديد', features: ['6 غرف', 'مسبح', 'حديقة', 'موقف'], imgs: ['/assts/Project3.png', '/assts/Project2.png', '/assts/Projects.png'], type: 'villa', year: '2024', developer: 'روشن العقارية', architect: 'مكتب الواحة للتصميم', style: 'مستوحى من الطبيعة', interior: 'فاخر كلاسيكي', rooms: ['قاعة استقبال رئيسية', 'صالة معيشة عائلية', 'غرفة نوم ماستر مع جاكوزي', '5 غرف نوم إضافية', 'مطبخ شيف + مطبخ مساعد', '6 حمامات', 'صالة رياضية', 'مسبح خارجي', 'حديقة خاصة', 'موقف سيارتين'], lat: 21.5025, lng: 39.1683, finishes: 'تشطيبات ألترا بريميوم', floors: '3', parking: '3 مواقف' },
]

const featureSvgs = {
  'غرف': <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21V7l9-4 9 4v14"/><path d="M9 21V11h6v10"/></svg>,
  'حمامات': <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h16a1 1 0 011 1v3a4 4 0 01-4 4H7a4 4 0 01-4-4v-3a1 1 0 011-1z"/><path d="M6 12V5a2 2 0 012-2h3a2 2 0 012 2v7"/><path d="M6 20v2"/><path d="M18 20v2"/></svg>,
  'مطبخ': <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>,
  'شرفة': <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-6h6v6"/></svg>,
  'موقف': <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-3"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  'مسبح': <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20c2-1 4-1 6 0s4 1 6 0 4-1 6 0"/><path d="M2 16c2-1 4-1 6 0s4 1 6 0 4-1 6 0"/></svg>,
  'حديقة': <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V8"/><path d="M5 12c0-4 3-7 7-7s7 3 7 7"/><path d="M8 16c0-2.5 2-4.5 4-4.5s4 2 4 4.5"/></svg>,
  'جاكوزي': <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="2"/><circle cx="16" cy="8" r="2"/><path d="M4 16h16a1 1 0 011 1v2a4 4 0 01-4 4H7a4 4 0 01-4-4v-2a1 1 0 011-1z"/></svg>,
  'صالة': <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a2 2 0 100-4 2 2 0 000 4z"/><path d="M6 20l4-12h4l4 12"/><path d="M3 20h18"/></svg>,
  'شرفة بحرية': <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M2 17c1.5-1 3.5-1 5 0s3.5 1 5 0 3.5-1 5 0"/></svg>,
  'استوديو': <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>,
  'صالة رياضية': <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 6.5h11"/><path d="M6.5 17.5h11"/><path d="M6 12h12"/><circle cx="4" cy="6.5" r="2"/><circle cx="20" cy="6.5" r="2"/><circle cx="4" cy="17.5" r="2"/><circle cx="20" cy="17.5" r="2"/></svg>,
}

const PARTICLE_COLORS = ['#C8956C', '#d4a57a', '#fff', '#F3F0EB', '#8B7355']

function SuccessParticles() {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = canvas.offsetWidth * 2
    canvas.height = canvas.offsetHeight * 2
    ctx.scale(2, 2)
    const w = canvas.offsetWidth
    const h = canvas.offsetHeight

    const particles = Array.from({ length: 30 }, () => ({
      x: w / 2, y: h / 2,
      w: 3 + Math.random() * 5, h: 6 + Math.random() * 8,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      vx: (Math.random() - 0.5) * 6, vy: (Math.random() - 0.5) * 6 - 2,
      rotation: Math.random() * 360, rotSpeed: (Math.random() - 0.5) * 10,
      opacity: 1, life: 0,
    }))

    let start = performance.now()
    function draw(now) {
      const elapsed = (now - start) / 1000
      ctx.clearRect(0, 0, w, h)
      let alive = false
      particles.forEach((p) => {
        if (p.opacity <= 0) return
        alive = true
        p.x += p.vx; p.y += p.vy; p.vy += 0.08; p.vx *= 0.98
        p.rotation += p.rotSpeed
        if (elapsed > 0.8) p.opacity -= 0.012
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
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [])

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
}

function Lightbox({ images, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onNext()
      if (e.key === 'ArrowRight') onPrev()
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = '' }
  }, [onClose, onPrev, onNext])

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={onClose}>
      <button onClick={(e) => { e.stopPropagation(); onPrev() }} style={{ position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
      <img src={images[index]} alt="" style={{ maxWidth: '85vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: 8, userSelect: 'none' }} onClick={(e) => e.stopPropagation()} />
      <button onClick={(e) => { e.stopPropagation(); onNext() }} style={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
        {images.map((_, i) => (
          <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: i === index ? '#C8956C' : 'rgba(255,255,255,0.3)', transition: 'all 0.3s' }} />
        ))}
      </div>
      <button onClick={(e) => { e.stopPropagation(); onClose() }} style={{ position: 'absolute', top: 24, left: 24, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  )
}

const inputStyle = { fontFamily: "'Saudi', sans-serif", fontSize: '0.82rem', padding: '11px 14px', borderRadius: 8, border: '1px solid rgba(27,24,21,0.1)', background: '#fff', outline: 'none', width: '100%', boxSizing: 'border-box', transition: 'border-color 0.3s' }

export default function ProjectDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const [modelOpen, setModelOpen] = useState(false)
  const [lightbox, setLightbox] = useState({ open: false, index: 0 })
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', interest: '', message: '' })
  const { t, isArabic } = useLanguage()

  const project = allProjects.find((p) => p.id === Number(id))

  useEffect(() => {
    window.scrollTo(0, 0)
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current, { opacity: 0, duration: 0.6, ease: 'power2.out' })
      gsap.from(contentRef.current, { opacity: 0, y: 40, duration: 0.8, delay: 0.2, ease: 'power3.out' })
    })
    return () => ctx.revert()
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) return
    setSubmitted(true)
  }

  if (!project) {
    return (
      <div dir={isArabic ? 'rtl' : 'ltr'} style={{ padding: '160px 8vw', textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Saudi', sans-serif", fontSize: '2rem', color: '#1B1815' }}>{isArabic ? 'المشروع غير موجود' : 'Project not found'}</h1>
        <Link to="/projects" style={{ fontFamily: "'Saudi', sans-serif", color: '#C8956C', marginTop: 16, display: 'inline-block' }}>{t('common', 'backToProjects')}</Link>
      </div>
    )
  }

  const selectStyle = { ...inputStyle, appearance: 'none', cursor: 'pointer', color: form.interest ? '#1B1815' : 'rgba(27,24,21,0.4)', backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23C8956C' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'left 14px center' }

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'} style={{ minHeight: '100vh' }}>
      {lightbox.open && (
        <Lightbox images={project.imgs} index={lightbox.index} onClose={() => setLightbox({ open: false, index: 0 })} onPrev={() => setLightbox((s) => ({ ...s, index: (s.index - 1 + project.imgs.length) % project.imgs.length }))} onNext={() => setLightbox((s) => ({ ...s, index: (s.index + 1) % project.imgs.length }))} />
      )}
      <ModelViewer isOpen={modelOpen} onClose={() => setModelOpen(false)} />

      {/* Header */}
      <div ref={heroRef} style={{ padding: '100px 8vw 32px' }}>
        <Link to="/projects" onClick={(e) => { e.preventDefault(); navigate('/projects') }} style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.8rem', color: '#C8956C', textDecoration: 'none', marginBottom: 20, display: 'inline-block' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            {t('common', 'backToProjects')}
          </span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          {project.tag && <span style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.68rem', fontWeight: 700, color: '#1B1815', background: '#C8956C', padding: '3px 10px', borderRadius: 5 }}>{project.tag}</span>}
          <span style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.75rem', color: '#1B1815', opacity: 0.4 }}>{project.location}</span>
        </div>
        <h1 style={{ fontFamily: "'Saudi', sans-serif", fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 700, color: '#1B1815', marginBottom: 4 }}>{project.name}</h1>
      </div>

      {/* Gallery */}
      <div style={{ padding: '0 8vw', marginBottom: 40 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: '200px 200px', gap: 8, borderRadius: 14, overflow: 'hidden' }}>
          <div onClick={() => setLightbox({ open: true, index: 0 })} style={{ backgroundImage: `url(${project.imgs[0]})`, backgroundSize: 'cover', backgroundPosition: 'center', cursor: 'pointer', gridRow: 'span 2', transition: 'filter 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(0.9)' }} onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)' }} />
          <div onClick={() => setLightbox({ open: true, index: 1 })} style={{ backgroundImage: `url(${project.imgs[1]})`, backgroundSize: 'cover', backgroundPosition: 'center', cursor: 'pointer', transition: 'filter 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(0.9)' }} onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)' }} />
          <div onClick={() => setModelOpen(true)} style={{ background: 'linear-gradient(135deg, #1B1815 0%, #3A3530 100%)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)' }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none' }}>
            <div style={{ position: 'relative', width: 44, height: 44 }}>
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none" style={{ animation: 'rotateCube 4s linear infinite' }}>
                <rect x="8" y="8" width="20" height="20" rx="2" stroke="#C8956C" strokeWidth="1.5" fill="none" opacity="0.6" />
                <rect x="16" y="16" width="20" height="20" rx="2" stroke="#C8956C" strokeWidth="1.5" fill="none" opacity="0.3" />
                <path d="M14 14L36 36M14 36L36 14" stroke="#C8956C" strokeWidth="0.5" opacity="0.2" />
              </svg>
            </div>
            <span style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.72rem', fontWeight: 700, color: '#fff', opacity: 0.8 }}>استكشف بالثلاثي</span>
            <span style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.6rem', color: '#C8956C', opacity: 0.7 }}>اضغط للبدء</span>
          </div>
          <div onClick={() => setLightbox({ open: true, index: 2 })} style={{ backgroundImage: `url(${project.imgs[2]})`, backgroundSize: 'cover', backgroundPosition: 'center', cursor: 'pointer', position: 'relative', overflow: 'hidden', transition: 'filter 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(0.9)' }} onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.9rem', color: '#fff', fontWeight: 700 }}>+{project.imgs.length - 1}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} style={{ padding: '0 8vw 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.6fr', gap: 48 }}>
          {/* Left */}
          <div>
            {/* Price bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32, paddingBottom: 20, borderBottom: '1px solid rgba(27,24,21,0.06)' }}>
              <div>
                <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.7rem', color: '#1B1815', opacity: 0.35, marginBottom: 4 }}>{t('common', 'price')}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontFamily: "'Saudi', sans-serif", fontSize: '1.6rem', fontWeight: 700, color: '#C8956C' }}>{project.price}</span>
                  <span style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.7rem', color: '#1B1815', opacity: 0.3 }}>{t('common', 'sar')}</span>
                </div>
              </div>
              <div style={{ width: 1, height: 36, background: 'rgba(27,24,21,0.08)' }} />
              <div>
                <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.7rem', color: '#1B1815', opacity: 0.35, marginBottom: 4 }}>{t('common', 'area')}</p>
                <span style={{ fontFamily: "'Saudi', sans-serif", fontSize: '1.1rem', fontWeight: 600, color: '#1B1815' }}>{project.area}</span>
              </div>
              <div style={{ width: 1, height: 36, background: 'rgba(27,24,21,0.08)' }} />
              <div>
                <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.7rem', color: '#1B1815', opacity: 0.35, marginBottom: 4 }}>{t('common', 'year')}</p>
                <span style={{ fontFamily: "'Saudi', sans-serif", fontSize: '1.1rem', fontWeight: 600, color: '#1B1815' }}>{project.year}</span>
              </div>
            </div>

            {/* Description */}
            <h2 style={{ fontFamily: "'Saudi', sans-serif", fontSize: '1.2rem', fontWeight: 700, color: '#1B1815', marginBottom: 12 }}>{isArabic ? 'عن المشروع' : 'About the project'}</h2>
            <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.88rem', color: '#1B1815', opacity: 0.55, lineHeight: 1.9, marginBottom: 32 }}>{project.desc}</p>

            {/* Architecture & Interior */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
              <div style={{ background: '#F3F0EB', borderRadius: 12, padding: '20px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                  <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.72rem', color: '#1B1815', opacity: 0.4, fontWeight: 600 }}>العمارة</p>
                </div>
                <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.88rem', fontWeight: 700, color: '#1B1815', marginBottom: 4 }}>{project.architect}</p>
                <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.78rem', color: '#C8956C' }}>{project.style}</p>
              </div>
              <div style={{ background: '#F3F0EB', borderRadius: 12, padding: '20px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.72rem', color: '#1B1815', opacity: 0.4, fontWeight: 600 }}>التصميم الداخلي</p>
                </div>
                <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.88rem', fontWeight: 700, color: '#1B1815', marginBottom: 4 }}>{project.interior}</p>
                <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.78rem', color: '#C8956C' }}>{project.finishes}</p>
              </div>
            </div>

            {/* Building Details */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32 }}>
              {[
                { label: 'الطوابق', value: project.floors, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01"/></svg> },
                { label: 'المواقف', value: project.parking, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-3"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
                { label: 'المطور', value: project.developer, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
              ].map((item, i) => (
                <div key={i} style={{ background: '#F3F0EB', borderRadius: 10, padding: '14px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  {item.icon}
                  <div>
                    <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.65rem', color: '#1B1815', opacity: 0.35 }}>{item.label}</p>
                    <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.8rem', fontWeight: 600, color: '#1B1815' }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Features */}
            <h2 style={{ fontFamily: "'Saudi', sans-serif", fontSize: '1.2rem', fontWeight: 700, color: '#1B1815', marginBottom: 16 }}>{isArabic ? 'المميزات' : 'Features'}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32 }}>
              {project.features.map((f, fi) => (
                <div key={fi} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#F3F0EB', padding: '12px 14px', borderRadius: 10 }}>
                  {featureSvgs[f] || <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-5"/></svg>}
                  <span style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.8rem', color: '#1B1815', opacity: 0.7 }}>{f}</span>
                </div>
              ))}
            </div>

            {/* Rooms */}
            <h2 style={{ fontFamily: "'Saudi', sans-serif", fontSize: '1.2rem', fontWeight: 700, color: '#1B1815', marginBottom: 16 }}>{isArabic ? 'توزيع الغرف' : 'Room layout'}</h2>
            <div style={{ background: '#F3F0EB', borderRadius: 12, padding: '20px', marginBottom: 32 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px 24px' }}>
                {project.rooms.map((r, ri) => (
                  <div key={ri} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#C8956C', flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.82rem', color: '#1B1815', opacity: 0.65 }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <h2 style={{ fontFamily: "'Saudi', sans-serif", fontSize: '1.2rem', fontWeight: 700, color: '#1B1815', marginBottom: 16 }}>{isArabic ? 'الموقع' : 'Location'}</h2>
            <div style={{ borderRadius: 14, overflow: 'hidden', height: 300, background: '#F3F0EB', position: 'relative' }}>
              <iframe title="map" width="100%" height="100%" style={{ border: 0 }} loading="lazy" src={`https://www.openstreetmap.org/export/embed.html?bbox=${project.lng - 0.02}%2C${project.lat - 0.01}%2C${project.lng + 0.02}%2C${project.lat + 0.01}&layer=mapnik&marker=${project.lat}%2C${project.lng}`} />
            </div>
          </div>

          {/* Right sidebar */}
          <div>
            <div style={{ position: 'sticky', top: 100, background: '#F3F0EB', borderRadius: 14, padding: '28px 24px', overflow: 'hidden' }}>
              {!submitted ? (
                <>
                  <h3 style={{ fontFamily: "'Saudi', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#1B1815', marginBottom: 6 }}>مهتم بالمشروع؟</h3>
                  <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.78rem', color: '#1B1815', opacity: 0.45, marginBottom: 20 }}>أكمل النموذج وسنتواصل معك</p>
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <input type="text" placeholder="الاسم الكامل *" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} onFocus={(e) => { e.target.style.borderColor = 'rgba(200,149,108,0.5)' }} onBlur={(e) => { e.target.style.borderColor = 'rgba(27,24,21,0.1)' }} />
                    <input type="tel" placeholder="رقم الجوال *" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={inputStyle} onFocus={(e) => { e.target.style.borderColor = 'rgba(200,149,108,0.5)' }} onBlur={(e) => { e.target.style.borderColor = 'rgba(27,24,21,0.1)' }} />
                    <select value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })} style={selectStyle} onFocus={(e) => { e.target.style.borderColor = 'rgba(200,149,108,0.5)' }} onBlur={(e) => { e.target.style.borderColor = 'rgba(27,24,21,0.1)' }}>
                      <option value="" disabled>ما الذي يهمك؟</option>
                      <option value="buy">شراء</option>
                      <option value="invest">استثمار</option>
                      <option value="rent">إيجار</option>
                      <option value="info">مزيد من المعلومات</option>
                      <option value="visit">حجز زيارة</option>
                    </select>
                    <textarea placeholder="رسالتك (اختياري)" rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: 'none' }} onFocus={(e) => { e.target.style.borderColor = 'rgba(200,149,108,0.5)' }} onBlur={(e) => { e.target.style.borderColor = 'rgba(27,24,21,0.1)' }} />
                    <button type="submit" style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.85rem', fontWeight: 700, color: '#fff', background: '#C8956C', border: 'none', borderRadius: 8, padding: '12px 24px', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#b8864f' }} onMouseLeave={(e) => { e.currentTarget.style.background = '#C8956C' }}>إرسال الطلب</button>
                  </form>
                </>
              ) : (
                <div style={{ position: 'relative', textAlign: 'center', padding: '30px 0', animation: 'fadeUp 0.5s cubic-bezier(0.4,0,0.2,1) forwards' }}>
                  <SuccessParticles />
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(200,149,108,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', animation: 'scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.2s both' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#1B1815', marginBottom: 6, animation: 'fadeUp 0.5s cubic-bezier(0.4,0,0.2,1) 0.3s both' }}>تم إرسال طلبك بنجاح!</p>
                    <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.78rem', color: '#1B1815', opacity: 0.45, lineHeight: 1.7, animation: 'fadeUp 0.5s cubic-bezier(0.4,0,0.2,1) 0.4s both' }}>فريق روشن سيتواصل معك خلال 24 ساعة</p>
                  </div>
                </div>
              )}

              <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(27,24,21,0.06)' }}>
                <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.68rem', color: '#1B1815', opacity: 0.3, marginBottom: 8 }}>للتواصل المباشر</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <a href="tel:+966123456789" style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.8rem', color: '#C8956C', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, direction: 'ltr' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                    +966 12 345 6789
                  </a>
                  <a href="mailto:info@roshn.sa" style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.8rem', color: '#C8956C', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    info@roshn.sa
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes rotateCube { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.5); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  )
}
