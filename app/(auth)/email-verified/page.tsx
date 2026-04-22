// "use client";
// import { useRouter } from "next/navigation";
// import { FaCheckCircle } from "react-icons/fa";

// function Email_verify() {
//   const router = useRouter();

//   return (
    

//       <div className="grow bg-linear-to-br from-red-50/10 to-red-100/10 flex justify-center p-4 sm:p-6">
//               <div className="w-full max-w-sm sm:max-w-md md:max-w-xl mt-5 md:mt-12">
//                 <div className="relative bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-100 overflow-hidden">
//                   {/* Header gradient accent */}
//                   <div className="h-1 sm:h-2 bg-linear-to-r from-[#C40116] to-[#5E000B]"></div>
      
//                   <div className="p-4 sm:p-6 md:p-8">
//                      {/* Success Icon */}
//           <div className="flex justify-center mb-4">
//             <div className="bg-red-50 p-3  rounded-full shadow-sm ">
//               <FaCheckCircle className="text-red-600" size={28} />
//             </div>
//           </div>

//           {/* Title */}
//           <h2 className="text-xl md:text-2xl font-semibold text-center text-gray-800">
//             Verification Successful
//           </h2>

//           {/* Text */}
//           <p className="text-center text-gray-600 mt-3 text-sm leading-relaxed">
//             Your account has been successfully verified. Please click the login
//             button below to access your account.
//           </p>

//           {/* Button */}
//           <div className="flex justify-center mt-6">
//             <button
//               className="bg-linear-to-r from-[#C40116] to-[#5E000B] hover:from-[#d6021a] hover:to-[#6e000c] shadow-lg shadow-red-500/30 text-white font-semibold py-3 px-6 sm:px-8 rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto text-sm sm:text-base  "
//               onClick={() => router.push("/login")}
//             >
//               Login Now
//             </button>
//           </div>
      
                   
//                   </div>
//                 </div>
//               </div>
//             </div>
//   );
// }

// export default Email_verify;





"use client";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import { FiMail, FiShield, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import Link from "next/link";
import { IoSparkles } from "react-icons/io5";

function Email_verify() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col">
      

      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header gradient accent */}
            <div className="h-1 bg-gradient-to-r from-indigo-600 to-indigo-500"></div>

            <div className="p-6 sm:p-8 text-center">
              {/* Success Animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                className="flex justify-center mb-5"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-100 rounded-full blur-xl opacity-50 animate-pulse"></div>
                  <div className="relative w-20 h-20 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                    <FaCheckCircle className="text-white text-4xl" />
                  </div>
                </div>
              </motion.div>

              {/* Sparkle Effects */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-4">
                  <IoSparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="text-xs font-medium text-indigo-700 uppercase tracking-wide">
                    Verification Successful
                  </span>
                </div>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent mb-2"
              >
                Email Verified!
              </motion.h2>

              {/* Text */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-gray-500 text-sm leading-relaxed mb-6"
              >
                Your account has been successfully verified. 
                You can now login to access all premium features and start building 
                your professional resume.
              </motion.p>

              {/* Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <button
                  className="group w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-indigo-600 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer"
                  onClick={() => router.push("/login")}
                >
                  Login Now
                  <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>

            

              {/* Help Link */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-400">
                  Need help?{" "}
                  <Link href="/contact-us" className="text-indigo-600 hover:underline cursor-pointer">
                    Contact Support
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Email_verify;