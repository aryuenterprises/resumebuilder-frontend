"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { SiReaddotcv } from "react-icons/si";
import { RedGradientButton } from "../ui";

const Header: React.FC = () => {
  const router = useRouter();

  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  // Check login status
  useEffect(() => {
    const user = localStorage.getItem("user_details");
    setUserLoggedIn(Boolean(user));
  }, []);

  // Handle scroll show/hide
  useEffect(() => {
    const handleScroll = (): void => {
      const currentScrollY = window.scrollY;
      setShowHeader(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Lock body scroll on mobile menu
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: showHeader ? 0 : -120 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="bg-white backdrop-blur-lg border-b overflow-hidden! shadow-red-300/10 border-gray-100 sticky top-0 z-50"
    >
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <button onClick={() => router.push("/")} className="cursor-pointer">
          <Image
            src="/icons/logo.png"
            alt="Aryu SmartCV"
            height={50}
            width={180}
            priority
          />
        </button>

        {/* Desktop Menu */}
        <nav className="max-md:hidden flex gap-4">
          <button
            className="px-4 lg:px-5 py-1.5 lg:py-2 rounded-lg font-nunito font-semibold text-[#c40116]  hover:bg-[#c40116]/10 transition text-sm lg:text-base cursor-pointer"
            onClick={() => router.push("/")}
          >
            Home
          </button>
          <button
            className="px-4 lg:px-5 py-1.5 lg:py-2 rounded-lg font-nunito font-semibold text-[#c40116]  hover:bg-[#c40116]/10 transition text-sm lg:text-base cursor-pointer"
            onClick={() => router.push("/contact-us")}
          >
            Contact Us
          </button>
          <button
            className="px-4 lg:px-5 py-1.5 lg:py-2 rounded-lg font-nunito font-semibold text-[#c40116]  hover:bg-[#c40116]/10 transition text-sm lg:text-base cursor-pointer"
            onClick={() => router.push("/choose-template")}
          >
            Create Resume
          </button>

          {userLoggedIn ? (
            <button
              onClick={() => router.push("dashboard")}
              className="px-4 lg:px-6 py-1.5 lg:py-2 rounded-lg font-nunito font-semibold text-white bg-linear-to-r from-[#c40116] to-[#c40116]/60 shadow-md  transition text-sm lg:text-base cursor-pointer hover:shadow-lg hover:shadow-[#c40116]/25 hover:scale-[1.02]"
            >
              Dashboard
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="px-4 lg:px-6 py-1.5 lg:py-2 rounded-lg font-nunito font-semibold text-white bg-linear-to-r from-[#c40116] to-[#c40116]/60 shadow-md  transition text-sm lg:text-base cursor-pointer hover:shadow-lg hover:shadow-[#c40116]/25 hover:scale-[1.02]"
            >
              Log in
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden"
          aria-label="Toggle menu text-slate-700 text-2xl sm:text-3xl"
        >
          {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <div className="h-dvh overflow-hidden  md:hidden">
            {/* Backdrop Overlay */}
            <motion.div
              className="fixed  inset-0 bg-black/10 backdrop-blur-sm z-400 "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Sidebar Menu */}
            <motion.div
              className="fixed top-0 right-0 z-500 h-screen w-[85%] max-w-sm bg-white shadow-2xl  flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Sidebar Header */}
              <div className="flex items-center bg-white justify-between p-4 sm:p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
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
                  <FiX className="text-gray-800 hover:text-gray-900 font-semibold text-2xl" />
                </button>
              </div>

              {/* Menu Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <div className="space-y-3">
                  {/* Home Button */}
                  <button
                    onClick={() => {
                      router.push("/");
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl font-nunito font-semibold bg-linear-to-r from-[#c40116]/5 to-[#be0117]/5 text-[#c40116] hover:from-[#c40116]/10 hover:to-[#be0117]/10 transition-all duration-200 group"
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
                      router.push("/choose-template");
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl font-nunito font-semibold bg-linear-to-r from-[#c40116]/5 to-[#be0117]/5 text-[#c40116] hover:from-[#c40116]/10 hover:to-[#be0117]/10 transition-all duration-200 group"
                  >
                    <div className="p-2 bg-white rounded-lg group-hover:scale-110 transition-transform">
                      <SiReaddotcv className="text-red-500 font-extrabold" />
                    </div>
                    <span className="text-left flex-1">Create Resume</span>
                  </button>

                  {/* Contact Us Button */}
                  <button
                    onClick={() => {
                      router.push("/contact-us");

                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center bg-linear-to-r from-[#c40116]/5 to-[#be0117]/5  gap-3 p-3 sm:p-4 rounded-xl font-nunito font-semibold border border-[#c40116]/20 text-[#c40116] hover:bg-[#c40116]/5 transition-all duration-200 group"
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
                  {userLoggedIn ? (
                    <button
                      onClick={() => {
                        router.push("/dashboard");

                        setMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl font-nunito font-semibold bg-linear-to-r from-[#c40116] to-[#be0117] text-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group"
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
                      <span className="text-left flex-1">Dashboard</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        router.push("/login");

                        setMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl font-nunito font-semibold bg-linear-to-r from-[#c40116] to-[#be0117] text-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group"
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
                      className="w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl font-nunito font-semibold bg-linear-to-r from-gray-800 to-gray-900 text-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group"
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
};

export default Header;
