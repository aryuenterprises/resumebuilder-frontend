

"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { FiZoomIn, FiZoomOut, FiRefreshCw, FiMove } from "react-icons/fi";
import { IoReload } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

interface SimpleCanvasPreviewProps {
  children: ReactNode;
}

interface Position {
  x: number;
  y: number;
}

export  function SimpleCanvasPreview({ children }: SimpleCanvasPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef   = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState<number>(1);
  const zoomAnimationRef  = useRef<number | null>(null);
  const scaleRef          = useRef<number>(scale);

  useEffect(() => { scaleRef.current = scale; }, [scale]);

  // ── Responsive initial scale ──────────────────────────────────────────────
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 480)       setScale(0.45);
      else if (w < 768)  setScale(0.6);
      else if (w < 1024) setScale(0.9);
      else if (w < 1280) setScale(0.7);
      else               setScale(0.9);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ── Drag / pan ────────────────────────────────────────────────────────────
  const [isDragging,    setIsDragging]    = useState(false);
  const [position,      setPosition]      = useState<Position>({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState<Position>({ x: 0, y: 0 });

  const pointerDownPos = useRef<Position | null>(null);
  const dragStarted    = useRef(false);
  const DRAG_THRESHOLD = 5;

  const getClient = (e: MouseEvent | TouchEvent): Position => {
    if ("touches" in e) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    return { x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY };
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMouseDown = (e: MouseEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (["BUTTON", "INPUT", "A", "SELECT", "TEXTAREA"].includes(tag)) return;
      if ((e.target as HTMLElement).closest("[data-no-drag]")) return;

      pointerDownPos.current = { x: e.clientX, y: e.clientY };
      dragStarted.current    = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!pointerDownPos.current) return;

      const dx = e.clientX - pointerDownPos.current.x;
      const dy = e.clientY - pointerDownPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (!dragStarted.current && dist > DRAG_THRESHOLD) {
        dragStarted.current = true;
        setIsDragging(true);
        setStartPosition({
          x: pointerDownPos.current.x - position.x,
          y: pointerDownPos.current.y - position.y,
        });
      }

      if (dragStarted.current) {
        e.preventDefault();
        setPosition({
          x: e.clientX - startPosition.x,
          y: e.clientY - startPosition.y,
        });
      }
    };

    const onMouseUp = () => {
      pointerDownPos.current = null;
      dragStarted.current    = false;
      setIsDragging(false);
    };

    const onTouchStart = (e: TouchEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (["BUTTON", "INPUT", "A", "SELECT", "TEXTAREA"].includes(tag)) return;
      if ((e.target as HTMLElement).closest("[data-no-drag]")) return;

      const { x, y } = getClient(e);
      pointerDownPos.current = { x, y };
      dragStarted.current    = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!pointerDownPos.current) return;
      const { x, y } = getClient(e);
      const dx   = x - pointerDownPos.current.x;
      const dy   = y - pointerDownPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (!dragStarted.current && dist > DRAG_THRESHOLD) {
        dragStarted.current = true;
        setIsDragging(true);
        setStartPosition({
          x: pointerDownPos.current.x - position.x,
          y: pointerDownPos.current.y - position.y,
        });
      }

      if (dragStarted.current) {
        e.preventDefault();
        setPosition({ x: x - startPosition.x, y: y - startPosition.y });
      }
    };

    const onTouchEnd = () => {
      pointerDownPos.current = null;
      dragStarted.current    = false;
      setIsDragging(false);
    };

    container.addEventListener("mousedown",  onMouseDown);
    container.addEventListener("mousemove",  onMouseMove);
    container.addEventListener("mouseup",    onMouseUp);
    container.addEventListener("mouseleave", onMouseUp);
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove",  onTouchMove,  { passive: false });
    container.addEventListener("touchend",   onTouchEnd);

    return () => {
      container.removeEventListener("mousedown",  onMouseDown);
      container.removeEventListener("mousemove",  onMouseMove);
      container.removeEventListener("mouseup",    onMouseUp);
      container.removeEventListener("mouseleave", onMouseUp);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove",  onTouchMove);
      container.removeEventListener("touchend",   onTouchEnd);
    };
  }, [position, startPosition]);

  // ── Smooth zoom ───────────────────────────────────────────────────────────
  const smoothZoom = (targetScale: number) => {
    if (zoomAnimationRef.current) cancelAnimationFrame(zoomAnimationRef.current);
    const startScale = scaleRef.current;
    const duration   = 150;
    const startTime  = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease     = 1 - Math.pow(1 - progress, 3);
      const next     = startScale + (targetScale - startScale) * ease;
      setScale(next);
      scaleRef.current = next;
      if (progress < 1) zoomAnimationRef.current = requestAnimationFrame(animate);
      else              zoomAnimationRef.current = null;
    };

    zoomAnimationRef.current = requestAnimationFrame(animate);
  };

  const handleZoomIn  = () => smoothZoom(Math.min(scaleRef.current + 0.1, 2.0));
  const handleZoomOut = () => smoothZoom(Math.max(scaleRef.current - 0.1, 0.2));
  const handleReset   = () => {
    smoothZoom(window.innerWidth < 768 ? 0.45 : 0.9);
    setPosition({ x: 0, y: 0 });
  };

  // ── Wheel zoom + pan ──────────────────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        const factor = Math.exp(-e.deltaY * 0.0015);
        const next   = Math.max(0.2, Math.min(2.0, scaleRef.current * factor));
        setScale(next);
        scaleRef.current = next;
      } else {
        setPosition((prev) => ({
          x: prev.x - e.deltaX * 0.3,
          y: prev.y - e.deltaY * 0.3,
        }));
      }
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    return () => { if (zoomAnimationRef.current) cancelAnimationFrame(zoomAnimationRef.current); };
  }, []);

  return (
    <div className="relative w-full h-[80vh] lg:h-[92vh] mt-8 ">
      {/* Preview Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-hidden bg-gray-100 rounded-lg shadow-inner"
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        <div
          ref={contentRef}
          style={{
            transformOrigin: "top left",
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            position: "absolute",
            userSelect: "none",
            WebkitUserSelect: "none",
          }}
        >
          {children}
        </div>
      </div>

      {/* Premium Zoom Controls */}
      <div
        data-no-drag
        className="absolute bottom-6 right-4 flex flex-col gap-2 z-30"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleZoomIn}
          className="w-7 h-7 md:w-8 md:w-8 lg:w-10 lg:h-10 flex items-center justify-center bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          title="Zoom In (Ctrl +)"
          type="button"
        >
          <FiZoomIn className= "w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleZoomOut}
          className="w-7 h-7 md:w-8 md:w-8 lg:w-10 lg:h-10 flex items-center justify-center bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          title="Zoom Out (Ctrl -)"
          type="button"
        >
          <FiZoomOut className= "w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReset}
          className="w-7 h-7 md:w-8 md:w-8 lg:w-10 lg:h-10 flex items-center justify-center bg-gray-700 text-white rounded-lg md:rounded-xl shadow-lg hover:bg-gray-800 transition-all duration-300 cursor-pointer"
          title="Reset View (0)"
          type="button"
        >
          <FiRefreshCw className= "w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
        </motion.button>
      </div>

    

      {/* Zoom Level Indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute top-4 right-4 z-30 pointer-events-none"
      >
        <div className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md border border-gray-200">
          <span className="text-sm font-semibold text-indigo-600">
            {Math.round(scale * 100)}%
          </span>
        </div>
      </motion.div>

      
    </div>
  );
}