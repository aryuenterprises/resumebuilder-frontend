"use client";

// ─────────────────────────────────────────────────────────────────────────────
// ViewResumeModal.tsx  —  drop-in replacement for the modal in DashboardPage
//
// Key change: passes viewMode={true} to the template component so TemplateOne
// renders all pages at full A4 size instead of a 0.36-scale thumbnail.
// The modal then scales the 794px-wide content down to fit the viewport.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiFileText, FiDownload } from "react-icons/fi";

// ── Types ─────────────────────────────────────────────────────────────────────
interface ResumeItem {
  component: React.ComponentType<any>;
  id: number;
  resume_data: object;
  resume_title: string;
  template: { id: number; name: string; thumbnail: string | null; tier: string };
  updated_at: string;
  [key: string]: any;
}

interface Props {
  item: ResumeItem | null;
  onClose: () => void;
}

// ── A4 constant (must match TemplateOne) ─────────────────────────────────────
const A4_W = 794;

// ── Modal ─────────────────────────────────────────────────────────────────────
export const ViewResumeModal: React.FC<Props> = ({ item, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Dynamically compute how much to scale A4 content to fit the modal width
  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const availableWidth = containerRef.current.clientWidth - 48; // 24px padding each side
      const s = Math.min(1, availableWidth / A4_W);
      setScale(s);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [item]);

  if (!item) return null;

  const ComponentToRender = item.component;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{
          background: "rgba(15, 23, 42, 0.80)",
          backdropFilter: "blur(6px)",
        }}
        onClick={onClose}
      >
        {/* Modal panel */}
        <motion.div
          key="panel"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="relative flex flex-col mx-4 rounded-2xl overflow-hidden"
          style={{
            width: "min(900px, 96vw)",
            maxHeight: "92vh",
            background: "white",
            boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Header ── */}
          <div
            className="flex items-center justify-between px-5 py-3.5 flex-shrink-0"
            style={{
              background: "#4F46E5",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.15)" }}
              >
                <FiFileText className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-tight">
                  {item.resume_title || "Resume Preview"}
                </p>
                <p className="text-indigo-200 text-[11px]">
                  Template {item.template?.id}
                  {item.updated_at && (
                    <>
                      {" · "}
                      {new Date(item.updated_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </>
                  )}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
              style={{ background: "rgba(255,255,255,0.1)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  "rgba(255,255,255,0.2)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  "rgba(255,255,255,0.1)")
              }
            >
              <FiX className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* ── Scrollable body ── */}
          <div
            ref={containerRef}
            className="overflow-y-auto flex-1"
            style={{ background: "#F1F5F9" }}
          >
            <div
              className="py-6 flex flex-col items-center"
              style={{ paddingLeft: 24, paddingRight: 24 }}
            >
              {/*
               * Scale wrapper:
               *   - The component renders at A4_W = 794px naturally.
               *   - We scale it down so it fits the modal while keeping pixel-perfect layout.
               *   - `transformOrigin: "top center"` keeps it centred horizontally.
               *   - The negative margin-bottom compensates for the space transform leaves.
               *
               * viewMode={true} tells TemplateOne to use the full multi-page render
               * branch (all pages, correct iframes) instead of the 0.36-scale thumbnail.
               */}
              <div
                style={{
                  width: `${A4_W}px`,
                  transform: `scale(${scale})`,
                  transformOrigin: "top center",
                  // After scaling down, the element still occupies its original height
                  // in the flow. We collapse that gap so there is no phantom whitespace.
                  marginBottom: `calc((${scale} - 1) * 100%)`,
                  // Give a bit of a bottom gap before the scrollable area ends
                  paddingBottom: 24,
                }}
              >
                {/*
                 * viewMode={true} → bypasses the `if (alldata) → thumbnail` branch.
                 * alldata={item.resume_data} → feeds real data so the resume renders.
                 */}
                <ComponentToRender
                  alldata={item.resume_data}
                  viewMode={true}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ViewResumeModal;