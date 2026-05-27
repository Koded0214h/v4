import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useBreakpoint } from "../hooks/useBreakpoint";
import { SiGithub } from "react-icons/si";
import { FaLinkedin, FaTwitter, FaDev } from "react-icons/fa";

function TextHoverEffect({ text }) {
  const svgRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      setMaskPosition({
        cx: `${((cursor.x - rect.left) / rect.width) * 100}%`,
        cy: `${((cursor.y - rect.top) / rect.height) * 100}%`,
      });
    }
  }, [cursor]);

  const txt = {
    fontFamily: '"Science Gothic", system-ui, sans-serif',
    fontWeight: 900,
    fontSize: "clamp(28px, 5.5vw, 72px)",
    letterSpacing: "-0.02em",
    fill: "transparent",
  };

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={e => setCursor({ x: e.clientX, y: e.clientY })}
      style={{ display: "block", userSelect: "none" }}
    >
      <defs>
        <linearGradient id="fGrad" gradientUnits="userSpaceOnUse" cx="50%" cy="50%" r="25%">
          {hovered && (
            <>
              <stop offset="0%"   stopColor="#ff0000" />
              <stop offset="20%"  stopColor="#ff6b00" />
              <stop offset="40%"  stopColor="#ffcc00" />
              <stop offset="60%"  stopColor="#ff4444" />
              <stop offset="80%"  stopColor="#b80c09" />
              <stop offset="100%" stopColor="#ff0000" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="fMaskGrad"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: 0, ease: "easeOut" }}
        >
          <stop offset="0%"   stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>

        <mask id="fMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#fMaskGrad)" />
        </mask>
      </defs>

      {/* Dim outline — fades in on hover */}
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" strokeWidth="0.3"
        style={{ ...txt, stroke: "rgba(255,255,255,0.1)", opacity: hovered ? 0.7 : 0, transition: "opacity 0.35s" }}>
        {text}
      </text>

      {/* Draw-on stroke animation */}
      <motion.text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" strokeWidth="0.3"
        style={{ ...txt, stroke: "rgba(184,12,9,0.5)" }}
        initial={{ strokeDashoffset: 1500, strokeDasharray: 1500 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1500 }}
        transition={{ duration: 4, ease: "easeInOut" }}>
        {text}
      </motion.text>

      {/* Gradient reveal under cursor */}
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" strokeWidth="0.3"
        stroke="url(#fGrad)" mask="url(#fMask)"
        style={{ ...txt }}>
        {text}
      </text>
    </svg>
  );
}

const SOCIALS = [
  { Icon: SiGithub,   label: "GitHub",   href: "https://github.com/ladicodes" },
  { Icon: FaLinkedin, label: "LinkedIn",  href: "https://www.linkedin.com/in/ladicodes" },
  { Icon: FaTwitter,  label: "Twitter",   href: "https://www.x.com/ladicodez" },
  { Icon: FaDev,      label: "Dev.to",    href: "https://dev.to/ladipo_samuel_7cfaa827bf5" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
};

export default function Footer({ onLinkHover, onLinkLeave }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { isMobile } = useBreakpoint();

  return (
    <footer
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
        position: "absolute", bottom: "30%", right: "-5%",
        width: 500, height: 500,
        background: "radial-gradient(circle, rgba(184,12,9,0.07) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <motion.div
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={stagger}
        style={{ maxWidth: 1280, margin: "0 auto", padding: isMobile ? "60px 20px 0" : "80px 24px 0" }}
      >
        {/* Eyebrow */}
        <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <span style={{ width: 28, height: 1, background: "#b80c09", display: "inline-block" }} />
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", color: "#9e0a08", textTransform: "uppercase" }}>
            Let's connect
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2 variants={fadeUp} style={{
          fontFamily: '"Science Gothic", system-ui, sans-serif',
          fontSize: "clamp(30px, 4.5vw, 56px)",
          fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.02em",
          color: "#fff", margin: "0 0 16px 0",
        }}>
          Building systems<br />
          <span style={{ color: "#ff0000", textShadow: "0 0 40px rgba(255,0,0,0.25)" }}>that matter.</span>
        </motion.h2>

        {/* Tagline */}
        <motion.p variants={fadeUp} style={{
          fontSize: 14, lineHeight: 1.8, color: "#555",
          maxWidth: 460, margin: "0 0 48px 0",
        }}>
          Backend engineer · Developer Advocate · Community builder.
          Open to collaborations, contracts, and conversations.
        </motion.p>

        {/* Bottom bar */}
        <motion.div variants={fadeUp} style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          paddingTop: 24, paddingBottom: 8,
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap", gap: 16,
        }}>
          {/* Social links */}
          <div style={{ display: "flex", gap: isMobile ? 16 : 24, flexWrap: "wrap" }}>
            {SOCIALS.map(({ Icon, label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                style={{
                  display: "flex", alignItems: "center", gap: 7,
                  fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
                  color: "#444", textDecoration: "none", textTransform: "uppercase",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = "#ff0000"; onLinkHover?.(); }}
                onMouseLeave={e => { e.currentTarget.style.color = "#444"; onLinkLeave?.(); }}
              >
                <Icon size={15} />
                {isMobile ? null : label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <span style={{ fontSize: 10, color: "#2e2e2e", letterSpacing: "0.08em" }}>
            © {new Date().getFullYear()} Ladipo Samuel · All rights reserved
          </span>
        </motion.div>
      </motion.div>

      {/* Big text hover effect — constrained to content width */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ height: 160, marginTop: -16 }}>
          <TextHoverEffect text="SAMUEL LADIPO" />
        </div>
      </div>
    </footer>
  );
}
