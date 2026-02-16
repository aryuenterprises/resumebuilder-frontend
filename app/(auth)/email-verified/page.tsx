"use client";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";

function Email_verify() {
  const router = useRouter();

  return (
    

      <div className="grow bg-linear-to-br from-red-50/10 to-red-100/10 flex justify-center p-4 sm:p-6">
              <div className="w-full max-w-sm sm:max-w-md md:max-w-xl mt-5 md:mt-12">
                <div className="relative bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-100 overflow-hidden">
                  {/* Header gradient accent */}
                  <div className="h-1 sm:h-2 bg-linear-to-r from-[#C40116] to-[#5E000B]"></div>
      
                  <div className="p-4 sm:p-6 md:p-8">
                     {/* Success Icon */}
          <div className="flex justify-center mb-4">
            <div className="bg-red-50 p-3  rounded-full shadow-sm ">
              <FaCheckCircle className="text-red-600" size={28} />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl md:text-2xl font-semibold text-center text-gray-800">
            Verification Successful
          </h2>

          {/* Text */}
          <p className="text-center text-gray-600 mt-3 text-sm leading-relaxed">
            Your account has been successfully verified. Please click the login
            button below to access your account.
          </p>

          {/* Button */}
          <div className="flex justify-center mt-6">
            <button
              className="bg-linear-to-r from-[#C40116] to-[#5E000B] hover:from-[#d6021a] hover:to-[#6e000c] shadow-lg shadow-red-500/30 text-white font-semibold py-3 px-6 sm:px-8 rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto text-sm sm:text-base  "
              onClick={() => router.push("/login")}
            >
              Login Now
            </button>
          </div>
      
                   
                  </div>
                </div>
              </div>
            </div>
  );
}

export default Email_verify;
