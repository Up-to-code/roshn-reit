import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const mouse = useRef({ x: 0, y: 0 })
  const shapeRef = useRef('dot')

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      cursor.style.display = 'none'
      return
    }

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY

      const el = document.elementFromPoint(e.clientX, e.clientY)
      if (!el) return

      const isTriangle = el.closest('.cursor-triangle')
      const isCircle = el.closest('.cursor-circle')
      const isLink = el.closest('a, button, [data-cursor]')

      let next = 'dot'
      if (isTriangle) next = 'triangle'
      else if (isCircle || isLink) next = 'circle'

      if (next === shapeRef.current) return
      shapeRef.current = next

      if (next === 'triangle') {
        gsap.to(cursor, {
          width: 0, height: 0,
          borderBottom: '20px solid #C8956C',
          borderLeft: '14px solid transparent',
          borderRight: '14px solid transparent',
          borderTop: 'none',
          borderRadius: 0,
          background: 'transparent',
          duration: 0.35, ease: 'power2.out',
        })
      } else if (next === 'circle') {
        gsap.to(cursor, {
          width: 44, height: 44,
          borderBottom: 'none', borderLeft: 'none', borderRight: 'none', borderTop: 'none',
          borderRadius: '50%',
          background: 'rgba(200,149,108,0.12)',
          duration: 0.35, ease: 'power2.out',
        })
      } else {
        gsap.to(cursor, {
          width: 10, height: 10,
          borderBottom: 'none', borderLeft: 'none', borderRight: 'none', borderTop: 'none',
          borderRadius: '50%',
          background: '#C8956C',
          duration: 0.25, ease: 'power2.out',
        })
      }
    }

    const animate = () => {
      const ease = 0.08
      pos.current.x += (mouse.current.x - pos.current.x) * ease
      pos.current.y += (mouse.current.y - pos.current.y) * ease
      cursor.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`
      requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMouseMove)
    const raf = requestAnimationFrame(animate)

    document.body.style.cursor = 'none'
    const style = document.createElement('style')
    style.textContent = 'a, button, [data-cursor] { cursor: none !important; }'
    document.head.appendChild(style)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(raf)
      document.body.style.cursor = ''
      style.remove()
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: 10, height: 10,
        borderRadius: '50%',
        background: '#C8956C',
        pointerEvents: 'none',
        zIndex: 99999,
        willChange: 'transform',
      }}
    />
  )
}
