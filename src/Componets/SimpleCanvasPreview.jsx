import { useEffect, useRef, useState } from "react";

export default function SimpleCanvasPreview({ children }) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  const [scale, setScale] = useState(1);
  const zoomAnimationRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth < 480){
        setScale(0.45);
      }
      else if (window.innerWidth < 768) {
        setScale(0.6);
      } else if (window.innerWidth < 1024) {
        setScale(0.9);
      } else if (window.innerWidth < 1280)  {
        setScale(0.7);
      }
      else{
        setScale(0.8);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const handlePointerDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    setStartPosition({ x: clientX - position.x, y: clientY - position.y });
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    const newX = clientX - startPosition.x;
    const newY = clientY - startPosition.y;

    setPosition({ x: newX, y: newY });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Smooth zoom function
  const smoothZoom = (targetScale) => {
    if (zoomAnimationRef.current) {
      cancelAnimationFrame(zoomAnimationRef.current);
    }

    const startScale = scale;
    const duration = 150;
    const startTime = performance.now();

    const animateZoom = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const newScale = startScale + (targetScale - startScale) * easeProgress;
      setScale(newScale);

      if (progress < 1) {
        zoomAnimationRef.current = requestAnimationFrame(animateZoom);
      } else {
        zoomAnimationRef.current = null;
      }
    };

    zoomAnimationRef.current = requestAnimationFrame(animateZoom);
  };

  // Fixed zoom functions - use linear steps for buttons
  const handleZoomIn = () => {
    const newScale = Math.min(scale + 0.1, 2.0); // Linear increment for buttons
    smoothZoom(newScale);
  };

  const handleZoomOut = () => {
    const newScale = Math.max(scale - 0.1, 0.2); // Linear decrement for buttons
    smoothZoom(newScale);
  };

  // Handle wheel for zoom
  const handleWheel = (e) => {
    e.preventDefault();
    
    if (e.ctrlKey || e.metaKey) {
      // Exponential zoom for wheel (smoother, more natural)
      const zoomSensitivity = 0.0015; // Adjust this value for sensitivity
      const delta = e.deltaY * zoomSensitivity;
      
      // Exponential zoom feels more natural for mouse wheel
      const zoomFactor = Math.exp(-delta);
      const newScale = scale * zoomFactor;
      
      const clampedScale = Math.max(0.2, Math.min(2.0, newScale));
      
      // For wheel zoom, we can use direct setScale for immediate feedback
      // or use smoothZoom for consistency
      setScale(clampedScale);
    } else {
      // Scroll for panning
      setPosition((prev) => ({
        x: prev.x - e.deltaX * 0.3,
        y: prev.y - e.deltaY * 0.3,
      }));
    }
  };

  // Clean up animation frame on unmount
  useEffect(() => {
    return () => {
      if (zoomAnimationRef.current) {
        cancelAnimationFrame(zoomAnimationRef.current);
      }
    };
  }, []);

  // Add wheel event listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [scale]); // Include scale to get latest value

  const handleReset = () => {
    const scaleValue = window.innerWidth < 768 ? 0.35 : 0.7;
    smoothZoom(scaleValue);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="relative grow h-[80vh] lg:h-[92vh] rounded-lg overflow-hidden">
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-hidden touch-none"
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        style={{
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        <div
          ref={contentRef}
          className="origin-top-left absolute w-full"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            minWidth: "210mm",
            minHeight: "297mm",
            padding: "5mm",
            touchAction: "none",
            userSelect: "none",
            WebkitUserSelect: "none",
          }}
        >
          {children}
        </div>
      </div>

      {/* Controls Overlay */}
      <div className="absolute bottom-8 md:bottom-4 right-4 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center bg-red-500 text-white rounded-full shadow-lg hover:bg-red-700 active:scale-95 transition-all"
          title="Zoom In"
        >
          <span className="md:text-lg font-medium md:font-bold">+</span>
        </button>
        <button
          onClick={handleZoomOut}
          className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 active:scale-95 transition-all"
          title="Zoom Out"
        >
          <span className="md:text-lg font-medium md:font-bold">-</span>
        </button>
        <button
          onClick={handleReset}
          className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center bg-gray-600 text-white rounded-full shadow-lg hover:bg-gray-700 active:scale-95 transition-all"
          title="Reset View"
        >
          <span className="text-xs">⟲</span>
        </button>
      </div>

      {/* Scale indicator */}
      <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
        Scale: {Math.round(scale * 100)}%
      </div>
    </div>
  );
}