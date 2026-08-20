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

export default function HeroSection({ ready }) {
  const sectionRef = useRef(null)
  const skyRef = useRef(null)
  const buildingRef = useRef(null)
  const textFrontRef = useRef(null)
  const wordsRef = useRef([])
  const mobile = useIsMobile()

  useEffect(() => {
    if (skyRef.current) skyRef.current.playbackRate = 0.5
  }, [])

  useEffect(() => {
    gsap.fromTo(buildingRef.current,
      { opacity: 0.7 },
      { opacity: 1, duration: 1.5, ease: 'power2.out', delay: 1.1 }
    )
    const words = wordsRef.current.filter(Boolean)
    gsap.fromTo(words,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 1.1,
      }
    )
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(skyRef.current, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to(textFrontRef.current, {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '30% top',
          end: '70% top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const line1 = ['حيث', 'يلتقي', 'الفخامة', 'بالثقة']
  const line2 = ['في', 'جدة', '...استثمارك', 'يبدأ', 'هنا']

  return (
    <>
      {/* Fixed text overlay */}
      <div
        ref={textFrontRef}
        className="fixed top-0 right-0 z-[2]"
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: mobile ? 'center' : 'flex-start',
          paddingTop: mobile ? '0' : 'calc(18vh + 10px)',
          justifyContent: 'flex-end',
          paddingRight: mobile ? '5vw' : '8vw',
          paddingLeft: mobile ? '5vw' : '8vw',
          pointerEvents: 'none',
        }}
      >
        <div dir="rtl" style={{ display: 'inline-block', textAlign: 'right', maxWidth: '90%' }}>
          <h2
            style={{
              fontFamily: "'Saudi', sans-serif",
              fontSize: mobile ? 'clamp(1.6rem, 8vw, 2.5rem)' : 'clamp(2.5rem, 6vw, 5.5rem)',
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.2,
              textShadow: mobile ? '0 2px 20px rgba(0,0,0,0.4)' : 'none',
            }}
          >
            {line1.map((word, i) => (
              <span
                key={i}
                ref={(el) => { wordsRef.current[i] = el }}
                style={{ display: 'inline-block', marginLeft: '0.3em', opacity: 0 }}
              >
                {word}
              </span>
            ))}
            <br />
            {line2.map((word, i) => (
              <span
                key={i + line1.length}
                ref={(el) => { wordsRef.current[i + line1.length] = el }}
                style={{ display: 'inline-block', marginLeft: '0.3em', opacity: 0 }}
              >
                {word}
              </span>
            ))}
          </h2>
        </div>
      </div>

      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden"
        style={{ height: '100vh' }}
      >
        {/* Mobile: static image. Desktop: video */}
        {mobile ? (
          <img
            src="/assts/hero/Mobile.png"
            alt=""
            className="absolute inset-0 h-full w-full"
            style={{ zIndex: 0, objectFit: 'cover' }}
          />
        ) : (
          <video
            ref={skyRef}
            src="/assts/hero/background.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
            style={{ zIndex: 0 }}
          />
        )}

        {/* Dark noise overlay */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 1,
            background: mobile ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.1)',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
            backgroundSize: '150px 150px',
          }}
        />

        {/* Building */}
        <img
          ref={buildingRef}
          src="/assts/hero/Building.png"
          alt=""
          className="absolute bottom-0 left-0 w-full"
          style={{
            zIndex: 4,
            objectFit: 'cover',
            objectPosition: 'bottom',
            opacity: 0.7,
            bottom: -5,
            maxHeight: mobile ? '45vh' : 'none',
          }}
        />

        {/* Smooth gradient transition to white */}
        <div
          className="absolute bottom-0 left-0 w-full"
          style={{
            zIndex: 5,
            height: mobile ? 50 : 80,
            background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.5) 50%, #fff 100%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-full"
          style={{
            zIndex: 6,
            height: mobile ? 50 : 80,
            background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
            backgroundSize: '150px 150px',
            opacity: 0.05,
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 50%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 50%, transparent 100%)',
          }}
        />
      </section>

      {/* Infinite logo carousel */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          background: '#F9FDFE',
          padding: mobile ? '18px 0' : '28px 0',
        }}
      >
        <div className="marquee-track">
          {[...Array(3)].map((_, setIndex) => (
            <div key={setIndex} className="marquee-content">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="marquee-item">
                  <img
                    src="/logo/logo.png"
                    alt="ROSHN"
                    style={{ height: mobile ? 36 : 56, width: mobile ? 36 : 56, objectFit: 'contain' }}
                  />
                  <img
                    src="/logo/logo_world.png"
                    alt="ROSHN"
                    style={{ height: mobile ? 16 : 24, objectFit: 'contain' }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
