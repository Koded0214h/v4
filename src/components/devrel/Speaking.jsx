import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import ImageModal from "../ImageModal";
import techpulseImg from "../../assets/techpulse.JPG";
import cafeCursorImg from "../../assets/cafe_cursor.JPG";

const EVENTS = [
  {
    name: "TechPulse",
    type: "Speaker",
    year: "2024",
    topic: "Delivered a talk on developer advocacy and building thriving tech communities across Africa.",
    location: "Lagos, Nigeria",
    color: "#b80c09",
    images: [{ src: techpulseImg, caption: "TechPulse — Speaker Session" }],
  },
  {
    name: "Cafe Cursor",
    type: "Pitcher",
    year: "2024",
    topic: "Pitched cencori.com — a developer-focused product — at this community-driven tech event.",
    location: "Lagos, Nigeria",
    color: "#f59e0b",
    images: [{ src: cafeCursorImg, caption: "Cafe Cursor — Cencori.com Pitch" }],
  },
  {
    name: "Hult Prize",
    type: "Mentor & Speaker",
    year: "2024",
    topic: "Building for impact — guiding student teams from idea to pitch.",
    location: "Lagos, Nigeria",
    color: "#12b76a",
  },
  {
    name: "Stanford HackTree",
    type: "Finalist",
    year: "2024",
    topic: "Represented Nigeria in international student innovation challenge.",
    location: "Remote / Stanford",
    color: "#8b5cf6",
  },
  {
    name: "HackMIT",
    type: "Participant",
    year: "2023",
    topic: "Competed alongside global engineering talent at MIT's flagship hackathon.",
    location: "Remote / MIT",
    color: "#06b6d4",
  },
  {
    name: "FIRST Global Challenge",
    type: "Speaker & Engineer",
    year: "2024",
    topic: "Represented Nigeria, spoke on engineering discipline and team collaboration.",
    location: "International",
    color: "#12b76a",
  },
  {
    name: "Hackathon Organizer",
    type: "Organizer",
    year: "2023–2024",
    topic: "Designed challenges, judged submissions, coached winning teams.",
    location: "Lagos, Nigeria",
    color: "#f59e0b",
  },
  {
    name: "Tech Community Events",
    type: "Speaker",
    year: "2022–2025",
    topic: "10+ talks on backend engineering, developer advocacy, and community building.",
    location: "Nigeria & Remote",
    color: "#b80c09",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

function PhotoBadge() {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 5,
      background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 20, padding: "3px 8px",
      fontSize: 9, fontWeight: 700, letterSpacing: "0.1em",
      color: "#555", textTransform: "uppercase",
    }}>
      <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 5h-3.17L15 3H9L7.17 5H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-8 13a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
      </svg>
      Photo
    </div>
  );
}

export default function Speaking({ onImageHover, onImageLeave }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { isMobile, isTablet } = useBreakpoint();
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({ images: [], title: "" });

  const openModal = (ev) => {
    setModalData({ images: ev.images, title: ev.name });
    setIsOpen(true);
  };

  return (
    <>
      <section ref={ref} style={{ width: "100%", backgroundColor: "#000", position: "relative" }}>
        <div style={{
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(184,12,9,0.3) 30%, rgba(255,0,0,0.5) 50%, rgba(184,12,9,0.3) 70%, transparent)",
          opacity: 0.6,
        }} />
        <div style={{
          position: "absolute", top: "20%", right: "-5%", width: 500, height: 500,
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
              Speaking & Events
            </span>
          </motion.div>

          <motion.h2 variants={fadeUp} style={{
            fontFamily: '"Science Gothic", system-ui, sans-serif',
            fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 900, lineHeight: 1,
            letterSpacing: "-0.02em", color: "#fff", margin: "0 0 56px 0",
          }}>
            On the<br />
            <span style={{ color: "#ff0000", textShadow: "0 0 40px rgba(255,0,0,0.25)" }}>stage</span>
          </motion.h2>

          <motion.div variants={stagger} style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr 1fr",
            gap: 16,
          }}>
            {EVENTS.map((ev, i) => {
              const hasPhoto = ev.images?.length > 0;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  onClick={hasPhoto ? () => openModal(ev) : undefined}
                  onMouseEnter={() => { if (hasPhoto) onImageHover?.(); }}
                  onMouseLeave={() => { if (hasPhoto) onImageLeave?.(); }}
                  whileHover={hasPhoto ? { borderColor: `${ev.color}44`, y: -2 } : {}}
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 12, padding: "28px 24px",
                    display: "flex", flexDirection: "column", gap: 12,
                    position: "relative", overflow: "hidden",
                    transition: "border-color 0.2s",
                  }}
                >
                  {/* Top accent */}
                  <div style={{
                    position: "absolute", top: 0, left: "15%", right: "15%", height: 1,
                    background: `linear-gradient(90deg, transparent, ${ev.color}66 40%, ${ev.color}99 50%, ${ev.color}66 60%, transparent)`,
                  }} />

                  {/* Photo badge */}
                  {hasPhoto && (
                    <div style={{ position: "absolute", top: 14, right: 14 }}>
                      <PhotoBadge />
                    </div>
                  )}

                  {/* Type badge + year */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingRight: hasPhoto ? 56 : 0 }}>
                    <span style={{
                      fontSize: 9, fontWeight: 700, letterSpacing: "0.14em",
                      color: ev.color, textTransform: "uppercase",
                      border: `1px solid ${ev.color}44`, borderRadius: 3, padding: "2px 7px",
                    }}>
                      {ev.type}
                    </span>
                    <span style={{ fontSize: 10, color: "#333", letterSpacing: "0.08em" }}>{ev.year}</span>
                  </div>

                  {/* Name */}
                  <div style={{
                    fontSize: 18, fontWeight: 800, color: "#e8e8e8", lineHeight: 1.2,
                    fontFamily: '"Science Gothic", system-ui, sans-serif',
                  }}>
                    {ev.name}
                  </div>

                  <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />

                  <p style={{ fontSize: 12, lineHeight: 1.7, color: "#555", margin: 0 }}>
                    {ev.topic}
                  </p>

                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: "auto" }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: ev.color, opacity: 0.6, flexShrink: 0 }} />
                    <span style={{ fontSize: 10, color: "#3a3a3a", letterSpacing: "0.08em" }}>{ev.location}</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      <ImageModal
        isOpen={isOpen}
        images={modalData.images}
        title={modalData.title}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
