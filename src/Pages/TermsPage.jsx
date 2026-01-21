import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import {
  FiFileText,
  FiUser,
  FiCreditCard,
  FiShield,
  FiAlertTriangle,
  FiLock,
  FiRefreshCw,
  FiGlobe,
} from "react-icons/fi";

const TermsPage = () => {
  return (
    <div className="bg-gradient-to-r from-red-50/50 to-white min-h-screen">
      <Header />

      <div className="p-4 sm:p-6 md:p-12 lg:p-20">
        {/* Hero */}
        <section className=" text-center ">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold md:font-extrabold bg-gradient-to-r from-red-500 to-rose-700 bg-clip-text text-transparent">
            Terms of Use & Service
          </h1>
           <p className="mt-3 sm:mt-4 md:mt-5 text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Please read these Terms carefully before using ARYU SmartCV. By
            accessing our platform, you agree to comply with these policies.
          </p>
        </section>

        {/* Terms Card */}
 <section className="max-w-4xl md:max-w-6xl mt-8 md:mt-10 mx-auto ">
            <div className="bg-white/80 md:bg-white/70 backdrop-blur-xl border border-red-100 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-sm sm:shadow-md md:shadow-lg p-4 sm:p-6 md:p-8 lg:p-10 space-y-8 sm:space-y-10 md:space-y-12">
            <PolicySection
              icon={<FiFileText />}
              title="Acceptance of Terms"
              text="By using ARYU SmartCV, you agree to these Terms and all applicable policies. If you do not agree, please discontinue using the platform immediately."
            />

            <PolicySection
              icon={<FiUser />}
              title="User Account & Registration"
              text="You may be required to create an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials."
            />

            <PolicySection
              icon={<FiCreditCard />}
              title="Subscription & Payments"
              text="Some features require a paid subscription. All billing is handled securely and subscriptions renew automatically unless cancelled."
            />

            <PolicySection
              icon={<FiShield />}
              title="Use of Service"
              text="You may use ARYU SmartCV for personal and professional resume creation. Any illegal, abusive, or unauthorized use is strictly prohibited."
            />

            <PolicySection
              icon={<FiLock />}
              title="Privacy & Data Protection"
              text="We respect your privacy and comply with applicable Indian data protection laws. Your information is securely stored and used only to provide our services."
            />

            <PolicySection
              icon={<FiAlertTriangle />}
              title="Disclaimers & Limitations"
              text="We do not guarantee job placement or hiring outcomes. You are solely responsible for the content created using the platform."
            />

            <PolicySection
              icon={<FiRefreshCw />}
              title="Termination of Access"
              text="We reserve the right to suspend or terminate your account if you violate these Terms or misuse the platform."
            />

            <PolicySection
              icon={<FiGlobe />}
              title="Governing Law"
              text="These Terms are governed by the laws of India. Any disputes shall be handled within Indian courts."
            />
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

/* Reusable Policy Section */
const PolicySection = ({ icon, title, text }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
      <div className="flex-shrink-0">
        <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-12 md:h-12 rounded-lg sm:rounded-xl md:rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-lg sm:text-xl md:text-2xl">
          {icon}
        </div>
      </div>

      <div className="flex-1">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
};

export default TermsPage;
