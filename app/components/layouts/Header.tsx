






"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiMenu, FiUser, FiX } from "react-icons/fi";
import { SiReaddotcv } from "react-icons/si";
import { RedGradientButton } from "../ui";
import { IoIosInformationCircleOutline } from "react-icons/io";

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

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

      // Only trigger after 100px scroll
      if (currentScrollY > 100) {
        setShowHeader(currentScrollY < lastScrollY); // scroll up → show
      } else {
        setShowHeader(true); // always show at top
      }

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

  // Helper function to check if path is active
  const isActive = (path: string) => {
    if (path === "/") return pathname === path;
    return pathname === path;
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: showHeader ? 0 : -120 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="bg-white backdrop-blur-lg border-b overflow-hidden! shadow-red-300/10 border-gray-100 sticky top-0 z-50"
    >
      <div className="flex justify-between items-center px-4 lg:px-8 xl:px-10 py-3 sm:py-4 mx-auto">
        {/* Logo */}
        <button onClick={() => router.push("/")} className="cursor-pointer">
          <Image
            src="/logo.png"
            alt="ATS Pass"
            height={50}
            width={150}
            priority
          />
        </button>

        {/* Desktop Menu */}
        <nav className="max-md:hidden flex gap-2 lg:gap-3 xl:gap-4">
          <button
            className={`px-3 lg:px-4 xl:px-5 py-1.5 lg:py-2 rounded-lg font-nunito font-semibold transition-all duration-200 text-xs lg:text-sm cursor-pointer ${
              isActive("/")
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
            }`}
            onClick={() => router.push("/")}
          >
            Home
          </button>

          <button
            className={`px-3 lg:px-4 xl:px-5 py-1.5 lg:py-2 rounded-lg font-nunito font-semibold transition-all duration-200 text-xs lg:text-sm cursor-pointer ${
              isActive("/choose-template")
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
            }`}
            onClick={() => router.push("/choose-template")}
          >
            Build Resume
          </button>

          <button
            className={`px-3 lg:px-4 xl:px-5 py-1.5 lg:py-2 rounded-lg font-nunito font-semibold transition-all duration-200 text-xs lg:text-sm cursor-pointer ${
              isActive("/ats-checker")
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
            }`}
            onClick={() => router.push("/ats-checker")}
          >
            ATS Checker
          </button>

          <button
            className={`px-3 lg:px-4 xl:px-5 py-1.5 lg:py-2 rounded-lg font-nunito font-semibold transition-all duration-200 text-xs lg:text-sm cursor-pointer ${
              isActive("/about-us")
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
            }`}
            onClick={() => router.push("/about-us")}
          >
            About Us
          </button>

          <button
            className={`px-3 lg:px-4 xl:px-5 py-1.5 lg:py-2 rounded-lg font-nunito font-semibold transition-all duration-200 text-xs lg:text-sm cursor-pointer ${
              isActive("/choose-plan")
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
            }`}
            onClick={() => router.push("/choose-plan")}
          >
            Pricing
          </button>

          {userLoggedIn ? (
            <button
              onClick={() => router.push("/dashboard")}
              className={`lg:ml-3 px-5 lg:px-6 py-2 rounded-lg font-semibold transition-all duration-200 text-sm cursor-pointer flex items-center gap-2 ${
                isActive("/dashboard")
                  ? "bg-indigo-50 text-indigo-600"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg"
              }`}
            >
              Dashboard
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className={`lg:ml-3 px-5 lg:px-6 py-2 rounded-lg font-semibold transition-all duration-200 text-sm cursor-pointer flex items-center gap-2 ${
                isActive("/login")
                  ? "bg-indigo-50 text-indigo-600"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg"
              }`}
            >
              Sign In
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
          <div className="h-dvh overflow-hidden md:hidden">
            {/* Backdrop Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/10 backdrop-blur-sm z-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Sidebar Menu */}
            <motion.div
              className="fixed top-0 right-0 z-500 h-screen w-[85%] max-w-sm bg-white shadow-2xl flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Sidebar Header */}
              <div className="flex items-center bg-white justify-between p-4 sm:p-6 border-b border-indigo-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-linear-to-br from-indigo-500/10 to-indigo-600/10 rounded-lg">
                    <svg
                      className="w-5 h-5 text-indigo-600"
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
                  className="p-2 rounded-lg hover:bg-indigo-50 transition-colors"
                  aria-label="Close menu"
                >
                  <FiX className="text-gray-800 hover:text-indigo-600 font-semibold text-2xl" />
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
                    className={`w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl font-nunito font-semibold transition-all duration-200 group ${
                      isActive("/")
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    }`}
                  >
                    <div className={`p-2 rounded-lg transition-transform group-hover:scale-110 ${
                      isActive("/") ? "bg-indigo-100" : "bg-gray-100"
                    }`}>
                      <svg
                        className={`w-5 h-5 ${isActive("/") ? "text-indigo-600" : "text-gray-600"}`}
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
                    className={`w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl font-nunito font-semibold transition-all duration-200 group ${
                      isActive("/choose-template")
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    }`}
                  >
                    <div className={`p-2 rounded-lg transition-transform group-hover:scale-110 ${
                      isActive("/choose-template") ? "bg-indigo-100" : "bg-gray-100"
                    }`}>
                      <SiReaddotcv className={`${isActive("/choose-template") ? "text-indigo-600" : "text-gray-600"} font-extrabold`} />
                    </div>
                    <span className="text-left flex-1">Build Resume</span>
                  </button>

                  <button
                    onClick={() => {
                      router.push("/choose-plan");
                      setMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl font-nunito font-semibold transition-all duration-200 group ${
                      isActive("/choose-plan")
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    }`}
                  >
                    <div className={`p-2 rounded-lg transition-transform group-hover:scale-110 ${
                      isActive("/choose-plan") ? "bg-indigo-100" : "bg-gray-100"
                    }`}>
                      <SiReaddotcv className={`${isActive("/choose-plan") ? "text-indigo-600" : "text-gray-600"} font-extrabold`} />
                    </div>
                    <span className="text-left flex-1">Pricing</span>
                  </button>

                  <button
                    onClick={() => {
                      router.push("/ats-checker");
                      setMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl font-nunito font-semibold transition-all duration-200 group ${
                      isActive("/ats-checker")
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    }`}
                  >
                    <div className={`p-2 rounded-lg transition-transform group-hover:scale-110 ${
                      isActive("/ats-checker") ? "bg-indigo-100" : "bg-gray-100"
                    }`}>
                      <SiReaddotcv className={`${isActive("/ats-checker") ? "text-indigo-600" : "text-gray-600"} font-extrabold`} />
                    </div>
                    <span className="text-left flex-1">ATS Checker</span>
                  </button>

                  {/* Contact Us Button */}
                  <button
                    onClick={() => {
                      router.push("/contact-us");
                      setMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl font-nunito font-semibold transition-all duration-200 group ${
                      isActive("/contact-us")
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    }`}
                  >
                    <div className={`p-2 rounded-lg transition-transform group-hover:scale-110 ${
                      isActive("/contact-us") ? "bg-indigo-100" : "bg-gray-100"
                    }`}>
                      <svg
                        className={`w-5 h-5 ${isActive("/contact-us") ? "text-indigo-600" : "text-gray-600"}`}
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

                  <button
                    onClick={() => {
                      router.push("/about-us");
                      setMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl font-nunito font-semibold transition-all duration-200 group ${
                      isActive("/about-us")
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    }`}
                  >
                    <div className={`p-2 rounded-lg transition-transform group-hover:scale-110 ${
                      isActive("/about-us") ? "bg-indigo-100" : "bg-gray-100"
                    }`}>
                      <IoIosInformationCircleOutline className={`font-extrabold text-2xl ${isActive("/about-us") ? "text-indigo-600" : "text-gray-600"}`} />
                    </div>
                    <span className="text-left flex-1">About Us</span>
                  </button>

                  {/* Divider */}
                  <div className="my-4 border-t border-indigo-100"></div>

                  {/* Login Button (if not logged in) */}
                  {userLoggedIn ? (
                    <button
                      onClick={() => {
                        router.push("/dashboard");
                        setMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl font-nunito font-semibold bg-linear-to-r from-indigo-600 to-indigo-500 text-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group"
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
                      className="w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl font-nunito font-semibold bg-linear-to-r from-indigo-600 to-indigo-500 text-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group"
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
                </div>

                {/* Additional Info */}
                <div className="mt-8 pt-6 border-t border-indigo-100">
                  <div className="text-center text-gray-500 text-xs sm:text-sm">
                    <p>Need help? Contact us at</p>
                    <p className="font-semibold text-indigo-600 mt-1">
                      passats@gmail.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-indigo-100 p-4">
                <div className="text-center text-gray-400 text-xs">
                  © {new Date().getFullYear()} PassATS. All rights
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