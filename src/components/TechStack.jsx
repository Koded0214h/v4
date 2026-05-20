import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ROW_1, ROW_2 } from "../data/techstack";

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

function TechItem({ Icon, name }) {
  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
      padding: "0 48px",
      flexShrink: 0,
      borderRight: "1px solid rgba(184,12,9,0.15)",
    }}>
      <Icon
        size={20}
        style={{ color: "#b80c09", flexShrink: 0, filter: "drop-shadow(0 0 4px rgba(184,12,9,0.5))" }}
      />
      <span style={{
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.12em",
        color: "#666",
        whiteSpace: "nowrap",
        textTransform: "uppercase",
      }}>
        {name}
      </span>
    </div>
  );
}

function MarqueeStrip({ items, direction, duration, accentTop, accentBottom }) {
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
        padding: "20px 0",
        background: paused
          ? "rgba(184,12,9,0.04)"
          : "transparent",
        transition: "background 0.4s ease",
        cursor: "default",
        ...(accentTop    && { borderTop:    "1px solid rgba(184,12,9,0.18)" }),
        ...(accentBottom && { borderBottom: "1px solid rgba(184,12,9,0.18)" }),
      }}
    >
      {/* Red glow line */}
      {accentTop && (
        <div style={{
          position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
          background: "linear-gradient(90deg, transparent, #b80c09 30%, #ff0000 50%, #b80c09 70%, transparent)",
          opacity: paused ? 0.9 : 0.4,
          transition: "opacity 0.4s ease",
        }} />
      )}
      {accentBottom && (
        <div style={{
          position: "absolute", bottom: 0, left: "10%", right: "10%", height: 1,
          background: "linear-gradient(90deg, transparent, #b80c09 30%, #ff0000 50%, #b80c09 70%, transparent)",
          opacity: paused ? 0.9 : 0.4,
          transition: "opacity 0.4s ease",
        }} />
      )}

      {/* Edge fade — extreme left */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 200,
        background: "linear-gradient(90deg, #000 0%, rgba(0,0,0,0.6) 60%, transparent 100%)",
        zIndex: 2, pointerEvents: "none",
      }} />
      {/* Edge fade — extreme right */}
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: 200,
        background: "linear-gradient(270deg, #000 0%, rgba(0,0,0,0.6) 60%, transparent 100%)",
        zIndex: 2, pointerEvents: "none",
      }} />

      {/* Scrolling track */}
      <div style={{
        display: "inline-flex",
        animation: `${animName} ${duration}s linear infinite`,
        animationPlayState: paused ? "paused" : "running",
        willChange: "transform",
      }}>
        {items.map((item, i) => (
          <TechItem key={i} Icon={item.Icon} name={item.name} />
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      style={{ width: "100%", backgroundColor: "#000", position: "relative", overflow: "hidden" }}
    >
      {/* Top divider */}
      <div style={{
        height: 1,
        background: "linear-gradient(90deg, transparent, rgba(184,12,9,0.3) 30%, rgba(255,0,0,0.5) 50%, rgba(184,12,9,0.3) 70%, transparent)",
        opacity: 0.6,
      }} />

      {/* Ambient glow */}
      <div style={{
        position: "absolute", bottom: "10%", left: "5%",
        width: 500, height: 500,
        background: "radial-gradient(circle, rgba(184,12,9,0.07) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      {/* Header */}
      <motion.div
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={stagger}
        style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 24px 72px" }}
      >
        <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <span style={{ width: 28, height: 1, background: "#b80c09", display: "inline-block" }} />
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", color: "#9e0a08", textTransform: "uppercase" }}>
            Engineering Stack
          </span>
        </motion.div>

        <motion.h2 variants={fadeUp} style={{
          fontFamily: '"Science Gothic", system-ui, sans-serif',
          fontSize: "clamp(36px, 5vw, 60px)",
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: "-0.02em",
          color: "#fff",
          margin: "0 0 20px 0",
        }}>
          Built with the<br />
          <span style={{ color: "#ff0000", textShadow: "0 0 40px rgba(255,0,0,0.25)" }}>
            right tools
          </span>
        </motion.h2>

        <motion.p variants={fadeUp} style={{
          fontSize: 15, lineHeight: 1.8, color: "#555", maxWidth: 480, margin: 0,
        }}>
          I work across backend systems, cloud infrastructure, AI integrations, and developer tooling.
        </motion.p>
      </motion.div>

      {/* Strips */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 100px", display: "flex", flexDirection: "column", gap: 20 }}>

        {/* Row 1 — Languages & Frameworks */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, paddingLeft: 2 }}>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", color: "#9e0a08", textTransform: "uppercase" }}>
              Languages &amp; Frameworks
            </span>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(184,12,9,0.35), transparent)" }} />
            <span style={{ fontSize: 10, color: "rgba(184,12,9,0.5)" }}>→</span>
          </div>
          <MarqueeStrip items={track1} direction="left" duration={50} accentTop />
        </div>

        {/* Row 2 — Cloud · AI · Web3 */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, paddingLeft: 2 }}>
            <span style={{ fontSize: 10, color: "rgba(184,12,9,0.5)" }}>←</span>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(270deg, rgba(184,12,9,0.35), transparent)" }} />
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", color: "#9e0a08", textTransform: "uppercase" }}>
              Cloud · AI · Web3 &amp; Tooling
            </span>
          </div>
          <MarqueeStrip items={track2} direction="right" duration={62} accentBottom />
        </div>

      </div>
    </section>
  );
}
