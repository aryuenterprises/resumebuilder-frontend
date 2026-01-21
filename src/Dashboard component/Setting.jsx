import React, { useContext, useEffect, useState } from "react";
import Header_Dashboard from "./Header_Dashboard";
import Sidebar from "./Sidebar";
import { IoIosArrowDown } from "react-icons/io";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaCrown } from "react-icons/fa6";
import { CreateContext } from "../App";
import Swal from "sweetalert2";
import axios from "axios";
import { API_URL } from "../Config";
import { useNavigate } from "react-router-dom";
import SubscriptionPopup from "../Componets/SubscriptionPopup";

const Setting = () => {




    //   console.log("UseContext", UseContext)



    const tasks = [
        "Create your job winning resume",
        "Explore jobs on BetterCV",
        "Write your first cover letter",
        "Submit your first application",
        "Explore our expert career guides",
    ];

    const navigate = useNavigate(); // ✅ hook at top level

    const handleDeleteIt = () => {
        navigate("/loging");
    };

    const handleSubcription = () => {
        navigate("/subscription");
    }
    const [showPopup, setShowPopup] = useState(false);
    const handleUpgrade = () => {
        setShowPopup(true);
    }
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});

    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        city: "",
        state: "",
        country: "",

    });







    const isValid = (val, field) => val.trim() !== "" && touched[field];

    const [showPassword, setShowPassword] = useState(false);

    // Handle Form Submit
    const handlesave = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${API_URL}/api/users/create`,
                values
            );
            // console.log("response:", response);
            Swal.fire({
                icon: "success",
                title: "Register Added successfully!",
                showConfirmButton: true,
                timer: 1500,
            });
            setValues({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                password: "",
                city: "",
                state: "",
                country: "",
            });
            setErrors({});
        } catch (err) {
            setErrors(err);

        }
    };

    const UseContext = useContext(CreateContext)
    //   console.log("UseContextdd", UseContext)

    const { Userdata, setUserdata } = useContext(CreateContext);



    const Allplans = UseContext?.allplandetails;



    const Contactid = UseContext?.contactid;

    const [userLoggedIn, setUserLoggedIn] = useState("")
    // console.log("userLoggedIn", userLoggedIn)


    const [Userid, setUserid] = useState("")
    // console.log("Userdid", Userid)

    useEffect(() => {

        const userdata = JSON.parse(localStorage.getItem("Resumnit_user"))
        //  const Userid = userdata?._id
        const Userid = userdata?.id || userdata?._id;
        setUserid(Userid)
        setUserLoggedIn(userdata)

    }, [])

    useEffect(() => {

        fetched();   // <-- API will always receive correct ID

    }, [Userid]);

    //get 
    const fetched = async () => {
        const userdata = JSON.parse(localStorage.getItem("Resumnit_user"))
        // const Userid = userdata?._id
        const Userid = userdata?.id || userdata?._id;


        try {
            const response = await axios.get(
                `${API_URL}/api/users/particular-user/${Userid}`,
            );
            const setting = response.data;
            setUserdata(setting)
            setValues({
                firstName: setting.firstName || "",
                lastName: setting.lastName || "",
                email: setting.email || "",
                phone: setting.phone || "",
                password: setting.password || "",
                city: setting.city || "",
                state: setting.state || "",
                country: setting.country || "",
            });

            // localStorage.setItem("Resumnit_user", JSON.stringify(setting));




        } catch (error) {
            console.log(error);
        }
    };

    // useEffect(() => {
    //     if (Userid) {
    //         fetched(Userid);
    //     }

    // }, [Userid]);

    // edit

    const validateForm = () => {
        const requiredFields = ["firstName", "lastName", "phone", "city", "state", "country"];
        const errors = {};

        requiredFields.forEach((field) => {
            if (!values[field] || values[field].trim() === "") {
                errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
            }
        });

        return errors;
    };

    const handleSave = async (e) => {
        e.preventDefault();

        const formErrors = validateForm();
        setErrors(formErrors);

        if (Object.keys(formErrors).length > 0) {
            return;
        }
        try {
            const response = await axios.put(
                `${API_URL}/api/users/particular-user-edit/${Userid}`,
                values
            );

            console.log("Edit response:", response);

            // Swal.fire({
            //     icon: "success",
            //     title: "Changes saved successfully!",
            //     showConfirmButton: true,
            //     timer: 1500,
            // });


            const setting = response.data;
            setValues({
                firstName: setting.firstName || "",
                lastName: setting.lastName || "",
                email: setting.email || "",
                phone: setting.phone || "",
                password: setting.password || "",
                city: setting.city || "",
                state: setting.state || "",
                country: setting.country || "",
            });
            fetched();

            localStorage.setItem("Resumnit_user", JSON.stringify(setting));
            // localStorage.setItem("refreshAfterSave", "yes");  // flag
            localStorage.setItem("showSuccessSwal", "true");

            window.location.reload();
            // window.location.reload();


        } catch (error) {
            console.log("Error while saving:", error);
        }
    };


    useEffect(() => {
        const shouldShowSwal = localStorage.getItem("showSuccessSwal");

        if (shouldShowSwal === "true") {
            Swal.fire({
                icon: "success",
                title: "Changes saved successfully!",
                showConfirmButton: true,
                timer: 1500,
            });

            // Remove flag so alert doesn't show again on next refresh
            localStorage.removeItem("showSuccessSwal");
        }
    }, []);



    const clickdashboard = () => {
        navigate('/dashboard');

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };


    // delete
    const handleDelete = async (e) => {
        try {
            const confirm = await Swal.fire({
                title: "Are you sure?",
                text: "Your account will be permanently deleted!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, delete it!"
            });

            if (!confirm.isConfirmed) return;

            const response = await axios.delete(`${API_URL}/api/users/particular-user-delete/${Userid}`);

            console.log("response", response)

            Swal.fire({
                icon: "success",
                title: "Account Deleted!",
                text: "Your account has been deleted successfully.",
                timer: 1500,
                confirmButtonText: 'OK'
            });


            // setUserData(null);

            navigate("/loging");

        } catch (error) {
            console.log("Delete Error:", error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Something went wrong while deleting!",
            });
        }
    };




    return (
        <div className="">
            {/* Header  */}

            <Header_Dashboard />


            {/* Main Section */}
            <div className="flex flex-1 w-full">
                {/* Sidebar */}
                <div className="lg:w-[18%] bg-white border-r sticky border-gray-200 ">
                    <Sidebar />
                </div>

                {/* Main Content */}
                <div className="w-full bg-[#f7f9fc] px-4 md:px-10 lg:px-20 p-7">
                    {/* Welcome Section */}
                    <div className=" items-center ">

                        <h1 className="text-[25px]  font-serif  font-bold text-gray-800">
                            Account Setting
                        </h1>

                    </div>
                    {/* --- Account Settings Section --- */}
                    <div className="mt-7 space-y-8">
                        {/* --- Your Current Plan --- */}
                        <div>
                            <h2 className="text-[14px] font-nunito text-gray-500 tracking-wide mb-3 uppercase">
                                Your Current Plan
                            </h2>

                            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex items-center flex-wrap justify-between">
                                <div className="flex items-center gap-4">
                                    {/* Crown Icon */}
                                    <div className="bg-blue-50 p-3 rounded-md">
                                        <FaCrown className="w-8 h-8 text-gray-200" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{Allplans}{" "}{UseContext?.accessdate?.start && UseContext?.accessdate?.end ? (
                                            <>({UseContext.accessdate.start} - {UseContext.accessdate.end})</>
                                        ) : null}</p>
                                        <p className="text-md text-gray-400">
                                            You can  save your data. Upgrade to unlock resume
                                            downloads, premium tools, and more.
                                        </p>
                                    </div>
                                </div>

                                <button onClick={handleUpgrade} className="text-[#1fadff] pr-4 font-semibold hover:text-[#05a3ff] text-md">
                                    Upgrade
                                </button>
                                <SubscriptionPopup show={showPopup} onClose={() => setShowPopup(false)} />
                            </div>
                        </div>

                        {/* --- Account Info --- */}
                        <div>
                            <h2 className='text-[14px] font-nunito text-gray-500 tracking-wide mb-3 uppercase'>
                                Account
                            </h2>

                            <form
                                className="bg-white w-full border border-gray-200 rounded-2xl p-8 shadow-xl"
                            >
                                <h2 className="text-xl font-bold text-center text-[#333] mb-8 font-nunito uppercase">
                                    User Details
                                </h2>

                                {/* Name Fields */}
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* First Name */}
                                    <div className="w-full relative">
                                        <label className="block text-gray-700 font-semibold mb-1">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            value={values.firstName}
                                            onChange={(e) =>
                                                setValues({ ...values, firstName: e.target.value })
                                            }
                                            placeholder="Enter your first name"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />

                                        {errors.firstName && (
                                            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                                        )}

                                    </div>

                                    {/* Last Name */}
                                    <div className="w-full relative">
                                        <label className="block text-gray-700 font-semibold mb-1">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            value={values.lastName}
                                            onChange={(e) =>
                                                setValues({ ...values, lastName: e.target.value })
                                            }
                                            placeholder="Enter your last name"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                        {errors.lastName && (
                                            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                                        )}

                                    </div>
                                </div>

                                {/* Email & Phone */}
                                <div className="flex flex-col md:flex-row gap-6 mt-6">
                                    {/* Email */}
                                    {/* <div className="w-full relative">
                                        <label className="block text-gray-700 font-semibold mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={values.email}
                                            onChange={(e) =>
                                                setValues({ ...values, email: e.target.value })
                                            }
                                            onBlur={() => handleBlur("email")}
                                            placeholder="Enter your email"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                        {isValid(values.email, "email") && (
                                            <div className="absolute inset-y-0 right-3 flex items-center mt-6">
                                                <div className="bg-green-500 rounded-full h-4 w-4 flex items-center justify-center">
                                                    <svg
                                                        className="h-3 w-3 text-white"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        )}
                                    </div> */}

                                    {/* Phone */}
                                    <div className="w-full relative">
                                        <label className="block text-gray-700 font-semibold mb-1">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            value={values.phone}
                                            onChange={(e) =>
                                                setValues({ ...values, phone: e.target.value })
                                            }
                                            placeholder="Enter your phone number"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                         {errors.phone && (
                                            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                        )}

                                    </div>
                                </div>

                                {/* Password */}
                                {/* <div className="mt-6 relative">
                                    <label className="block text-gray-700 font-semibold mb-1">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={values.password}
                                            onChange={(e) =>
                                                setValues({ ...values, password: e.target.value })
                                            }
                                            onBlur={() => handleBlur("password")}
                                            placeholder="Enter your password"
                                            className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                        <div
                                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
                                        </div>
                                    </div>

                                    {isValid(values.password, "password") && (
                                        <div className="absolute inset-y-0 right-10 flex items-center mt-6">
                                            <div className="bg-green-500 rounded-full h-4 w-4 flex items-center justify-center">
                                                <svg
                                                    className="h-3 w-3 text-white"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                </div> */}

                                {/* City, State, Country */}
                                <div className="flex flex-col md:flex-row gap-6 mt-6">
                                    {["city", "state", "country"].map((field) => (
                                        <div className="w-full relative" key={field}>
                                            <label className="block text-gray-700 font-semibold mb-1 capitalize">
                                                {field}
                                            </label>
                                            <input
                                                type="text"
                                                value={values[field]}
                                                onChange={(e) =>
                                                    setValues({ ...values, [field]: e.target.value })
                                                }
                                                placeholder={`Enter your ${field}`}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            />
                                          {errors[field] && (
        <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
      )}

                                        </div>
                                    ))}
                                </div>



                                {/* Submit */}
                                <div className="flex justify-end gap-5 mt-8">

                                    <button
                                        type="button"
                                        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-14 py-2 rounded-lg shadow transition-all duration-300"
                                        onClick={clickdashboard}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="button"
                                        className="bg-[#1fadff] hover:bg-[#05a3ff] text-white font-semibold px-14 py-2 rounded-lg shadow transition-all duration-300"
                                        onClick={handleSave}
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                        {/* --- Membership --- */}
                        <div>
                            <h2 className="text-[14px] font-nunito text-gray-500 tracking-wide mb-3 uppercase">
                                Membership
                            </h2>

                            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-10 text-center">
                                <div className="flex flex-col items-center justify-center space-y-3">
                                    <div className="bg-gray-50 p-3 rounded-md">
                                        <FaCrown className="w-8 h-8 text-yellow-400" />
                                    </div>
                                    <h3 className="text-[18px] font-serif font-semibold  text-gray-800">
                                        Need downloads and advanced editing?
                                    </h3>
                                    <p className="text-gray-700 text-[16px] max-w-[480px]">
                                        Upgrade your account to unlock unlimited downloads, priority support,
                                        and other helpful tools.
                                    </p>

                                    <button onClick={handleSubcription} className="bg-[#1fadff] hover:bg-[#05a3ff] transition-colors text-white font-semibold px-6 py-2 rounded-md mt-2">
                                        Subscribe now
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* --- Danger Zone --- */}
                        {/* <div>
                            <h2 className="text-[14px] font-nunito text-gray-500 tracking-wide mb-3 uppercase">
                                Danger Zone
                            </h2>

                            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-7 flex flex-col md:flex-row md:items-center md:justify-between">
                                <p className="text-gray-600 text-[15px]">
                                    Once you delete your account, it cannot be undone. This is permanent.
                                </p>
                                <button onClick={handleDelete} className="text-[#fa7c6b] font-semibold mt-3 md:mt-0">
                                    Delete account
                                </button>
                            </div>
                        </div> */}

                    </div>




                </div>
                <SubscriptionPopup show={showPopup} onClose={() => setShowPopup(false)} />
            </div>
        </div>
    );
};

export default Setting;
