import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import ImageModal from "../ImageModal";
import techpulse   from "../../assets/techpulse.JPG";
import cafeCursor  from "../../assets/cafe_cursor.JPG";
import gdg         from "../../assets/gdg.JPG";
import microsoft   from "../../assets/microsoft.JPG";
import dayDream    from "../../assets/day_dream.JPG";
import randomField from "../../assets/random_field.JPG";
import unipod      from "../../assets/unipod.JPG";
import img1        from "../../assets/img1.JPG";
import img2        from "../../assets/img2.JPG";
import img3        from "../../assets/img3.JPG";
import img4        from "../../assets/img4.JPG";

const ITEMS = [
  { src: techpulse,   caption: "TechPulse — Speaker Session",        span: 2 },
  { src: cafeCursor,  caption: "Cafe Cursor — Cencori.com Pitch",     span: 1 },
  { src: gdg,         caption: "Google Developer Groups",             span: 1 },
  { src: microsoft,   caption: "Microsoft Event",                     span: 1 },
  { src: unipod,      caption: "AI UniPod, UNILAG",                   span: 1 },
  { src: dayDream,    caption: "Community Moment",                    span: 2 },
  { src: img1,        caption: "Community Event",                     span: 1 },
  { src: img2,        caption: "Presentation",                        span: 1 },
  { src: randomField, caption: "Best Tech Bro in Computer Science",   span: 1 },
  { src: img3,        caption: "Workshop Session",                    span: 1 },
  { src: img4,        caption: "Conference",                          span: 2 },
];

// flat list for the modal carousel (order matches grid)
const GALLERY_IMAGES = ITEMS.map(({ src, caption }) => ({ src, caption }));

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };

function GalleryCell({ item, index, onOpen, onImageHover, onImageLeave }) {
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      onClick={() => onOpen(index)}
      onMouseEnter={() => { setHov(true); onImageHover?.(); }}
      onMouseLeave={() => { setHov(false); onImageLeave?.(); }}
      style={{
        gridColumn: `span ${item.span}`,
        aspectRatio: item.span === 2 ? "16/7" : "4/3",
        borderRadius: 10, overflow: "hidden",
        border: `1px solid ${hov ? "rgba(184,12,9,0.3)" : "rgba(255,255,255,0.06)"}`,
        position: "relative",
        transition: "border-color 0.25s",
      }}
    >
      <motion.img
        src={item.src}
        alt={item.caption}
        animate={{ scale: hov ? 1.04 : 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />

      {/* Hover overlay */}
      <motion.div
        animate={{ opacity: hov ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.7) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Caption */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "20px 16px 14px",
        background: "linear-gradient(transparent, rgba(0,0,0,0.72))",
      }}>
        <span style={{
          fontSize: 10, fontWeight: 600, letterSpacing: "0.1em",
          color: hov ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.35)",
          textTransform: "uppercase",
          transition: "color 0.25s",
        }}>
          {item.caption}
        </span>
      </div>

      {/* Expand icon on hover */}
      <motion.div
        animate={{ opacity: hov ? 1 : 0, scale: hov ? 1 : 0.8 }}
        transition={{ duration: 0.2 }}
        style={{
          position: "absolute", top: 12, right: 12,
          width: 30, height: 30, borderRadius: "50%",
          background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.1)",
          display: "flex", alignItems: "center", justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round">
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

export default function Gallery({ onImageHover, onImageLeave }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { isMobile } = useBreakpoint();
  const [isOpen, setIsOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const openModal = (index) => {
    setStartIndex(index);
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

        <motion.div
          initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger}
          style={{ maxWidth: 1280, margin: "0 auto", padding: isMobile ? "60px 20px" : "100px 24px" }}
        >
          <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <span style={{ width: 28, height: 1, background: "#b80c09", display: "inline-block" }} />
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", color: "#9e0a08", textTransform: "uppercase" }}>
              Gallery
            </span>
          </motion.div>

          <motion.h2 variants={fadeUp} style={{
            fontFamily: '"Science Gothic", system-ui, sans-serif',
            fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 900, lineHeight: 1,
            letterSpacing: "-0.02em", color: "#fff", margin: "0 0 56px 0",
          }}>
            In the<br />
            <span style={{ color: "#ff0000", textShadow: "0 0 40px rgba(255,0,0,0.25)" }}>field</span>
          </motion.h2>

          <motion.div variants={stagger} style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
            gap: 12,
          }}>
            {ITEMS.map((item, i) => (
              <GalleryCell
                key={i}
                item={isMobile ? { ...item, span: 1 } : item}
                index={i}
                onOpen={openModal}
                onImageHover={onImageHover}
                onImageLeave={onImageLeave}
              />
            ))}
          </motion.div>
        </motion.div>
      </section>

      <ImageModal
        isOpen={isOpen}
        images={GALLERY_IMAGES}
        initialIndex={startIndex}
        title="Gallery"
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
