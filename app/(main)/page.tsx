import dynamic from "next/dynamic";

// Simple dynamic imports - remove ssr: false option
const Testimonial = dynamic(
  () => import("../components/sections/Testimonial")
);

const Faq = dynamic(
  () => import("../components/sections/FAQ")
);

const CTATwo = dynamic(
  () => import("../components/sections/CTATwo")
);

// For components that need loading skeletons
const InteractiveAIDemo = dynamic(
  () => import("../components/home/InteractiveAIDemo").then((mod) => mod.InteractiveAIDemo),
  { loading: () => <div className="h-[400px] bg-gray-100 animate-pulse rounded-xl" /> }
);

const AIContentSuggestionsDemo = dynamic(
  () => import("../components/home/AIContentSuggestionsDemo").then((mod) => mod.AIContentSuggestionsDemo),
  { loading: () => <div className="h-[450px] bg-gray-100 animate-pulse rounded-xl" /> }
);

// Regular imports for other components (no dynamic needed)
import { HeroSection } from "../components/home/HeroSection";
import { BeforeAfterSection } from "../components/home/BeforeAfterSection";
import { TrustBar } from "../components/home/TrustBar";
import { ATSScoreSection } from "../components/home/ATSScoreSection";
import { ComparisonTable } from "../components/home/ComparisonTable";
import { FinalCTA } from "../components/home/FinalCTA";
import { WhyChooseUs } from "../components/home/WhyChooseUs";

export default function Home() {
  return (
    <>
      <HeroSection />
      <InteractiveAIDemo />
      <BeforeAfterSection />
      <AIContentSuggestionsDemo />
      <TrustBar />
      <ATSScoreSection />
      <ComparisonTable />
      <FinalCTA />
      <WhyChooseUs />
      <Testimonial />
      <CTATwo />
      <Faq />
    </>
  );
}
