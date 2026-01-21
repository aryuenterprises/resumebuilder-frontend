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

const Plan = () => {




  

  const [allplandetails, setAllTemplateDetails] = useState([])
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
        `${API_URL}api/payment/payment-records`, {
        params: { userId: userId, type: "latest" },
      }
      );

      console.log("responseaaa", response);

      // const data = response.data?.data || response.data;
      setAllTemplateDetails(response?.data);

      // setAccessdate(response?.data?.accessPeriod)


    } catch (error) {
      console.log(error);
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
      {/* Header  */}
      <Header_Dashboard />

      {/* Main Section */}
      <div className="flex flex-1 w-full">
        {/* Sidebar */}
        <div className="lg:w-[18%] bg-white border-r   border-gray-200 ">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="w-full bg-[#f7f9fc] px-5 md:px-10 lg:px-20 p-14">
          {/* Welcome Section */}
          <div className="flex justify-between items-center mb-3">
            {/* --- Your Current Plan --- */}
            <div>
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
  {allplandetails?.latestPlan?.planId?.name || "No Plan"}{" "}
  {allplandetails?.accessPeriod?.start && allplandetails?.accessPeriod?.end ? (
    <>({allplandetails.accessPeriod.start} - {allplandetails.accessPeriod.end})</>
  ) : null}
</p>


                    <p className="text-md text-gray-400">
                      You can  save your data. Upgrade to unlock resume
                      downloads, premium tools, and more.
                    </p>
                  </div>
                </div>
              </div>
              <div className='mt-5'>
                <Subscription_Component />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plan;

