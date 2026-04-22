"use client";
import SimpleCanvasPreview from "../../components/resume/SimpleCanvasPreview";
import { templateData } from "@/app/data";
import { useState, useEffect, useContext, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  FiChevronRight,
  FiLayout,
  FiLogIn,
  FiEye,
  FiX,
  FiArrowRight,
} from "react-icons/fi";
import { getLocalStorage, setLocalStorage } from "@/app/utils";
import { Template } from "@/app/types";
import { User } from "@/app/types/user.types";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { API_URL } from "@/app/config/api";
import { CreateContext } from "@/app/context/CreateContext";
import LoginModel from "@/app/components/auth/LoginModel";
import { ResumeDataFetcher } from "@/app/components/resume/ResumeDataFetcher";
import { usePreventReload } from "@/app/hooks";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const chosenTemplate = getLocalStorage<Template>("chosenTemplate");
  const [isHovered, setIsHovered] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  const selectedResume = templateData.find(
    (resume) => resume.id == (chosenTemplate?.id || chosenTemplate?.templateId),
  );

  const SelectedComponent = selectedResume?.component;

  // usePreventReload()

  return (
    <div className="flex h-screen bg-gray-100 gap-5 relative">
      <LoginModel />

      <aside className="w-full lg:w-1/2 overflow-y-auto">
        <ResumeDataFetcher>{children}</ResumeDataFetcher>
      </aside>

      <section className="max-lg:hidden w-1/2 bg-gray-100">
        {/* <div
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
        </div> */}

        <div
          className="absolute top-4 right-4 z-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.button
            onClick={() => router.push("/change-template")}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`
      flex items-center gap-2 px-4 py-2.5 
      bg-white/80 backdrop-blur-md 
      border border-gray-200/50 hover:border-indigo-400 
      text-gray-700 hover:text-indigo-600 
      font-medium rounded-xl shadow-md hover:shadow-lg 
      transition-all duration-300 group cursor-pointer
      ${isHovered ? "shadow-lg bg-white" : ""}
    `}
          >
            {/* Animated Icon Container */}
            <div className="relative">
              <motion.div
                animate={{ rotate: isHovered ? 180 : 0 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                className="p-0.5"
              >
                <FiLayout className="w-4 h-4" />
              </motion.div>
              {/* Glow effect on hover */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 bg-indigo-400 rounded-full blur-md -z-10"
                />
              )}
            </div>

            <span className="text-sm font-medium">Change Template</span>

            <motion.div
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            >
              <FiChevronRight className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </div>
        {SelectedComponent && (
          <SimpleCanvasPreview>
            <SelectedComponent />
          </SimpleCanvasPreview>
        )}
      </section>

      {/* Mobile Preview Button - Only visible on small screens */}
      {SelectedComponent && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowMobilePreview(true)}
          className="lg:hidden fixed top-20 right-4 z-50 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <FiEye className="w-3 h-3" />
        </motion.button>
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
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-md z-50"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 right-0 h-full w-full sm:w-[90%] bg-white shadow-2xl z-50 overflow-hiddenl sm:rounded-l-3xl"
            >
              {/* Drawer Header with Gradient */}
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-3 flex justify-between items-center z-10">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-white/20 rounded-lg">
                    <FiEye className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white font-semibold text-sm">
                    Resume Preview
                  </span>
                </div>
                <button
                  onClick={() => setShowMobilePreview(false)}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <FiX className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Template Info Bar */}
              <div className="absolute top-12 left-0 right-0 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-4 py-2 z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-xs text-gray-500">Live Preview</span>
                  </div>
                  <button
                    onClick={() => {
                      setShowMobilePreview(false);
                      router.push("/change-template");
                    }}
                    className="flex items-center gap-1 px-2 py-1 bg-indigo-50 rounded-lg text-indigo-600 text-xs font-medium"
                  >
                    <FiLayout className="w-3 h-3" />
                    Change Template
                  </button>
                </div>
              </div>

              {/* Drawer Content - Resume Preview */}
              <div className="h-full pt-24 pb-6 overflow-y-auto">
                <div className="px-3">
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

// "use client";
// import SimpleCanvasPreview from "../../components/resume/SimpleCanvasPreview";
// import { templateData } from "@/app/data";
// import { useState, useEffect, useContext, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { FiChevronRight, FiLayout, FiLogIn, FiEye, FiX } from "react-icons/fi";
// import { getLocalStorage, setLocalStorage } from "@/app/utils";
// import { Template } from "@/app/types";
// import { User } from "@/app/types/user.types";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import { API_URL } from "@/app/config/api";
// import { CreateContext } from "@/app/context/CreateContext";
// import LoginModel from "@/app/components/auth/LoginModel";

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const router = useRouter();
//   const userDetails = getLocalStorage<User>("user_details");
//   const chosenTemplate = getLocalStorage<Template>("chosenTemplate");

//   const [isHovered, setIsHovered] = useState(false);
//   const [showMobilePreview, setShowMobilePreview] = useState(false);
//   const chosenResumeDetails = getLocalStorage<Template>("chosenTemplate");

//   const userId = userDetails?.id;
//   const initialLoadDone = useRef(false);

//   const {
//     contact,
//     setContact,
//     education,
//     setEducation,
//     experiences,
//     setExperiences,
//     skills,
//     setSkills,
//     summary,
//     setSummary,
//     finalize,
//     setFinalize,
//     fullResumeData,
//     setFullResumeData,
//   } = useContext(CreateContext);

//   const fetchContact = async () => {
//     try {
//       const response = await axios.get(
//         `${API_URL}/api/contact-resume/get-contact/${userId}`,
//       );

//       const data = response.data[0] || response.data;

//       // const updatedContact = {
//       //   ...contact,
//       //   contactId: data?._id || "",
//       //   firstName: data?.firstName || "",
//       //   lastName: data?.lastName || "",
//       //   jobTitle: data?.jobTitle || "",
//       //   phone: data?.phone || "",
//       //   email: data?.email || "",
//       //   address: data?.address || "",
//       //   city: data?.city || "",
//       //   country: data?.country || "",
//       //   postcode: data?.postCode || "",
//       //   linkedin: data?.linkedIn || "",
//       //   portfolio: data?.portfolio || "",
//       //   croppedImage: data?.photo || null,
//       // };

//       // setContact(updatedContact);
//       // fetchResumeFullData(data?._id);

//       // Update fullResumeData in context
//       // if (fullResumeData) {
//       //   setFullResumeData({
//       //     ...fullResumeData,
//       //     contact: updatedContact,
//       //   });
//       // } else {
//       //   setFullResumeData({
//       //     template: chosenResumeDetails || null,
//       //     contact: updatedContact,
//       //     experiences: [],
//       //     education: [],
//       //     skills: [],
//       //     summary: "",
//       //     finalize: {},
//       //   });
//       // }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchContact();
//   }, []);

//   const fetchResumeFullData = async (id: string) => {
//     try {
//       const response = await axios.get(
//         `${API_URL}/api/experience/get-all-contacts/${id}`,
//       );

//       if (response.data?.data?.length > 0) {
//         const data = response.data.data[0];

//         // const formattedData = {
//         //   template: chosenResumeDetails || null,
//         //   contact: data.contact || {},
//         //   educations: data.educations || [],
//         //   experience: data.experiences || [],
//         //   skills: data.skills || [],
//         //   finalize: data.finalize?.[0] || {},
//         //   summary: data.summary?.[0] || "", // Extract text from summary array
//         // };

//         // setFullResumeData(formattedData);

//         setFullResumeData({
//           template: chosenResumeDetails || null,
//           contact: data.contact,
//           experiences: data.experiences,
//           education: data.educations,
//           skills: data.skills,
//           summary: data.summary[0] || "",
//           finalize: data.finalize?.[0] || {},
//         });

//         initialLoadDone.current = true;

//         setLocalStorage("fullResumeData", {
//           template: chosenResumeDetails || null,
//           contact: data.contact,
//           experiences: data.experiences,
//           education: data.educations,
//           skills: data.skills,
//           summary: data?.summary,
//           finalize: data?.finalize[0],
//         });

//               setContact(data?.contact);
//         setEducation(data?.educations || []);
//         setExperiences(data?.experiences || []);
//         setSkills(data?.skills || []);
//         setSummary(data?.summary[0] || "");
//         setFinalize(data?.finalize[0] || {});
//       }
//     } catch (error) {
//       console.log("Error fetching contact:", error);
//     }
//   };

//   const selectedResume = templateData.find(
//     (resume) => resume.id == (chosenTemplate?.id || chosenTemplate?.templateId),
//   );

//   const SelectedComponent = selectedResume?.component;

//   return (
//     <div className="flex h-screen bg-gray-100 gap-5 relative">
//       <LoginModel />

//       <aside className="w-full lg:w-1/2 overflow-y-auto">{children}</aside>

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
//               transition-all duration-300 group cursor-pointer
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

//       {/* Mobile Preview Button - Only visible on small screens */}
//       {SelectedComponent && (
//         <button
//           onClick={() => setShowMobilePreview(true)}
//           className="lg:hidden fixed top-16.5 right-6 z-50 bg-[#C40116] text-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
//         >
//           <FiEye className="w-3 h-3" />
//         </button>
//       )}

//       {/* Mobile Preview Drawer */}
//       <AnimatePresence>
//         {showMobilePreview && SelectedComponent && (
//           <>
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setShowMobilePreview(false)}
//               className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
//             />

//             {/* Drawer */}
//             <motion.div
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", damping: 25, stiffness: 200 }}
//               className="lg:hidden fixed top-0 right-0 h-full w-full sm:w-[85%]  bg-white shadow-2xl z-50 overflow-hidden"
//             >
//               {/* Drawer Header */}
//               <div className="absolute top-0 left-0 right-0 bg-white border-b border-gray-200 p-3 sm:p-4 flex justify-between items-center z-10">
//                 <button
//                   onClick={() => {
//                     setShowMobilePreview(false);
//                     router.push("/change-template");
//                   }}
//                   className="w-fit flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 hover:border-[#C40116] text-gray-700 hover:text-[#C40116] font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
//                 >
//                   <FiLayout className="w-4 h-4" />
//                   <span className="text-xs">Change Template</span>
//                   <FiChevronRight className="w-4 h-4" />
//                 </button>
//                 <button
//                   onClick={() => setShowMobilePreview(false)}
//                   className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                 >
//                   <FiX className="w-5 h-5 text-gray-600" />
//                 </button>
//               </div>

//               {/* Drawer Content - Resume Preview */}
//               <div className="h-full pt-16 pb-20 overflow-y-auto">
//                 <div className="px-4">
//                   <SimpleCanvasPreview>
//                     <SelectedComponent />
//                   </SimpleCanvasPreview>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
