// import { User } from "@/app/types/user.types";
// import { getLocalStorage } from "@/app/utils";
// import { motion, AnimatePresence } from "framer-motion";
// import React, { useEffect, useState } from "react";
// import { FiLogIn } from "react-icons/fi";
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
//               className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-60 p-3 sm:p-4"
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0, y: 20 }}
//                 animate={{ scale: 1, opacity: 1, y: 0 }}
//                 exit={{ scale: 0.9, opacity: 0, y: 20 }}
//                 transition={{ type: "spring", damping: 25, stiffness: 300 }}
//                 className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-[90%] sm:max-w-md mx-auto overflow-hidden"
//               >
//                 {/* Modal Content */}
//                 <div className="relative p-5 sm:p-8 text-center">
//                   {/* Animated Icon */}
//                   <motion.div
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ delay: 0.2, type: "spring", damping: 10 }}
//                     className="inline-flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24 mb-4 sm:mb-6"
//                   >
//                     <div className="relative w-16 h-16 sm:w-24 sm:h-24 bg-linear-to-br from-[#c40116] to-[#be0117] rounded-xl sm:rounded-2xl shadow-xl shadow-[#c40116]/30 flex items-center justify-center transform hover:rotate-3 transition-transform duration-300">
//                       <FiLogIn className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
//                     </div>
//                   </motion.div>

//                   {/* Text Content */}
//                   <motion.h2
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.3 }}
//                     className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-3"
//                   >
//                     Login Required
//                   </motion.h2>

//                   <motion.p
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.4 }}
//                     className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 px-2"
//                   >
//                     Please login to your account to create and save your
//                     professional resume.
//                   </motion.p>

//                   {/* Buttons */}
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.5 }}
//                     className="space-y-2 sm:space-y-3"
//                   >
//                     <button
//                       onClick={() => router.push("/login")}
//                       className="w-full py-3 sm:py-4 bg-linear-to-r from-[#c40116] to-[#be0117] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#c40116]/25 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 text-base sm:text-lg cursor-pointer"
//                     >
//                       <FiLogIn className="w-4 h-4 sm:w-5 sm:h-5" />
//                       Go to Login
//                     </button>

//                     <button
//                       onClick={() => router.push("/")}
//                       className="w-full py-2 sm:py-3 text-gray-500 font-medium hover:text-gray-700 transition-colors duration-300 text-xs sm:text-sm cursor-pointer"
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
import { IoSparkles } from "react-icons/io5";

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
              className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto overflow-hidden"
              >
                {/* Decorative Top Bar */}
                <div className="h-1 bg-gradient-to-r from-indigo-600 to-indigo-500" />

                {/* Close Button */}
                <button
                  onClick={() => router.push("/")}
                  className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-lg transition-colors z-10"
                >
                  <FiX className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                </button>

                {/* Modal Content */}
                <div className="relative p-6 text-center">
                  {/* Animated Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", damping: 10 }}
                    className="inline-flex items-center justify-center mb-4"
                  >
                    <div className="relative w-16 h-16 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-2xl shadow-lg shadow-indigo-500/30 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                      <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse" />
                      <FiLogIn className="w-8 h-8 text-white relative z-10" />
                    </div>
                  </motion.div>

                 

                  {/* Text Content */}
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent mb-2"
                  >
                    Login Required
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-sm text-gray-500 mb-6 px-4"
                  >
                    Please login to your account to create and save your professional resume.
                  </motion.p>

                  {/* Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-3"
                  >
                    <button
                      onClick={() => router.push("/login")}
                      className="group w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Go to Login
                      <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={() => router.push("/")}
                      className="w-full py-2.5 text-gray-500 font-medium hover:text-indigo-600 transition-colors duration-300 text-sm cursor-pointer"
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