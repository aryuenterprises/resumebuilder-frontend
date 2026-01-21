import React from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderImage from '../assets/images/resumint/resumemint_header.png';


export default function Error() {
      const nagivate = useNavigate();
  const clickhomepage = () => {
    nagivate('/')
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">

        <div
                className="flex items-center    text-[#2e404a] text-[20px] md:text-[25px] font-nunito font-bold cursor-pointer"
                onClick={clickhomepage}
              >
                {/* <span>Resumint</span> */}
                <img src={HeaderImage} alt="Logo" className="w-32 md:w-80 md:h-full object-contain bg-white mb-6 " />
              </div>
      <h1 className="text-9xl font-extrabold animate-bounce bg-gradient-to-br from-indigo-300 to-blue-500 bg-clip-text text-transparent">
404</h1>

      <p className="mt-4 text-2xl font-light animate-fadeIn">
        Oops! The page you're looking for doesn't exist.
      </p>

       

      <Link
  to="/"
  className="mt-8 px-6 py-3 bg-gradient-to-r from-indigo-400 to-blue-500 
             text-white font-semibold rounded-full shadow-lg 
             hover:opacity-90 transition-all duration-300 animate-fadeIn"
>
  Go Home
</Link>


      {/* Extra animation circles */}
      <div className="absolute w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse -top-10 -left-10"></div>
      <div className="absolute w-56 h-56 bg-white/10 rounded-full blur-2xl animate-pulse bottom-0 right-0"></div>

      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
