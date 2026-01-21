import { useLocation, useNavigate } from "react-router-dom";
import Aryu_logo from "../assets/images/aryu_logo.svg";
import { FaCrown } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import HeaderImage from '../assets/images/resumint/resumemint_header.png';
import user from "../assets/images/user_img.png";
import { FiGrid, FiFileText, FiBriefcase } from "react-icons/fi";
import { ImHome } from "react-icons/im";
import { BiMenuAltRight } from "react-icons/bi";

import { MdWorkHistory } from "react-icons/md";





function Header_Dashboard() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle clicking outside dropdown
  const [userLoggedIn, setUserLoggedIn] = useState("")

  // const Userid = userLoggedIn.id
  // console.log("Userddid", userLoggedIn)

  useEffect(() => {

    const userdata = JSON.parse(localStorage.getItem("Resumnit_user"))
    setUserLoggedIn(userdata)

  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const clickhomepage = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clickcontactpage = () => {
    navigate("/contact-us");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // const clickloginpage = () => {
  //   navigate("/loginig");
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };

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


  const clicksettingspage = () => {
    setMenuOpen(false);
    navigate("/settings");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };



  // sibar

  //  const [userLoggedIn, setUserLo/ggedIn] = useState("");
  const [arrowClicked, setArrowClicked] = useState(() => {
    const savedState = localStorage.getItem("sidebarState");
    return savedState === "true";
  });

  // Mobile sidebar
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("Resumnit_user"));
    setUserLoggedIn(userdata);
  }, []);

  const location = useLocation();
  const currentPath = location.pathname;

  const toggleSidebar = () => {
    const newState = !arrowClicked;
    setArrowClicked(newState);
    localStorage.setItem("sidebarState", newState);
  };

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      setMobileOpen(false);
    }
  };
  const clickDashboardpage = () => {
    nagivate('/dashclickDashboardpageboard')
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="flex justify-between items-center px-4 md:px-3 py-4 relative">
        {/* --- Logo --- */}
        <div
          className="flex items-center gap-2 text-[#2e404a] text-[20px] md:text-[25px] font-nunito font-bold cursor-pointer"
          onClick={clickhomepage}
        >
          {/* <span>Our Resumint</span> */}
          <img src={HeaderImage} alt="Logo" className="w-52 md:w-80 h-full object-contain " />

        </div>

        {/* --- Right Section --- */}
        <div className="flex items-center md:gap-4 relative">

          {/* <div
            className="flex bg-[#2e404a] hover:bg-[#05a3ff] text-white px-3 py-2 rounded-md items-center gap-2 cursor-pointer"
            onClick={() => alert("Upgrade feature coming soon!")}
          >
            <FaCrown />
            <span className="font-medium text-[14px]">Upgrade Now</span>
          </div> */}
          <div>
            <div className="flex justify-end w-full ">
              <button
                onClick={clickhomepage}
                className="border bg-[#1fadff]  hidden lg:block hover:bg-[#05a3ff] text-[16px] py-2 px-8  rounded-md text-white font-nunito font-bold  transition"
              >
                Go To Home
              </button>
            </div>
            <div className="flex justify-end w-full">

              <button
                className="lg:hidden p-3 text-gray-700 hover:text-[#05a3ff] cursor-pointer flex justify-end"
                onClick={() => setMobileOpen(true)}
              >
                <BiMenuAltRight className="text-3xl" />
              </button>
            </div>
          </div>



          {/* --- Settings Icon with Dropdown --- */}
          <div className="relative " ref={dropdownRef}>
            <IoSettingsOutline
              className="size-7 text-gray-400 hover:text-[#05a3ff] cursor-pointer hidden lg:block"
              onClick={() => setMenuOpen(!menuOpen)}
            />

            {/* Dropdown */}
            {menuOpen && (
              <div className="absolute right-0 mt-3 w-72 bg-white border border-gray-200 rounded-xl shadow-lg py-3 z-50 transition-all duration-200">
                {/* User Info */}
                <div className="px-4 pb-3 border-b border-gray-200">
                  <h3 className="text-gray-800 font-semibold text-sm">
                    {userLoggedIn?.firstName}  {userLoggedIn?.lastName}
                  </h3>
                  <p className="text-gray-500 text-sm truncate">
                    {userLoggedIn?.email}
                  </p>

                </div>

                {/* Menu Items */}
                <ul className="text-gray-700 text-sm mt-2">
                  <li
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={clicksettingspage}
                  >
                    <IoSettingsOutline className="text-gray-500" />
                    Settings
                  </li>

                  <li
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={clickcontactpage}
                  >
                    <HiOutlineMail className="text-gray-500" />
                    Contact Us
                  </li>

                  <hr className="my-2 border-gray-200" />

                  <li
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                    onClick={clickloginpage}
                  >
                    <FiLogOut />
                    Log Out
                  </li>
                </ul>
              </div>
            )}


            {/* sidebar */}

            {/* ---------------- SIDEBAR ---------------- */}
            <>
              {/* Mobile Background Overlay */}
              {mobileOpen && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-40 z-[900] lg:hidden"
                  onClick={() => setMobileOpen(false)}
                ></div>
              )}

              {/* Sidebar */}
              <section
                className={`
      fixed top-0 left-0 h-full bg-white shadow-xl z-[999] lg:hidden
      flex flex-col transition-all duration-300
      ${arrowClicked ? "w-20" : "w-[90%]"}
      ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
      lg:translate-x-0
    `}
              >
                {/* Mobile Close Button */}
                <div className="lg:hidden flex justify-end p-3">
                  <button className="text-xl" onClick={() => setMobileOpen(false)}>
                    ✕
                  </button>
                </div>

                {/* User Profile */}
                <div
                  className="flex items-center gap-3 py-3 cursor-pointer hover:bg-blue-50 rounded-lg px-4"
                  onClick={() => handleNavigate("/settings")}
                >
                  {/* <div className="relative">
                    <img
                      src={user}
                      alt="user"
                      className="size-8 border-2 border-[#ffaea3] rounded-full p-1.5"
                    />
                    <span className="absolute -bottom-1 -right-0 bg-[#ffc8bf] text-black text-[10px] font-semibold rounded-2xl px-1.5">
                      15%
                    </span>
                  </div> */}

                  {!arrowClicked && (
                    <div className="px-1">
                      <p className="font-medium text-gray-700 text-sm">
                        {userLoggedIn?.firstName} {userLoggedIn?.lastName}
                      </p>
                      <p className="text-sm text-gray-400">{userLoggedIn.email}</p>
                    </div>
                  )}
                </div>

                {/* Menu Items */}
                <ul className="space-y-3 mt-5 px-4">
                  <li
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${currentPath === "/dashboard"
                      ? "text-[#21aeff] bg-blue-50"
                      : "text-[#58666e] hover:text-[#21aeff]"
                      }`}
                    onClick={() => handleNavigate("/dashboard")}
                  >
                    <FiGrid />
                    {!arrowClicked && <span className="text-[15px] font-medium">Dashboard</span>}
                  </li>

                  <li
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${currentPath === "/resume"
                      ? "text-[#21aeff] bg-blue-50"
                      : "text-[#58666e] hover:text-[#21aeff]"
                      }`}
                    onClick={() => handleNavigate("/resume")}
                  >
                    <FiFileText />
                    {!arrowClicked && <span className="text-[15px] font-medium">Documents</span>}
                  </li>

                  <li
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${currentPath === "/plan"
                      ? "text-[#21aeff] bg-blue-50"
                      : "text-[#58666e] hover:text-[#21aeff]"
                      }`}
                    onClick={() => handleNavigate("/plan")}
                  >
                    <FiBriefcase />
                    {!arrowClicked && <span className="text-[15px] font-medium">Plan</span>}
                  </li>

                  <li
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${currentPath === "/plan-history"
                      ? "text-[#21aeff] bg-blue-50"
                      : "text-[#58666e] hover:text-[#21aeff]"
                      }`}
                    onClick={() => handleNavigate("/plan-history")}
                  >
                    <MdWorkHistory />
                    {!arrowClicked && <span className="text-[15px] font-medium">Plan History</span>}
                  </li>
                  <li
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${currentPath === "/"
                      ? "text-[#21aeff] bg-blue-50"
                      : "text-[#58666e] hover:text-[#21aeff]"
                      }`}
                    onClick={() => handleNavigate("/")}
                  >
                    <ImHome />                    {!arrowClicked && <span className="text-[15px] font-medium"> Go To Home</span>}
                  </li>
                  {/* setting */}

                  <li
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${currentPath === "/settings"
                      ? "text-[#21aeff] bg-blue-50"
                      : "text-[#58666e] hover:text-[#21aeff]"
                      }`}
                    onClick={() => handleNavigate("/settings")}
                  >
                    <IoSettingsOutline />
                    {!arrowClicked && <span className="text-[15px] font-medium">Settings</span>}
                  </li>

                  {/* conatavct */}
                  <li
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${currentPath === "/contact-us"
                      ? "text-[#21aeff] bg-blue-50"
                      : "text-[#58666e] hover:text-[#21aeff]"
                      }`}
                    onClick={() => handleNavigate("/contact-us")}
                  >
                    <HiOutlineMail />
                    {!arrowClicked && <span className="text-[15px] font-medium">Contact Us</span>}
                  </li>

                  {/* logout */}


                  <li
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer text-[#58666e] hover:text-[#21aeff]`}
                    onClick={clickloginpage}
                  >
                    <FiLogOut />
                    {!arrowClicked && <span className="text-[15px] font-medium">Logout</span>}
                  </li>



                </ul>
              </section>
            </>

          </div>
        </div>
      </div>
    </header>
  );
}

export default Header_Dashboard;
