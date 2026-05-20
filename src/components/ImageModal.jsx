import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BsChevronLeft, BsChevronRight, BsX } from "react-icons/bs";

function NavBtn({ onClick, children }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flexShrink: 0, background: "rgba(255,255,255,0.04)",
        border: `1px solid ${hov ? "rgba(255,0,0,0.4)" : "rgba(255,255,255,0.1)"}`,
        borderRadius: "50%", width: 40, height: 40,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: hov ? "#ff0000" : "#555", transition: "all 0.2s",
      }}
    >
      {children}
    </button>
  );
}

export default function ImageModal({ isOpen, images = [], initialIndex = 0, title, onClose }) {
  const [current, setCurrent] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) setCurrent(initialIndex);
  }, [isOpen, initialIndex]);

  const prev = useCallback(
    () => setCurrent(i => (i - 1 + images.length) % images.length),
    [images.length]
  );
  const next = useCallback(
    () => setCurrent(i => (i + 1) % images.length),
    [images.length]
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, prev, next]);

  return createPortal(
    <AnimatePresence>
      {isOpen && images.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
          style={{
            position: "fixed", inset: 0, zIndex: 99980,
            background: "rgba(0,0,0,0.95)", backdropFilter: "blur(20px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "24px",
          }}
        >
          <motion.div
            onClick={e => e.stopPropagation()}
            initial={{ scale: 0.92, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              gap: 18, width: "min(92vw, 900px)",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", width: "100%", gap: 12 }}>
              {title && (
                <span style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.18em",
                  color: "#444", textTransform: "uppercase",
                }}>
                  {title}
                </span>
              )}
              <button
                onClick={onClose}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,0,0,0.4)"; e.currentTarget.style.color = "#ff0000"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#555"; }}
                style={{
                  marginLeft: "auto", background: "none",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "50%", width: 36, height: 36,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#555", transition: "all 0.2s",
                }}
              >
                <BsX size={18} />
              </button>
            </div>

            {/* Image + arrows */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, width: "100%" }}>
              {images.length > 1 && <NavBtn onClick={prev}><BsChevronLeft size={15} /></NavBtn>}

              <div style={{
                flex: 1, borderRadius: 10, overflow: "hidden",
                background: "rgba(255,255,255,0.015)",
                border: "1px solid rgba(255,255,255,0.06)",
                display: "flex", alignItems: "center", justifyContent: "center",
                minHeight: 200,
              }}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={current}
                    src={images[current]?.src}
                    alt={images[current]?.caption || title || ""}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.18 }}
                    style={{
                      maxWidth: "100%", maxHeight: "65vh",
                      objectFit: "contain", display: "block",
                    }}
                  />
                </AnimatePresence>
              </div>

              {images.length > 1 && <NavBtn onClick={next}><BsChevronRight size={15} /></NavBtn>}
            </div>

            {/* Caption */}
            {images[current]?.caption && (
              <span style={{
                fontSize: 10, color: "#3a3a3a", letterSpacing: "0.12em",
                textTransform: "uppercase", textAlign: "center",
              }}>
                {images[current].caption}
              </span>
            )}

            {/* Dots */}
            {images.length > 1 && (
              <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    style={{
                      width: i === current ? 22 : 6,
                      height: 6, borderRadius: 3,
                      background: i === current ? "#b80c09" : "rgba(255,255,255,0.1)",
                      border: "none", padding: 0,
                      transition: "width 0.3s ease, background 0.3s ease",
                    }}
                  />
                ))}
              </div>
            )}

            {/* Counter */}
            {images.length > 1 && (
              <span style={{ fontSize: 10, color: "#2a2a2a", letterSpacing: "0.1em" }}>
                {current + 1} / {images.length}
              </span>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
