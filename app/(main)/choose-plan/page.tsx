"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiStar,
  FiHeart,
  FiX,
  FiCheckCircle,
  FiArrowRight,
  FiZap,
  FiShield,
  FiAward,
  FiTrendingUp,
  FiUsers,
  FiBriefcase,
} from "react-icons/fi";
import {
  IoSparkles,
  IoCheckmarkCircle,
  IoDiamondOutline,
  IoRocket,
  IoFlash,
  IoShieldCheckmark,
} from "react-icons/io5";
import { FaCrown, FaGem, FaChessQueen, FaChessKing } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API_URL } from "@/app/config/api";
import { RAZORPAY_KEY_ID } from "@/app/config/razorpay";
import { getLocalStorage } from "@/app/utils";
import { User } from "@/app/types/user.types";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { Toaster, toast } from "react-hot-toast";

// Types
interface PlanFeature {
  name: string;
  included: boolean;
  highlight?: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: "month" | "year" | "one-time" | "3 months" | "Lifetime";
  description: string;
  features: PlanFeature[];
  popular?: boolean;
  color: string;
  icon: React.ReactNode;
  badge?: string;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan | null;
  userId: string;
  userEmail: string;
  onSuccess: () => void;
}

interface usersCurrentPlan {
  amount: number;
  plan: string;
}

// Checkout Modal Component
const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  plan,
  userId,
  userEmail,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !plan) return null;

  const handlePayment = async () => {
    try {
      setLoading(true);

      const { data: order } = await axios.post(
        `${API_URL}/api/payment-razor/create-order`,
        {
          amount: plan.price,
          email: userEmail,
          planId: plan.id,
          userId: userId,
        },
      );

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Resume Builder",
        description: `${plan.name} Plan Subscription`,
        order_id: order.id,
        handler: async function (response: any) {
          try {
            await axios.post(`${API_URL}/api/payment-razor/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              planId: plan.id,
              userId: userId,
            });

            toast.success(`${plan.name} plan activated successfully!`, {
              duration: 4000,
              icon: "🎉",
              style: {
                background: "#10b981",
                color: "#fff",
                borderRadius: "12px",
              },
            });
            onSuccess();
            onClose();
          } catch (error) {
            toast.error("Payment verification failed", {
              duration: 3000,
              style: {
                background: "#ef4444",
                color: "#fff",
                borderRadius: "12px",
              },
            });
          }
        },
        prefill: { email: userEmail, name: "" },
        theme: { color: "#4f46e5" },
        modal: {
          ondismiss: function () {
            setLoading(false);
            toast("Payment cancelled", {
              icon: "⚠️",
              duration: 3000,
              style: {
                background: "#f59e0b",
                color: "#fff",
                borderRadius: "12px",
              },
            });
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
      setLoading(false);
    } catch (error) {
      console.error("Payment initiation error:", error);
      toast.error("Unable to start payment. Please try again.", {
        duration: 3000,
        style: {
          background: "#ef4444",
          color: "#fff",
          borderRadius: "12px",
        },
      });
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`bg-gradient-to-r ${plan.color} p-6 text-white relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-16 -mb-16"></div>
              <div className="relative">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      {plan.name} Plan
                    </h3>
                    <p className="text-white/80 text-sm">{plan.description}</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-1 hover:bg-white/20 rounded-xl transition-all duration-200"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    ₹{plan.price}
                  </span>
                  <span className="text-gray-500">/{plan.interval}</span>
                </div>
                <div className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      {feature.included ? (
                        <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          <IoCheckmarkCircle className="w-3 h-3 text-emerald-500" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          <FiX className="w-3 h-3 text-gray-400" />
                        </div>
                      )}
                      <span
                        className={`text-sm ${feature.highlight ? "text-gray-900 font-semibold" : "text-gray-700"}`}
                      >
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePayment}
                disabled={loading}
                className={`w-full py-3 rounded-xl font-semibold cursor-pointer text-white transition-all duration-300 bg-gradient-to-r ${plan.color} ${loading ? "opacity-60 cursor-not-allowed" : "hover:shadow-xl"}`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : plan.price === 0 ? (
                  "Activate Free Plan"
                ) : (
                  `Pay ₹${plan.price}`
                )}
              </motion.button>
              <p className="text-xs text-gray-500 text-center mt-4 flex items-center justify-center gap-1">
                <IoShieldCheckmark className="w-3 h-3" /> Secure payment powered
                by Razorpay
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Plans Data
const plans: Plan[] = [
  {
    id: "690b55de1ad575c1823e2ace",
    name: "Free",
    price: 0,
    interval: "Lifetime",
    description: "Perfect for getting started",
    color: "from-slate-500 to-slate-600",
    icon: <FiHeart className="w-5 h-5" />,
    features: [
      { name: "1 Resume Template", included: true },
      { name: "Basic ATS Optimization", included: true },
      { name: "PDF Download", included: true },
      { name: "AI-Powered Suggestions", included: false },
      { name: "Multiple Templates", included: false },
      { name: "Photo Upload", included: false },
    ],
  },
  {
    id: "690d83a79a17458ddd4ff601",
    name: "Pro",
    price: 1,
    interval: "month",
    description: "Ideal for professionals",
    color: "from-indigo-600 to-indigo-500",
    icon: <FaChessQueen className="w-5 h-5" />,
    popular: true,
    features: [
      { name: "3 Resume Templates", included: true, highlight: true },
      { name: "ATS Optimization", included: true, highlight: true },
      { name: "AI Content Suggestions", included: true, highlight: true },
      { name: "Photo Upload", included: true },
      { name: "Cover Letter Builder", included: false },
      { name: "Interview Prep Kit", included: false },
    ],
  },
  {
    id: "690b564a1ad575c1823e2ae3",
    name: "Pro Plus",
    price: 2,
    interval: "month",
    description: "Complete career toolkit",
    color: "from-amber-500 to-orange-500",
    icon: <FaChessKing className="w-5 h-5" />,
    badge: "Best Value",
    features: [
      { name: "5 Resume Templates", included: true, highlight: true },
      { name: "Advanced ATS Optimization", included: true, highlight: true },
      { name: "Advanced AI Suggestions", included: true, highlight: true },
      { name: "Photo Upload", included: true },
      { name: "Cover Letter Builder", included: true },
      { name: "Interview Prep Kit", included: false },
    ],
  },
  {
    id: "6930560199d75df8ae697cab",
    name: "Premium",
    price: 3,
    interval: "Lifetime",
    description: "Ultimate career solution",
    color: "from-purple-500 to-indigo-600",
    icon: <FaGem className="w-5 h-5" />,
    badge: "Ultimate Value",
    features: [
      { name: "All Templates", included: true, highlight: true },
      { name: "Premium ATS Optimization", included: true, highlight: true },
      { name: "Unlimited AI Suggestions", included: true, highlight: true },
      { name: "Photo Upload", included: true },
      { name: "Cover Letter Builder", included: true },
      { name: "Interview Prep Kit", included: true, highlight: true },
    ],
  },
];

// Comparison Features
const comparisonFeatures = [
  {
    name: "Resume Templates",
    free: "1 Basic",
    pro: "3 Templates",
    proPlus: "5 Professional",
    premium: "All Premium",
  },
  {
    name: "ATS Optimization",
    free: "Basic Check",
    pro: "Basic",
    proPlus: "Advanced",
    premium: "Premium + High Match",
  },
  {
    name: "AI Resume Writing",
    free: "Limited",
    pro: "Basic",
    proPlus: "Smart",
    premium: "Unlimited",
  },
  {
    name: "Profile Photo",
    free: "❌",
    pro: "✅",
    proPlus: "✅",
    premium: "✅",
  },
  {
    name: "Cover Letter Builder",
    free: "❌",
    pro: "❌",
    proPlus: "✅",
    premium: "✅",
  },
  {
    name: "Interview Kit",
    free: "❌",
    pro: "❌",
    proPlus: "❌",
    premium: "✅",
  },
  {
    name: "Best For",
    free: "Trial",
    pro: "Beginners",
    proPlus: "Job Seekers",
    premium: "Career Growth",
  },
];

// FAQ Data
const faqs = [
  {
    q: "Can I switch plans later?",
    a: "Yes. You can upgrade or downgrade anytime. Your access updates instantly.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept UPI, debit cards, credit cards, and all major payment methods.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes. You can create and download a basic resume for free forever.",
  },
  {
    q: "Can I cancel my subscription?",
    a: "Yes, you can cancel anytime from your dashboard.",
  },
  {
    q: "Is my payment secure?",
    a: "Yes, all payments are processed securely via Razorpay.",
  },
  {
    q: "Do you offer refunds?",
    a: "Please contact support for refund inquiries.",
  },
];

// Main Component
export default function ChoosePlanPage() {
  const router = useRouter();
  const userDetails = getLocalStorage<User>("user_details");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [usersCurrentPlan, setUsersCurrentPlan] =
    useState<usersCurrentPlan | null>(null);

  useEffect(() => {
    const userDetails = getLocalStorage<User>("user_details");
    setUserEmail(userDetails?.email || "");
    setUserId(userDetails?.id || "");

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/users/dashboard`, {
          params: { userId: userDetails?.id },
        });
        setUsersCurrentPlan(response?.data?.payments?.[0]);
      } catch (err) {
        console.error(err);
      }
    };

    if (userDetails) fetchUserData();
  }, []);

  const handleSelectPlan = async (plan: Plan) => {
    if (!userDetails) {
      router.push("/login");
      return;
    }

    if (plan.price === 0) {
      setLoading(true);
      try {
        await axios.post(`${API_URL}/api/payment-razor/free-plan`, {
          userId: userId,
          planId: plan.id,
        });
        toast.success("Free Plan Activated!", {
          duration: 3000,
          icon: "🎉",
          style: { background: "#10b981", color: "#fff", borderRadius: "12px" },
        });
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Failed to activate free plan",
          {
            duration: 3000,
            style: {
              background: "#ef4444",
              color: "#fff",
              borderRadius: "12px",
            },
          },
        );
      } finally {
        setLoading(false);
      }
    } else {
      setSelectedPlan(plan);
      setShowCheckout(true);
    }
  };

  const handlePaymentSuccess = () => {
    router.push("/choose-template");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 via-white to-indigo-50/30">
      <Toaster position="top-right" />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-semibold mb-6 border border-white/30"
            >
              <IoRocket className="w-4 h-4" />
              <span>LIMITED TIME OFFER</span>
              <IoSparkles className="w-4 h-4" />
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4">
              Choose Your
              <span className="block bg-gradient-to-r from-yellow-300 to-amber-200 bg-clip-text text-transparent mt-2">
                Perfect Plan
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Get the tools you need to create professional resumes and land
              your dream job
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="w-full h-16"
          >
            <path d="M0 120L1440 0V120H0Z" fill="white" />
          </svg>
        </div>
      </div>

      {/* Plans Grid Section */}
      <div className=" mx-auto px-4 sm:px-6  md:px-10 lg:px-16 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => {
            const isHovered = hoveredPlan === plan.id;
            const isSamePlan =
              plan.name.toLowerCase() === usersCurrentPlan?.plan?.toLowerCase();

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
                className="relative"
              >
                {/* Animated border glow */}
                <motion.div
                  className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-0 blur-xl"
                  animate={{ opacity: isHovered ? 0.2 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                <motion.div
                  animate={{ y: isHovered ? -8 : 0 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                  className="relative h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                

                  {/* Card Header */}
                  <motion.div
                    className={`bg-gradient-to-r ${plan.color} p-6 text-white relative overflow-hidden`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"
                      animate={{ scale: isHovered ? 1.2 : 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="relative">
                      <motion.div
                        className="inline-flex p-3 bg-white/20 rounded-xl backdrop-blur-sm mb-4"
                        animate={{ rotate: isHovered ? 10 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {plan.icon}
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                      <p className="text-white/80 text-sm mb-3">
                        {plan.description}
                      </p>
                      <div className="flex items-baseline gap-1">
                        <motion.span
                          className="text-4xl font-bold"
                          animate={{ scale: isHovered ? 1.05 : 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          ₹{plan.price}
                        </motion.span>
                        <span className="text-white/80 text-sm">
                          /{plan.interval}
                        </span>
                      </div>
                      {plan.badge && !isSamePlan && (
                        <motion.span
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="absolute top-0 right-0 px-2 py-1 bg-white/20 rounded-full text-xs backdrop-blur-sm"
                        >
                          {plan.badge}
                        </motion.span>
                      )}
                      {isSamePlan && (
                        <span className="absolute top-0 right-0 px-2 py-1 bg-emerald-500/80 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                          <FiCheckCircle className="w-3 h-3" /> Active
                        </span>
                      )}
                    </div>
                  </motion.div>

                  {/* Features List */}
                  <div className="p-6">
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 + idx * 0.02 }}
                          whileHover={{ x: 3 }}
                          className="flex items-start gap-2 group"
                        >
                          <motion.div
                            className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${feature.included ? "bg-emerald-100" : "bg-gray-100"}`}
                            whileHover={{ scale: 1.1 }}
                          >
                            {feature.included ? (
                              <IoCheckmarkCircle className="w-3 h-3 text-emerald-500" />
                            ) : (
                              <FiX className="w-3 h-3 text-gray-400" />
                            )}
                          </motion.div>
                          <span
                            className={`text-sm ${feature.highlight ? "text-gray-900 font-semibold" : "text-gray-700"} group-hover:text-gray-900 transition-colors`}
                          >
                            {feature.name}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Action Button */}
                    {isSamePlan ? (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        className="w-full py-3 bg-emerald-50 text-emerald-600 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 cursor-default border border-emerald-200"
                      >
                        <FiCheckCircle className="w-4 h-4" /> Current Plan
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelectPlan(plan)}
                        disabled={loading}
                        className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 relative overflow-hidden cursor-pointer group ${plan.price === 0 ? "bg-gray-100 text-gray-700 hover:bg-gray-200" : `bg-gradient-to-r ${plan.color} text-white shadow-lg`}`}
                      >
                        <span className="relative z-10">
                          {plan.price === 0
                            ? "Switch to Free"
                            : `Upgrade to ${plan.name}`}
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                          initial={false}
                        />
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {[
            {
              icon: FiUsers,
              value: "10,000+",
              label: "Active Users",
              color: "indigo",
              bg: "bg-indigo-100",
              text: "text-indigo-600",
            },
            {
              icon: FiBriefcase,
              value: "50,000+",
              label: "Resumes Created",
              color: "purple",
              bg: "bg-purple-100",
              text: "text-purple-600",
            },
            {
              icon: FiTrendingUp,
              value: "85%",
              label: "Interview Success",
              color: "emerald",
              bg: "bg-emerald-100",
              text: "text-emerald-600",
            },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <motion.div
                className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mx-auto mb-3`}
                whileHover={{ rotate: 5, scale: 1.1 }}
              >
                <stat.icon className={`w-6 h-6 ${stat.text}`} />
              </motion.div>
              <motion.p
                className="text-2xl font-bold text-gray-900"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + idx * 0.1 }}
              >
                {stat.value}
              </motion.p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-20"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Compare All Features
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              See exactly what you get with each plan
            </p>
          </div>

          <div className="overflow-x-auto bg-white rounded-2xl shadow-xl border border-gray-100">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                  <th className="p-5 text-left text-sm font-semibold text-gray-900">
                    Features
                  </th>
                  {plans.map((plan) => (
                    <th key={plan.id} className="p-5 text-center">
                      <div
                        className={`inline-block text-sm font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}
                      >
                        {plan.name}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, idx) => (
                  <motion.tr
                    key={idx}
                    className="border-b border-gray-100 hover:bg-indigo-50/30 transition-all duration-200"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <td className="p-5 text-sm font-medium text-gray-900">
                      {feature.name}
                    </td>
                    <td className="p-5 text-center text-sm text-gray-600">
                      {feature.free}
                    </td>
                    <td className="p-5 text-center text-sm text-gray-600 font-medium">
                      {feature.pro}
                    </td>
                    <td className="p-5 text-center text-sm text-gray-600 font-medium">
                      {feature.proPlus}
                    </td>
                    <td className="p-5 text-center text-sm text-gray-600 font-medium">
                      {feature.premium}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-20"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Everything you need to know about our plans
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + idx * 0.05 }}
                whileHover={{ y: -3 }}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <FiAward className="w-5 h-5 text-indigo-500" /> {faq.q}
                </h3>
                <p className="text-sm text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-20 text-center"
        >
          <p className="text-xs text-gray-400 mb-6">
            Trusted by professionals from leading companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            <span className="text-base font-semibold text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
              Google
            </span>
            <span className="text-base font-semibold text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
              Microsoft
            </span>
            <span className="text-base font-semibold text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
              Amazon
            </span>
            <span className="text-base font-semibold text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
              Meta
            </span>
            <span className="text-base font-semibold text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
              Apple
            </span>
            <span className="text-base font-semibold text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
              Netflix
            </span>
          </div>
        </motion.div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => {
          setShowCheckout(false);
          setSelectedPlan(null);
        }}
        plan={selectedPlan}
        userId={userId}
        userEmail={userEmail}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
