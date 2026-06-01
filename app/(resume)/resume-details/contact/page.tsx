// "use client";

// import React, {
//   useContext,
//   useState,
//   useCallback,
//   useEffect,
//   useRef,
// } from "react";
// import Cropper from "react-easy-crop";
// import { useDropzone } from "react-dropzone";
// import { AnimatePresence, motion } from "framer-motion";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import {
//   IoPersonOutline,
//   IoCloudUploadOutline,
//   IoClose,
//   IoChevronDown,
//   IoCheckmark,
//   IoCallOutline,
//   IoMailOutline,
//   IoGlobeOutline,
//   IoLocationOutline,
//   IoInformationCircleOutline,
//   IoPencilOutline,
//   IoEyeOutline,
//   IoSparkles,
//   IoDiamondOutline,
//   IoShieldCheckmark,
//   IoStar,
//   IoArrowForward,
// } from "react-icons/io5";
// import { GrUserWorker } from "react-icons/gr";
// import {
//   FiCheckCircle,
//   FiTrash2,
//   FiX,
//   FiXCircle,
//   FiTrendingUp,
//   FiShield,
//   FiGlobe,
// } from "react-icons/fi";
// import {
//   FaLinkedin,
//   FaGlobeAmericas,
//   FaRegLightbulb,
//   FaGem,
//   FaChartLine,
// } from "react-icons/fa";
// import { API_URL } from "@/app/config/api";
// import { CreateContext } from "@/app/context/CreateContext";
// import {
//   getCroppedImgWithOptions,
//   getLocalStorage,
//   getSessionStorage,
//   removeSessionStorage,
//   sanitizeName,
//   sanitizeNumber,
//   sanitizeText,
//   sanitizeTextWithComma,
//   sanitizeTextWithCommaHyphen,
//   sanitizeTextWithDot,
//   setLocalStorage,
//   setSessionStorage,
// } from "@/app/utils";
// import { Contact, Template } from "@/app/types";
// import { User } from "@/app/types/user.types";
// import { IoIosArrowDown } from "react-icons/io";
// import { Stepper, TipsModal } from "@/app/components/resume";

// const ContactForm = () => {
//   const router = useRouter();
//   const [showAdditional, setShowAdditional] = useState<boolean>(false);
//   const [contactTipsClicked, setContactTipsClicked] = useState(false);
//   const userDetails = getLocalStorage<User>("user_details");
//   const userId = userDetails?.id;

//   const chosenResumeDetails = getLocalStorage<Template>("chosenTemplate");
//   const {
//     contact,
//     setContact,
//     fullResumeData,
//     setFullResumeData,
//     setResumeId,
//     resumeId,
//   } = useContext(CreateContext);

//   const contactId = contact.contactId || contact._id;

//   const [open, setOpen] = useState(false);
//   const [imageSrc, setImageSrc] = useState<string | null>(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
//   const [showPhotoViewer, setShowPhotoViewer] = useState<boolean>(false);
//   const [isSaving, setIsSaving] = useState<boolean>(false);
//   const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const blobUrlToFile = async (
//     blobUrl: string,
//     fileName: string,
//   ): Promise<File> => {
//     const response = await fetch(blobUrl);
//     const blob = await response.blob();
//     return new File([blob], fileName, { type: blob.type });
//   };

//   const base64ToFile = (base64: string, fileName: string): File => {
//     const arr = base64.split(",");
//     const mime = arr[0].match(/:(.*?);/)![1];
//     const bstr = atob(arr[1]);
//     let n = bstr.length;
//     const u8arr = new Uint8Array(n);
//     while (n--) {
//       u8arr[n] = bstr.charCodeAt(n);
//     }
//     return new File([u8arr], fileName, { type: mime });
//   };

//   const saveToAPI = async (contactData: typeof contact) => {
//     if (!userId) {
//       console.error("User ID is required");
//       return false;
//     }

//     setIsSaving(true);

//     try {
//       const fd = new FormData();

//       fd.append("userId", userId);
//       fd.append("firstName", contactData.firstName || "");
//       fd.append("lastName", contactData.lastName || "");
//       fd.append("email", contactData.email || "");
//       fd.append("jobTitle", contactData.jobTitle || "");
//       fd.append("dob", contactData.dob || "");
//       fd.append("phone", contactData.phone || "");
//       fd.append("country", contactData.country || "");
//       fd.append("city", contactData.city || "");
//       fd.append("address", contactData.address || "");
//       fd.append("postCode", contactData.postCode || "");
//       fd.append("linkedIn", contactData.linkedIn || "");
//       fd.append("github", contactData.github || "");
//       fd.append("portfolio", contactData.portfolio || "");

//       if (chosenResumeDetails?.id) {
//         fd.append("templateId", String(chosenResumeDetails.id));
//       }

//       if (
//         contactData.photo &&
//         (contactData.photo.startsWith("blob:") ||
//           contactData.photo.startsWith("data:image"))
//       ) {
//         let fileImage;

//         if (contactData.photo.startsWith("blob:")) {
//           fileImage = await blobUrlToFile(contactData.photo, "profile.jpg");
//         } else if (contactData.photo.startsWith("data:image")) {
//           fileImage = base64ToFile(contactData.photo, "profile.jpg");
//         }

//         if (fileImage) {
//           fd.append("photo", fileImage);
//         }
//       }

//       const response = await axios.post(
//         `${API_URL}/api/contact-resume/update`,
//         fd,
//         {
//           params: {
//             userId: userId,
//             templateId:
//               chosenResumeDetails?.id || chosenResumeDetails?.templateId,
//             id: contactId || "",
//             resume: resumeId || "abc",
//           },
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         },
//       );

//       setContact((prev) => ({ ...prev, contactId: response.data.resume._id }));
//       fetchContact(response.data.resume._id);
//       return true;
//     } catch (err) {
//       console.error("Error saving contact:", err);
//       return false;
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   console.log("contact", contact);

//   const fetchContact = async (data1: string | number) => {
//     try {
//       const response = await axios.get(
//         `${API_URL}/api/contact-resume/get-contact/${userId}`,
//         {
//           params: {
//             templateId: chosenResumeDetails?.id,
//             resumeId: data1 || "",
//           },
//         },
//       );

//       const data = response.data[0] || response.data;

//       setResumeId(data.resumeId || "");

//       const updatedContact = {
//         ...contact,
//         contactId: data?._id || "",
//         firstName: data?.firstName || "",
//         lastName: data?.lastName || "",
//         jobTitle: data?.jobTitle || "",
//         phone: data?.phone || "",
//         email: data?.email || "",
//         address: data?.address || "",
//         dob: data?.dob || "",
//         city: data?.city || "",
//         country: data?.country || "",
//         postcode: data?.postCode || "",
//         linkedin: data?.linkedIn || "",
//         portfolio: data?.portfolio || "",
//         photo: data?.photo || null,
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
//           skills: {},
//           summary: "",
//           finalize: {},
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleContactChange = (field: keyof typeof contact, value: string) => {
//     setContact((prev) => {
//       const updated = { ...prev, [field]: value };
//       return updated;
//     });
//   };

//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     const file = acceptedFiles[0];
//     if (file) {
//       const url = URL.createObjectURL(file);
//       setImageSrc(url);
//     }
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: { "image/*": [] },
//     multiple: false,
//   });

//   const onCropComplete = useCallback((_: any, croppedPixels: any) => {
//     setCroppedAreaPixels(croppedPixels);
//   }, []);

//   const handleCropSave = useCallback(async () => {
//     try {
//       if (!imageSrc || !croppedAreaPixels) return;

//       const croppedBlob = await getCroppedImgWithOptions(
//         imageSrc,
//         croppedAreaPixels,
//         "blob",
//       );

//       setContact((prev) => {
//         const updated = { ...prev, photo: croppedBlob as string };
//         return updated;
//       });

//       setImageSrc(null);
//       setOpen(false);
//     } catch (e) {
//       console.error(e);
//     }
//   }, [imageSrc, croppedAreaPixels]);

//   const handleDeletePhoto = () => {
//     setContact((prev) => {
//       const updated = { ...prev, photo: null };
//       // saveToAPI(updated);
//       return updated;
//     });
//   };

//   const handleNext = async () => {
//     if (saveTimeoutRef.current) {
//       clearTimeout(saveTimeoutRef.current);
//     }
//     await saveToAPI(contact);
//     router.push("/resume-details/experience");
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-50 via-white to-indigo-50/40">
//       <Stepper />

//       {/* Scrollable Content Area */}
//       <div className="flex-1 overflow-y-auto">
//         <div className=" mx-auto px-2   py-6 sm:py-8 lg:py-10">
//           {/* Header Section - Responsive */}
//           <div className="text-center mb-6 sm:mb-8">
//             <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
//               Contact Information
//             </h1>

//             <p className="text-gray-500 text-sm max-w-md mx-auto">
//               Let recruiters find you easily with accurate contact details
//             </p>

//             <button
//               onClick={() => setContactTipsClicked((prev) => !prev)}
//               className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 bg-linear-to-r from-amber-400 to-orange-400 text-white rounded-full text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200"
//             >
//               <FaRegLightbulb className="w-3 h-3" />
//               <span>View Pro Tips</span>
//             </button>
//           </div>

//           {/* Main Form Card - Responsive */}
//           <div className="bg-white rounded-2xl sm:rounded-3xl shadow-md border border-gray-100 overflow-hidden">
//             {/* Card Header - Responsive */}
//             <div className="relative px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 bg-linear-to-r from-indigo-50 to-white border-b border-gray-100">
//               <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-indigo-100 rounded-full filter blur-3xl opacity-50"></div>
//               <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3">
//                 <div className="flex items-center gap-2 sm:gap-3">
//                   <div className="p-1.5 sm:p-2 bg-indigo-100 rounded-xl">
//                     <IoDiamondOutline className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
//                   </div>
//                   <div>
//                     <h2 className="text-base sm:text-lg font-semibold text-gray-900">
//                       Your Professional Profile
//                     </h2>
//                     <p className="text-xs sm:text-sm text-gray-500">
//                       Fill in your details to create a standout resume
//                     </p>
//                   </div>
//                 </div>
//                 {isSaving && (
//                   <div className="flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-indigo-100 rounded-full self-start sm:self-auto">
//                     <div className="w-2 h-2 sm:w-3 sm:h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
//                     <span className="text-[10px] sm:text-xs text-indigo-700 font-medium">
//                       Saving...
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Form Content - Responsive */}
//             <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
//               {/* Profile Photo Section - Responsive */}
//               {chosenResumeDetails?.pic === "true" && (
//                 <div className="bg-linear-to-r from-indigo-50/50 to-purple-50/50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-indigo-100">
//                   <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
//                     {contact.photo ? (
//                       <div className="relative group self-center sm:self-auto">
//                         <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-purple-500 rounded-xl sm:rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                         <div className="relative">
//                           {contact.photo.startsWith("blob:") ||
//                           contact.photo.startsWith("data:") ? (
//                             <img
//                               src={contact.photo}
//                               alt="Profile"
//                               className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl object-cover border-4 border-white shadow-xl"
//                             />
//                           ) : (
//                             <img
//                               src={`${API_URL}/api/uploads/photos/${contact.photo}`}
//                               alt="Profile"
//                               className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl object-cover border-4 border-white shadow-xl"
//                             />
//                           )}
//                           <button
//                             type="button"
//                             onClick={() => setShowPhotoViewer(true)}
//                             className="absolute inset-0 bg-black/60 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
//                           >
//                             <IoEyeOutline className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                           </button>
//                         </div>
//                       </div>
//                     ) : (
//                       <div
//                         className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-indigo-100 to-purple-100 rounded-xl sm:rounded-2xl flex items-center justify-center cursor-pointer border-2 border-dashed border-indigo-300 hover:border-indigo-500 transition-all self-center sm:self-auto"
//                         onClick={() => setOpen(true)}
//                       >
//                         <IoCloudUploadOutline className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />
//                       </div>
//                     )}

//                     <div className="flex-1 text-center sm:text-left">
//                       <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-1 sm:mb-2">
//                         Professional Photo
//                       </h3>
//                       <p className="text-xs sm:text-sm text-gray-500 mb-3">
//                         Upload a professional headshot to make a great first
//                         impression
//                       </p>
//                       <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
//                         {!contact.photo ? (
//                           <button
//                             type="button"
//                             onClick={() => setOpen(true)}
//                             className="px-3 sm:px-5 py-1.5 sm:py-2 bg-linear-to-r from-indigo-600 to-indigo-500 text-white text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl hover:shadow-lg transition-all"
//                           >
//                             <IoCloudUploadOutline className="inline mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
//                             Upload Photo
//                           </button>
//                         ) : (
//                           <>
//                             <button
//                               type="button"
//                               onClick={() => setOpen(true)}
//                               className="px-3 sm:px-5 py-1.5 sm:py-2 bg-linear-to-r from-indigo-600 to-indigo-500 text-white text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl hover:shadow-lg transition-all"
//                             >
//                               <IoPencilOutline className="inline mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
//                               Change
//                             </button>
//                             <button
//                               type="button"
//                               onClick={handleDeletePhoto}
//                               className="px-3 sm:px-5 py-1.5 sm:py-2 bg-gray-100 text-gray-700 text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl hover:bg-gray-200 transition-all"
//                             >
//                               <FiTrash2 className="inline mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
//                               Remove
//                             </button>
//                           </>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Form Fields - Responsive Grid */}
//               <div className="space-y-5 sm:space-y-6">
//                 {/* Name Fields */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
//                   <div>
//                     <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
//                       First Name
//                     </label>
//                     <input
//                       type="text"
//                       value={contact.firstName || ""}
//                       onChange={(e) =>
//                         handleContactChange(
//                           "firstName",
//                           sanitizeName(e.target.value),
//                         )
//                       }
//                       placeholder="John"
//                       className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm sm:text-base placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
//                       Last Name
//                     </label>
//                     <input
//                       type="text"
//                       value={contact.lastName || ""}
//                       onChange={(e) =>
//                         handleContactChange(
//                           "lastName",
//                           sanitizeName(e.target.value),
//                         )
//                       }
//                       placeholder="Doe"
//                       className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm sm:text-base placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
//                     />
//                   </div>
//                 </div>

//                 {/* Contact Fields */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
//                   <div>
//                     <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
//                       Phone Number
//                     </label>
//                     <input
//                       type="tel"
//                       value={contact.phone || ""}
//                       onChange={(e) =>
//                         handleContactChange(
//                           "phone",
//                           sanitizeNumber(e.target.value),
//                         )
//                       }
//                       placeholder="+1 (555) 000-9999"
//                       className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm sm:text-base placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
//                       Email Address
//                     </label>
//                     <input
//                       type="email"
//                       value={contact.email || ""}
//                       onChange={(e) =>
//                         handleContactChange("email", e.target.value)
//                       }
//                       placeholder="john@example.com"
//                       className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm sm:text-base placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
//                     />
//                   </div>
//                 </div>

//                 {/* Professional Fields */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
//                   <div>
//                     <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
//                       Job Title
//                     </label>
//                     <input
//                       type="text"
//                       value={contact.jobTitle || ""}
//                       onChange={(e) =>
//                         handleContactChange(
//                           "jobTitle",
//                           sanitizeText(e.target.value),
//                         )
//                       }
//                       placeholder="Senior Software Engineer"
//                       className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm sm:text-base placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
//                     />
//                   </div>
//                 </div>

//                 {/* Additional Info Toggle - Responsive */}
//                 <div>
//                   <button
//                     type="button"
//                     onClick={() => setShowAdditional(!showAdditional)}
//                     className="w-full flex items-center justify-between p-3 sm:p-4 bg-linear-to-r from-gray-50 to-indigo-50/30 rounded-lg sm:rounded-xl hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 group cursor-pointer"
//                   >
//                     <div className="flex items-center gap-2 sm:gap-3">
//                       <div
//                         className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-all duration-300 ${
//                           showAdditional
//                             ? "bg-indigo-600 text-white shadow-md"
//                             : "bg-white text-indigo-600 border border-indigo-200"
//                         }`}
//                       >
//                         <IoInformationCircleOutline className="w-4 h-4 sm:w-5 sm:h-5" />
//                       </div>
//                       <div className="text-left">
//                         <span className="text-sm sm:text-base font-semibold text-gray-800">
//                           Additional Information
//                         </span>
//                         <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
//                           Enhance your profile with more details
//                         </p>
//                       </div>
//                     </div>
//                     <motion.div
//                       animate={{ rotate: showAdditional ? 180 : 0 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <IoChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
//                     </motion.div>
//                   </button>

//                   <AnimatePresence>
//                     {showAdditional && (
//                       <motion.div
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: "auto", opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         transition={{ duration: 0.3 }}
//                         className="overflow-hidden"
//                       >
//                         <div className="mt-3 sm:mt-4 p-4 sm:p-5 bg-linear-to-r from-indigo-50/30 to-purple-50/30 rounded-lg sm:rounded-xl border border-indigo-100 space-y-4 sm:space-y-5">
//                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
//                             <div>
//                               <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
//                                 Date of Birth
//                               </label>
//                               <input
//                                 type="date"
//                                 value={contact.dob?.split("T")[0] || ""}
//                                 onChange={(e) =>
//                                   handleContactChange("dob", e.target.value)
//                                 }
//                                 className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm sm:text-base focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
//                               />
//                             </div>

//                             <div>
//                               <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
//                                 LinkedIn Profile
//                               </label>
//                               <input
//                                 type="url"
//                                 value={contact.linkedIn || ""}
//                                 onChange={(e) =>
//                                   handleContactChange(
//                                     "linkedIn",
//                                     e.target.value,
//                                   )
//                                 }
//                                 placeholder="linkedin.com/in/username"
//                                 className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm sm:text-base placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
//                               />
//                             </div>
//                           </div>

//                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
//                             <div>
//                               <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
//                                 Github Profile
//                               </label>
//                               <input
//                                 type="url"
//                                 value={contact.github || ""}
//                                 onChange={(e) =>
//                                   handleContactChange("github", e.target.value)
//                                 }
//                                 placeholder="github.com/username"
//                                 className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm sm:text-base placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
//                               />
//                             </div>
//                             <div>
//                               <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
//                                 Portfolio / Website
//                               </label>
//                               <input
//                                 type="text"
//                                 value={contact.portfolio || ""}
//                                 onChange={(e) =>
//                                   handleContactChange(
//                                     "portfolio",
//                                     e.target.value,
//                                   )
//                                 }
//                                 placeholder="johndoe.com"
//                                 className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm sm:text-base placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
//                               />
//                             </div>
//                           </div>

//                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
//                             <div>
//                               <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
//                                 Street Address
//                               </label>
//                               <input
//                                 type="text"
//                                 value={contact.address || ""}
//                                 onChange={(e) =>
//                                   handleContactChange("address", e.target.value)
//                                 }
//                                 placeholder="123 Main Street"
//                                 className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm sm:text-base placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
//                               />
//                             </div>
//                             <div>
//                               <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
//                                 City
//                               </label>
//                               <input
//                                 type="text"
//                                 value={contact.city || ""}
//                                 onChange={(e) =>
//                                   handleContactChange(
//                                     "city",
//                                     sanitizeTextWithComma(e.target.value),
//                                   )
//                                 }
//                                 placeholder="New York"
//                                 className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm sm:text-base placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
//                               />
//                             </div>
//                             <div>
//                               <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
//                                 Postal Code
//                               </label>
//                               <input
//                                 type="text"
//                                 value={contact.postCode || ""}
//                                 onChange={(e) =>
//                                   handleContactChange(
//                                     "postCode",
//                                     e.target.value,
//                                   )
//                                 }
//                                 placeholder="10001"
//                                 className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm sm:text-base placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
//                               />
//                             </div>
//                             <div>
//                               <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
//                                 Country
//                               </label>
//                               <input
//                                 type="text"
//                                 value={contact.country || ""}
//                                 onChange={(e) =>
//                                   handleContactChange(
//                                     "country",
//                                     sanitizeTextWithComma(e.target.value),
//                                   )
//                                 }
//                                 placeholder="United States"
//                                 className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm sm:text-base placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Sticky Footer Buttons - Single Line Layout */}
//       <div className="sticky bottom-0 z-20 bg-white/75 backdrop-blur-md border-t border-gray-100 shadow-lg shadow-gray-200/50">
//         <div className="mx-auto px-2 sm:px-6 lg:px-8 py-3 sm:py-4">
//           <div className="flex justify-between items-center gap-3 sm:gap-4">
//             {/* Back Button - Icon only on mobile, full text on desktop */}
//             <button
//               className="group px-4 sm:px-5 py-2.5 sm:py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-all duration-300 flex items-center justify-center gap-2 rounded-xl hover:bg-indigo-50/50 cursor-pointer"
//               onClick={() => router.push("/choose-template")}
//             >
//               <svg
//                 className="w-4 h-4 transition-transform group-hover:-translate-x-1"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M10 19l-7-7m0 0l7-7m-7 7h18"
//                 />
//               </svg>
//               {/* Hide text on mobile, show on sm and up */}
//               <span className="hidden sm:inline">Back to Templates</span>
//               {/* Optional: Show just "Back" on medium screens */}
//               <span className="inline sm:hidden">Back</span>
//             </button>

//             {/* Continue Button - Premium Design */}
//             <button
//               className="group relative px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-medium md:font-semibold text-white rounded-lg md:rounded-xl shadow-lg transition-all duration-300 overflow-hidden whitespace-nowrap cursor-pointer"
//               onClick={handleNext}
//             >
//               {/* Gradient Background with Animation */}
//               <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 transition-all duration-300 group-hover:scale-105 group-hover:from-indigo-500 group-hover:via-indigo-400 group-hover:to-indigo-500"></div>

//               {/* Shine Effect */}
//               <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
//                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
//               </div>

//               {/* Button Content */}
//               <div className="relative flex items-center justify-center gap-2">
//                 {/* Different text for mobile vs desktop */}
//                 <span>Continue to Experience</span>
//                 <svg
//                   className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M13 7l5 5m0 0l-5 5m5-5H6"
//                   />
//                 </svg>
//               </div>

//               {/* Shadow Enhancement */}
//               <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_20px_rgba(79,70,229,0.5)]"></div>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Modals - Keep responsive */}
//       {showPhotoViewer && contact.croppedImage && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="relative max-w-3xl w-full mx-4"
//           >
//             <button
//               type="button"
//               onClick={() => setShowPhotoViewer(false)}
//               className="absolute -top-10 sm:-top-12 right-0 bg-black/50 rounded-full p-1.5 sm:p-2 hover:bg-black/70 transition-all"
//             >
//               <IoClose className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//             </button>
//             {contact.croppedImage.startsWith("blob:") ||
//             contact.croppedImage.startsWith("data:") ? (
//               <img
//                 src={contact.croppedImage}
//                 alt="Profile"
//                 className="rounded-xl sm:rounded-2xl shadow-2xl max-h-[60vh] sm:max-h-[70vh] object-contain w-full"
//               />
//             ) : (
//               <img
//                 src={`${API_URL}/api/uploads/photos/${contact.croppedImage}`}
//                 alt="Profile"
//                 className="rounded-xl sm:rounded-2xl shadow-2xl max-h-[60vh] sm:max-h-[70vh] object-contain w-full"
//               />
//             )}
//           </motion.div>
//         </div>
//       )}

//       {open && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden"
//           >
//             <div className="bg-linear-to-r from-indigo-600 to-indigo-500 px-4 sm:px-5 py-3 sm:py-4">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-base sm:text-lg font-semibold text-white">
//                   Upload Profile Photo
//                 </h2>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setImageSrc(null);
//                     setOpen(false);
//                   }}
//                   className="p-1 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
//                 >
//                   <IoClose className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                 </button>
//               </div>
//             </div>

//             <div className="p-4 sm:p-5">
//               {!imageSrc ? (
//                 <div
//                   {...getRootProps()}
//                   className="border-2 border-dashed border-gray-300 rounded-lg sm:rounded-xl p-6 sm:p-8 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all"
//                 >
//                   <input {...getInputProps()} />
//                   <div className="flex flex-col items-center justify-center gap-2 sm:gap-3">
//                     <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-indigo-100 flex items-center justify-center">
//                       <IoCloudUploadOutline className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
//                     </div>
//                     <div>
//                       <p className="text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                         Drag & drop your photo here
//                       </p>
//                       <p className="text-[10px] sm:text-xs text-gray-500">
//                         or click to browse (JPG, PNG, WEBP up to 5MB)
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="space-y-3 sm:space-y-4">
//                   <div className="relative h-48 sm:h-64 w-full bg-gray-100 rounded-lg sm:rounded-xl overflow-hidden">
//                     <Cropper
//                       image={imageSrc}
//                       crop={crop}
//                       zoom={zoom}
//                       aspect={1}
//                       onCropChange={setCrop}
//                       onZoomChange={setZoom}
//                       onCropComplete={onCropComplete}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-[10px] sm:text-xs font-medium text-gray-700 mb-1">
//                       Zoom
//                     </label>
//                     <input
//                       type="range"
//                       min={1}
//                       max={3}
//                       step={0.1}
//                       value={zoom}
//                       onChange={(e) => setZoom(parseFloat(e.target.value))}
//                       className="w-full accent-indigo-600"
//                     />
//                   </div>
//                   <div className="flex gap-2">
//                     <button
//                       type="button"
//                       onClick={() => {
//                         setImageSrc(null);
//                         setCrop({ x: 0, y: 0 });
//                         setZoom(1);
//                       }}
//                       className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-100 text-gray-700 text-xs sm:text-sm font-medium rounded-lg hover:bg-gray-200 transition"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="button"
//                       onClick={handleCropSave}
//                       className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-linear-to-r from-indigo-600 to-indigo-500 text-white text-xs sm:text-sm font-medium rounded-lg hover:shadow-lg transition"
//                     >
//                       Save Photo
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         </div>
//       )}

//       <TipsModal
//         isOpen={contactTipsClicked}
//         onClose={() => setContactTipsClicked(false)}
//         title="Contact Tips"
//         subtitle="Make it easy for recruiters to reach you"
//         hasAI={false}
//         proTip="Complete contact info = 40% more responses from recruiters"
//         bestPractices={[
//           {
//             tip: "Use your legal full name",
//             example: "No nicknames or abbreviations",
//           },
//           { tip: "Use a professional email", example: "name@domain.com" },
//           {
//             tip: "Include country code in phone",
//             example: "+1 (555) 123-4567",
//           },
//           {
//             tip: "Add your target job title",
//             example: "Senior Software Engineer",
//           },
//           {
//             tip: "Include LinkedIn profile URL",
//             example: "linkedin.com/in/username",
//           },
//           { tip: "Include city & country", example: "Shows work eligibility" },
//         ]}
//         avoidList={[
//           "Unprofessional email addresses",
//           "Missing country code in phone",
//           "Outdated contact information",
//           "Missing LinkedIn profile",
//         ]}
//         customContent={
//           <div className="bg-indigo-50 rounded-lg p-3">
//             <p className="text-xs sm:text-sm font-semibold text-indigo-700 mb-2">
//               Quick Checklist
//             </p>
//             <div className="grid sm:grid-cols-2 gap-1">
//               <div className="flex items-center gap-1">
//                 <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
//                 <span className="text-xs sm:text-sm text-gray-600">
//                   Legal name
//                 </span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
//                 <span className="text-xs sm:text-sm text-gray-600">
//                   LinkedIn URL
//                 </span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
//                 <span className="text-xs sm:text-sm text-gray-600">
//                   Phone with code
//                 </span>
//               </div>

//               <div className="flex items-center gap-1">
//                 <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
//                 <span className="text-xs sm:text-sm text-gray-600">
//                   Professional email
//                 </span>
//               </div>
//             </div>
//           </div>
//         }
//       />
//     </div>
//   );
// };

// export default ContactForm;






























"use client";

import React, {
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import Cropper from "react-easy-crop";
import { useDropzone } from "react-dropzone";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  IoPersonOutline,
  IoCloudUploadOutline,
  IoClose,
  IoChevronDown,
  IoCheckmark,
  IoCallOutline,
  IoMailOutline,
  IoGlobeOutline,
  IoLocationOutline,
  IoInformationCircleOutline,
  IoPencilOutline,
  IoEyeOutline,
  IoSparkles,
  IoDiamondOutline,
  IoShieldCheckmark,
  IoStar,
  IoArrowForward,
} from "react-icons/io5";
import { GrUserWorker } from "react-icons/gr";
import {
  FiCheckCircle,
  FiTrash2,
  FiX,
  FiXCircle,
  FiTrendingUp,
  FiShield,
  FiGlobe,
} from "react-icons/fi";
import {
  FaLinkedin,
  FaGlobeAmericas,
  FaRegLightbulb,
  FaGem,
  FaChartLine,
} from "react-icons/fa";
import { API_URL } from "@/app/config/api";
import { CreateContext } from "@/app/context/CreateContext";
import {
  getCroppedImgWithOptions,
  getLocalStorage,
  getSessionStorage,
  removeSessionStorage,
  sanitizeName,
  sanitizeNumber,
  sanitizeText,
  sanitizeTextWithComma,
  sanitizeTextWithCommaHyphen,
  sanitizeTextWithDot,
  setLocalStorage,
  setSessionStorage,
} from "@/app/utils";
import { Contact, Template } from "@/app/types";
import { User } from "@/app/types/user.types";
import { IoIosArrowDown } from "react-icons/io";
import { Stepper, TipsModal } from "@/app/components/resume";
import api from "@/app/utils/api";

const ContactForm = () => {
  const router = useRouter();
  const [showAdditional, setShowAdditional] = useState<boolean>(false);
  const [contactTipsClicked, setContactTipsClicked] = useState(false);
  const userDetails = getLocalStorage<User>("user_details");
  const userId = userDetails?.id;

  const chosenResumeDetails = getLocalStorage<Template>("chosenTemplate");
  const {
    contact,
    setContact,
    fullResumeData,
    setFullResumeData,
    setResumeId,
    resumeId,
  } = useContext(CreateContext);

  const contactId = contact.contactId || contact._id;

  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [showPhotoViewer, setShowPhotoViewer] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const blobUrlToFile = async (
    blobUrl: string,
    fileName: string,
  ): Promise<File> => {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  };

  const base64ToFile = (base64: string, fileName: string): File => {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };

  // const saveToAPI = async (contactData: typeof contact) => {
  //   if (!userId) {
  //     console.error("User ID is required");
  //     return false;
  //   }

  //   setIsSaving(true);

  //   try {
  //     const fd = new FormData();

  //     fd.append("userId", userId);
  //     fd.append("firstName", contactData.firstName || "");
  //     fd.append("lastName", contactData.lastName || "");
  //     fd.append("email", contactData.email || "");
  //     fd.append("jobTitle", contactData.jobTitle || "");
  //     fd.append("dob", contactData.dob || "");
  //     fd.append("phone", contactData.phone || "");
  //     fd.append("country", contactData.country || "");
  //     fd.append("city", contactData.city || "");
  //     fd.append("address", contactData.address || "");
  //     fd.append("postCode", contactData.postCode || "");
  //     fd.append("linkedIn", contactData.linkedIn || "");
  //     fd.append("github", contactData.github || "");
  //     fd.append("portfolio", contactData.portfolio || "");

  //     if (chosenResumeDetails?.id) {
  //       fd.append("templateId", String(chosenResumeDetails.id));
  //     }

  //     if (
  //       contactData.photo &&
  //       (contactData.photo.startsWith("blob:") ||
  //         contactData.photo.startsWith("data:image"))
  //     ) {
  //       let fileImage;

  //       if (contactData.photo.startsWith("blob:")) {
  //         fileImage = await blobUrlToFile(contactData.photo, "profile.jpg");
  //       } else if (contactData.photo.startsWith("data:image")) {
  //         fileImage = base64ToFile(contactData.photo, "profile.jpg");
  //       }

  //       if (fileImage) {
  //         fd.append("photo", fileImage);
  //       }
  //     }

  //             const contactResponse = api.post(`${API_URL}/user-resumes/1`,fd);

  //             console.log("contactResponse", contactResponse);



  //             // const response = await axios.post(
  //       // `${API_URL}/api/contact-resume/update`,
  //       // fd,
  //       // {
  //       //   params: {
  //       //     userId: userId,
  //       //     templateId:
  //       //       chosenResumeDetails?.id || chosenResumeDetails?.templateId,
  //       //     id: contactId || "",
  //       //     resume: resumeId || "abc",
  //       //   },
  //       //   headers: {
  //       //     "Content-Type": "multipart/form-data",
  //       //   },
  //       // },
  //     // );


  //     // const response = await axios.post(
  //     //   `${API_URL}/api/contact-resume/update`,
  //     //   fd,
  //     //   {
  //     //     params: {
  //     //       userId: userId,
  //     //       templateId:
  //     //         chosenResumeDetails?.id || chosenResumeDetails?.templateId,
  //     //       id: contactId || "",
  //     //       resume: resumeId || "abc",
  //     //     },
  //     //     headers: {
  //     //       "Content-Type": "multipart/form-data",
  //     //     },
  //     //   },
  //     // );

  //     // setContact((prev) => ({ ...prev, contactId: response.data.resume._id }));
  //     // fetchContact(response.data.resume._id);
  //     return true;
  //   } catch (err) {
  //     console.error("Error saving contact:", err);
  //     return false;
  //   } finally {
  //     setIsSaving(false);
  //   }
  // };



//   const saveToAPI = async (contactData: typeof contact) => {
//   if (!userId) {
//     console.error("User ID is required");
//     return false;
//   }

//   setIsSaving(true);

//   try {
//     const fd = new FormData();

//     // 1. Construct your exact desired nested structure
//     const resumePayload = {
//       template: chosenResumeDetails?.id ? Number(chosenResumeDetails.id) : 1,
//       resume_title: `${contactData.jobTitle || "Position"} Resume`, // Or wherever you store the title
//       resume_data: {
//         "Personal Info": {
//           full_name: `${contactData.firstName || ""} ${contactData.lastName || ""}`.trim(),
//           job_title: contactData.jobTitle || "",
//           location_city: contactData.city || "",
//           // Add other fields here if needed
//         }
//       }
//     };

//     // 2. Append the nested object as a serialized JSON string
//     fd.append("resume_payload", JSON.stringify(resumePayload));

//     // 3. Handle and append the file separately
//     if (
//       contactData.photo &&
//       (contactData.photo.startsWith("blob:") || contactData.photo.startsWith("data:image"))
//     ) {
//       let fileImage;
//       if (contactData.photo.startsWith("blob:")) {
//         fileImage = await blobUrlToFile(contactData.photo, "profile.jpg");
//       } else if (contactData.photo.startsWith("data:image")) {
//         fileImage = base64ToFile(contactData.photo, "profile.jpg");
//       }

//       if (fileImage) {
//         fd.append("photo", fileImage); 
//       }
//     }

//     // 4. Send the request (Don't forget to 'await' your API+ call!)
//     const response = await api.post(`${API_URL}/user-resumes`, fd, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     console.log("contactResponse", response.data);
//     return true;
//   } catch (err) {
//     console.error("Error saving contact:", err);
//     return false;
//   } finally {
//     setIsSaving(false);
//   }
// };




const saveToAPI = async (contactData: typeof contact) => {
  if (!userId) {
    console.error("User ID is required");
    return false;
  }

  setIsSaving(true);

  try {
    // 1. Process the photo into a Base64 string if it's currently a blob URL
    let finalPhotoBase64 = "";

    if (contactData.photo) {
      if (contactData.photo.startsWith("data:image")) {
        // It's already base64 encoded
        finalPhotoBase64 = contactData.photo;
      } else if (contactData.photo.startsWith("blob:")) {
        // Convert blob URL to a Base64 data URI string
        const responseBlob = await fetch(contactData.photo);
        const blobData = await responseBlob.blob();
        
        finalPhotoBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blobData);
        });
      } else {
        // In case it's a regular hosting URL already stored
        finalPhotoBase64 = contactData.photo;
      }
    }

    // 2. Build your exact single JSON payload schema
    const singlePayload = {
      template: chosenResumeDetails?.id ? Number(chosenResumeDetails.id) : 1,
      resume_title: contactData.jobTitle 
        ? `${contactData.jobTitle} Position Resume` 
        : "Senior Engineer Position Resume",
      resume_data: {
        "contact": {
          firstName: contactData.firstName || "",
          lastName: contactData.lastName || "",
          job_title: contactData.jobTitle || "",
          location_city: contactData.city || "",
          email: contactData.email || "",
          phone: contactData.phone || "",
          dob: contactData.dob || "",
          country: contactData.country || "",
          address: contactData.address || "",
          postCode: contactData.postCode || "",
          linkedIn: contactData.linkedIn || "",
          github: contactData.github || "",
          portfolio: contactData.portfolio || "",
          photo: finalPhotoBase64 // Nesting the image right inside the JSON structure!
        }
      }
    };

    // 3. Send it as standard 'application/json'
    const response = await api.post(`${API_URL}/user-resumes`, singlePayload);


    setLocalStorage("latest_resume_id", response.data.id);
    return true;

  } catch (err) {
    console.error("Error saving contact unified payload:", err);
    return false;
  } finally {
    setIsSaving(false);
  }
};





  const fetchContact = async (data1: string | number) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/contact-resume/get-contact/${userId}`,
        {
          params: {
            templateId: chosenResumeDetails?.id,
            resumeId: data1 || "",
          },
        },
      );

      const data = response.data[0] || response.data;

      setResumeId(data.resumeId || "");

      const updatedContact = {
        ...contact,
        contactId: data?._id || "",
        firstName: data?.firstName || "",
        lastName: data?.lastName || "",
        jobTitle: data?.jobTitle || "",
        phone: data?.phone || "",
        email: data?.email || "",
        address: data?.address || "",
        dob: data?.dob || "",
        city: data?.city || "",
        country: data?.country || "",
        postcode: data?.postCode || "",
        linkedin: data?.linkedIn || "",
        portfolio: data?.portfolio || "",
        photo: data?.photo || null,
      };

      setContact(updatedContact);

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
          skills: {},
          summary: "",
          finalize: {},
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleContactChange = (field: keyof typeof contact, value: string) => {
    setContact((prev) => {
      const updated = { ...prev, [field]: value };
      return updated;
    });
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageSrc(url);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const onCropComplete = useCallback((_: any, croppedPixels: any) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleCropSave = useCallback(async () => {
    try {
      if (!imageSrc || !croppedAreaPixels) return;

      const croppedBlob = await getCroppedImgWithOptions(
        imageSrc,
        croppedAreaPixels,
        "blob",
      );

      setContact((prev) => {
        const updated = { ...prev, photo: croppedBlob as string };
        return updated;
      });

      setImageSrc(null);
      setOpen(false);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels]);

  const handleDeletePhoto = () => {
    setContact((prev) => {
      const updated = { ...prev, photo: null };
      // saveToAPI(updated);
      return updated;
    });
  };

  const handleNext = async () => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    await saveToAPI(contact);
    router.push("/resume-details/experience");
  };

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-50 via-white to-indigo-50/40">
      <Stepper />

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className=" mx-auto px-2   py-6 sm:py-8 lg:py-10">
          {/* Header Section - Responsive */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Contact Information
            </h1>

            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Let recruiters find you easily with accurate contact details
            </p>

            <button
              onClick={() => setContactTipsClicked((prev) => !prev)}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 bg-linear-to-r from-amber-400 to-orange-400 text-white rounded-full text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              <FaRegLightbulb className="w-3 h-3" />
              <span>View Pro Tips</span>
            </button>
          </div>

          {/* Main Form Card - Responsive */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-md border border-gray-100 overflow-hidden">
            {/* Card Header - Responsive */}
            <div className="relative px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 bg-linear-to-r from-indigo-50 to-white border-b border-gray-100">
              <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-indigo-100 rounded-full filter blur-3xl opacity-50"></div>
              <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-indigo-100 rounded-xl">
                    <IoDiamondOutline className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                      Your Professional Profile
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Fill in your details to create a standout resume
                    </p>
                  </div>
                </div>
                {isSaving && (
                  <div className="flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-indigo-100 rounded-full self-start sm:self-auto">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    <span className="text-[10px] sm:text-xs text-indigo-700 font-medium">
                      Saving...
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Form Content - Responsive */}
            <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
              {/* Profile Photo Section - Responsive */}
              {chosenResumeDetails?.pic === "true" && (
                <div className="bg-linear-to-r from-indigo-50/50 to-purple-50/50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-indigo-100">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                    {contact.photo ? (
                      <div className="relative group self-center sm:self-auto">
                        <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-purple-500 rounded-xl sm:rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative">
                          {contact.photo.startsWith("blob:") ||
                          contact.photo.startsWith("data:") ? (
                            <img
                              src={contact.photo}
                              alt="Profile"
                              className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl object-cover border-4 border-white shadow-xl"
                            />
                          ) : (
                            <img
                              src={`${API_URL}/api/uploads/photos/${contact.photo}`}
                              alt="Profile"
                              className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl object-cover border-4 border-white shadow-xl"
                            />
                          )}
                          <button
                            type="button"
                            onClick={() => setShowPhotoViewer(true)}
                            className="absolute inset-0 bg-black/60 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                          >
                            <IoEyeOutline className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-indigo-100 to-purple-100 rounded-xl sm:rounded-2xl flex items-center justify-center cursor-pointer border-2 border-dashed border-indigo-300 hover:border-indigo-500 transition-all self-center sm:self-auto"
                        onClick={() => setOpen(true)}
                      >
                        <IoCloudUploadOutline className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />
                      </div>
                    )}

                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-1 sm:mb-2">
                        Professional Photo
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 mb-3">
                        Upload a professional headshot to make a great first
                        impression
                      </p>
                      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
                        {!contact.photo ? (
                          <button
                            type="button"
                            onClick={() => setOpen(true)}
                            className="px-3 sm:px-5 py-1.5 sm:py-2 bg-linear-to-r from-indigo-600 to-indigo-500 text-white text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl hover:shadow-lg transition-all"
                          >
                            <IoCloudUploadOutline className="inline mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
                            Upload Photo
                          </button>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => setOpen(true)}
                              className="px-3 sm:px-5 py-1.5 sm:py-2 bg-linear-to-r from-indigo-600 to-indigo-500 text-white text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl hover:shadow-lg transition-all"
                            >
                              <IoPencilOutline className="inline mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
                              Change
                            </button>
                            <button
                              type="button"
                              onClick={handleDeletePhoto}
                              className="px-3 sm:px-5 py-1.5 sm:py-2 bg-gray-100 text-gray-700 text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl hover:bg-gray-200 transition-all"
                            >
                              <FiTrash2 className="inline mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
                              Remove
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Fields - Responsive Grid */}
              <div className="space-y-5 sm:space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={contact.firstName || ""}
                      onChange={(e) =>
                        handleContactChange(
                          "firstName",
                          sanitizeName(e.target.value),
                        )
                      }
                      placeholder="John"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm sm:text-base placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={contact.lastName || ""}
                      onChange={(e) =>
                        handleContactChange(
                          "lastName",
                          sanitizeName(e.target.value),
                        )
                      }
                      placeholder="Doe"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm sm:text-base placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                    />
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={contact.phone || ""}
                      onChange={(e) =>
                        handleContactChange(
                          "phone",
                          sanitizeNumber(e.target.value),
                        )
                      }
                      placeholder="+1 (555) 000-9999"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm sm:text-base placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={contact.email || ""}
                      onChange={(e) =>
                        handleContactChange("email", e.target.value)
                      }
                      placeholder="john@example.com"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm sm:text-base placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                    />
                  </div>
                </div>

                {/* Professional Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={contact.jobTitle || ""}
                      onChange={(e) =>
                        handleContactChange(
                          "jobTitle",
                          sanitizeText(e.target.value),
                        )
                      }
                      placeholder="Senior Software Engineer"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm sm:text-base placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                    />
                  </div>
                </div>

                {/* Additional Info Toggle - Responsive */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowAdditional(!showAdditional)}
                    className="w-full flex items-center justify-between p-3 sm:p-4 bg-linear-to-r from-gray-50 to-indigo-50/30 rounded-lg sm:rounded-xl hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div
                        className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-all duration-300 ${
                          showAdditional
                            ? "bg-indigo-600 text-white shadow-md"
                            : "bg-white text-indigo-600 border border-indigo-200"
                        }`}
                      >
                        <IoInformationCircleOutline className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="text-left">
                        <span className="text-sm sm:text-base font-semibold text-gray-800">
                          Additional Information
                        </span>
                        <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                          Enhance your profile with more details
                        </p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: showAdditional ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <IoChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {showAdditional && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 sm:mt-4 p-4 sm:p-5 bg-linear-to-r from-indigo-50/30 to-purple-50/30 rounded-lg sm:rounded-xl border border-indigo-100 space-y-4 sm:space-y-5">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                            <div>
                              <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                                Date of Birth
                              </label>
                              <input
                                type="date"
                                value={contact.dob?.split("T")[0] || ""}
                                onChange={(e) =>
                                  handleContactChange("dob", e.target.value)
                                }
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm sm:text-base focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                                LinkedIn Profile
                              </label>
                              <input
                                type="url"
                                value={contact.linkedIn || ""}
                                onChange={(e) =>
                                  handleContactChange(
                                    "linkedIn",
                                    e.target.value,
                                  )
                                }
                                placeholder="linkedin.com/in/username"
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm sm:text-base placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                            <div>
                              <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                                Github Profile
                              </label>
                              <input
                                type="url"
                                value={contact.github || ""}
                                onChange={(e) =>
                                  handleContactChange("github", e.target.value)
                                }
                                placeholder="github.com/username"
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm sm:text-base placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                                Portfolio / Website
                              </label>
                              <input
                                type="text"
                                value={contact.portfolio || ""}
                                onChange={(e) =>
                                  handleContactChange(
                                    "portfolio",
                                    e.target.value,
                                  )
                                }
                                placeholder="johndoe.com"
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm sm:text-base placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                            <div>
                              <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                                Street Address
                              </label>
                              <input
                                type="text"
                                value={contact.address || ""}
                                onChange={(e) =>
                                  handleContactChange("address", e.target.value)
                                }
                                placeholder="123 Main Street"
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm sm:text-base placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                                City
                              </label>
                              <input
                                type="text"
                                value={contact.city || ""}
                                onChange={(e) =>
                                  handleContactChange(
                                    "city",
                                    sanitizeTextWithComma(e.target.value),
                                  )
                                }
                                placeholder="New York"
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm sm:text-base placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                                Postal Code
                              </label>
                              <input
                                type="text"
                                value={contact.postCode || ""}
                                onChange={(e) =>
                                  handleContactChange(
                                    "postCode",
                                    e.target.value,
                                  )
                                }
                                placeholder="10001"
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm sm:text-base placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                                Country
                              </label>
                              <input
                                type="text"
                                value={contact.country || ""}
                                onChange={(e) =>
                                  handleContactChange(
                                    "country",
                                    sanitizeTextWithComma(e.target.value),
                                  )
                                }
                                placeholder="United States"
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm sm:text-base placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer Buttons - Single Line Layout */}
      <div className="sticky bottom-0 z-20 bg-white/75 backdrop-blur-md border-t border-gray-100 shadow-lg shadow-gray-200/50">
        <div className="mx-auto px-2 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center gap-3 sm:gap-4">
            {/* Back Button - Icon only on mobile, full text on desktop */}
            <button
              className="group px-4 sm:px-5 py-2.5 sm:py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-all duration-300 flex items-center justify-center gap-2 rounded-xl hover:bg-indigo-50/50 cursor-pointer"
              onClick={() => router.push("/choose-template")}
            >
              <svg
                className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              {/* Hide text on mobile, show on sm and up */}
              <span className="hidden sm:inline">Back to Templates</span>
              {/* Optional: Show just "Back" on medium screens */}
              <span className="inline sm:hidden">Back</span>
            </button>

            {/* Continue Button - Premium Design */}
            <button
              className="group relative px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-medium md:font-semibold text-white rounded-lg md:rounded-xl shadow-lg transition-all duration-300 overflow-hidden whitespace-nowrap cursor-pointer"
              onClick={handleNext}
            >
              {/* Gradient Background with Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 transition-all duration-300 group-hover:scale-105 group-hover:from-indigo-500 group-hover:via-indigo-400 group-hover:to-indigo-500"></div>

              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
              </div>

              {/* Button Content */}
              <div className="relative flex items-center justify-center gap-2">
                {/* Different text for mobile vs desktop */}
                <span>Continue to Experience</span>
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>

              {/* Shadow Enhancement */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_20px_rgba(79,70,229,0.5)]"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Modals - Keep responsive */}
      {showPhotoViewer && contact.croppedImage && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative max-w-3xl w-full mx-4"
          >
            <button
              type="button"
              onClick={() => setShowPhotoViewer(false)}
              className="absolute -top-10 sm:-top-12 right-0 bg-black/50 rounded-full p-1.5 sm:p-2 hover:bg-black/70 transition-all"
            >
              <IoClose className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>
            {contact.croppedImage.startsWith("blob:") ||
            contact.croppedImage.startsWith("data:") ? (
              <img
                src={contact.croppedImage}
                alt="Profile"
                className="rounded-xl sm:rounded-2xl shadow-2xl max-h-[60vh] sm:max-h-[70vh] object-contain w-full"
              />
            ) : (
              <img
                src={`${API_URL}/api/uploads/photos/${contact.croppedImage}`}
                alt="Profile"
                className="rounded-xl sm:rounded-2xl shadow-2xl max-h-[60vh] sm:max-h-[70vh] object-contain w-full"
              />
            )}
          </motion.div>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden"
          >
            <div className="bg-linear-to-r from-indigo-600 to-indigo-500 px-4 sm:px-5 py-3 sm:py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-semibold text-white">
                  Upload Profile Photo
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    setImageSrc(null);
                    setOpen(false);
                  }}
                  className="p-1 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <IoClose className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-5">
              {!imageSrc ? (
                <div
                  {...getRootProps()}
                  className="border-2 border-dashed border-gray-300 rounded-lg sm:rounded-xl p-6 sm:p-8 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all"
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center justify-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                      <IoCloudUploadOutline className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Drag & drop your photo here
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-500">
                        or click to browse (JPG, PNG, WEBP up to 5MB)
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  <div className="relative h-48 sm:h-64 w-full bg-gray-100 rounded-lg sm:rounded-xl overflow-hidden">
                    <Cropper
                      image={imageSrc}
                      crop={crop}
                      zoom={zoom}
                      aspect={1}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] sm:text-xs font-medium text-gray-700 mb-1">
                      Zoom
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={3}
                      step={0.1}
                      value={zoom}
                      onChange={(e) => setZoom(parseFloat(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setImageSrc(null);
                        setCrop({ x: 0, y: 0 });
                        setZoom(1);
                      }}
                      className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-100 text-gray-700 text-xs sm:text-sm font-medium rounded-lg hover:bg-gray-200 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleCropSave}
                      className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-linear-to-r from-indigo-600 to-indigo-500 text-white text-xs sm:text-sm font-medium rounded-lg hover:shadow-lg transition"
                    >
                      Save Photo
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      <TipsModal
        isOpen={contactTipsClicked}
        onClose={() => setContactTipsClicked(false)}
        title="Contact Tips"
        subtitle="Make it easy for recruiters to reach you"
        hasAI={false}
        proTip="Complete contact info = 40% more responses from recruiters"
        bestPractices={[
          {
            tip: "Use your legal full name",
            example: "No nicknames or abbreviations",
          },
          { tip: "Use a professional email", example: "name@domain.com" },
          {
            tip: "Include country code in phone",
            example: "+1 (555) 123-4567",
          },
          {
            tip: "Add your target job title",
            example: "Senior Software Engineer",
          },
          {
            tip: "Include LinkedIn profile URL",
            example: "linkedin.com/in/username",
          },
          { tip: "Include city & country", example: "Shows work eligibility" },
        ]}
        avoidList={[
          "Unprofessional email addresses",
          "Missing country code in phone",
          "Outdated contact information",
          "Missing LinkedIn profile",
        ]}
        customContent={
          <div className="bg-indigo-50 rounded-lg p-3">
            <p className="text-xs sm:text-sm font-semibold text-indigo-700 mb-2">
              Quick Checklist
            </p>
            <div className="grid sm:grid-cols-2 gap-1">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                <span className="text-xs sm:text-sm text-gray-600">
                  Legal name
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                <span className="text-xs sm:text-sm text-gray-600">
                  LinkedIn URL
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                <span className="text-xs sm:text-sm text-gray-600">
                  Phone with code
                </span>
              </div>

              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                <span className="text-xs sm:text-sm text-gray-600">
                  Professional email
                </span>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default ContactForm;
