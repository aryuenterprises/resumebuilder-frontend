import Image from "next/image";
import BeforeAfter from "../components/home/BeforeAfter";
import TrustedBy from "../components/home/TrustedBy";
import ResumeCarousel from "../components/home/ResumeCarousel";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Testimonial from "../components/sections/Testimonial";
import Faq from "../components/sections/FAQ";
import CTA from "../components/sections/CTA";
import Hero from "../components/home/Hero";


export default function Home() {
  return (
    <>
    <Hero/>
    <BeforeAfter/>
    <TrustedBy/>
    <ResumeCarousel/>
    <WhyChooseUs/>
    <Testimonial/>
    <Faq/>
    <CTA/>
    </>
  );
}
