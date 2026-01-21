import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import {
  FiCreditCard,
  FiRefreshCw,
  FiXCircle,
  FiShield,
  FiFileText,
} from "react-icons/fi";

const Subscription = () => {
  return (
    <div className="bg-gradient-to-r from-red-50/50 to-white min-h-screen">
      <Header />

      <div className="p-4 sm:p-6 md:p-12 lg:p-20">
        {/* Hero */}
        <section className="text-center ">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold md:font-extrabold bg-gradient-to-r from-red-500 to-rose-700 bg-clip-text text-transparent">
            Subscription Policy
          </h1>
          <p className="mt-3 sm:mt-4 md:mt-5 text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Transparent, secure and flexible plans designed for your career
            success with ARYU SmartCV.
          </p>
        </section>

        {/* Policy Card */}
        <section className="max-w-4xl md:max-w-6xl mt-8 md:mt-10 mx-auto ">
          <div className="bg-white/80 md:bg-white/70 backdrop-blur-xl border border-red-100 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-sm sm:shadow-md md:shadow-lg p-4 sm:p-6 md:p-8 lg:p-10 space-y-8 sm:space-y-10 md:space-y-12">
            {/* Section */}
            <SubscriptionSection
              icon={
                <FiFileText className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />
              }
              title="Subscription Plans"
              text="ARYU SmartCV offers multiple subscription plans that provide access to premium templates, AI tools, and career-boosting features. Please review each plan carefully before subscribing."
            />

            <SubscriptionSection
              icon={
                <FiRefreshCw className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />
              }
              title="Free Trial (if available)"
              text="Some plans include a free trial. Once the trial ends, your subscription will automatically continue unless cancelled before the trial period expires."
            />

            <SubscriptionSection
              icon={
                <FiCreditCard className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />
              }
              title="Billing & Payment"
              text="All payments are securely processed. Subscriptions renew automatically at the end of each billing period unless cancelled beforehand."
            />

            <SubscriptionSection
              icon={
                <FiXCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />
              }
              title="Cancellation"
              text="You may cancel your subscription anytime from your account settings. Premium access remains active until the end of your billing cycle."
            />

            <SubscriptionSection
              icon={
                <FiShield className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />
              }
              title="Refunds"
              text="Payments are generally non-refundable except when required by law or under special circumstances."
            />

            <SubscriptionSection
              icon={
                <FiRefreshCw className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />
              }
              title="Changes to Subscription"
              text="We may update pricing, features, or plans periodically. Any changes will apply to future billing cycles only."
            />

            <SubscriptionSection
              icon={
                <FiFileText className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />
              }
              title="Your Responsibility"
              text="You are responsible for keeping your billing information accurate and ensuring payments are made on time."
            />
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

/* Reusable Policy Section */
const SubscriptionSection = ({ icon, title, text }) => {
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

export default Subscription;
