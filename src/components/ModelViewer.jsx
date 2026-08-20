import { useEffect, useRef, useState, Suspense, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, ContactShadows, Center } from '@react-three/drei'
import * as THREE from 'three'

function Model({ url }) {
  const { scene } = useGLTF(url)
  const ref = useRef()

  useEffect(() => {
    if (!scene) return
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        if (child.material) {
          child.material.side = THREE.DoubleSide
          child.material.needsUpdate = true
        }
      }
    })
  }, [scene])

  return (
    <Center>
      <primitive ref={ref} object={scene} />
    </Center>
  )
}

function Loader() {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, background: '#F9FDFE' }}>
      <div style={{ position: 'relative', width: 48, height: 48 }}>
        <div style={{ position: 'absolute', inset: 0, border: '3px solid rgba(200,149,108,0.15)', borderRadius: '50%' }} />
        <div style={{
          position: 'absolute', inset: 0, border: '3px solid transparent', borderTopColor: '#C8956C', borderRadius: '50%',
          animation: 'spin3d 1s linear infinite',
        }} />
      </div>
      <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.82rem', color: '#1B1815', opacity: 0.5 }}>جاري تحميل النموذج ثلاثي الأبعاد...</p>
      <style>{`@keyframes spin3d { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

function Scene({ url, controlsRef }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-3, 5, -5]} intensity={0.4} />
      <pointLight position={[0, 3, 0]} intensity={0.5} />
      <hemisphereLight skyColor="#ffffff" groundColor="#3A3530" intensity={0.3} />

      <Model url={url} />

      <ContactShadows position={[0, -0.5, 0]} opacity={0.4} scale={20} blur={2} far={10} />

      <Environment preset="city" background={false} />

      <OrbitControls
        ref={controlsRef}
        enablePan={true}
        minDistance={0.5}
        maxDistance={20}
        autoRotate
        autoRotateSpeed={1}
        enableDamping
        dampingFactor={0.05}
        target={[0, 0, 0]}
        rotateSpeed={0.8}
        zoomSpeed={1.2}
        panSpeed={0.8}
        touches={{
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.DOLLY_PAN,
        }}
      />
    </>
  )
}

export default function ModelViewer({ isOpen, onClose, modelUrl = '/apartment_floor_plan.glb' }) {
  const overlayRef = useRef(null)
  const modalRef = useRef(null)
  const controlsRef = useRef()
  const [visible, setVisible] = useState(false)
  const [entered, setEntered] = useState(false)
  const [loading, setLoading] = useState(true)

  const handleKey = useCallback((e) => {
    if (!controlsRef.current) return
    const ctrl = controlsRef.current
    if (e.key === '+' || e.key === '=') {
      e.preventDefault()
      ctrl.dollyOut(1.4)
      ctrl.update()
    }
    if (e.key === '-' || e.key === '_') {
      e.preventDefault()
      ctrl.dollyIn(1.4)
      ctrl.update()
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      setLoading(true)
      setVisible(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setEntered(true))
      })
    } else {
      setEntered(false)
      const t = setTimeout(() => { setVisible(false); setLoading(true) }, 400)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      handleKey(e)
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = '' }
  }, [isOpen, onClose, handleKey])

  if (!visible) return null

  return (
    <div
      ref={overlayRef}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: entered ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0)',
        backdropFilter: entered ? 'blur(8px)' : 'blur(0px)',
        WebkitBackdropFilter: entered ? 'blur(8px)' : 'blur(0px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        cursor: 'pointer',
      }}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: entered ? '85vw' : '60vw',
          height: entered ? '80vh' : '40vh',
          maxWidth: 1200,
          background: '#F9FDFE',
          borderRadius: entered ? 16 : 12,
          overflow: 'hidden',
          position: 'relative',
          cursor: 'default',
          transform: entered ? 'scale(1)' : 'scale(0.9)',
          opacity: entered ? 1 : 0,
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.3)',
        }}
      >
        {/* Header */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, zIndex: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px',
          background: 'linear-gradient(180deg, rgba(249,253,254,0.95) 0%, rgba(249,253,254,0) 100%)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(200,149,108,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8956C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
            </div>
            <div>
              <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.85rem', fontWeight: 700, color: '#1B1815' }}>الاستكشاف ثلاثي الأبعاد</p>
              <p style={{ fontFamily: "'Saudi', sans-serif", fontSize: '0.68rem', color: '#1B1815', opacity: 0.4 }}>اسحب للتدوير • تمرير للتكبير • +/- للتقريب • سحب بimanين للتحريك</p>
            </div>
          </div>
          <button onClick={onClose} style={{
            width: 36, height: 36, borderRadius: 10, background: 'rgba(0,0,0,0.05)',
            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.1)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.05)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1B1815" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Loading */}
        {loading && <Loader />}

        {/* Canvas */}
        <Canvas
          camera={{ position: [4, 3, 4], fov: 40, near: 0.1, far: 100 }}
          style={{ background: '#F9FDFE', opacity: loading ? 0 : 1, transition: 'opacity 0.5s ease' }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
          shadows
          onCreated={() => setLoading(false)}
        >
          <Suspense fallback={null}>
            <Scene url={modelUrl} controlsRef={controlsRef} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}
