import React from "react";
import { FiPhone, FiMail, FiHelpCircle, FiFileText } from "react-icons/fi";

const ContactCards = () => {
  const cards = [
    {
      title: "Billing Support",
      desc: "Questions about pricing, payments, or subscriptions? Our billing team is here to help.",
      phone: "+44 808 502 0312",
      email: "support@aryusmartcv.com",
    },
    {
      title: "Customer Support",
      desc: "Need help using ARYU SmartCV or facing technical issues? Contact our support team.",
      phone: "+44 808 502 0312",
      email: "help@aryusmartcv.com",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-red-50 to-white py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent">
            We're here to help
          </h2>
          <p className="text-gray-600 mt-3 text-lg">
            Reach out to ARYU SmartCV support anytime. We respond fast.
          </p>
        </div>

        {/* Support Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-xl border border-red-100 rounded-3xl p-8 shadow-xl hover:shadow-red-200/50 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {card.title}
              </h3>

              <p className="text-gray-600 mb-6">
                {card.desc}
              </p>

              <div className="space-y-4">
                {/* Phone */}
                <div className="flex items-center gap-3 text-gray-800 font-medium">
                  <FiPhone className="text-red-500 text-lg" />
                  {card.phone}
                </div>

                {/* Email */}
                <div className="flex items-center gap-3 text-gray-800 font-medium">
                  <FiMail className="text-red-500 text-lg" />
                  {card.email}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-8">
                <a href={`tel:${card.phone}`}>
                  <button className="px-6 py-2 rounded-full bg-gradient-to-r from-red-600 to-rose-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all">
                    Call Now
                  </button>
                </a>

                <a href={`mailto:${card.email}`}>
                  <button className="px-6 py-2 rounded-full border border-red-400 text-red-600 font-semibold hover:bg-red-50 transition-all">
                    Email Us
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Help Section */}
        <div className="mt-20 bg-white rounded-3xl shadow-xl border border-red-100 p-10">
          <h3 className="text-3xl font-bold text-center mb-10 text-gray-900">
            Quick Help Center
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-red-50">
              <FiHelpCircle className="text-red-500 text-2xl" />
              <div>
                <div className="font-semibold text-gray-800">Help Center</div>
                <div className="text-gray-600 text-sm">
                  Browse guides & tutorials
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 rounded-2xl bg-red-50">
              <FiFileText className="text-red-500 text-2xl" />
              <div>
                <div className="font-semibold text-gray-800">Documentation</div>
                <div className="text-gray-600 text-sm">
                  Learn how ARYU SmartCV works
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 rounded-2xl bg-red-50">
              <FiMail className="text-red-500 text-2xl" />
              <div>
                <div className="font-semibold text-gray-800">Contact Support</div>
                <div className="text-gray-600 text-sm">
                  Get help from our experts
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactCards;
