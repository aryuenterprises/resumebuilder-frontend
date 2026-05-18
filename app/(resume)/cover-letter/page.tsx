// ============================================================
// COVER LETTER GENERATOR — Full Component
// ============================================================
// HOW THIS FILE IS ORGANIZED:
// 1. IMPORTS       — all the libraries we need
// 2. TYPES         — TypeScript types (like blueprints for data)
// 3. CONSTANTS     — fonts, colors, template definitions (40 total)
// 4. buildHTML()   — the big function that creates the actual letter HTML
// 5. CanvasPreview — the zoomable/draggable preview panel
// 6. TemplateCard  — one card in the template picker grid
// 7. Popups        — Login and Premium modals
// 8. Field helpers — small UI helpers for form fields
// 9. MAIN COMPONENT — the whole page tied together
// ============================================================

"use client";

// --- 1. IMPORTS ---
// React core
import React, {
  useState, // stores changing values (like which step you're on)
  useRef, // stores a reference to a DOM element (like the iframe)
  useEffect, // runs code when something changes
  useCallback, // memoizes a function so it doesn't re-create every render
  ReactNode, // type for "anything React can render"
} from "react";

import axios from "axios"; // for HTTP requests (download PDF, check login)
import { motion, AnimatePresence } from "framer-motion"; // for smooth animations
import {
  FiZoomIn,
  FiZoomOut,
  FiRefreshCw,
  FiEye,
  FiLock,
  FiX,
  FiBriefcase,
  FiMapPin,
  FiUser,
  FiLink,
  FiGlobe,
  FiPhone,
  FiMail,
  FiAlertTriangle,
  FiGithub,
  FiGrid,
  FiLayout,
} from "react-icons/fi"; // icon library
import Image from "next/image"; // Next.js optimized image
import { useRouter } from "next/navigation"; // Next.js router for navigation
import { API_URL } from "@/app/config/api"; // your backend URL
import { getLocalStorage, setLocalStorage } from "@/app/utils/localStorage"; // helper to read localStorage
import { Editor } from "primereact/editor"; // rich text editor
import { IoDocumentText, IoHomeOutline } from "react-icons/io5";
import { SlSizeFullscreen } from "react-icons/sl";

// ============================================================
// 2. TYPES — TypeScript "shapes" for our data
// ============================================================

// The logged-in user (we only need the id)
interface User {
  id: string;
}

// All the data for one cover letter
interface CLData {
  personal: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
    github: string;
    signature: string;
  };
  company: {
    name: string;
    jobTitle: string;
    hiringManager: string;
    hiringManagerTitle: string;
    city: string;
    state: string;
    country: string;
    jobSource: string;
    referral: string;
    jobId: string;
    department: string;
    companyWebsite: string;
    industry: string;
  };
  letterContent: string; // HTML from the rich text editor
  letterDate: string;
  accentColor: string;
  fontFamily: string;
}

// A blank cover letter — the starting state
const BLANK: CLData = {
  personal: {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    signature: "Sincerely",
  },
  company: {
    name: "",
    jobTitle: "",
    hiringManager: "",
    hiringManagerTitle: "",
    city: "",
    state: "",
    country: "",
    jobSource: "",
    referral: "",
    jobId: "",
    department: "",
    companyWebsite: "",
    industry: "",
  },
  letterContent: "",
  letterDate: new Date().toISOString().split("T")[0],
  accentColor: "#1a1a2e",
  fontFamily: "Cormorant Garamond",
};

// ============================================================
// 3. CONSTANTS — fonts, colors, templates
// ============================================================

// Available Google Fonts for the letter
const FONT_FAMILIES = [
  {
    id: "Cormorant Garamond",
    label: "Cormorant",
    url: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap",
    style: "serif",
  },
  {
    id: "Playfair Display",
    label: "Playfair",
    url: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap",
    style: "serif",
  },
  {
    id: "Lora",
    label: "Lora",
    url: "https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap",
    style: "serif",
  },
  {
    id: "DM Sans",
    label: "DM Sans",
    url: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap",
    style: "sans-serif",
  },
  {
    id: "Plus Jakarta Sans",
    label: "Plus Jakarta",
    url: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap",
    style: "sans-serif",
  },
  {
    id: "Outfit",
    label: "Outfit",
    url: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap",
    style: "sans-serif",
  },
  {
    id: "Syne",
    label: "Syne",
    url: "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap",
    style: "sans-serif",
  },
  {
    id: "Space Grotesk",
    label: "Space Grotesk",
    url: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap",
    style: "sans-serif",
  },
  {
    id: "IBM Plex Serif",
    label: "IBM Plex Serif",
    url: "https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@400;500;600&display=swap",
    style: "serif",
  },
  {
    id: "Manrope",
    label: "Manrope",
    url: "https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap",
    style: "sans-serif",
  },
];

// Preset accent colors for the color picker
const COLOR_PALETTES = [
  { label: "Midnight", value: "#1a1a2e" },
  { label: "Obsidian", value: "#0f0f0f" },
  { label: "Navy", value: "#1e3a5f" },
  { label: "Forest", value: "#1b4332" },
  { label: "Burgundy", value: "#6b1f2a" },
  { label: "Slate", value: "#334155" },
  { label: "Indigo", value: "#3730a3" },
  { label: "Teal", value: "#0d6e6e" },
  { label: "Copper", value: "#b87333" },
  { label: "Charcoal", value: "#2d2d2d" },
  { label: "Plum", value: "#4a1942" },
  { label: "Cobalt", value: "#0047ab" },
];

// All 40 template definitions
// Each template has:
//   id        — used to pick the right buildHTML() branch
//   name      — displayed in the template card
//   tag       — category filter tag
//   tier      — "free" or "premium"
//   description — shown on hover
//   image     — preview thumbnail path
const TEMPLATE_DEFS = [
  // ── COLORED / DESIGNED TEMPLATES (1–20) ──────────────────
  {
    id: "chancellor",
    name: "Chancellor",
    tag: "Executive",
    description: "Dark header, gold rule — authoritative C-suite",
    image: "/images/cover-letters/cl-chancellor.jpg",
  },
  {
    id: "newsprint",
    name: "Newsprint",
    tag: "Editorial",
    description: "Newspaper masthead grid — media / journalism",
    image: "/images/cover-letters/cl-newsprint.jpg",
  },
  {
    id: "atelier",
    name: "Atelier",
    tag: "Creative",
    description: "Full-bleed sidebar — design / art direction",
    image: "/images/cover-letters/cl-atelier.jpg",
  },
  {
    id: "protocol",
    name: "Protocol",
    tag: "Tech",
    description: "Monospaced header, code aesthetic — engineering",
    image: "/images/cover-letters/cl-protocol.jpg",
  },
  {
    id: "ledger",
    name: "Ledger",
    tag: "Finance",
    description: "Double-rule accounting layout — banking / consulting",
    image: "/images/cover-letters/cl-ledger.jpg",
  },
  {
    id: "palisade",
    name: "Palisade",
    tag: "Legal",
    description: "Centered serif, formal column — law / academia",
    image: "/images/cover-letters/cl-palisade.jpg",
  },
  {
    id: "sundial",
    name: "Sundial",
    tag: "Modern",
    description: "Radial accent arc, clean whitespace",
    image: "/images/cover-letters/cl-sundial.jpg",
  },
  {
    id: "meridiem",
    name: "Meridiem",
    tag: "Corporate",
    description: "Split header with role badge — operations",
    image: "/images/cover-letters/cl-meridiem.jpg",
  },
  {
    id: "folio",
    name: "Folio",
    tag: "Portfolio",

    description: "Layered card design — UX / product strategy",
    image: "/images/cover-letters/cl-folio.jpg",
  },
  {
    id: "dispatch",
    name: "Dispatch",
    tag: "Startup",
    description: "Bold cap name, minimal border — startup roles",
    image: "/images/cover-letters/cl-dispatch.jpg",
  },
  {
    id: "vellum",
    name: "Vellum",
    tag: "Classic",
    description: "Warm ivory, traditional letterhead — any industry",
    image: "/images/cover-letters/cl-vellum.jpg",
  },
  {
    id: "pavilion",
    name: "Pavilion",
    tag: "Architecture",

    description: "Blueprint grid overlay — architecture / engineering",
    image: "/images/cover-letters/cl-pavilion.jpg",
  },
  {
    id: "revue",
    name: "Revue",
    tag: "Fashion",

    description: "Asymmetric column, italic contrast — fashion / luxury",
    image: "/images/cover-letters/cl-revue.jpg",
  },
  {
    id: "helix",
    name: "Helix",
    tag: "Science",

    description: "Strand-inspired sidebar — biotech / research",
    image: "/images/cover-letters/cl-helix.jpg",
  },
  {
    id: "embassy",
    name: "Embassy",
    tag: "Government",
    description: "Official seal-style header — public sector / NGO",
    image: "/images/cover-letters/cl-embassy.jpg",
  },
  {
    id: "kodex",
    name: "Kodex",
    tag: "Data",

    description: "Data table header — analytics / data science",
    image: "/images/cover-letters/cl-kodex.jpg",
  },
  {
    id: "brushwork",
    name: "Brushwork",
    tag: "Arts",

    description: "Watercolor band, expressive — arts / non-profit",
    image: "/images/cover-letters/cl-brushwork.jpg",
  },
  {
    id: "terrace",
    name: "Terrace",
    tag: "Hospitality",
    description: "Warm earth tones — hospitality / HR / healthcare",
    image: "/images/cover-letters/cl-terrace.jpg",
  },
  {
    id: "alpine",
    name: "Alpine",
    tag: "Outdoor",

    description: "Diagonal slash — sports / sustainability / field ops",
    image: "/images/cover-letters/cl-alpine.jpg",
  },
  {
    id: "signal",
    name: "Signal",
    tag: "Media",

    description: "Broadcast bar, bold type — media / PR / comms",
    image: "/images/cover-letters/cl-signal.jpg",
  },

  {
    id: "mono",
    name: "Mono",
    tag: "B&W",
    description: "Pure black & white, single rule — the purest minimal",
    image: "/images/cover-letters/cl-mono.jpg",
  },
  {
    id: "typewriter",
    name: "Typewriter",
    tag: "B&W",
    description: "Courier-style, top black bar — retro-minimal B&W",
    image: "/images/cover-letters/cl-typewriter.jpg",
  },
  {
    id: "specimen",
    name: "Specimen",
    tag: "B&W",
    description: "Oversized initial, B&W editorial — bold and striking",
    image: "/images/cover-letters/cl-specimen.jpg",
  },
  {
    id: "grid",
    name: "Grid",
    tag: "B&W",
    description: "Ruled-paper background — structured clean B&W",
    image: "/images/cover-letters/cl-grid.jpg",
  },
  {
    id: "stencil",
    name: "Stencil",
    tag: "B&W",

    description: "Military stencil caps, thick border — stark authority",
    image: "/images/cover-letters/cl-stencil.jpg",
  },
  {
    id: "hairline",
    name: "Hairline",
    tag: "B&W",
    description: "Ultra-thin rules, airy whitespace — understated",
    image: "/images/cover-letters/cl-hairline.jpg",
  },
  {
    id: "broadsheet",
    name: "Broadsheet",
    tag: "B&W",

    description: "Full-width black masthead — press authority",
    image: "/images/cover-letters/cl-broadsheet.jpg",
  },
  {
    id: "margin",
    name: "Margin",
    tag: "B&W",
    description: "Left margin line, indented body — academic notebook",
    image: "/images/cover-letters/cl-margin.jpg",
  },
  {
    id: "overture",
    name: "Overture",
    tag: "Simple",
    description: "Name only large, no color — zen blank-slate minimal",
    image: "/images/cover-letters/cl-overture.jpg",
  },
  {
    id: "ruled",
    name: "Ruled",
    tag: "Simple",
    description: "Bottom-border name only — ultra-minimal clean",
    image: "/images/cover-letters/cl-ruled.jpg",
  },

  {
    id: "canvas",
    name: "Canvas",
    tag: "Modern",
    description: "Full-bleed top color band, large name — art director",
    image: "/images/cover-letters/cl-canvas.jpg",
  },
  {
    id: "nocturne",
    name: "Nocturne",
    tag: "Executive",

    description: "All-dark page, white text — bold night-mode luxury",
    image: "/images/cover-letters/cl-nocturne.jpg",
  },
  {
    id: "prism",
    name: "Prism",
    tag: "Tech",
    description: "Left colored stripe + light body — crisp tech feel",
    image: "/images/cover-letters/cl-prism.jpg",
  },
  {
    id: "marquee",
    name: "Marquee",
    tag: "Creative",

    description: "Huge outlined name, light fill — bold editorial poster",
    image: "/images/cover-letters/cl-marquee.jpg",
  },
  {
    id: "eclipse",
    name: "Eclipse",
    tag: "Corporate",
    description: "Half-circle color block — geometric corporate",
    image: "/images/cover-letters/cl-eclipse.jpg",
  },
  {
    id: "census",
    name: "Census",
    tag: "B&W",
    description: "Data-form style, field labels — official structured",
    image: "/images/cover-letters/cl-census.jpg",
  },
  {
    id: "linotype",
    name: "Linotype",
    tag: "B&W",

    description: "Press-slug row of type — bold typographic B&W",
    image: "/images/cover-letters/cl-linotype.jpg",
  },
  {
    id: "scaffold",
    name: "Scaffold",
    tag: "Architecture",
    description: "Thin grid lines, numbering — engineering precision",
    image: "/images/cover-letters/cl-scaffold.jpg",
  },
  {
    id: "velvet",
    name: "Velvet",
    tag: "Luxury",

    description: "Deep plum + gold rule — premium executive warmth",
    image: "/images/cover-letters/cl-velvet.jpg",
  },
  {
    id: "origami",
    name: "Origami",
    tag: "Creative",
    description: "Diagonal fold corner accent — playful yet professional",
    image: "/images/cover-letters/cl-origami.jpg",
  },
];


// ============================================================
// 4. buildHTML() — Creates the letter HTML for a given template
// ============================================================
// How it works:
//   - Takes a template id (e.g. "chancellor") and the letter data
//   - Builds a complete HTML document string
//   - That string is written into an <iframe> for the live preview
//   - The same string is sent to the backend to generate a PDF
//
// Each template is just a different HTML layout with inline CSS.
// We use JavaScript string template literals (`...`) to inject data.
// ============================================================


function buildHTML(id: string, d: CLData): string {
  // --- look up the chosen font ---
  const fontDef =
    FONT_FAMILIES.find((f) => f.id === d.fontFamily) || FONT_FAMILIES[0];
  const fontStack = `'${d.fontFamily}',${fontDef.style}`;

  // --- shorthand variables so the HTML strings below stay readable ---
  const c = d.accentColor || "#1a1a2e"; // accent color
  const sig = d.personal.signature || "Sincerely"; // closing word
  const nm = d.personal.fullName || "Your Name"; // applicant's name
  const ttl = d.personal.title || "Professional"; // job title
  const mgr = d.company.hiringManager || "Hiring Manager"; // recipient name

  // --- compose the full city / state / country string ---
  const loc = [d.company.city, d.company.state, d.company.country]
    .filter(Boolean)
    .join(", ");

  // --- format the date nicely (e.g. "May 17, 2026") ---
  const dt = d.letterDate
    ? new Date(d.letterDate + "T12:00:00").toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  // --- one line of contact info separated by · ---
  const contactLine = [
    d.personal.email,
    d.personal.phone,
    d.personal.location,
    d.personal.linkedin,
    d.personal.website,
    d.personal.github,
  ]
    .filter(Boolean)
    .join("  ·  ");

  // --- the letter body (rich HTML from the editor) ---
  const bodyContent = d.letterContent || "<p>Your letter content will appear here.</p>";

  // --- optional "referred by" note ---
  const referralNote = d.company.referral
    ? `<p style="font-size:12px;color:#6b7280;margin-bottom:12px">Referred by: <strong>${d.company.referral}</strong></p>`
    : "";

  // --- the recipient's address block ---
  const addrBlock = `<div style="margin-bottom:20px;font-size:13px;line-height:2;color:#374151">
    <strong>${mgr}${d.company.hiringManagerTitle ? `, ${d.company.hiringManagerTitle}` : ""}</strong><br>
    ${d.company.name}${loc ? `<br>${loc}` : ""}${d.company.department ? `<br>Department: ${d.company.department}` : ""}
  </div>`;

  // --- greeting line ---
  const greet = `<p style="font-size:15px;font-weight:600;margin-bottom:20px;color:#111">Dear ${mgr},</p>`;

  // --- closing signature block ---
  const closing = `<div style="margin-top:32px;font-size:13.5px;line-height:2">
    ${sig},<br>
    <strong style="font-size:16px;letter-spacing:-0.3px">${nm}</strong>
    ${d.personal.title ? `<br><span style="font-size:12px;color:#6b7280">${d.personal.title}</span>` : ""}
    ${d.personal.email ? `<br><a href="mailto:${d.personal.email}" style="font-size:12px;color:${c};text-decoration:none">${d.personal.email}</a>` : ""}
    ${d.personal.phone ? `<br><span style="font-size:12px;color:#9ca3af">${d.personal.phone}</span>` : ""}
  </div>`;

  // --- helpers ---
  // baseCSS builds the base CSS string (font import + reset + extra CSS)
  const baseCSS = (extra = "") =>
    `@import url('${fontDef.url}');*{margin:0;padding:0;box-sizing:border-box}html,body{background:#fff}body{font-family:${fontStack};color:#374151;-webkit-print-color-adjust:exact;print-color-adjust:exact;font-size:13.5px}p{line-height:1.9}${extra}`;

  // wrap() puts CSS and body HTML into a full HTML document
  const wrap = (css: string, body: string) =>
    `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${css}</style></head><body>${body}</body></html>`;

  
  // ═══════════════════════════════════════════════════════════
  // TEMPLATE BRANCHES — one if-block per template
  // Each returns a complete HTML string
  // ═══════════════════════════════════════════════════════════

  // ── 1. CHANCELLOR — dark full-width header, gold gradient rule ──
  if (id === "chancellor")
    return wrap(
      baseCSS(
        `.pg{max-width:860px;margin:0 auto;background:#fff}.hdr{background:${c};padding:52px 64px 44px;color:white}.pre{font-size:9px;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:10px}.nm{font-size:46px;font-weight:700;letter-spacing:-1.5px;color:#fff;margin-bottom:6px}.ttl{font-size:12px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.65)}.gold{height:2px;background:linear-gradient(90deg,#c9a84c,#f5d78e,#c9a84c);margin:24px 0}.contact{font-size:11.5px;color:rgba(255,255,255,.7);letter-spacing:.5px}.body{padding:52px 64px}`,
      ),
      `<div class="pg"><div class="hdr"><div class="nm">${nm}</div><div class="ttl">${ttl}</div><div class="gold"></div><div class="contact">${contactLine}</div></div><div class="body"><p style="font-size:11.5px;color:#9ca3af;margin-bottom:24px">${dt}</p>${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div></div>`,
    );

  // ── 2. NEWSPRINT — newspaper masthead with thick top/bottom rules ──
  if (id === "newsprint")
    return wrap(
      baseCSS(
        `.pg{max-width:860px;margin:0 auto;padding:48px 60px;background:#fff}.mast{text-align:center;border-top:4px solid #111;border-bottom:4px solid #111;padding:16px 0;margin-bottom:6px}.nm{font-size:52px;font-weight:900;letter-spacing:-2px;color:#111;line-height:1}.rule{display:flex;align-items:center;gap:12px;margin:10px 0}.line{flex:1;height:1px;background:#111}.tag{font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#555;white-space:nowrap}.meta{display:flex;justify-content:space-between;font-size:10.5px;color:#555;border-bottom:1px solid #ddd;padding-bottom:8px;margin-bottom:32px}`,
      ),
      `<div class="pg"><div class="mast"><div class="nm">${nm}</div><div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#555;margin-top:4px">${ttl}</div></div><div class="rule"></div><div class="meta"><span>${dt}</span><span>${contactLine}</span></div>${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div>`,
    );

  // ── 3. ATELIER — wide colored sidebar, large name ──
  if (id === "atelier")
    return wrap(
      baseCSS(
        `.pg{max-width:900px;margin:0 auto;display:flex;min-height:1120px;background:#fff}.sidebar{width:220px;background:${c};padding:48px 28px;display:flex;flex-direction:column;flex-shrink:0}.si-nm{font-size:28px;font-weight:700;color:#fff;line-height:1.15;margin-bottom:8px}.si-ttl{font-size:9px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:32px;padding-bottom:24px;border-bottom:1px solid rgba(255,255,255,.15)}.si-lbl{font-size:8px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:4px;margin-top:20px}.si-val{font-size:10.5px;color:rgba(255,255,255,.8);line-height:1.7;word-break:break-all}.si-val a{color:rgba(255,255,255,.8);text-decoration:none}.main{flex:1;padding:52px 56px}`,
      ),
      `<div class="pg"><div class="sidebar"><div class="si-nm">${nm}</div><div class="si-ttl">${ttl}</div>${d.personal.email ? `<div class="si-lbl">Email</div><div class="si-val"><a href="mailto:${d.personal.email}">${d.personal.email}</a></div>` : ""}${d.personal.phone ? `<div class="si-lbl">Phone</div><div class="si-val">${d.personal.phone}</div>` : ""}${d.personal.location ? `<div class="si-lbl">Location</div><div class="si-val">${d.personal.location}</div>` : ""}${d.personal.linkedin ? `<div class="si-lbl">LinkedIn</div><div class="si-val"><a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}">${d.personal.linkedin}</a></div>` : ""}</div><div class="main"><p style="font-size:11px;color:#9ca3af;margin-bottom:28px">${dt}</p>${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div></div>`,
    );

  // ── 4. PROTOCOL — monospace/code aesthetic header ──
  if (id === "protocol")
    return wrap(
      baseCSS(
        `@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');.pg{max-width:860px;margin:0 auto;background:#0d1117;color:#c9d1d9}.hdr{padding:44px 56px;border-bottom:1px solid #30363d;font-family:'JetBrains Mono',monospace}.prompt{font-size:10px;color:#58a6ff;margin-bottom:8px}.nm{font-size:36px;font-weight:700;color:#f0f6fc;letter-spacing:-1px}.ttl{font-size:12px;color:#8b949e;margin-top:4px;margin-bottom:20px}.meta{display:flex;flex-wrap:wrap;gap:6px}.chip{font-size:10px;color:#58a6ff;background:#161b22;border:1px solid #30363d;padding:3px 10px;border-radius:4px;font-family:'JetBrains Mono',monospace}.body{padding:44px 56px;background:#fff;color:#24292f}`,
      ),
      `<div class="pg"><div class="hdr"><div class="nm">${nm}</div><div class="ttl">${ttl}</div><div class="meta">${[
        d.personal.email,
        d.personal.phone,
        d.personal.location,
      ]
        .filter(Boolean)
        .map((v) => `<span class="chip">${v}</span>`)
        .join(
          "",
        )}</div></div><div class="body"><p style="font-size:11px;color:#6b7280;margin-bottom:24px">${dt}</p>${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div></div>`,
    );

  // ── 5. LEDGER — double accounting rules, info row table ──
  if (id === "ledger")
    return wrap(
      baseCSS(
        `.pg{max-width:840px;margin:0 auto;padding:56px 72px;background:#fff}.r1{height:3px;background:${c}}.r2{height:1px;background:${c};margin-top:3px;margin-bottom:28px}.nm{font-size:38px;font-weight:700;color:${c};letter-spacing:-1px;text-transform:uppercase;margin-bottom:4px}.ttl{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#6b7280;margin-bottom:16px}.info-row{display:flex;flex-wrap:wrap;gap:0;margin-bottom:24px;border:1px solid #e5e7eb}.info-cell{flex:1;min-width:140px;padding:10px 16px;border-right:1px solid #e5e7eb;font-size:11px;color:#374151;line-height:1.8}.info-cell:last-child{border-right:none}.info-cell strong{display:block;font-size:9px;text-transform:uppercase;letter-spacing:1.5px;color:#9ca3af;margin-bottom:2px}.r3{height:1px;background:${c};margin:24px 0}.r4{height:3px;background:${c};margin-top:3px}`,
      ),
      `<div class="pg"><div class="r1"></div><div class="r2"></div><div class="nm">${nm}</div><div class="ttl">${ttl}</div><div class="info-row">${[
        ["Date", dt],
        ["Email", d.personal.email || "—"],
        ["Phone", d.personal.phone || "—"],
        ["Location", d.personal.location || "—"],
      ]
        .map(
          ([l, v]) => `<div class="info-cell"><strong>${l}</strong>${v}</div>`,
        )
        .join(
          "",
        )}</div>${addrBlock}${referralNote}${greet}${bodyContent}${closing}<div class="r3"></div><div class="r4"></div></div>`,
    );

  // ── 6. PALISADE — centered serif with ornamental divider ──
  if (id === "palisade")
    return wrap(
      baseCSS(
        `.pg{max-width:760px;margin:0 auto;padding:64px 80px;background:#faf9f7}.top{text-align:center;margin-bottom:36px}.nm{font-size:42px;font-weight:700;color:#1c1917;letter-spacing:-.5px;line-height:1.1}.ttl{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#78716c;margin-top:8px}.ornament{display:flex;align-items:center;gap:12px;margin:20px 0}.orn-line{flex:1;height:.5px;background:#d6d3d1}.orn-dot{font-size:18px;color:#a8a29e}.contact{text-align:center;font-size:12px;color:#78716c;letter-spacing:.5px;margin-bottom:8px}`,
      ),
      `<div class="pg"><div class="top"><div class="nm">${nm}</div><div class="ttl">${ttl}</div><div class="ornament"><div class="orn-line"></div><div class="orn-dot">✦</div><div class="orn-line"></div></div><div class="contact">${contactLine}</div></div><p style="font-size:12px;color:#9ca3af;margin-bottom:28px">${dt}</p>${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div>`,
    );

  // ── 7. SUNDIAL — subtle radial arc in top-right corner ──
  if (id === "sundial")
    return wrap(
      baseCSS(
        `.pg{max-width:860px;margin:0 auto;background:#fff;position:relative;overflow:hidden}.arc{position:absolute;top:-80px;right:-80px;width:280px;height:280px;border-radius:50%;border:40px solid ${c}10;pointer-events:none}.arc2{position:absolute;top:-40px;right:-40px;width:180px;height:180px;border-radius:50%;border:20px solid ${c}18;pointer-events:none}.hdr{padding:52px 64px 36px;border-bottom:2px solid ${c}15;position:relative}.nm{font-size:42px;font-weight:700;color:#111;letter-spacing:-1.5px;margin-bottom:6px}.ttl{font-size:13px;color:${c};font-weight:600;margin-bottom:20px}.ctrow{display:flex;flex-wrap:wrap;gap:4px 20px}.cv{font-size:12px;color:#6b7280}.body{padding:52px 64px}`,
      ),
      `<div class="pg"><div class="arc"></div><div class="arc2"></div><div class="hdr"><div class="nm">${nm}</div><div class="ttl">${ttl}</div><div class="ctrow">${[
        d.personal.email,
        d.personal.phone,
        d.personal.location,
      ]
        .filter(Boolean)
        .map((v) => `<span class="cv">${v}</span>`)
        .join(
          "",
        )}</div></div><div class="body"><p style="font-size:11.5px;color:#9ca3af;margin-bottom:28px">${dt}</p>${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div></div>`,
    );

  // ── 8. MERIDIEM — split header: name left, role badge right ──
  if (id === "meridiem")
    return wrap(
      baseCSS(
        `.pg{max-width:880px;margin:0 auto;background:#f8fafc}.hdr{padding:0 52px;background:${c};display:grid;grid-template-columns:1fr auto;align-items:center;gap:24px;min-height:120px}.hl .nm{font-size:34px;font-weight:700;color:#fff;letter-spacing:-1.5px}.hl .ttl{font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,.55);margin-top:6px}.badge{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);border-radius:12px;padding:16px 22px;text-align:right}.badge-l{font-size:8.5px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:4px}.badge-v{font-size:13px;font-weight:700;color:#fff;line-height:1.4}.stripe{height:4px;background:rgba(255,255,255,.25)}.ctbar{background:${c}dd;padding:10px 52px;display:flex;flex-wrap:wrap;gap:0 28px}.cv{font-size:11px;color:rgba(255,255,255,.6);padding:6px 0}.body{padding:44px 52px;background:#fff}`,
      ),
      `<div class="pg"><div class="hdr"><div class="hl"><div class="nm">${nm}</div><div class="ttl">${ttl}</div></div>${d.company.name ? `<div class="badge"><div class="badge-l">Applying To</div><div class="badge-v">${d.company.jobTitle || "Open Role"}<br><span style="font-size:11px;font-weight:400;opacity:.75">${d.company.name}</span></div></div>` : ""}</div><div class="stripe"></div><div class="ctbar">${[
        d.personal.email,
        d.personal.phone,
        d.personal.location,
        d.personal.linkedin,
      ]
        .filter(Boolean)
        .map((v) => `<span class="cv">${v}</span>`)
        .join(
          "",
        )}</div><div class="body"><p style="font-size:11.5px;color:#9ca3af;margin-bottom:28px">${dt}</p>${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div></div>`,
    );

  // ── 9. FOLIO — rounded card with geometric shapes in header ──
  if (id === "folio")
    return wrap(
      baseCSS(
        `.pg{max-width:820px;margin:0 auto;padding:16px;background:#f1f5f9}.outer{background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)}.inner-hdr{background:${c};padding:44px 52px;position:relative;overflow:hidden}.geo{position:absolute;right:-30px;bottom:-30px;width:160px;height:160px;border-radius:50%;background:rgba(255,255,255,.06)}.geo2{position:absolute;right:20px;bottom:20px;width:80px;height:80px;border-radius:50%;background:rgba(255,255,255,.06)}.nm{font-size:40px;font-weight:700;color:#fff;letter-spacing:-1.5px;position:relative}.ttl{font-size:12px;color:rgba(255,255,255,.6);margin-top:6px;margin-bottom:20px;letter-spacing:1px;position:relative}.chips{display:flex;flex-wrap:wrap;gap:6px;position:relative}.chip{font-size:11px;color:rgba(255,255,255,.8);background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);padding:4px 12px;border-radius:20px}.body{padding:44px 52px}`,
      ),
      `<div class="pg"><div class="outer"><div class="inner-hdr"><div class="geo"></div><div class="geo2"></div><div class="nm">${nm}</div><div class="ttl">${ttl}</div><div class="chips">${[
        d.personal.email,
        d.personal.phone,
        d.personal.location,
      ]
        .filter(Boolean)
        .map((v) => `<span class="chip">${v}</span>`)
        .join(
          "",
        )}</div></div><div class="body"><p style="font-size:11.5px;color:#9ca3af;margin-bottom:28px">${dt}</p>${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div></div></div>`,
    );

  // ── 10. DISPATCH — huge uppercase name, pill role tag ──
  if (id === "dispatch")
    return wrap(
      baseCSS(
        `.pg{max-width:820px;margin:0 auto;padding:60px 72px;background:#fff}.nm{font-size:64px;font-weight:900;color:#111;letter-spacing:-4px;text-transform:uppercase;line-height:.9;margin-bottom:14px}.div{display:flex;gap:16px;align-items:center;margin-bottom:20px}.ttl-pill{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#fff;background:${c};padding:5px 14px;border-radius:4px}.cv-row{font-size:11.5px;color:#6b7280;display:flex;flex-wrap:wrap;gap:4px 16px;margin-bottom:40px}.hr{height:1.5px;background:#111;margin-bottom:32px}`,
      ),
      `<div class="pg"><div class="nm">${nm}</div><div class="div"><div class="ttl-pill">${ttl}</div></div><div class="cv-row">${[
        d.personal.email,
        d.personal.phone,
        d.personal.location,
        d.personal.linkedin,
      ]
        .filter(Boolean)
        .map((v) => `<span>${v}</span>`)
        .join(
          "",
        )}</div><div class="hr"></div><p style="font-size:11.5px;color:#9ca3af;margin-bottom:24px">${dt}</p>${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div>`,
    );

  // ── 11. VELLUM — ivory background, warm traditional letterhead ──
  if (id === "vellum")
    return wrap(
      baseCSS(
        `.pg{max-width:800px;margin:0 auto;padding:64px 80px;background:#fefce8;border-left:4px solid ${c}66;border-right:4px solid ${c}66}.nm{font-size:38px;font-weight:700;color:#1c1917;letter-spacing:-.5px;margin-bottom:4px}.ttl{font-size:12px;color:#78716c;font-style:italic;margin-bottom:20px}.hr1{height:.5px;background:${c}66;margin-bottom:8px}.hr2{height:2px;background:${c}66;margin-bottom:28px}.cv-row{display:flex;flex-wrap:wrap;gap:4px 20px;margin-bottom:12px;font-size:12px;color:#78716c}`,
      ),
      `<div class="pg"><div class="nm">${nm}</div><div class="ttl">${ttl}</div><div class="hr1"></div><div class="hr2"></div><div class="cv-row">${[
        d.personal.email,
        d.personal.phone,
        d.personal.location,
      ]
        .filter(Boolean)
        .map((v) => `<span>${v}</span>`)
        .join(
          "",
        )}</div><div style="height:.5px;background:${c}33;margin-bottom:32px"></div><p style="font-size:12px;color:#9ca3af;margin-bottom:24px">${dt}</p>${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div>`,
    );

  // ── 12. PAVILION — blueprint dot grid overlay in dark blue header ──
  if (id === "pavilion")
    return wrap(
      baseCSS(
        `.pg{max-width:880px;margin:0 auto;background:#eff6ff}.hdr{padding:48px 56px;background:#1e3a8a;position:relative;overflow:hidden}.grid-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:24px 24px}.nm{position:relative;font-size:42px;font-weight:800;color:#fff;letter-spacing:-1.5px;margin-bottom:6px}.ttl{position:relative;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#93c5fd;margin-bottom:20px}.cv-row{position:relative;display:flex;flex-wrap:wrap;gap:4px 16px;font-size:11px;color:#bfdbfe}.body{padding:44px 56px;background:#fff}`,
      ),
      `<div class="pg"><div class="hdr"><div class="grid-bg"></div><div class="nm">${nm}</div><div class="ttl">${ttl}</div><div class="cv-row">${[
        d.personal.email,
        d.personal.phone,
        d.personal.location,
      ]
        .filter(Boolean)
        .map((v) => `<span>${v}</span>`)
        .join(
          "",
        )}</div></div><div class="body"><p style="font-size:11.5px;color:#9ca3af;margin-bottom:28px">${dt}</p>${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div></div>`,
    );

  // ── 13. REVUE — italic huge name, thin left accent bar ──
  if (id === "revue")
    return wrap(
      baseCSS(
        `.pg{max-width:860px;margin:0 auto;padding:0;background:#fff}.hdr{display:flex;min-height:160px}.hdr-accent{width:12px;background:${c};flex-shrink:0}.hdr-body{padding:44px 56px;flex:1;border-bottom:1px solid #f3f4f6}.nm{font-size:52px;font-weight:900;letter-spacing:-3px;color:#111;line-height:.9;font-style:italic}.meta{display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px;margin-top:12px}.ttl{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${c};font-style:normal}.cv-row{font-size:11.5px;color:#6b7280;display:flex;flex-wrap:wrap;gap:4px 16px}.body{padding:44px 56px}`,
      ),
      `<div class="pg"><div class="hdr"><div class="hdr-accent"></div><div class="hdr-body"><div class="nm">${nm}</div><div class="meta"><div class="ttl">${ttl}</div><div class="cv-row">${[
        d.personal.email,
        d.personal.phone,
        d.personal.location,
      ]
        .filter(Boolean)
        .map((v) => `<span>${v}</span>`)
        .join(
          "",
        )}</div></div></div></div><div class="body"><p style="font-size:11.5px;color:#9ca3af;margin-bottom:28px">${dt}</p>${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div></div>`,
    );

  // ── 14. HELIX — DNA-strand repeating gradient left strip ──
  if (id === "helix")
    return wrap(
      baseCSS(
        `.pg{max-width:900px;margin:0 auto;display:flex;min-height:1120px;background:#fff}.strand{width:8px;flex-shrink:0;background:repeating-linear-gradient(to bottom,${c} 0px,${c} 20px,${c}33 20px,${c}33 30px)}.side{width:200px;background:${c}06;padding:44px 24px;border-right:1px solid ${c}15;flex-shrink:0}.si-nm{font-size:22px;font-weight:700;color:${c};line-height:1.2;margin-bottom:6px}.si-ttl{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#9ca3af;margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid ${c}15}.si-lbl{font-size:8px;letter-spacing:1.5px;text-transform:uppercase;color:${c}88;margin-top:16px;margin-bottom:3px}.si-val{font-size:11px;color:#374151;line-height:1.7}.si-val a{color:${c};text-decoration:none}.main{flex:1;padding:48px 48px}`,
      ),
      `<div class="pg"><div class="strand"></div><div class="side"><div class="si-nm">${nm}</div><div class="si-ttl">${ttl}</div>${d.personal.email ? `<div class="si-lbl">Email</div><div class="si-val"><a href="mailto:${d.personal.email}">${d.personal.email}</a></div>` : ""}${d.personal.phone ? `<div class="si-lbl">Phone</div><div class="si-val">${d.personal.phone}</div>` : ""}${d.personal.location ? `<div class="si-lbl">Location</div><div class="si-val">${d.personal.location}</div>` : ""}${d.personal.linkedin ? `<div class="si-lbl">LinkedIn</div><div class="si-val"><a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}">${d.personal.linkedin}</a></div>` : ""}</div><div class="main"><p style="font-size:11.5px;color:#9ca3af;margin-bottom:28px">${dt}</p>${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div></div>`,
    );

  // ── 15. EMBASSY — centered seal-style header with ornamental rules ──
  if (id === "embassy")
    return wrap(
      baseCSS(
        `.pg{max-width:800px;margin:0 auto;padding:56px 72px;background:#fff}.seal-row{display:flex;flex-direction:column;align-items:center;margin-bottom:32px}.seal{width:64px;height:64px;border-radius:50%;border:3px double ${c};display:flex;align-items:center;justify-content:center;font-size:22px;color:${c};margin-bottom:12px}.nm{text-align:center;font-size:40px;font-weight:700;letter-spacing:-1px;color:#111;margin-bottom:6px}.ttl{text-align:center;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#6b7280}.rule-row{display:flex;align-items:center;gap:8px;margin:20px 0}.rule-line{flex:1;height:1px;background:${c}55}.rule-diamond{font-size:10px;color:${c}}.cv-row{text-align:center;font-size:12px;color:#6b7280;margin-bottom:32px;display:flex;flex-wrap:wrap;justify-content:center;gap:4px 16px}`,
      ),
      `<div class="pg"><div class="seal-row"><div class="seal">✦</div><div class="nm">${nm}</div><div class="ttl">${ttl}</div></div><div class="rule-row"><div class="rule-line"></div><div class="rule-diamond">◆</div><div class="rule-line"></div></div><div class="cv-row">${[
        d.personal.email,
        d.personal.phone,
        d.personal.location,
      ]
        .filter(Boolean)
        .map((v) => `<span>${v}</span>`)
        .join(
          "",
        )}</div><p style="font-size:12px;color:#9ca3af;margin-bottom:24px">${dt}</p>${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div>`,
    );

  // ── 16. KODEX — dark header with monospace data table row ──
  if (id === "kodex")
    return wrap(
      baseCSS(
        `@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');.pg{max-width:880px;margin:0 auto;background:#fff}.hdr{background:${c};padding:36px 52px}.nm{font-size:38px;font-weight:800;color:#fff;letter-spacing:-1.5px;margin-bottom:6px}.ttl{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.55);margin-bottom:20px}.table{width:100%;border-collapse:collapse;background:rgba(255,255,255,.08)}.table td{padding:8px 14px;font-size:11px;color:rgba(255,255,255,.8);border:1px solid rgba(255,255,255,.1);font-family:'JetBrains Mono',monospace}.table .lbl{color:rgba(255,255,255,.45);font-size:9px;text-transform:uppercase;letter-spacing:1px}.body{padding:44px 52px}`,
      ),
      `<div class="pg"><div class="hdr"><div class="nm">${nm}</div><div class="ttl">${ttl}</div><table class="table"><tr>${[
        ["EMAIL", d.personal.email || "—"],
        ["PHONE", d.personal.phone || "—"],
        ["LOCATION", d.personal.location || "—"],
        ["DATE", dt],
      ]
        .map(([l, v]) => `<td><div class="lbl">${l}</div>${v}</td>`)
        .join(
          "",
        )}</tr></table></div><div class="body"><p style="font-size:11.5px;color:#9ca3af;margin-bottom:28px"></p>${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div></div>`,
    );

  // ── 17. BRUSHWORK — gradient "brushstroke" top & bottom bands ──
  if (id === "brushwork")
    return wrap(
      baseCSS(
        `.pg{max-width:840px;margin:0 auto;padding:0;background:#fff}.brush{height:12px;background:linear-gradient(90deg,${c}cc,${c}44,${c}88,${c}66);border-radius:0 0 50% 50%/0 0 8px 8px}.hdr{padding:44px 60px 36px;border-bottom:1px dashed ${c}33}.nm{font-size:44px;font-weight:700;color:#1c1917;letter-spacing:-1.5px;margin-bottom:6px}.ttl{font-size:12px;color:${c};font-style:italic;margin-bottom:18px}.cv-row{display:flex;flex-wrap:wrap;gap:4px 18px;font-size:12px;color:#78716c}.body{padding:44px 60px}.foot-brush{height:8px;background:linear-gradient(90deg,${c}44,${c}88,${c}22);border-radius:50% 50% 0 0/8px 8px 0 0}`,
      ),
      `<div class="pg"><div class="brush"></div><div class="hdr"><div class="nm">${nm}</div><div class="ttl">${ttl}</div><div class="cv-row">${[
        d.personal.email,
        d.personal.phone,
        d.personal.location,
      ]
        .filter(Boolean)
        .map((v) => `<span>${v}</span>`)
        .join(
          "",
        )}</div></div><div class="body"><p style="font-size:11.5px;color:#9ca3af;margin-bottom:28px">${dt}</p>${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div><div class="foot-brush"></div></div>`,
    );

  // ── 18. TERRACE — layered color band staircase header ──
  if (id === "terrace")
    return wrap(
      baseCSS(
        `.pg{max-width:880px;margin:0 auto;background:#fff}.t1{height:8px;background:${c}}.t2{background:${c}dd;padding:36px 52px}.t3{background:${c}aa;padding:12px 52px}.nm{font-size:40px;font-weight:700;color:#fff;letter-spacing:-1.5px;margin-bottom:4px}.ttl{font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,.6)}.cv-row{display:flex;flex-wrap:wrap;gap:4px 16px;font-size:11px;color:rgba(255,255,255,.7)}.body{padding:44px 52px}`,
      ),
      `<div class="pg"><div class="t1"></div><div class="t2"><div class="nm">${nm}</div><div class="ttl">${ttl}</div></div><div class="t3"><div class="cv-row">${[
        d.personal.email,
        d.personal.phone,
        d.personal.location,
        d.personal.linkedin,
      ]
        .filter(Boolean)
        .map((v) => `<span>${v}</span>`)
        .join(
          "",
        )}</div></div><div class="body"><p style="font-size:11.5px;color:#9ca3af;margin-bottom:28px">${dt}</p>${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div></div>`,
    );

  // ── 19. ALPINE — diagonal polygon slash shapes in header ──
  if (id === "alpine")
    return wrap(
      baseCSS(
        `.pg{max-width:880px;margin:0 auto;background:#fff;overflow:hidden}.hdr{position:relative;background:${c};padding:52px 60px 48px;overflow:hidden}.slash{position:absolute;right:0;top:0;bottom:0;width:45%;background:rgba(255,255,255,.07);clip-path:polygon(30% 0,100% 0,100% 100%,0 100%)}.slash2{position:absolute;right:0;top:0;bottom:0;width:30%;background:rgba(255,255,255,.05);clip-path:polygon(40% 0,100% 0,100% 100%,0 100%)}.nm{position:relative;font-size:46px;font-weight:800;color:#fff;letter-spacing:-2px;line-height:.95;margin-bottom:8px}.ttl{position:relative;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.55);margin-bottom:20px}.cv-row{position:relative;display:flex;flex-wrap:wrap;gap:6px}.cv-chip{font-size:11px;color:rgba(255,255,255,.8);background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);padding:4px 12px;border-radius:3px}.body{padding:48px 60px}`,
      ),
      `<div class="pg"><div class="hdr"><div class="slash"></div><div class="slash2"></div><div class="nm">${nm}</div><div class="ttl">${ttl}</div><div class="cv-row">${[
        d.personal.email,
        d.personal.phone,
        d.personal.location,
      ]
        .filter(Boolean)
        .map((v) => `<span class="cv-chip">${v}</span>`)
        .join(
          "",
        )}</div></div><div class="body"><p style="font-size:11.5px;color:#9ca3af;margin-bottom:28px">${dt}</p>${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div></div>`,
    );

  // ── 20. SIGNAL — narrow colored broadcast bar at top ──
  if (id === "signal")
    return wrap(
      baseCSS(
        `.pg{max-width:880px;margin:0 auto;background:#fff}.broadcast{background:${c};padding:10px 52px;display:flex;align-items:center;gap:12px}.dot{width:8px;height:8px;border-radius:50%;background:#fff;flex-shrink:0}.broadcast-txt{font-size:9.5px;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,.8)}.hdr{padding:40px 52px;border-bottom:2px solid #111}.nm{font-size:48px;font-weight:900;color:#111;letter-spacing:-3px;text-transform:uppercase;line-height:.9;margin-bottom:10px}.bottom-row{display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:12px}.ttl{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${c};font-weight:700}.cv-row{font-size:11.5px;color:#6b7280;display:flex;flex-wrap:wrap;gap:4px 14px}.body{padding:44px 52px}`,
      ),
      `<div class="pg"><div class="broadcast"><div class="dot"></div><div class="broadcast-txt">Cover Letter · ${dt}</div></div><div class="hdr"><div class="nm">${nm}</div><div class="bottom-row"><div class="ttl">${ttl}</div><div class="cv-row">${[
        d.personal.email,
        d.personal.phone,
        d.personal.location,
      ]
        .filter(Boolean)
        .map((v) => `<span>${v}</span>`)
        .join(
          "",
        )}</div></div></div><div class="body">${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div></div>`,
    );

  // ══════════════════════════════════════════════════
  // B&W TEMPLATES (21–30)
  // ══════════════════════════════════════════════════

  // ── 21. MONO — pure B&W, single hairline rule ──
  if (id === "mono")
    return wrap(
      baseCSS(
        `.pg{max-width:800px;margin:0 auto;padding:72px 88px;background:#fff}.nm{font-size:44px;font-weight:800;color:#000;letter-spacing:-2px;margin-bottom:2px}.ttl{font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#000;margin-bottom:20px}.rule{height:1px;background:#000;margin-bottom:20px}.cv-row{display:flex;flex-wrap:wrap;gap:4px 20px;font-size:11.5px;color:#333;margin-bottom:40px}`,
      ),
      `<div class="pg"><div class="nm">${nm}</div><div class="ttl">${ttl}</div><div class="rule"></div><div class="cv-row">${[
        d.personal.email,
        d.personal.phone,
        d.personal.location,
        d.personal.linkedin,
      ]
        .filter(Boolean)
        .map((v) => `<span>${v}</span>`)
        .join(
          " &nbsp;·&nbsp; ",
        )}</div><p style="font-size:11px;color:#888;margin-bottom:28px">${dt}</p>${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div>`,
    );

  // ── 22. TYPEWRITER — Courier font, full black top bar ──
  if (id === "typewriter")
    return wrap(
      baseCSS(
        `@import url('https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap');.pg{max-width:820px;margin:0 auto;background:#fff;font-family:'Courier Prime','Courier New',monospace}.hdr{background:#111;padding:32px 56px}.nm{font-size:32px;font-weight:700;color:#fff;letter-spacing:2px;text-transform:uppercase}.ttl{font-size:10px;letter-spacing:4px;text-transform:uppercase;color:#aaa;margin-top:6px}.sub{background:#f5f5f0;padding:12px 56px;border-bottom:2px solid #111;display:flex;flex-wrap:wrap;gap:4px 20px;font-size:11px;color:#333}.body{padding:48px 56px;font-family:'Courier Prime','Courier New',monospace;font-size:13.5px;line-height:1.9;color:#111}`,
      ),
      `<div class="pg"><div class="hdr"><div class="nm">${nm}</div><div class="ttl">${ttl}</div></div><div class="sub">${[
        dt,
        d.personal.email,
        d.personal.phone,
        d.personal.location,
      ]
        .filter(Boolean)
        .map((v) => `<span>${v}</span>`)
        .join(
          " &nbsp;|&nbsp; ",
        )}</div><div class="body">${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div></div>`,
    );

  // ── 23. SPECIMEN — huge first-letter drop cap, B&W editorial ──
  if (id === "specimen")
    return wrap(
      baseCSS(
        `.pg{max-width:820px;margin:0 auto;padding:64px 72px;background:#fff}.top-row{display:flex;align-items:flex-end;gap:20px;margin-bottom:0;padding-bottom:16px;border-bottom:3px solid #000}.initial{font-size:96px;font-weight:900;color:#000;line-height:1;margin-bottom:-12px;letter-spacing:-6px;flex-shrink:0}.name-col .nm{font-size:22px;font-weight:800;color:#000;letter-spacing:-0.5px;text-transform:uppercase}.name-col .ttl{font-size:9px;letter-spacing:3.5px;text-transform:uppercase;color:#555;margin-top:4px;margin-bottom:10px}.cv-row{display:flex;flex-wrap:wrap;gap:3px 14px;font-size:11px;color:#333}.r2{height:1px;background:#ddd;margin-top:16px;margin-bottom:32px}`,
      ),
      `<div class="pg"><div class="top-row"><div class="initial">${nm.charAt(0) || "A"}</div><div class="name-col"><div class="nm">${nm}</div><div class="ttl">${ttl}</div><div class="cv-row">${[
        d.personal.email,
        d.personal.phone,
        d.personal.location,
      ]
        .filter(Boolean)
        .map((v) => `<span>${v}</span>`)
        .join(
          " · ",
        )}</div></div></div><div class="r2"></div><p style="font-size:11px;color:#888;margin-bottom:24px">${dt}</p>${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div>`,
    );

  // ── 24. GRID — ruled-paper horizontal lines behind content ──
  if (id === "grid")
    return wrap(
      baseCSS(
        `.pg{max-width:840px;margin:0 auto;padding:64px 72px;background:#fff;background-image:repeating-linear-gradient(to bottom,transparent,transparent 27px,#e8e8e8 27px,#e8e8e8 28px);background-size:100% 28px;background-position:0 64px}.nm{font-size:42px;font-weight:800;color:#000;letter-spacing:-1.5px;margin-bottom:0;position:relative;z-index:1}.ttl{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#444;margin-bottom:16px;position:relative;z-index:1}.cv-row{display:flex;flex-wrap:wrap;gap:3px 16px;font-size:11.5px;color:#333;margin-bottom:56px;position:relative;z-index:1}.rule{height:2px;background:#000;margin-bottom:28px;position:relative;z-index:1}`,
      ),
      `<div class="pg"><div class="nm">${nm}</div><div class="ttl">${ttl}</div><div class="cv-row">${[
        d.personal.email,
        d.personal.phone,
        d.personal.location,
      ]
        .filter(Boolean)
        .map((v) => `<span>${v}</span>`)
        .join(
          " · ",
        )}</div><div class="rule"></div><p style="font-size:11px;color:#888;margin-bottom:28px">${dt}</p>${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div>`,
    );

  // ── 25. STENCIL — military stencil caps with thick double border ──
  if (id === "stencil")
    return wrap(
      baseCSS(
        `@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap');.pg{max-width:840px;margin:0 auto;padding:8px;background:#fff}.inner{border:3px solid #000;padding:52px 60px}.nm{font-family:'Black Han Sans','Arial Black',sans-serif;font-size:48px;font-weight:900;color:#000;letter-spacing:4px;text-transform:uppercase;line-height:1;margin-bottom:8px}.ttl{font-size:9px;letter-spacing:6px;text-transform:uppercase;color:#000;border:1px solid #000;display:inline-block;padding:4px 12px;margin-bottom:20px}.dbl{height:3px;background:#000;margin-bottom:3px}.dbl2{height:1px;background:#000;margin-bottom:24px}.cv-row{font-size:11px;color:#222;letter-spacing:1px;margin-bottom:8px;text-transform:uppercase}`,
      ),
      `<div class="pg"><div class="inner"><div class="nm">${nm}</div><div class="ttl">${ttl}</div><div class="dbl"></div><div class="dbl2"></div><div class="cv-row">${[d.personal.email, d.personal.phone, d.personal.location].filter(Boolean).join("  ·  ")}</div><p style="font-size:11px;color:#777;margin:20px 0 24px">${dt}</p>${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div></div>`,
    );

  // ── 26. HAIRLINE — ultra-thin 0.5px rules, airy minimal ──
  if (id === "hairline")
    return wrap(
      baseCSS(
        `.pg{max-width:780px;margin:0 auto;padding:80px 96px;background:#fff}.r0{height:.5px;background:#ccc;margin-bottom:28px}.nm{font-size:38px;font-weight:300;color:#111;letter-spacing:-.5px;margin-bottom:6px}.ttl{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#888;font-weight:400;margin-bottom:20px}.r1{height:.5px;background:#bbb;margin-bottom:14px}.cv-row{display:flex;flex-wrap:wrap;gap:3px 20px;font-size:11px;color:#666;margin-bottom:14px}.r2{height:.5px;background:#bbb;margin-bottom:36px}`,
      ),
      `<div class="pg"><div class="r0"></div><div class="nm">${nm}</div><div class="ttl">${ttl}</div><div class="r1"></div><div class="cv-row">${[
        d.personal.email,
        d.personal.phone,
        d.personal.location,
        d.personal.linkedin,
      ]
        .filter(Boolean)
        .map((v) => `<span>${v}</span>`)
        .join(
          "",
        )}</div><div class="r2"></div><p style="font-size:11px;color:#aaa;margin-bottom:28px">${dt}</p>${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div>`,
    );

  // ── 27. BROADSHEET — full-width reversed black masthead ──
  if (id === "broadsheet")
    return wrap(
      baseCSS(
        `.pg{max-width:880px;margin:0 auto;background:#fff}.mast{background:#000;padding:0 56px;display:flex;align-items:center;justify-content:space-between;gap:24px;min-height:100px;flex-wrap:wrap}.nm{font-size:48px;font-weight:900;color:#fff;letter-spacing:-2px;line-height:1}.right{text-align:right}.ttl{font-size:9px;letter-spacing:4px;text-transform:uppercase;color:#aaa;margin-bottom:6px}.cv-sm{font-size:10.5px;color:#ccc;line-height:1.8}.stripe{height:6px;background:repeating-linear-gradient(90deg,#fff 0,#fff 8px,#000 8px,#000 16px)}.subbar{background:#f0f0f0;padding:10px 56px;border-bottom:1px solid #ddd;font-size:10.5px;color:#444;display:flex;flex-wrap:wrap;gap:4px 20px}.body{padding:48px 56px}`,
      ),
      `<div class="pg"><div class="mast"><div class="nm">${nm}</div><div class="right"><div class="ttl">${ttl}</div><div class="cv-sm">${[
        d.personal.email,
        d.personal.phone,
      ]
        .filter(Boolean)
        .map((v) => `<div>${v}</div>`)
        .join(
          "",
        )}</div></div></div><div class="stripe"></div><div class="subbar">${[
        dt,
        d.personal.location,
        d.personal.linkedin,
      ]
        .filter(Boolean)
        .map((v) => `<span>${v}</span>`)
        .join(
          " &nbsp;·&nbsp; ",
        )}</div><div class="body">${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div></div>`,
    );

  // ── 28. MARGIN — red left margin line, notebook style ──
  if (id === "margin")
    return wrap(
      baseCSS(
        `.pg{max-width:820px;margin:0 auto;padding:56px 64px 56px 100px;background:#fff;border-left:4px solid #cc0000;position:relative}.margin-line{position:absolute;left:80px;top:0;bottom:0;width:1px;background:#f4b8b8;pointer-events:none}.nm{font-size:40px;font-weight:700;color:#000;letter-spacing:-1px;margin-bottom:4px}.ttl{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#333;margin-bottom:16px}.rule{height:1px;background:#000;margin-bottom:14px}.cv-row{display:flex;flex-wrap:wrap;gap:3px 16px;font-size:11.5px;color:#444;margin-bottom:12px}.rule2{height:.5px;background:#ccc;margin-bottom:32px}`,
      ),
      `<div class="pg"><div class="margin-line"></div><div class="nm">${nm}</div><div class="ttl">${ttl}</div><div class="rule"></div><div class="cv-row">${[
        d.personal.email,
        d.personal.phone,
        d.personal.location,
      ]
        .filter(Boolean)
        .map((v) => `<span>${v}</span>`)
        .join(
          " · ",
        )}</div><div class="rule2"></div><p style="font-size:11px;color:#999;margin-bottom:24px">${dt}</p>${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div>`,
    );

  // ── 29. OVERTURE — large light-weight name, zen minimal ──
  if (id === "overture")
    return wrap(
      baseCSS(
        `.pg{max-width:780px;margin:0 auto;padding:80px 96px;background:#fff}.nm{font-size:52px;font-weight:200;color:#111;letter-spacing:-1px;margin-bottom:32px;line-height:1}.divider{display:flex;align-items:center;gap:12px;margin-bottom:32px}.d-line{flex:1;height:1px;background:#e0e0e0}.d-txt{font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#bbb;white-space:nowrap}.cv-row{font-size:12px;color:#888;margin-bottom:40px;line-height:2}`,
      ),
      `<div class="pg"><div class="nm">${nm}</div><div class="divider"><div class="d-line"></div><div class="d-txt">${ttl}</div><div class="d-line"></div></div><div class="cv-row">${[d.personal.email, d.personal.phone, d.personal.location, d.personal.linkedin].filter(Boolean).join("  ·  ")}</div><p style="font-size:11px;color:#bbb;margin-bottom:28px">${dt}</p>${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div>`,
    );

  // ── 30. RULED — name underline only, the cleanest possible ──
  if (id === "ruled")
    return wrap(
      baseCSS(
        `.pg{max-width:760px;margin:0 auto;padding:72px 88px;background:#fff}.nm-wrap{padding-bottom:12px;border-bottom:2px solid #111;margin-bottom:10px}.nm{font-size:40px;font-weight:600;color:#111;letter-spacing:-.5px}.ttl{font-size:10.5px;letter-spacing:2.5px;text-transform:uppercase;color:#666;margin-bottom:18px}.cv-row{display:flex;flex-wrap:wrap;gap:3px 18px;font-size:11.5px;color:#555;margin-bottom:12px}.r-thin{height:.5px;background:#ddd;margin-bottom:36px}`,
      ),
      `<div class="pg"><div class="nm-wrap"><div class="nm">${nm}</div></div><div class="ttl">${ttl}</div><div class="cv-row">${[
        d.personal.email,
        d.personal.phone,
        d.personal.location,
        d.personal.linkedin,
      ]
        .filter(Boolean)
        .map((v) => `<span>${v}</span>`)
        .join(
          " · ",
        )}</div><div class="r-thin"></div><p style="font-size:11px;color:#aaa;margin-bottom:28px">${dt}</p>${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div>`,
    );

  // ══════════════════════════════════════════════════
  // NEW TEMPLATES (31–40)
  // ══════════════════════════════════════════════════

  // ── 31. CANVAS — full-bleed top color band, no slant ──
  if (id === "canvas")
    return wrap(
      baseCSS(
        `.pg{max-width:860px;margin:0 auto;background:#fff}.top{background:${c};padding:56px 64px 40px}.nm{font-size:52px;font-weight:800;color:#fff;letter-spacing:-2px;line-height:1;margin-bottom:10px}.sub{display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:12px}.ttl{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.55)}.cv{font-size:11.5px;color:rgba(255,255,255,.65)}.body{padding:48px 64px}`,
      ),
      `<div class="pg"><div class="top"><div class="nm">${nm}</div><div class="sub"><div class="ttl">${ttl}</div><div class="cv">${[d.personal.email, d.personal.phone].filter(Boolean).join("  ·  ")}</div></div></div><div class="body"><p style="font-size:11px;color:#9ca3af;margin-bottom:28px">${dt} · ${contactLine}</p>${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div></div>`,
    );

  // ── 32. NOCTURNE — all-dark page, white text throughout ──
  if (id === "nocturne")
    return wrap(
      baseCSS(
        `body{background:#0f0f0f;color:#e5e7eb}.pg{max-width:860px;margin:0 auto;padding:0;background:#0f0f0f}.hdr{padding:60px 64px 48px;border-bottom:1px solid #2a2a2a}.nm{font-size:48px;font-weight:700;color:#f9fafb;letter-spacing:-2px;line-height:1;margin-bottom:8px}.ttl{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#6b7280;margin-bottom:20px}.cv-row{display:flex;flex-wrap:wrap;gap:4px 18px;font-size:11.5px;color:#9ca3af}.body{padding:52px 64px;color:#d1d5db}.body p{margin-bottom:14px;line-height:1.9;color:#d1d5db}.accent-bar{height:3px;background:linear-gradient(90deg,#6366f1,#8b5cf6,#06b6d4)}`,
      ),
      `<div class="pg"><div class="accent-bar"></div><div class="hdr"><div class="nm">${nm}</div><div class="ttl">${ttl}</div><div class="cv-row">${[
        d.personal.email,
        d.personal.phone,
        d.personal.location,
      ]
        .filter(Boolean)
        .map((v) => `<span>${v}</span>`)
        .join(
          "",
        )}</div></div><div class="body"><p style="font-size:11px;color:#4b5563;margin-bottom:28px">${dt}</p>${addrBlock.replace(/color:#374151/g, "color:#9ca3af")}${referralNote}${greet.replace(/color:#111/, "color:#f9fafb")}${bodyContent}${closing.replace(/color:#6b7280/g, "color:#9ca3af").replace(/color:#9ca3af/g, "color:#6b7280")}</div></div>`,
    );

  // ── 33. PRISM — thin color left stripe, light right body ──
  if (id === "prism")
    return wrap(
      baseCSS(
        `.pg{max-width:880px;margin:0 auto;display:flex;background:#fff}.stripe{width:6px;background:${c};flex-shrink:0}.pad{width:6px;background:${c}22;flex-shrink:0}.content{flex:1;padding:0}.hdr{padding:44px 52px;border-bottom:1px solid #f1f5f9}.nm{font-size:40px;font-weight:800;color:#111;letter-spacing:-1.5px;margin-bottom:6px}.ttl{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:${c};margin-bottom:16px}.cv-row{display:flex;flex-wrap:wrap;gap:4px 18px;font-size:11.5px;color:#6b7280}.body{padding:40px 52px}`,
      ),
      `<div class="pg"><div class="stripe"></div><div class="pad"></div><div class="content"><div class="hdr"><div class="nm">${nm}</div><div class="ttl">${ttl}</div><div class="cv-row">${[
        d.personal.email,
        d.personal.phone,
        d.personal.location,
        d.personal.linkedin,
      ]
        .filter(Boolean)
        .map((v) => `<span>${v}</span>`)
        .join(
          "",
        )}</div></div><div class="body"><p style="font-size:11.5px;color:#9ca3af;margin-bottom:28px">${dt}</p>${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div></div></div>`,
    );

  // ── 34. MARQUEE — huge outlined/stroked name ──
  if (id === "marquee")
    return wrap(
      baseCSS(
        `.pg{max-width:880px;margin:0 auto;padding:52px 64px;background:#fff}.nm{font-size:72px;font-weight:900;letter-spacing:-4px;line-height:.85;color:transparent;-webkit-text-stroke:2px #111;text-transform:uppercase;margin-bottom:12px}.sub{display:flex;justify-content:space-between;align-items:center;border-top:2px solid #111;border-bottom:1px solid #ddd;padding:10px 0;margin-bottom:32px;flex-wrap:wrap;gap:8px}.ttl{font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:#111;font-weight:700}.cv-row{font-size:11.5px;color:#6b7280;display:flex;flex-wrap:wrap;gap:4px 16px}`,
      ),
      `<div class="pg"><div class="nm">${nm}</div><div class="sub"><div class="ttl">${ttl}</div><div class="cv-row">${[
        d.personal.email,
        d.personal.phone,
        d.personal.location,
      ]
        .filter(Boolean)
        .map((v) => `<span>${v}</span>`)
        .join(
          "",
        )}</div></div><p style="font-size:11.5px;color:#9ca3af;margin-bottom:28px">${dt}</p>${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div>`,
    );

  // ── 35. ECLIPSE — half-circle color block top-right corner ──
  if (id === "eclipse")
    return wrap(
      baseCSS(
        `.pg{max-width:860px;margin:0 auto;padding:52px 64px;background:#fff;position:relative;overflow:hidden}.circle{position:absolute;top:-120px;right:-120px;width:320px;height:320px;border-radius:50%;background:${c};pointer-events:none}.nm{font-size:44px;font-weight:800;color:#111;letter-spacing:-1.5px;margin-bottom:6px;position:relative}.ttl{font-size:12px;letter-spacing:2.5px;text-transform:uppercase;color:${c};margin-bottom:20px;position:relative}.cv-row{display:flex;flex-wrap:wrap;gap:4px 18px;font-size:11.5px;color:#6b7280;position:relative}.rule{height:1.5px;background:${c}22;margin:24px 0}`,
      ),
      `<div class="pg"><div class="circle"></div><div class="nm">${nm}</div><div class="ttl">${ttl}</div><div class="cv-row">${[
        d.personal.email,
        d.personal.phone,
        d.personal.location,
        d.personal.linkedin,
      ]
        .filter(Boolean)
        .map((v) => `<span>${v}</span>`)
        .join(
          "",
        )}</div><div class="rule"></div><p style="font-size:11.5px;color:#9ca3af;margin-bottom:28px">${dt}</p>${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div>`,
    );

  // ── 36. CENSUS — form/field-label style, official look ──
  if (id === "census")
    return wrap(
      baseCSS(
        `.pg{max-width:840px;margin:0 auto;padding:56px 64px;background:#fff}.top-bar{border:2px solid #000;padding:16px 20px;margin-bottom:24px;display:flex;align-items:center;justify-content:space-between}.form-title{font-size:9px;letter-spacing:4px;text-transform:uppercase;font-weight:700}.nm{font-size:40px;font-weight:800;color:#000;letter-spacing:-1.5px}.fields{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1px;background:#000;border:1px solid #000;margin-bottom:28px}.field{background:#fff;padding:8px 12px}.field-lbl{font-size:8px;letter-spacing:2px;text-transform:uppercase;color:#777;margin-bottom:3px}.field-val{font-size:11.5px;color:#111;font-weight:500}`,
      ),
      `<div class="pg"><div class="top-bar"><div class="form-title">Cover Letter</div><div style="font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#777">${dt}</div></div><div class="nm">${nm}</div><div style="font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#777;margin:6px 0 20px">${ttl}</div><div class="fields"><div class="field"><div class="field-lbl">Email</div><div class="field-val">${d.personal.email || "—"}</div></div><div class="field"><div class="field-lbl">Phone</div><div class="field-val">${d.personal.phone || "—"}</div></div><div class="field"><div class="field-lbl">Location</div><div class="field-val">${d.personal.location || "—"}</div></div></div>${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div>`,
    );

  // ── 37. LINOTYPE — press-slug style bold type rows ──
  if (id === "linotype")
    return wrap(
      baseCSS(
        `.pg{max-width:860px;margin:0 auto;padding:0;background:#fff}.slug{background:#111;padding:20px 56px;display:flex;align-items:center;gap:0}.slug-blk{padding:14px 20px;border-right:1px solid #333}.slug-lbl{font-size:7px;letter-spacing:3px;text-transform:uppercase;color:#666;margin-bottom:3px}.slug-val{font-size:12px;font-weight:700;color:#fff;letter-spacing:-.3px}.nm-bar{padding:32px 56px 0;border-bottom:3px solid #111}.nm{font-size:48px;font-weight:900;color:#111;letter-spacing:-2.5px;text-transform:uppercase;line-height:1;margin-bottom:6px}.ttl{font-size:9px;letter-spacing:4px;text-transform:uppercase;color:#777;margin-bottom:16px}.body{padding:36px 56px}`,
      ),
      `<div class="pg"><div class="slug">${[
        ["Email", d.personal.email || "—"],
        ["Phone", d.personal.phone || "—"],
        ["Location", d.personal.location || "—"],
        ["Date", dt],
      ]
        .map(
          ([l, v]) =>
            `<div class="slug-blk"><div class="slug-lbl">${l}</div><div class="slug-val">${v}</div></div>`,
        )
        .join(
          "",
        )}</div><div class="nm-bar"><div class="nm">${nm}</div><div class="ttl">${ttl}</div></div><div class="body">${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div></div>`,
    );

  // ── 38. SCAFFOLD — thin grid lines with numbering, engineering feel ──
  if (id === "scaffold")
    return wrap(
      baseCSS(
        `.pg{max-width:860px;margin:0 auto;padding:0;background:#fff}.hdr{padding:44px 60px;background:#fafafa;border-bottom:2px solid #222;position:relative}.grid-h{position:absolute;inset:0;background-image:linear-gradient(#e5e7eb 1px,transparent 1px);background-size:100% 20px;pointer-events:none;opacity:.4}.num{position:absolute;left:12px;top:44px;font-size:9px;font-family:monospace;color:#9ca3af;line-height:20px}.nm{font-size:42px;font-weight:800;color:#111;letter-spacing:-1.5px;position:relative}.ttl-row{display:flex;align-items:center;gap:12px;margin-top:8px;position:relative}.ttl{font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#6b7280}.corner{position:absolute;bottom:0;right:0;width:40px;height:40px;border-left:2px solid #222;border-top:2px solid #222}.body{padding:44px 60px}`,
      ),
      `<div class="pg"><div class="hdr"><div class="grid-h"></div><div class="num">${Array.from({ length: 6 }, (_, i) => `0${i + 1}`).join("<br>")}</div><div class="nm">${nm}</div><div class="ttl-row"><div class="ttl">${ttl}</div><span style="font-size:11px;color:#9ca3af">·</span><span style="font-size:11px;color:#6b7280">${[d.personal.email, d.personal.phone].filter(Boolean).join("  /  ")}</span></div><div class="corner"></div></div><div class="body"><p style="font-size:11.5px;color:#9ca3af;margin-bottom:28px">${dt} · ${d.personal.location || ""}</p>${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div></div>`,
    );

  // ── 39. VELVET — deep plum/burgundy header with gold rule ──
  if (id === "velvet")
    return wrap(
      baseCSS(
        `.pg{max-width:860px;margin:0 auto;background:#fff}.hdr{background:#2d0a2a;padding:52px 64px 44px}.nm{font-size:44px;font-weight:700;color:#fdf4ff;letter-spacing:-1.5px;margin-bottom:6px}.ttl{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:rgba(253,244,255,.45);margin-bottom:20px}.gold{height:1px;background:linear-gradient(90deg,#b8860b,#f4c430,#b8860b);margin-bottom:20px}.cv-row{display:flex;flex-wrap:wrap;gap:4px 18px;font-size:11.5px;color:rgba(253,244,255,.55)}.body{padding:52px 64px}`,
      ),
      `<div class="pg"><div class="hdr"><div class="nm">${nm}</div><div class="ttl">${ttl}</div><div class="gold"></div><div class="cv-row">${[
        d.personal.email,
        d.personal.phone,
        d.personal.location,
      ]
        .filter(Boolean)
        .map((v) => `<span>${v}</span>`)
        .join(
          "",
        )}</div></div><div class="body"><p style="font-size:11.5px;color:#9ca3af;margin-bottom:28px">${dt}</p>${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div></div>`,
    );

  // ── 40. ORIGAMI — diagonal folded corner accent ──
  if (id === "origami")
    return wrap(
      baseCSS(
        `.pg{max-width:860px;margin:0 auto;padding:52px 64px;background:#fff;position:relative}.fold{position:absolute;top:0;right:0;width:0;height:0;border-style:solid;border-width:0 80px 80px 0;border-color:transparent ${c} transparent transparent;pointer-events:none}.fold-inner{position:absolute;top:8px;right:0;width:0;height:0;border-style:solid;border-width:0 72px 72px 0;border-color:transparent rgba(255,255,255,.6) transparent transparent;pointer-events:none}.nm{font-size:44px;font-weight:700;color:#111;letter-spacing:-1.5px;margin-bottom:6px}.ttl{font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:${c};margin-bottom:18px}.cv-row{display:flex;flex-wrap:wrap;gap:4px 18px;font-size:11.5px;color:#6b7280;margin-bottom:8px}.rule{height:1.5px;background:${c}33;margin-bottom:32px}`,
      ),
      `<div class="pg"><div class="fold"></div><div class="fold-inner"></div><div class="nm">${nm}</div><div class="ttl">${ttl}</div><div class="cv-row">${[
        d.personal.email,
        d.personal.phone,
        d.personal.location,
        d.personal.linkedin,
      ]
        .filter(Boolean)
        .map((v) => `<span>${v}</span>`)
        .join(
          "",
        )}</div><div class="rule"></div><p style="font-size:11.5px;color:#9ca3af;margin-bottom:28px">${dt}</p>${addrBlock}${referralNote}${greet}${bodyContent}${closing}</div>`,
    );

  // Fallback — if no id matches, use chancellor
  return buildHTML("chancellor", d);
}

// ============================================================
// 5. CanvasPreview — zoomable, draggable preview container
// ============================================================
// How it works:
//   - The preview "canvas" is a div you can drag like a map
//   - You can zoom with Ctrl+scroll or the +/- buttons
//   - The letter lives inside an <iframe> at fixed 860px width
//   - The iframe scale is controlled by CSS transform: scale()
// ============================================================

function CanvasPreview({
  children,
}: {
  children: (iframeH: number) => ReactNode;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 20, y: 20 }); // current x,y offset (for dragging)
  const scaleRef = useRef(0.58); // current zoom level
  const downRef = useRef<{ x: number; y: number } | null>(null); // mouse down position
  const startRef = useRef({ x: 0, y: 0 }); // drag start offset
  const isDrag = useRef(false); // are we dragging or just clicking?
  const animRef = useRef<number | null>(null); // requestAnimationFrame handle
  const [pos, setPos] = useState({ x: 20, y: 20 });
  const [scale, setScale] = useState(0.58);
  const [drag, setDrag] = useState(false);
  const [iframeH, setIframeH] = useState(1122); // grows if content overflows

  // Listen for height messages sent by the iframe's content
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === "iframeHeight" && typeof e.data.h === "number")
        setIframeH(Math.max(1122, e.data.h + 40));
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  // Calculate the initial zoom so the letter fits the screen
  const initS = useCallback(() => {
    const w = window.innerWidth;
    return w < 480
      ? 0.33
      : w < 640
        ? 0.4
        : w < 820
          ? 0.5
          : w < 1024
            ? 0.57
            : w < 1280
              ? 0.63
              : 0.68;
  }, []);

  useEffect(() => {
    const s = initS();
    scaleRef.current = s;
    setScale(s);
    const fn = () => {
      const s2 = initS();
      scaleRef.current = s2;
      setScale(s2);
    };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, [initS]);

  // Smooth animated zoom using requestAnimationFrame
  const smoothZoom = (target: number) => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    const from = scaleRef.current,
      t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 160, 1);
      const v = from + (target - from) * (1 - Math.pow(1 - p, 3)); // cubic ease-out
      scaleRef.current = v;
      setScale(v);
      if (p < 1) animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
  };

  const zoomIn = () => smoothZoom(Math.min(scaleRef.current + 0.12, 3));
  const zoomOut = () => smoothZoom(Math.max(scaleRef.current - 0.12, 0.2));
  const reset = () => {
    const p = { x: 20, y: 20 };
    posRef.current = p;
    setPos(p);
    smoothZoom(initS());
  };

  // Mouse drag and wheel zoom event handlers
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const inEl = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      return (
        e.clientX >= r.left &&
        e.clientX <= r.right &&
        e.clientY >= r.top &&
        e.clientY <= r.bottom
      );
    };
    const onDown = (e: MouseEvent) => {
      if (!inEl(e) || (e.target as HTMLElement)?.closest?.("[data-nodrag]"))
        return;
      e.preventDefault();
      downRef.current = { x: e.clientX, y: e.clientY };
      isDrag.current = false;
    };
    const onMove = (e: MouseEvent) => {
      if (!downRef.current) return;
      const dx = e.clientX - downRef.current.x,
        dy = e.clientY - downRef.current.y;
      if (!isDrag.current && Math.hypot(dx, dy) > 3) {
        isDrag.current = true;
        setDrag(true);
        startRef.current = {
          x: downRef.current.x - posRef.current.x,
          y: downRef.current.y - posRef.current.y,
        };
      }
      if (isDrag.current) {
        const np = {
          x: e.clientX - startRef.current.x,
          y: e.clientY - startRef.current.y,
        };
        posRef.current = np;
        setPos({ ...np });
      }
    };
    const onUp = () => {
      downRef.current = null;
      isDrag.current = false;
      setDrag(false);
    };
    const onWheel = (e: WheelEvent) => {
      if (!inEl(e)) return;
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        const v = Math.max(
          0.2,
          Math.min(3, scaleRef.current * Math.exp(-e.deltaY * 0.002)),
        );
        scaleRef.current = v;
        setScale(v);
      } else {
        const np = {
          x: posRef.current.x - e.deltaX * 0.5,
          y: posRef.current.y - e.deltaY * 0.5,
        };
        posRef.current = np;
        setPos({ ...np });
      }
    };
    window.addEventListener("mousedown", onDown, {
      capture: true,
      passive: false,
    });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("wheel", onWheel, {
      capture: true,
      passive: false,
    });
    return () => {
      window.removeEventListener("mousedown", onDown, { capture: true });
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("wheel", onWheel, { capture: true });
    };
  }, []);

  return (
    <div
      className="relative flex items-center jus w-full h-full"
      style={{ minHeight: 360 }}
    >
      <style>{`.cvs-root iframe{pointer-events:none!important}`}</style>
      {/* The main draggable area */}
      <div
        ref={wrapRef}
        className="cvs-root absolute inset-0 overflow-hidden select-none"
        style={{
          cursor: drag ? "grabbing" : "grab",
    
          background: "#e8e6f2",
        }}
      >
        {/* The transformed container that holds the iframe */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transformOrigin: "top left",
            transform: ` translate(${pos.x}px,${pos.y}px) scale(${scale})`,
            willChange: "transform",
            zIndex: 1,
            margin: "0 auto",
          }}
        >
          {children(iframeH)}
        </div>
      </div>

      {/* Zoom controls */}
      <div
        data-nodrag
        className="absolute bottom-3 right-3 z-30 flex flex-col gap-1.5"
      >
        {[
          { fn: zoomIn, icon: <FiZoomIn className="w-4.5 h-4.5" /> },
          { fn: zoomOut, icon: <FiZoomOut className="w-4.5 h-4.5" /> },
          { fn: reset, icon: <FiRefreshCw className="w-4.5 h-4.5" /> },
        ].map((b, i) => (
          <motion.button
            key={i}
            type="button"
            onClick={b.fn}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer text-white shadow-md ${i < 2 ? "bg-linear-to-br from-indigo-600 to-violet-600" : "bg-gray-700 hover:bg-gray-800"}`}
          >
            {b.icon}
          </motion.button>
        ))}
      </div>
      <p
        data-nodrag
        className="absolute bottom-3 left-2 z-30 pointer-events-none text-[9px] font-semibold text-slate-400"
      >
        Drag · Pinch · Scroll
      </p>
    </div>
  );
}

// ============================================================
// 6. TemplateCard — one card in the template picker grid
// ============================================================
function TemplateCard({
  template,
  selected,
  onClick,
  showLock,
}: {
  template: (typeof TEMPLATE_DEFS)[0];
  selected: boolean;
  onClick: () => void;
  showLock: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={`relative bg-white rounded-2xl border-2 overflow-hidden cursor-pointer transition-all duration-200 group
        ${
          selected
            ? "border-indigo-500 shadow-[0_0_0_3px_rgba(99,102,241,.14)]"
            : "border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-lg hover:border-indigo-200"
        }`}
    >
      {/* Template thumbnail image */}
      <div
        className="relative w-full"
        style={{ paddingBottom: "130%", background: "#f8fafc" }}
      >
        <Image
          src={template.image}
          alt={template.name}
          fill
          className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width:640px) 45vw, (max-width:1024px) 30vw, 20vw"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        {/* <div className="absolute bottom-0 inset-x-0 h-8 bg-linear-to-t from-white/80 to-transparent pointer-events-none" /> */}
      </div>

      {/* Selected checkmark badge */}
      {selected && (
        <div className="absolute top-2 right-2 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center shadow-md z-10">
          <svg viewBox="0 0 14 14" width="11" height="11" fill="none">
            <polyline points="2,8 5,12 12,3" stroke="white" strokeWidth="2.4" />
          </svg>
        </div>
      )}

      {/* Premium lock badge */}
      {showLock && (
        <div
          className="absolute top-2 left-2 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center shadow z-10"
          title="Premium"
        >
          <FiLock className="w-2.5 h-2.5 text-white" />
        </div>
      )}

      {/* Card label */}
      <div className="px-2.5 py-2.5">
        <div className="text-[12.5px] font-bold text-slate-900 leading-tight">
          {template.name}
        </div>
        <div className="text-[10.5px] text-slate-400 leading-tight mt-0.5 line-clamp-2 ">
          {template.description}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 7. POPUPS
// ============================================================

// Login popup — shown when user is not logged in
function LoginPopup({
  onClose,
  onLogin,
}: {
  onClose: () => void;
  onLogin: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-2000 flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 400,
          duration: 0.3,
        }}
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-6 md:p-8 max-w-[95%] sm:max-w-md w-full relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-indigo-50/60 via-white to-violet-50/40 pointer-events-none" />

        {/* Floating orbs for visual interest */}
        <motion.div
          className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-100/30 rounded-full blur-3xl pointer-events-none"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-10 -left-10 w-40 h-40 bg-violet-100/30 rounded-full blur-3xl pointer-events-none"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        />

        <div className="relative">
          {/* Mobile close button - top right */}
          <button
            onClick={onClose}
            className="absolute -top-2 -right-2 sm:hidden w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-sm transition-all"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Icon with pulse animation */}
          <motion.div
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-linear-to-br from-indigo-600 to-violet-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-lg shadow-indigo-200"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <motion.span
              className="text-white text-xl sm:text-2xl md:text-3xl"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✦
            </motion.span>
          </motion.div>

          <h2 className="text-[18px] sm:text-xl md:text-[22px] font-extrabold text-slate-900 text-center mb-1.5 sm:mb-2">
            Welcome Back!
          </h2>

          <p className="text-[12px] sm:text-[13px] md:text-[13.5px] text-slate-500 text-center mb-5 sm:mb-6 leading-relaxed px-1 sm:px-2">
            Sign in to create, edit, and download professional cover letters
            that land interviews.
          </p>

          {/* Sign In Button - Large touch target */}
          <motion.button
            onClick={onLogin}
            className="w-full py-2.5 sm:py-3  bg-linear-to-r from-indigo-600 to-violet-600 text-white font-semibold md:font-bold text-[14px] sm:text-[15px] rounded-xl sm:rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Sign In
          </motion.button>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-slate-400">or</span>
            </div>
          </div>

          {/* Demo quick action */}
          <button
            onClick={onClose}
            className="w-full py-2.5 sm:py-3 text-[12px] sm:text-[13px] font-medium text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors cursor-pointer"
          >
            Continue browsing →
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Premium popup — shown when user is on free plan
function PremiumPopup({
  onClose,
  onUpgrade,
}: {
  onClose: () => void;
  onUpgrade: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-2000 flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 400,
          duration: 0.3,
        }}
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-6 md:p-8 max-w-[95%] sm:max-w-md w-full relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 bg-linear-to-br from-amber-50/60 via-white to-indigo-50/40 pointer-events-none" />

        <div className="relative">
          <button
            onClick={onClose}
            className="absolute -top-2 -right-2 sm:top-0 sm:right-0 w-7 h-7 sm:w-8 sm:h-8 bg-slate-100 hover:bg-red-50 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 transition-all z-10 cursor-pointer"
          >
            <FiX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Lock Icon instead of star */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-linear-to-br from-slate-700 to-slate-900 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg shadow-slate-300">
            <FiLock className="text-white text-xl sm:text-2xl md:text-3xl" />
          </div>

          <h2 className="text-[18px] sm:text-xl md:text-[22px] font-extrabold text-slate-900 text-center mb-2">
            ⭐ Premium Plan Required
          </h2>

          {/* Prominent lock message */}
          <div className="mb-4 sm:mb-5 p-3 bg-red-50 border border-red-200 rounded-xl text-center">
            <p className="text-[12px] sm:text-[13px] font-semibold text-red-600">
              Cover letters are a Premium feature
            </p>
            <p className="text-[11px] sm:text-[12px] text-red-500 mt-0.5">
              Upgrade now to unlock full access
            </p>
          </div>

          <p className="text-[12px] sm:text-[13px] text-slate-600 text-center mb-4">
            Get unlimited access to:
          </p>

          <div className="space-y-2 mb-5 sm:mb-6">
            <div className="flex items-center gap-2 text-xs sm:text-[13px] text-slate-600">
              <span className="text-green-500">✓</span>
              <span>Professional cover letter builder</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-[13px] text-slate-600">
              <span className="text-green-500">✓</span>
              <span>40+ customizable templates</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-[13px] text-slate-600">
              <span className="text-green-500">✓</span>
              <span>PDF download </span>
            </div>
          </div>

          <motion.button
            onClick={onUpgrade}
            className="w-full py-3.5 bg-linear-to-r from-amber-500 to-orange-500 text-white font-bold text-[14px] rounded-xl shadow-lg shadow-amber-200 hover:shadow-lg hover:-translate-y-0.5 transition-all mb-2.5 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Upgrade to Premium
          </motion.button>

          <button
            onClick={onClose}
            className="w-full py-2 text-[12px] text-slate-400 font-semibold hover:text-slate-600 transition-colors cursor-pointer"
          >
            No thanks, I'll continue browsing
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
// ============================================================
// 1-PAGE OVERFLOW ALERT COMPONENT
// ============================================================
// Shown when the letter content is too long to fit one A4 page.
// We detect overflow by checking if the iframe's document scrollHeight
// exceeds ~1122px (which is A4 height at 96dpi).
// ============================================================
function OverflowAlert({
  visible,
  onDismiss,
}: {
  visible: boolean;
  onDismiss: () => void;
}) {
  if (!visible) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="mx-4 mb-3 bg-amber-50 border border-amber-300 rounded-2xl p-3.5 flex items-start gap-3 shadow-sm"
    >
      {/* Warning icon */}
      <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
        <FiAlertTriangle className="w-4 h-4 text-amber-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[12.5px] font-bold text-amber-800 leading-tight mb-0.5">
          ⚠ Cover letter exceeds one page
        </p>
        <p className="text-[11px] text-amber-700 leading-relaxed">
          Your letter is too long. Keep it to{" "}
          <strong>3–4 short paragraphs</strong>. Trim the content in the{" "}
          <strong>Content</strong> step so it fits on a single A4 page.
        </p>
      </div>
      {/* Dismiss button */}
      <button
        onClick={onDismiss}
        className="w-6 h-6 shrink-0 text-amber-400 hover:text-amber-700 transition-colors mt-0.5"
      >
        <FiX className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

// ============================================================
// 8. FORM FIELD HELPERS
// ============================================================

// F = Field wrapper — adds a label above an input
function F({
  label,
  required,
  icon: Icon,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  icon?: React.ElementType;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <label className="flex items-center gap-1.5 text-[10.5px] font-bold tracking-wide uppercase text-slate-500 mb-1.5">
        {Icon && <Icon className="w-3 h-3 text-indigo-400" />}
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-[10.5px] text-slate-400 mt-1">{hint}</p>}
    </div>
  );
}

// inp = shared Tailwind CSS class string for all text inputs
const inp =
  "w-full px-3 py-3 text-[13.5px] font-[500] border-[1.5px] border-slate-300 rounded-xl outline-none transition-all duration-150 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 placeholder:text-gray-400 bg-white text-slate-800";

// ============================================================
// 9. STEPS DEFINITION
// ============================================================
type Step = "template" | "personal" | "company" | "content" | "review";
const STEPS: { id: Step; label: string; icon: string }[] = [
  { id: "template", label: "Template", icon: "🎨" },
  { id: "personal", label: "Personal", icon: "👤" },
  { id: "company", label: "Company", icon: "🏢" },
  { id: "content", label: "Content", icon: "✍️" },
  { id: "review", label: "Review", icon: "✅" },
];

// ============================================================
// MAIN COMPONENT
// ============================================================
// This is the page itself. It:
//   1. Checks if the user is logged in and premium
//   2. Manages the multi-step form state
//   3. Builds the HTML preview on every data change
//   4. Writes the HTML into the live preview iframe
//   5. Detects 1-page overflow and shows an alert
// ============================================================

export default function CoverLetterGenerator() {
  const router = useRouter();

  // --- Auth state ---
  const [isPremium, setIsPremium] = useState<boolean | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  // --- UI state ---
  const [step, setStep] = useState<Step>("template");
  const [tplId, setTplId] = useState("chancellor"); // selected template id
  const [data, setData] = useState<CLData>(JSON.parse(JSON.stringify(BLANK)));
  const [html, setHtml] = useState(""); // the generated letter HTML
  const [modal, setModal] = useState(false); // fullscreen modal open?
  const [toast, setToast] = useState(""); // toast notification text
  const [busy, setBusy] = useState(false); // PDF download in progress?
  const [showColors, setShowColors] = useState(false); // color picker expanded?
  const [showFonts, setShowFonts] = useState(false); // font picker expanded?
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);

  // --- 1-page overflow detection ---
  const [overflowAlert, setOverflowAlert] = useState(false); // is the letter too long?
  const [overflowDismissed, setOverflowDismissed] = useState(false); // user dismissed alert?
  const overflowTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // --- iframe refs ---
  const liveRef = useRef<HTMLIFrameElement>(null); // preview iframe
  const modalRef = useRef<HTMLIFrameElement>(null); // fullscreen modal iframe

  // ── Fetch auth on mount ──
  useEffect(() => {
    const userDetails = getLocalStorage<User>("user_details");
    const userId = userDetails?.id;
    if (!userId) {
      setIsLoggedIn(false);
      setIsPremium(false);
      setTimeout(() => setShowLoginPopup(true), 600);
      return;
    }
    setIsLoggedIn(true);
    axios
      .get(`${API_URL}/api/users/dashboard`, { params: { userId } })
      .then((res) => {
        const payment = res?.data?.payments?.[0];
        const premium = payment?.plan === "Premium";
        setIsPremium(premium);
        if (!premium) setTimeout(() => setShowPremiumPopup(true), 600);
      })
      .catch(() => setIsPremium(false));
  }, []);

  // ── Toast helper ──
  const showToast = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(""), 2800);
  };

  // ── Build HTML whenever template or data changes ──
  const rebuild = useCallback(() => {
    const h = buildHTML(tplId, data);
    setHtml(h);
    return h;
  }, [tplId, data]);

  useEffect(() => {
    const t = setTimeout(rebuild, 200); // debounce — wait 200ms after typing stops
    return () => clearTimeout(t);
  }, [rebuild]);

  // ── Write HTML into an iframe ──
  // We can't just set src= because the HTML is a string, not a URL.
  // So we use doc.open() / doc.write() / doc.close() to inject the HTML directly.
  const writeIframe = (
    ref: React.RefObject<HTMLIFrameElement | null>,
    h: string,
  ) => {
    if (!ref.current) return;
    const doc = ref.current.contentDocument;
    if (!doc) return;
    doc.open();
    doc.write(h);
    doc.close();
  };

  useEffect(() => {
    if (html && liveRef.current) writeIframe(liveRef, html);
  }, [html]);
  useEffect(() => {
    if (modal && html && modalRef.current) writeIframe(modalRef, html);
  }, [modal, html]);

  // ── Overflow detection ──
  // After the iframe is written, check if the content is taller than A4 (≈1122px).
  // We do this with a small timeout so the iframe has time to render.
  useEffect(() => {
    if (!html) return;
    if (overflowTimer.current) clearTimeout(overflowTimer.current);
    overflowTimer.current = setTimeout(() => {
      const doc = liveRef.current?.contentDocument;
      if (!doc) return;
      const scrollH =
        doc.documentElement?.scrollHeight || doc.body?.scrollHeight || 0;
      const isOver = scrollH > 1200; // slightly above 1122 to give breathing room
      if (isOver && !overflowDismissed) {
        setOverflowAlert(true);
      } else if (!isOver) {
        setOverflowAlert(false);
        setOverflowDismissed(false); // reset dismiss when they fix the length
      }
    }, 600);
  }, [html, overflowDismissed]);

  // ── Generic data setter ──
  // path is an array like ["personal", "email"]
  // This lets us update deeply nested fields without writing a setter for each.
  const set = (path: string[], val: string) =>
    setData((prev) => {
      const n = JSON.parse(JSON.stringify(prev)) as CLData;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let c: any = n;
      for (let i = 0; i < path.length - 1; i++) c = c[path[i]];
      c[path[path.length - 1]] = val;
      return n;
    });

  // ── Step navigation with auth gate ──
  const handleStepChange = (targetStep: Step) => {
    if (targetStep === "template") {
      setStep(targetStep);
      return;
    }
    if (!isLoggedIn) {
      setShowLoginPopup(true);
      return;
    }
    if (!isPremium) {
      setShowPremiumPopup(true);
      return;
    }
    setStep(targetStep);
  };

  // Add this near the top of your component, after the initial state declarations

  // Add a ref to track if this is the first load
  const hasLoadedFromStorage = useRef(false);

  // Load data from localStorage on mount (only once)
  useEffect(() => {
    if (hasLoadedFromStorage.current) return;

    const savedData = getLocalStorage<CLData>("coverLetterData");
    if (savedData) {
      setData(savedData);
      console.log("✓ Loaded saved data from localStorage");
    }

    hasLoadedFromStorage.current = true;
  }, []);

  // Update the handleContinue function to save to localStorage
  const handleContinue = () => {
    const idx = STEPS.findIndex((s) => s.id === step);

    if (step === "template") {
      if (!isLoggedIn) {
        setShowLoginPopup(true);
        return;
      }
      if (!isPremium) {
        setShowPremiumPopup(true);
        return;
      }
    }

    // Save to localStorage before moving to next step
    setLocalStorage("coverLetterData", data);
    console.log("✓ Saved to localStorage");

    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1].id);
  };

  //   const handleContinue = () => {
  //     const idx = STEPS.findIndex((s) => s.id === step);
  //     if (step === "template") {
  //       if (!isLoggedIn) {
  //         setShowLoginPopup(true);
  //         return;
  //       }
  //       if (!isPremium) {
  //         setShowPremiumPopup(true);
  //         return;
  //       }
  //     }
  //     if (idx < STEPS.length - 1) setStep(STEPS[idx + 1].id);
  //   };

  // ── PDF download ──
  const downloadPDF = async () => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
      return;
    }
    if (!isPremium) {
      setShowPremiumPopup(true);
      return;
    }
    const h = rebuild();
    setBusy(true);
    try {
      const r = await axios.post(
        `${API_URL}/api/candidates/generate-pdf`,
        { html: h },
        { responseType: "blob" },
      );
      const url = URL.createObjectURL(r.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Cover_Letter_${data.personal.fullName || "Draft"}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast("✓ PDF downloaded");
    } catch {
      showToast("Download failed — try again");
    } finally {
      setBusy(false);
    }
  };

  // ── Derived values ──
  const tpl = TEMPLATE_DEFS.find((t) => t.id === tplId)!;
  const stepIdx = STEPS.findIndex((s) => s.id === step);



  console.log("data",data)
  
  // ══════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════
  return (
    <>
      {/* Global styles */}
      <style>{`
        html,body{overflow:hidden}
        @media(max-width:820px){html,body{overflow:auto}}
        .canvas-iframe{width:860px;border:none;display:block;background:#fff;pointer-events:none;overflow:hidden}
        .modal-iframe{width:860px;border:none;display:block;background:#fff;overflow:hidden}
        iframe{overflow:hidden!important}
        .left-scroll{scrollbar-width:thin;scrollbar-color:#c7d2fe transparent}
        .left-scroll::-webkit-scrollbar{width:4px}
        .left-scroll::-webkit-scrollbar-track{background:transparent}
        .left-scroll::-webkit-scrollbar-thumb{background:#c7d2fe;border-radius:4px}
        .scrollbar-none{scrollbar-width:none}
        .scrollbar-none::-webkit-scrollbar{display:none}
        @keyframes livePulse{0%,100%{box-shadow:0 0 0 2px rgba(16,185,129,.2)}50%{box-shadow:0 0 0 5px rgba(16,185,129,.07)}}
        .live-dot{animation:livePulse 2s infinite}
        @keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
        .toast-anim{animation:toastIn .22s ease}
        @keyframes modalIn{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        .modal-anim{animation:modalIn .22s ease}
        @keyframes ovIn{from{opacity:0}to{opacity:1}}
        .ov-anim{animation:ovIn .18s ease}
        .p-editor-container .p-editor-content{min-height:380px}
        .p-editor-container .ql-editor{font-size:14px;line-height:1.85;font-family:inherit;padding:16px 20px}
        .p-editor-container{border-radius:12px;overflow:hidden;border:1.5px solid #e2e8f0}
        .p-editor-container:focus-within{border-color:#6366f1;box-shadow:0 0 0 3px rgba(99,102,241,.1)}
        .p-editor-toolbar{background:#f8fafc!important;border-bottom:1px solid #e2e8f0!important;padding:8px 12px!important}
      `}</style>

      {/* login Popup */}
      <AnimatePresence>
        {showLoginPopup && (
          <LoginPopup
            onClose={() => setShowLoginPopup(false)}
            onLogin={() => router.push("/login")}
          />
        )}
      </AnimatePresence>

      {/* Premium Popup */}
      <AnimatePresence>
        {showPremiumPopup && !showLoginPopup && (
          <PremiumPopup
            onClose={() => setShowPremiumPopup(false)}
            onUpgrade={() => router.push("/choose-plan")}
          />
        )}
      </AnimatePresence>

      {/* ── TOP NAV BAR ── */}
      <nav className="h-13 sm:h-14.5 bg-white border-b border-slate-200 flex items-center px-3 sm:px-4 md:px-5 gap-3 z-50 relative shadow-sm shrink-0">
        <button
          onClick={() => router.push("/")}
          className="p-1.5 rounded-lg bg-linear-to-r from-gray-50 to-gray-100 hover:from-indigo-50 hover:to-indigo-100 transition-all duration-300 group shrink-0 shadow-sm sm:hidden"
        >
          <IoHomeOutline className="w-3.5 h-3.5 text-gray-600 group-hover:text-indigo-600 transition-colors" />
        </button>
        {/* Logo */}
        <button
          onClick={() => router.push("/")}
          className="cursor-pointer shrink-0 max-sm:hidden"
        >
          <div className="relative w-25 sm:w-35 h-8.5 sm:h-11.5">
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              className="object-contain"
              priority
              sizes="(max-width:640px) 100px,140px"
            />
          </div>
        </button>

        {/* Step indicators */}
        <div className="flex items-center flex-1 justify-center overflow-x-auto scrollbar-none gap-0 py-1">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.id}>
              {/* Connector line between steps */}
              {i > 0 && (
                <div
                  className={`w-3 sm:w-5 h-0.5 shrink-0 transition-colors ${i <= stepIdx ? "bg-emerald-500" : "bg-slate-200"}`}
                />
              )}
              {/* Step button */}
              <button
                onClick={() => handleStepChange(s.id)}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[12px] font-semibold transition-all shrink-0 cursor-pointer
                  ${i < stepIdx ? "text-slate-800" : i === stepIdx ? "text-indigo-600 bg-indigo-50" : "text-slate-400 hover:bg-slate-50"}`}
              >
                {/* Circle: completed = green check, current = indigo gradient, future = grey */}
                <span
                  className={`w-5.5 h-5.5 rounded-full flex items-center justify-center text-[10px] shrink-0
                  ${i < stepIdx ? "bg-emerald-500 text-white" : i === stepIdx ? "bg-linear-to-br from-indigo-600 to-violet-600 text-white shadow-[0_0_0_3px_rgba(91,56,240,.16)]" : "bg-slate-100 text-slate-400"}`}
                >
                  {i < stepIdx ? (
                    <svg viewBox="0 0 14 14" width="11" height="11" fill="none">
                      <polyline
                        points="2,8 5,12 12,3"
                        stroke="white"
                        strokeWidth="2.2"
                      />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            </React.Fragment>

            
          ))}
        </div>

        {/* Download PDF button */}
        <button
          onClick={downloadPDF}
          disabled={busy}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-bold bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md hover:shadow-lg hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all flex-shrink-0"
        >
          {busy ? "⏳" : "⬇"} PDF
        </button>
      </nav>

      {/* ── MAIN LAYOUT — left panel + right canvas ── */}
      <div className="grid lg:grid-cols-[440px_1fr] xl:grid-cols-[1fr_1fr] h-[calc(100vh-58px)]">
        {/* ════════════════════════════════
            LEFT PANEL — form steps
        ════════════════════════════════ */}
        <div className="flex flex-col overflow-hidden bg-slate-50 border-r border-slate-200">
          {/* Step heading */}
          <div className="shrink-0 px-4 md:px-5 pt-5 pb-0">
            <div className="flex items-center gap-2.5 mb-0.5">
              <div>
                <h2 className="font-bold text-slate-900 tracking-tight md:text-xl leading-tight">
                  {step === "template"
                    ? "Select Your Template"
                    : step === "personal"
                      ? "Personal Details"
                      : step === "company"
                        ? "Company Information"
                        : step === "content"
                          ? "Cover Letter Content"
                          : "Final Review"}
                </h2>
                <p className="text-[11.5px] text-slate-500">
                  {step === "template"
                    ? `Choose from ${TEMPLATE_DEFS.length} professional, industry-specific cover letter templates`
                    : step === "personal"
                      ? "Your name, title, and contact details for the letter header"
                      : step === "company"
                        ? "Company and hiring manager details to personalize your cover letter"
                        : step === "content"
                          ? "Write your cover letter content - concise, compelling, and one page maximum"
                          : "Review all sections and make final adjustments before downloading"}
                </p>
              </div>
            </div>
          </div>

          {/* 1-page overflow alert — appears below heading */}
          <div className="shrink-0 pt-3">
            <AnimatePresence>
              {overflowAlert && (
                <OverflowAlert
                  visible={overflowAlert}
                  onDismiss={() => {
                    setOverflowDismissed(true);
                    setOverflowAlert(false);
                  }}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Scrollable form content */}
          <div className="flex-1 overflow-y-auto px-4 pt-3 pb-10 sm:pb-18 md:pb-24 left-scroll">
            {/* ─────────────────────────────────────
                STEP 1: TEMPLATE PICKER
            ───────────────────────────────────── */}
            {step === "template" && (
              <>
                {/* Premium Upgrade Banners - Responsive */}
                {isLoggedIn && !isPremium && (
                  <div className="mb-4 bg-linear-to-r from-amber-50/90 via-orange-50/90 to-amber-50/90 backdrop-blur-sm border border-amber-200/60 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 shadow-lg shadow-amber-500/5">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-amber-500/25 shrink-0">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-semibold bg-linear-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent">
                        Unlock All Premium Templates
                      </p>
                      <p className="text-[10px] sm:text-xs text-amber-600/80">
                        Get access to all {TEMPLATE_DEFS.length} professional
                        templates + AI features
                      </p>
                    </div>
                    <button
                      onClick={() => router.push("/choose-plan")}
                      className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold bg-linear-to-r from-amber-500 to-orange-500 text-white rounded-xl shadow-md shadow-amber-500/25 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
                    >
                      Upgrade Now →
                    </button>
                  </div>
                )}

                {!isLoggedIn && (
                  <div className="mb-4 bg-linear-to-r from-indigo-50/90 via-violet-50/90 to-indigo-50/90 backdrop-blur-sm border border-indigo-200/60 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 shadow-lg shadow-indigo-500/5">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 shrink-0">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-semibold bg-linear-to-r from-indigo-800 to-violet-800 bg-clip-text text-transparent">
                        Sign In to Start Building
                      </p>
                      <p className="text-[10px] sm:text-xs text-indigo-600/80">
                        Browse templates freely, sign in to customize & download
                        your resume
                      </p>
                    </div>
                    <button
                      onClick={() => router.push("/login")}
                      className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold bg-linear-to-r from-indigo-600 to-violet-600 text-white rounded-xl shadow-md shadow-indigo-500/25 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
                    >
                      Sign In →
                    </button>
                  </div>
                )}

                {/* Controls Row - Responsive Grid */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-6">
                  {/* Accent Color Picker */}
                  <div className="w-full sm:flex-1 h-fit bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl border border-indigo-100/60 p-3 sm:p-4 shadow-lg shadow-indigo-500/5 hover:shadow-indigo-500/10 transition-shadow">
                    <button
                      onClick={() => setShowColors((v) => !v)}
                      className="w-full flex items-center justify-between text-sm font-semibold text-slate-700 cursor-pointer"
                    >
                      <span className="flex items-center gap-2 sm:gap-3">
                        <span className="bg-linear-to-r from-slate-700 to-slate-600 bg-clip-text text-transparent text-xs sm:text-sm">
                          Accent Color
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded-md">
                          {data.accentColor}
                        </span>
                      </span>
                      <motion.svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        animate={{ rotate: showColors ? 180 : 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </motion.svg>
                    </button>

                    <AnimatePresence mode="wait">
                      {showColors && (
                        <motion.div
                          className="mt-3 pt-3 border-t border-indigo-100/50"
                          initial={{ opacity: 0, height: 0, y: -10 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -10 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <motion.div
                            className="flex flex-wrap gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.2 }}
                          >
                            {COLOR_PALETTES.map((p, idx) => (
                              <motion.button
                                key={p.value}
                                title={p.label}
                                onClick={() =>
                                  setData((d) => ({
                                    ...d,
                                    accentColor: p.value,
                                  }))
                                }
                                className={`group relative w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-all duration-200 ${
                                  data.accentColor === p.value
                                    ? "ring-2 ring-offset-2 ring-indigo-600 scale-110 shadow-lg"
                                    : "hover:scale-110"
                                }`}
                                style={{ background: p.value }}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  delay: 0.05 * idx,
                                  duration: 0.2,
                                }}
                              >
                                {data.accentColor === p.value && (
                                  <svg
                                    className="absolute inset-0 m-auto w-2.5 h-2.5 sm:w-3 sm:h-3 text-white drop-shadow"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                )}
                              </motion.button>
                            ))}

                            <motion.label
                              className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden cursor-pointer ring-2 ring-slate-200 hover:ring-indigo-300 transition-all hover:scale-110"
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                delay: 0.05 * COLOR_PALETTES.length,
                                duration: 0.2,
                              }}
                            >
                              <input
                                type="color"
                                value={data.accentColor || "#6366f1"}
                                onChange={(e) =>
                                  setData((d) => ({
                                    ...d,
                                    accentColor: e.target.value,
                                  }))
                                }
                                className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
                              />
                              <div className="absolute inset-0 bg-linear-to-br from-slate-300 to-slate-400 flex items-center justify-center">
                                <svg
                                  className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                                  />
                                </svg>
                              </div>
                            </motion.label>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Font Picker */}
                  <div className="w-full sm:flex-1 h-fit bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl border border-indigo-100/60 p-3 sm:p-4 shadow-lg shadow-indigo-500/5 hover:shadow-indigo-500/10 transition-shadow">
                    <button
                      onClick={() => setShowFonts((v) => !v)}
                      className="w-full flex items-center justify-between text-sm font-semibold text-slate-700 cursor-pointer"
                    >
                      <span className="flex items-center gap-2 sm:gap-3">
                        <motion.div
                          className="w-5 h-5 sm:w-6 sm:h-6 bg-linear-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center text-white text-[10px] sm:text-xs font-bold shadow-md"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          Aa
                        </motion.div>
                        <span className="bg-linear-to-r from-slate-700 to-slate-600 bg-clip-text text-transparent text-xs sm:text-sm">
                          Typography
                        </span>
                        <motion.span
                          className="text-[10px] sm:text-xs text-slate-600 bg-slate-100 px-1.5 sm:px-2 py-0.5 rounded-md truncate max-w-25 sm:max-w-none"
                          style={{ fontFamily: `'${data.fontFamily}'` }}
                          animate={{
                            backgroundColor: showFonts
                              ? "rgb(224, 231, 255)"
                              : "rgb(241, 245, 249)",
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {data.fontFamily}
                        </motion.span>
                      </span>
                      <motion.svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        animate={{ rotate: showFonts ? 180 : 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </motion.svg>
                    </button>

                    <AnimatePresence mode="wait">
                      {showFonts && (
                        <motion.div
                          className="mt-3 max-h-48 overflow-y-auto"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <motion.div
                            className="space-y-1.5 pt-2 border-t border-indigo-100/50 overflow-x-hidden"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.2 }}
                          >
                            {FONT_FAMILIES.map((f, idx) => (
                              <motion.button
                                key={f.id}
                                onClick={() =>
                                  setData((d) => ({ ...d, fontFamily: f.id }))
                                }
                                className={`w-full overflow-x-hidden flex items-center justify-between px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm transition-all duration-200 ${
                                  data.fontFamily === f.id
                                    ? "bg-linear-to-r from-indigo-50 to-violet-50 border border-indigo-200 shadow-md"
                                    : "hover:bg-slate-50 border border-transparent"
                                }`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  delay: idx * 0.03,
                                  duration: 0.2,
                                }}
                                whileHover={{ scale: 1.02, x: 4 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                                  <motion.div
                                    className={`w-0.5 sm:w-1 h-4 sm:h-5 rounded-full transition-all ${data.fontFamily === f.id ? "bg-linear-to-b from-indigo-600 to-violet-600" : "bg-transparent"}`}
                                    animate={{
                                      height: data.fontFamily === f.id ? 16 : 0,
                                      opacity: data.fontFamily === f.id ? 1 : 0,
                                    }}
                                    transition={{ duration: 0.2 }}
                                  />
                                  <span
                                    className={`${data.fontFamily === f.id ? "font-semibold text-indigo-700" : "text-slate-700"} truncate`}
                                    style={{
                                      fontFamily: `'${f.id}',${f.style}`,
                                    }}
                                  >
                                    {f.label}
                                  </span>
                                </div>
                                <span className="text-[8px] sm:text-[10px] text-slate-400 font-mono bg-slate-100 px-1 sm:px-1.5 py-0.5 rounded ml-2 shrink-0">
                                  {f.style}
                                </span>
                              </motion.button>
                            ))}
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Template Grid Section */}
                <div className="mb-2">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-700">
                      Professional Templates
                      <span className="ml-2 text-[10px] sm:text-xs font-normal text-slate-400">
                        ({TEMPLATE_DEFS.length} available)
                      </span>
                    </h3>
                    {(!isLoggedIn || !isPremium) && (
                      <div className="text-[10px] sm:text-[11px] text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">
                        🔒 templates locked
                      </div>
                    )}
                  </div>

                  {/* Responsive Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                    {TEMPLATE_DEFS.map((t, idx) => (
                      <motion.div
                        key={t.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.3 }}
                      >
                        <TemplateCard
                          template={t}
                          selected={tplId === t.id}
                          onClick={() => setTplId(t.id)}
                          showLock={!isLoggedIn || !isPremium}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </>
            )}
            {/* ─────────────────────────────────────
                STEP 2: PERSONAL INFORMATION
            ───────────────────────────────────── */}
            {step === "personal" && (
              <div className="space-y-4">
                {/* Card: Basic Information + Online Presence (Merged) */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="flex items-center gap-3 px-4 md:px-5 py-4 bg-linear-to-r from-indigo-50/60 to-white border-b border-slate-50">
                    <div className="w-8 h-8 bg-linear-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-500/25">
                      <FiUser className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[13px] font-extrabold text-slate-800 leading-none">
                        Personal Information
                      </p>
                      <p className="text-[10.5px] text-slate-400 mt-0.5">
                        Your details and online presence
                      </p>
                    </div>
                  </div>
                  <div className="p-4 md:p-5">
                    {/* Basic Info Section */}
                    <div className="">
                      <p className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wide mb-3">
                        Basic Information
                      </p>
                      <div className="grid sm:grid-cols-2 gap-x-4">
                        <F label="Full Name" required icon={FiUser}>
                          <input
                            className={`${inp}`}
                            placeholder="Alexandra Chen"
                            value={data.personal.fullName}
                            onChange={(e) =>
                              set(["personal", "fullName"], e.target.value)
                            }
                          />
                        </F>
                        <F label="Professional Title" icon={FiBriefcase}>
                          <input
                            className={`${inp}`}
                            placeholder="Senior UX Designer"
                            value={data.personal.title}
                            onChange={(e) =>
                              set(["personal", "title"], e.target.value)
                            }
                          />
                        </F>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-x-4">
                        <F label="Email Address" required icon={FiMail}>
                          <input
                            className={`${inp}`}
                            type="email"
                            placeholder="alex@email.com"
                            value={data.personal.email}
                            onChange={(e) =>
                              set(["personal", "email"], e.target.value)
                            }
                          />
                        </F>
                        <F label="Phone Number" icon={FiPhone}>
                          <input
                            className={`${inp}`}
                            type="tel"
                            placeholder="+1 555 000 0000"
                            value={data.personal.phone}
                            onChange={(e) =>
                              set(["personal", "phone"], e.target.value)
                            }
                          />
                        </F>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-x-4">
                        <F label="Location" icon={FiMapPin}>
                          <input
                            className={`${inp}`}
                            placeholder="San Francisco, CA"
                            value={data.personal.location}
                            onChange={(e) =>
                              set(["personal", "location"], e.target.value)
                            }
                          />
                        </F>
                        <F label="LinkedIn URL" icon={FiLink}>
                          <input
                            className={`${inp}`}
                            placeholder="linkedin.com/in/alexchen"
                            value={data.personal.linkedin}
                            onChange={(e) =>
                              set(["personal", "linkedin"], e.target.value)
                            }
                          />
                        </F>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-x-4">
                        <F label="GitHub" icon={FiGithub}>
                          <input
                            className={`${inp}`}
                            placeholder="github.com/alexchen"
                            value={data.personal.github}
                            onChange={(e) =>
                              set(["personal", "github"], e.target.value)
                            }
                          />
                        </F>
                        <F label="Portfolio / Website" icon={FiGlobe}>
                          <input
                            className={`${inp}`}
                            placeholder="alexchen.io"
                            value={data.personal.website}
                            onChange={(e) =>
                              set(["personal", "website"], e.target.value)
                            }
                          />
                        </F>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card: Closing Salutation */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-4 bg-linear-to-r from-emerald-50/40 to-white border-b border-slate-50">
                    <div className="w-8 h-8 shrink-0 bg-linear-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md shadow-emerald-500/25 text-base">
                      ✍️
                    </div>
                    <div>
                      <p className="text-[13px] font-extrabold text-slate-800 leading-none">
                        Closing Salutation
                      </p>
                      <p className="text-[10.5px] text-slate-400 mt-0.5">
                        Standard business letter closing above your name
                      </p>
                    </div>
                  </div>
                  <div className="p-4 md:p-5">
                    <div className="flex  gap-2 mb-3 overflow-x-auto">
                      {[
                        "Sincerely",
                        "Best regards",
                        "Kind regards",
                        "Yours faithfully",
                        "Warm regards",
                      ].map((s) => (
                        <button
                          key={s}
                          onClick={() => set(["personal", "signature"], s)}
                          className={`shrink-0 px-3 py-1.5 rounded-full text-[12px] font-semibold border-[1.5px] transition-all cursor-pointer
                ${data.personal.signature === s ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-slate-200 text-slate-500 hover:border-indigo-200"}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    <input
                      className={inp}
                      placeholder="Or type your own…"
                      value={data.personal.signature}
                      onChange={(e) =>
                        set(["personal", "signature"], e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ─────────────────────────────────────
                STEP 3: COMPANY DETAILS
            ───────────────────────────────────── */}
            {step === "company" && (
              <div className="space-y-4">
                {/* Card: Employer Details */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="flex items-center gap-3 px-4 md:px-5 py-4 bg-linear-to-r from-indigo-50/60 to-white border-b border-slate-50">
                    <div className="w-8 h-8 bg-linear-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shrink-0 shadow-md shadow-indigo-500/25">
                      <FiBriefcase className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[13px] font-extrabold text-slate-800 leading-none">
                        Employer Details
                      </p>
                      <p className="text-[10.5px] text-slate-400 mt-0.5">
                        Company information and hiring contact
                      </p>
                    </div>
                  </div>

                  <div className="p-4 md:p-5">
                    {/* Company Info Sub-section */}
                    <div className="">
                      <div className="">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                          <F label="Manager Name" icon={FiUser}>
                            <input
                              className={inp}
                              placeholder="e.g., Sarah Johnson"
                              value={data.company.hiringManager}
                              onChange={(e) =>
                                set(
                                  ["company", "hiringManager"],
                                  e.target.value,
                                )
                              }
                            />
                          </F>
                          <F label="Their Title" icon={FiBriefcase}>
                            <input
                              className={inp}
                              placeholder="e.g., Head of Design"
                              value={data.company.hiringManagerTitle}
                              onChange={(e) =>
                                set(
                                  ["company", "hiringManagerTitle"],
                                  e.target.value,
                                )
                              }
                            />
                          </F>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                          <F label="Department" icon={FiGrid}>
                            <input
                              className={inp}
                              placeholder="e.g., Product Design, Engineering"
                              value={data.company.department}
                              onChange={(e) =>
                                set(["company", "department"], e.target.value)
                              }
                            />
                          </F>
                          <F label="Company Name" icon={FiBriefcase}>
                            <input
                              className={inp}
                              placeholder="e.g., Google, Stripe, Airbnb"
                              value={data.company.name}
                              onChange={(e) =>
                                set(["company", "name"], e.target.value)
                              }
                            />
                          </F>
                        </div>

                        <div>
                          <F label="Company Location" icon={FiMapPin}>
                            <div className="grid grid-cols-1 space-y-4 sm:space-y-0 sm:grid-cols-3 gap-x-4 ">
                              <input
                                className={inp}
                                placeholder="City"
                                value={data.company.city}
                                onChange={(e) =>
                                  set(["company", "city"], e.target.value)
                                }
                              />
                              <input
                                className={inp}
                                placeholder="State"
                                value={data.company.state}
                                onChange={(e) =>
                                  set(["company", "state"], e.target.value)
                                }
                              />
                              <input
                                className={inp}
                                placeholder="Country"
                                value={data.company.country}
                                onChange={(e) =>
                                  set(["company", "country"], e.target.value)
                                }
                              />
                            </div>
                          </F>
                        </div>

                        <div>
                          <F
                            label="Referred By"
                            icon={FiLink}
                            hint="💡 Referrals appear as a note in the letter"
                          >
                            <input
                              className={inp}
                              placeholder="e.g., John Smith, VP Engineering"
                              value={data.company.referral}
                              onChange={(e) =>
                                set(["company", "referral"], e.target.value)
                              }
                            />
                          </F>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card: Letter Date */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-5 py-4 bg-linear-to-r from-emerald-50/40 to-white">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-linear-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/25">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[13px] font-extrabold text-slate-800 leading-none">
                          Letter Date
                        </p>
                        <p className="text-[10.5px] text-slate-400 mt-0.5">
                          Current date will be used if left empty
                        </p>
                      </div>
                    </div>
                    <input
                      className="px-3 py-2 text-[12.5px] font-medium border-[1.5px] border-slate-200 rounded-xl outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 bg-white text-slate-700 cursor-pointer w-full sm:w-auto"
                      type="date"
                      value={data.letterDate}
                      onChange={(e) => set(["letterDate"], e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ─────────────────────────────────────
                STEP 4: LETTER CONTENT
            ───────────────────────────────────── */}
            {step === "content" && (
              <div className="space-y-4">
                {/* 1-page tip banner */}
                <div className="bg-linear-to-r from-indigo-50 to-violet-50 border border-indigo-200 rounded-2xl p-3.5 flex items-start gap-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0 text-base">
                    {/* <downimen */}
                    <IoDocumentText className="text-indigo-500 text-2xl" />
                  </div>
                  <div>
                    <p className="text-[12.5px] font-bold text-indigo-800 leading-tight mb-1">
                      One Page Maximum
                    </p>
                    <p className="text-[11px] text-indigo-700 leading-relaxed">
                      Best practices for length:
                      <br />
                      <strong>•</strong> Opening: Introduce yourself
                      <br />
                      <strong>•</strong> Middle: Highlight key achievements
                      <br />
                      <strong>•</strong> Closing: Explain why this company
                    </p>
                  </div>
                </div>

                {/* Rich text editor */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                  <p className="text-[10px] font-extrabold tracking-widest uppercase text-indigo-500 mb-3">
                    Your Letter
                  </p>
                  <Editor
                    headerTemplate={
                      <div className="flex gap-1 p-2 flex-wrap items-center bg-gray-50 border-b border-gray-200">
                        <button
                          type="button"
                          className="ql-bold p-1.5 hover:bg-gray-200 rounded transition"
                        >
                          B
                        </button>
                        <button
                          type="button"
                          className="ql-italic p-1.5 hover:bg-gray-200 rounded transition"
                        >
                          I
                        </button>
                        <button
                          type="button"
                          className="ql-underline p-1.5 hover:bg-gray-200 rounded transition"
                        >
                          U
                        </button>

                        <button
                          type="button"
                          className="ql-clean p-1.5 hover:bg-gray-200 rounded transition"
                        >
                          ⌫
                        </button>
                      </div>
                    }
                    value={data.letterContent}
                    onTextChange={(e) =>
                      setData((p) => ({
                        ...p,
                        letterContent: e.htmlValue || "",
                      }))
                    }
                    style={{ minHeight: "300px" }}
                    placeholder="Start writing here… Keep it concise — 3 to 4 short paragraphs only."
                  />
                </div>
              </div>
            )}

            {/* ─────────────────────────────────────
                STEP 5: REVIEW
            ───────────────────────────────────── */}
            {step === "review" && (
              <div className="space-y-4 sm:space-y-5">
                {/* Main Review Card */}
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="p-4 sm:p-5 md:p-6">
                    <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-xl sm:text-2xl shadow-lg shadow-emerald-500/25">
                        ✅
                      </div>
                      <div>
                        <p className="text-[15px] sm:text-[16px] md:text-[18px] font-extrabold text-slate-900 leading-tight">
                          Review & Confirm
                        </p>
                        <p className="text-[11px] sm:text-[11.5px] text-slate-400">
                          Verify all information before downloading
                        </p>
                      </div>
                    </div>

                    {/* Review Sections - Organized by categories */}
                    <div className="space-y-5 sm:space-y-6">
                      {/* Template & Design Section */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-1 h-4 bg-linear-to-b from-indigo-600 to-violet-600 rounded-full"></div>
                          <p className="text-[10.5px] font-bold uppercase tracking-wider text-indigo-600">
                            Design Settings
                          </p>
                        </div>
                        <div className="space-y-1">
                          {(
                            [
                              ["Template", tpl?.name, "template"],
                              ["Accent Color", data.accentColor, "template"],
                              ["Font", data.fontFamily, "template"],
                            ] as [string, string, Step][]
                          ).map(([label, value, step]) => (
                            <div
                              key={label}
                              className="flex flex-col sm:flex-row sm:items-center justify-between py-2.5 border-b border-slate-50 last:border-0 gap-2 sm:gap-0"
                            >
                              <span className="text-[10px] sm:text-[10.5px] font-extrabold uppercase tracking-[0.5px] text-slate-400">
                                {label}
                              </span>
                              <div className="flex items-center gap-2 sm:gap-3">
                                {label === "Accent Color" && value && (
                                  <span
                                    className="w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm"
                                    style={{ background: value }}
                                  />
                                )}
                                <span
                                  className={`text-[11.5px] sm:text-[12.5px] font-medium text-right ${
                                    value ? "text-slate-700" : "text-slate-300"
                                  }`}
                                  style={{
                                    fontFamily:
                                      label === "Font" && value
                                        ? `'${value}'`
                                        : undefined,
                                  }}
                                >
                                  {value || "Not selected"}
                                </span>
                                <button
                                  onClick={() => setStep(step)}
                                  className="text-[10px] sm:text-[11px] font-semibold text-indigo-500 hover:text-indigo-700 transition-colors"
                                >
                                  Edit →
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Personal Information Section */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-1 h-4 bg-linear-to-b from-indigo-600 to-violet-600 rounded-full"></div>
                          <p className="text-[10.5px] font-bold uppercase tracking-wider text-indigo-600">
                            Personal Details
                          </p>
                        </div>
                        <div className="space-y-1">
                          {(
                            [
                              ["Full Name", data.personal.fullName, "personal"],
                              ["Title", data.personal.title, "personal"],
                              ["Email", data.personal.email, "personal"],
                              ["Phone", data.personal.phone, "personal"],
                              ["Location", data.personal.location, "personal"],
                              ["LinkedIn", data.personal.linkedin, "personal"],
                            ] as [string, string, Step][]
                          ).map(([label, value, step]) => (
                            <div
                              key={label}
                              className="flex flex-col sm:flex-row sm:items-center justify-between py-2.5 border-b border-slate-50 last:border-0 gap-2 sm:gap-0"
                            >
                              <span className="text-[10px] sm:text-[10.5px] font-extrabold uppercase tracking-[0.5px] text-slate-400">
                                {label}
                              </span>
                              <div className="flex items-center gap-2 sm:gap-3">
                                <span
                                  className={`text-[11.5px] sm:text-[12.5px] font-medium text-right max-w-50 sm:max-w-62.5 truncate ${
                                    value ? "text-slate-700" : "text-slate-300"
                                  }`}
                                >
                                  {value || "Not provided"}
                                </span>
                                <button
                                  onClick={() => setStep(step)}
                                  className="text-[10px] sm:text-[11px] font-semibold text-indigo-500 hover:text-indigo-700 transition-colors shrink-0 cursor-pointer"
                                >
                                  Edit →
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Company Information Section */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-1 h-4 bg-linear-to-b from-indigo-600 to-violet-600 rounded-full"></div>
                          <p className="text-[10.5px] font-bold uppercase tracking-wider text-indigo-600">
                            Company Details
                          </p>
                        </div>
                        <div className="space-y-1">
                          {(
                            [
                              ["Company", data.company.name, "company"],
                              ["Role", data.company.jobTitle, "company"],
                              [
                                "Department",
                                data.company.department,
                                "company",
                              ],
                              [
                                "Manager",
                                data.company.hiringManager,
                                "company",
                              ],
                              [
                                "Location",
                                [
                                  data.company.city,
                                  data.company.state,
                                  data.company.country,
                                ]
                                  .filter(Boolean)
                                  .join(", "),
                                "company",
                              ],
                              ["Letter Date", data.letterDate, "company"],
                              ["Referred By", data.company.referral, "company"],
                            ] as [string, string, Step][]
                          ).map(([label, value, step]) => (
                            <div
                              key={label}
                              className="flex flex-col sm:flex-row sm:items-center justify-between py-2.5 border-b border-slate-50 last:border-0 gap-2 sm:gap-0"
                            >
                              <span className="text-[10px] sm:text-[10.5px] font-extrabold uppercase tracking-[0.5px] text-slate-400">
                                {label}
                              </span>
                              <div className="flex items-center gap-2 sm:gap-3">
                                <span
                                  className={`text-[11.5px] sm:text-[12.5px] font-medium text-right max-w-50 sm:max-w-62.5 truncate ${
                                    value ? "text-slate-700" : "text-slate-300"
                                  }`}
                                >
                                  {value || "Not provided"}
                                </span>
                                <button
                                  onClick={() => setStep(step)}
                                  className="text-[10px] sm:text-[11px] font-semibold text-indigo-500 hover:text-indigo-700 transition-colors shrink-0 cursor-pointer"
                                >
                                  Edit →
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Content Section */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-1 h-4 bg-linear-to-b from-indigo-600 to-violet-600 rounded-full"></div>
                          <p className="text-[10.5px] font-bold uppercase tracking-wider text-indigo-600">
                            Letter Content
                          </p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2.5 gap-2 sm:gap-0">
                            <span className="text-[10px] sm:text-[10.5px] font-extrabold uppercase tracking-[0.5px] text-slate-400">
                              Content
                            </span>
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className="flex items-center gap-1.5">
                                {data.letterContent ? (
                                  <>
                                    <span className="text-emerald-500 text-sm">
                                      ✓
                                    </span>
                                    <span className="text-[11.5px] sm:text-[12.5px] font-medium text-emerald-700">
                                      Written ({data.letterContent.length}{" "}
                                      chars)
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span className="text-amber-500 text-sm">
                                      ⚠
                                    </span>
                                    <span className="text-[11.5px] sm:text-[12.5px] font-medium text-amber-600">
                                      Empty - Content missing
                                    </span>
                                  </>
                                )}
                              </div>
                              <button
                                onClick={() => setStep("content")}
                                className="text-[10px] sm:text-[11px] font-semibold text-indigo-500 hover:text-indigo-700 transition-colors shrink-0 cursor-pointer"
                              >
                                Edit →
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Warning if content missing */}
                {!data.letterContent && (
                  <div className="flex items-start gap-2 p-3 sm:p-4 bg-amber-50 rounded-xl sm:rounded-2xl border border-amber-200">
                    <span className="text-amber-500 text-sm mt-0.5">⚠️</span>
                    <div className="flex-1">
                      <p className="text-[11px] sm:text-[12px] font-semibold text-amber-800">
                        Content Missing
                      </p>
                      <p className="text-[10px] sm:text-[10.5px] text-amber-700">
                        Please add your cover letter content before downloading
                      </p>
                    </div>
                    <button
                      onClick={() => setStep("content")}
                      className="text-[10px] sm:text-[11px] cursor-pointer font-semibold text-amber-700 hover:text-amber-900 underline"
                    >
                      Add Content →
                    </button>
                  </div>
                )}

                   {/* <div className="p-4 mt-5 bg-linear-to-r from-indigo-50 to-violet-50 rounded-2xl border border-indigo-100">
              <p className="text-[13.5px] font-bold text-slate-900 mb-1">
                ✅ Ready to Download
              </p>
              <p className="text-[12px] text-slate-500 mb-3">
                Download your cover letter as a high-quality PDF. Keep it to 1
                page for best results.
              </p>
              <button
                onClick={downloadPDF}
                disabled={busy}
                className="w-full py-3 bg-linear-to-r from-indigo-600 to-violet-600 text-white font-bold text-[13.5px] rounded-xl shadow-md cursor-pointer hover:shadow-lg disabled:opacity-50 transition-all"
              >
                {busy ? "⏳ Generating…" : "⬇ Download PDF"}
              </button>
            </div> */}
              </div>
            )}

         
          </div>

          {/* ── FOOTER NAV — Back / Continue ── */}
          <div className="shrink-0 px-3 sm:px-4 md:px-5 pt-2 sm:py-3 border-t border-slate-200 bg-white flex justify-between items-center gap-3">
            <button
              onClick={() =>
                stepIdx === 0
                  ? router.push("/")
                  : setStep(STEPS[stepIdx - 1].id)
              }
              className="flex items-center gap-1.5 px-3 md:px-4 py-2.5 rounded-full text-[13px] font-semibold md:font-bold border-[1.5px] border-slate-200 bg-white text-slate-500 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-all cursor-pointer"
            >
              ← {stepIdx > 0 ? "Back" : "Home"}
            </button>
            {stepIdx < STEPS.length - 1 ? (
              <button
                onClick={handleContinue}
                className="flex items-center gap-2 px-4 md:px-6 py-2.5 rounded-full text-[13.5px] font-semibold bg-linear-to-r from-indigo-600 to-violet-600 text-white shadow-md hover:shadow-lg hover:-translate-y-px transition-all cursor-pointer"
              >
                Continue to {STEPS[stepIdx + 1].label}{" "}
                <span className="max-sm:hidden">
                  {(!isLoggedIn || !isPremium) && step === "template"
                    ? "🔒"
                    : "→"}
                </span>
              </button>
            ) : (
              <button
                onClick={downloadPDF}
                disabled={busy}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-[13.5px] font-extrabold bg-linear-to-r from-indigo-600 to-violet-600 text-white shadow-md hover:shadow-lg hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all cursor-pointer"
              >
                {busy ? "⏳ Generating…" : "⬇ Download PDF"}
              </button>
              
            )}
          </div>
        </div>

        {/* ════════════════════════════════
            RIGHT PANEL — LIVE CANVAS PREVIEW
        ════════════════════════════════ */}
        <div className="hidden lg:flex flex-col bg-linear-to-br from-slate-50 to-slate-100 overflow-hidden shadow-inner">
          {/* Preview toolbar - Premium redesign */}
          <div className="shrink-0 bg-white/95 backdrop-blur-sm border-b border-slate-200/80 px-4 sm:px-5 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 live-dot" />

              <div>
                <p className="text-[13px] font-extrabold bg-linear-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent leading-tight">
                  Live Preview
                </p>
                <p className="text-[10px] text-slate-400 flex items-center gap-1">
                  <span className="hidden sm:inline">Drag to pan ·</span>
                  <span className="hidden sm:inline">
                    Ctrl+scroll to zoom ·
                  </span>
                  Scroll to navigate
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {step !== "template" && (
                <motion.button
                  onClick={() => setStep("template")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-linear-to-r from-indigo-50 to-indigo-100 border border-indigo-200 text-indigo-600 hover:from-indigo-100 hover:to-indigo-200 transition-all cursor-pointer shadow-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiLayout className="w-3.5 h-3.5" />
                  <span className="inline">Change</span>
                </motion.button>
              )}

              <motion.button
                onClick={() => {
                  rebuild();
                  setModal(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold border-[1.5px] border-slate-300 bg-white text-slate-600 cursor-pointer hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 transition-all shadow-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <SlSizeFullscreen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Fullscreen</span>
                <span className="sm:hidden">Expand</span>
              </motion.button>
            </div>
          </div>

          {/* Canvas area with improved styling */}
          <div className="flex-1 overflow-hidden relative">
            <CanvasPreview>
              {(iframeH) =>
                html && (
                  <iframe
                    ref={liveRef}
                    className="canvas-iframe shadow-lg"
                    scrolling="no"
                    style={{
                      height: iframeH,
                      background: "white",
                      borderRadius: "8px",
                      boxShadow:
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    }}
                    title="preview"
                    sandbox="allow-same-origin"
                  />
                )
              }
            </CanvasPreview>
          </div>
        </div>
      </div>

      {/* ── MOBILE FAB — eye button to open fullscreen preview ── */}
      <button
        onClick={() => {
          rebuild();
          setModal(true);
        }}
        className="lg:hidden fixed top-17.5 right-3 z-50 bg-linear-to-r from-indigo-600 to-violet-600 text-white p-2 md:p-2.5 rounded-full shadow-xl"
      >
        <FiEye className="w-3 h-3 md:w-4 md:h-4" />
      </button>

      {/* ── FULLSCREEN MODAL PREVIEW ── */}
      <AnimatePresence mode="wait">
        {modal && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-[14px] z-1000 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setModal(false)}
          >
            <motion.div
              className="w-full max-w-245 h-[92vh] rounded-2xl bg-white overflow-hidden flex flex-col shadow-[0_48px_100px_rgba(0,0,0,.48)]"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                duration: 0.3,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="shrink-0 h-14 px-4 md:px-5 bg-white border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 max-sm:hidden rounded-[9px] bg-linear-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-sm text-white">
                    📄
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold md:font-extrabold text-slate-900 leading-tight">
                      Cover Letter Preview
                    </p>
                   
                  </div>
                </div>
                <button
                                      onClick={() => setStep("template")}

                    className="flex items-center gap-1 px-2 py-1 bg-indigo-50 rounded-lg text-indigo-600 text-xs font-medium lg:hidden"
                  >
                    <FiLayout className="w-3 h-3" />
                    Change 
                  </button>
                <motion.button
                  onClick={() => setModal(false)}
                  className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 text-slate-400 hover:bg-red-50 hover:text-red-500 flex items-center justify-center text-[16px] transition-all cursor-pointer"
                  whileHover={{ scale: 1.05, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  ✕
                </motion.button>
              </div>



              {/* Modal canvas */}
              <div className="flex-1 overflow-hidden bg-slate-100">
                <CanvasPreview>
                  {(iframeH) =>
                    html ? (
                      <motion.iframe
                        ref={modalRef}
                        className="modal-iframe"
                        scrolling="no"
                        style={{ height: iframeH }}
                        title="full-preview"
                        sandbox="allow-same-origin"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: 0.1, duration: 0.2 }}
                      />
                    ) : (
                      <motion.div
                        className="w-215 bg-white flex items-center justify-center text-slate-400"
                        style={{ height: iframeH }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: 0.1, duration: 0.2 }}
                      >
                        <span className="text-5xl opacity-20">📄</span>
                      </motion.div>
                    )
                  }
                </CanvasPreview>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── TOAST NOTIFICATION ── */}
      {toast && (
        <div className="toast-anim fixed bottom-6 left-1/2 -translate-x-1/2 z-9999 bg-slate-900 text-white px-6 py-2.5 rounded-full text-[13px] font-bold shadow-xl whitespace-nowrap">
          {toast}
        </div>
      )}
    </>
  );
}
