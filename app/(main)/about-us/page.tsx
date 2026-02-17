"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FiFileText,
  FiUsers,
  FiAward,
  FiHeart,
  FiTarget,
  FiEye,
  FiTrendingUp,
  FiShield,
  FiClock,
  FiStar,
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiCheckCircle,
} from "react-icons/fi";
import {
  HiOutlineSparkles,
  HiOutlineTemplate,
  HiOutlineDocumentText,
  HiOutlineChip,
  HiOutlineBadgeCheck,
} from "react-icons/hi";
import Link from "next/link";

const stats = [
  { value: "50K+", label: "Active Users", icon: FiUsers },
  { value: "100K+", label: "Resumes Created", icon: FiFileText },
  { value: "15+", label: "Expert Templates", icon: HiOutlineTemplate },
  { value: "98%", label: "Satisfaction Rate", icon: FiStar },
];

const features = [
  {
    title: "AI-Powered Suggestions",
    description:
      "Get intelligent recommendations to optimize your resume for ATS systems and stand out from the crowd.",
    icon: HiOutlineSparkles,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Professional Templates",
    description:
      "Choose from 15+ expertly designed templates tailored for different industries and career levels.",
    icon: HiOutlineTemplate,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Real-Time Preview",
    description:
      "See changes instantly with our live preview feature as you build your perfect resume.",
    icon: HiOutlineDocumentText,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "ATS Optimization",
    description:
      "Ensure your resume passes through Applicant Tracking Systems with our smart optimization tools.",
    icon: HiOutlineChip,
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Secure & Private",
    description:
      "Your data is encrypted and protected. We take your privacy and security seriously.",
    icon: FiShield,
    color: "from-indigo-500 to-purple-500",
  },
  {
    title: "24/7 Support",
    description:
      "Get help whenever you need it with our round-the-clock customer support team.",
    icon: FiClock,
    color: "from-pink-500 to-rose-500",
  },
];

const values = [
  {
    title: "Innovation",
    description:
      "We constantly push boundaries to bring you the latest in resume technology.",
    icon: FiTrendingUp,
  },
  {
    title: "Quality",
    description:
      "Every template and feature is crafted with meticulous attention to detail.",
    icon: FiAward,
  },
  {
    title: "User-Centric",
    description:
      "Your success is our success. We build features that truly help you achieve your goals.",
    icon: FiHeart,
  },
  {
    title: "Integrity",
    description:
      "We operate with transparency and honesty in everything we do.",
    icon: FiEye,
  },
];

const testimonials = [
  {
    name: "Jessica Williams",
    role: "Software Engineer",
    content:
      "This platform helped me land my dream job at a top tech company. The AI suggestions were incredibly accurate and the templates are gorgeous.",
    rating: 5,
    image: "JW",
  },
  {
    name: "Robert Martinez",
    role: "Marketing Director",
    content:
      "I've used many resume builders, but this one stands out. The ATS optimization feature is a game-changer. Got 3x more interview calls!",
    rating: 5,
    image: "RM",
  },
  {
    name: "Priya Patel",
    role: "Product Manager",
    content:
      "The real-time preview and customization options are amazing. I could see exactly how my resume would look as I built it. Highly recommended!",
    rating: 5,
    image: "PP",
  },
];
const AboutPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#c40116] via-[#be0117] to-[#9a0e1a] text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, black 3px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Animated shapes */}
        <div className="absolute top-20 -left-36 w-80 h-64 bg-white/50 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-white rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", damping: 10 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-3xl mb-8 backdrop-blur-sm"
            >
              <FiFileText className="w-10 h-10 text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Empowering Careers,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-100">
                One Resume at a Time
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-white/90 mb-10 max-w-2xl mx-auto"
            >
              We're on a mission to help professionals worldwide create
              stunning, ATS-optimized resumes that open doors to new
              opportunities.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/choose-template"
                className="px-8 py-4 bg-white text-[#c40116] font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Start Building Free
              </Link>
              <Link
                href="#features"
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-300"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            className="w-full h-auto"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-8 h-8 text-[#c40116]" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 text-lg">
                <p>
                  Founded in 2020, ARYU SmartCV was born from a simple
                  observation: talented professionals were struggling to create
                  resumes that truly represented their skills and caught
                  recruiters' attention.
                </p>
                <p>
                  Our founder, Sarah Johnson, a former HR director with over 15
                  years of experience, saw countless qualified candidates get
                  overlooked due to poorly formatted resumes that failed to pass
                  through ATS systems.
                </p>
                <p>
                  She assembled a team of designers, developers, and recruitment
                  experts to create a platform that combines beautiful design
                  with smart technology. Today, ARYU SmartCV has helped over
                  50,000 professionals land their dream jobs at companies like
                  Google, Microsoft, and Amazon.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c40116] to-[#be0117] border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                    >
                      {["SJ", "MC", "ER", "DK"][i - 1]}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-500">
                  <span className="font-bold text-gray-900">15+</span> experts
                  behind the scenes
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="Team collaboration"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <FiCheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Success Rate</div>
                    <div className="text-2xl font-bold text-gray-900">98%</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ARYU SmartCV?
            </h2>
            <p className="text-lg text-gray-600">
              We combine cutting-edge technology with expert design to help you
              create the perfect resume.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}
                />

                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl mb-6 shadow-lg`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#c40116] to-[#be0117] rounded-full flex items-center justify-center">
                    <FiCheckCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-[#c40116] to-[#be0117] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-white/90">
              These principles guide everything we do
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-3xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 backdrop-blur-sm">
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-white/80">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Loved by Job Seekers
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands of professionals who landed their dream jobs
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-50 rounded-3xl p-8 relative group hover:shadow-xl transition-all duration-500"
              >
                <div className="absolute top-6 right-6 text-[#c40116] opacity-20 group-hover:opacity-100 transition-opacity">
                  <svg
                    className="w-12 h-12"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                  >
                    <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2s2 .9 2 2-2 2-2 2v10h10V14c0-3.3-2.7-6-6-6zm18 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2s2 .9 2 2-2 2-2 2v10h10V14c0-3.3-2.7-6-6-6z" />
                  </svg>
                </div>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#c40116] to-[#be0117] rounded-xl flex items-center justify-center text-white font-bold">
                    {testimonial.image}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
// import {
//   FiFileText,
//   FiUsers,
//   FiAward,
//   FiHeart,
//   FiEye,
//   FiTrendingUp,
//   FiShield,
//   FiClock,
//   FiStar,
//   FiMail,
//   FiPhone,
//   FiMapPin,
//   FiLinkedin,
//   FiTwitter,
//   FiCheckCircle,
//   FiArrowRight,
//   FiArrowUpRight,
//   FiZap,
//   FiGlobe,
//   FiCpu,
// } from "react-icons/fi";
// import {
//   HiOutlineSparkles,
//   HiOutlineTemplate,
//   HiOutlineDocumentText,
//   HiOutlineChip,
//   HiOutlineBadgeCheck,
//   HiOutlineChartBar,
// } from "react-icons/hi";
// import Link from "next/link";

// const AboutPage = () => {
//   const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
//   const [activeTestimonial, setActiveTestimonial] = useState(0);
//   const [autoplay, setAutoplay] = useState(true);
//   const heroRef = useRef<HTMLDivElement>(null);
//   const autoplayRef = useRef<NodeJS.Timeout | null>(null);

//   const { scrollYProgress } = useScroll();
//   const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
//   const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
//   const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

//   // Autoplay testimonials
//   useEffect(() => {
//     if (!autoplay) return;

//     autoplayRef.current = setInterval(() => {
//       setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
//     }, 5000);

//     return () => {
//       if (autoplayRef.current) {
//         clearInterval(autoplayRef.current);
//       }
//     };
//   }, [autoplay]);

//   const stats = [
//     { value: "250K+", label: "Active Users", icon: FiUsers },
//     { value: "1.2M+", label: "Resumes Created", icon: FiFileText },
//     { value: "50+", label: "Expert Templates", icon: HiOutlineTemplate },
//     { value: "99.9%", label: "Satisfaction Rate", icon: FiStar },
//   ];

//   const features = [
//     {
//       title: "AI-Powered Optimization",
//       description: "Our advanced AI analyzes your resume against millions of job descriptions to ensure you pass ATS filters.",
//       icon: HiOutlineSparkles,
//       gradient: "from-purple-500 to-pink-500",
//       stats: "95% success rate",
//     },
//     {
//       title: "Dynamic Templates",
//       description: "Industry-specific templates designed by top recruiters with real-time customization.",
//       icon: HiOutlineDocumentText,
//       gradient: "from-blue-500 to-cyan-500",
//       stats: "50+ templates",
//     },
//     {
//       title: "Smart Analytics",
//       description: "Get detailed insights on how recruiters interact with your resume.",
//       icon: HiOutlineChartBar,
//       gradient: "from-green-500 to-emerald-500",
//       stats: "Real-time tracking",
//     },
//     {
//       title: "ATS Match Score",
//       description: "See exactly how well your resume matches job requirements.",
//       icon: HiOutlineChip,
//       gradient: "from-orange-500 to-red-500",
//       stats: "98% accuracy",
//     },
//     {
//       title: "Bank-Level Security",
//       description: "Your data is encrypted and protected with enterprise-grade security.",
//       icon: FiShield,
//       gradient: "from-indigo-500 to-purple-500",
//       stats: "256-bit encryption",
//     },
//     {
//       title: "Global Network",
//       description: "Connect with recruiters from over 5,000 companies worldwide.",
//       icon: FiGlobe,
//       gradient: "from-red-500 to-pink-500",
//       stats: "5k+ companies",
//     },
//   ];

//   const timeline = [
//     {
//       year: "2020",
//       title: "The Beginning",
//       description: "Founded by ex-Google recruiters with a vision to democratize job opportunities.",
//       icon: FiZap,
//     },
//     {
//       year: "2021",
//       title: "AI Integration",
//       description: "Launched our revolutionary AI-powered resume optimization engine.",
//       icon: FiCpu,
//     },
//     {
//       year: "2022",
//       title: "Global Expansion",
//       description: "Reached 100K users across 50 countries.",
//       icon: FiGlobe,
//     },
//     {
//       year: "2023",
//       title: "Enterprise Security",
//       description: "Implemented bank-level encryption for maximum data protection.",
//       icon: FiShield,
//     },
//     {
//       year: "2024",
//       title: "The Future",
//       description: "Launching AI-powered interview preparation and career coaching.",
//       icon: FiCpu,
//     },
//   ];

//   const testimonials = [
//     {
//       name: "Jessica Williams",
//       role: "Senior Software Engineer at Google",
//       content: "After months of rejections, ARYU SmartCV helped me rewrite my resume and I got 5 interview calls within a week.",
//       rating: 5,
//       image: "JW",
//       company: "Google",
//     },
//     {
//       name: "Michael Chen",
//       role: "Product Manager at Microsoft",
//       content: "The ATS optimization feature is incredible. My resume went from being ignored to getting responses from top tech companies.",
//       rating: 5,
//       image: "MC",
//       company: "Microsoft",
//     },
//     {
//       name: "Priya Patel",
//       role: "Marketing Director at Amazon",
//       content: "The templates are gorgeous and the AI suggestions are spot-on. I've recommended ARYU SmartCV to my entire network.",
//       rating: 5,
//       image: "PP",
//       company: "Amazon",
//     },
//     {
//       name: "David Kim",
//       role: "Data Scientist at Meta",
//       content: "The analytics dashboard showed me exactly where my resume was falling short. After optimizing, I landed interviews at top companies.",
//       rating: 5,
//       image: "DK",
//       company: "Meta",
//     },
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         damping: 12,
//         stiffness: 100,
//       },
//     },
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       {/* Hero Section */}
//       <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">

//         <motion.div
//           style={{
//             opacity: heroOpacity,
//             scale: heroScale,
//             y: heroY,
//           }}
//           className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
//         >
//           {/* Badge */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-lg border border-gray-100 mb-8"
//           >
//             <HiOutlineSparkles className="w-4 h-4 text-[#c40116]" />
//             <span className="text-sm text-gray-600">Trusted by 250,000+ professionals</span>
//           </motion.div>

//           {/* Title */}
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight text-gray-900"
//           >
//             <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
//               Redefining
//             </span>
//             <br />
//             <span className="bg-gradient-to-r from-[#c40116] via-[#be0117] to-[#ff6b6b] bg-clip-text text-transparent">
//               Career Success
//             </span>
//           </motion.h1>

//           {/* Description */}
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-12 px-4"
//           >
//             We're building the future of professional growth. Join thousands of successful professionals who've accelerated their careers with our AI-powered platform.
//           </motion.p>

//           {/* CTA Buttons */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5 }}
//             className="flex flex-col sm:flex-row gap-4 justify-center mb-16 px-4"
//           >
//             <Link
//               href="/choose-template"
//               className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white font-semibold rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
//             >
//               <span className="relative z-10 flex items-center justify-center gap-2">
//                 Start Building Free
//                 <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform" />
//               </span>
//               <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
//             </Link>

//             <Link
//               href="#story"
//               className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-[#c40116] hover:text-[#c40116] transition-all shadow-lg hover:shadow-xl"
//             >
//               <span className="flex items-center justify-center gap-2">
//                 Learn More
//                 <FiArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-45 transition-transform" />
//               </span>
//             </Link>
//           </motion.div>

//           {/* Stats */}
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto px-4"
//           >
//             {stats.map((stat, index) => (
//               <motion.div
//                 key={index}
//                 variants={itemVariants}
//                 className="bg-white shadow-lg border border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-[#c40116] hover:shadow-xl transition-all"
//               >
//                 <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#c40116] mb-2 sm:mb-3" />
//                 <div className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</div>
//                 <div className="text-xs sm:text-sm text-gray-500">{stat.label}</div>
//               </motion.div>
//             ))}
//           </motion.div>

//           {/* Scroll Indicator */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1 }}
//             className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block"
//           >
//             <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
//               <motion.div
//                 animate={{ y: [0, 12, 0] }}
//                 transition={{ duration: 1.5, repeat: Infinity }}
//                 className="w-1 h-2 bg-[#c40116] rounded-full mt-2"
//               />
//             </div>
//           </motion.div>
//         </motion.div>
//       </section>

//       {/* Features Section */}
//       <section className="relative py-16 sm:py-20 lg:py-32 bg-white overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#c40116]/5 to-transparent" />

//         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//             className="text-center mb-12 sm:mb-16 lg:mb-20"
//           >
//             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
//               Powered by{" "}
//               <span className="bg-gradient-to-r from-[#c40116] to-[#be0117] bg-clip-text text-transparent">
//                 Next-Gen Technology
//               </span>
//             </h2>
//             <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
//               Our platform combines AI, advanced analytics, and expert design to give you the ultimate career advantage.
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//             {features.map((feature, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: "-50px" }}
//                 transition={{ delay: index * 0.1 }}
//                 onHoverStart={() => setHoveredFeature(index)}
//                 onHoverEnd={() => setHoveredFeature(null)}
//                 className="group relative"
//               >
//                 <div className="relative bg-white shadow-lg border border-gray-100 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:border-[#c40116] hover:shadow-xl transition-all h-full">
//                   {/* Icon */}
//                   <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
//                     <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
//                   </div>

//                   <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
//                     {feature.title}
//                   </h3>

//                   <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
//                     {feature.description}
//                   </p>

//                   <div className="flex items-center gap-2">
//                     <span className="text-xs sm:text-sm text-[#c40116] font-medium">
//                       {feature.stats}
//                     </span>
//                     {hoveredFeature === index && (
//                       <motion.div
//                         initial={{ opacity: 0, x: -10 }}
//                         animate={{ opacity: 1, x: 0 }}
//                       >
//                         <FiArrowRight className="w-4 h-4 text-[#c40116]" />
//                       </motion.div>
//                     )}
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Timeline Section */}
//       <section className="relative py-16 sm:py-20 lg:py-32 bg-gray-50">
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#c40116]/5 to-transparent" />

//         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//             className="text-center mb-12 sm:mb-16 lg:mb-20"
//           >
//             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
//               Our Journey of{" "}
//               <span className="bg-gradient-to-r from-[#c40116] to-[#be0117] bg-clip-text text-transparent">
//                 Innovation
//               </span>
//             </h2>
//             <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
//               From a simple idea to revolutionizing how professionals build their careers.
//             </p>
//           </motion.div>

//           <div className="relative max-w-3xl mx-auto">
//             {/* Timeline Line */}
//             <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-transparent via-[#c40116] to-transparent" />

//             {timeline.map((item, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true, margin: "-50px" }}
//                 transition={{ delay: index * 0.2 }}
//                 className={`relative flex items-start sm:items-center mb-8 sm:mb-12 last:mb-0 ${
//                   index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
//                 }`}
//               >
//                 {/* Timeline Dot */}
//                 <div className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#c40116] rounded-full z-10">
//                   <div className="absolute inset-0 bg-[#c40116] rounded-full animate-ping opacity-50" />
//                 </div>

//                 {/* Content */}
//                 <div className={`ml-12 sm:ml-0 sm:w-1/2 ${index % 2 === 0 ? 'sm:pr-12' : 'sm:pl-12'}`}>
//                   <div className="bg-white shadow-lg border border-gray-100 rounded-xl sm:rounded-2xl p-6 hover:border-[#c40116] hover:shadow-xl transition-all">
//                     <div className="flex items-center gap-3 mb-3">
//                       <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#c40116] to-[#be0117] flex items-center justify-center shadow-md">
//                         <item.icon className="w-5 h-5 text-white" />
//                       </div>
//                       <div>
//                         <span className="text-[#c40116] font-bold text-sm">{item.year}</span>
//                         <h3 className="text-base sm:text-lg font-semibold text-gray-900">{item.title}</h3>
//                       </div>
//                     </div>
//                     <p className="text-sm sm:text-base text-gray-600">{item.description}</p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="relative py-16 sm:py-20 lg:py-32 bg-white overflow-hidden">
//         <div className="absolute inset-0">
//           <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-[#c40116]/10 rounded-full blur-[128px] opacity-50" />
//           <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-[#be0117]/10 rounded-full blur-[128px] opacity-50" />
//         </div>

//         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//             className="text-center mb-12 sm:mb-16 lg:mb-20"
//           >
//             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
//               What Our{" "}
//               <span className="bg-gradient-to-r from-[#c40116] to-[#be0117] bg-clip-text text-transparent">
//                 Community
//               </span>{" "}
//               Says
//             </h2>
//             <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
//               Join thousands of successful professionals who've accelerated their careers with us.
//             </p>
//           </motion.div>

//           <div className="max-w-4xl mx-auto">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={activeTestimonial}
//                 initial={{ opacity: 0, x: 50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -50 }}
//                 transition={{ duration: 0.5 }}
//                 className="bg-white shadow-xl border border-gray-100 rounded-xl sm:rounded-2xl p-6 sm:p-8"
//               >
//                 <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6">
//                   <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#c40116] to-[#be0117] rounded-xl flex items-center justify-center text-xl sm:text-2xl font-bold text-white shadow-lg flex-shrink-0">
//                     {testimonials[activeTestimonial].image}
//                   </div>
//                   <div>
//                     <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
//                       {testimonials[activeTestimonial].name}
//                     </h3>
//                     <p className="text-sm sm:text-base text-[#c40116] mb-2">
//                       {testimonials[activeTestimonial].role}
//                     </p>
//                     <div className="flex items-center gap-1">
//                       {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
//                         <FiStar key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 <p className="text-base sm:text-lg text-gray-700 mb-4 italic">
//                   "{testimonials[activeTestimonial].content}"
//                 </p>

//                 <div className="flex items-center gap-2">
//                   <span className="text-xs sm:text-sm text-gray-500">
//                     {testimonials[activeTestimonial].company}
//                   </span>
//                 </div>
//               </motion.div>
//             </AnimatePresence>

//             {/* Navigation Dots */}
//             <div className="flex justify-center gap-2 mt-6 sm:mt-8">
//               {testimonials.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => {
//                     setActiveTestimonial(index);
//                     setAutoplay(false);
//                   }}
//                   onMouseEnter={() => setAutoplay(false)}
//                   className={`h-2 rounded-full transition-all ${
//                     activeTestimonial === index
//                       ? 'w-8 bg-[#c40116]'
//                       : 'w-2 bg-gray-300 hover:bg-gray-400'
//                   }`}
//                   aria-label={`Go to testimonial ${index + 1}`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="relative py-16 sm:py-20 lg:py-32 bg-gray-50">
//         <div className="absolute inset-0">
//           <div className="absolute inset-0 bg-gradient-to-r from-[#c40116]/5 to-[#be0117]/5" />
//           <div className="absolute inset-0" style={{
//             backgroundImage: "radial-gradient(circle at 2px 2px, #c40116 1px, transparent 0)",
//             backgroundSize: "40px 40px",
//             opacity: 0.1,
//           }} />
//         </div>

//         <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//           >
//             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
//               Ready to Transform Your{" "}
//               <span className="bg-gradient-to-r from-[#c40116] to-[#be0117] bg-clip-text text-transparent">
//                 Career?
//               </span>
//             </h2>

//             <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
//               Join over 250,000 professionals who've already created their perfect resume and landed their dream jobs.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
//               <Link
//                 href="/choose-template"
//                 className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-[#c40116]/25 transition-all"
//               >
//                 <span className="flex items-center justify-center gap-2">
//                   Get Started Free
//                   <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform" />
//                 </span>
//               </Link>

//               <Link
//                 href="/pricing"
//                 className="px-6 sm:px-8 py-3 sm:py-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-[#c40116] hover:text-[#c40116] transition-all shadow-lg hover:shadow-xl"
//               >
//                 View Pricing
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-white border-t border-gray-200 py-8 sm:py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#c40116] to-[#be0117] rounded-lg flex items-center justify-center shadow-md">
//                 <FiFileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//               </div>
//               <span className="text-lg sm:text-xl font-bold text-gray-900">ARYU SmartCV</span>
//             </div>

//             <div className="flex items-center gap-4 sm:gap-6">
//               <a href="#" className="text-sm text-gray-600 hover:text-[#c40116] transition-colors">
//                 About
//               </a>
//               <a href="#" className="text-sm text-gray-600 hover:text-[#c40116] transition-colors">
//                 Features
//               </a>
//               <a href="#" className="text-sm text-gray-600 hover:text-[#c40116] transition-colors">
//                 Pricing
//               </a>
//               <a href="#" className="text-sm text-gray-600 hover:text-[#c40116] transition-colors">
//                 Contact
//               </a>
//             </div>

//             <div className="flex items-center gap-3 sm:gap-4">
//               <a href="#" className="text-gray-500 hover:text-[#c40116] transition-colors">
//                 <FiTwitter className="w-4 h-4 sm:w-5 sm:h-5" />
//               </a>
//               <a href="#" className="text-gray-500 hover:text-[#c40116] transition-colors">
//                 <FiLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />
//               </a>
//             </div>
//           </div>

//           <div className="pt-6 sm:pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
//             <p className="text-xs sm:text-sm text-gray-500 order-2 sm:order-1">
//               &copy; 2024 ARYU SmartCV. All rights reserved.
//             </p>
//             <div className="flex items-center gap-4 sm:gap-6 order-1 sm:order-2">
//               <a href="#" className="text-xs sm:text-sm text-gray-500 hover:text-[#c40116] transition-colors">
//                 Privacy
//               </a>
//               <a href="#" className="text-xs sm:text-sm text-gray-500 hover:text-[#c40116] transition-colors">
//                 Terms
//               </a>
//               <a href="#" className="text-xs sm:text-sm text-gray-500 hover:text-[#c40116] transition-colors">
//                 Cookies
//               </a>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default AboutPage;
