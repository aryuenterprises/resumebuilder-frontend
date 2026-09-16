"use client";

import { motion } from "framer-motion";
import {
  FiShield,
  FiLock,
  FiEye,
  FiDatabase,
  FiMail,
  FiGlobe,
  FiClock,
  FiUserCheck,
  FiTrash2,
  FiDownload,
  FiEdit2,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowRight,
  FiCreditCard,
  FiRefreshCw,
  FiXCircle,
  FiDollarSign,
  FiCalendar,
  FiZap,
  FiHeart,
} from "react-icons/fi";
import {
  FaShieldAlt,
  FaRegBuilding,
  FaRegCalendarAlt,
  FaGraduationCap,
  FaGem,
  FaRocket,
  FaStar,
  FaChessQueen,
} from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/app/config/api";

interface PlanFeature {
  name: string;
  included: boolean;
  highlight?: boolean;
}

interface Plan {
  id: string;
  name: string;
  duration_days: string;
  description: string;
  features: PlanFeature[];
  popular?: boolean;
  color: string;
  icon: React.ReactNode;
  badge?: string;
  regularPrice: string;
  discountPrice: string;
}

interface ApiPlan {
  id: string;
  name: string;
  price: string;
  plan: string;
  title: string;
  description: string;
  discount_price: string;
  order: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  duration_days: string;
}

export default function SubscriptionPolicy() {
  const [planDetails, setPlanDetails] = useState<Plan[]>([]);

  const transformAPIPlanToPlan = (apiPlan: ApiPlan): Plan => {
    const parseFeaturesFromHTML = (htmlString: string): PlanFeature[] => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, "text/html");

      // Get both ul and ol elements
      const lists = doc.querySelectorAll("ul, ol");

      const features: PlanFeature[] = [];

      lists.forEach((list) => {
        const listItems = list.querySelectorAll("li");
        const isOrdered = list.tagName.toLowerCase() === "ol";

        listItems.forEach((item, index) => {
          const text = item.textContent?.trim() || "";
          const isBullet = !isOrdered;
          const included = isBullet;
          const isHighlight = text.toLowerCase().includes("premium");

          features.push({
            name: text,
            included: included,
            highlight: isHighlight,
            ...(isOrdered && { order: index + 1 }),
          });
        });
      });

      return features;
    };

    const getPlanColor = (planName: string): string => {
      switch (planName?.toLowerCase()) {
        case "free":
          return "from-slate-500 to-slate-600";
        case "pro":
          return "from-indigo-600 to-indigo-500";
        case "premium":
          return "from-purple-500 to-indigo-600";
        default:
          return "from-gray-500 to-gray-600";
      }
    };

    const getPlanIcon = (planName: string): React.ReactNode => {
      switch (planName?.toLowerCase()) {
        case "free":
          return <FiHeart className="w-4 h-4 sm:w-5 sm:h-5" />;
        case "pro":
          return <FaChessQueen className="w-4 h-4 sm:w-5 sm:h-5" />;
        case "premium":
          return <FaGem className="w-4 h-4 sm:w-5 sm:h-5" />;
        default:
          return <FiHeart className="w-4 h-4 sm:w-5 sm:h-5" />;
      }
    };

    const getPlanBadge = (planName: string): string | undefined => {
      switch (planName?.toLowerCase()) {
        case "pro plus":
          return "Best Value";
        case "premium":
          return "Ultimate Value";
        default:
          return undefined;
      }
    };

    const isPopular = (planName: string): boolean => {
      return planName?.toLowerCase() === "pro";
    };

    const features = parseFeaturesFromHTML(apiPlan.description);
    const planColor = getPlanColor(apiPlan.name);
    const planIcon = getPlanIcon(apiPlan.name);
    const planBadge = getPlanBadge(apiPlan.name);

    return {
      id: apiPlan.id,
      name: apiPlan.name,
      regularPrice: apiPlan.price,
      discountPrice: apiPlan.discount_price,
      duration_days: apiPlan.duration_days,
      description: apiPlan.slug,
      color: planColor,
      icon: planIcon,
      popular: isPopular(apiPlan.name),
      ...(planBadge && { badge: planBadge }),
      features: features,
    };
  };

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get(`${API_URL}/pricing-plans/`);
        const apiPlans = res.data.plans || [];
        const transformedPlans = apiPlans.map(transformAPIPlanToPlan);
        setPlanDetails(transformedPlans);
      } catch (err) {
        console.error("Error fetching plans:", err);
      }
    };
    fetchPlans();
  }, []);

  const sections = [
    {
      id: 1,
      icon: <FiCreditCard className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Subscription Plans",
      content: `PassATS offers multiple subscription plans designed for different stages of your job search. Each plan provides access to a different set of features — including AI-powered resume tools, ATS optimisation, and professional templates.
      
      ${[...planDetails]
        .reverse()
        .map(
          (item) =>
            `• ${item.name}: ₹${item.discountPrice} ${item.duration_days.toLowerCase() === "life time" ? "(Lifetime)" : `/ ${item.duration_days} days`}`,
        )
        .join("\n")}

      `,
    },
    {
      id: 2,
      icon: <FiLock className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Billing & Payment",
      content: `All payments are processed securely through Razorpay, one of India's leading payment gateways. We accept UPI, debit cards, credit cards, net banking, and popular wallets. All prices are displayed and charged in Indian Rupees (INR).

Plans are charged on a one-time basis only. We do not offer auto-renewal — your plan simply expires at the end of its duration, and you can choose to purchase a new plan whenever you wish to continue.
`,
    },
    {
      id: 3,
      icon: <FiRefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Refunds",
      content: `We want you to be satisfied with PassATS. If you are not happy with a paid plan, you may request a full refund within 7 days of your initial purchase or renewal by contacting us at support@aryuacademy.com.

Refunds will be credited to your original payment method within 5–7 business days.

Please note:
• Refund requests made after 7 days will be reviewed on a case-by-case basis.
• Refunds will not be processed where misuse or abuse of the refund policy is evident.
• We reserve the right to decline refunds for accounts that have made repeated refund requests.`,
    },
    {
      id: 4,
      icon: <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Plan Upgrades & Downgrades",
      content: `You can upgrade or downgrade your plan at any time from your account settings.

Upgrades & Downgrades: When you purchase a new plan — whether an upgrade or a downgrade — that plan is activated immediately. The full price of the new plan is charged at the time of purchase, and your features update instantly to match the new plan.

Free Plan — One-Time Only: The Free plan can only be claimed once per account. Once you have used the Free plan and moved to a paid plan, you cannot purchase or return to the Free plan again. If you wish to continue using PassATS after your paid plan ends, you will need to renew or purchase a paid plan.

Please note: No refund is provided for the remaining days of your previous plan when switching plans.`,
    },
    {
      id: 5,
      icon: <FiMail className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Questions About Your Subscription",
      content: `If you have any questions, concerns, or disputes related to your subscription, billing, or refund, please contact our support team:

Email: passats@aryuacademy.com
Support Portal: passats.aryuacademy.com/support
Website: passats.aryuacademy.com
Company: Aryu Academy Private Limited, Chennai, Tamil Nadu, India

We aim to respond to all subscription-related queries within 2 business days.`,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-10 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Decorative Background */}
        <div className="absolute -top-24 -right-24 w-64 sm:w-80 h-64 sm:h-80 bg-indigo-100 rounded-full blur-3xl opacity-30 pointer-events-none" />
        <div className="absolute bottom-0 -left-24 w-64 sm:w-80 h-64 sm:h-80 bg-purple-100 rounded-full blur-3xl opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-indigo-100 border border-indigo-200 mb-4 sm:mb-6">
              <FiCreditCard className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-indigo-600" />
              <span className="text-[10px] sm:text-xs font-medium text-indigo-700 uppercase tracking-wide">
                Subscription & Billing
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Subscription Policy
            </h1>

            <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-gray-500 max-w-3xl mx-auto">
              Transparent, secure, and flexible plans designed for your career
              success with PassATS.
            </p>

            <p className="mt-2 text-[11px] sm:text-xs text-gray-400 max-w-2xl mx-auto">
              Please read carefully before subscribing
            </p>
          </motion.div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Policy Sections */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            {sections.map((section, idx) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.05, 0.5) }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="p-4 sm:p-5 md:p-6 lg:p-7">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                        {section.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold md:font-bold text-gray-900 mb-2 sm:mb-3">
                          {section.id}. {section.title}
                        </h3>
                        <div className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed space-y-2 whitespace-pre-line">
                          {section.content}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-7 lg:p-8 text-center text-white"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 rounded-full mb-3 sm:mb-4">
              <FiMail className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">
              Have Questions About Your Subscription?
            </h3>
            <p className="text-indigo-100 text-xs sm:text-sm mb-4 sm:mb-5 md:mb-6">
              Contact our support team for assistance with billing,
              cancellation, or refunds.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="mailto:passats@aryuacademy.com"
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-white text-indigo-600 font-semibold rounded-lg sm:rounded-xl hover:shadow-lg transition-all text-xs sm:text-sm md:text-base"
              >
                <FiMail className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                passats@aryuacademy.com
              </a>
              <Link
                href="/support"
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-white/10 border border-white/30 text-white font-semibold rounded-lg sm:rounded-xl hover:bg-white/20 transition-all text-xs sm:text-sm md:text-base"
              >
                Contact Support
                <FiArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
