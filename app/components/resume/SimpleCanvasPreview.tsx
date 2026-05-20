// "use client";

// import { useEffect, useRef, useState, ReactNode } from "react";
// import { FiZoomIn, FiZoomOut, FiRefreshCw } from "react-icons/fi";
// import { motion } from "framer-motion";

// interface SimpleCanvasPreviewProps {
//   children: ReactNode;
// }

// interface Position {
//   x: number;
//   y: number;
// }

// export function SimpleCanvasPreview({ children }: SimpleCanvasPreviewProps) {
//   const containerRef = useRef<HTMLDivElement>(null);

//   const [scale,      setScale]      = useState(0.9);
//   const [position,   setPosition]   = useState<Position>({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);

//   const scaleRef    = useRef(0.9);
//   const posRef      = useRef<Position>({ x: 0, y: 0 });
//   const downRef     = useRef<Position | null>(null);
//   const startRef    = useRef<Position>({ x: 0, y: 0 });
//   const dragActive  = useRef(false);
//   const zoomAnimRef = useRef<number | null>(null);

//   // keep refs in sync with state
//   useEffect(() => { scaleRef.current = scale;    }, [scale]);
//   useEffect(() => { posRef.current   = position; }, [position]);

//   // ── Responsive initial scale ─────────────────────────────
//   useEffect(() => {
//     const calc = () => {
//       const w = window.innerWidth;
//       return w < 480 ? 0.38 : w < 768 ? 0.55 : w < 1024 ? 0.72 : w < 1280 ? 0.78 : 0.90;
//     };
//     const s = calc();
//     setScale(s);
//     scaleRef.current = s;
//     const fn = () => {
//       const s2 = calc();
//       setScale(s2);
//       scaleRef.current = s2;
//     };
//     window.addEventListener("resize", fn);
//     return () => window.removeEventListener("resize", fn);
//   }, []);

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const inContainer = (clientX: number, clientY: number): boolean => {
//       const r = container.getBoundingClientRect();
//       return clientX >= r.left && clientX <= r.right && clientY >= r.top && clientY <= r.bottom;
//     };

//     const isControl = (target: EventTarget | null): boolean => {
//       const el = target as HTMLElement;
//       return (
//         ["BUTTON", "INPUT", "A", "SELECT", "TEXTAREA"].includes(el?.tagName ?? "") ||
//         !!el?.closest?.("[data-no-drag]")
//       );
//     };

//     const onMouseDown = (e: MouseEvent) => {
//       if (!inContainer(e.clientX, e.clientY)) return;
//       if (isControl(e.target)) return;
//       e.preventDefault();
//       downRef.current    = { x: e.clientX, y: e.clientY };
//       dragActive.current = false;
//     };

//     const onMouseMove = (e: MouseEvent) => {
//       if (!downRef.current) return;
//       const dx = e.clientX - downRef.current.x;
//       const dy = e.clientY - downRef.current.y;
//       if (!dragActive.current && Math.hypot(dx, dy) > 4) {
//         dragActive.current = true;
//         setIsDragging(true);
//         startRef.current = {
//           x: downRef.current.x - posRef.current.x,
//           y: downRef.current.y - posRef.current.y,
//         };
//       }
//       if (dragActive.current) {
//         const np = {
//           x: e.clientX - startRef.current.x,
//           y: e.clientY - startRef.current.y,
//         };
//         posRef.current = np;
//         setPosition({ ...np });
//       }
//     };

//     const onMouseUp = () => {
//       downRef.current    = null;
//       dragActive.current = false;
//       setIsDragging(false);
//     };

//     const onTouchStart = (e: TouchEvent) => {
//       const t = e.touches[0];
//       if (!inContainer(t.clientX, t.clientY)) return;
//       if (isControl(e.target)) return;
//       downRef.current    = { x: t.clientX, y: t.clientY };
//       dragActive.current = false;
//     };

//     const onTouchMove = (e: TouchEvent) => {
//       if (!downRef.current) return;
//       const t  = e.touches[0];
//       const dx = t.clientX - downRef.current.x;
//       const dy = t.clientY - downRef.current.y;
//       if (!dragActive.current && Math.hypot(dx, dy) > 4) {
//         dragActive.current = true;
//         setIsDragging(true);
//         startRef.current = {
//           x: downRef.current.x - posRef.current.x,
//           y: downRef.current.y - posRef.current.y,
//         };
//       }
//       if (dragActive.current) {
//         e.preventDefault();
//         const np = {
//           x: t.clientX - startRef.current.x,
//           y: t.clientY - startRef.current.y,
//         };
//         posRef.current = np;
//         setPosition({ ...np });
//       }
//     };

//     const onTouchEnd = () => {
//       downRef.current    = null;
//       dragActive.current = false;
//       setIsDragging(false);
//     };

//     const onWheel = (e: WheelEvent) => {
//       if (!inContainer(e.clientX, e.clientY)) return;
//       e.preventDefault();
//       if (e.ctrlKey || e.metaKey) {
//         const next = Math.max(0.2, Math.min(3.0, scaleRef.current * Math.exp(-e.deltaY * 0.002)));
//         setScale(next);
//         scaleRef.current = next;
//       } else {
//         const np = {
//           x: posRef.current.x - e.deltaX * 0.4,
//           y: posRef.current.y - e.deltaY * 0.4,
//         };
//         posRef.current = np;
//         setPosition({ ...np });
//       }
//     };

//     window.addEventListener("mousedown",  onMouseDown,  { capture: true });
//     window.addEventListener("mousemove",  onMouseMove);
//     window.addEventListener("mouseup",    onMouseUp);
//     window.addEventListener("touchstart", onTouchStart, { passive: true  });
//     window.addEventListener("touchmove",  onTouchMove,  { passive: false });
//     window.addEventListener("touchend",   onTouchEnd);
//     window.addEventListener("wheel",      onWheel,      { capture: true, passive: false });

//     return () => {
//       window.removeEventListener("mousedown",  onMouseDown,  { capture: true });
//       window.removeEventListener("mousemove",  onMouseMove);
//       window.removeEventListener("mouseup",    onMouseUp);
//       window.removeEventListener("touchstart", onTouchStart);
//       window.removeEventListener("touchmove",  onTouchMove);
//       window.removeEventListener("touchend",   onTouchEnd);
//       window.removeEventListener("wheel",      onWheel,      { capture: true });
//     };
//   }, []);

//   const smoothZoom = (target: number) => {
//     if (zoomAnimRef.current) cancelAnimationFrame(zoomAnimRef.current);
//     const from = scaleRef.current;
//     const t0   = performance.now();
//     const tick = (now: number) => {
//       const p = Math.min((now - t0) / 150, 1);
//       const v = from + (target - from) * (1 - Math.pow(1 - p, 3));
//       setScale(v);
//       scaleRef.current = v;
//       if (p < 1) zoomAnimRef.current = requestAnimationFrame(tick);
//       else        zoomAnimRef.current = null;
//     };
//     zoomAnimRef.current = requestAnimationFrame(tick);
//   };

//   const handleZoomIn  = () => smoothZoom(Math.min(scaleRef.current + 0.12, 3.0));
//   const handleZoomOut = () => smoothZoom(Math.max(scaleRef.current - 0.12, 0.2));
//   const handleReset   = () => {
//     const w = window.innerWidth;
//     smoothZoom(w < 480 ? 0.38 : w < 768 ? 0.55 : w < 1024 ? 0.72 : w < 1280 ? 0.78 : 0.90);
//     posRef.current = { x: 0, y: 0 };
//     setPosition({ x: 0, y: 0 });
//   };

//   useEffect(() => () => {
//     if (zoomAnimRef.current) cancelAnimationFrame(zoomAnimRef.current);
//   }, []);

//   return (
//     /* ── Outer wrapper: adds breathing room around the canvas panel ── */
//     <div className="relative w-full h-[80vh] lg:h-[92vh] mt-8 px-3 py-3 lg:px-4 lg:py-4">

//       <style>{`
//         .cvs-preview-root iframe {
//           pointer-events: none !important;
//           user-select: none !important;
//         }
//       `}</style>

//       <div
//         ref={containerRef}
//         className="cvs-preview-root absolute inset-3 lg:inset-4 overflow-hidden bg-[#e8e8e8] rounded-xl shadow-inner select-none"
//         style={{ cursor: isDragging ? "grabbing" : "grab" }}
//       >
//         {/* ── Scrollable canvas content ── */}
//         <div
//           style={{
//             position:         "absolute",
//             top:              0,
//             left:             0,
//             transformOrigin:  "top left",
//             transform:        `translate(${position.x}px, ${position.y}px) scale(${scale})`,
//             userSelect:       "none",
//             WebkitUserSelect: "none",
//             /* top/left padding so the first page doesn't sit flush against the edge */
//             paddingTop:       "24px",
//             paddingLeft:      "24px",
//             paddingBottom:    "24px",
//           }}
//         >
//           {children}
//         </div>
//       </div>

//       {/* ── Zoom controls ── */}
//       <div
//         data-no-drag
//         className="absolute bottom-8 right-6 flex flex-col gap-2 z-30"
//       >
//         {[
//           { fn: handleZoomIn,  icon: <FiZoomIn    className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />, dark: false, title: "Zoom In"  },
//           { fn: handleZoomOut, icon: <FiZoomOut   className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />, dark: false, title: "Zoom Out" },
//           { fn: handleReset,   icon: <FiRefreshCw className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />, dark: true,  title: "Reset"   },
//         ].map((b, i) => (
//           <motion.button
//             key={i}
//             type="button"
//             title={b.title}
//             onClick={b.fn}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className={`w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 flex items-center justify-center
//               rounded-lg md:rounded-xl shadow-lg transition-all duration-300 cursor-pointer text-white
//               ${b.dark
//                 ? "bg-gray-700 hover:bg-gray-800"
//                 : "bg-gradient-to-r from-indigo-600 to-indigo-500 hover:shadow-xl"
//               }`}
//           >
//             {b.icon}
//           </motion.button>
//         ))}
//       </div>

//       {/* ── Scale badge ── */}
//       <div className="absolute top-5 left-5 z-30 pointer-events-none">
//         <div className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full shadow-sm border border-gray-200">
//           <span className="text-[11px] font-bold text-indigo-600">
//             {Math.round(scale * 100)}%
//           </span>
//         </div>
//       </div>

//       {/* ── Hint ── */}
//       <p className="absolute bottom-5 left-5 z-30 pointer-events-none text-[10px] font-semibold text-gray-400 select-none">
//         Drag · Pinch · Ctrl+Scroll
//       </p>
//     </div>
//   );
// }


















"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { FiZoomIn, FiZoomOut, FiRefreshCw } from "react-icons/fi";
import { motion } from "framer-motion";

interface SimpleCanvasPreviewProps {
  children: ReactNode;
}

interface Position {
  x: number;
  y: number;
}

export function SimpleCanvasPreview({ children }: SimpleCanvasPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(0.9);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const scaleRef = useRef(0.9);
  const posRef = useRef<Position>({ x: 0, y: 0 });
  const downRef = useRef<Position | null>(null);
  const startRef = useRef<Position>({ x: 0, y: 0 });
  const dragActive = useRef(false);
  const zoomAnimRef = useRef<number | null>(null);

  // Pinch zoom refs
  const initialPinchDistance = useRef(0);
  const initialPinchScale = useRef(1);
  const initialPinchPosition = useRef<Position>({ x: 0, y: 0 });
  const pinchCenterRef = useRef<Position>({ x: 0, y: 0 });

  // keep refs in sync with state
  useEffect(() => {
    scaleRef.current = scale;
  }, [scale]);
  useEffect(() => {
    posRef.current = position;
  }, [position]);

  // Helper: distance between two touch points
  const getPinchDistance = (touches: TouchList): number => {
    if (touches.length < 2) return 0;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.hypot(dx, dy);
  };

  // Helper: center point between two touches
  const getPinchCenter = (touches: TouchList): Position => {
    if (touches.length < 2) return { x: 0, y: 0 };
    return {
      x: (touches[0].clientX + touches[1].clientX) / 2,
      y: (touches[0].clientY + touches[1].clientY) / 2,
    };
  };

  // ── Responsive initial scale ─────────────────────────────
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      return w < 480 ? 0.38 : w < 768 ? 0.55 : w < 1024 ? 0.72 : w < 1280 ? 0.78 : 0.9;
    };
    const s = calc();
    setScale(s);
    scaleRef.current = s;
    const fn = () => {
      const s2 = calc();
      setScale(s2);
      scaleRef.current = s2;
    };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const inContainer = (clientX: number, clientY: number): boolean => {
      const r = container.getBoundingClientRect();
      return clientX >= r.left && clientX <= r.right && clientY >= r.top && clientY <= r.bottom;
    };

    const isControl = (target: EventTarget | null): boolean => {
      const el = target as HTMLElement;
      return (
        ["BUTTON", "INPUT", "A", "SELECT", "TEXTAREA"].includes(el?.tagName ?? "") ||
        !!el?.closest?.("[data-no-drag]")
      );
    };

    // Mouse events
    const onMouseDown = (e: MouseEvent) => {
      if (!inContainer(e.clientX, e.clientY)) return;
      if (isControl(e.target)) return;
      e.preventDefault();
      downRef.current = { x: e.clientX, y: e.clientY };
      dragActive.current = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!downRef.current) return;
      const dx = e.clientX - downRef.current.x;
      const dy = e.clientY - downRef.current.y;
      if (!dragActive.current && Math.hypot(dx, dy) > 4) {
        dragActive.current = true;
        setIsDragging(true);
        startRef.current = {
          x: downRef.current.x - posRef.current.x,
          y: downRef.current.y - posRef.current.y,
        };
      }
      if (dragActive.current) {
        const np = {
          x: e.clientX - startRef.current.x,
          y: e.clientY - startRef.current.y,
        };
        posRef.current = np;
        setPosition({ ...np });
      }
    };

    const onMouseUp = () => {
      downRef.current = null;
      dragActive.current = false;
      setIsDragging(false);
    };

    // Touch events with pinch zoom support
    const onTouchStart = (e: TouchEvent) => {
      // Handle pinch zoom (2 fingers)
      if (e.touches.length === 2) {
        e.preventDefault();
        initialPinchDistance.current = getPinchDistance(e.touches);
        initialPinchScale.current = scaleRef.current;
        pinchCenterRef.current = getPinchCenter(e.touches);
        initialPinchPosition.current = { ...posRef.current };
        
        // Cancel any ongoing drag
        downRef.current = null;
        dragActive.current = false;
        return;
      }
      
      // Single finger drag
      const t = e.touches[0];
      if (!inContainer(t.clientX, t.clientY)) return;
      if (isControl(e.target)) return;
      
      e.preventDefault();
      downRef.current = { x: t.clientX, y: t.clientY };
      dragActive.current = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      // Handle pinch zoom
      if (e.touches.length === 2 && initialPinchDistance.current > 0) {
        e.preventDefault();
        const newDistance = getPinchDistance(e.touches);
        const newScale = Math.max(
          0.2,
          Math.min(3.0, initialPinchScale.current * (newDistance / initialPinchDistance.current))
        );
        
        // Calculate new position to zoom toward pinch center
        const scaleDelta = newScale / scaleRef.current;
        const newPos = {
          x: pinchCenterRef.current.x - (pinchCenterRef.current.x - initialPinchPosition.current.x) * scaleDelta,
          y: pinchCenterRef.current.y - (pinchCenterRef.current.y - initialPinchPosition.current.y) * scaleDelta,
        };
        
        setScale(newScale);
        scaleRef.current = newScale;
        posRef.current = newPos;
        setPosition(newPos);
        return;
      }
      
      // Single finger drag
      if (!downRef.current) return;
      const t = e.touches[0];
      const dx = t.clientX - downRef.current.x;
      const dy = t.clientY - downRef.current.y;
      
      if (!dragActive.current && Math.hypot(dx, dy) > 4) {
        dragActive.current = true;
        setIsDragging(true);
        startRef.current = {
          x: downRef.current.x - posRef.current.x,
          y: downRef.current.y - posRef.current.y,
        };
      }
      
      if (dragActive.current) {
        e.preventDefault();
        const np = {
          x: t.clientX - startRef.current.x,
          y: t.clientY - startRef.current.y,
        };
        posRef.current = np;
        setPosition({ ...np });
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      // Reset pinch state when fingers lift
      if (e.touches.length < 2) {
        initialPinchDistance.current = 0;
      }
      
      // Reset drag state
      downRef.current = null;
      dragActive.current = false;
      setIsDragging(false);
    };

    const onWheel = (e: WheelEvent) => {
      if (!inContainer(e.clientX, e.clientY)) return;
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        const next = Math.max(0.2, Math.min(3.0, scaleRef.current * Math.exp(-e.deltaY * 0.002)));
        setScale(next);
        scaleRef.current = next;
      } else {
        const np = {
          x: posRef.current.x - e.deltaX * 0.4,
          y: posRef.current.y - e.deltaY * 0.4,
        };
        posRef.current = np;
        setPosition({ ...np });
      }
    };

    // Add touch-action: none to container to prevent browser gestures
    container.style.touchAction = "none";

    window.addEventListener("mousedown", onMouseDown, { capture: true });
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    container.addEventListener("touchstart", onTouchStart, { passive: false });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", onTouchEnd);
    container.addEventListener("touchcancel", onTouchEnd);
    window.addEventListener("wheel", onWheel, { capture: true, passive: false });

    return () => {
      window.removeEventListener("mousedown", onMouseDown, { capture: true });
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      container.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("wheel", onWheel, { capture: true });
      container.style.touchAction = "";
    };
  }, []);

  const smoothZoom = (target: number) => {
    if (zoomAnimRef.current) cancelAnimationFrame(zoomAnimRef.current);
    const from = scaleRef.current;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 150, 1);
      const v = from + (target - from) * (1 - Math.pow(1 - p, 3));
      setScale(v);
      scaleRef.current = v;
      if (p < 1) zoomAnimRef.current = requestAnimationFrame(tick);
      else zoomAnimRef.current = null;
    };
    zoomAnimRef.current = requestAnimationFrame(tick);
  };

  const handleZoomIn = () => smoothZoom(Math.min(scaleRef.current + 0.12, 3.0));
  const handleZoomOut = () => smoothZoom(Math.max(scaleRef.current - 0.12, 0.2));
  const handleReset = () => {
    const w = window.innerWidth;
    smoothZoom(w < 480 ? 0.38 : w < 768 ? 0.55 : w < 1024 ? 0.72 : w < 1280 ? 0.78 : 0.9);
    posRef.current = { x: 0, y: 0 };
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => () => {
    if (zoomAnimRef.current) cancelAnimationFrame(zoomAnimRef.current);
  }, []);

  return (
    <div className="relative w-full h-full ">
      <style>{`
        .cvs-preview-root iframe {
          pointer-events: none !important;
          user-select: none !important;
        }
      `}</style>

      <div
        ref={containerRef}
        className="cvs-preview-root absolute inset-3 lg:inset-4 overflow-hidden bg-[#e8e6f2] select-none"
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transformOrigin: "top left",
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            userSelect: "none",
            WebkitUserSelect: "none",
            paddingTop: "24px",
            paddingLeft: "24px",
            paddingBottom: "24px",
          }}
        >
          {children}
        </div>
      </div>

      {/* Zoom controls */}
      <div data-no-drag className="absolute bottom-8 right-6 flex flex-col gap-2 z-30">
        {[
          { fn: handleZoomIn, icon: <FiZoomIn className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />, dark: false, title: "Zoom In" },
          { fn: handleZoomOut, icon: <FiZoomOut className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />, dark: false, title: "Zoom Out" },
          { fn: handleReset, icon: <FiRefreshCw className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />, dark: true, title: "Reset" },
        ].map((b, i) => (
          <motion.button
            key={i}
            type="button"
            title={b.title}
            onClick={b.fn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 flex items-center justify-center
              rounded-lg md:rounded-xl shadow-lg transition-all duration-300 cursor-pointer text-white
              ${b.dark
                ? "bg-gray-700 hover:bg-gray-800"
                : "bg-gradient-to-r from-indigo-600 to-indigo-500 hover:shadow-xl"
              }`}
          >
            {b.icon}
          </motion.button>
        ))}
      </div>

      {/* Scale badge */}
      <div className="absolute top-5 left-5 z-30 pointer-events-none">
        <div className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full shadow-sm border border-gray-200">
          <span className="text-[11px] font-bold text-indigo-600">
            {Math.round(scale * 100)}%
          </span>
        </div>
      </div>

      {/* Hint */}
      <p className="absolute bottom-5 left-5 z-30 pointer-events-none text-[10px] font-semibold text-gray-400 select-none">
        Drag · Pinch · Ctrl+Scroll
      </p>
    </div>
  );
}