// "use client";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import { FiMail, FiPhone, FiMapPin, FiHeart, FiTwitter, FiLinkedin, FiGithub, FiFacebook } from "react-icons/fi";

// const Footer = () => {
//   const router = useRouter();

//   const footerLinks = {
//     company: [
//       { name: "About Us", path: "/about-us" },
//       { name: "Contact Us", path: "/contact-us" },
//       { name: "Subscription", path: "/subscription" },
//       { name: "Terms & Conditions", path: "/terms-conditions" },
//       { name: "Privacy Policy", path: "/privacy-policy" },
//     ],
//     network: [
//       { name: "Aryu Academy", url: "https://aryuacademy.com/" },
//       { name: "Aryu Technologies", url: "https://aryutechnologies.com/" },
//       { name: "Aryu Agency", url: "https://aryu.agency/" },
//       { name: "Aryu Enterprises", url: "https://aryuenterprises.com/" },
//     ],
//   };

//   const socialLinks = [
//     { icon: FiLinkedin, url: "https://linkedin.com", label: "LinkedIn" },
//     { icon: FiTwitter, url: "https://twitter.com", label: "Twitter" },
//     { icon: FiFacebook, url: "https://facebook.com", label: "Facebook" },
//     { icon: FiGithub, url: "https://github.com", label: "GitHub" },
//   ];

//   return (
//     <footer className="relative bg-white border-t border-gray-100 overflow-hidden">
//       {/* Decorative Background */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-20" />
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-20" />
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
//           {/* Brand Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//             className="sm:col-span-2 lg:col-span-1"
//           >
//             <Image
//                 src="/logo.png"
//             alt="ATS Pass"
//               width={180}
//               height={60}
//               className="cursor-pointer mb-4"
//               onClick={() => router.push("/")}
//             />

//             <p className="text-sm text-gray-600 leading-relaxed max-w-xs mb-4">
//               Create an ATS-friendly resume in minutes with AI. Get shortlisted. Get hired faster.
//             </p>

//             {/* Contact Info */}
//             <div className="space-y-2 mt-4">
//               <div className="flex items-center gap-2 text-sm text-gray-500">
//                 <FiMail className="w-4 h-4 text-indigo-600" />
//                 <span>aryusmartcv@gmail.com</span>
//               </div>
//             </div>
//           </motion.div>

//           {/* Company Links */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//           >
//             <h3 className="text-base font-bold text-gray-900 mb-4">Company</h3>
//             <ul className="space-y-2">
//               {footerLinks.company.map((link) => (
//                 <li key={link.name}>
//                   <button
//                     onClick={() => router.push(link.path)}
//                     className="text-sm text-gray-500 hover:text-indigo-600 transition-colors duration-200 py-1 cursor-pointer"
//                   >
//                     {link.name}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>

//           {/* Our Network */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             <h3 className="text-base font-bold text-gray-900 mb-4">Our Network</h3>
//             <ul className="space-y-2">
//               {footerLinks.network.map((link) => (
//                 <li key={link.name}>
//                   <a
//                     href={link.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-sm text-gray-500 hover:text-indigo-600 transition-colors duration-200 py-1 inline-block"
//                   >
//                     {link.name}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>

//           {/* Newsletter Section */}
//           <div>

//           </div>
//         </div>

//         {/* Bottom Section */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           className="mt-12 pt-8 border-t border-gray-100"
//         >
//           <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//             {/* Copyright */}
//             <p className="text-xs text-gray-400">
//               © {new Date().getFullYear()} Ats Pass. All rights reserved.
//             </p>

//             {/* Social Links */}
//             <div className="flex items-center gap-4">
//               {socialLinks.map((social) => (
//                 <a
//                   key={social.label}
//                   href={social.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-gray-400 hover:text-indigo-600 transition-colors duration-200"
//                   aria-label={social.label}
//                 >
//                   <social.icon className="w-4 h-4" />
//                 </a>
//               ))}
//             </div>

//             {/* Credit */}

//           </div>
//         </motion.div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiHeart,
  FiTwitter,
  FiLinkedin,
  FiGithub,
  FiFacebook,
  FiInstagram,
  FiYoutube,
  FiSend,
  FiArrowUpRight,
  FiAward,
  FiUsers,
  FiTrendingUp,
  FiShield,
  FiStar,
} from "react-icons/fi";


const Footer = () => {
  const router = useRouter();

  const footerLinks = {
    company: [
      { name: "About Us", path: "/about-us", icon: FiUsers },
      { name: "Contact Us", path: "/contact-us", icon: FiMail },
      { name: "Subscription", path: "/subscription", icon: FiStar },
      { name: "Terms & Conditions", path: "/terms-conditions", icon: FiShield },
      { name: "Privacy Policy", path: "/privacy-policy", icon: FiShield },
    ],
    network: [
      { name: "Aryu Academy", url: "https://aryuacademy.com/" },
      { name: "Aryu Technologies", url: "https://aryutechnologies.com/" },
      { name: "Aryu Agency", url: "https://aryu.agency/" },
      { name: "Aryu Enterprises", url: "https://aryuenterprises.com/" },
    ],
  };

  const socialLinks = [
    {
      icon: FiLinkedin,
      url: "https://linkedin.com",
      label: "LinkedIn",
      color: "hover:text-[#0077b5]",
    },
    {
      icon: FiTwitter,
      url: "https://twitter.com",
      label: "Twitter",
      color: "hover:text-[#1DA1F2]",
    },
    {
      icon: FiFacebook,
      url: "https://facebook.com",
      label: "Facebook",
      color: "hover:text-[#1877f2]",
    },
   
    {
      icon: FiInstagram,
      url: "https://instagram.com",
      label: "Instagram",
      color: "hover:text-[#e4405f]",
    },
    {
      icon: FiYoutube,
      url: "https://youtube.com",
      label: "YouTube",
      color: "hover:text-[#ff0000]",
    },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 border-t border-gray-100 overflow-hidden">
    

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-wrap gap-8 lg:gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="relative">
                <Image
                  src="/logo.png"
                  alt="ATS Pass"
                  width={160}
                  height={50}
                  className="cursor-pointer"
                  onClick={() => router.push("/")}
                />
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed max-w-md mb-6">
              Create an ATS-friendly resume in minutes with AI. Get shortlisted.
              Get hired faster.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600 group">
                <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                  <FiMail className="w-4 h-4 text-indigo-600" />
                </div>
                <span className="group-hover:text-indigo-600 transition-colors">
                  passats@gmail.com
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 group">
                <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                  <FiMapPin className="w-4 h-4 text-indigo-600" />
                </div>
                <span className="group-hover:text-indigo-600 transition-colors">
                  Chennai, India
                </span>
              </div>
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></span>
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    onClick={() => router.push(link.path)}
                    className="group flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-all duration-200 py-1 cursor-pointer"
                  >
                    <link.icon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.name}</span>
                    <FiArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Our Network */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></span>
              Our Network
            </h3>
            <ul className="space-y-2">
              {footerLinks.network.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-600 transition-colors duration-200 py-1 "
                  >
                  <span>  {link.name}</span>
                    <FiArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 pt-6 border-t border-gray-200"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm  text-gray-400">
              © {new Date().getFullYear()} Ats Pass. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${social.color} transition-all duration-300`}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>

            {/* Made with love */}
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <span>Made with</span>
              <FiHeart className="w-3 h-3 text-red-500 animate-pulse" />
              <span>for your career</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
