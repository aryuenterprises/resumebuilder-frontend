

// "use client";

// import { useEffect, useRef, useState, ReactNode } from "react";
// import { FiZoomIn, FiZoomOut, FiRefreshCw, FiMove } from "react-icons/fi";
// import { IoReload } from "react-icons/io5";
// import { motion, AnimatePresence } from "framer-motion";

// interface SimpleCanvasPreviewProps {
//   children: ReactNode;
// }

// interface Position {
//   x: number;
//   y: number;
// }

// export  function SimpleCanvasPreview({ children }: SimpleCanvasPreviewProps) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const contentRef   = useRef<HTMLDivElement>(null);

//   const [scale, setScale] = useState<number>(1);
//   const zoomAnimationRef  = useRef<number | null>(null);
//   const scaleRef          = useRef<number>(scale);

//   useEffect(() => { scaleRef.current = scale; }, [scale]);

//   // ── Responsive initial scale ──────────────────────────────────────────────
//   useEffect(() => {
//     const handleResize = () => {
//       const w = window.innerWidth;
//       if (w < 480)       setScale(0.45);
//       else if (w < 768)  setScale(0.6);
//       else if (w < 1024) setScale(0.9);
//       else if (w < 1280) setScale(0.7);
//       else               setScale(0.9);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // ── Drag / pan ────────────────────────────────────────────────────────────
//   const [isDragging,    setIsDragging]    = useState(false);
//   const [position,      setPosition]      = useState<Position>({ x: 0, y: 0 });
//   const [startPosition, setStartPosition] = useState<Position>({ x: 0, y: 0 });

//   const pointerDownPos = useRef<Position | null>(null);
//   const dragStarted    = useRef(false);
//   const DRAG_THRESHOLD = 5;

//   const getClient = (e: MouseEvent | TouchEvent): Position => {
//     if ("touches" in e) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
//     return { x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY };
//   };

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const onMouseDown = (e: MouseEvent) => {
//       const tag = (e.target as HTMLElement).tagName;
//       if (["BUTTON", "INPUT", "A", "SELECT", "TEXTAREA"].includes(tag)) return;
//       if ((e.target as HTMLElement).closest("[data-no-drag]")) return;

//       pointerDownPos.current = { x: e.clientX, y: e.clientY };
//       dragStarted.current    = false;
//     };

//     const onMouseMove = (e: MouseEvent) => {
//       if (!pointerDownPos.current) return;

//       const dx = e.clientX - pointerDownPos.current.x;
//       const dy = e.clientY - pointerDownPos.current.y;
//       const dist = Math.sqrt(dx * dx + dy * dy);

//       if (!dragStarted.current && dist > DRAG_THRESHOLD) {
//         dragStarted.current = true;
//         setIsDragging(true);
//         setStartPosition({
//           x: pointerDownPos.current.x - position.x,
//           y: pointerDownPos.current.y - position.y,
//         });
//       }

//       if (dragStarted.current) {
//         e.preventDefault();
//         setPosition({
//           x: e.clientX - startPosition.x,
//           y: e.clientY - startPosition.y,
//         });
//       }
//     };

//     const onMouseUp = () => {
//       pointerDownPos.current = null;
//       dragStarted.current    = false;
//       setIsDragging(false);
//     };

//     const onTouchStart = (e: TouchEvent) => {
//       const tag = (e.target as HTMLElement).tagName;
//       if (["BUTTON", "INPUT", "A", "SELECT", "TEXTAREA"].includes(tag)) return;
//       if ((e.target as HTMLElement).closest("[data-no-drag]")) return;

//       const { x, y } = getClient(e);
//       pointerDownPos.current = { x, y };
//       dragStarted.current    = false;
//     };

//     const onTouchMove = (e: TouchEvent) => {
//       if (!pointerDownPos.current) return;
//       const { x, y } = getClient(e);
//       const dx   = x - pointerDownPos.current.x;
//       const dy   = y - pointerDownPos.current.y;
//       const dist = Math.sqrt(dx * dx + dy * dy);

//       if (!dragStarted.current && dist > DRAG_THRESHOLD) {
//         dragStarted.current = true;
//         setIsDragging(true);
//         setStartPosition({
//           x: pointerDownPos.current.x - position.x,
//           y: pointerDownPos.current.y - position.y,
//         });
//       }

//       if (dragStarted.current) {
//         e.preventDefault();
//         setPosition({ x: x - startPosition.x, y: y - startPosition.y });
//       }
//     };

//     const onTouchEnd = () => {
//       pointerDownPos.current = null;
//       dragStarted.current    = false;
//       setIsDragging(false);
//     };

//     container.addEventListener("mousedown",  onMouseDown);
//     container.addEventListener("mousemove",  onMouseMove);
//     container.addEventListener("mouseup",    onMouseUp);
//     container.addEventListener("mouseleave", onMouseUp);
//     container.addEventListener("touchstart", onTouchStart, { passive: true });
//     container.addEventListener("touchmove",  onTouchMove,  { passive: false });
//     container.addEventListener("touchend",   onTouchEnd);

//     return () => {
//       container.removeEventListener("mousedown",  onMouseDown);
//       container.removeEventListener("mousemove",  onMouseMove);
//       container.removeEventListener("mouseup",    onMouseUp);
//       container.removeEventListener("mouseleave", onMouseUp);
//       container.removeEventListener("touchstart", onTouchStart);
//       container.removeEventListener("touchmove",  onTouchMove);
//       container.removeEventListener("touchend",   onTouchEnd);
//     };
//   }, [position, startPosition]);

//   // ── Smooth zoom ───────────────────────────────────────────────────────────
//   const smoothZoom = (targetScale: number) => {
//     if (zoomAnimationRef.current) cancelAnimationFrame(zoomAnimationRef.current);
//     const startScale = scaleRef.current;
//     const duration   = 150;
//     const startTime  = performance.now();

//     const animate = (now: number) => {
//       const progress = Math.min((now - startTime) / duration, 1);
//       const ease     = 1 - Math.pow(1 - progress, 3);
//       const next     = startScale + (targetScale - startScale) * ease;
//       setScale(next);
//       scaleRef.current = next;
//       if (progress < 1) zoomAnimationRef.current = requestAnimationFrame(animate);
//       else              zoomAnimationRef.current = null;
//     };

//     zoomAnimationRef.current = requestAnimationFrame(animate);
//   };

//   const handleZoomIn  = () => smoothZoom(Math.min(scaleRef.current + 0.1, 2.0));
//   const handleZoomOut = () => smoothZoom(Math.max(scaleRef.current - 0.1, 0.2));
//   const handleReset   = () => {
//     smoothZoom(window.innerWidth < 768 ? 0.45 : 0.9);
//     setPosition({ x: 0, y: 0 });
//   };

//   // ── Wheel zoom + pan ──────────────────────────────────────────────────────
//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const onWheel = (e: WheelEvent) => {
//       e.preventDefault();
//       if (e.ctrlKey || e.metaKey) {
//         const factor = Math.exp(-e.deltaY * 0.0015);
//         const next   = Math.max(0.2, Math.min(2.0, scaleRef.current * factor));
//         setScale(next);
//         scaleRef.current = next;
//       } else {
//         setPosition((prev) => ({
//           x: prev.x - e.deltaX * 0.3,
//           y: prev.y - e.deltaY * 0.3,
//         }));
//       }
//     };

//     container.addEventListener("wheel", onWheel, { passive: false });
//     return () => container.removeEventListener("wheel", onWheel);
//   }, []);

//   useEffect(() => {
//     return () => { if (zoomAnimationRef.current) cancelAnimationFrame(zoomAnimationRef.current); };
//   }, []);

//   return (
//     <div className="relative w-full h-[80vh] lg:h-[92vh] mt-8 ">
//       {/* Preview Container */}
//       <div
//         ref={containerRef}
//         className="absolute inset-0 overflow-hidden bg-gray-100 rounded-lg shadow-inner"
//         style={{ cursor: isDragging ? "grabbing" : "grab" }}
//       >
//         <div
//           ref={contentRef}
//           style={{
//             transformOrigin: "top left",
//             transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
//             position: "absolute",
//             userSelect: "none",
//             WebkitUserSelect: "none",
//           }}
//         >
//           {children}
//         </div>
//       </div>

//       {/* Premium Zoom Controls */}
//       <div
//         data-no-drag
//         className="absolute bottom-6 right-4 flex flex-col gap-2 z-30"
//       >
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={handleZoomIn}
//           className="w-7 h-7 md:w-8 md:w-8 lg:w-10 lg:h-10 flex items-center justify-center bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
//           title="Zoom In (Ctrl +)"
//           type="button"
//         >
//           <FiZoomIn className= "w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
//         </motion.button>

//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={handleZoomOut}
//           className="w-7 h-7 md:w-8 md:w-8 lg:w-10 lg:h-10 flex items-center justify-center bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
//           title="Zoom Out (Ctrl -)"
//           type="button"
//         >
//           <FiZoomOut className= "w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
//         </motion.button>

//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={handleReset}
//           className="w-7 h-7 md:w-8 md:w-8 lg:w-10 lg:h-10 flex items-center justify-center bg-gray-700 text-white rounded-lg md:rounded-xl shadow-lg hover:bg-gray-800 transition-all duration-300 cursor-pointer"
//           title="Reset View (0)"
//           type="button"
//         >
//           <FiRefreshCw className= "w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
//         </motion.button>
//       </div>

    

//       {/* Zoom Level Indicator */}
//       {/* <motion.div
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="absolute top-4 right-4 z-30 pointer-events-none"
//       >
//         <div className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md border border-gray-200">
//           <span className="text-sm font-semibold text-indigo-600">
//             {Math.round(scale * 100)}%
//           </span>
//         </div>
//       </motion.div> */}

      
//     </div>
//   );
// }





















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

//   // ── ALL events registered on window ─────────────────────
//   //
//   // WHY window and not the container div?
//   //
//   // An <iframe> is a fully separate browsing context. When the user's
//   // pointer is over an iframe, the browser routes ALL pointer events
//   // (mousedown, mousemove, mouseup, wheel) into the iframe's document —
//   // the parent document never sees them. This means:
//   //
//   //   • container.addEventListener("mousedown")  → fires only outside iframe
//   //   • container.addEventListener("mousemove")  → stops firing once over iframe
//   //
//   // The ONLY reliable fix is to listen on `window` with `capture:true`.
//   // Capture-phase listeners fire before the event is dispatched to any
//   // child — including iframes — so we always get the event first.
//   //
//   // We then use `getBoundingClientRect()` to check whether the pointer
//   // is actually inside our container before acting on it.
//   //
//   // Additionally, we inject `pointer-events: none` on every iframe inside
//   // the container via a scoped <style> tag. Since this is a view-only
//   // resume preview, the iframe doesn't need to be interactive at all.
//   // This is the belt-AND-suspenders approach.
//   //
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

//     // ── Mouse (all on window, capture phase) ────────────────
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

//     // ── Touch ────────────────────────────────────────────────
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

//     // ── Wheel ────────────────────────────────────────────────
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

//     // capture:true on mousedown so we fire before the iframe swallows it
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
//   }, []); // empty — refs keep everything fresh

//   // ── Smooth zoom ──────────────────────────────────────────
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
//     <div className="relative w-full h-[80vh] lg:h-[92vh] mt-8">

//       {/*
//         Scoped style: disable pointer-events on every iframe inside this
//         component. The resume is view-only so it needs zero interactivity.
//         This is the belt-and-suspenders partner to the window capture
//         listeners above — together they guarantee drag works everywhere.
//       */}
//       <style>{`
//         .cvs-preview-root iframe {
//           pointer-events: none !important;
//           user-select: none !important;
//         }
//       `}</style>

//       <div
//         ref={containerRef}
//         className="cvs-preview-root absolute inset-0 overflow-hidden bg-gray-100 rounded-lg shadow-inner select-none"
//         style={{ cursor: isDragging ? "grabbing" : "grab" }}
//       >
//         <div
//           style={{
//             position:         "absolute",
//             top:              0,
//             left:             0,
//             transformOrigin:  "top left",
//             transform:        `translate(${position.x}px, ${position.y}px) scale(${scale})`,
//             userSelect:       "none",
//             WebkitUserSelect: "none",
//           }}
//         >
//           {children}
//         </div>
//       </div>

//       {/* Zoom controls */}
//       <div
//         data-no-drag
//         className="absolute bottom-6 right-4 flex flex-col gap-2 z-30"
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

//       {/* Scale badge */}
//       <div className="absolute top-3 left-3 z-30 pointer-events-none">
//         <div className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full shadow-sm border border-gray-200">
//           <span className="text-[11px] font-bold text-indigo-600">
//             {Math.round(scale * 100)}%
//           </span>
//         </div>
//       </div>

//       {/* Hint */}
//       <p className="absolute bottom-3 left-3 z-30 pointer-events-none text-[10px] font-semibold text-gray-400 select-none">
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

  const [scale,      setScale]      = useState(0.9);
  const [position,   setPosition]   = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const scaleRef    = useRef(0.9);
  const posRef      = useRef<Position>({ x: 0, y: 0 });
  const downRef     = useRef<Position | null>(null);
  const startRef    = useRef<Position>({ x: 0, y: 0 });
  const dragActive  = useRef(false);
  const zoomAnimRef = useRef<number | null>(null);

  // keep refs in sync with state
  useEffect(() => { scaleRef.current = scale;    }, [scale]);
  useEffect(() => { posRef.current   = position; }, [position]);

  // ── Responsive initial scale ─────────────────────────────
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      return w < 480 ? 0.38 : w < 768 ? 0.55 : w < 1024 ? 0.72 : w < 1280 ? 0.78 : 0.90;
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

    const onMouseDown = (e: MouseEvent) => {
      if (!inContainer(e.clientX, e.clientY)) return;
      if (isControl(e.target)) return;
      e.preventDefault();
      downRef.current    = { x: e.clientX, y: e.clientY };
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
      downRef.current    = null;
      dragActive.current = false;
      setIsDragging(false);
    };

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!inContainer(t.clientX, t.clientY)) return;
      if (isControl(e.target)) return;
      downRef.current    = { x: t.clientX, y: t.clientY };
      dragActive.current = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!downRef.current) return;
      const t  = e.touches[0];
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

    const onTouchEnd = () => {
      downRef.current    = null;
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

    window.addEventListener("mousedown",  onMouseDown,  { capture: true });
    window.addEventListener("mousemove",  onMouseMove);
    window.addEventListener("mouseup",    onMouseUp);
    window.addEventListener("touchstart", onTouchStart, { passive: true  });
    window.addEventListener("touchmove",  onTouchMove,  { passive: false });
    window.addEventListener("touchend",   onTouchEnd);
    window.addEventListener("wheel",      onWheel,      { capture: true, passive: false });

    return () => {
      window.removeEventListener("mousedown",  onMouseDown,  { capture: true });
      window.removeEventListener("mousemove",  onMouseMove);
      window.removeEventListener("mouseup",    onMouseUp);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove",  onTouchMove);
      window.removeEventListener("touchend",   onTouchEnd);
      window.removeEventListener("wheel",      onWheel,      { capture: true });
    };
  }, []);

  const smoothZoom = (target: number) => {
    if (zoomAnimRef.current) cancelAnimationFrame(zoomAnimRef.current);
    const from = scaleRef.current;
    const t0   = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 150, 1);
      const v = from + (target - from) * (1 - Math.pow(1 - p, 3));
      setScale(v);
      scaleRef.current = v;
      if (p < 1) zoomAnimRef.current = requestAnimationFrame(tick);
      else        zoomAnimRef.current = null;
    };
    zoomAnimRef.current = requestAnimationFrame(tick);
  };

  const handleZoomIn  = () => smoothZoom(Math.min(scaleRef.current + 0.12, 3.0));
  const handleZoomOut = () => smoothZoom(Math.max(scaleRef.current - 0.12, 0.2));
  const handleReset   = () => {
    const w = window.innerWidth;
    smoothZoom(w < 480 ? 0.38 : w < 768 ? 0.55 : w < 1024 ? 0.72 : w < 1280 ? 0.78 : 0.90);
    posRef.current = { x: 0, y: 0 };
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => () => {
    if (zoomAnimRef.current) cancelAnimationFrame(zoomAnimRef.current);
  }, []);

  return (
    /* ── Outer wrapper: adds breathing room around the canvas panel ── */
    <div className="relative w-full h-[80vh] lg:h-[92vh] mt-8 px-3 py-3 lg:px-4 lg:py-4">

      <style>{`
        .cvs-preview-root iframe {
          pointer-events: none !important;
          user-select: none !important;
        }
      `}</style>

      <div
        ref={containerRef}
        className="cvs-preview-root absolute inset-3 lg:inset-4 overflow-hidden bg-[#e8e8e8] rounded-xl shadow-inner select-none"
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        {/* ── Scrollable canvas content ── */}
        <div
          style={{
            position:         "absolute",
            top:              0,
            left:             0,
            transformOrigin:  "top left",
            transform:        `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            userSelect:       "none",
            WebkitUserSelect: "none",
            /* top/left padding so the first page doesn't sit flush against the edge */
            paddingTop:       "24px",
            paddingLeft:      "24px",
            paddingBottom:    "24px",
          }}
        >
          {children}
        </div>
      </div>

      {/* ── Zoom controls ── */}
      <div
        data-no-drag
        className="absolute bottom-8 right-6 flex flex-col gap-2 z-30"
      >
        {[
          { fn: handleZoomIn,  icon: <FiZoomIn    className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />, dark: false, title: "Zoom In"  },
          { fn: handleZoomOut, icon: <FiZoomOut   className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />, dark: false, title: "Zoom Out" },
          { fn: handleReset,   icon: <FiRefreshCw className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />, dark: true,  title: "Reset"   },
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

      {/* ── Scale badge ── */}
      <div className="absolute top-5 left-5 z-30 pointer-events-none">
        <div className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full shadow-sm border border-gray-200">
          <span className="text-[11px] font-bold text-indigo-600">
            {Math.round(scale * 100)}%
          </span>
        </div>
      </div>

      {/* ── Hint ── */}
      <p className="absolute bottom-5 left-5 z-30 pointer-events-none text-[10px] font-semibold text-gray-400 select-none">
        Drag · Pinch · Ctrl+Scroll
      </p>
    </div>
  );
}