import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const ease = [0.42, 0, 0.58, 1]

export default function SplashScreen({ onComplete, isTransition }) {
  const [phase, setPhase] = useState('enter')

  const enterDur = isTransition ? 250 : 400
  const holdDur = isTransition ? 300 : 1000
  const exitDur = isTransition ? 250 : 800

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), enterDur)
    const t2 = setTimeout(() => setPhase('exit'), enterDur + holdDur)
    const t3 = setTimeout(() => onComplete?.(), enterDur + holdDur + exitDur)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onComplete, enterDur, holdDur, exitDur])

  const assetAnimate =
    phase === 'enter'
      ? { opacity: 0, y: 50 }
      : phase === 'hold'
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: -50 }

  const overlayAnimate =
    phase === 'exit'
      ? { opacity: 0 }
      : { opacity: 1 }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ background: '#fff', transformOrigin: 'top' }}
      animate={overlayAnimate}
      transition={{ duration: exitDur / 1000, ease }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: 'rgba(0,0,0,0.03)',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '150px 150px',
        }}
      />
      <div className="relative flex items-center justify-center gap-3">
        <motion.img
          src="/logo/logo.png"
          alt="ROSHN"
          style={{ width: 140, height: 140, objectFit: 'contain' }}
          initial={{ opacity: 0, y: 50 }}
          animate={assetAnimate}
          transition={{ duration: 0.35, ease }}
        />

        <motion.img
          src="/logo/logo_world.png"
          alt="ROSHN"
          style={{ height: 56, objectFit: 'contain' }}
          initial={{ opacity: 0, y: 50 }}
          animate={assetAnimate}
          transition={{ duration: 0.35, ease }}
        />
      </div>
    </motion.div>
  )
}
