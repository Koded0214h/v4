import { motion } from "framer-motion";
import headHero from "../assets/hero.png";
import { useBreakpoint } from "../hooks/useBreakpoint";

const PHOTO_SRC = headHero;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

function CornerBracket({ pos }) {
  const s = 22, t = 2, color = "rgba(184,12,9,0.7)";
  return (
    <span aria-hidden="true" style={{
      position: "absolute", width: s, height: s, ...pos,
      borderColor: color, borderStyle: "solid", borderWidth: 0,
      borderTopWidth:    pos.top    !== undefined ? t : 0,
      borderBottomWidth: pos.bottom !== undefined ? t : 0,
      borderLeftWidth:   pos.left   !== undefined ? t : 0,
      borderRightWidth:  pos.right  !== undefined ? t : 0,
      pointerEvents: "none",
    }} />
  );
}

function PhotoFrame({ isMobile }) {
  const w = isMobile ? 220 : 340;
  const h = isMobile ? 270 : 420;
  return (
    <div style={{ position: "relative", width: w, height: h, flexShrink: 0, margin: isMobile ? "0 auto" : 0 }}>
      <div style={{
        position: "absolute", inset: -40,
        background: "radial-gradient(ellipse at 50% 50%, rgba(184,12,9,0.18) 0%, transparent 68%)",
        pointerEvents: "none",
      }} />
      <CornerBracket pos={{ top: 0, left: 0 }} />
      <CornerBracket pos={{ top: 0, right: 0 }} />
      <CornerBracket pos={{ bottom: 0, left: 0 }} />
      <CornerBracket pos={{ bottom: 0, right: 0 }} />
      <div style={{
        width: "100%", height: "100%",
        border: PHOTO_SRC ? "none" : "1px solid rgba(184,12,9,0.18)",
        borderRadius: 6, overflow: "hidden",
        background: PHOTO_SRC ? "transparent" : "rgba(255,255,255,0.012)",
        display: "flex", alignItems: "flex-end", justifyContent: "center",
        position: "relative",
      }}>
        {PHOTO_SRC ? (
          <img src={PHOTO_SRC} alt="Ladipo Samuel"
            style={{ width: "100%", height: "auto", display: "block" }} />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, userSelect: "none" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(184,12,9,0.4)" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span style={{ fontSize: 11, letterSpacing: "0.12em", color: "rgba(255,255,255,0.1)", textTransform: "uppercase" }}>photo</span>
          </div>
        )}
      </div>
      <div style={{
        position: "absolute", bottom: -28, left: "50%", transform: "translateX(-50%)",
        display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap",
      }}>
        <span style={{ width: 20, height: 1, background: "rgba(184,12,9,0.4)", display: "inline-block" }} />
        <span style={{ fontSize: 10, letterSpacing: "0.14em", color: "rgba(255,255,255,0.15)", textTransform: "uppercase" }}>Ladipo Samuel</span>
        <span style={{ width: 20, height: 1, background: "rgba(184,12,9,0.4)", display: "inline-block" }} />
      </div>
    </div>
  );
}

const STARS = [
  { top: "10%",  left: "6%",   size: 11, opacity: 0.45, delay: "0s",   dur: "5s"   },
  { top: "28%",  left: "3%",   size:  7, opacity: 0.38, delay: "1.8s", dur: "6.5s" },
  { top: "60%",  left: "8%",   size: 14, opacity: 0.42, delay: "3.2s", dur: "4.8s" },
  { top: "82%",  left: "18%",  size:  8, opacity: 0.35, delay: "0.6s", dur: "7s"   },
  { top: "8%",   left: "88%",  size: 13, opacity: 0.45, delay: "1.1s", dur: "6s"   },
  { top: "35%",  left: "94%",  size:  8, opacity: 0.38, delay: "4s",   dur: "5s"   },
  { top: "72%",  left: "82%",  size: 10, opacity: 0.40, delay: "2s",   dur: "7.5s" },
  { top: "18%",  left: "70%",  size:  9, opacity: 0.36, delay: "3.5s", dur: "6s"   },
];

export default function Hero({ activeTab = 'DEV' }) {
  const { isMobile, isTablet } = useBreakpoint();
  const isNarrow = isMobile || isTablet;
  const isDevRel = activeTab === 'DEVREL';

  return (
    <section style={{
      width: "100%",
      minHeight: "calc(100vh - 64px)",
      backgroundColor: "#000000",
      display: "flex",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Floating stars — fewer on mobile */}
      {STARS.slice(0, isMobile ? 4 : STARS.length).map((s, i) => (
        <svg key={i} aria-hidden="true" width={s.size} height={s.size} viewBox="0 0 24 24" fill="#ff2200"
          style={{ position: "absolute", top: s.top, left: s.left, opacity: s.opacity,
            animation: `floatStar ${s.dur} ease-in-out ${s.delay} infinite`, pointerEvents: "none" }}>
          <path d="M12 1 L13.9 9.8 L23 12 L13.9 14.2 L12 23 L10.1 14.2 L1 12 L10.1 9.8 Z" />
        </svg>
      ))}

      {/* Ambient glows */}
      <div style={{ position: "absolute", top: "-15%", left: "-8%", width: 560, height: 560,
        background: "radial-gradient(circle, rgba(184,12,9,0.09) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-20%", right: "5%", width: 440, height: 440,
        background: "radial-gradient(circle, rgba(184,12,9,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />

      {/* Content */}
      <motion.div
        initial="hidden" animate="show" variants={stagger}
        style={{
          display: isNarrow ? "flex" : "grid",
          flexDirection: isNarrow ? "column" : undefined,
          gridTemplateColumns: isNarrow ? undefined : "1fr auto",
          alignItems: "center",
          maxWidth: 1280,
          margin: "0 auto",
          padding: isMobile ? "60px 20px 80px" : isTablet ? "70px 24px 100px" : "80px 24px 120px",
          width: "100%",
          gap: isMobile ? 48 : isTablet ? 56 : 80,
        }}
      >
        {/* Text */}
        <div>
          <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
            <span style={{ width: 28, height: 1, background: "#b80c09", display: "inline-block" }} />
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", color: "#9e0a08", textTransform: "uppercase" }}>
              {isDevRel ? "Developer Relations" : "Portfolio"}
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp} style={{
            fontFamily: '"Science Gothic", system-ui, sans-serif',
            fontSize: isMobile ? "clamp(52px, 14vw, 72px)" : "clamp(60px, 9vw, 108px)",
            fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.02em",
            color: "#ffffff", margin: "0 0 36px 0",
          }}>
            Ladipo<br />
            <span style={{ color: "#ff0000", textShadow: "0 0 48px rgba(255,0,0,0.3), 0 0 80px rgba(184,12,9,0.2)" }}>
              {isDevRel ? "Advocate" : "Samuel"}
            </span>
          </motion.h1>

          <motion.div variants={fadeUp} style={{ width: 56, height: 2,
            background: "linear-gradient(90deg, #b80c09 0%, transparent 100%)", marginBottom: 32 }} />

          {isDevRel ? (
            <>
              <motion.p variants={fadeUp} style={{ fontSize: 15, lineHeight: 1.8, color: "#888",
                maxWidth: isMobile ? "100%" : 520, margin: "0 0 18px 0" }}>
                Developer Relations Engineer and community builder who bridges the gap between great technology and the developers who should be using it.
              </motion.p>
              <motion.p variants={fadeUp} style={{ fontSize: 15, lineHeight: 1.8, color: "#555",
                maxWidth: isMobile ? "100%" : 520, margin: 0 }}>
                I speak, write, mentor, and ship — helping developers grow, communities thrive, and ecosystems expand across Africa and beyond.
              </motion.p>
            </>
          ) : (
            <>
              <motion.p variants={fadeUp} style={{ fontSize: 15, lineHeight: 1.8, color: "#888",
                maxWidth: isMobile ? "100%" : 520, margin: "0 0 18px 0" }}>
                Software Engineer, Developer Relations Engineer, and systems-focused builder passionate about scalable infrastructure, AI-powered products, and developer ecosystems.
              </motion.p>
              <motion.p variants={fadeUp} style={{ fontSize: 15, lineHeight: 1.8, color: "#555",
                maxWidth: isMobile ? "100%" : 520, margin: 0 }}>
                Building technology that solves real-world problems while empowering communities to grow from learners into builders.
              </motion.p>
            </>
          )}

          <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 40, flexWrap: "wrap" }}>
            <a href="#contact" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "12px 28px", borderRadius: 6, backgroundColor: "#b80c09",
              color: "#fff", fontSize: 14, fontWeight: 700, letterSpacing: "0.04em",
              textDecoration: "none", boxShadow: "0 0 24px rgba(184,12,9,0.45)", transition: "background 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#ff0000"; e.currentTarget.style.boxShadow = "0 0 36px rgba(255,0,0,0.55)"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#b80c09"; e.currentTarget.style.boxShadow = "0 0 24px rgba(184,12,9,0.45)"; }}
            >{isDevRel ? "Let's Talk" : "Contact"}</a>
            <a href="#about" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "11px 28px", borderRadius: 6, backgroundColor: "transparent",
              color: "#888", fontSize: 14, fontWeight: 600, letterSpacing: "0.04em",
              textDecoration: "none", border: "1px solid rgba(255,255,255,0.1)", transition: "color 0.2s, border-color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(184,12,9,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#888"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
            >{isDevRel ? "My Work" : "Meet Me"}</a>
            <a
              href={isDevRel ? "/resume-devrel.pdf" : "/resume-dev.pdf"}
              download
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                padding: "11px 22px", borderRadius: 6, backgroundColor: "transparent",
                color: "#666", fontSize: 13, fontWeight: 600, letterSpacing: "0.04em",
                textDecoration: "none", border: "1px solid rgba(255,255,255,0.08)", transition: "color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "#ccc"; e.currentTarget.style.borderColor = "rgba(184,12,9,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#666"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Resume
            </a>
          </motion.div>
        </div>

        {/* Photo */}
        <motion.div variants={fadeUp}>
          <PhotoFrame isMobile={isMobile} />
        </motion.div>
      </motion.div>
    </section>
  );
}
