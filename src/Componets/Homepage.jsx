// import React from "react";
// import Header from "../Pages/Header";
// import Carousel from "../Pages/Carousel";
// import BetterCV from "../Pages/Bettercv";
// import Resume_sider from "../Pages/Resume_sider";
// import Image1 from "../assets/images/Rectangle 1.svg";
// import Image2 from "../assets/images/Rectangle 2.svg";
// import Image3 from "../assets/images/Rectangle 4.svg";
// import Image4 from "../assets/images/Rectangle 3.svg";
// import Image6 from "../assets/images/resume6.svg.svg";
// import HomeImage from "../assets/images/home-resume.svg";
// import Faq from "../Pages/Faq";
// import BackImage from "../assets/images/backimage.webp";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import homegroup1 from "../assets/images/home-group1.svg";
// import homegroup2 from "../assets/images/home-group2.svg";
// import homegroup3 from "../assets/images/home-group3.svg";
// import homegroup4 from "../assets/images/home-group4.svg";
// import homegroup5 from "../assets/images/home-group5.png";

// import home1 from "../assets/images/home1.png";
// import home2 from "../assets/images/home2.png";
// import home3 from "../assets/images/home3.png";
// import home4 from "../assets/images/home4.png";
// import home5 from "../assets/images/home5.png";

// import doubleresume from "../assets/images/doubleresume.png";
// import Footer from "../Pages/Footer";

// function Homepage() {
//   const navigate = useNavigate();
//   const clickchoosetemplate = () => {
//     navigate("/choose-template");

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <div className="overflow-hidden">
//       <Header />

//       {/* home */}
//       <section className="relative bg-gradient-to-br from-[#edf9ff] via-white to-[#e8f4ff]">
//         {/* Background blobs */}
//         <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-red-400/30 rounded-full blur-3xl"></div>
//         <div className="absolute top-40 -right-40 w-[500px] h-[500px] bg-red-400/30 rounded-full blur-3xl"></div>

//         <div className="relative max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           {/* Left Content */}
//           <div>
//             <span className="inline-block mb-4 px-4 py-1 bg-blue-100 text-blue-600 rounded-full font-semibold">
//               #1 AI Resume Builder
//             </span>

//             <h1 className="font-roboto text-4xl md:text-6xl font-extrabold text-[#2e404a] leading-tight">
//               Build Your <span className="text-[#05A2FF]">Perfect Resume</span>
//               <br />
//               In Just 5 Minutes
//             </h1>

//             <p className="mt-6 text-lg text-gray-600 max-w-xl">
//               Create professional, ATS-friendly resumes with AI-powered content,
//               modern templates, and one-click export.
//             </p>

//             <div className="flex flex-wrap gap-4 mt-8">
//               <button
//                 onClick={clickchoosetemplate}
//                 className="px-8 py-4 bg-[#05A2FF] hover:bg-[#0589d5] text-white font-bold rounded-xl shadow-lg hover:scale-105 transition"
//               >
//                 Start Building Free
//               </button>

//               <button className="px-8 py-4 border border-blue-200 rounded-xl font-semibold hover:bg-blue-50 transition">
//                 View Templates
//               </button>
//             </div>

//             {/* Stats */}
//             <div className="mt-10 flex gap-10">
//               <div>
//                 <p className="text-3xl font-bold text-[#05A2FF]">120K+</p>
//                 <p className="text-gray-500">Resumes Created</p>
//               </div>
//               <div>
//                 <p className="text-3xl font-bold text-[#05A2FF]">4.9★</p>
//                 <p className="text-gray-500">User Rating</p>
//               </div>
//             </div>
//           </div>

//           {/* Right Preview */}
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//             className="relative flex justify-center"
//           >
//             <div className="absolute inset-0 bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl"></div>

//             <img
//               src={HomeImage}
//               alt="Resume Preview"
//               className="relative z-10 w-[80%] animate-pulse rounded-2xl shadow-xl hover:scale-105 transition"
//             />
//           </motion.div>
//         </div>
//       </section>

//       <section className="bg-white px-4 md:px-10 pt-10">

//         <div className="relative mt-10 rounded-2xl bg-gradient-to-r from-[#e8f4ff] to-[#f3fbff] border border-blue-100 shadow-lg overflow-hidden">
//           {/* Gradient glow */}
//           <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-cyan-400/10"></div>

//           <div className="relative flex flex-wrap md:flex-nowrap items-center justify-between gap-6 px-6 py-6">
//             {/* Left Image */}
//             <div className="max-md:hidden w-48">
//               <img
//                 src={doubleresume}
//                 alt="Resume Preview"
//                 className="w-full h-24 object-cover rounded-xl shadow-md"
//               />
//             </div>

//             {/* Middle Content */}
//             <div className="flex items-center gap-4 flex-1">
//               <div>
//                 <p className="font-roboto font-bold text-xl text-[#2e404a]">
//                   People are building resumes with ResumeMint right now!
//                 </p>
//                 <p className="text-gray-500 text-sm mt-1">
//                   Join 120,000+ professionals who landed interviews faster
//                 </p>
//               </div>
//             </div>

//             {/* CTA */}
//             <div>
//               <button
//                 onClick={clickchoosetemplate}
//                 className="group relative px-8 py-3 bg-gradient-to-r from-[#05a2ff] to-[#38bdf8] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
//               >
//                 Start Building Free
//                 <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition"></span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* better cv builder */}
//         <div>
//           <BetterCV />
//         </div>
//       </section>

//       {/* resume sider */}
//       <section>
//         <Resume_sider />
//       </section>

//       <section className="bg-[linear-gradient(182deg,rgba(239,248,255,1)_28%,rgba(255,255,255,1)_100%)]  md:mt-5 ">
//         <h2 className="font-roboto font-semibold text-[25px] md:text-[40px] text-[#2e404a] text-center pt-36">
//           Landing Your Ideal Job Starts Here
//         </h2>

//         <div className="flex flex-wrap lg:flex-nowrap justify-center gap-5 mt-10 p-2 md:p-0">
//           <div className="w-full md:w-[40%]  lg:w-[22%]">
//             <div className="w-full">
//               <img src={Image1} alt="image1" className="w-full" />
//             </div>
//             <div className="text-center text-[#2E404A] text-[20px] font-nunito font-bold mt-4 ">
//               Craft Your Perfect Cover Letter
//             </div>
//             <div className="text-center text-[#8d9eb3] text-[16px] font-nunito font-normal mt-4 ">
//               Let AI help you create a compelling introduction that highlights
//               your strengths and grabs attention—quickly and naturally.
//             </div>
//           </div>
//           <div className="w-full  md:w-[40%] lg:w-[22%]">
//             <div className="w-full">
//               <img src={Image2} alt="image1" className="w-full" />
//             </div>
//             <div className="text-center text-[#2E404A] text-[20px] font-nunito font-bold mt-4 ">
//               Discover Jobs That Fit You
//             </div>
//             <div className="text-center text-[#8d9eb3] text-[16px] font-nunito font-normal mt-4 ">
//               Search, filter, and save opportunities tailored to your skills,
//               experience, and career goals. Find roles that truly match what
//               you’re looking for.
//             </div>
//           </div>
//           <div className="w-full  md:w-[40%] lg:w-[22%]">
//             <div className="w-full">
//               <img src={Image4} alt="image1" className="w-full" />
//             </div>
//             <div className="text-center text-[#2E404A] text-[20px] font-nunito font-bold mt-4 ">
//               One-Click Applications
//             </div>
//             <div className="text-center text-[#8d9eb3] text-[16px] font-nunito font-normal mt-4 ">
//               Skip repetitive forms. Submit your resume instantly with automated
//               applications, so you can focus on interviews and preparation.
//             </div>
//           </div>
//           <div className="w-full  md:w-[40%] lg:w-[22%]">
//             <div className="w-full">
//               <img src={Image3} alt="image1" className="w-full" />
//             </div>
//             <div className="text-center text-[#2E404A] text-[20px] font-nunito font-bold mt-4 ">
//               Guidance from Career Experts
//             </div>
//             <div className="text-center text-[#8d9eb3] text-[16px] font-nunito font-normal mt-4 ">
//               Connect with professional career coaches who provide personalized
//               advice, help refine your resume, set actionable goals, and guide
//               you toward success.
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-center">
//           <button
//             className="mt-5 px-6 py-3 text-[16px] bg-[#05a2ff] text-white font-nunito font-semibold rounded-lg  transition hover:bg-[#0589d5] "
//             onClick={clickchoosetemplate}
//           >
//             Start Building for Free
//           </button>
//         </div>
//       </section>

//       {/* faq*/}
//       <section>
//         <Faq />
//       </section>

//       <section className="bg-[#edf9ff] py-20 mt-16">
//         <div className="max-w-6xl mx-auto px-6">
//           <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
//             <h2 className="font-roboto font-bold text-3xl md:text-4xl text-[#2e404a]">
//               Get noticed. Get hired faster.
//             </h2>

//             <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
//               Build a professional, job-winning resume in minutes with
//               ResumeMint. Simple, fast, and ATS-friendly.
//             </p>

//             <div className="mt-8 flex justify-center">
//               <button
//                 onClick={() => navigate("/choose-template")}
//                 className="px-8 py-3 bg-[#05a2ff] hover:bg-[#0589d5] text-white font-semibold rounded-lg transition"
//               >
//                 Start Building for Free
//               </button>
//             </div>

//             <p className="mt-4 text-sm text-gray-400">
//               Trusted by thousands of job seekers worldwide
//             </p>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }

// export default Homepage;

import React from "react";
import Header from "../Pages/Header";
import Footer from "../Pages/Footer";
import Faq from "../Pages/Faq";
import HomeImage from "../assets/images/home-resume.svg";
import home1 from "../assets/images/home1.png";
import home2 from "../assets/images/home2.png";
import home3 from "../assets/images/home3.png";
import home4 from "../assets/images/home4.png";
import home5 from "../assets/images/home5.png";
import doubleresume from "../assets/images/doubleresume.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Carousel from "../Pages/Carousel";
import Resume_sider from "../Pages/Resume_sider";
import {
  FaMagic,
  FaFileAlt,
  FaCheckCircle,
  FaMountain,
  FaHandHoldingUsd,
} from "react-icons/fa";
import { FiArrowRight, FiZap, FiTarget, FiShield } from "react-icons/fi";
import { FiCheckCircle, FiStar, FiCpu } from "react-icons/fi";
import BetterCV from "../Pages/Bettercv";
// Color palette (your requested reds)
const ACCENT_1 = "#c40116"; // primary bright red
const ACCENT_2 = "#5e000b"; // deep maroon
const ACCENT_3 = "#be0117"; // secondary red

export default function Homepage() {
  const navigate = useNavigate();
  const goToChoose = () => {
    navigate("/choose-template");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clickchoosetemplate = () => {
    navigate("/choose-template");
  };

  const features = [
    {
      icon: <FaFileAlt size={22} />,
      title: "Professional Templates",
      description:
        "Choose from beautifully designed, modern templates for every career level.",
    },
    {
      icon: <FaCheckCircle size={22} />,
      title: "ATS-Optimized",
      description:
        "Built to pass applicant tracking systems used by top recruiters.",
    },
    {
      icon: <FaFileAlt size={22} />,
      title: "Ready-Made Content",
      description:
        "Create your resume fast using professionally written bullet points.",
    },
    {
      icon: <FaMagic size={22} />,
      title: "AI-Powered Writing",
      description:
        "Get intelligent suggestions tailored to your job role and experience.",
    },
    {
      icon: <FaMountain size={22} />,
      title: "Stand Out Instantly",
      description:
        "Highlight your strengths with a resume that beats the competition.",
    },
    {
      icon: <FaHandHoldingUsd size={22} />,
      title: "Land Better Offers",
      description:
        "Build a resume that leads to more interviews and better salary offers.",
    },
  ];

  const Star = ({ filled }) => (
    <svg
      className={`w-5 h-5 ${filled ? "text-[#c40116]" : "text-gray-300"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.197-1.539-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.049 9.397c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.97z" />
    </svg>
  );

  const testimonials = [
    {
      name: "Aisha Khan",
      role: "MBA Graduate",
      rating: 5,
      text: "I got interviews within 2 weeks after using ARYU Better CV’s AI suggestions.",
    },
    {
      name: "Rohit Mehta",
      role: "Software Engineer",
      rating: 5,
      text: "Clean templates and ATS checks made my resume stand out instantly.",
    },
    {
      name: "Sonia Patel",
      role: "Marketing Executive",
      rating: 4,
      text: "ARYU transformed my vague bullets into impact-driven achievements.",
    },
    {
      name: "Karan Verma",
      role: "Final Year Student",
      rating: 5,
      text: "The UI feels premium and building my resume was super fast.",
    },
    {
      name: "Neha Sharma",
      role: "HR Professional",
      rating: 5,
      text: "Best resume builder I’ve used. Super clean and recruiter-friendly.",
    },
  ];

  // Color Constants from your request
  const RED_PRIMARY = "#c40116";
  const RED_DARK = "#5e000b";
  const RED_ACCENT = "#be0117";
  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 font-poppins">
      <Header />

      {/* HERO */}

      <section className="relative min-h-screen flex items-center justify-center  overflow-hidden selection:bg-blue-500/30">
        {/*  Grid Background */}
        <div
          className="absolute inset-0 z-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(#000000 1px, transparent 1px), linear-gradient(90deg, #000000 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Central Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] blur-[120px] rounded-full opacity-20 pointer-events-none"
          style={{ backgroundColor: ACCENT_1 }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-center">
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 bg-black/5 backdrop-blur-md mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-red-500 shadow-[0_0_10px_#3b82f6]" />
            <span className="text-xs font-medium text-black tracking-wide uppercase">
              Now with AI Analysis
            </span>
          </motion.div>

          {/* Hero Headlines */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-vlack tracking-tight mb-6"
          >
            Build job-winning resumes
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-black to-red-500">
              with AI in minutes.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed"
          >
            ARYU SmartCV is the pro-grade builder for engineers and designers.
            ATS-perfected, AI-augmented, and ready in minutes.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <button
              onClick={goToChoose}
              className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              Start Building Free
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => navigate("/templates")}
              className="px-8 py-4 bg-red-500/10 border border-white/10 text-blakck font-bold rounded-full backdrop-blur-sm hover:bg-white/10 transition-all"
            >
              Browse Templates
            </button>
          </motion.div>

          {/* Product UI Preview Container */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="relative mx-auto max-w-5xl group"
          >
            {/* Decorative Window Buttons */}
            <div className="absolute top-4 left-6 flex gap-2 z-20">
              <div className="w-3 h-3 rounded-full bg-white/10" />
              <div className="w-3 h-3 rounded-full bg-white/10" />
              <div className="w-3 h-3 rounded-full bg-white/10" />
            </div>

            {/* Main Image with Glass Border */}
            <div className="relative p-[1px] rounded-[2rem] bg-gradient-to-b from-white/20 to-transparent shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]">
              <div className="bg-[#0b0f1a] rounded-[2rem] overflow-hidden">
                <img
                  src={HomeImage}
                  alt="Product Preview"
                  className="w-full opacity-90 h-[80vh] object-cover object-top group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            </div>

            {/* Floating SaaS Feature Cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-12 -right-6 md:right-0 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl  block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <FiZap />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                    AI Power
                  </p>
                  <p className="text-sm font-bold text-black">
                    Bullet Point Auto-Gen
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-10 -left-6 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl block"
            >
              <div className="flex items-center gap-3 text-white">
                <FiShield className="text-green-400" />
                <p className="text-sm font-semibold text-black tracking-tight">
                  100% ATS Safe Guaranteed
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Trusted By / Logos */}
          <div className="mt-32 border-t border-white/5 pt-10">
            <p className="text-sm font-medium text-slate-500 mb-8 uppercase tracking-[0.2em]">
              Our Users are from
            </p>
            <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale contrast-125">
              <span className="text-xl font-bold text-black tracking-tighter italic">
                Google
              </span>
              <span className="text-xl font-bold text-black tracking-tighter">
                Meta
              </span>
              <span className="text-xl font-bold text-black tracking-tighter italic  decoration-blue-500">
                Stripe
              </span>
              <span className="text-xl font-bold text-black tracking-tighter">
                Amazon
              </span>
              <span className="text-xl font-bold text-black tracking-tighter">
                Airbnb
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Panel */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold">
              Meet ARYU SmartCV — your AI resume assistant
            </h2>
            <p className="mt-4 text-slate-600">
              ARYU SmartCV helps polish your language, suggests role-specific
              skills, and converts achievements into measurable bullets that
              recruiters love.
            </p>

            <div className="mt-8">
              <button
                onClick={goToChoose}
                className="px-6 py-3 rounded-xl font-semibold shadow"
                style={{
                  background: `linear-gradient(90deg, ${ACCENT_1}, ${ACCENT_3})`,
                  color: "#fff",
                }}
              >
                Try ARYU SmartCV
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="p-6 rounded-2xl border border-gray-100 shadow-lg bg-gradient-to-tr from-white to-slate-50">
              <div className="flex items-center gap-4">
                <img
                  src={doubleresume}
                  alt="double resume"
                  className="w-20 h-20 object-cover rounded-md shadow"
                />
                <div>
                  <div className="text-sm text-slate-500">
                    Sample transformation
                  </div>
                  <div className="font-medium">Before → After</div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3">
                <div className="p-4 rounded-lg bg-white border border-gray-100">
                  <div className="text-xs text-slate-400">Before</div>
                  <div className="text-sm">"Responsible for backend tasks"</div>
                </div>
                <div className="p-4 rounded-lg bg-white border border-gray-100">
                  <div className="text-xs text-slate-400">After</div>
                  <div className="text-sm font-medium">
                    "Built REST APIs for payments, reducing latency by 32% and
                    increasing reliability."
                  </div>
                </div>
              </div>
            </div>

            <div
              className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full shadow-lg"
              style={{
                background: `linear-gradient(180deg, ${ACCENT_3}11, transparent 60%)`,
              }}
            />
          </div>
        </div>
      </section>

      <section className="relative bg-white py-28 overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#c40116]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-96 h-96 bg-[#c40116]/5 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          {/* Tag */}
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#c40116]/10 text-[#c40116] font-semibold text-sm mb-6">
            🚀 Trusted by 10,000+ job seekers
          </span>

          {/* Headline */}
          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
            Build a resume that gets <br />
            you hired faster
          </h2>

          {/* Subtitle */}
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            ResumeMint helps you create stunning, ATS-friendly resumes in
            minutes. No design skills. No stress. Just results.
          </p>

          {/* CTA */}
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
            <button className="px-12 py-4 rounded-xl bg-[#c40116] text-white font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
              Build My Resume Free
            </button>

            <button className="px-12 py-4 rounded-xl border-2 border-slate-200 text-slate-800 font-semibold text-lg hover:border-slate-300 transition">
              View Templates
            </button>
          </div>

          {/* Social proof */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm text-gray-500">
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl font-bold text-slate-800">10K+</span>
              <span>Resumes Created</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl font-bold text-slate-800">98%</span>
              <span>ATS Pass Rate</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl font-bold text-slate-800">4.9★</span>
              <span>User Rating</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl font-bold text-slate-800">24/7</span>
              <span>AI Assistance</span>
            </div>
          </div>
        </div>
      </section>

      <Resume_sider />

      <section className="relative py-24 bg-[#f9fafb] overflow-hidden">
        {/* Soft Red Glow */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#c40116]/10 rounded-full blur-[120px]" />
        <div className="absolute top-40 -right-40 w-[500px] h-[500px] bg-[#be0117]/10 rounded-full blur-[120px]" />

        <div className="relative  px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block mb-4 px-4 py-1 rounded-full text-sm font-semibold bg-[#c40116]/10 text-[#c40116]">
              Why ARYU SmartCV?
            </span>

            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight text-slate-800">
              Everything you need to build a{" "}
              <span className="text-[#c40116]">job-winning resume</span>
            </h2>

            <p className="mt-5 text-gray-600 text-lg">
              Trusted by thousands of job seekers to create professional,
              ATS-friendly resumes with AI-powered guidance.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl border border-gray-100 shadow-lg p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl mb-4 bg-[#c40116]/10 text-[#c40116]">
                  {feature.icon}
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-2">
                  {feature.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>

                <div className="mt-4 w-10 h-[3px] bg-[#c40116] rounded-full" />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-20 text-center">
            <h3 className="text-2xl font-bold text-slate-800">
              Start building your resume in minutes
            </h3>

            <p className="mt-2 text-gray-600">
              Join 120,000+ professionals who landed interviews faster
            </p>

            <button
              onClick={clickchoosetemplate}
              className="mt-6 px-10 py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-[#c40116] to-[#be0117] shadow-xl hover:scale-105 transition"
            >
              Build My Resume Free
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative bg-white py-24 overflow-hidden">
        <div className="relative px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-800">
              Loved by Career Changers & Students
            </h3>
            <p className="mt-3 text-gray-500 text-lg">
              120,000+ professionals trust ARYU Better CV to land interviews
              faster
            </p>
          </div>

          {/* Marquee */}
          <div className="mt-16 relative overflow-hidden pb-8">
            <div className="flex gap-8 animate-marquee hover:[animation-play-state:paused]">
              {[...testimonials, ...testimonials].map((t, i) => (
                <div className="min-w-[320px] max-w-[320px] glass-card p-8 rounded-3xl shadow-xl border border-white/40">
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} filled={i <= t.rating} />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    “{t.text}”
                  </p>

                  {/* User */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#c40116]/10 flex items-center justify-center font-bold text-[#c40116]">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Component */}
      <Faq />

      {/* Final CTA */}
      <section className="bg-[#f9fafb] py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <span className="inline-block mb-4 text-sm font-semibold tracking-wide text-[#c40116] uppercase">
                Resume Builder Platform
              </span>

              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                Your resume deserves <br />
                better than boring templates.
              </h2>

              <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
                Build a professional, ATS-optimized resume that recruiters
                actually read. Designed for speed, clarity, and real hiring
                impact.
              </p>

              {/* CTA */}
              <div className="mt-10 flex items-center gap-5">
                <button className="px-10 py-4 rounded-xl bg-[#c40116] text-white font-semibold text-lg hover:bg-[#a80013] transition-all shadow-sm">
                  Start Building Free
                </button>

                <button className="px-10 py-4 rounded-xl border border-gray-300 text-gray-700 font-semibold text-lg hover:border-gray-400 transition-all">
                  Browse Templates
                </button>
              </div>

              {/* Trust */}
              <div className="mt-8 flex gap-6 text-sm text-gray-500">
                <span>✔ ATS Friendly</span>
                <span>✔ No Design Skills Needed</span>
                <span>✔ Instant Download</span>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-10">
                <div className="space-y-6">
                  <div className="h-4 w-40 bg-gray-200 rounded-full" />
                  <div className="h-3 w-full bg-gray-100 rounded-full" />
                  <div className="h-3 w-5/6 bg-gray-100 rounded-full" />
                  <div className="h-3 w-4/6 bg-gray-100 rounded-full" />

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="h-20 bg-gray-100 rounded-xl" />
                    <div className="h-20 bg-gray-100 rounded-xl" />
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <div className="h-3 w-24 bg-gray-200 rounded-full" />
                  <div className="h-10 w-32 bg-[#c40116] rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
