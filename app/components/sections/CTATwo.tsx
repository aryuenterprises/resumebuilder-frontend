'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { motion } from 'framer-motion'

const CTATwo = () => {
  const router = useRouter()
  
  return (
    <div className="w-full relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-700">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-white/5 via-transparent to-white/5" />
      </div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center text-white mb-3 sm:mb-4 leading-tight px-2">
            Your Next Job Starts with{" "}
            <span className="bg-gradient-to-r from-yellow-200 via-amber-200 to-yellow-100 bg-clip-text text-transparent block sm:inline">
              the Right Resume.
            </span>
          </h2>
          
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-indigo-100 text-center max-w-2xl mx-auto mb-6 sm:mb-7 md:mb-8 leading-relaxed px-3">
            Whether you are applying for campus placement, your first role, or
            your next big move — PassATS gives you the resume that gets you in
            the room.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 px-4 sm:px-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/choose-template")}
              className="group w-full sm:w-auto px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base font-semibold bg-white text-indigo-600 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              Build My Resume — It's Free
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/choose-plan")}
              className="w-full sm:w-auto px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base font-medium text-white border border-white/30 rounded-lg sm:rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              Choose Plan
            </motion.button>
          </div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 sm:mt-7 md:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
              <span className="text-[8px] sm:text-[9px] md:text-[10px] text-indigo-100">Free to start</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
              <span className="text-[8px] sm:text-[9px] md:text-[10px] text-indigo-100">No credit card</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
              <span className="text-[8px] sm:text-[9px] md:text-[10px] text-indigo-100">30-day guarantee</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default CTATwo