import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBreakpoint } from "../hooks/useBreakpoint";

export default function FloatingVideo() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { isMobile, isTablet } = useBreakpoint();
  const isNarrow = isMobile || isTablet;

  if (dismissed) return null;

  const toggleMute = () => {
    setMuted(m => {
      if (videoRef.current) videoRef.current.muted = !m;
      return !m;
    });
  };

  // Mobile: small circular pip, no header, just video + close dot
  if (isNarrow) {
    const size = 72;
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
          style={{
            position: "fixed",
            bottom: 20,
            right: 16,
            zIndex: 100,
            width: size,
            height: size,
            borderRadius: "50%",
            overflow: "hidden",
            border: "1.5px solid rgba(184,12,9,0.5)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
          }}
        >
          <video
            ref={videoRef}
            src="/intro.mp4"
            autoPlay
            loop
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          {/* Close button */}
          <button
            onClick={() => setDismissed(true)}
            style={{
              position: "absolute", top: 2, right: 2,
              width: 18, height: 18, borderRadius: "50%",
              background: "rgba(0,0,0,0.7)",
              border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: 0,
            }}
          >
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Desktop: full card with header bar
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: 0.92 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 100,
          width: 220,
          borderRadius: 10,
          overflow: "hidden",
          border: "1px solid rgba(184,12,9,0.45)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.7), 0 0 24px rgba(184,12,9,0.2)",
          background: "#000",
        }}
      >
        {/* Header bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "6px 8px 6px 10px",
          background: "rgba(184,12,9,0.15)",
          borderBottom: "1px solid rgba(184,12,9,0.2)",
        }}>
          <span style={{
            fontSize: 9, fontWeight: 700, letterSpacing: "0.14em",
            color: "rgba(255,255,255,0.45)", textTransform: "uppercase",
          }}>
            Intro
          </span>
          <div style={{ display: "flex", gap: 4 }}>
            <button
              onClick={toggleMute}
              title={muted ? "Unmute" : "Mute"}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: "rgba(255,255,255,0.4)", padding: "2px 4px",
                display: "flex", alignItems: "center", transition: "color 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "#fff"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
            >
              {muted ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
              )}
            </button>
            <button
              onClick={() => setDismissed(true)}
              title="Close"
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: "rgba(255,255,255,0.4)", padding: "2px 4px",
                display: "flex", alignItems: "center", transition: "color 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "#ff4444"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        <video
          ref={videoRef}
          src="/intro.mp4"
          autoPlay
          loop
          playsInline
          style={{ width: "100%", display: "block", aspectRatio: "9/16", objectFit: "cover" }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
