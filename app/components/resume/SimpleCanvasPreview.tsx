// "use client";

// import { useEffect, useRef, useState, ReactNode } from "react";

// interface SimpleCanvasPreviewProps {
//   children: ReactNode;
// }

// interface Position {
//   x: number;
//   y: number;
// }

// export default function SimpleCanvasPreview({
//   children,
// }: SimpleCanvasPreviewProps) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const contentRef = useRef<HTMLDivElement>(null);

//   const [scale, setScale] = useState<number>(1);
//   const zoomAnimationRef = useRef<number | null>(null);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 480) {
//         setScale(0.45);
//       } else if (window.innerWidth < 768) {
//         setScale(0.6);
//       } else if (window.innerWidth < 1024) {
//         setScale(0.9);
//       } else if (window.innerWidth < 1280) {
//         setScale(0.7);
//       } else {
//         setScale(0.9);
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const [isDragging, setIsDragging] = useState<boolean>(false);
//   const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
//   const [startPosition, setStartPosition] = useState<Position>({ x: 0, y: 0 });

//   const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
//     e.preventDefault();
//     setIsDragging(true);

//     let clientX: number, clientY: number;

//     if ("touches" in e) {
//       // Touch event
//       clientX = e.touches[0].clientX;
//       clientY = e.touches[0].clientY;
//     } else {
//       // Mouse event
//       clientX = e.clientX;
//       clientY = e.clientY;
//     }

//     setStartPosition({ x: clientX - position.x, y: clientY - position.y });
//   };

//   const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
//     if (!isDragging) return;
//     e.preventDefault();

//     let clientX: number, clientY: number;

//     if ("touches" in e) {
//       // Touch event
//       clientX = e.touches[0].clientX;
//       clientY = e.touches[0].clientY;
//     } else {
//       // Mouse event
//       clientX = e.clientX;
//       clientY = e.clientY;
//     }

//     const newX = clientX - startPosition.x;
//     const newY = clientY - startPosition.y;

//     setPosition({ x: newX, y: newY });
//   };

//   const handlePointerUp = () => {
//     setIsDragging(false);
//   };

//   // Smooth zoom function
//   const smoothZoom = (targetScale: number) => {
//     if (zoomAnimationRef.current) {
//       cancelAnimationFrame(zoomAnimationRef.current);
//     }

//     const startScale = scale;
//     const duration = 150;
//     const startTime = performance.now();

//     const animateZoom = (currentTime: number) => {
//       const elapsed = currentTime - startTime;
//       const progress = Math.min(elapsed / duration, 1);

//       const easeProgress = 1 - Math.pow(1 - progress, 3);
//       const newScale = startScale + (targetScale - startScale) * easeProgress;
//       setScale(newScale);

//       if (progress < 1) {
//         zoomAnimationRef.current = requestAnimationFrame(animateZoom);
//       } else {
//         zoomAnimationRef.current = null;
//       }
//     };

//     zoomAnimationRef.current = requestAnimationFrame(animateZoom);
//   };

//   // Fixed zoom functions - use linear steps for buttons
//   const handleZoomIn = () => {
//     const newScale = Math.min(scale + 0.1, 2.0); // Linear increment for buttons
//     smoothZoom(newScale);
//   };

//   const handleZoomOut = () => {
//     const newScale = Math.max(scale - 0.1, 0.2); // Linear decrement for buttons
//     smoothZoom(newScale);
//   };

//   // Handle wheel for zoom
//   const handleWheel = (e: WheelEvent) => {
//     e.preventDefault();

//     if (e.ctrlKey || e.metaKey) {
//       // Exponential zoom for wheel (smoother, more natural)
//       const zoomSensitivity = 0.0015; // Adjust this value for sensitivity
//       const delta = e.deltaY * zoomSensitivity;

//       // Exponential zoom feels more natural for mouse wheel
//       const zoomFactor = Math.exp(-delta);
//       const newScale = scale * zoomFactor;

//       const clampedScale = Math.max(0.2, Math.min(2.0, newScale));

//       // For wheel zoom, we can use direct setScale for immediate feedback
//       // or use smoothZoom for consistency
//       setScale(clampedScale);
//     } else {
//       // Scroll for panning
//       setPosition((prev) => ({
//         x: prev.x - e.deltaX * 0.3,
//         y: prev.y - e.deltaY * 0.3,
//       }));
//     }
//   };

//   // Clean up animation frame on unmount
//   useEffect(() => {
//     return () => {
//       if (zoomAnimationRef.current) {
//         cancelAnimationFrame(zoomAnimationRef.current);
//       }
//     };
//   }, []);

//   // Add wheel event listener
//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const wheelHandler = (e: WheelEvent) => handleWheel(e);
//     container.addEventListener("wheel", wheelHandler, { passive: false });

//     return () => {
//       container.removeEventListener("wheel", wheelHandler);
//     };
//   }, [scale]); // Include scale to get latest value

//   const handleReset = () => {
//     const scaleValue = window.innerWidth < 768 ? 0.35 : 0.8;
//     smoothZoom(scaleValue);
//     setPosition({ x: 0, y: 0 });
//   };

//   return (
//     <div className="relative grow h-[80vh] lg:h-[92vh] mt-10 rounded-lg overflow-hidden">
//       <div
//         ref={containerRef}
//         className="absolute inset-0 overflow-hidden touch-none"
//         onMouseDown={handlePointerDown}
//         onMouseMove={handlePointerMove}
//         onMouseUp={handlePointerUp}
//         onMouseLeave={handlePointerUp}
//         onTouchStart={handlePointerDown}
//         onTouchMove={handlePointerMove}
//         onTouchEnd={handlePointerUp}
//         style={{
//           cursor: isDragging ? "grabbing" : "grab",
//         }}
//       >
//         <div
//           ref={contentRef}
//           className="origin-top-left absolute w-full"
//           style={{
//             transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
//             minWidth: "210mm",
//             minHeight: "297mm",
//             padding: "5mm",
//             touchAction: "none",
//             userSelect: "none",
//             WebkitUserSelect: "none",
//           }}
//         >
//           {children}
//         </div>
//       </div>

//       {/* Controls Overlay */}
//       <div className="absolute bottom-8 md:bottom-4 right-4 flex flex-col gap-2">
//         <button
//           onClick={handleZoomIn}
//           className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center bg-red-500 text-white rounded-full shadow-lg hover:bg-red-700 active:scale-95 transition-all"
//           title="Zoom In"
//           type="button"
//         >
//           <span className="md:text-lg font-medium md:font-bold">+</span>
//         </button>
//         <button
//           onClick={handleZoomOut}
//           className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 active:scale-95 transition-all"
//           title="Zoom Out"
//           type="button"
//         >
//           <span className="md:text-lg font-medium md:font-bold">-</span>
//         </button>
//         <button
//           onClick={handleReset}
//           className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center bg-gray-600 text-white rounded-full shadow-lg hover:bg-gray-700 active:scale-95 transition-all"
//           title="Reset View"
//           type="button"
//         >
//           <span className="text-xs">⟲</span>
//         </button>
//       </div>

//       {/* Scale indicator */}
//       {/* <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
//         Scale: {Math.round(scale * 100)}%
//       </div> */}
//     </div>
//   );
// }










"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface SimpleCanvasPreviewProps {
  children: ReactNode;
}

interface Position {
  x: number;
  y: number;
}

export default function SimpleCanvasPreview({ children }: SimpleCanvasPreviewProps) {
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

  // Track mousedown origin so we can distinguish click vs drag
  const pointerDownPos = useRef<Position | null>(null);
  const dragStarted    = useRef(false);
  const DRAG_THRESHOLD = 5; // px — movement needed before we commit to a drag

  const getClient = (e: MouseEvent | TouchEvent): Position => {
    if ("touches" in e) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    return { x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY };
  };

  // We attach listeners to the CONTAINER (not individual child elements).
  // This way clicks on buttons still fire normally — we only intercept
  // pointer events when the user actually drags.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMouseDown = (e: MouseEvent) => {
      // Ignore clicks on interactive elements — buttons, inputs, links, selects
      const tag = (e.target as HTMLElement).tagName;
      if (["BUTTON", "INPUT", "A", "SELECT", "TEXTAREA"].includes(tag)) return;
      // Also ignore clicks that originate inside an element with data-no-drag
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
        // Commit to drag
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

    // Touch equivalents
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
    // position/startPosition are needed in closures — include them
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
    <div className="relative grow h-[80vh] lg:h-[92vh] mt-10 rounded-lg overflow-hidden">
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-hidden"
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
          {/*
            NO overlay div here anymore.
            Drag is detected by the container via the threshold logic above.
            Buttons inside children fire their onClick normally because
            we skip drag initiation when the target is a BUTTON/A/INPUT.
          */}
          {children}
        </div>
      </div>

      {/* Zoom controls — data-no-drag prevents accidental drag on these */}
      <div
        data-no-drag
        className="absolute bottom-8 md:bottom-4 right-4 flex flex-col gap-2 z-30"
      >
        <button
          onClick={handleZoomIn}
          className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center bg-red-500 text-white rounded-full shadow-lg hover:bg-red-700 active:scale-95 transition-all"
          title="Zoom In"
          type="button"
        >
          <span className="md:text-lg font-medium md:font-bold">+</span>
        </button>
        <button
          onClick={handleZoomOut}
          className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 active:scale-95 transition-all"
          title="Zoom Out"
          type="button"
        >
          <span className="md:text-lg font-medium md:font-bold">-</span>
        </button>
        <button
          onClick={handleReset}
          className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center bg-gray-600 text-white rounded-full shadow-lg hover:bg-gray-700 active:scale-95 transition-all"
          title="Reset View"
          type="button"
        >
          <span className="text-xs">⟲</span>
        </button>
      </div>

      {/* Zoom level pill */}
      <div
        className="absolute bottom-8 md:bottom-4 left-4 z-30"
        style={{
          fontSize: "11px",
          background: "rgba(0,0,0,0.45)",
          color: "white",
          padding: "3px 8px",
          borderRadius: "999px",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {Math.round(scale * 100)}%
      </div>
    </div>
  );
}