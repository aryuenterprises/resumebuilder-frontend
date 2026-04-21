// 'use client';

// import { useRouter } from 'next/navigation';
// import { ReactNode } from 'react';
// import {
//   FaMagic,
//   FaFileAlt,
//   FaCheckCircle,
//   FaMountain,
//   FaHandHoldingUsd,
// } from 'react-icons/fa';

// interface Feature{
//      icon:ReactNode,
//      title:string,
//      description:string
// }

// const features:Feature[] = [
//   {
//     icon: <FaFileAlt className="w-5 h-5 sm:w-6 sm:h-6" />,
//     title: 'Recruiter approved templates',
//     description:
//       'Choose from clean, modern designs built for every career level fresher to senior.',
//   },
//   {
//     icon: <FaCheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
//     title: 'ATS-optimized by default',
//     description:
//       'Every resume is structured to pass applicant tracking systems at top Indian and global companies.',
//   },
//   {
//     icon: <FaFileAlt className="w-5 h-5 sm:w-6 sm:h-6" />,
//     title: 'AI-written bullet points',
//     description:
//       'Instantly generate powerful, role-specific bullet points no writing experience needed.',
//   },
//   {
//     icon: <FaMagic className="w-5 h-5 sm:w-6 sm:h-6" />,
//     title: 'Smart AI writing assistant',
//     description:
//       'Get real-time suggestions tailored to your job title, skills, and industry as you build.',
//   },
//   {
//     icon: <FaMountain className="w-5 h-5 sm:w-6 sm:h-6" />,
//     title: 'Highlight what makes you unique',
//     description:
//       'Our AI surfaces your strongest achievements and presents them the way recruiters want to see them.',
//   },
//   {
//     icon: <FaHandHoldingUsd className="w-5 h-5 sm:w-6 sm:h-6" />,
//     title: 'More interviews. Better offers.',
//     description:
//       'A well-crafted, ATS-ready resume leads directly to more callbacks and stronger salary conversations.',
//   },
// ];

// const WhyChooseUs = () => {
//   const router = useRouter();

//   return (
//     <section className="relative p-4 sm:p-6 md:p-8 lg:p-12 xl:p-20 bg-[#f9fafb] overflow-hidden">
//       {/* Soft Red Glow - Responsive */}
//       <div className="absolute bottom-10 sm:bottom-16 -left-20 sm:-left-40 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] bg-[#c40116]/5 sm:bg-[#c40116]/10 rounded-full blur-2xl sm:blur-3xl lg:blur-[120px] pointer-events-none" />
//       <div className="absolute top-20 sm:top-40 -right-20 sm:-right-40 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] bg-[#be0117]/5 sm:bg-[#be0117]/10 rounded-full blur-2xl sm:blur-3xl lg:blur-[120px] pointer-events-none" />

//       <div className="relative max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center max-w-2xl sm:max-w-3xl mx-auto px-2 sm:px-0">
//           <span className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-[#c40116]/10 text-[#c40116]">
// Built for India's job market
//           </span>

//           <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold md:font-extrabold leading-tight text-slate-800">
//                       Everything you need to land{' '}
//             <span className="text-[#c40116]">your next interview.</span>

//           </h2>

//           <p className="mt-3 sm:mt-4 md:mt-5 text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
//            From fresh graduates to working professionals ARYU SmartCV gives you the tools, templates, and AI assistance to build a resume that actually gets responses.

//           </p>
//         </div>

//         {/* Feature Cards */}
//         <div className="mt-8 sm:mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
//           {features.map((feature:Feature, idx:number) => (
//             <div
//               key={idx}
//               className="group bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm sm:shadow-lg p-4 sm:p-5 md:p-6 transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-md sm:hover:shadow-2xl"
//             >
//               <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg sm:rounded-xl mb-3 sm:mb-4 bg-[#c40116]/10 text-[#c40116]">
//                 {feature.icon}
//               </div>

//               <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-2">
//                 {feature.title}
//               </h3>

//               <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
//                 {feature.description}
//               </p>

//               <div className="mt-3 sm:mt-4 w-8 sm:w-10 h-[2px] sm:h-[3px] bg-[#c40116] rounded-full transition-all duration-300 group-hover:w-12 sm:group-hover:w-14" />
//             </div>
//           ))}
//         </div>

//         {/* CTA */}
//         <div className="mt-12 sm:mt-16 md:mt-20 text-center px-2 sm:px-0">
//           <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800">
// Your next opportunity is one resume away.
//           </h3>

//           <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
// Build yours Resume free no signup required. Ready in under 3 minutes.
//           </p>

//           <button
//             onClick={() => router.push('/choose-template')}
//             className="mt-4 sm:mt-6 px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#c40116] to-[#c40116]/60 shadow-lg sm:shadow-xl hover:scale-105 transition-all duration-200 active:scale-95 text-sm sm:text-base md:text-lg w-full sm:w-auto cursor-pointer"
//           >
//             Create My Resume Now 

//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhyChooseUs;



'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  FaMagic,
  FaFileAlt,
  FaCheckCircle,
  FaMountain,
  FaHandHoldingUsd,
  FaRocket,
  FaShieldAlt,
  FaStar,
} from 'react-icons/fa';
import { FiArrowRight, FiTrendingUp, FiUsers } from 'react-icons/fi';

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <FaFileAlt className="w-5 h-5" />,
    title: 'Recruiter Approved Templates',
    description:
      'Choose from clean, modern designs built for every career level — fresher to senior.',
  },
  {
    icon: <FaCheckCircle className="w-5 h-5" />,
    title: 'ATS-Optimized by Default',
    description:
      'Every resume is structured to pass applicant tracking systems at top Indian and global companies.',
  },
  {
    icon: <FaMagic className="w-5 h-5" />,
    title: 'AI-Written Bullet Points',
    description:
      'Instantly generate powerful, role-specific bullet points — no writing experience needed.',
  },
  {
    icon: <FaRocket className="w-5 h-5" />,
    title: 'Smart AI Writing Assistant',
    description:
      'Get real-time suggestions tailored to your job title, skills, and industry as you build.',
  },
  {
    icon: <FaMountain className="w-5 h-5" />,
    title: 'Highlight What Makes You Unique',
    description:
      'Our AI surfaces your strongest achievements and presents them the way recruiters want to see them.',
  },
  {
    icon: <FaHandHoldingUsd className="w-5 h-5" />,
    title: 'More Interviews. Better Offers.',
    description:
      'A well-crafted, ATS-ready resume leads directly to more callbacks and stronger salary conversations.',
  },
];

const WhyChooseUs = () => {
  const router = useRouter();

  return (
    <section className="relative bg-gray-50 py-16 sm:py-20 md:py-24  px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 -left-24 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-4"
          >
            <FiTrendingUp className="w-3.5 h-3.5 text-indigo-600" />
            <span className="text-xs font-medium text-indigo-700 uppercase tracking-wide">
              Built for India's job market
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
          >
            Everything you need to land{' '}
            <span className="block bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent mt-2">
              your next interview.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 text-base sm:text-lg text-gray-500 leading-relaxed"
          >
            From fresh graduates to working professionals, ARYU SmartCV gives you the tools, 
            templates, and AI assistance to build a resume that actually gets responses.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>

              <p className="text-sm text-gray-500 leading-relaxed">
                {feature.description}
              </p>

              <div className="mt-4 w-10 h-0.5 bg-indigo-200 rounded-full transition-all duration-300 group-hover:w-14 group-hover:bg-indigo-600" />
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
            Your next opportunity is one resume away.
          </h3>

          <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
            Build your resume free — no signup required. Ready in under 3 minutes.
          </p>

          <button
            onClick={() => router.push('/choose-template')}
            className="group mt-6 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 mx-auto cursor-pointer"
          >
            Create My Resume Now
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* Trust Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 pt-6 flex flex-wrap justify-center items-center gap-6 text-xs text-gray-400"
        >
          <div className="flex items-center gap-1">
            <FaStar className="w-3 h-3 text-yellow-500" />
            <span>4.9/5 Rating</span>
          </div>
          <div className="w-1 h-1 bg-gray-300 rounded-full" />
          <div className="flex items-center gap-1">
            <FiUsers className="w-3 h-3 text-indigo-500" />
            <span>10,000+ Users</span>
          </div>
          <div className="w-1 h-1 bg-gray-300 rounded-full" />
          <div className="flex items-center gap-1">
            <FaShieldAlt className="w-3 h-3 text-green-500" />
            <span>98% ATS Pass Rate</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;