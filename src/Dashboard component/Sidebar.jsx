import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import {
  CiBoxList,
  CiFileOn,
  CiSearch,
} from "react-icons/ci";
import { FiGrid, FiFileText, FiBriefcase } from "react-icons/fi";
import user from "../assets/images/user_img.png";
import { FiLogOut } from "react-icons/fi";


const Sidebar = () => {

  const [userLoggedIn, setUserLoggedIn] = useState("")


  //  const UseContext = useContext(CreateContext)
  //       console.log("UseContextdd", UseContext)

  // const Userid = userLoggedIn.id

  useEffect(() => {

    const userdata = JSON.parse(localStorage.getItem("Resumnit_user"))
    setUserLoggedIn(userdata)

  }, [])
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const [arrowClicked, setArrowClicked] = useState(() => {
    const savedState = localStorage.getItem("sidebarState");
    return savedState === "true";
  });

  const toggleSidebar = () => {
    const newState = !arrowClicked;
    setArrowClicked(newState);
    localStorage.setItem("sidebarState", newState);
  };


  const [isDocumentOpen, setIsDocumentOpen] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });


  };



  const clickloginpage = () => {
    // Remove the item from localStorage
    localStorage.removeItem("Resumnit_user");

    // Navigate to login page
    navigate("/loging");

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });

     setTimeout(() => {
    window.location.reload();
  }, 200);
  };


  return (
    <section
      className=" w-52
         bg-white h-full  transition-all duration-300 hidden lg:flex flex-col fixed "
    >


      <div
        className="flex items-center  gap-3 py-3 cursor-pointer hover:bg-blue-50 rounded-lg transition-all duration-200"
        onClick={() => handleNavigate("/settings")}
      >
        {/* <div className="relative pl-4">
          <img
            src={user}
            alt="user"
            className="size-8 border-2  border-[#ffaea3] rounded-full p-1.5"
          />
          <span className="absolute -bottom-1 -right-0 bg-[#ffc8bf] text-black text-[10px] font-semibold rounded-2xl px-1.5">
            15%
          </span>
        </div> */}
        {/* {!arrowClicked && ( */}
        <div className="px-6">
          <p className="mt-2 font-medium   text-gray-700 text-sm hover:text-[#21aeff] capitalize">
            {userLoggedIn?.
              firstName
            }              {userLoggedIn?.
              lastName

            }
          </p>
          {/* <p className="text-sm text-gray-400">{userLoggedIn?.email}</p> */}
        </div>
        {/* )} */}
      </div>

      <div className="flex flex-col justify-between  ">
        <div className=" bg-white flex flex-col text-gray-700 font-nunito">
          <ul className="space-y-3 mt-5 px-4 relative">
            {/* Dashboard */}
            <li
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${currentPath === "/dashboard"
                ? "text-[#21aeff] bg-blue-50"
                : "text-[#58666e] hover:text-[#21aeff]"
                }`}
              onClick={() => handleNavigate("/dashboard")}
            >
              <FiGrid />
              <span className="text-[15px] font-medium">Dashboard</span>
            </li>

            {/* Documents  */}
            <li className="relative">
              <div
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer ${isDocumentOpen ? "text-[#21aeff]" : "text-[#58666e]"
                  } hover:text-[#21aeff]`}
                // onClick={() => setIsDocumentOpen(!isDocumentOpen)}
                onClick={() => handleNavigate("/resume")}

              >
                <div className="flex items-center gap-3">
                  <FiFileText />
                  <span className="text-[15px] font-medium">Documents</span>
                </div>
                {/* <svg
                  className={`w-4 h-4 transform transition-transform duration-200 ${isDocumentOpen ? "rotate-90 text-[#21aeff]" : ""
                    }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg> */}
              </div>


              {/* {isDocumentOpen && (
              <div className="absolute left-full top-0 ml-3 w-52 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
                <p
                  className="px-4 py-2 text-[#58666e] hover:text-[#21aeff] cursor-pointer"
                  onClick={() => handleNavigate("/resume")}
                >
                  Resume
                </p>
            
              </div>
            )} */}
            </li>

            {/* Plan */}
            <li
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${currentPath === "/plan"
                ? "text-[#21aeff] bg-blue-50"
                : "text-[#58666e] hover:text-[#21aeff]"
                }`}
              onClick={() => handleNavigate("/plan")}
            >
              <FiBriefcase />
              <span className="text-[15px] font-medium">Plan</span>
            </li>


            <li
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${currentPath === "/plan-history"
                ? "text-[#21aeff] bg-blue-50"
                : "text-[#58666e] hover:text-[#21aeff]"
                }`}
              onClick={() => handleNavigate("/plan-history")}
            >
              <FiBriefcase />
              <span className="text-[15px] font-medium">Plan History</span>
            </li>

            <li
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer text-[#58666e] hover:text-[#21aeff]`}
              onClick={clickloginpage}
            >
              <FiLogOut />
              <span className="text-[15px] font-medium">Logout</span>
            </li>

          </ul>
        </div>


      </div>


    </section>
  );
};

export default Sidebar;