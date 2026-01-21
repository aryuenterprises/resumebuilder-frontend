import { useState, useEffect, useContext } from "react";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { API_URL } from "../Config";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { CreateContext } from "../App";


// const stripePromise = loadStripe("pk_test_51SP2ZsGi0Hbe41Jr6nVbpcTKTP1tlN7jV70e8j3CvH5R5qDncT4MIdjqBJ22pnOmZVmuqhbxhRy1qhr4r5nIkV4C00Cm3eiNBl");

const Subscription_Component = (show, onClose) => {
    const UseContext = useContext(CreateContext);
    const Allplans = UseContext?.allplandetails;


    // console.log("Allplans", Allplans)



    // if (!show) return null;

    const [plans, setPlans] = useState([]);
    // console.log("plans", plans)
    const [loading, setLoading] = useState(true);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [userEmail, setUserEmail] = useState("");
    const [userId, setUserId] = useState("");
    const [showPayment, setShowPayment] = useState(false);


    const [userall, setUserall] = useState("");
    // console.log("userall", userall)


    const [stripePromise, setStripePromise] = useState(null);

    // const [currency ,setcurrency] = useState([]);

    // const { currencysymbol, setcurrency } = useContext(CreateContext)

    const [currencyName, setCurrencyName] = useState([]);

    // console.log("currencyName", currencyName);


    // console.log("currency",currency)



    useEffect(() => {
        fetchStripe();
    }, []);

    const fetchStripe = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/setting/get-setting`);

            // setcurrency(response.data[0]?.currenyType)
            setCurrencyName(response.data[0]?.currencyName)

            const publishKey = response.data[0]?.PublishableKey;

            if (publishKey) {
                // IMPORTANT:
                // loadStripe must be called here
                const stripe = loadStripe(publishKey);

                setStripePromise(stripe);
            }
        } catch (error) {
            console.log("Stripe key fetch error:", error);
        }
    };


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("Resumnit_user"));
        setUserall(user);
        // console.log('user',user)
        setUserEmail(user?.email || "");
        setUserId(user?.id || user?._id || "");
    }, []);

    const navigate = useNavigate();




    const handlePlanSelect = async (plan) => {
        if (!userId) {
            Swal.fire({
                icon: "warning",
                title: "Please login first",
                text: "You need to log in to continue.",
                confirmButtonText: "OK",
            }).then(() => {
                navigate("/loging");
            });

            return; // stop execution
        }

        if (plan.price === 0) {
            setShowPayment(false);

            try {
                const res = await axios.post(`${API_URL}/api/payment/free-plan`,
                    {
                        // params: { userId: userId, planId: plan._id },
                        userId: userId,
                        planId: plan._id,
                    });
                // onClose();

                Swal.fire({
                    icon: "success",
                    title: "Free Plan Activated!",
                    text: res.data?.message || "You have successfully activated the free plan.",
                }).then(() => {
                    window.location.reload();
                });

            } catch (error) {
                console.error("Error activating free plan:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.response?.data?.message || "Something went wrong while activating the free plan.",
                });
            }

            return;
        }

        //  User is logged in — continue to payment
        setSelectedPlan(plan);
        setShowPayment(false); // or whatever triggers your Stripe form
    };


    const fetchPlans = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/plan-subscription/get-all-plan-subscription`, {
                params: { type: "active" }
            });
            const plans = res?.data?.data?.planSubscriptionDetails
                || res?.data?.planSubscriptionDetails
                || [];
            setPlans(plans);
        } catch (err) {
            console.error("Error fetching plans:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    return (
        <div className="">
            {/* Header */}
            <div className="text-center py-8 px-6 font-nunito border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800">Choose Your Upgrade Plan</h2>
                <p className="text-gray-600 mt-2 text-base">
                    Pick the plan that best fits your needs.
                </p>
            </div>

            {/* Main Section */}
            <div className="p-8 w-full">
                {selectedPlan ? (
                    //  Stripe Payment Form
                    <div className="w-full text-center">
                        <h3 className="text-xl font-semibold font-nunito text-gray-800 mb-4">
                            {selectedPlan.name} — {UseContext?.currencysymbol}{selectedPlan.price}
                        </h3>

                        <Elements
                            stripe={stripePromise}
                            options={{
                                mode: "payment",
                                // amount: selectedPlan.price,
                                amount: Math.round(parseFloat(selectedPlan.price) * 100),
                                currency: currencyName,



                                // currency: "inr",
                            }}
                        >
                            <CheckoutForm
                                amount={selectedPlan.price}
                                planId={selectedPlan._id}
                                email={userEmail}
                                userId={userId}
                                currencyName={currencyName}
                                onSuccess={() => {
                                    setSelectedPlan(null);
                                    // onClose();
                                }}
                                className
                            />
                        </Elements>

                        <button
                            onClick={() => setSelectedPlan(null)}
                            //   onClick={() => handlePlanSelect(plan)}

                            className="mt-4 text-sm text-gray-500 underline font-nunito hover:text-gray-700"
                        >
                            ← Back to Plans
                        </button>
                    </div>
                ) : (


                    <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-6">
                        {loading ? (
                            <p className="text-center text-gray-500 font-nunito col-span-3">Loading...</p>
                        ) : plans.length > 0 ? (
                            plans.map((plan) => {
                                const isActive = Allplans?.includes(plan.name?.trim());

                                //  Clean or safely render HTML description
                                const cleanDescription = plan.description?.replace(/<\/?[^>]+(>|$)/g, "") || "";

                                //  Features: use API features if available or fallback sample
                                const features = plan.features?.length
                                    ? plan.features
                                    : ["Unlimited templates", "Download in PDF", "Premium Support"];

                                return (
                                    // <div
                                    //     key={plan._id}
                                    //     className={`flex flex-col justify-between border rounded-2xl p-6 text-center bg-white hover:shadow-lg transition-all duration-300 ${plan.price === 0 ? "border-green-400 bg-green-50" : ""
                                    //         }`}
                                    // >

                                    //     {/* Top Section */}
                                    //     <div>
                                    //         <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                                    //             {plan.name}
                                    //         </h3>

                                    //         {/* Description */}
                                    //         <div
                                    //             className="text-gray-600 mb-5 min-h-[80px] leading-relaxed text-sm"
                                    //             dangerouslySetInnerHTML={{ __html: plan.description }}
                                    //         />


                                    //     </div>

                                    //     <div>
                                    //         {/* Price */}
                                    //         {/* <p className="text-3xl font-bold text-indigo-700 mb-6">
                                    //                     ₹{plan.price}
                                    //                 </p> */}

                                    //         {/* {plan.price > 0 && (
                                    //                     <p className="text-3xl font-bold text-indigo-700 mb-6">
                                    //                         ${plan.price}
                                    //                     </p>
                                    //                 )} */}

                                    //         <p className="text-3xl font-bold text-indigo-700 mb-6">
                                    //             {plan.price > 0 ? `€${plan.price}` : `€0`}
                                    //         </p>



                                    //         {/* Feature List */}
                                    //         <ul className="space-y-3 mb-8 text-sm text-gray-700 text-left mx-auto w-fit">
                                    //             {features.map((feature, index) => (
                                    //                 <li key={index} className="flex items-center gap-2">
                                    //                     <FaCheckCircle className="text-green-500 text-lg" />
                                    //                     <span>{feature}</span>
                                    //                 </li>
                                    //             ))}
                                    //         </ul>


                                    //         {/* Button */}
                                    //         <button
                                    //             onClick={() => handlePlanSelect(plan)}
                                    //             className={`w-full py-2.5 rounded-lg font-semibold transition-all duration-200 ${plan.price === 0
                                    //                 ? "bg-green-500 hover:bg-green-600 text-white"
                                    //                 : "bg-indigo-600 hover:bg-indigo-700 text-white"
                                    //                 }`}
                                    //         >
                                    //             {plan.price === 0 ? "Activate Free Plan" : (plan.name)}
                                    //         </button>
                                    //     </div>
                                    // </div>

                                    <div
                                        key={plan._id}
                                        className={`
                relative flex flex-col justify-between mb-6 font-nunito rounded-2xl p-7 
                transition-all duration-300  
                border 
                ${isActive
                                                ? "border-blue-600 shadow-xl bg-gradient-to-br from-blue-50 to-blue-100 scale-[1.05]"
                                                : "border-gray-200 shadow-sm hover:shadow-lg hover:scale-[1.03] bg-white"}
            `}
                                    >

                                        {/* Top Badge */}
                                        {isActive && (
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                                <span className="bg-blue-600 text-white font-nunito text-xs font-semibold px-4 py-1 rounded-full shadow-md tracking-wide">
                                                    Current Plan
                                                </span>
                                            </div>
                                        )}

                                        {/* Title */}
                                        <div>
                                            <div className="mb-4">
                                                <h3 className="text-[22px] font-nunito font-bold text-gray-900 leading-tight text-center">
                                                    {plan.name}
                                                </h3>
                                            </div>

                                            {/* Description */}
                                            <div
                                                className="text-gray-600 font-nunito text-sm leading-relaxed mb-6 min-h-[90px] text-center"
                                                dangerouslySetInnerHTML={{ __html: plan.description }}
                                            />

                                        </div>
                                        {/* Price */}
                                        <div>
                                            <div className="text-center mb-7">
                                                <span className="text-4xl font-extrabold font-nunito text-gray-900">
                                                    {plan.price > 0 ? `${UseContext?.currencysymbol}${plan.price}` : `${UseContext?.currencysymbol}0`}
                                                </span>
                                                {/* {plan.price > 0 && (
                    <span className="text-gray-500 text-sm ml-1">/ one-time</span>
                )} */}
                                            </div>

                                            {/* Feature List */}
                                            {/* <ul className="space-y-3 mb-8 text-sm text-gray-700">
                {(plan.features || [
                    "Unlimited templates",
                    "Download in PDF",
                    "Premium Support"
                ]).map((feature, index) => (
                    <li 
                        key={index} 
                        className="flex items-center gap-3"
                    >
                        <FaCheckCircle className="text-green-500 text-lg flex-shrink-0" />
                        <span className="text-gray-800">{feature}</span>
                    </li>
                ))}
            </ul> */}

                                            <ul className="space-y-3 mb-8 text-sm font-nunito text-center text-gray-700">
                                                <li className="flex items-center justify-center gap-3">
                                                    <FaCheckCircle className="text-green-500 text-lg flex-shrink-0" />
                                                    <span className="text-gray-800">{plan?.plan}</span>
                                                </li>
                                            </ul>
                                        </div>


                                        {/* Button */}
                                        <button
                                            onClick={() => handlePlanSelect(plan)}
                                            className={`
                    w-full py-3.5 rounded-xl font-semibold text-white text-sm font-nunito tracking-wide
                    transition-all duration-200
                    ${plan.price === 0
                                                    ? "bg-green-600 hover:bg-green-700"
                                                    : "bg-indigo-600 hover:bg-indigo-700"}
                `}
                                        >
                                            {plan.price === 0 ? "Activate Free Plan" : plan.name}
                                        </button>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-center font-nunito text-gray-500 col-span-3">No plans available.</p>
                        )}
                    </div>

                )}
            </div>
        </div>
    );
};

export default Subscription_Component;

