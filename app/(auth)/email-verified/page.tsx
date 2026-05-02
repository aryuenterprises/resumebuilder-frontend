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
    <div className="md:min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col">
      <div className="relative flex-1 flex items-center justify-center py-16! md:py-0! p-3 sm:p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md px-2 sm:px-0"
        >
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header gradient accent */}
            <div className="h-1 bg-gradient-to-r from-indigo-600 to-indigo-500"></div>

            <div className="p-5 sm:p-6 md:p-8 text-center">
              {/* Success Animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                className="flex justify-center mb-4 sm:mb-5"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-100 rounded-full blur-xl opacity-50 animate-pulse"></div>
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                    <FaCheckCircle className="text-white text-3xl sm:text-4xl" />
                  </div>
                </div>
              </motion.div>

              {/* Sparkle Effects */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-0.5 sm:py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-3 sm:mb-4">
                  <IoSparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-600" />
                  <span className="text-[9px] sm:text-[10px] md:text-xs font-medium text-indigo-700 uppercase tracking-wide">
                    Verification Successful
                  </span>
                </div>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent mb-1.5 sm:mb-2"
              >
                Email Verified!
              </motion.h2>

              {/* Text */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-[11px] sm:text-xs md:text-sm text-gray-500 leading-relaxed mb-5 sm:mb-6 px-2"
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
                  className="group w-full py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-lg sm:rounded-xl hover:from-indigo-700 hover:to-indigo-600 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer text-[11px] sm:text-xs md:text-sm"
                  onClick={() => router.push("/login")}
                >
                  Login Now
                  <FiArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>

              {/* Help Link */}
              <div className="mt-3 sm:mt-4 text-center">
                <p className="text-[10px] sm:text-xs   text-gray-400">
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