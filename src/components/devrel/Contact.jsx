import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { BsArrowUpRight } from "react-icons/bs";
import { useBreakpoint } from "../../hooks/useBreakpoint";

const LINKS = [
  { Icon: SiGithub,   label: "GitHub",   sub: "github.com/ladicodes",      href: "https://github.com/ladicodes" },
  { Icon: FaLinkedin, label: "LinkedIn",  sub: "in/ladicodes",              href: "https://www.linkedin.com/in/ladicodes" },
  { Icon: FaTwitter,  label: "Twitter",   sub: "@ladicodez",                href: "https://www.x.com/ladicodez" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

export default function Contact({ onLinkHover, onLinkLeave }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { isMobile } = useBreakpoint();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const inputStyle = {
    width: "100%", background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8,
    padding: "14px 16px", fontSize: 14, color: "#ccc",
    outline: "none", boxSizing: "border-box",
    transition: "border-color 0.2s",
    fontFamily: "system-ui, sans-serif",
  };

  return (
    <section ref={ref} id="contact" style={{ width: "100%", backgroundColor: "#000", position: "relative" }}>
      <div style={{
        height: 1,
        background: "linear-gradient(90deg, transparent, rgba(184,12,9,0.3) 30%, rgba(255,0,0,0.5) 50%, rgba(184,12,9,0.3) 70%, transparent)",
        opacity: 0.6,
      }} />
      <div style={{
        position: "absolute", top: "20%", left: "-5%", width: 500, height: 500,
        background: "radial-gradient(circle, rgba(184,12,9,0.07) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <motion.div
        initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger}
        style={{ maxWidth: 1280, margin: "0 auto", padding: isMobile ? "60px 20px 80px" : "100px 24px 120px" }}
      >
        <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <span style={{ width: 28, height: 1, background: "#b80c09", display: "inline-block" }} />
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", color: "#9e0a08", textTransform: "uppercase" }}>
            Contact
          </span>
        </motion.div>

        <motion.h2 variants={fadeUp} style={{
          fontFamily: '"Science Gothic", system-ui, sans-serif',
          fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 900, lineHeight: 1,
          letterSpacing: "-0.02em", color: "#fff", margin: "0 0 16px 0",
        }}>
          Let's build<br />
          <span style={{ color: "#ff0000", textShadow: "0 0 40px rgba(255,0,0,0.25)" }}>together</span>
        </motion.h2>

        <motion.p variants={fadeUp} style={{
          fontSize: 15, lineHeight: 1.8, color: "#555", maxWidth: 480, margin: "0 0 56px 0",
        }}>
          Open to DevRel roles, speaking invitations, community collaborations, and technical advocacy work. Drop me a message.
        </motion.p>

        <motion.div variants={fadeUp} style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 40 : 80,
          alignItems: "start",
        }}>
          {/* Form */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {sent ? (
              <div style={{
                padding: "32px 24px", borderRadius: 12,
                background: "rgba(184,12,9,0.08)", border: "1px solid rgba(184,12,9,0.2)",
                textAlign: "center",
              }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>✓</div>
                <div style={{ fontSize: 15, color: "#e8e8e8", fontWeight: 700, marginBottom: 8 }}>Message sent!</div>
                <div style={{ fontSize: 13, color: "#555" }}>I'll get back to you soon.</div>
              </div>
            ) : (
              <>
                <input
                  type="text" placeholder="Your name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "rgba(184,12,9,0.5)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                />
                <input
                  type="email" placeholder="Your email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "rgba(184,12,9,0.5)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                />
                <textarea
                  placeholder="What's on your mind?"
                  value={form.message}
                  rows={5}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
                  onFocus={e => e.target.style.borderColor = "rgba(184,12,9,0.5)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                />
                <button
                  onClick={() => { if (form.name && form.email && form.message) setSent(true); }}
                  style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                    padding: "13px 28px", borderRadius: 8,
                    backgroundColor: "#b80c09", color: "#fff",
                    fontSize: 14, fontWeight: 700, letterSpacing: "0.04em",
                    border: "none", boxShadow: "0 0 24px rgba(184,12,9,0.4)",
                    transition: "background 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#ff0000"; e.currentTarget.style.boxShadow = "0 0 36px rgba(255,0,0,0.5)"; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#b80c09"; e.currentTarget.style.boxShadow = "0 0 24px rgba(184,12,9,0.4)"; }}
                >
                  Send Message
                  <BsArrowUpRight size={13} />
                </button>
              </>
            )}
          </div>

          {/* Social links */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "#333", textTransform: "uppercase", marginBottom: 8 }}>
              Or find me here
            </div>
            {LINKS.map(({ Icon, label, sub, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: 16, padding: "16px 20px",
                  borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.02)", textDecoration: "none",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(184,12,9,0.3)"; e.currentTarget.style.background = "rgba(184,12,9,0.04)"; onLinkHover?.(); }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; onLinkLeave?.(); }}
              >
                <Icon size={18} style={{ color: "#b80c09", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#e8e8e8", marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 11, color: "#444" }}>{sub}</div>
                </div>
                <BsArrowUpRight size={12} style={{ color: "#333" }} />
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
