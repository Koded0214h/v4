import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import ImageModal from "../ImageModal";
import gdgImg from "../../assets/gdg.JPG";
import unipodImg from "../../assets/unipod.JPG";

const ROLES = [
  {
    abbr: "GDG",
    title: "Team Lead — Publicity & Community",
    org: "Google Developer Groups",
    color: "#4285f4",
    desc: "Led publicity and community growth efforts, driving awareness and participation in local developer events and programs.",
    images: [{ src: gdgImg, caption: "Google Developer Groups — Community Event" }],
  },
  {
    abbr: "CS",
    title: "Computer Science Community Lead",
    org: "PRO for Computer Science",
    color: "#b80c09",
    desc: "Ran the CS community, organizing study sessions, peer learning groups, and connecting students to industry opportunities.",
  },
  {
    abbr: "SA",
    title: "Community Manager",
    org: "Solana Student Academy",
    color: "#9945ff",
    desc: "Managed a Web3 student community, onboarding developers to the Solana ecosystem through workshops and hands-on projects.",
  },
  {
    abbr: "AI",
    title: "Media Team",
    org: "AI UniPod, University of Lagos",
    color: "#06b6d4",
    desc: "Created content and managed media presence for one of Nigeria's leading university AI communities.",
    images: [{ src: unipodImg, caption: "AI UniPod — University of Lagos" }],
  },
  {
    abbr: "MF",
    title: "Millennium Fellow",
    org: "Millennium Fellowship",
    color: "#12b76a",
    desc: "Selected as a Millennium Fellow — a global program identifying and empowering emerging change-makers on university campuses.",
  },
  {
    abbr: "MA",
    title: "Meta Accelerator Member",
    org: "Meta Accelerator Program",
    color: "#0668e1",
    desc: "Accepted into Meta's accelerator, gaining access to resources, mentorship, and a global network of builders and innovators.",
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
      display: "inline-flex", alignItems: "center", gap: 5,
      background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
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

export default function Mentorship({ onImageHover, onImageLeave }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { isMobile, isTablet } = useBreakpoint();
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({ images: [], title: "" });

  const openModal = (role) => {
    setModalData({ images: role.images, title: role.org });
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
          position: "absolute", top: "10%", left: "-5%", width: 500, height: 500,
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
              Community & Mentorship
            </span>
          </motion.div>

          <motion.h2 variants={fadeUp} style={{
            fontFamily: '"Science Gothic", system-ui, sans-serif',
            fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 900, lineHeight: 1,
            letterSpacing: "-0.02em", color: "#fff", margin: "0 0 16px 0",
          }}>
            Growing the<br />
            <span style={{ color: "#ff0000", textShadow: "0 0 40px rgba(255,0,0,0.25)" }}>ecosystem</span>
          </motion.h2>

          <motion.p variants={fadeUp} style={{
            fontSize: 15, lineHeight: 1.8, color: "#555", maxWidth: 520, margin: "0 0 56px 0",
          }}>
            I believe developer communities are multipliers. Every engineer you help level up ripples through every product they build.
          </motion.p>

          <motion.div variants={stagger} style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr 1fr",
            gap: 16,
          }}>
            {ROLES.map((r, i) => {
              const hasPhoto = r.images?.length > 0;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  onClick={hasPhoto ? () => openModal(r) : undefined}
                  onMouseEnter={() => { if (hasPhoto) onImageHover?.(); }}
                  onMouseLeave={() => { if (hasPhoto) onImageLeave?.(); }}
                  whileHover={hasPhoto ? { borderColor: `${r.color}44`, y: -2 } : {}}
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 12, padding: "28px 24px",
                    display: "flex", flexDirection: "column", gap: 16,
                    position: "relative",
                    transition: "border-color 0.2s",
                  }}
                >
                  <div style={{
                    position: "absolute", top: 0, left: "20%", right: "20%", height: 1,
                    background: `linear-gradient(90deg, transparent, ${r.color}66 40%, ${r.color}99 50%, ${r.color}66 60%, transparent)`,
                  }} />

                  {/* Avatar + info */}
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                      background: `${r.color}14`, border: `1px solid ${r.color}33`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, fontWeight: 900, color: r.color,
                      fontFamily: '"Science Gothic", system-ui, sans-serif',
                      letterSpacing: "0.04em",
                    }}>
                      {r.abbr}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: 15, fontWeight: 800, color: "#e8e8e8", lineHeight: 1.2, marginBottom: 3,
                        fontFamily: '"Science Gothic", system-ui, sans-serif',
                      }}>
                        {r.title}
                      </div>
                      <div style={{ fontSize: 11, color: "#555" }}>{r.org}</div>
                    </div>
                  </div>

                  <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />
                  <p style={{ fontSize: 12, lineHeight: 1.75, color: "#555", margin: 0 }}>{r.desc}</p>

                  {hasPhoto && (
                    <div style={{ marginTop: "auto" }}>
                      <PhotoBadge />
                    </div>
                  )}
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
