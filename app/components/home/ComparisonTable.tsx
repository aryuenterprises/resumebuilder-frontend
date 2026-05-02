// "use client";

// import { motion } from "framer-motion";
// import { FiCheck, FiX, FiBarChart2 } from "react-icons/fi";
// import { FaCrown } from "react-icons/fa";

// interface Feature {
//   name: string;
//   passats: boolean | string;
//   others: boolean | string;
// }

// const features: Feature[] = [
//   { name: "ATS Score Check", passats: true, others: false },
//   { name: "AI Bullet Point Writer", passats: true, others: false },
//   { name: "JD Keyword Tailoring", passats: true, others: false },
//   { name: "Multiple Templates", passats: "15+", others: "3-5" },
//   { name: "Unlimited Resumes", passats: true, others: false },
//   { name: "Priority Support", passats: true, others: false },
//   { name: "Analytics Dashboard", passats: true, others: false },
// ];

// export const ComparisonTable = () => {
//   return (
//     <section className="py-20 px-4 bg-white">
//       <div className="max-w-5xl mx-auto">
//         <div className="text-center mb-12">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-4"
//           >
//             <FiBarChart2 className="w-3.5 h-3.5 text-indigo-600" />
//             <span className="text-xs font-medium text-indigo-700 uppercase tracking-wide">
//               Why Choose Us
//             </span>
//           </motion.div>
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
//             PassATS vs.{" "}
//             <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//               Other Resume Builders
//             </span>
//           </h2>
//           <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
//             See why 120,000+ professionals choose PassATS over competitors
//           </p>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="border-b border-gray-200 bg-gray-50">
//                 <th className="text-left py-4 px-4 text-gray-600 font-semibold">Feature</th>
//                 <th className="text-center py-4 px-4">
//                   <div className="flex flex-col items-center">
//                     <FaCrown className="w-6 h-6 text-yellow-500 mb-1" />
//                     <div className="text-indigo-600 font-bold text-lg">PassATS</div>
//                   </div>
//                 </th>
//                 <th className="text-center py-4 px-4">
//                   <div className="text-gray-500 font-medium">Other Tools</div>
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {features.map((feature, idx) => (
//                 <motion.tr
//                   key={idx}
//                   initial={{ opacity: 0, x: -20 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   transition={{ delay: idx * 0.05 }}
//                   className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
//                 >
//                   <td className="py-3 px-4 text-gray-700 font-medium">{feature.name}</td>
//                   <td className="py-3 px-4 text-center">
//                     <FeatureValue value={feature.passats} isPassATS />
//                   </td>
//                   <td className="py-3 px-4 text-center">
//                     <FeatureValue value={feature.others} isPassATS={false} />
//                   </td>
//                 </motion.tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           className="mt-8 text-center"
//         >
//           <button
//             onClick={() => document.getElementById("pricing-section")?.scrollIntoView({ behavior: "smooth" })}
//             className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
//           >
//             Start Your Free Trial Today
//           </button>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// const FeatureValue = ({ value, isPassATS }: { value: boolean | string; isPassATS: boolean }) => {
//   if (value === true) {
//     return (
//       <div className="flex flex-col items-center">
//         <FiCheck className="w-5 h-5 text-emerald-500" />
//         <span className="text-[10px] text-emerald-600 mt-1">Included</span>
//       </div>
//     );
//   }
//   if (value === false) {
//     return <FiX className="w-5 h-5 text-gray-400 mx-auto" />;
//   }
//   return (
//     <span className={isPassATS ? "text-emerald-600 font-bold" : "text-gray-500"}>
//       {value}
//     </span>
//   );
// };

























"use client";

import { motion } from "framer-motion";
import { FiCheck, FiX, FiBarChart2 } from "react-icons/fi";
import { FaCrown } from "react-icons/fa";

interface Feature {
  name: string;
  passats: boolean | string;
  others: boolean | string;
}

const features: Feature[] = [
  { name: "ATS Score Check", passats: true, others: false },
  { name: "AI Bullet Point Writer", passats: true, others: false },
  { name: "JD Keyword Tailoring", passats: true, others: false },
  { name: "Multiple Templates", passats: "15+", others: "3-5" },
  { name: "Unlimited Resumes", passats: true, others: false },
  { name: "Priority Support", passats: true, others: false },
  { name: "Analytics Dashboard", passats: true, others: false },
];

export const ComparisonTable = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-3 sm:mb-4"
          >
            <FiBarChart2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-600" />
            <span className="text-[10px] sm:text-xs font-medium text-indigo-700 uppercase tracking-wide">
              Why Choose Us
            </span>
          </motion.div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 px-2">
            PassATS vs.{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
              Other Resume Builders
            </span>
          </h2>
          <p className="mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm md:text-base text-gray-500 max-w-2xl mx-auto">
            See why 120,000+ professionals choose PassATS over competitors
          </p>
        </div>

        {/* Responsive Table Container */}
        <div className="relative overflow-x-auto shadow-sm rounded-xl border border-gray-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-white">
              <tr>
                <th scope="col" className="sticky left-0 bg-white sm:bg-transparent px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700">
                  Feature
                </th>
                <th scope="col" className="px-3 sm:px-4 py-3 text-center text-xs sm:text-sm font-semibold">
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-1">
                      <FaCrown className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                      <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-bold">
                        PassATS
                      </span>
                    </div>
                  </div>
                </th>
                <th scope="col" className="px-3 sm:px-4 py-3 text-center text-xs sm:text-sm font-semibold text-gray-600">
                  Other Tools
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {features.map((feature, idx) => (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="sticky left-0 bg-white px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">
                    {feature.name}
                  </td>
                  <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-center">
                    <TableFeatureValue value={feature.passats} isPassATS />
                  </td>
                  <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-center">
                    <TableFeatureValue value={feature.others} isPassATS={false} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Scroll Hint for Mobile */}
        <div className="block sm:hidden text-center mt-3">
          <p className="text-[10px] text-gray-400">
            ← Swipe to see full comparison →
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-6 sm:mt-8 md:mt-10 text-center"
        >
          <button
            onClick={() => document.getElementById("pricing-section")?.scrollIntoView({ behavior: "smooth" })}
            className="w-full sm:w-auto px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg sm:rounded-xl font-semibold hover:shadow-lg transition-all text-sm sm:text-base"
          >
            Start Your Free Trial Today
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const TableFeatureValue = ({ value, isPassATS }: { value: boolean | string; isPassATS: boolean }) => {
  if (value === true) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-100 flex items-center justify-center">
          <FiCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600" />
        </div>
        <span className="text-[8px] sm:text-[10px] text-emerald-600 mt-0.5 sm:mt-1 font-medium hidden sm:inline">
          Included
        </span>
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
        <FiX className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400" />
      </div>
    );
  }
  return (
    <span className={`${isPassATS ? "text-emerald-600 font-bold" : "text-gray-500"} text-xs sm:text-sm font-semibold`}>
      {value}
    </span>
  );
};