import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeaderImage from "../assets/images/resumint/resumemint_header.png";
import HeaderLogo from "../assets/images/aryuLogo.png";
import { CreateContext } from "../App";
import { FcViewDetails } from "react-icons/fc";
import { SiReaddotcv } from "react-icons/si";

function Header() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const { logoPreview } = useContext(CreateContext);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const userdata = localStorage.getItem("Resumnit_user");
    setUserLoggedIn(userdata ? true : false);
  }, []);

  const navigate = useNavigate();

  const clickhomepage = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clickcontactpage = () => {
    navigate("/contact-us");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clickloginpage = () => {
    navigate("/loging");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clickDashboardpage = () => {
    navigate("/dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // scrolling down → show header
        setShowHeader(false);
      } else {
        // scrolling up → hide header
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [menuOpen]);

  return (
    // <motion.header
    //   initial={{ y: -100 }}
    //   animate={{ y: showHeader ? 0 : -120 }}
    //   transition={{ duration: 0.4, ease: "easeInOut" }}
    //   className="bg-white/90 backdrop-blur-lg border-b shadow-md shadow-red-300/10 border-gray-100 sticky top-0 z-50"
    // >
    //   <div className="flex justify-between items-center px-6 md:px-10 py-4 max-w-7xl mx-auto">
    //     {/* Logo */}
    //     <div
    //       className="flex items-center cursor-pointer"
    //       onClick={clickhomepage}
    //     >
    //       <img
    //         // src={logoPreview || HeaderImage}
    //         src={HeaderLogo}
    //         alt="ResumeMint Logo"
    //         className="w-36 md:w-48 object-contain"
    //       />
    //     </div>

    //     {/* Desktop Buttons */}
    //     <div className="max-md:hidden flex gap-4">
    //       <button
    //         onClick={clickcontactpage}
    //         className="px-5 py-2 rounded-lg font-nunito font-semibold text-[#c40116] border border-[#c40116]/40 hover:bg-[#c40116]/10 transition"
    //       >
    //         Contact Us
    //       </button>

    //       {/* {userLoggedIn ? (
    //         <button
    //           onClick={clickDashboardpage}
    //           className="px-6 py-2 rounded-lg font-nunito font-semibold text-white bg-gradient-to-r from-[#c40116] to-[#be0117] shadow-md hover:shadow-lg transition"
    //         >
    //           Dashboard
    //         </button>
    //       ) : (
    //         <button
    //           onClick={clickloginpage}
    //           className="px-6 py-2 rounded-lg font-nunito font-semibold text-white bg-gradient-to-r from-[#c40116] to-[#be0117] shadow-md hover:shadow-lg transition"
    //         >
    //           Log in
    //         </button>
    //       )} */}

    //        {!userLoggedIn && (
    //             <button
    //               onClick={() => {
    //                 clickloginpage();
    //                 setMenuOpen(false);
    //               }}
    //               className="w-full py-3 rounded-xl font-nunito font-semibold bg-gradient-to-r from-[#c40116] to-[#be0117] text-white shadow-md hover:shadow-lg transition"
    //             >
    //               Log in
    //             </button>
    //           )}
    //     </div>

    //     {/* Mobile Menu Icon */}
    //     <div className="md:hidden">
    //       {menuOpen ? (
    //         <FiX
    //           className="text-slate-700 text-3xl cursor-pointer"
    //           onClick={() => setMenuOpen(false)}
    //         />
    //       ) : (
    //         <FiMenu
    //           className="text-slate-700 text-3xl cursor-pointer"
    //           onClick={() => setMenuOpen(true)}
    //         />
    //       )}
    //     </div>
    //   </div>

    //   {/* Mobile Menu */}
    //   <AnimatePresence>
    //     {menuOpen && (
    //       <>
    //         {/* Background Overlay */}
    //         <motion.div
    //           className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
    //           initial={{ opacity: 0 }}
    //           animate={{ opacity: 1 }}
    //           exit={{ opacity: 0 }}
    //           onClick={() => setMenuOpen(false)}
    //         />

    //         {/* Popup Card */}
    //         <motion.div
    //           className="fixed top-24 left-1/2 z-50 w-[90%] max-w-sm -translate-x-1/2 bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center"
    //           initial={{ opacity: 0, scale: 0.9, y: -40 }}
    //           animate={{ opacity: 1, scale: 1, y: 0 }}
    //           exit={{ opacity: 0, scale: 0.9, y: -40 }}
    //           transition={{ duration: 0.3, ease: "easeInOut" }}
    //         >
    //           <button
    //             onClick={() => setMenuOpen(false)}
    //             className="absolute top-4 right-4 text-slate-500 hover:text-[#c40116] transition"
    //           >
    //             <FiX size={24} />
    //           </button>

    //           <h2 className="text-slate-800 font-nunito text-xl font-semibold mb-6">
    //             Menu
    //           </h2>

    //           <button
    //             onClick={() => {
    //               clickhomepage();
    //               setMenuOpen(false);
    //             }}
    //             className="w-full py-3 rounded-xl font-nunito font-semibold bg-[#c40116] text-white shadow-md hover:shadow-lg transition mb-3"
    //           >
    //             Home
    //           </button>

    //           <button
    //             onClick={() => {
    //               clickcontactpage();
    //               setMenuOpen(false);
    //             }}
    //             className="w-full py-3 rounded-xl font-nunito font-semibold border border-[#c40116]/40 text-[#c40116] hover:bg-[#c40116]/10 transition mb-3"
    //           >
    //             Contact Us
    //           </button>

    //           {/* {userLoggedIn ? (
    //             <button
    //               onClick={() => {
    //                 clickDashboardpage();
    //                 setMenuOpen(false);
    //               }}
    //               className="w-full py-3 rounded-xl font-nunito font-semibold bg-gradient-to-r from-[#c40116] to-[#be0117] text-white shadow-md hover:shadow-lg transition"
    //             >
    //               Dashboard
    //             </button>
    //           ) : (
    //             <button
    //               onClick={() => {
    //                 clickloginpage();
    //                 setMenuOpen(false);
    //               }}
    //               className="w-full py-3 rounded-xl font-nunito font-semibold bg-gradient-to-r from-[#c40116] to-[#be0117] text-white shadow-md hover:shadow-lg transition"
    //             >
    //               Log in
    //             </button>
    //           )} */}

    //           {!userLoggedIn && (
    //             <button
    //               onClick={() => {
    //                 clickloginpage();
    //                 setMenuOpen(false);
    //               }}
    //               className="w-full py-3 rounded-xl font-nunito font-semibold bg-gradient-to-r from-[#c40116] to-[#be0117] text-white shadow-md hover:shadow-lg transition"
    //             >
    //               Log in
    //             </button>
    //           )}
    //         </motion.div>
    //       </>
    //     )}
    //   </AnimatePresence>
    // </motion.header>

    <motion.header
      initial={{ y: -100 }}
      animate={{ y: showHeader ? 0 : -120 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="bg-white/95 backdrop-blur-lg border-b shadow-md shadow-red-300/10 border-gray-100 sticky top-0 z-50"
    >
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer"
          onClick={clickhomepage}
        >
          <img
            src={HeaderLogo}
            alt="ResumeMint Logo"
            className="w-28 sm:w-32 md:w-40 lg:w-48 object-contain"
          />
        </div>

        {/* Desktop Buttons */}
        <div className="max-md:hidden flex gap-3 lg:gap-4">
          <button
            onClick={() => navigate("/")}
            className="px-4 lg:px-5 py-1.5 lg:py-2 rounded-lg font-nunito font-semibold text-[#c40116]  hover:bg-[#c40116]/10 transition text-sm lg:text-base"
          >
            Home
          </button>

          <button
            onClick={clickcontactpage}
            className="px-4 lg:px-5 py-1.5 lg:py-2 rounded-lg font-nunito font-semibold text-[#c40116]  hover:bg-[#c40116]/10 transition text-sm lg:text-base"
          >
            Contact Us
          </button>

          <button
            onClick={() => navigate("/choose-template")}
            className="px-4 lg:px-5 py-1.5 lg:py-2 rounded-lg font-nunito font-semibold text-[#c40116]  hover:bg-[#c40116]/10 transition text-sm lg:text-base"
          >
            Create Resume
          </button>

          {!userLoggedIn && (
            <button
              onClick={clickloginpage}
              className="px-4 lg:px-6 py-1.5 lg:py-2 rounded-lg font-nunito font-semibold text-white bg-gradient-to-r from-[#c40116] to-[#be0117] shadow-md hover:shadow-lg transition text-sm lg:text-base"
            >
              Log in
            </button>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Menu"
          >
            {menuOpen ? (
              <FiX className="text-slate-700 text-2xl sm:text-3xl" />
            ) : (
              <FiMenu className="text-slate-700 text-2xl sm:text-3xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Enhanced Slide-in from Right */}
      <AnimatePresence>
        {menuOpen && (
          <div className="h-dvh  md:hidden">
            {/* Backdrop Overlay */}
            <motion.div
              className="fixed  inset-0 bg-black/50 backdrop-blur-sm z-[400] "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Sidebar Menu */}
            <motion.div
              className="fixed top-0 right-0 z-[500] h-full w-[85%] max-w-sm bg-white shadow-2xl  flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Sidebar Header */}
              <div className="flex items-center bg-white justify-between p-4 sm:p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
                    <svg
                      className="w-5 h-5 text-[#c40116]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                  </div>
                  <span className="text-lg font-nunito font-semibold text-gray-800">
                    Menu
                  </span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <FiX className="text-gray-500 hover:text-gray-700 w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Menu Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <div className="space-y-3">
                  {/* Home Button */}
                  <button
                    onClick={() => {
                      clickhomepage();
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl font-nunito font-semibold bg-gradient-to-r from-[#c40116]/5 to-[#be0117]/5 text-[#c40116] hover:from-[#c40116]/10 hover:to-[#be0117]/10 transition-all duration-200 group"
                  >
                    <div className="p-2 bg-white rounded-lg group-hover:scale-110 transition-transform">
                      <svg
                        className="w-5 h-5 text-[#c40116]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                    </div>
                    <span className="text-left flex-1">Home</span>
                  </button>

                  <button
                    onClick={() => {
                      navigate("/choose-template");
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl font-nunito font-semibold bg-gradient-to-r from-[#c40116]/5 to-[#be0117]/5 text-[#c40116] hover:from-[#c40116]/10 hover:to-[#be0117]/10 transition-all duration-200 group"
                  >
                    <div className="p-2 bg-white rounded-lg group-hover:scale-110 transition-transform">
                      <SiReaddotcv className="text-red-500 font-extrabold" />
                    </div>
                    <span className="text-left flex-1">Create Resume</span>
                  </button>

                  {/* Contact Us Button */}
                  <button
                    onClick={() => {
                      clickcontactpage();
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center bg-gradient-to-r from-[#c40116]/5 to-[#be0117]/5  gap-3 p-3 sm:p-4 rounded-xl font-nunito font-semibold border border-[#c40116]/20 text-[#c40116] hover:bg-[#c40116]/5 transition-all duration-200 group"
                  >
                    <div className="p-2 bg-white rounded-lg group-hover:scale-110 transition-transform">
                      <svg
                        className="w-5 h-5 text-[#c40116]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <span className="text-left flex-1">Contact Us</span>
                  </button>

                  {/* Divider */}
                  <div className="my-4 border-t border-gray-100"></div>

                  {/* Login Button (if not logged in) */}
                  {!userLoggedIn && (
                    <button
                      onClick={() => {
                        clickloginpage();
                        setMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl font-nunito font-semibold bg-gradient-to-r from-[#c40116] to-[#be0117] text-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group"
                    >
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm group-hover:scale-110 transition-transform">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                          />
                        </svg>
                      </div>
                      <span className="text-left flex-1">Log in</span>
                    </button>
                  )}

                  {/* Dashboard Button (if logged in) */}
                  {/* {userLoggedIn && (
                    <button
                      onClick={() => {
                        clickDashboardpage();
                        setMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl font-nunito font-semibold bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group"
                    >
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm group-hover:scale-110 transition-transform">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                      </div>
                      <span className="text-left flex-1">Dashboard</span>
                    </button>
                  )} */}
                </div>

                {/* Additional Info */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="text-center text-gray-500 text-xs sm:text-sm">
                    <p>Need help? Contact us at</p>
                    <p className="font-semibold text-gray-700 mt-1">
                      aryusmartcv@gmail.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-100 p-4">
                <div className="text-center text-gray-400 text-xs">
                  © {new Date().getFullYear()} Aryu SmartCV. All rights
                  reserved.
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;
