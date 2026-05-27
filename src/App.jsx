import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import TechStack from './components/TechStack'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Footer from './components/Footer'
import Speaking from './components/devrel/Speaking'
import Mentorship from './components/devrel/Mentorship'
import Gallery from './components/devrel/Gallery'
import Philosophy from './components/devrel/Philosophy'
import Contact from './components/devrel/Contact'
import { MouseTrackerProvider, Pointer, PointerFollower } from './components/Cursor'
import FloatingVideo from './components/FloatingVideo'
import { BsLightningChargeFill, BsArrowUpRight } from 'react-icons/bs'
import { AnimatePresence, motion } from 'framer-motion'
import { useBreakpoint } from './hooks/useBreakpoint'

export default function App() {
  const [activeTab, setActiveTab] = useState('DEV')
  const [cursorMode, setCursorMode] = useState('default') // 'default' | 'image' | 'link'
  const { isDesktop } = useBreakpoint()

  return (
    <MouseTrackerProvider style={{ minHeight: '100vh' }}>

      {/* Cursor icon — desktop only */}
      {isDesktop && <Pointer>
        <AnimatePresence mode="wait">
          {cursorMode === 'image' ? (
            <motion.div
              key="expand"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.18 }}
              style={{
                width: 44, height: 44, borderRadius: '50%',
                border: '1.5px solid rgba(255,0,0,0.7)',
                background: 'rgba(184,12,9,0.15)',
                backdropFilter: 'blur(6px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#ff0000', fontSize: 16,
              }}
            >
              ↗
            </motion.div>
          ) : cursorMode === 'link' ? (
            <motion.div
              key="link"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.18 }}
              style={{ position: 'relative', width: 40, height: 40 }}
            >
              {/* spinning dashed ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', inset: 0, borderRadius: '50%',
                  border: '1.5px dashed rgba(255,0,0,0.85)',
                  boxShadow: '0 0 8px rgba(255,0,0,0.25)',
                }}
              />
              {/* static center arrow */}
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#ff0000',
              }}>
                <BsArrowUpRight size={13} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="bolt"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <BsLightningChargeFill
                size={22}
                style={{ color: '#ff0000', filter: 'drop-shadow(0 0 6px #ff000099)' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Pointer>}

      {/* Follower label — desktop only */}
      {isDesktop && <PointerFollower align="bottom-right">
        <AnimatePresence mode="wait">
          <motion.span
            key={cursorMode}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            style={{
              display: 'inline-block',
              background:
                cursorMode === 'image' ? 'rgba(255,0,0,0.9)' :
                cursorMode === 'link'  ? 'rgba(255,0,0,0.92)' :
                'rgba(184,12,9,0.85)',
              color: '#fff',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
              padding: '3px 8px', borderRadius: 4,
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,80,80,0.3)',
              whiteSpace: 'nowrap',
            }}
          >
            {cursorMode === 'image' ? 'View' : cursorMode === 'link' ? 'OPEN ↗' : 'LADICODEZ'}
          </motion.span>
        </AnimatePresence>
      </PointerFollower>}

      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      <Hero activeTab={activeTab} />

      <AnimatePresence mode="wait">
        {activeTab === 'DEV' ? (
          <motion.div key="dev"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}>
            <About
              onImageHover={() => setCursorMode('image')}
              onImageLeave={() => setCursorMode('default')}
            />
            <TechStack />
            <Experience />
            <Projects
              onLinkHover={() => setCursorMode('link')}
              onLinkLeave={() => setCursorMode('default')}
            />
          </motion.div>
        ) : (
          <motion.div key="devrel"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}>
            <Speaking
              onImageHover={() => setCursorMode('image')}
              onImageLeave={() => setCursorMode('default')}
            />
            <Mentorship
              onImageHover={() => setCursorMode('image')}
              onImageLeave={() => setCursorMode('default')}
            />
            <Gallery
              onImageHover={() => setCursorMode('image')}
              onImageLeave={() => setCursorMode('default')}
            />
            <Philosophy />
            <Contact
              onLinkHover={() => setCursorMode('link')}
              onLinkLeave={() => setCursorMode('default')}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer
        onLinkHover={() => setCursorMode('link')}
        onLinkLeave={() => setCursorMode('default')}
      />

      <FloatingVideo />

    </MouseTrackerProvider>
  )
}
