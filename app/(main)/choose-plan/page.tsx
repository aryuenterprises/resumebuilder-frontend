"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiStar, FiHeart, FiX, FiCheckCircle } from "react-icons/fi";
import { IoSparkles, IoCheckmarkCircle } from "react-icons/io5";
import { FaCrown, FaGem } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { FaChessQueen } from "react-icons/fa";
import { FaChessKing } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "@/app/config/api";
import { RAZORPAY_KEY_ID } from "@/app/config/razorpay";
import { getLocalStorage } from "@/app/utils";
import { User } from "@/app/types/user.types";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { toast } from "react-toastify";

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
  savings?: string;
}

// Checkout Modal Component
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

            Swal.fire({
              icon: "success",
              title: "Payment Successful!",
              text: `${plan.name} plan has been activated`,
              timer: 2000,
              showConfirmButton: false,
            });

            onSuccess();
            onClose();
          } catch (error) {
            console.error("Verification error:", error);
            Swal.fire("Error", "Payment verification failed", "error");
          }
        },

        prefill: {
          email: userEmail,
          name: "",
        },

        theme: {
          color: "#2563eb",
        },

        modal: {
          ondismiss: async function () {
            setLoading(false);
            try {
              await axios.post(`${API_URL}/api/payment-razor/payment-failed`, {
                orderId: order.id,
                reason: "User closed payment popup",
              });
            } catch (error) {
              console.error("Failed to log payment cancellation:", error);
            }
            Swal.fire(
              "Payment Cancelled",
              "You closed the payment window.",
              "info",
            );
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);

      rzp.on("payment.failed", async function (response: any) {
        setLoading(false);
        try {
          await axios.post(`${API_URL}/api/payment-razor/payment-failed`, {
            orderId: response.error.metadata.order_id,
            paymentId: response.error.metadata.payment_id,
            reason: response.error.description,
          });
        } catch (error) {
          console.error("Failed to log payment failure:", error);
        }
        Swal.fire("Payment Failed", response.error.description, "error");
      });

      rzp.open();
      setLoading(false);
    } catch (error) {
      console.error("Payment initiation error:", error);
      Swal.fire("Error", "Unable to start payment. Please try again.", "error");
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl sm:rounded-2xl max-w-md w-full shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`bg-linear-to-r ${plan.color} p-6 text-white`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name} Plan</h3>
                  <p className="text-white/80 text-sm">{plan.description}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-white/20 rounded-lg transition"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold font-sans">
                    ₹{plan.price}
                  </span>
                  <span className="text-gray-500">/{plan.interval}</span>
                </div>

                <div className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      {feature.included ? (
                        <IoCheckmarkCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <FiX className="w-5 h-5 text-gray-300 shrink-0 mt-0.5" />
                      )}
                      <span
                        className={`text-sm ${
                          feature.highlight
                            ? "text-gray-900 font-semibold"
                            : feature.included
                              ? "text-gray-700"
                              : "text-gray-400"
                        }`}
                      >
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading}
                className={`
                  w-full py-3 rounded-lg font-semibold text-white
                  transition-all duration-300 relative overflow-hidden
                  ${loading ? "opacity-60 cursor-not-allowed" : "hover:shadow-lg"}
                  bg-linear-to-r ${plan.color}
                `}
              >
                {loading
                  ? "Processing..."
                  : plan.price === 0
                    ? "Activate Free Plan"
                    : `Pay ₹${plan.price}`}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Secure payment powered by Razorpay
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const plans: Plan[] = [
  {
    id: "690b55de1ad575c1823e2ace",
    name: "Free",
    price: 0,
    interval: "one-time",
    description: "Perfect for getting started with basic resume",
    color: "from-slate-500 to-slate-700",
    icon: <FiHeart className="w-5 h-5 sm:w-6 sm:h-6" />,
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
    description: "Ideal for professionals looking to stand out",
    color: "from-[#C40116] to-[#5E000B]",
    icon: <FaChessQueen className="w-5 h-5 sm:w-6 sm:h-6" />,
    features: [
      { name: "3 Resume Templates", included: true, highlight: true },
      { name: "Basic ATS Optimization", included: true, highlight: true },
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
    description: "Complete career toolkit for serious job seekers",
    color: "from-amber-500 to-orange-500",
    icon: <FaChessKing className="w-5 h-5 sm:w-6 sm:h-6" />,
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
    description: "Complete career toolkit for serious job seekers",
    color: "from-purple-500 to-indigo-500",
    icon: <FaGem className="w-5 h-5 sm:w-6 sm:h-6" />,
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

// Comparison features for the table
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
  const [plan, setPlans] = useState();
  const [usersCurrentPlan, setusersCurrentPlan] =
    useState<usersCurrentPlan | null>(null);

  useEffect(() => {
    const userDetails = getLocalStorage<User>("user_details");
    setUserEmail(userDetails?.email || "");
    setUserId(userDetails?.id || "");

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/users/dashboard`, {
          params: {
            userId: userDetails?.id,
          },
        });

        setusersCurrentPlan(response?.data?.payments?.[0]);
      } catch (err) {
        console.error(err);
      }
    };

  if(userDetails)
    fetchUserData();
  }, []);

  const handleSelectPlan = async (plan: Plan) => {

     if (!userDetails) {
      router.push('/login');
    return;
  }
    // Handle free plan activation
    if (plan.price === 0) {
      setLoading(true);

      try {
        const response = await axios.post(
          `${API_URL}/api/payment-razor/free-plan`,
          {
            userId: userId,
            planId: plan.id,
          },
        );


        Swal.fire({
          icon: "success",
          title: "Free Plan Activated!",
          text: "You can now start using the free plan.",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error: any) {
        console.error("Error activating free plan:", error);
      Swal.fire({
  title: "Not Applicable",
  text: error?.response?.data?.message || "Failed to activate free plan",
  icon: "error",
  confirmButtonText: "Close" // Change this to your preferred text
});
      } finally {
        setLoading(false);
      }
    } else {
      // Open checkout for paid plans
      setSelectedPlan(plan);
      setShowCheckout(true);
    }
  };

  const handlePaymentSuccess = () => {
    router.push("/choose-template");
  };

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/plan-subscription/get-all-plan-subscription`,
          {
            params: { type: "active" },
          },
        );
        const plans = res?.data?.planSubscriptionDetails || "";
        setPlans(plans);
      } catch (err) {
        console.error("Error fetching plans:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-linear-to-r from-[#5E000B] to-[#C40116]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-black/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center p-1.5 sm:p-2 bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl mb-4 sm:mb-6">
              <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-linear-to-r from-yellow-600 to-amber-500 text-white rounded-lg sm:rounded-xl font-semibold flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <IoSparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Launch Offer Get Premium at a Lower Price</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-tight px-4">
              Upgrade Your Resume.
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-amber-200 mt-2">
                Get More Interview Calls.
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto px-4">
              Get better resumes, smarter AI suggestions, and tools that
              increase your chances of getting shortlisted.
            </p>
          </motion.div>
        </div>

        {/* Curved Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-8 sm:h-12 md:h-16 lg:h-20"
          >
            <path d="M0 100L1440 0V100H0Z" fill="white" fillOpacity="1" />
          </svg>
        </div>
      </div>

      <div className=" mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 ">
          {plans.map((plan, index) => {
            const isHovered = hoveredPlan === plan.id;

            const isSamePlan =
              plan.name.toLowerCase() === usersCurrentPlan?.plan.toLowerCase();

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
                className={`
          relative group cursor-pointer rounded-xl sm:rounded-2xl transition-all duration-500
        `}
              >
                {/* Plan Card */}
                <div
                  className={`
            relative h-full bg-white rounded-xl sm:rounded-2xl overflow-hidden
            transition-all duration-500
            ${isHovered ? "scale-105 shadow-2xl" : "shadow-lg"}
           
          `}
                >
                  {/* Card Header with Gradient */}
                  <div
                    className={`bg-linear-to-r ${plan.color} p-4 sm:p-5 md:p-6 text-white relative overflow-hidden`}
                  >
                    <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-white/10 rounded-full -mr-8 -mt-8"></div>
                    <div className="absolute bottom-0 left-0 w-16 sm:w-24 h-16 sm:h-24 bg-black/10 rounded-full -ml-8 -mb-8"></div>

                    <div className="relative">
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div className="p-1.5 sm:p-2 bg-white/20 rounded-lg sm:rounded-xl backdrop-blur-sm">
                          {plan.icon}
                        </div>
                        {plan.badge && !plan.popular && !isSamePlan && (
                          <span className="px-2 py-1 bg-white/20 rounded-full text-xs backdrop-blur-sm">
                            {plan.badge}
                          </span>
                        )}
                        {isSamePlan && (
                          <span className="px-2 py-1 bg-green-500/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full flex items-center gap-1">
                            <FiCheckCircle className="w-3 h-3" />
                            Active
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold mb-1">
                        {plan.name}
                        {isSamePlan && (
                          <span className="text-xs font-normal ml-2 text-white/80">
                            (Your current plan)
                          </span>
                        )}
                      </h3>
                      <p className="text-white/80 text-xs sm:text-sm mb-3 sm:mb-4">
                        {plan.description}
                      </p>

                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl sm:text-3xl md:text-4xl font-bold font-sans">
                          ₹{plan.price}
                        </span>
                        <span className="text-white/80 text-xs sm:text-sm">
                          /{plan.interval}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="p-4 sm:p-5 md:p-6">
                    <ul className="space-y-2 sm:space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          {feature.included ? (
                            <IoCheckmarkCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 shrink-0 mt-0.5" />
                          ) : (
                            <FiX className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 shrink-0 mt-0.5" />
                          )}
                          <span
                            className={`text-xs sm:text-sm ${
                              feature.highlight
                                ? "text-gray-900 font-semibold"
                                : feature.included
                                  ? "text-gray-700"
                                  : "text-gray-400"
                            }`}
                          >
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Select/Manage Button */}
                    {isSamePlan ? (
                      <div className="relative mt-4 sm:mt-5 md:mt-6">
                        <div className="absolute inset-0 bg-linear-to-r from-emerald-500 to-green-500 rounded-lg sm:rounded-xl blur opacity-20"></div>
                        <button
                          disabled={true}
                          className={`
                    w-full py-2.5 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm
                    bg-emerald-50 text-emerald-700 cursor-default border border-emerald-200
                    flex items-center justify-center gap-2
                  `}
                        >
                          <FiCheckCircle className="w-4 h-4" />
                          <span>Current Plan</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectPlan(plan);
                        }}
                        disabled={loading}
                        className={`
                  w-full mt-4 sm:mt-5 md:mt-6 py-2.5 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm
                  transition-all duration-300 relative overflow-hidden group/btn cursor-pointer
                  ${
                    plan.id === "free"
                      ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      : `bg-linear-to-r ${plan.color} text-white shadow-lg hover:shadow-xl`
                  }
                  ${loading ? "opacity-50 cursor-not-allowed" : ""}
                `}
                      >
                        <span className="relative z-10">
                          {plan.price === 0
                            ? "Switch to Free"
                            : `Upgrade to ${plan.name}`}
                        </span>
                        <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700"></div>
                      </button>
                    )}
                  </div>

                  
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Feature Comparison Table */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <div className="text-center mb-6 sm:mb-8 lg:mb-10 px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
              Compare All Features
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              See exactly what you get with each plan and choose the one that
              fits your needs
            </p>
          </div>

          <div className="overflow-x-auto bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200">
            <div className="min-w-160">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="p-4 sm:p-6 text-left text-xs sm:text-sm font-semibold text-gray-900">
                      Features
                    </th>
                    {plans.map((plan) => (
                      <th key={plan.id} className="p-4 sm:p-6 text-center">
                        <div
                          className={`text-base sm:text-lg font-bold bg-linear-to-r ${plan.color} bg-clip-text text-transparent`}
                        >
                          {plan.name}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-100 last:border-0"
                    >
                      <td className="p-4 sm:p-6 text-xs sm:text-sm text-gray-700 font-medium">
                        {feature.name}
                      </td>
                      <td className="p-4 sm:p-6 text-center text-xs sm:text-sm text-gray-600">
                        {feature.free}
                      </td>
                      <td className="p-4 sm:p-6 text-center text-xs sm:text-sm text-gray-600 font-medium">
                        {feature.pro}
                      </td>
                      <td className="p-4 sm:p-6 text-center text-xs sm:text-sm text-gray-600 font-medium">
                        {feature.proPlus}
                      </td>
                      <td className="p-4 sm:p-6 text-center text-xs sm:text-sm text-gray-600 font-medium">
                        {feature.premium}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <div className="text-center mb-6 sm:mb-8 lg:mb-10 px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about our plans and billing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 px-4">
            {[
              {
                q: "Can I switch plans later?",
                a: "Yes. You can upgrade from ₹49 to ₹199 or lifetime anytime. Your access updates instantly.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept UPI, debit cards, credit cards, and all major Indian payment methods.",
              },
              {
                q: "Is there a free plan?",
                a: "Yes. You can create and download a basic resume for free.",
              },
              {
                q: "What do I get in the ₹49 plan?",
                a: "You get templates, ATS optimization, AI suggestions, and photo upload to improve your resume.",
              },
              {
                q: "What's included in the free plan?",
                a: "The free plan includes 1 template, basic ATS optimization, and PDF downloads forever.",
              },
              {
                q: "What's included in the ₹199 plan?",
                a: "You unlock advanced ATS optimization, better templates, AI improvements, and cover letter builder.",
              },
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 sm:mt-16 lg:mt-20 text-center px-4">
          <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
            Trusted by professionals at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 opacity-50">
            <span className="text-sm sm:text-base lg:text-lg font-semibold text-gray-400">
              Google
            </span>
            <span className="text-sm sm:text-base lg:text-lg font-semibold text-gray-400">
              Microsoft
            </span>
            <span className="text-sm sm:text-base lg:text-lg font-semibold text-gray-400">
              Amazon
            </span>
            <span className="text-sm sm:text-base lg:text-lg font-semibold text-gray-400">
              Meta
            </span>
            <span className="text-sm sm:text-base lg:text-lg font-semibold text-gray-400">
              Apple
            </span>
            <span className="text-sm sm:text-base lg:text-lg font-semibold text-gray-400">
              Netflix
            </span>
          </div>
        </div>
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
