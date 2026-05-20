import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import about1 from "../assets/about1.jpg";
import about2 from "../assets/about2.jpg";
import about3 from "../assets/about3.jpg";
import about4 from "../assets/about4.jpg";
import { useBreakpoint } from "../hooks/useBreakpoint";

const IMAGES = [about3, about2, about1, about4];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
};

const W = { default: 89, hovered: 185, shrunk: 57 };

function ImageSlot({ src, index, hoveredIndex, onEnter, onLeave, onImageHover, onImageLeave }) {
  const isHovered = hoveredIndex === index;
  const isAnyHovered = hoveredIndex !== null;
  const slotW = isHovered ? W.hovered : isAnyHovered ? W.shrunk : W.default;

  return (
    <motion.div
      onMouseEnter={() => { onEnter(index); onImageHover?.(); }}
      onMouseLeave={() => { onLeave(); onImageLeave?.(); }}
      animate={{ width: slotW }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{ flexShrink: 0, height: "100%", borderRadius: 6, overflow: "hidden", position: "relative" }}
    >
      <motion.img src={src} alt={`About ${index + 1}`}
        animate={{ scale: isHovered ? 1.07 : 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
      />
      <AnimatePresence>
        {isHovered && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: "absolute", inset: 0,
              background: "linear-gradient(180deg, transparent 30%, rgba(184,12,9,0.55) 100%)", pointerEvents: "none" }} />
        )}
      </AnimatePresence>
      {[
        { top: 0, left: 0, borderTop: "1px solid", borderLeft: "1px solid" },
        { top: 0, right: 0, borderTop: "1px solid", borderRight: "1px solid" },
        { bottom: 0, left: 0, borderBottom: "1px solid", borderLeft: "1px solid" },
        { bottom: 0, right: 0, borderBottom: "1px solid", borderRight: "1px solid" },
      ].map((s, i) => (
        <motion.span key={i}
          animate={{ borderColor: isHovered ? "rgba(255,0,0,0.8)" : "rgba(184,12,9,0.35)" }}
          transition={{ duration: 0.3 }}
          style={{ position: "absolute", width: 14, height: 14, pointerEvents: "none", ...s }} />
      ))}
      <AnimatePresence>
        {isHovered && (
          <motion.span initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25 }}
            style={{ position: "absolute", bottom: 10, left: 10, fontSize: 10, fontWeight: 700,
              letterSpacing: "0.14em", color: "#fff", textTransform: "uppercase", pointerEvents: "none" }}>
            {String(index + 1).padStart(2, "0")}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function About({ onImageHover, onImageLeave, activeTab = 'DEV' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { isMobile, isTablet } = useBreakpoint();
  const isNarrow = isMobile || isTablet;
  const isDevRel = activeTab === 'DEVREL';

  return (
    <section ref={ref}
      style={{ width: "100%", backgroundColor: "#000000", position: "relative", overflow: "hidden" }}>
      <div style={{
        height: 1,
        background: "linear-gradient(90deg, transparent, rgba(184,12,9,0.3) 30%, rgba(255,0,0,0.5) 50%, rgba(184,12,9,0.3) 70%, transparent)",
        opacity: 0.6,
      }} />
      <div style={{
        position: "absolute", top: "10%", right: "-5%", width: 500, height: 500,
        background: "radial-gradient(circle, rgba(184,12,9,0.07) 0%, transparent 65%)", pointerEvents: "none",
      }} />

      <motion.div
        initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger}
        style={{
          display: isNarrow ? "flex" : "grid",
          flexDirection: isNarrow ? "column" : undefined,
          gridTemplateColumns: isNarrow ? undefined : "1fr auto",
          alignItems: isNarrow ? undefined : "stretch",
          maxWidth: 1280, margin: "0 auto",
          padding: isMobile ? "80px 20px 60px" : isTablet ? "100px 24px 80px" : "140px 24px 100px",
          gap: isMobile ? 48 : 72,
        }}
      >
        {/* LEFT — Text */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
            <span style={{ width: 28, height: 1, background: "#b80c09", display: "inline-block" }} />
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", color: "#9e0a08", textTransform: "uppercase" }}>
              About Me
            </span>
          </motion.div>

          <motion.h2 variants={fadeUp} style={{
            fontFamily: '"Science Gothic", system-ui, sans-serif',
            fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 900, lineHeight: 1,
            letterSpacing: "-0.02em", color: "#ffffff", margin: "0 0 32px 0",
          }}>
            The person<br />
            <span style={{ color: "#ff0000", textShadow: "0 0 40px rgba(255,0,0,0.25)" }}>behind the code</span>
          </motion.h2>

          <motion.div variants={fadeUp} style={{ width: 48, height: 2,
            background: "linear-gradient(90deg, #b80c09 0%, transparent 100%)", marginBottom: 28 }} />

          <motion.p variants={fadeUp} style={{ fontSize: 15, lineHeight: 1.8, color: "#888", maxWidth: 500, margin: "0 0 18px 0" }}>
            I'm Ladipo Samuel — a software engineer with a passion for building systems that scale and developer tools that actually make people's lives easier.
          </motion.p>
          <motion.p variants={fadeUp} style={{ fontSize: 15, lineHeight: 1.8, color: "#666", maxWidth: 500, margin: "0 0 18px 0" }}>
            My work sits at the intersection of infrastructure, AI, and community. Whether I'm architecting backend systems or writing technical content, I lead with clarity and craft.
          </motion.p>
          <motion.p variants={fadeUp} style={{ fontSize: 15, lineHeight: 1.8, color: "#555", maxWidth: 500, margin: 0 }}>
            Outside of code, I'm thinking about how to grow developer communities — from the first "hello world" to shipping production systems.
          </motion.p>

          <motion.div variants={fadeUp} style={{ display: "flex", gap: isMobile ? 28 : 40, marginTop: 44, flexWrap: "wrap" }}>
            {(isDevRel ? [
              { value: "10+", label: "Talks Given"      },
              { value: "6+",  label: "Communities Led"  },
              { value: "4k+", label: "Devs Reached"     },
            ] : [
              { value: "3+",  label: "Years Building"   },
              { value: "20+", label: "Projects Shipped"  },
              { value: "4k+", label: "Devs Reached"     },
            ]).map(({ value, label }) => (
              <div key={label}>
                <div style={{ fontSize: 28, fontWeight: 900, color: "#ff0000", lineHeight: 1, fontFamily: '"Science Gothic", system-ui, sans-serif' }}>{value}</div>
                <div style={{ fontSize: 11, color: "#444", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — Images */}
        {isMobile ? (
          /* Mobile: 2×2 static grid */
          <motion.div variants={fadeUp}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, height: 300 }}>
              {IMAGES.map((src, i) => (
                <div key={i} style={{ borderRadius: 6, overflow: "hidden" }}>
                  <img src={src} alt={`About ${i + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          /* Tablet / Desktop: accordion — must be direct grid child to get alignSelf */
          <motion.div
            variants={fadeUp}
            style={{
              display: "flex", flexDirection: "row", gap: 8,
              width: isTablet ? 320 : 380,
              flexShrink: 0,
              alignSelf: "stretch",
            }}
          >
            {IMAGES.map((src, i) => (
              <ImageSlot key={i} src={src} index={i}
                hoveredIndex={hoveredIndex}
                onEnter={setHoveredIndex}
                onLeave={() => setHoveredIndex(null)}
                onImageHover={onImageHover}
                onImageLeave={onImageLeave}
              />
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
