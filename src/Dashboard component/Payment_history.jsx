import React, { useContext, useEffect, useState } from "react";
import Header_Dashboard from "./Header_Dashboard";
import Sidebar from "./Sidebar";
import { FaCrown } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import SubscriptionPopup from "../Componets/SubscriptionPopup";
import Subscription_Component from "../Componets/Subscription_Component";
import axios from "axios";
import { API_URL } from "../Config";
import { CreateContext } from "../App";
import Loader from "../Componets/Loader";

const Payment_history = () => {

  const UseContext = useContext(CreateContext)




  console.log("UseContextdd", UseContext)

  // console.log("UseContext", UseContext)




  const [allplandetails, setAllTemplateDetails] = useState([])
    const [loading, setLoading] = useState(true);
  
  // console.log("allplandetails", allplandetails)
  useEffect(() => {

    fetchTemplate();
  }, []);
  const fetchTemplate = async () => {

    const userdata = JSON.parse(localStorage.getItem("Resumnit_user"))
    const userId = userdata?.id || userdata?._id
    // console.log("userIdkududa",userId)
    try {
      const response = await axios.get(
        `${API_URL}/api/payment/payment-records`, {
        params: { userId: userId, type: "all" },
      }
      );


      // const data = response.data?.data || response.data;
      setAllTemplateDetails(response?.data);
      setLoading(false)


    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };



  const tasks = [
    "Create your job winning resume",
    "Explore jobs on BetterCV",
    "Write your first cover letter",
    "Submit your first application",
    "Explore our expert career guides",
  ];


  return (
    <div className="">
       {loading ? (
              <Loader />
            ) : (
              <>
      {/* Header  */}

      <Header_Dashboard />


      {/* Main Section */}
      <div className="flex flex-1 w-full">
        {/* Sidebar */}
        <div className="lg:w-[18%] bg-white border-r sticky border-gray-200 ">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="w-full bg-[#f7f9fc] px-3 md:px-10 lg:px-10 p-5">
          {/* Welcome Section */}
          <div className="flex justify-between items-center mb-3 w-full">
            {/* --- Your Current Plan --- */}
            <div className="w-full">
              <h2 className="text-[14px] font-nunito text-gray-500 tracking-wide mb-3 uppercase">
                Your Current Plan
              </h2>

              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Crown Icon */}
                  <div className="bg-blue-50 p-3 rounded-md">
                    <FaCrown className="w-8 h-8 text-gray-200" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {allplandetails[0]?.planId?.name || "No Plan"}{" "}
                      {UseContext?.accessdate?.start && UseContext?.accessdate?.end ? (
                        <>({UseContext.accessdate.start} - {UseContext.accessdate.end})</>
                      ) : null}
                    </p>
                    <p className="text-md text-gray-400">
                      You can  save your data. Upgrade to unlock resume
                      downloads, premium tools, and more.
                    </p>
                  </div>
                </div>
              </div>
              {/* allplandetails */}

              <div>
                <div className=" mx-auto mt-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Payment History
                  </h2>

                  <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 h-[100vh] overflow-y-scroll">
                    <div className="grid grid-cols-1 divide-y">
                      <div className="bg-white shadow rounded-xl overflow-hidden">
                        <div className="bg-white shadow rounded-xl overflow-hidden">
                          {allplandetails?.length > 0 ? (
                            allplandetails.map((item, index) => (
                              <div
                                key={index}
                                className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center py-5 px-6 border-b last:border-none hover:bg-gray-50 transition-all duration-200"
                              >
                                {/* S.NO */}
                                <div className="text-gray-700 font-semibold text-center md:text-left">
                                  {index + 1}.
                                </div>

                                {/* PLAN NAME */}
                                <div>
                                  <p className="text-gray-900 font-semibold capitalize">
                                    {item?.planId?.name}
                                  </p>

                                  <p className="text-sm text-gray-500">
                                    {item?.planId?.price > 0
                                      ? `${UseContext?.currencysymbol
                                      }${item.planId.price}`
                                      : "Free Plan"}
                                  </p>
                                </div>

                                {/* PAYMENT INFO */}
                                <div>
                                  <p className="text-gray-700 font-medium">Payment ID:</p>
                                  <p className="text-sm text-gray-500 break-all">
                                    {item.paymentId || "—"}
                                  </p>
                                </div>

                                {/* CARD DETAILS */}
                                <div>
                                  <p className="text-gray-700 font-medium">Card:</p>

                                  {item?.planId?.price === 0 ? (
                                    <p className="text-sm text-green-600 font-semibold">
                                      Free – No card used
                                    </p>
                                  ) : (
                                    <>
                                      <p className="text-sm text-gray-500">
                                        {item.paymentDetails?.brand?.toUpperCase()} ••••{" "}
                                        {item.paymentDetails?.last4}
                                      </p>
                                      <p className="text-xs text-gray-400">
                                        Expires {item.paymentDetails?.expiryMonth}/
                                        {item.paymentDetails?.expiryYear}
                                      </p>
                                    </>
                                  )}
                                </div>

                                {/* STATUS + DATE */}
                                <div className="text-right">
                                  <span
                                    className={`px-3 py-1 text-xs rounded-full font-semibold ${item.status === "succeeded"
                                      ? "bg-green-100 text-green-700"
                                      : item.status === "pending"
                                        ? "bg-red-100 text-red-700"
                                        : "bg-red-100 text-red-700"
                                      }`}
                                  >
                                    {item.status === "succeeded"
                                      ? item?.planId?.price === 0
                                        ? "Free"
                                        : "Paid"
                                      : item.status === "pending"
                                        ? "Failed"
                                        : item.status}
                                  </span>

                                  <p className="text-sm text-gray-500 mt-2">
                                    {new Date(item.createdAt).toLocaleDateString("en-GB")}
                                  </p>
                                </div>

                              </div>
                            ))
                          ) : (
                            <p className="text-center text-gray-500 py-10">
                              No payment history found.
                            </p>
                          )}
                        </div>

                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      </>
            )}
    </div>
  );
};

export default Payment_history;

