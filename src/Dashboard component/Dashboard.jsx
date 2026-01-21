import React, { useEffect,useState } from "react";
import Header_Dashboard from "./Header_Dashboard";
import Sidebar from "./Sidebar";
import { IoIosArrowDown } from "react-icons/io";

const Dashboard = () => {

   const [userLoggedIn, setUserLoggedIn] = useState("")
  
    // const Userid = userLoggedIn.id
  
    useEffect(() => {
  
      const userdata = JSON.parse(localStorage.getItem("Resumnit_user"))
      setUserLoggedIn(userdata)
  
    }, [])

  const tasks = [
    "Create your job winning resume",
    "Explore jobs on BetterCV",
    "Write your first cover letter",
    "Submit your first application",
    "Explore our expert career guides",
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header  */}
      <header className="w-full">
        <Header_Dashboard />
      </header>

      {/* Main Section */}
      <div className="flex flex-1 w-full">
        {/* Sidebar */}
        <div className="lg:w-[18%] bg-white border-r sticky border-gray-200 ">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="w-full bg-gradient-to-b from-[#dbf2ff] to-white px-4 md:px-10 lg:px-20 p-14">
          {/* Welcome Section */}
          <div className="flex justify-between items-center mb-3">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                Welcome, {userLoggedIn?.firstName}  {userLoggedIn?.lastName} <span className="inline-block">👋</span>
              </h1>
              <p className="text-gray-600 mt-1">
                Let's get you ready for your next career chapter.
              </p>
            </div>

            {/* <p className="text-sm text-gray-500">
              <span className="text-blue-600 font-medium">0</span> / 5 Completed
            </p> */}
          </div>

          {/* Task Cards
          <div className="space-y-3 mt-6">
            {tasks.map((task, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white rounded-lg shadow-sm border border-gray-200 px-5 py-4 hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-2 border-blue-200 rounded-full flex items-center justify-center text-blue-400">
                    ○
                  </div>
                  <span className="text-gray-800 font-medium">{task}</span>
                </div>
                <IoIosArrowDown className="text-gray-500" />
              </div>
            ))}
          </div> */}

          {/* Bottom Border */}
          {/* <hr className="mt-10 border-gray-200" /> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
