"use client";
import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiFileText,
  FiDownload,
  FiEye,
  FiEdit,
  FiMoreVertical,
  FiPlus,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiCpu,
  FiUsers,
  FiTrash2,
  FiCopy,
  FiLogOut,
  FiAward,
  FiCalendar,
  FiX,
  FiAlertCircle,
  FiStar,
  FiHeadphones,
  FiTrendingUp,
} from "react-icons/fi";
import {
  HiOutlineTemplate,
  HiOutlineSparkles,
  HiOutlineBadgeCheck,
  HiOutlineChartBar,
  HiOutlineDocumentDuplicate,
  HiOutlineReceiptRefund,
} from "react-icons/hi";
import { IoEyeOutline } from "react-icons/io5";
// or import { FaEye } from "react-icons/fa";
// or import { AiOutlineEye } from "react-icons/ai";
import { useRouter } from "next/navigation";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
  setSessionStorage,
} from "@/app/utils";
import { User } from "@/app/types/user.types";
import {
  MdOutlinePublishedWithChanges,
  MdOutlineReceipt,
} from "react-icons/md";
import ProtectedRoute from "@/app/utils/ProtectedRoute";
import axios from "axios";
import { API_URL } from "@/app/config/api";
import { TemplateOne, TemplateTwo } from "@/app/components/templates";
import { templateData } from "@/app/data";
import { CreateContext } from "@/app/context/CreateContext";
import Swal from "sweetalert2";

interface BillingRecord {
  length: number;
  createdAt: string;
  amount: number;
  status: "paid" | "pending" | "failed";
  plan: string;
  planId: {
    name: string;
  };
}

interface usersCurrentPlan {
  amount: number;
  plan: string;
  description: string;
  expiry_date: string;
}

interface ResumeItem {
  component: React.ComponentType<any>; // Or a more specific prop type
  templateId: string | number;
  [key: string]: any; // Allows for the rest of your data fields
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const DashboardPage = () => {
  const router = useRouter();
  const [usersCurrentPlan, setusersCurrentPlan] =
    useState<usersCurrentPlan | null>(null);
  const [showBillingHistory, setShowBillingHistory] = useState(false);

  const [paymentRecords, setPaymentRecords] = useState<BillingRecord[] | null>(
    null,
  );
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [filteredOldResumeData, setFilteredOldResumeData] = useState<
    ResumeItem[]
  >([]);

  const { setIsUploadMode } = useContext(CreateContext);

  const userDetails = getLocalStorage<User>("user_details");
  const userId = userDetails?.id;
  const userName = `${userDetails?.firstName} ${userDetails?.lastName}`;
  const userEmail = userDetails?.email;
  const userPhone = userDetails?.phone;
  const userLocation =
    userDetails?.city && `${userDetails.city}, ${userDetails.country}`;

  // fetchUserData  &   fetchOldResumeData
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/users/dashboard`, {
          params: {
            userId: userId,
          },
        });

        console.log("response", response);

        setusersCurrentPlan(response?.data?.payments?.[0]);
        fetchOldResumeData();
      } catch (err) {
        console.error(err);
      }
    };

    

    const fetchOldResumeData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/contact-resume/all-contact/${userId}`,
        );

        const filter = response.data.flatMap(
          (data1: { templateId: string | number }) => {
            const templateMatch = templateData.find(
              (t) => t.id == data1.templateId,
            );

            // Return an array with the transformed object if found, otherwise an empty array
            return templateMatch
              ? [{ ...data1, component: templateMatch.component }]
              : [];
          },
        );

        setFilteredOldResumeData(filter);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserData();
  }, []);

  const handleDeleteResume = async (id:string) => {
      console.log("editid", id);

      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this Status ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `${API_URL}/api/contact-resume/delete-resume/${id}`,
          );
          Swal.fire("Deleted!", "The Resume has been deleted.", "success");
          
           const fetchOldResumeData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/contact-resume/all-contact/${userId}`,
        );

        const filter = response.data.flatMap(
          (data1: { templateId: string | number }) => {
            const templateMatch = templateData.find(
              (t) => t.id == data1.templateId,
            );

            // Return an array with the transformed object if found, otherwise an empty array
            return templateMatch
              ? [{ ...data1, component: templateMatch.component }]
              : [];
          },
        );

        setFilteredOldResumeData(filter);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOldResumeData()

        } catch (err) {
          console.error("Failed to delete:", err);
          Swal.fire(
            "Error",
            "There was an error deleting the Resume.",
            "error",
          );
        }
      } else {
        Swal.fire("Cancelled", "Your Resume is safe :)", "info");
      }
    };

  console.log("usersCurrentPlan", usersCurrentPlan);

  // fetchPaymentRecords
  useEffect(() => {
    const fetchPaymentRecords = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/payment-razor/payment-all-records`,
          {
            params: {
              userId: userId,
            },
          },
        );

        setPaymentRecords(response?.data?.paymentRecord);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPaymentRecords();
  }, []);

  // this will hide scrollbar when model is open
  useEffect(() => {
    if (showBillingHistory) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [showBillingHistory]);

  const handleLogout = () => {
    removeLocalStorage("user_details");
    removeLocalStorage("fullResumeData");
    removeLocalStorage("chosenTemplate");
    removeLocalStorage("accessToken");
    router.push("/login");
  };

  const BillingHistoryModal = ({
    isOpen,
    onClose,
    records,
  }: {
    isOpen: boolean;
    onClose: () => void;
    records: BillingRecord[];
  }) => {
    const getStatusColor = (status: string) => {
      switch (status) {
        case "paid":
          return "text-emerald-600 bg-emerald-50 border-emerald-200";
        case "pending":
          return "text-amber-600 bg-amber-50 border-amber-200";
        case "failed":
          return "text-red-600 bg-red-50 border-red-200";
        default:
          return "text-gray-600 bg-gray-50 border-gray-200";
      }
    };

    const totalSpent = records.reduce((acc, curr) => {
      return curr.status === "paid" ? acc + curr.amount : acc;
    }, 0);

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-x-hidden overflow-y-hidden mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative bg-linear-to-r from-[#c40116] via-[#be0117] to-[#9a0e1a] p-6">
                <div className="absolute inset-0 bg-white/10 transform -skew-y-12 translate-y-1/2"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-8 -mt-8"></div>

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                      <MdOutlineReceipt className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        Billing History
                      </h2>
                      <p className="text-white/80 text-sm">
                        View your past transactions and invoices
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <FiX className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="p-6 border-b border-gray-200 bg-gray-50/50">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">
                      Total Transactions
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {records.length}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Total Spent</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ₹{totalSpent.toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Current Plan</p>
                    <p className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-[#c40116] to-[#be0117]">
                      {usersCurrentPlan?.plan}
                    </p>
                  </div>
                </div>
              </div>

              {/* Billing Records Table */}
              <div className="overflow-y-auto max-h-100 p-6">
                <table className="w-full">
                  <thead className=" bg-white">
                    <tr className="border-b bg-white border-gray-200">
                      <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Date
                      </th>

                      <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Plan
                      </th>
                      <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <FiCalendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {new Date(record.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                },
                              )}
                            </span>
                          </div>
                        </td>

                        <td className="py-4">
                          <span className="text-sm font-medium text-gray-900">
                            {record.planId.name}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-1">
                            <span className="">₹</span>
                            <span className="text-sm font-semibold text-gray-900">
                              {record.amount}
                            </span>
                          </div>
                        </td>
                        <td className="py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(record.status)}`}
                          >
                            {record.status.charAt(0).toUpperCase() +
                              record.status.slice(1)}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>

                {records.length === 0 && (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-4">
                      <HiOutlineReceiptRefund className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No billing history
                    </h3>
                    <p className="text-gray-600">
                      Your past transactions will appear here
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const parseApiData = (htmlString: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const listItems = doc.querySelectorAll("li");
    return Array.from(listItems).map((li) => li.textContent.trim());
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50">
        {/* Logout Confirmation Modal */}
        <AnimatePresence>
          {showLogoutModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4"
              onClick={() => setShowLogoutModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="h-2 bg-linear-to-r from-[#c40116] via-[#be0117] to-[#9a0e1a]"></div>
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", damping: 10 }}
                    className="relative mx-auto w-20 h-20 mb-6"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-[#c40116]/20 to-[#be0117]/20 rounded-full blur-xl"></div>
                    <div className="relative w-20 h-20 bg-linear-to-br from-[#c40116] to-[#be0117] rounded-2xl shadow-xl flex items-center justify-center transform hover:rotate-6 transition-transform">
                      <FiLogOut className="w-10 h-10 text-white" />
                    </div>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-bold text-gray-900 mb-3"
                  >
                    Ready to Leave?
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-600 mb-8"
                  >
                    Are you sure you want to logout? You can always sign back
                    in.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-3"
                  >
                    <button
                      onClick={() => setShowLogoutModal(false)}
                      className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex-1 px-4 py-3 bg-linear-to-r from-[#c40116] to-[#be0117] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#c40116]/25 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <FiLogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile and Plan Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
          >
            {/* Profile Card -  */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="lg:col-span-1 group"
            >
              <div className="h-full bg-white rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden hover:shadow-2xl transition-all duration-500">
                {/* Card Header with Animated Gradient */}
                <div className="relative h-32 bg-linear-to-r from-[#c40116] via-[#be0117] to-[#9a0e1a] overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 transform -skew-y-12 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
                  <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-white/10 rounded-full"></div>
                  <div className="absolute -top-12 -left-12 w-32 h-32 bg-black/10 rounded-full"></div>
                </div>

                {/* Profile Info */}
                <div className="p-6 pt-12">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {userName}
                  </h3>

                  <div className="space-y-3">
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <FiMail className="w-4 h-4 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-sm font-medium text-gray-900 break-all">
                          {userEmail}
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className="p-2 bg-emerald-50 rounded-lg">
                        <FiPhone className="w-4 h-4 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="text-sm font-medium text-gray-900">
                          {userPhone || "Not provided"}
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className="p-2 bg-purple-50 rounded-lg">
                        <FiMapPin className="w-4 h-4 text-purple-500" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="text-sm font-medium text-gray-900">
                          {userLocation || "Not specified"}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Logout Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowLogoutModal(true)}
                    className="w-full mt-6 px-4 py-3 bg-linear-to-r from-[#c40116] to-[#be0117] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#c40116]/25 transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer"
                  >
                    <FiLogOut className="w-4 h-4 group-hover/btn:rotate-180 transition-transform duration-500" />
                    <span>Logout</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Current Plan Card  */}

            {usersCurrentPlan ? (
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="lg:col-span-2 group"
              >
                <div className="h-full bg-white rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden hover:shadow-2xl transition-all duration-500">
                  {/* Plan Header */}
                  <div className="relative bg-linear-to-r from-[rgb(196,1,22)] via-[#be0117] to-[#9a0e1a] p-6 overflow-hidden ">
                    <div className="absolute inset-0 bg-white/10 transform -skew-y-12 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
                    <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-white/10 rounded-full"></div>
                    <div className="absolute -top-12 -left-12 w-32 h-32 bg-black/10 rounded-full"></div>

                    <div className="relative flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/30">
                            ACTIVE
                          </span>
                          <HiOutlineBadgeCheck className="w-5 h-5 text-yellow-300" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {usersCurrentPlan?.plan} Plan
                        </h3>
                        <p className="text-white/80 text-sm">
                          Your current subscription
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-white">
                          <span className="font-sans">₹</span>{" "}
                          {usersCurrentPlan?.amount || "0"}
                        </p>
                      </div>
                    </div>

                    {usersCurrentPlan.plan !== "Premium" && (
                      <div className="flex gap-2">
                        <p className="text-white/80 text-sm">Expiry On :</p>

                        <p className="text-white/80 text-sm">
                          {usersCurrentPlan?.expiry_date?.split("T")[0] ?? ""}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Plan Features */}
                  <div className="p-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <FiAward className="w-4 h-4 text-[#c40116]" />
                      Included Features
                    </h4>

                    {/* The Grid remains on the parent */}
                    <div className="flex flex-col gap-3">
                      {usersCurrentPlan?.description &&
                        parseApiData(usersCurrentPlan.description).map(
                          (feature, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }} // Each item starts slightly later
                              className="flex items-start gap-2 text-sm text-gray-700 list-none"
                            >
                              <svg
                                className="w-4 h-4 text-green-500 mt-0.5 shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span>{feature}</span>
                            </motion.li>
                          ),
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => router.push("/choose-plan")}
                        className="flex-1 px-4 py-3 bg-linear-to-r from-[#c40116] to-[#be0117] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#c40116]/25 transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer"
                      >
                        <MdOutlinePublishedWithChanges className="w-4 h-4 group-hover/btn:rotate-90 transition-transform duration-500" />
                        <span>Change Plan</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowBillingHistory(true)}
                        className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <FiCreditCard className="w-4 h-4" />
                        <span>Billing History</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="lg:col-span-2"
              >
                <div className="h-full bg-white rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden hover:shadow-2xl transition-all duration-500">
                  {/* No Plan Header */}
                  <div className="relative bg-linear-to-r from-gray-600 via-gray-500 to-gray-700 p-8 overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <div className="relative text-center">
                      <div className="inline-flex p-4 bg-white/20 rounded-full mb-4">
                        <FiAlertCircle className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        No Active Plan
                      </h3>
                      <p className="text-white/80">
                        You don't have an active subscription yet
                      </p>
                    </div>
                  </div>

                  {/* Action Area */}
                  <div className="p-8 text-center">
                    <p className="text-gray-600 mb-6">
                      Choose a plan to unlock all premium features and get the
                      most out of your experience.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                      {[
                        { name: "Premium Features", icon: FiStar },
                        { name: "Priority Support", icon: FiHeadphones },
                        { name: "Higher Limits", icon: FiTrendingUp },
                      ].map((feature, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-xl">
                          <feature.icon className="w-6 h-6 text-gray-500 mx-auto mb-2" />
                          <p className="text-sm font-medium text-gray-700">
                            {feature.name}
                          </p>
                        </div>
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => router.push("/choose-plan")}
                      className="px-6 py-3 bg-linear-to-r from-[#c40116] to-[#be0117] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#c40116]/25 transition-all duration-300 flex items-center justify-center gap-2 mx-auto cursor-pointer"
                    >
                      <MdOutlinePublishedWithChanges className="w-4 h-4" />
                      <span>Choose a Plan</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Resumes Section  */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <FiFileText className="w-5 h-5 text-[#c40116]" />
                  Your Resumes
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Manage and track your resume performance
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/choose-template")}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-linear-to-r from-[#c40116] to-[#be0117] text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-[#c40116]/25 transition-all duration-300 group"
              >
                <FiPlus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                New Resume
              </motion.button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 p-3 sm:p-4">
              {filteredOldResumeData.length > 0 ? (
                filteredOldResumeData.map((item, index) => {
                  const ComponentToRender = item.component;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -4 }}
                      className="relative group w-full"
                      style={{
                        height: "clamp(280px, 45vw, 350px)",
                        overflow: "hidden",
                        borderRadius: "12px",
                        backgroundColor: "white",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                      }}
                    >
                      {/* Component Container */}
                      <div className="w-full h-full ">
                        <ComponentToRender alldata={item} />
                      </div>

                      {/* Overlay with View and Delete Buttons */}
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        {/* View Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/resume-details/contact`);
                            setLocalStorage("chosenTemplate", item);
                            setSessionStorage("oldRouteNameDashboard", true);
                            setIsUploadMode(false);
                          }}
                          className="bg-white rounded-full p-3 hover:bg-gray-100 hover:scale-110 transition-all duration-300 shadow-lg cursor-pointer"
                          aria-label="View Resume"
                        >
                          <IoEyeOutline className="h-6 w-6 text-gray-700" />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Show confirmation dialog
                              // Call your delete function here
                              handleDeleteResume(item.contact._id)
                              // console.log("Delete resume:", item);
                          }}
                          className="bg-white rounded-full p-3 hover:bg-red-50 hover:scale-110 transition-all duration-300 shadow-lg cursor-pointer"
                          aria-label="Delete Resume"
                        >
                          <svg
                            className="h-6 w-6 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Mobile Touch Optimized - Shows on tap */}
                      <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/50 sm:hidden opacity-0 active:opacity-100 transition-opacity duration-150">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/resume-details/contact`);
                            setLocalStorage("chosenTemplate", item);
                            setSessionStorage("oldRouteNameDashboard", true);
                            setIsUploadMode(false);
                          }}
                          className="bg-white rounded-full p-2.5 shadow-lg"
                          aria-label="View Resume"
                        >
                          <IoEyeOutline className="h-5 w-5 text-gray-700" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (
                              confirm(`Delete "${item.name || "this resume"}"?`)
                            ) {
                              // Call delete function
                            }
                          }}
                          className="bg-white rounded-full p-2.5 shadow-lg"
                          aria-label="Delete Resume"
                        >
                          <svg
                            className="h-5 w-5 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Quick Info Bar */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white text-xs sm:text-sm font-medium truncate px-1">
                          {item.name || `Resume ${index + 1}`}
                        </p>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                /* Empty State */
                <div className="col-span-full flex flex-col items-center justify-center py-12 sm:py-16">
                  <div className="text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                      No Resumes Found
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Create your first resume to get started
                    </p>
                    <button
                      onClick={() => router.push("/choose-template")}
                      className="px-5 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-[#5E000B] to-[#C40116] text-white rounded-lg font-medium hover:shadow-lg transition-all text-sm"
                    >
                      Create Resume
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <BillingHistoryModal
            isOpen={showBillingHistory}
            onClose={() => setShowBillingHistory(false)}
            records={paymentRecords || []}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
