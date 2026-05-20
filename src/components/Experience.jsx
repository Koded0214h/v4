import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useBreakpoint } from "../hooks/useBreakpoint";

const EXPERIENCES = [
  {
    abbr: "GT",
    company: "GTBank · Squad",
    role: "Software Engineer",
    period: "Aug 2024 – Aug 2025",
    type: "Full-time",
    color: "#e85b04",
    highlights: [
      "Built a Django-based backend for the Fashion Weekend platform — improved API performance and DB efficiency by 25%.",
      "Maintained a production system serving 500+ participants with stable uptime.",
      "Fintech environment: strong focus on reliability, scalability, and secure system design.",
    ],
  },
  {
    abbr: "MS",
    company: "Microsoft Nigeria",
    role: "Software Engineering Intern",
    period: "Aug 2023 – Sep 2023",
    type: "Internship",
    color: "#00a4ef",
    highlights: [
      "Built a sensor-based IoT waste management system with real-time alerting — 35% operational efficiency gain.",
      "Designed optimised sensor-to-server data pipelines, improving reliability by 30%.",
      "Led a team of 5 engineers using Agile to deliver a production-ready prototype on schedule.",
    ],
  },
  {
    abbr: "FG",
    company: "FIRST Global Nigeria",
    role: "Software Engineer",
    period: "Apr 2024 – Oct 2024",
    type: "Competition",
    color: "#12b76a",
    highlights: [
      "Engineered robotics control logic for X-drive mobility and lift systems using Java.",
      "Applied Kalman filter optimisation to improve robot precision.",
      "Represented Nigeria at the FIRST Global Challenge among 100+ countries.",
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12 } },
};

function Card({ data }) {
  return (
    <motion.div
      variants={fadeUp}
      style={{
        flex: 1,
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 12,
        padding: "32px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        position: "relative",
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: "absolute",
        top: 0, left: "20%", right: "20%",
        height: 1,
        background: `linear-gradient(90deg, transparent, ${data.color}66 40%, ${data.color}99 50%, ${data.color}66 60%, transparent)`,
      }} />

      {/* Logo + meta */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 10, flexShrink: 0,
          background: `${data.color}14`,
          border: `1px solid ${data.color}33`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 900, color: data.color,
          fontFamily: '"Science Gothic", system-ui, sans-serif',
          letterSpacing: "0.04em",
        }}>
          {data.abbr}
        </div>

        <div>
          <div style={{
            fontSize: 16, fontWeight: 800, color: "#e8e8e8", lineHeight: 1.2, marginBottom: 3,
            fontFamily: '"Science Gothic", system-ui, sans-serif',
          }}>
            {data.company}
          </div>
          <div style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>{data.role}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", color: "#555", textTransform: "uppercase" }}>
              {data.period}
            </span>
            <span style={{
              fontSize: 9, fontWeight: 700, letterSpacing: "0.08em",
              color: "#333", textTransform: "uppercase",
              border: "1px solid #222", borderRadius: 3, padding: "1px 5px",
            }}>
              {data.type}
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />

      {/* Bullets */}
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
        {data.highlights.map((h, i) => (
          <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{
              flexShrink: 0, marginTop: 6,
              width: 4, height: 4, borderRadius: "50%",
              background: data.color,
              opacity: 0.7,
            }} />
            <span style={{ fontSize: 13, lineHeight: 1.7, color: "#555" }}>{h}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { isMobile, isTablet } = useBreakpoint();

  return (
    <section
      ref={ref}
      style={{ width: "100%", backgroundColor: "#000", position: "relative" }}
    >
      {/* Top divider */}
      <div style={{
        height: 1,
        background: "linear-gradient(90deg, transparent, rgba(184,12,9,0.3) 30%, rgba(255,0,0,0.5) 50%, rgba(184,12,9,0.3) 70%, transparent)",
        opacity: 0.6,
      }} />

      <motion.div
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={stagger}
        style={{ maxWidth: 1280, margin: "0 auto", padding: isMobile ? "60px 20px" : "100px 24px" }}
      >
        {/* Eyebrow */}
        <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <span style={{ width: 28, height: 1, background: "#b80c09", display: "inline-block" }} />
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", color: "#9e0a08", textTransform: "uppercase" }}>
            Experience
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2 variants={fadeUp} style={{
          fontFamily: '"Science Gothic", system-ui, sans-serif',
          fontSize: "clamp(36px, 5vw, 60px)",
          fontWeight: 900, lineHeight: 1, letterSpacing: "-0.02em",
          color: "#fff", margin: "0 0 56px 0",
        }}>
          Where I've<br />
          <span style={{ color: "#ff0000", textShadow: "0 0 40px rgba(255,0,0,0.25)" }}>shipped</span>
        </motion.h2>

        {/* Framed card group */}
        <motion.div variants={fadeUp} style={{ position: "relative", padding: 20 }}>

          {/* Corner brackets */}
          {[
            { top: 0,    left: 0   },
            { top: 0,    right: 0  },
            { bottom: 0, left: 0   },
            { bottom: 0, right: 0  },
          ].map((pos, i) => (
            <span key={i} style={{
              position: "absolute",
              width: 24, height: 24,
              borderColor: "rgba(184,12,9,0.6)",
              borderStyle: "solid",
              borderWidth: 0,
              borderTopWidth:    pos.top    !== undefined ? 2 : 0,
              borderBottomWidth: pos.bottom !== undefined ? 2 : 0,
              borderLeftWidth:   pos.left   !== undefined ? 2 : 0,
              borderRightWidth:  pos.right  !== undefined ? 2 : 0,
              ...pos,
            }} />
          ))}

          {/* Top edge line */}
          <div style={{
            position: "absolute", top: 0, left: "8%", right: "8%", height: 1,
            background: "linear-gradient(90deg, transparent, rgba(184,12,9,0.25) 30%, rgba(255,0,0,0.4) 50%, rgba(184,12,9,0.25) 70%, transparent)",
          }} />
          {/* Bottom edge line */}
          <div style={{
            position: "absolute", bottom: 0, left: "8%", right: "8%", height: 1,
            background: "linear-gradient(90deg, transparent, rgba(184,12,9,0.25) 30%, rgba(255,0,0,0.4) 50%, rgba(184,12,9,0.25) 70%, transparent)",
          }} />

          {/* Cards */}
          <motion.div
            variants={stagger}
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? 16 : 20,
              alignItems: "stretch",
            }}
          >
            {EXPERIENCES.map((exp, i) => (
              <Card key={i} data={exp} />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
