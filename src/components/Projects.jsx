import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useBreakpoint } from "../hooks/useBreakpoint";
import { SiGithub } from "react-icons/si";
import { BsArrowUpRight } from "react-icons/bs";

const PROJECTS = [
  {
    image: null,
    tag: "Fintech · Behavioural",
    name: "StakeSync",
    description:
      "Financial accountability system where users stake money on personal goals. Failure triggers penalties redistributed to successful users — a behavioural incentive engine for consistency.",
    github: null,
    live: "https://s-gold-phi.vercel.app/",
  },
  {
    image: null,
    tag: "AI · Risk Intelligence",
    name: "RiskGuard AI",
    description:
      "AI-powered risk intelligence platform that analyses and surfaces threats in real time, helping teams make faster, more confident decisions under uncertainty.",
    github: null,
    live: "https://riskguard-ai-nine.vercel.app/",
  },
  {
    image: null,
    tag: "Education · Community",
    name: "Hackademy Portal",
    description:
      "Squad's developer education portal powering hackathons, learning tracks, and community cohorts — connecting builders across Africa with structured growth programs.",
    github: null,
    live: "https://hackademy-portal.squadinc.co",
  },
  {
    image: null,
    tag: "Accessibility · Social Impact",
    name: "EchoBridge",
    description:
      "Platform for persons with disabilities to showcase skills, connect with global organisations and NGOs, and access opportunities — built around inclusion and visibility.",
    github: null,
    live: "https://echo-bridge-frontend.vercel.app/",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
};

function Card({ data, onLinkHover, onLinkLeave }) {
  return (
    <motion.div
      variants={fadeUp}
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 12,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Image placeholder */}
      <div style={{
        width: "100%",
        aspectRatio: "16/9",
        background: "rgba(255,255,255,0.025)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
      }}>
        {data.image ? (
          <img
            src={data.image}
            alt={data.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <>
            {/* Subtle grid pattern */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage:
                "linear-gradient(rgba(184,12,9,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(184,12,9,0.04) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }} />
            {/* Center icon */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
              stroke="rgba(184,12,9,0.25)" strokeWidth="1.2" strokeLinecap="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18M9 21V9" />
            </svg>
          </>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        {/* Tag */}
        <span style={{
          fontSize: 9, fontWeight: 700, letterSpacing: "0.14em",
          color: "#9e0a08", textTransform: "uppercase",
        }}>
          {data.tag}
        </span>

        {/* Name */}
        <div style={{
          fontSize: 17, fontWeight: 800, color: "#e8e8e8", lineHeight: 1.2,
          fontFamily: '"Science Gothic", system-ui, sans-serif',
        }}>
          {data.name}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />

        {/* Description */}
        <p style={{ fontSize: 12, lineHeight: 1.75, color: "#555", margin: 0 }}>
          {data.description}
        </p>

        {/* Links */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: "auto", paddingTop: 4 }}>
          <a
            href={data.github || undefined}
            target={data.github ? "_blank" : undefined}
            rel="noopener noreferrer"
            title="GitHub"
            onClick={e => { if (!data.github) e.preventDefault(); }}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
              color: data.github ? "#888" : "#2a2a2a",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = data.github ? "#ff0000" : "#3a3a3a"; onLinkHover?.(); }}
            onMouseLeave={e => { e.currentTarget.style.color = data.github ? "#888" : "#2a2a2a"; onLinkLeave?.(); }}
          >
            <SiGithub size={13} />
            Source
          </a>

          <span style={{ width: 1, height: 12, background: "rgba(255,255,255,0.07)" }} />

          <a
            href={data.live || undefined}
            target={data.live ? "_blank" : undefined}
            rel="noopener noreferrer"
            title="Live"
            onClick={e => { if (!data.live) e.preventDefault(); }}
            style={{
              display: "flex", alignItems: "center", gap: 5,
              fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
              color: data.live ? "#888" : "#2a2a2a",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = data.live ? "#ff0000" : "#3a3a3a"; onLinkHover?.(); }}
            onMouseLeave={e => { e.currentTarget.style.color = data.live ? "#888" : "#2a2a2a"; onLinkLeave?.(); }}
          >
            <BsArrowUpRight size={11} />
            Live
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ onLinkHover, onLinkLeave }) {
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

      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "15%", left: "-5%",
        width: 500, height: 500,
        background: "radial-gradient(circle, rgba(184,12,9,0.06) 0%, transparent 65%)",
        pointerEvents: "none",
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
            Projects
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2 variants={fadeUp} style={{
          fontFamily: '"Science Gothic", system-ui, sans-serif',
          fontSize: "clamp(36px, 5vw, 60px)",
          fontWeight: 900, lineHeight: 1, letterSpacing: "-0.02em",
          color: "#fff", margin: "0 0 56px 0",
        }}>
          Things I've<br />
          <span style={{ color: "#ff0000", textShadow: "0 0 40px rgba(255,0,0,0.25)" }}>built</span>
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

          {/* 4 cards */}
          <motion.div variants={stagger} style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(4, 1fr)",
            gap: 16,
          }}>
            {PROJECTS.map((proj, i) => (
              <Card key={i} data={proj} onLinkHover={onLinkHover} onLinkLeave={onLinkLeave} />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
