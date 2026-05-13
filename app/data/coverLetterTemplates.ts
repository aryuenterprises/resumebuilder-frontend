// ─────────────────────────────────────────────────────────────────────────────
// Cover Letter Template Data
// ─────────────────────────────────────────────────────────────────────────────
// Structure mirrors the resume templateData so you can manage both the same way.
//
// HOW TO ADD A NEW TEMPLATE:
//   1. Take a screenshot of the rendered cover letter (in browser or PDF)
//   2. Save it to /public/images/cover-letters/  (e.g. cl-aurora.jpg)
//   3. Add an entry below with the matching `id` that buildHTML() uses
//
// The `id` field MUST match the id string used in:
//   • TEMPLATES array in CoverLetterGenerator
//   • buildHTML(id, ...) switch/if logic
// ─────────────────────────────────────────────────────────────────────────────

export interface CoverLetterTemplate {
  id: string;          // matches buildHTML() id and TEMPLATES[].id
  name: string;        // display name shown under thumbnail
  tag: string;         // category pill label
  tier: "free" | "premium";  // "free" shows no lock, "premium" shows lock icon
  image: string;       // path inside /public — e.g. "/images/cover-letters/cl-aurora.jpg"
  description: string; // short tagline shown on hover / in review step
}

export const coverLetterTemplateData: CoverLetterTemplate[] = [
  // ── Modern ────────────────────────────────────────────────
  {
    id: "aurora",
    name: "Aurora",
    tag: "Modern",
    tier: "free",
    image: "/images/cover-letters/cl-aurora.jpg",
    description: "Gradient header with chip-style contact row. Clean and bold.",
  },
  {
    id: "prism",
    name: "Prism",
    tag: "Modern",
    tier: "premium",
    image: "/images/cover-letters/cl-prism.jpg",
    description: "Angled geometric header with a navy accent band.",
  },
  {
    id: "frost",
    name: "Frost",
    tag: "Modern",
    tier: "premium",
    image: "/images/cover-letters/cl-frost.jpg",
    description: "Glassmorphism card on a soft blue gradient background.",
  },
  {
    id: "canvas",
    name: "Canvas",
    tag: "Modern",
    tier: "premium",
    image: "/images/cover-letters/cl-canvas.jpg",
    description: "Thick left accent bar with a clean white layout.",
  },
  {
    id: "gradient",
    name: "Gradient",
    tag: "Modern",
    tier: "premium",
    image: "/images/cover-letters/cl-gradient.jpg",
    description: "Subtle gradient wash from left stripe across the page.",
  },
  {
    id: "vivid",
    name: "Vivid",
    tag: "Modern",
    tier: "premium",
    image: "/images/cover-letters/cl-vivid.jpg",
    description: "Bold dual-color gradient header with circular accent.",
  },
  {
    id: "nova",
    name: "Nova",
    tag: "Modern",
    tier: "premium",
    image: "/images/cover-letters/cl-nova.jpg",
    description: "Wave-cut header with pill contact chips.",
  },
  {
    id: "tidal",
    name: "Tidal",
    tag: "Modern",
    tier: "premium",
    image: "/images/cover-letters/cl-tidal.jpg",
    description: "Horizontal band layout with a compact info card.",
  },
  {
    id: "horizon",
    name: "Horizon",
    tag: "Modern",
    tier: "premium",
    image: "/images/cover-letters/cl-horizon.jpg",
    description: "Split header with a position card on the right.",
  },
  {
    id: "lumina",
    name: "Lumina",
    tag: "Modern",
    tier: "premium",
    image: "/images/cover-letters/cl-lumina.jpg",
    description: "Radial glow header with eyebrow text and accent bar.",
  },

  // ── Executive / Corporate ─────────────────────────────────
  {
    id: "obsidian_lite",
    name: "Obsidian",
    tag: "Executive",
    tier: "premium",
    image: "/images/cover-letters/cl-obsidian.jpg",
    description: "Light sidebar on the left with skills and contact info.",
  },
  {
    id: "slate",
    name: "Slate",
    tag: "Corporate",
    tier: "premium",
    image: "/images/cover-letters/cl-slate.jpg",
    description: "Monospace contact details, bold black rule, RE: subject line.",
  },
  {
    id: "architect",
    name: "Architect",
    tag: "Corporate",
    tier: "premium",
    image: "/images/cover-letters/cl-architect.jpg",
    description: "Split header with an applying-to card, light grey body.",
  },
  {
    id: "corporate",
    name: "Corporate",
    tag: "Corporate",
    tier: "premium",
    image: "/images/cover-letters/cl-corporate.jpg",
    description: "Navy header bar with accent stripe. Classic corporate.",
  },
  {
    id: "executive",
    name: "Executive",
    tag: "Executive",
    tier: "premium",
    image: "/images/cover-letters/cl-executive.jpg",
    description: "Full-width gradient header with chip contacts. Authoritative.",
  },
  {
    id: "titan",
    name: "Titan",
    tag: "Corporate",
    tier: "premium",
    image: "/images/cover-letters/cl-titan.jpg",
    description: "Thick left pillar accent, bold double rule header.",
  },
  {
    id: "oxford",
    name: "Oxford",
    tag: "Executive",
    tier: "premium",
    image: "/images/cover-letters/cl-oxford.jpg",
    description: "Double-rule centered serif header. Timeless editorial.",
  },
  {
    id: "summit",
    name: "Summit",
    tag: "Corporate",
    tier: "premium",
    image: "/images/cover-letters/cl-summit.jpg",
    description: "Dark header with badge card and accent contact bar.",
  },
  {
    id: "presidio",
    name: "Presidio",
    tag: "Executive",
    tier: "premium",
    image: "/images/cover-letters/cl-presidio.jpg",
    description: "Pill-shaped info row, clean top accent line.",
  },
  {
    id: "accord",
    name: "Accord",
    tag: "Corporate",
    tier: "premium",
    image: "/images/cover-letters/cl-accord.jpg",
    description: "Gradient wash header with bordered card on right.",
  },

  // ── Minimal / Clean ───────────────────────────────────────
  {
    id: "nordic",
    name: "Nordic",
    tag: "Minimal",
    tier: "premium",
    image: "/images/cover-letters/cl-nordic.jpg",
    description: "Serif name, accent underbar, clean whitespace.",
  },
  {
    id: "pearl",
    name: "Pearl",
    tag: "Minimal",
    tier: "premium",
    image: "/images/cover-letters/cl-pearl.jpg",
    description: "Ultra-clean with two hairline rules and a color title.",
  },
  {
    id: "minimal",
    name: "Minimal",
    tag: "Minimal",
    tier: "free",
    image: "/images/cover-letters/cl-minimal.jpg",
    description: "Maximum whitespace, hairline dividers, no decoration.",
  },
  {
    id: "zen",
    name: "Zen",
    tag: "Minimal",
    tier: "premium",
    image: "/images/cover-letters/cl-zen.jpg",
    description: "Warm beige tones, sparse layout, calm and focused.",
  },
  {
    id: "ivory",
    name: "Ivory",
    tag: "Classic",
    tier: "premium",
    image: "/images/cover-letters/cl-ivory.jpg",
    description: "Warm yellow background with amber left border accent.",
  },
  {
    id: "paper",
    name: "Paper",
    tag: "Classic",
    tier: "premium",
    image: "/images/cover-letters/cl-paper.jpg",
    description: "Old-paper texture, ruled margin, vintage feel.",
  },
  {
    id: "serif",
    name: "Serif",
    tag: "Classic",
    tier: "premium",
    image: "/images/cover-letters/cl-serif.jpg",
    description: "Newspaper double-rule header, centered serif name.",
  },
  {
    id: "editorial",
    name: "Editorial",
    tag: "Editorial",
    tier: "premium",
    image: "/images/cover-letters/cl-editorial.jpg",
    description: "Masthead style with color top bar and contact footer.",
  },
  {
    id: "linen",
    name: "Linen",
    tag: "Minimal",
    tier: "premium",
    image: "/images/cover-letters/cl-linen.jpg",
    description: "Warm linen background, soft accent bar, earthy tones.",
  },
  {
    id: "parchment",
    name: "Parchment",
    tag: "Classic",
    tier: "premium",
    image: "/images/cover-letters/cl-parchment.jpg",
    description: "Double color rule, centered serif, aged elegance.",
  },

  // ── Creative / Designer ───────────────────────────────────
  {
    id: "designer",
    name: "Designer",
    tag: "Creative",
    tier: "premium",
    image: "/images/cover-letters/cl-designer.jpg",
    description: "Light sidebar with glow circle motif. Portfolio-ready.",
  },
  {
    id: "motion",
    name: "Motion",
    tag: "Creative",
    tier: "premium",
    image: "/images/cover-letters/cl-motion.jpg",
    description: "Gradient top/bottom bars, condensed caps name.",
  },
  {
    id: "brushstroke",
    name: "Brushstroke",
    tag: "Creative",
    tier: "premium",
    image: "/images/cover-letters/cl-brushstroke.jpg",
    description: "Organic paint-stroke header. Artsy and expressive.",
  },
  {
    id: "studio",
    name: "Studio",
    tag: "Creative",
    tier: "premium",
    image: "/images/cover-letters/cl-studio.jpg",
    description: "Deep purple tones with gradient top bar. Studio aesthetic.",
  },
  {
    id: "folio",
    name: "Folio",
    tag: "Designer",
    tier: "premium",
    image: "/images/cover-letters/cl-folio.jpg",
    description: "Avatar icon + name side-by-side. Portfolio style.",
  },
  {
    id: "artboard",
    name: "Artboard",
    tag: "Designer",
    tier: "premium",
    image: "/images/cover-letters/cl-artboard.jpg",
    description: "Dashed border card. Looks like a design tool artboard.",
  },
  {
    id: "vortex",
    name: "Vortex",
    tag: "Designer",
    tier: "premium",
    image: "/images/cover-letters/cl-vortex.jpg",
    description: "Diagonal polygon cut header. Dynamic and bold.",
  },
  {
    id: "palette",
    name: "Palette",
    tag: "Creative",
    tier: "premium",
    image: "/images/cover-letters/cl-palette.jpg",
    description: "Vertical color stripe accent. Artist's palette feel.",
  },
  {
    id: "frame",
    name: "Frame",
    tag: "Designer",
    tier: "premium",
    image: "/images/cover-letters/cl-frame.jpg",
    description: "Color border frame around the entire letter. Gallery look.",
  },
  {
    id: "mosaic",
    name: "Mosaic",
    tag: "Creative",
    tier: "premium",
    image: "/images/cover-letters/cl-mosaic.jpg",
    description: "Tile mosaic icon in the header. Textured and modern.",
  },

  // ── Professional Premium ──────────────────────────────────
  {
    id: "blaze",
    name: "Blaze",
    tag: "Premium",
    tier: "premium",
    image: "/images/cover-letters/cl-blaze.jpg",
    description: "Fire gradient header with angled polygon cutout.",
  },
  {
    id: "radiant",
    name: "Radiant",
    tag: "Premium",
    tier: "premium",
    image: "/images/cover-letters/cl-radiant.jpg",
    description: "Radial glow in corner, thick left border accent.",
  },
  {
    id: "solstice",
    name: "Solstice",
    tag: "Premium",
    tier: "premium",
    image: "/images/cover-letters/cl-solstice.jpg",
    description: "Gradient wash header with bordered position card.",
  },
  {
    id: "meridian",
    name: "Meridian",
    tag: "Premium",
    tier: "premium",
    image: "/images/cover-letters/cl-meridian.jpg",
    description: "Double top/bottom rules, badge applying-to card.",
  },
  {
    id: "pinnacle",
    name: "Pinnacle",
    tag: "Premium",
    tier: "premium",
    image: "/images/cover-letters/cl-pinnacle.jpg",
    description: "Angled gradient header with circle light accent.",
  },

  // ── Tech ──────────────────────────────────────────────────
  {
    id: "circuit",
    name: "Circuit",
    tag: "Tech",
    tier: "premium",
    image: "/images/cover-letters/cl-circuit.jpg",
    description: "Grid background, pill contact badges. Developer-ready.",
  },
  {
    id: "blueprint",
    name: "Blueprint",
    tag: "Tech",
    tier: "premium",
    image: "/images/cover-letters/cl-blueprint.jpg",
    description: "Blue grid lines on light blue. Engineering blueprint.",
  },
  {
    id: "axiom",
    name: "Axiom",
    tag: "Tech",
    tier: "premium",
    image: "/images/cover-letters/cl-axiom.jpg",
    description: "Color top bar, gradient wash, double rule footer.",
  },
  {
    id: "signal",
    name: "Signal",
    tag: "Tech",
    tier: "premium",
    image: "/images/cover-letters/cl-signal.jpg",
    description: "Concentric arc motif in corner. Wireless / signal theme.",
  },
  {
    id: "quantum",
    name: "Quantum",
    tag: "Tech",
    tier: "premium",
    image: "/images/cover-letters/cl-quantum.jpg",
    description: "Corner accent triangle, gradient top-left header.",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Get a single template's data by its id */
export const getCLTemplate = (id: string): CoverLetterTemplate | undefined =>
  coverLetterTemplateData.find((t) => t.id === id);

/** All unique category tags */
export const getCLTemplateTags = (): string[] =>
  ["All", ...Array.from(new Set(coverLetterTemplateData.map((t) => t.tag)))];

/** Filter by tag (pass "All" to get everything) */
export const filterCLTemplates = (tag: string): CoverLetterTemplate[] =>
  tag === "All" ? coverLetterTemplateData : coverLetterTemplateData.filter((t) => t.tag === tag);
