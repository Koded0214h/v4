import * as React from "react";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { BsLightningChargeFill } from "react-icons/bs";

function cx(...inputs) {
  return twMerge(clsx(inputs));
}

const MouseTrackerContext = React.createContext(undefined);

export const useMouseTracker = () => {
  const context = React.useContext(MouseTrackerContext);
  if (!context) throw new Error("useMouseTracker must be used within MouseTrackerProvider");
  return context;
};

function MouseTrackerProvider({ children, ...rest }) {
  const [position, setPosition] = React.useState({ x: -200, y: -200 });
  const [active, setActive] = React.useState(false);
  const wrapperRef = React.useRef(null);
  const pointerRef = React.useRef(null);

  React.useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setActive(true);
    };
    const clearPosition = () => setActive(false);

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseleave", clearPosition);
    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseleave", clearPosition);
    };
  }, []);

  return (
    <MouseTrackerContext.Provider value={{ position, active, wrapperRef, pointerRef }}>
      <div ref={wrapperRef} data-role="tracker-wrapper" {...rest}>
        {children}
      </div>
    </MouseTrackerContext.Provider>
  );
}

function Pointer({ className, style, children, ...rest }) {
  const { position, active, wrapperRef, pointerRef } = useMouseTracker();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  React.useEffect(() => {
    const container = wrapperRef.current?.parentElement;
    if (container && active) container.style.cursor = "none";
    return () => { if (container) container.style.cursor = ""; };
  }, [active, wrapperRef]);

  React.useEffect(() => {
    x.set(position.x);
    y.set(position.y);
  }, [position, x, y]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          ref={pointerRef}
          data-role="custom-pointer"
          className={cx("pointer-events-none", className)}
          style={{
            position: "fixed",
            top: y,
            left: x,
            zIndex: 99999,
            transform: "translate(-50%, -50%)",
            ...style,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          {...rest}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PointerFollower({
  align = "bottom-right",
  gap = 16,
  transition = { stiffness: 500, damping: 50, bounce: 0 },
  children,
  className,
  style,
  ...rest
}) {
  const { position, active, pointerRef } = useMouseTracker();
  const followerRef = React.useRef(null);

  const getOffset = React.useCallback(() => {
    const box = followerRef.current?.getBoundingClientRect();
    const w = box?.width ?? 0;
    const h = box?.height ?? 0;
    switch (align) {
      case "center":      return { x: w / 2,     y: h / 2     };
      case "top":         return { x: w / 2,     y: h + gap   };
      case "top-left":    return { x: w + gap,   y: h + gap   };
      case "top-right":   return { x: -gap,      y: h + gap   };
      case "bottom":      return { x: w / 2,     y: -gap      };
      case "bottom-left": return { x: w + gap,   y: -gap      };
      case "bottom-right":return { x: -gap,      y: -gap      };
      case "left":        return { x: w + gap,   y: h / 2     };
      case "right":       return { x: -gap,      y: h / 2     };
      default:            return { x: 0,         y: 0         };
    }
  }, [align, gap]);

  const offset = getOffset();
  const pointerBox = pointerRef.current?.getBoundingClientRect();
  const pw = pointerBox?.width ?? 20;
  const ph = pointerBox?.height ?? 20;

  const fx = position.x - offset.x + pw / 2;
  const fy = position.y - offset.y + ph / 2;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          ref={followerRef}
          data-role="pointer-follower"
          className={cx("pointer-events-none font-medium", className)}
          style={{
            position: "fixed",
            top: fy,
            left: fx,
            zIndex: 99998,
            transform: "translate(-50%, -50%)",
            ...style,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          {...rest}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { MouseTrackerProvider, Pointer, PointerFollower };
