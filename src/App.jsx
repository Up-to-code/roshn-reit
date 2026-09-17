import { useState, useCallback, useEffect, useRef } from 'react'
import { Link, NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import SplashScreen from './components/SplashScreen'
import HeroSection from './components/HeroSection'
import AppearanceSection from './components/AppearanceSection'
import WhyUsSection from './components/WhyUsSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import { useLanguage } from './i18n/LanguageContext.jsx'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailsPage from './pages/ProjectDetailsPage'
import AboutPage from './pages/AboutPage'
import WhyUsPage from './pages/WhyUsPage'
import './App.css'

function PageTransition() {
  const location = useLocation()
  const [visible, setVisible] = useState(false)
  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return undefined
    }
    setVisible(true)
    const timer = window.setTimeout(() => setVisible(false), 800)
    return () => window.clearTimeout(timer)
  }, [location.pathname])

  return visible ? <SplashScreen isTransition onComplete={() => setVisible(false)} /> : null
}

function NotFoundPage() {
  const { t, isArabic } = useLanguage()
  return (
    <div dir={isArabic ? 'rtl' : 'ltr'} style={{ minHeight: '60vh', padding: '160px 8vw 80px', textAlign: 'center' }}>
      <p style={{ fontFamily: "'Saudi', sans-serif", color: '#C8956C', fontWeight: 700 }}>404</p>
      <h1 style={{ fontFamily: "'Saudi', sans-serif", fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#1B1815' }}>{t('notFound', 'title')}</h1>
      <Link to="/" style={{ display: 'inline-block', marginTop: 20, fontFamily: "'Saudi', sans-serif", color: '#C8956C' }}>{t('notFound', 'back')}</Link>
    </div>
  )
}

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const handleSplashComplete = useCallback(() => setShowSplash(false), [])
  const location = useLocation()
  const { t, toggleLanguage, isArabic } = useLanguage()
  const isHome = location.pathname === '/'
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    setMobileMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navBg = !isHome
    ? 'rgba(255,255,255,0.95)'
    : scrolled
      ? 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(249,253,254,0.3) 100%)'
      : 'transparent'

  const navColor = !isHome || scrolled ? '#1B1815' : '#fff'

  const navLinks = [
    { to: '/projects', label: t('nav', 'projects') },
    { to: '/why-us', label: t('nav', 'whyUs') },
    { to: '/about', label: t('nav', 'about') },
    { to: '/contact', label: t('nav', 'contact') },
  ]

  return (
    <div className="min-h-screen bg-background" dir={isArabic ? 'rtl' : 'ltr'} style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
      <CustomCursor />
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      <nav className="fixed top-0 left-0 z-50 w-full" dir={isArabic ? 'rtl' : 'ltr'}>
        <div
          className="flex items-center justify-between"
          style={{
            height: 68,
            paddingRight: isMobile ? '4vw' : '8vw',
            paddingLeft: isMobile ? '4vw' : '8vw',
            background: navBg,
            backdropFilter: !isHome ? 'blur(20px)' : scrolled ? 'blur(40px) saturate(200%) brightness(1.1)' : 'none',
            WebkitBackdropFilter: !isHome ? 'blur(20px)' : scrolled ? 'blur(40px) saturate(200%) brightness(1.1)' : 'none',
            borderBottom: (!isHome || scrolled) ? '0.5px solid rgba(27,24,21,0.06)' : '0.5px solid transparent',
            boxShadow: !isHome ? '0 1px 3px rgba(0,0,0,0.04)' : scrolled ? '0 1px 3px rgba(0,0,0,0.04), inset 0 0.5px 0 rgba(255,255,255,0.5)' : 'none',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <Link to="/" className="flex items-center gap-3">
            <img src={!isHome || scrolled ? '/logo/logo.png' : '/logo/The light mode..png'} alt="ROSHN" style={{ height: isMobile ? 40 : 48, width: isMobile ? 40 : 48, objectFit: 'contain', transition: 'opacity 0.4s' }} />
            {!isMobile && <img src="/logo/logo_world.png" alt="ROSHN" style={{ height: 26, objectFit: 'contain', filter: !isHome || scrolled ? 'none' : 'brightness(0) invert(1)', transition: 'filter 0.4s' }} />}
          </Link>

          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={t('language', 'toggle')}
            style={{ marginInlineStart: 'auto', marginInlineEnd: isMobile ? 12 : 36, color: navColor, background: 'transparent', border: '1px solid currentColor', borderRadius: 999, padding: '5px 12px', fontFamily: "'Saudi', sans-serif", fontSize: '0.72rem', cursor: 'pointer' }}
          >
            {t('language', 'label')}
          </button>

          {/* Desktop nav */}
          {!isMobile && (
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="text-base font-medium transition-colors"
                  style={{ color: location.pathname === link.to || (link.to === '/projects' && location.pathname.startsWith('/projects/')) ? '#C8956C' : navColor, cursor: 'pointer', textDecoration: 'none' }}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 8,
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
              }}
            >
              <span style={{ display: 'block', width: 22, height: 2, background: navColor, borderRadius: 1, transition: 'all 0.3s', transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
              <span style={{ display: 'block', width: 22, height: 2, background: navColor, borderRadius: 1, transition: 'all 0.3s', opacity: mobileMenuOpen ? 0 : 1 }} />
              <span style={{ display: 'block', width: 22, height: 2, background: navColor, borderRadius: 1, transition: 'all 0.3s', transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
            </button>
          )}
        </div>

        {/* Mobile menu */}
        {isMobile && (
          <div
            style={{
              position: 'absolute',
              top: 68,
              left: 0,
              right: 0,
              background: 'rgba(255,255,255,0.98)',
              backdropFilter: 'blur(20px)',
              borderBottom: '0.5px solid rgba(27,24,21,0.06)',
              padding: mobileMenuOpen ? '16px 4vw' : '0 4vw',
              maxHeight: mobileMenuOpen ? 300 : 0,
              overflow: 'hidden',
              transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: mobileMenuOpen ? '0 4px 12px rgba(0,0,0,0.06)' : 'none',
            }}
          >
            {navLinks.map((link, i) => (
              <NavLink
                key={link.to}
                to={link.to}
                style={{
                  display: 'block',
                  padding: '14px 0',
                  fontFamily: "'Saudi', sans-serif",
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: location.pathname === link.to || (link.to === '/projects' && location.pathname.startsWith('/projects/')) ? '#C8956C' : '#1B1815',
                  textDecoration: 'none',
                  borderBottom: i < navLinks.length - 1 ? '0.5px solid rgba(27,24,21,0.06)' : 'none',
                  opacity: mobileMenuOpen ? 1 : 0,
                  transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-8px)',
                  transition: `all 0.3s ease ${i * 0.05}s`,
                }}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      <main>
        <PageTransition />
        <Routes>
          <Route path="/" element={<><div className="cursor-triangle"><HeroSection ready={!showSplash} /></div><div className="cursor-circle"><AppearanceSection /></div><div className="cursor-triangle"><WhyUsSection /></div><div className="cursor-circle"><CTASection /></div><div className="cursor-triangle"><Footer /></div></>} />
          <Route path="/projects" element={<><ProjectsPage /><Footer /></>} />
          <Route path="/projects/:id" element={<><ProjectDetailsPage /><Footer /></>} />
          <Route path="/why-us" element={<><WhyUsPage /><Footer /></>} />
          <Route path="/about" element={<><AboutPage /><Footer /></>} />
          <Route path="/contact" element={<><div style={{ paddingTop: 68 }}><CTASection /></div><Footer /></>} />
          <Route path="/404" element={<><NotFoundPage /><Footer /></>} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
