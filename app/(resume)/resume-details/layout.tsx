// "use client";
// import TemplateOne from "@/app/components/templates/TemplateOne";
// import SimpleCanvasPreview from "../../components/resume/SimpleCanvasPreview";
// import Stepper from "../../components/resume/Steppers";
// import TemplateTwo from "@/app/components/templates/TemplateTwo";
// import { templateData } from "@/app/data";
// import { useContext, useState } from "react";
// import { CreateContext } from "@/app/context/CreateContext";
// import { useRouter } from "next/navigation";
// import { FiChevronRight, FiLayout } from "react-icons/fi";
// import { getLocalStorage } from "@/app/utils";
// import { Template } from "@/app/types";
// import { User } from "@/app/types/user.types";

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const router = useRouter();
//   const userDetails = getLocalStorage<User>("user_details");
//   const chosenTemplate = getLocalStorage<Template>("chosenTemplate");

//   const selectedResume = templateData.find(
//     (resume) => resume.id === chosenTemplate?.id,
//   );

//   const SelectedComponent = selectedResume?.component;

//   const [isHovered, setIsHovered] = useState(false);
//   return (
//     <div className="flex h-screen bg-gray-100 gap-5">
//       <aside className="lg:w-1/2 overflow-y-auto">{children}</aside>

//       <section className="max-lg:hidden w-1/2 bg-gray-100">
//         <div
//           className="absolute top-2 right-5 z-10"
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           <button
//             onClick={() => router.push("/change-template")}
//             className={`
//               flex items-center gap-2 px-3 py-2 bg-white border border-gray-200
//               hover:border-[#C40116] text-gray-700 hover:text-[#C40116]
//               font-medium rounded-xl shadow-lg hover:shadow-xl
//               transition-all duration-300 group
//               ${isHovered ? "scale-105" : ""}
//             `}
//           >
//             <FiLayout className="w-4 h-4" />
//             <span>Change Template</span>
//             <FiChevronRight
//               className={`
//               w-4 h-4 transition-transform duration-300
//               ${isHovered ? "translate-x-1" : ""}
//             `}
//             />
//           </button>
//         </div>

//         {SelectedComponent && (
//           <SimpleCanvasPreview>
//             <SelectedComponent />
//           </SimpleCanvasPreview>
//         )}
//       </section>
//     </div>
//   );
// }

// "use client";
// import SimpleCanvasPreview from "../../components/resume/SimpleCanvasPreview";
// import { templateData } from "@/app/data";
// import { useState, useEffect, useContext } from "react";
// import { useRouter } from "next/navigation";
// import { FiChevronRight, FiLayout, FiLogIn } from "react-icons/fi";
// import { getLocalStorage } from "@/app/utils";
// import { Template } from "@/app/types";
// import { User } from "@/app/types/user.types";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import { API_URL } from "@/app/config/api";
// import { CreateContext } from "@/app/context/CreateContext";

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const router = useRouter();
//   const userDetails = getLocalStorage<User>("user_details");
//   const chosenTemplate = getLocalStorage<Template>("chosenTemplate");

//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const chosenResumeDetails = getLocalStorage<Template>("chosenTemplate");

//   const userId = userDetails?.id;
//   const { contact, setContact, fullResumeData, setFullResumeData } =
//     useContext(CreateContext);

//   const fetchContact = async () => {
//     try {
//       const response = await axios.get(
//         `${API_URL}/api/contact-resume/get-contact/${userId}`,
//       );

//       const data = response.data[0] || response.data;

//       const updatedContact = {
//         ...contact,
//         contactId: data?._id || "",
//         firstName: data?.firstName || userDetails?.firstName || "",
//         lastName: data?.lastName || userDetails?.lastName || "",
//         jobTitle: data?.jobTitle || "",
//         phone: data?.phone || userDetails?.phone || "",
//         email: data?.email || userDetails?.email || "",
//         address: data?.address || "",
//         city: data?.city || userDetails?.city || "",
//         country: data?.country || userDetails?.country || "",
//         postcode: data?.postCode || "",
//         linkedin: data?.linkedIn || "",
//         portfolio: data?.portfolio || "",
//         croppedImage: data?.photo || null,
//       };

//       setContact(updatedContact);

//       // Update fullResumeData in context
//       if (fullResumeData) {
//         setFullResumeData({
//           ...fullResumeData,
//           contact: updatedContact,
//         });
//       } else {
//         setFullResumeData({
//           template: chosenResumeDetails || null,
//           contact: updatedContact,
//           experiences: [],
//           education: [],
//           skills: [],
//           summary: "",
//           finalize: {},
//         });
//       }

//       // Mark initial load as complete
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchContact();
//   }, []);

//   // Check if user is logged in
//   useEffect(() => {
//     if (!userDetails) {
//       setShowLoginModal(true);
//     } else {
//       setShowLoginModal(false);
//     }
//   }, [userDetails]);

//   const selectedResume = templateData.find(
//     (resume) => resume.id === chosenTemplate?.id,
//   );

//   const SelectedComponent = selectedResume?.component;

//   // If user is not logged in, show the login modal overlay
//   if (!userDetails) {
//     return (
//       <div className="flex h-screen bg-gray-100 gap-5 relative">
//         <aside className="lg:w-1/2 overflow-y-auto">{children}</aside>

//         <section className="max-lg:hidden w-1/2 bg-gray-100">
//           <div
//             className="absolute top-2 right-5 z-10"
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//           >
//             <button
//               onClick={() => router.push("/change-template")}
//               className={`
//                 flex items-center gap-2 px-3 py-2 bg-white border border-gray-200
//                 hover:border-[#C40116] text-gray-700 hover:text-[#C40116]
//                 font-medium rounded-xl shadow-lg hover:shadow-xl
//                 transition-all duration-300 group
//                 ${isHovered ? "scale-105" : ""}
//               `}
//             >
//               <FiLayout className="w-4 h-4" />
//               <span>Change Template</span>
//               <FiChevronRight
//                 className={`
//                 w-4 h-4 transition-transform duration-300
//                 ${isHovered ? "translate-x-1" : ""}
//               `}
//               />
//             </button>
//           </div>

//           {SelectedComponent && (
//             <SimpleCanvasPreview>
//               <SelectedComponent />
//             </SimpleCanvasPreview>
//           )}
//         </section>

//         {/* Modern Stylish Login Prompt Modal */}
//         <AnimatePresence>
//           {showLoginModal && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4"
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0, y: 20 }}
//                 animate={{ scale: 1, opacity: 1, y: 0 }}
//                 exit={{ scale: 0.9, opacity: 0, y: 20 }}
//                 transition={{ type: "spring", damping: 25, stiffness: 300 }}
//                 className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-[90%] sm:max-w-md mx-auto overflow-hidden"
//               >
//                 {/* Modal Content */}
//                 <div className="relative p-5 sm:p-8 text-center">
//                   {/* Animated Icon */}
//                   <motion.div
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ delay: 0.2, type: "spring", damping: 10 }}
//                     className="inline-flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24 mb-4 sm:mb-6"
//                   >
//                     <div className="relative w-16 h-16 sm:w-24 sm:h-24 bg-linear-to-br from-[#c40116] to-[#be0117] rounded-xl sm:rounded-2xl shadow-xl shadow-[#c40116]/30 flex items-center justify-center transform hover:rotate-3 transition-transform duration-300">
//                       <FiLogIn className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
//                     </div>
//                   </motion.div>

//                   {/* Text Content */}
//                   <motion.h2
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.3 }}
//                     className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-3"
//                   >
//                     Login Required
//                   </motion.h2>

//                   <motion.p
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.4 }}
//                     className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 px-2"
//                   >
//                     Please login to your account to create and save your
//                     professional resume.
//                   </motion.p>

//                   {/* Buttons */}
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.5 }}
//                     className="space-y-2 sm:space-y-3"
//                   >
//                     <button
//                       onClick={() => router.push("/login")}
//                       className="w-full py-3 sm:py-4 bg-linear-to-r from-[#c40116] to-[#be0117] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#c40116]/25 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 text-base sm:text-lg cursor-pointer"
//                     >
//                       <FiLogIn className="w-4 h-4 sm:w-5 sm:h-5" />
//                       Go to Login
//                     </button>

//                     <button
//                       onClick={() => router.push("/")}
//                       className="w-full py-2 sm:py-3 text-gray-500 font-medium hover:text-gray-700 transition-colors duration-300 text-xs sm:text-sm cursor-pointer"
//                     >
//                       Return to Homepage
//                     </button>
//                   </motion.div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     );
//   }

//   // If user is logged in, show the normal layout
//   return (
//     <div className="flex h-screen bg-gray-100 gap-5">
//       <aside className="lg:w-1/2 overflow-y-auto">{children}</aside>

//       <section className="max-lg:hidden w-1/2 bg-gray-100">
//         <div
//           className="absolute top-2 right-5 z-10"
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           <button
//             onClick={() => router.push("/change-template")}
//             className={`
//               flex items-center gap-2 px-3 py-2 bg-white border border-gray-200
//               hover:border-[#C40116] text-gray-700 hover:text-[#C40116]
//               font-medium rounded-xl shadow-lg hover:shadow-xl
//               transition-all duration-300 group
//               ${isHovered ? "scale-105" : ""}
//             `}
//           >
//             <FiLayout className="w-4 h-4" />
//             <span>Change Template</span>
//             <FiChevronRight
//               className={`
//               w-4 h-4 transition-transform duration-300
//               ${isHovered ? "translate-x-1" : ""}
//             `}
//             />
//           </button>
//         </div>

//         {SelectedComponent && (
//           <SimpleCanvasPreview>
//             <SelectedComponent />
//           </SimpleCanvasPreview>
//         )}
//       </section>
//     </div>
//   );
// }

"use client";
import SimpleCanvasPreview from "../../components/resume/SimpleCanvasPreview";
import { templateData } from "@/app/data";
import { useState, useEffect, useContext, useRef } from "react";
import { useRouter } from "next/navigation";
import { FiChevronRight, FiLayout, FiLogIn, FiEye, FiX } from "react-icons/fi";
import { getLocalStorage, setLocalStorage } from "@/app/utils";
import { Template } from "@/app/types";
import { User } from "@/app/types/user.types";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { API_URL } from "@/app/config/api";
import { CreateContext } from "@/app/context/CreateContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const userDetails = getLocalStorage<User>("user_details");
  const chosenTemplate = getLocalStorage<Template>("chosenTemplate");

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const chosenResumeDetails = getLocalStorage<Template>("chosenTemplate");

  const userId = userDetails?.id;
  const initialLoadDone = useRef(false);

  const {
    contact,
    setContact,
    education,
    setEducation,
    experiences,
    setExperiences,
    skills,
    setSkills,
    summary,
    setSummary,
    finalize,
    setFinalize,
    fullResumeData,
    setFullResumeData,
  } = useContext(CreateContext);

  const fetchContact = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/contact-resume/get-contact/${userId}`,
      );

      const data = response.data[0] || response.data;

      const updatedContact = {
        ...contact,
        contactId: data?._id || "",
        firstName: data?.firstName || userDetails?.firstName || "",
        lastName: data?.lastName || userDetails?.lastName || "",
        jobTitle: data?.jobTitle || "",
        phone: data?.phone || userDetails?.phone || "",
        email: data?.email || userDetails?.email || "",
        address: data?.address || "",
        city: data?.city || userDetails?.city || "",
        country: data?.country || userDetails?.country || "",
        postcode: data?.postCode || "",
        linkedin: data?.linkedIn || "",
        portfolio: data?.portfolio || "",
        croppedImage: data?.photo || null,
      };

      setContact(updatedContact);
      fetchResumeFullData(data?._id);

      // Update fullResumeData in context
      if (fullResumeData) {
        setFullResumeData({
          ...fullResumeData,
          contact: updatedContact,
        });
      } else {
        setFullResumeData({
          template: chosenResumeDetails || null,
          contact: updatedContact,
          experiences: [],
          education: [],
          skills: [],
          summary: "",
          finalize: {},
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchResumeFullData = async (id: string) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/experience/get-all-contacts/${id}`,
      );

      if (response.data?.data?.length > 0) {
        const data = response.data.data[0];

        const formattedData = {
          template: chosenResumeDetails || null,
          contact: data.contact || {},
          educations: data.educations || [],
          experience: data.experiences || [],
          skills: data.skills || [],
          finalize: data.finalize?.[0] || {},
          summary: data.summary?.[0] || "", // Extract text from summary array
        };


        // setFullResumeData(formattedData);

        setFullResumeData({
          template: chosenResumeDetails || null,
          contact: data.contact,
          experiences: data.experiences,
          education: data.educations,
          skills: data.skills,
          summary: data.summary[0] || "",
          finalize: data.finalize?.[0] || {},
        });

        initialLoadDone.current = true;

        setLocalStorage("fullResumeData", {
          template: chosenResumeDetails || null,
          contact: data.contact,
          experiences: data.experiences,
          education: data.educations,
          skills: data.skills,
          summary: data?.summary,
          finalize: data?.finalize[0],
        });

        setEducation(data?.educations || []);
        setExperiences(data?.experiences || []);
        setSkills(data?.skills || []);
        setSummary(data?.summary[0] || "");
        setFinalize(data?.finalize[0] || {});
      }
    } catch (error) {
      console.log("Error fetching contact:", error);
    }
  };

  // Check if user is logged in
  useEffect(() => {
    if (!userDetails) {
      setShowLoginModal(true);
    } else {
      setShowLoginModal(false);
    }
  }, [userDetails]);

  const selectedResume = templateData.find(
    (resume) => resume.id === chosenTemplate?.id,
  );

  const SelectedComponent = selectedResume?.component;

  // If user is not logged in, show the login modal overlay
  if (!userDetails) {
    return (
      <div className="flex h-screen bg-gray-100 gap-5 relative">
        <aside className="lg:w-1/2 overflow-y-auto">{children}</aside>

        <section className="max-lg:hidden w-1/2 bg-gray-100">
          <div
            className="absolute top-2 right-5 z-10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <button
              onClick={() => router.push("/change-template")}
              className={`
                flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 
                hover:border-[#C40116] text-gray-700 hover:text-[#C40116] 
                font-medium rounded-xl shadow-lg hover:shadow-xl 
                transition-all duration-300 group
                ${isHovered ? "scale-105" : ""}
              `}
            >
              <FiLayout className="w-4 h-4" />
              <span>Change Template</span>
              <FiChevronRight
                className={`
                w-4 h-4 transition-transform duration-300
                ${isHovered ? "translate-x-1" : ""}
              `}
              />
            </button>
          </div>

          {SelectedComponent && (
            <SimpleCanvasPreview>
              <SelectedComponent />
            </SimpleCanvasPreview>
          )}
        </section>

        {/* Mobile Preview Button - Only visible on small screens */}
        {SelectedComponent && (
          <button
            onClick={() => setShowMobilePreview(true)}
            className="lg:hidden fixed bottom-6 right-6 z-50 bg-[#C40116] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          >
            <FiEye className="w-6 h-6" />
          </button>
        )}

        {/* Mobile Preview Drawer */}
        <AnimatePresence>
          {showMobilePreview && SelectedComponent && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowMobilePreview(false)}
                className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              />

              {/* Drawer */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="lg:hidden fixed top-0 right-0 h-full w-[85%] max-w-md bg-white shadow-2xl z-50 overflow-hidden"
              >
                {/* Drawer Header */}
                <div className="absolute top-0 left-0 right-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-10">
                  <h3 className="font-semibold text-gray-800">
                    Resume Preview
                  </h3>
                  <button
                    onClick={() => setShowMobilePreview(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FiX className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Drawer Content - Resume Preview */}
                <div className="h-full pt-16 pb-4 overflow-y-auto">
                  <div className="px-4">
                    <SimpleCanvasPreview>
                      <SelectedComponent />
                    </SimpleCanvasPreview>
                  </div>
                </div>

                {/* Change Template Button in Drawer */}
                <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
                  <button
                    onClick={() => {
                      setShowMobilePreview(false);
                      router.push("/change-template");
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 hover:border-[#C40116] text-gray-700 hover:text-[#C40116] font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <FiLayout className="w-4 h-4" />
                    <span>Change Template</span>
                    <FiChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Modern Stylish Login Prompt Modal */}
        <AnimatePresence>
          {showLoginModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-60 p-3 sm:p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-[90%] sm:max-w-md mx-auto overflow-hidden"
              >
                {/* Modal Content */}
                <div className="relative p-5 sm:p-8 text-center">
                  {/* Animated Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", damping: 10 }}
                    className="inline-flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24 mb-4 sm:mb-6"
                  >
                    <div className="relative w-16 h-16 sm:w-24 sm:h-24 bg-linear-to-br from-[#c40116] to-[#be0117] rounded-xl sm:rounded-2xl shadow-xl shadow-[#c40116]/30 flex items-center justify-center transform hover:rotate-3 transition-transform duration-300">
                      <FiLogIn className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                    </div>
                  </motion.div>

                  {/* Text Content */}
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-3"
                  >
                    Login Required
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 px-2"
                  >
                    Please login to your account to create and save your
                    professional resume.
                  </motion.p>

                  {/* Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-2 sm:space-y-3"
                  >
                    <button
                      onClick={() => router.push("/login")}
                      className="w-full py-3 sm:py-4 bg-linear-to-r from-[#c40116] to-[#be0117] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#c40116]/25 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 text-base sm:text-lg cursor-pointer"
                    >
                      <FiLogIn className="w-4 h-4 sm:w-5 sm:h-5" />
                      Go to Login
                    </button>

                    <button
                      onClick={() => router.push("/")}
                      className="w-full py-2 sm:py-3 text-gray-500 font-medium hover:text-gray-700 transition-colors duration-300 text-xs sm:text-sm cursor-pointer"
                    >
                      Return to Homepage
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // If user is logged in, show the normal layout with mobile preview
  return (
    <div className="flex h-screen bg-gray-100 gap-5 relative">
      <aside className="w-full lg:w-1/2 overflow-y-auto">{children}</aside>

      <section className="max-lg:hidden w-1/2 bg-gray-100">
        <div
          className="absolute top-2 right-5 z-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button
            onClick={() => router.push("/change-template")}
            className={`
              flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 
              hover:border-[#C40116] text-gray-700 hover:text-[#C40116] 
              font-medium rounded-xl shadow-lg hover:shadow-xl 
              transition-all duration-300 group cursor-pointer
              ${isHovered ? "scale-105" : ""}
            `}
          >
            <FiLayout className="w-4 h-4" />
            <span>Change Template</span>
            <FiChevronRight
              className={`
              w-4 h-4 transition-transform duration-300
              ${isHovered ? "translate-x-1" : ""}
            `}
            />
          </button>
        </div>

        {SelectedComponent && (
          <SimpleCanvasPreview>
            <SelectedComponent />
          </SimpleCanvasPreview>
        )}
      </section>

      {/* Mobile Preview Button - Only visible on small screens */}
      {SelectedComponent && (
        <button
          onClick={() => setShowMobilePreview(true)}
          className="lg:hidden fixed top-16.5 right-6 z-50 bg-[#C40116] text-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          <FiEye className="w-3 h-3" />
        </button>
      )}

      {/* Mobile Preview Drawer */}
      <AnimatePresence>
        {showMobilePreview && SelectedComponent && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobilePreview(false)}
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 right-0 h-full w-full sm:w-[85%]  bg-white shadow-2xl z-50 overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="absolute top-0 left-0 right-0 bg-white border-b border-gray-200 p-3 sm:p-4 flex justify-between items-center z-10">
                <button
                  onClick={() => {
                    setShowMobilePreview(false);
                    router.push("/change-template");
                  }}
                  className="w-fit flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 hover:border-[#C40116] text-gray-700 hover:text-[#C40116] font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <FiLayout className="w-4 h-4" />
                  <span className="text-xs">Change Template</span>
                  <FiChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowMobilePreview(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FiX className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Drawer Content - Resume Preview */}
              <div className="h-full pt-16 pb-20 overflow-y-auto">
                <div className="px-4">
                  <SimpleCanvasPreview>
                    <SelectedComponent />
                  </SimpleCanvasPreview>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
