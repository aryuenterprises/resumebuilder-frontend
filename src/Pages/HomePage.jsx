import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Faq from "./Faq";
import Resume_sider from "./Resume_sider";
import HomeHero from "../Componets/home/HomeHero";
import HomeBeforeAfter from "../Componets/home/HomeBeforeAfter";
import HomeTrustedBy from "../Componets/home/HomeTrustedBy";
import HomeWhyChooseUs from "../Componets/home/HomeWhyChooseUs";
import Testimonial from "../Componets/common/Testimonial";
import CTA from "../Componets/common/CTA";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 font-poppins red-scrollbar">
      <Header />
      <HomeHero />
      <HomeBeforeAfter />
      <HomeTrustedBy />
      <Resume_sider />
      <HomeWhyChooseUs />
      <Testimonial />
      <Faq />
      <CTA />
      <Footer />
    </div>
  );
}
