




// import { User } from "@/app/types/user.types";
// import { getLocalStorage } from "@/app/utils";
// import { motion, AnimatePresence } from "framer-motion";
// import React, { useEffect, useState } from "react";
// import { FiLogIn, FiShield, FiArrowRight, FiX } from "react-icons/fi";
// import { useRouter } from "next/navigation";

// const LoginModel = () => {
//   const router = useRouter();

//   const userDetails = getLocalStorage<User>("user_details");
//   const [showLoginModal, setShowLoginModal] = useState(false);

//   // Check if user is logged in
//   useEffect(() => {
//     if (!userDetails) {
//       setShowLoginModal(true);
//     } else {
//       setShowLoginModal(false);
//     }
//   }, [userDetails]);

//   return (
//     <>
//       {!userDetails && (
//         <AnimatePresence>
//           {showLoginModal && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4"
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0, y: 20 }}
//                 animate={{ scale: 1, opacity: 1, y: 0 }}
//                 exit={{ scale: 0.9, opacity: 0, y: 20 }}
//                 transition={{ type: "spring", damping: 25, stiffness: 300 }}
//                 className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto overflow-hidden"
//               >
//                 {/* Decorative Top Bar */}
//                 <div className="h-1 bg-gradient-to-r from-indigo-600 to-indigo-500" />

                

//                 {/* Modal Content */}
//                 <div className="relative p-6 text-center">
//                   {/* Animated Icon */}
//                   <motion.div
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ delay: 0.2, type: "spring", damping: 10 }}
//                     className="inline-flex items-center justify-center mb-4"
//                   >
//                     <div className="relative w-16 h-16 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-2xl shadow-lg shadow-indigo-500/30 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
//                       <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse" />
//                       <FiLogIn className="w-8 h-8 text-white relative z-10" />
//                     </div>
//                   </motion.div>

                 

//                   {/* Text Content */}
//                   <motion.h2
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.3 }}
//                     className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent mb-2"
//                   >
//                     Login Required
//                   </motion.h2>

//                   <motion.p
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.4 }}
//                     className="text-sm text-gray-500 mb-6 px-4"
//                   >
//                     Please login to your account to create and save your professional resume.
//                   </motion.p>

//                   {/* Buttons */}
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.5 }}
//                     className="space-y-3"
//                   >
//                     <button
//                       onClick={() => router.push("/login")}
//                       className="group w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
//                     >
//                       Go to Login
//                       <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                     </button>

//                     <button
//                       onClick={() => router.push("/")}
//                       className="w-full py-2.5 text-gray-500 font-medium hover:text-indigo-600 transition-colors duration-300 text-sm cursor-pointer"
//                     >
//                       Return to Homepage
//                     </button>
//                   </motion.div>

                 
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       )}
//     </>
//   );
// };

// export default LoginModel;










import { User } from "@/app/types/user.types";
import { getLocalStorage } from "@/app/utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FiLogIn, FiShield, FiArrowRight, FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";

const LoginModel = () => {
  const router = useRouter();

  const userDetails = getLocalStorage<User>("user_details");
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    if (!userDetails) {
      setShowLoginModal(true);
    } else {
      setShowLoginModal(false);
    }
  }, [userDetails]);

  return (
    <>
      {!userDetails && (
        <AnimatePresence>
          {showLoginModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-3 sm:p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-md mx-2 sm:mx-0 overflow-hidden"
              >
                {/* Decorative Top Bar */}
                <div className="h-1 bg-gradient-to-r from-indigo-600 to-indigo-500" />

                {/* Close Button */}
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="absolute top-3 sm:top-4 right-3 sm:right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 z-10 cursor-pointer"
                  aria-label="Close modal"
                >
                  <FiX className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Modal Content */}
                <div className="relative p-5 sm:p-6 md:p-8 text-center">
                  {/* Animated Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", damping: 10 }}
                    className="inline-flex items-center justify-center mb-3 sm:mb-4"
                  >
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl sm:rounded-2xl shadow-lg shadow-indigo-500/30 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                      <div className="absolute inset-0 bg-white/20 rounded-xl sm:rounded-2xl animate-pulse" />
                      <FiLogIn className="w-7 h-7 sm:w-8 sm:h-8 text-white relative z-10" />
                    </div>
                  </motion.div>

                  {/* Text Content */}
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent mb-1.5 sm:mb-2"
                  >
                    Login Required
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-[11px] sm:text-xs md:text-sm text-gray-500 mb-5 sm:mb-6 px-3 sm:px-4"
                  >
                    Please login to your account to create and save your professional resume.
                  </motion.p>

                  {/* Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-2.5 sm:space-y-3"
                  >
                    <button
                      onClick={() => router.push("/login")}
                      className="group w-full py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-lg sm:rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-[11px] sm:text-xs md:text-sm"
                    >
                      Go to Login
                      <FiArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={() => {
                        setShowLoginModal(false);
                        router.push("/");
                      }}
                      className="w-full py-2 sm:py-2.5 text-gray-500 font-medium hover:text-indigo-600 transition-colors duration-300 text-[10px] sm:text-xs md:text-sm cursor-pointer"
                    >
                      Return to Homepage
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
};

export default LoginModel;