import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ROW_1, ROW_2 } from "../data/techstack";
import { useBreakpoint } from "../hooks/useBreakpoint";

const track1 = [...ROW_1, ...ROW_1, ...ROW_1];
const track2 = [...ROW_2, ...ROW_2, ...ROW_2];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12 } },
};

function TechItem({ Icon, name, compact }) {
  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: compact ? 0 : 8,
      padding: compact ? "0 20px" : "0 28px",
      flexShrink: 0,
      borderRight: "1px solid rgba(184,12,9,0.1)",
    }}>
      <Icon
        size={compact ? 16 : 17}
        style={{ color: "#b80c09", flexShrink: 0, filter: "drop-shadow(0 0 3px rgba(184,12,9,0.4))" }}
      />
      {!compact && (
        <span style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.1em",
          color: "#555",
          whiteSpace: "nowrap",
          textTransform: "uppercase",
        }}>
          {name}
        </span>
      )}
    </div>
  );
}

function MarqueeStrip({ items, direction, duration, accentTop, accentBottom, compact }) {
  const [paused, setPaused] = useState(false);
  const animName = direction === "left" ? "marqueeLeft" : "marqueeRight";

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        padding: compact ? "14px 0" : "18px 0",
        background: paused ? "rgba(184,12,9,0.03)" : "transparent",
        transition: "background 0.4s ease",
        cursor: "default",
        ...(accentTop    && { borderTop:    "1px solid rgba(184,12,9,0.12)" }),
        ...(accentBottom && { borderBottom: "1px solid rgba(184,12,9,0.12)" }),
      }}
    >
      {accentTop && (
        <div style={{
          position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
          background: "linear-gradient(90deg, transparent, #b80c09 30%, #ff0000 50%, #b80c09 70%, transparent)",
          opacity: paused ? 0.7 : 0.3, transition: "opacity 0.4s ease",
        }} />
      )}
      {accentBottom && (
        <div style={{
          position: "absolute", bottom: 0, left: "10%", right: "10%", height: 1,
          background: "linear-gradient(90deg, transparent, #b80c09 30%, #ff0000 50%, #b80c09 70%, transparent)",
          opacity: paused ? 0.7 : 0.3, transition: "opacity 0.4s ease",
        }} />
      )}

      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: compact ? 60 : 120,
        background: "linear-gradient(90deg, #000 0%, transparent 100%)",
        zIndex: 2, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: compact ? 60 : 120,
        background: "linear-gradient(270deg, #000 0%, transparent 100%)",
        zIndex: 2, pointerEvents: "none",
      }} />

      <div style={{
        display: "inline-flex",
        animation: `${animName} ${duration}s linear infinite`,
        animationPlayState: paused ? "paused" : "running",
        willChange: "transform",
      }}>
        {items.map((item, i) => (
          <TechItem key={i} Icon={item.Icon} name={item.name} compact={compact} />
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { isMobile } = useBreakpoint();

  return (
    <section
      ref={ref}
      style={{ width: "100%", backgroundColor: "#000", position: "relative", overflow: "hidden" }}
    >
      <div style={{
        height: 1,
        background: "linear-gradient(90deg, transparent, rgba(184,12,9,0.3) 30%, rgba(255,0,0,0.5) 50%, rgba(184,12,9,0.3) 70%, transparent)",
        opacity: 0.6,
      }} />

      <div style={{
        position: "absolute", bottom: "10%", left: "5%",
        width: 400, height: 400,
        background: "radial-gradient(circle, rgba(184,12,9,0.06) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      {/* Header */}
      <motion.div
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={stagger}
        style={{ maxWidth: 1280, margin: "0 auto", padding: isMobile ? "56px 20px 40px" : "80px 24px 56px" }}
      >
        <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <span style={{ width: 28, height: 1, background: "#b80c09", display: "inline-block" }} />
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", color: "#9e0a08", textTransform: "uppercase" }}>
            Engineering Stack
          </span>
        </motion.div>

        <motion.h2 variants={fadeUp} style={{
          fontFamily: '"Science Gothic", system-ui, sans-serif',
          fontSize: isMobile ? "clamp(28px, 8vw, 40px)" : "clamp(32px, 4vw, 52px)",
          fontWeight: 900, lineHeight: 1, letterSpacing: "-0.02em",
          color: "#fff", margin: "0 0 14px 0",
        }}>
          Built with the<br />
          <span style={{ color: "#ff0000", textShadow: "0 0 40px rgba(255,0,0,0.25)" }}>right tools</span>
        </motion.h2>

        <motion.p variants={fadeUp} style={{
          fontSize: isMobile ? 13 : 14, lineHeight: 1.7, color: "#444", maxWidth: 420, margin: 0,
        }}>
          Backend systems, cloud infrastructure, AI integrations, and developer tooling.
        </motion.p>
      </motion.div>

      {/* Strips */}
      <div style={{ padding: isMobile ? "0 0 56px" : "0 0 80px", display: "flex", flexDirection: "column", gap: isMobile ? 12 : 16 }}>

        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, padding: isMobile ? "0 20px" : "0 24px" }}>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", color: "#9e0a08", textTransform: "uppercase" }}>
              Languages &amp; Frameworks
            </span>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(184,12,9,0.3), transparent)" }} />
          </div>
          <MarqueeStrip items={track1} direction="left" duration={isMobile ? 30 : 50} accentTop compact={isMobile} />
        </div>

        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, padding: isMobile ? "0 20px" : "0 24px", justifyContent: "flex-end" }}>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(270deg, rgba(184,12,9,0.3), transparent)" }} />
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", color: "#9e0a08", textTransform: "uppercase" }}>
              Cloud · AI · Web3
            </span>
          </div>
          <MarqueeStrip items={track2} direction="right" duration={isMobile ? 36 : 62} accentBottom compact={isMobile} />
        </div>

      </div>
    </section>
  );
}
