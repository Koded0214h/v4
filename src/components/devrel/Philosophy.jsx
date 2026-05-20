import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useBreakpoint } from "../../hooks/useBreakpoint";

const BELIEFS = [
  {
    num: "01",
    title: "Developers deserve great experiences",
    body: "A confusing API, a missing doc, a broken onboarding flow — these aren't small things. They're the difference between a developer choosing your platform or walking away. I build and advocate for experiences that make developers feel respected.",
  },
  {
    num: "02",
    title: "Community compounds",
    body: "One developer who finds their footing in a community goes on to help ten more. That ten becomes a hundred. I've seen it happen. Community investment isn't charity — it's the highest-leverage work in tech.",
  },
  {
    num: "03",
    title: "Technical depth earns trust",
    body: "You can't advocate for something you don't understand deeply. I stay close to the code — shipping, debugging, building — so that when I speak, I speak from experience, not from a slide deck.",
  },
  {
    num: "04",
    title: "Africa's developer ecosystem is the opportunity",
    body: "There are thousands of brilliant engineers across Nigeria and Africa building world-class products with world-class skill. Connecting them to global resources, platforms, and communities is work I care about deeply.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

export default function Philosophy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { isMobile } = useBreakpoint();

  return (
    <section ref={ref} style={{ width: "100%", backgroundColor: "#000", position: "relative" }}>
      <div style={{
        height: 1,
        background: "linear-gradient(90deg, transparent, rgba(184,12,9,0.3) 30%, rgba(255,0,0,0.5) 50%, rgba(184,12,9,0.3) 70%, transparent)",
        opacity: 0.6,
      }} />
      <div style={{
        position: "absolute", top: "30%", right: "-5%", width: 500, height: 500,
        background: "radial-gradient(circle, rgba(184,12,9,0.06) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <motion.div
        initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger}
        style={{ maxWidth: 1280, margin: "0 auto", padding: isMobile ? "60px 20px" : "100px 24px" }}
      >
        <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <span style={{ width: 28, height: 1, background: "#b80c09", display: "inline-block" }} />
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", color: "#9e0a08", textTransform: "uppercase" }}>
            Philosophy
          </span>
        </motion.div>

        <motion.h2 variants={fadeUp} style={{
          fontFamily: '"Science Gothic", system-ui, sans-serif',
          fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 900, lineHeight: 1,
          letterSpacing: "-0.02em", color: "#fff", margin: "0 0 72px 0",
        }}>
          What I<br />
          <span style={{ color: "#ff0000", textShadow: "0 0 40px rgba(255,0,0,0.25)" }}>believe</span>
        </motion.h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {BELIEFS.map((b, i) => (
            <motion.div key={i} variants={fadeUp} style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "80px 1fr",
              gap: isMobile ? 16 : 48,
              padding: "40px 0",
              borderBottom: i < BELIEFS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              alignItems: "start",
            }}>
              {/* Number */}
              <span style={{
                fontSize: isMobile ? 12 : 11, fontWeight: 700, letterSpacing: "0.18em",
                color: "#b80c09", fontFamily: '"Science Gothic", system-ui, sans-serif',
                paddingTop: isMobile ? 0 : 4,
              }}>
                {b.num}
              </span>

              {/* Content */}
              <div>
                <div style={{
                  fontSize: isMobile ? 18 : 22, fontWeight: 800, color: "#e8e8e8", lineHeight: 1.25,
                  fontFamily: '"Science Gothic", system-ui, sans-serif',
                  marginBottom: 16,
                }}>
                  {b.title}
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.85, color: "#555", margin: 0, maxWidth: 640 }}>
                  {b.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
