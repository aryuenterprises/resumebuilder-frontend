"use client";

import React from "react";
import {
  FaCcMastercard,
  FaCcVisa,
  FaCcAmex,
  FaCcDiscover,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Footer = () => {
  const router = useRouter();

  return (
    <footer className="bg-gradient-to-b from-white to-[#fff5f6] border-t border-red-100">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-12 lg:p-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
            src='/icons/logo.png'
              alt="ResumeMint"
              width={180}
              height={60}
              className="cursor-pointer"
              onClick={() => router.push("/")}
            />

               <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xs mb-4 sm:mb-6">
              Build professional, ATS-friendly resumes in minutes with
              AI-powered tools. Get noticed. Get hired faster.
            </p>

            <div className="flex gap-3 sm:gap-4 text-xl sm:text-2xl text-gray-400">
              <FaCcMastercard className="hover:text-[#c40116] transition-colors duration-200 cursor-pointer" />
              <FaCcVisa className="hover:text-[#c40116] transition-colors duration-200 cursor-pointer" />
              <FaCcAmex className="hover:text-[#c40116] transition-colors duration-200 cursor-pointer" />
              <FaCcDiscover className="hover:text-[#c40116] transition-colors duration-200 cursor-pointer" />
            </div>
          </div>

          {/* Company */}
          <div>
                <h3 className="text-base sm:text-lg font-bold text-[#5e000b] mb-3 sm:mb-4">Company</h3>
            <ul className="space-y-1 sm:space-y-2 md:space-y-3 text-sm sm:text-base text-gray-600">
              <li onClick={() => router.push("/contact-us")} className="hover:text-[#c40116] transition-colors duration-200 text-left w-full py-1">
                Contact Us
              </li>
              <li onClick={() => router.push("/subscription")} className="hover:text-[#c40116] transition-colors duration-200 text-left w-full py-1">
                Subscription
              </li>
              <li onClick={() => router.push("/terms-conditions")} className="hover:text-[#c40116] transition-colors duration-200 text-left w-full py-1">
                Terms & Conditions
              </li>
              <li onClick={() => router.push("/privacy-policy")} className="hover:text-[#c40116] transition-colors duration-200 text-left w-full py-1">
                Privacy Policy
              </li>
            </ul>
          </div>

          {/* Network */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#5e000b] mb-3 sm:mb-4">Our Network</h3>
            <ul className="space-y-1 sm:space-y-2 md:space-y-3 text-sm sm:text-base text-gray-600">
              <li><a  className="hover:text-[#c40116] transition-colors duration-200 inline-block py-1" href="https://aryuacademy.com/" target="_blank">Aryu Academy</a></li>
              <li><a  className="hover:text-[#c40116] transition-colors duration-200 inline-block py-1" href="https://aryutechnologies.com/" target="_blank">Aryu Technologies</a></li>
              <li><a  className="hover:text-[#c40116] transition-colors duration-200 inline-block py-1" href="https://aryu.agency/" target="_blank">Aryu Agency</a></li>
              <li><a  className="hover:text-[#c40116] transition-colors duration-200 inline-block py-1" href="https://aryuenterprises.com/" target="_blank">Aryu Enterprises</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        {/* Divider */}
        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 pt-6 sm:pt-8 border-t border-red-100">
          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-gray-500">
            <p>
              © {new Date().getFullYear()} Aryu SmartCV. All rights reserved.
            </p>

            <div className="flex items-center gap-4">
              {/* Social Links */}
              <div className="flex gap-3">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#c40116] transition-colors"
                  aria-label="Twitter"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#c40116] transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#c40116] transition-colors"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </div>

              <span className="hidden sm:inline">|</span>

              <p>
                Designed with ❤️ by{" "}
                <span className="text-[#c40116] font-semibold">Aryu Team</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
