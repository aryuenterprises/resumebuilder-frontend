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
// } from "react-icons/io5";
// import { GrUserWorker } from "react-icons/gr";
// import { FiCheckCircle, FiTrash2, FiX, FiXCircle } from "react-icons/fi";
// import { FaLinkedin, FaGlobeAmericas, FaRegLightbulb } from "react-icons/fa";
// import { API_URL } from "@/app/config/api";
// import { CreateContext } from "@/app/context/CreateContext";
// import Stepper from "../../../components/resume/Steppers";
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

// const ContactForm = () => {
//   const router = useRouter();

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

//   // Track initial load
//   const initialLoadDone = useRef(false);

//   useEffect(() => {
//     // Don't save until initial data is loaded
//     if (!initialLoadDone.current) return;

//     // Check if we have existing data in localStorage or context
//     const existingData = fullResumeData || getLocalStorage("fullResumeData");

//     if (existingData) {
//       // Update existing data
//       setLocalStorage("fullResumeData", {
//         ...existingData,
//         contact: contact,
//       });
//     } else {
//       // Create new data structure if nothing exists
//       setLocalStorage("fullResumeData", {
//         template: chosenResumeDetails || null,
//         contact: contact,
//         experiences: [],
//         education: [],
//         skills: [],
//         summary: "",
//         finalize: {},
//       });
//     }
//   }, [contact, fullResumeData, chosenResumeDetails]);

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
//     console.log(contact);
//     console.log(contactId);
//     if (!userId) {
//       console.error("User ID is required");
//       return false;
//     }

//     setIsSaving(true);

//     try {
//       const fd = new FormData();

//       console.log("fd",fd)

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
//       fd.append("postCode", contactData.postcode || "");
//       fd.append("linkedIn", contactData.linkedin || "");
//       fd.append("portfolio", contactData.portfolio || "");

//       if (chosenResumeDetails?.id) {
//         fd.append("templateId", String(chosenResumeDetails.id));
//       }

//       if (
//         contactData.croppedImage &&
//         (contactData.croppedImage.startsWith("blob:") ||
//           contactData.croppedImage.startsWith("data:image"))
//       ) {
//         let fileImage;

//         if (contactData.croppedImage.startsWith("blob:")) {
//           fileImage = await blobUrlToFile(
//             contactData.croppedImage,
//             "profile.jpg",
//           );
//         } else if (contactData.croppedImage.startsWith("data:image")) {
//           fileImage = base64ToFile(contactData.croppedImage, "profile.jpg");
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
//             templateId: chosenResumeDetails?.id || chosenResumeDetails?.templateId,
//             id: contactId || "",
//             resume: resumeId || "abc",
//           },
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         },
//       );

//       console.log(response.data);
//       console.log(response.data.resume._id);
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
//       initialLoadDone.current = true;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const debouncedSave = useCallback((contactData: typeof contact) => {

//     console.log("contactData",contactData)

//     if (saveTimeoutRef.current) {
//       clearTimeout(saveTimeoutRef.current);
//     }
//     saveTimeoutRef.current = setTimeout(() => {
//       // saveToAPI(contactData);
//     }, 1000);
//   }, []);

//   const handleContactChange = (field: keyof typeof contact, value: string) => {

//     console.log("field",field)
//     console.log("value",value)

//     setContact((prev) => {
//       const updated = { ...prev, [field]: value };
//       debouncedSave(updated);
//       return updated;
//     });
//   };

//   useEffect(() => {
//     return () => {
//       if (saveTimeoutRef.current) {
//         clearTimeout(saveTimeoutRef.current);
//       }
//     };
//   }, []);

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
//         const updated = { ...prev, croppedImage: croppedBlob as string };
//         saveToAPI(updated);
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
//       const updated = { ...prev, croppedImage: null };
//       saveToAPI(updated);
//       return updated;
//     });
//   };

//   // Update the Next button click handler
//   const handleNext = async () => {
//     if (saveTimeoutRef.current) {
//       clearTimeout(saveTimeoutRef.current);
//     }
//     await saveToAPI(contact);
//     router.push("/resume-details/experience");
//   };

//     const [showAdditional, setShowAdditional] = useState<boolean>(false);

//   const [contactTipsClicked, setContactTipsClicked] = useState(false);

//   return (
//     <section className="relative h-screen overflow-hidden">
//       <div className="py-2 lg:py-3 px-3 md:px-4 lg:px-5 bg-white shadow-soft h-full flex flex-col">
//         <Stepper />

//         {/* Scrollable Form Content */}
//         <div className="flex-1 overflow-y-auto pb-5 mt-5">
//           <div className="flex items-center gap-2 sm:gap-3 mb-2">
//             <div className="p-1.5 sm:p-2 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
//               <IoPersonOutline className="w-5 h-5 sm:w-6 sm:h-6 text-[#c40116]" />
//             </div>
//             <h1 className="text-xl sm:text-2xl font-semibold bg-linear-to-r from-[#5e000b] to-[#c40116] bg-clip-text text-transparent">
//               Contact Details
//             </h1>

//             {isSaving && (
//               <span className="ml-auto text-xs text-gray-500">Saving...</span>
//             )}
//           </div>

//           <div className="flex justify-end me-5">
//             <button
//               onClick={() => setContactTipsClicked((prev) => !prev)}
//               className="flex items-center justify-center xs:justify-start gap-2 bg-linear-to-r from-white to-gray-50/80 border border-gray-200 rounded-xl p-2 text-gray-700 text-xs sm:text-sm font-medium hover:border-[#c40116] hover:text-[#c40116]  hover:shadow-md transition-all duration-200 w-fit"
//               type="button"
//             >
//               <motion.div
//                 animate={{ opacity: [1, 0.4, 1] }}
//                 transition={{
//                   duration: 1,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                 }}
//               >
//                 <FaRegLightbulb className="text-[#c40116]  " />
//               </motion.div>
//               <span className="truncate ">Contact Tips</span>
//               <motion.div
//                 animate={{ rotate: contactTipsClicked ? 180 : 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="text-gray-500 shrink-0"
//               >
//                 <IoIosArrowDown />
//               </motion.div>
//             </button>
//           </div>
//           <p className="text-gray-600 text-xs sm:text-sm mt-2 font-medium">
//             Add your up-to-date contact information so employers and recruiters
//             can easily reach you.
//           </p>
//           <form className="space-y-5 sm:space-y-6 mt-2 bg-[#f3f4f6]/80 p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl ">
//             {/* Profile Photo Section */}
//             {chosenResumeDetails?.pic === "true" && (
//               <div className="bg-linear-to-r from-gray-50 to-white p-3 sm:p-4 rounded-xl border border-gray-100 shadow-subtle">
//                 <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
//                   {contact.croppedImage ? (
//                     <div className="relative group self-start">
//                       <div className="absolute inset-0 bg-linear-to-r from-[#c40116]/20 to-[#be0117]/20 rounded-xl blur-md group-hover:blur-lg transition-all duration-300 hover:shadow-md"></div>

//                       {/* Clickable Photo with View/Edit Options */}
//                       <div className="relative">
//                         {/* Main photo */}
//                         {contact.croppedImage.startsWith("blob:") ||
//                         contact.croppedImage.startsWith("data:") ? (
//                           // eslint-disable-next-line @next/next/no-img-element
//                           <img
//                             src={contact.croppedImage}
//                             alt="Profile"
//                             className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border-2 border-white shadow-md cursor-pointer"
//                           />
//                         ) : (
//                           // eslint-disable-next-line @next/next/no-img-element
//                           <img
//                             src={`${API_URL}/api/uploads/photos/${contact.croppedImage}`}
//                             alt="Profile"
//                             className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border-2 border-white shadow-md cursor-pointer"
//                           />
//                         )}

//                         {/* Hover overlay with actions */}
//                         <div className="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
//                           <button
//                             type="button"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               setShowPhotoViewer(true);
//                             }}
//                             className="p-1 bg-white/20 rounded-lg cursor-pointer hover:bg-white/30 transition-colors"
//                           >
//                             <IoEyeOutline className="w-4 h-4 text-white" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div
//                       className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-200 hover:border-[#c40116] hover:from-[#c40116]/10 hover:to-[#be0117]/10 transition-all duration-300 hover:shadow-md group self-start"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         setOpen(true);
//                       }}
//                     >
//                       <IoPersonOutline className="w-6 h-6 sm:w-7 sm:h-7 text-gray-400 group-hover:text-[#c40116] transition-colors" />
//                     </div>
//                   )}

//                   <div className="flex-1 min-w-0">
//                     <h3 className="text-sm font-semibold text-gray-700 mb-2">
//                       Profile Photo
//                     </h3>

//                     <div className="flex flex-wrap gap-2">
//                       {!contact.croppedImage ? (
//                         <button
//                           type="button"
//                           onClick={(e) => {
//                             e.preventDefault();
//                             setOpen(true);
//                           }}
//                           className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-linear-to-r from-[#c40116] to-[#be0117] text-white text-xs font-medium rounded-lg hover:shadow-lg hover:shadow-[#c40116]/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex-1 sm:flex-none"
//                         >
//                           <IoCloudUploadOutline className="w-3.5 h-3.5" />
//                           <span className="whitespace-nowrap">
//                             Upload Photo
//                           </span>
//                         </button>
//                       ) : (
//                         <>
//                           <button
//                             type="button"
//                             onClick={(e) => {
//                               e.preventDefault();
//                               setOpen(true);
//                             }}
//                             className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-linear-to-r from-[#c40116] to-[#be0117] text-white text-xs font-medium rounded-lg hover:shadow-lg hover:shadow-[#c40116]/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex-1 sm:flex-none"
//                           >
//                             <IoPencilOutline className="w-3.5 h-3.5" />
//                             <span className="whitespace-nowrap">
//                               Change Photo
//                             </span>
//                           </button>

//                           <button
//                             type="button"
//                             onClick={(e) => {
//                               e.preventDefault();
//                               handleDeletePhoto();
//                             }}
//                             className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-linear-to-r from-gray-100 to-gray-50 text-gray-700 text-xs font-medium rounded-lg border border-gray-200 hover:border-[#c40116] hover:text-[#c40116] hover:shadow-md transition-all duration-200 flex-1 sm:flex-none"
//                           >
//                             <FiTrash2 className="w-3.5 h-3.5" />
//                             <span className="whitespace-nowrap">
//                               Delete Photo
//                             </span>
//                           </button>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Name Section - Compact for two columns */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
//               {/* First Name */}
//               <div className="group">
//                 <label
//                   htmlFor="firstName"
//                   className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5"
//                 >
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   id="firstName"
//                   value={contact.firstName || ""}
//                   onChange={(e) =>
//                     handleContactChange(
//                       "firstName",
//                       sanitizeName(e.target.value),
//                     )
//                   }
//                   placeholder="Peter"
//                   className="w-full px-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-gray-300 focus:ring-2 focus:ring-gray-600/20 focus:shadow-lg focus:shadow-gray-600/20 transition-all duration-300  hover:shadow-md"
//                 />
//               </div>

//               {/* Last Name */}
//               <div className="group">
//                 <label
//                   htmlFor="lastName"
//                   className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                 >
//                   Last Name
//                 </label>
//                 <input
//                   type="text"
//                   id="lastName"
//                   value={contact.lastName || ""}
//                   onChange={(e) =>
//                     handleContactChange(
//                       "lastName",
//                       sanitizeName(e.target.value),
//                     )
//                   }
//                   placeholder="Khan"
//                   className="w-full px-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300 hover:shadow-md"
//                 />
//               </div>
//             </div>

//             {/* Phone + Email - Compact for two columns */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
//               {/* Phone */}
//               <div className="group">
//                 <label
//                   htmlFor="phone"
//                   className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                 >
//                   Phone Number
//                 </label>

//                 <input
//                   type="tel"
//                   id="phone"
//                   value={contact.phone || ""}
//                   onChange={(e) =>
//                     handleContactChange("phone", sanitizeNumber(e.target.value))
//                   }
//                   placeholder="12345-12345"
//                   className="w-full px-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300 hover:shadow-md"
//                 />
//               </div>

//               {/* Email */}
//               <div className="group">
//                 <label
//                   htmlFor="email"
//                   className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                 >
//                   Email Address
//                 </label>

//                 <input
//                   type="email"
//                   id="email"
//                   value={contact.email || ""}
//                   onChange={(e) => handleContactChange("email", e.target.value)}
//                   placeholder="youremail@example.com"
//                   className="w-full px-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300 hover:shadow-md"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
//               {/* Job Title */}
//               <div className="group">
//                 <label
//                   htmlFor="jobTitle"
//                   className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                 >
//                   Desired job title
//                 </label>

//                 <input
//                   type="text"
//                   id="jobTitle"
//                   value={contact.jobTitle || ""}
//                   onChange={(e) =>
//                     handleContactChange(
//                       "jobTitle",
//                       sanitizeText(e.target.value),
//                     )
//                   }
//                   placeholder="Software Engineer"
//                   className="w-full px-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300 hover:shadow-md"
//                 />
//               </div>

//               <div className="group">
//                 <label
//                   htmlFor="DOB"
//                   className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                 >
//                   Date Of Birth
//                 </label>

//                 <input
//                   type="date"
//                   id="DOB"
//                   value={contact.dob?.split('T')[0] || ""}
//                   onChange={(e) =>
//                     handleContactChange(
//                       "dob",
//                     e.target.value,
//                     )
//                   }
//                   placeholder="Software Engineer"
//                   className="w-full px-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300 hover:shadow-md"
//                 />
//               </div>
//             </div>

//              {/* Toggle Button - More Compact */}
//             <button
//               type="button"
//               onClick={() => setShowAdditional(!showAdditional)}
//               className="w-full p-3 flex items-center justify-between bg-white hover:from-gray-100/80 hover:to-white transition-all duration-300 group rounded-xl cursor-pointer"
//             >
//               <div className="flex items-center gap-2">
//                 <div
//                   className={`p-1.5 rounded-lg transition-all duration-300 ${
//                     showAdditional
//                       ? "bg-[#c40116]/10 text-[#c40116]"
//                       : "bg-gray-100 text-gray-600 group-hover:bg-[#c40116]/10 group-hover:text-[#c40116]"
//                   }`}
//                 >
//                   <IoInformationCircleOutline className="w-4 h-4" />
//                 </div>
//                 <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-[#c40116] transition-colors whitespace-nowrap">
//                   Additional Information
//                 </span>
//               </div>
//               <IoChevronDown
//                 className={`w-4 h-4 text-gray-500 group-hover:text-[#c40116] transition-all duration-300 ${
//                   showAdditional ? "rotate-180" : ""
//                 }`}
//               />
//             </button>

//              <div className="bg-linear-to-br from-gray-50/50 to-white/50 rounded-xl border border-gray-100 overflow-hidden">
//               <div
//                 className={`transition-all duration-500 ease-in-out ${
//                   showAdditional ? "max-h-500 opacity-100" : "max-h-0 opacity-0"
//                 }`}
//               >
//                 <div className="p-3 sm:p-4  space-y-4">

//             {/* LinkedIn & Portfolio - Compact */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
//               <div className="group">
//                 <label
//                   htmlFor="LinkedIn"
//                   className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                 >
//                   LinkedIn Profile
//                 </label>

//                 <input
//                   type="url"
//                   id="LinkedIn"
//                   value={contact.linkedin || ""}
//                   onChange={(e) =>
//                     handleContactChange("linkedin", e.target.value)
//                   }
//                   placeholder="linkedin.com"
//                   className="w-full px-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300 hover:shadow-md"
//                 />
//               </div>

//               <div className="group">
//                 <label
//                   htmlFor="Portfolio"
//                   className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                 >
//                   Portfolio / Website
//                 </label>

//                 <input
//                   type="text"
//                   id="Portfolio"
//                   value={contact.portfolio}
//                   onChange={(e) =>
//                     handleContactChange("portfolio", e.target.value)
//                   }
//                   placeholder="yourportfolio.com"
//                   className="w-full px-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300 hover:shadow-md"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
//               {/* Address */}
//               <div className="group">
//                 <label
//                   htmlFor="Address"
//                   className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                 >
//                   Street Name
//                 </label>

//                 <input
//                   type="text"
//                   id="Address"
//                   value={contact.address}
//                   onChange={(e) =>
//                     handleContactChange("address", e.target.value)
//                   }
//                   placeholder="123 Main Street, Apt 4B"
//                   className="w-full px-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300 hover:shadow-md"
//                 />
//               </div>

//               <div className="group">
//                 <label
//                   htmlFor="City"
//                   className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                 >
//                   City
//                 </label>

//                 <input
//                   type="text"
//                   id="City"
//                   value={contact.city}
//                   onChange={(e) =>
//                     handleContactChange(
//                       "city",
//                       sanitizeTextWithComma(e.target.value),
//                     )
//                   }
//                   placeholder="New York"
//                   className="w-full px-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300 hover:shadow-md"
//                 />
//               </div>
//             </div>

//             {/* Location Information - Compact */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
//               <div className="group">
//                 <label
//                   htmlFor="Post"
//                   className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                 >
//                   Postal Code
//                 </label>

//                 <input
//                   type="text"
//                   id="Post"
//                   value={contact.postcode || ""}
//                   onChange={(e) =>
//                     handleContactChange("postcode", e.target.value)
//                   }
//                   placeholder="10001"
//                   className="w-full px-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300 hover:shadow-md"
//                 />
//               </div>

//               <div className="group">
//                 <label
//                   htmlFor="Country"
//                   className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                 >
//                   Country
//                 </label>

//                 <input
//                   type="text"
//                   id="Country"
//                   value={contact.country}
//                   onChange={(e) =>
//                     handleContactChange(
//                       "country",
//                       sanitizeTextWithComma(e.target.value),
//                     )
//                   }
//                   placeholder="United States"
//                   className="w-full px-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300 hover:shadow-md"
//                 />
//               </div>
//             </div>
//                         </div>

//             </div>

//             </div>

//           </form>
//         </div>

//         {/* Fixed Footer - Always visible at bottom */}
//         <div className="shrink-0 pt-2  lg:pt-3 ">
//           <div className="flex justify-between">
//             <button
//               className="bg-gray-200 text-[#374151] border border-gray-300 text-sm md:text-base px-4 py-2 md:px-6 md:py-2.5 rounded-lg font-nunito font-semibold hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
//               onClick={() => router.push("/choose-template")}
//             >
//               Back
//             </button>

//             <button
//               className="bg-red-600 hover:bg-red-700 text-white text-sm md:text-base px-4 py-2 md:px-6 md:py-2.5 rounded-lg font-nunito font-semibold transition-colors duration-300 cursor-pointer"
//               onClick={handleNext}
//             >
//               Next Experience
//             </button>
//           </div>
//         </div>

//         {/* Photo Viewer Modal */}
//         {showPhotoViewer && contact.croppedImage && (
//           <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="relative max-w-3xl max-h-[80vh]"
//             >
//               {/* Close button */}
//               <button
//                 type="button"
//                 onClick={() => setShowPhotoViewer(false)}
//                 className="absolute -top-10 right-0 bg-black rounded text-white hover:text-gray-300 cursor-pointer transition-all duration-700 group p-2 x backdrop-blur-sm group "
//               >
//                 <IoClose className="w-4 h-4 xs:w-5 xs:h-5 transition-all duration-700 group-hover:rotate-90" />
//               </button>

//               {/* Image */}
//               {contact.croppedImage.startsWith("blob:") ||
//               contact.croppedImage.startsWith("data:") ? (
//                 <img
//                   src={contact.croppedImage}
//                   alt="Profile"
//                   className="max-w-full max-h-[50vh] rounded-lg object-contain"
//                 />
//               ) : (
//                 <img
//                   src={`${API_URL}/api/uploads/photos/${contact.croppedImage}`}
//                   alt="Profile"
//                   className="max-w-full max-h-[50vh] rounded-lg object-contain"
//                 />
//               )}
//             </motion.div>
//           </div>
//         )}

//         {/* Photo Upload Modal */}
//         {open && (
//           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto"
//             >
//               <div className="p-4 sm:p-5">
//                 <div className="flex items-center justify-between mb-4">
//                   <h2 className="text-lg font-semibold text-gray-800">
//                     Upload Profile Photo
//                   </h2>
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setImageSrc(null);
//                       setOpen(false);
//                     }}
//                     className="p-1 bg-gray-200 rounded-lg transition-colors cursor-pointer"
//                   >
//                     <IoClose className="w-5 h-5 text-gray-500" />
//                   </button>
//                 </div>

//                 {/* Dropzone Area */}
//                 {!imageSrc ? (
//                   <div
//                     {...getRootProps()}
//                     className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-[#c40116] hover:bg-gray-50/50 transition-all duration-300 hover:shadow-md"
//                   >
//                     <input {...getInputProps()} />
//                     <div className="flex flex-col items-center justify-center gap-3">
//                       <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 flex items-center justify-center">
//                         <IoCloudUploadOutline className="w-6 h-6 text-[#c40116]" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-gray-700 mb-1">
//                           Drag & drop your photo here
//                         </p>
//                         <p className="text-xs text-gray-500">
//                           or click to browse (JPG, PNG, WEBP)
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="space-y-4">
//                     <div className="relative h-64 w-full bg-gray-100 rounded-xl overflow-hidden">
//                       <Cropper
//                         image={imageSrc}
//                         crop={crop}
//                         zoom={zoom}
//                         aspect={1}
//                         onCropChange={setCrop}
//                         onZoomChange={setZoom}
//                         onCropComplete={onCropComplete}
//                       />
//                     </div>

//                     <div className="space-y-3">
//                       <div>
//                         <label className="block text-xs font-medium text-gray-700 mb-1">
//                           Zoom
//                         </label>
//                         <input
//                           type="range"
//                           min={1}
//                           max={3}
//                           step={0.1}
//                           value={zoom}
//                           onChange={(e) => setZoom(parseFloat(e.target.value))}
//                           className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                         />
//                       </div>

//                       <div className="flex gap-2">
//                         <button
//                           type="button"
//                           onClick={() => {
//                             setImageSrc(null);
//                             setCrop({ x: 0, y: 0 });
//                             setZoom(1);
//                           }}
//                           className="flex-1 px-4 py-2.5 bg-linear-to-r from-gray-100 to-gray-50 text-gray-700 text-sm font-medium rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
//                         >
//                           Cancel
//                         </button>
//                         <button
//                           type="button"
//                           onClick={handleCropSave}
//                           className="flex-1 px-4 py-2.5 bg-linear-to-r from-[#c40116] to-[#be0117] text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-[#c40116]/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
//                         >
//                           Save Photo
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           </div>
//         )}

//         {contactTipsClicked && (
//           <AnimatePresence>
//             <div className="fixed inset-0 z-50 flex items-start justify-center overflow-hidden p-4">
//               <div
//                 className="absolute inset-0 backdrop-blur-sm bg-black/30"
//                 onClick={() => setContactTipsClicked(false)}
//               />
//               <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:w-[30vw] h-auto max-h-[80vh] mt-8 sm:mt-20">
//                 <motion.div
//                   initial={{ y: 50, opacity: 0, scale: 0.95 }}
//                   animate={{ y: 0, opacity: 1, scale: 1 }}
//                   exit={{ y: 50, opacity: 0, scale: 0.95 }}
//                   transition={{
//                     type: "spring",
//                     stiffness: 120,
//                     damping: 18,
//                     duration: 0.4,
//                   }}
//                   className="w-full rounded-xl sm:rounded-2xl bg-white border border-gray-200 shadow-2xl max-h-[inherit] overflow-hidden"
//                 >
//                   <div className="flex justify-between items-center p-4 sm:p-6">
//                     <div className="flex items-center gap-2 sm:gap-3">
//                       <div className="p-1.5 sm:p-2 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
//                         <FaRegLightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-[#c40116]" />
//                       </div>
//                       <h3 className="text-base sm:text-lg font-semibold text-gray-800">
//                         Tips for Better Resume
//                       </h3>
//                     </div>
//                     <button
//                       onClick={() => setContactTipsClicked(false)}
//                       className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
//                       type="button"
//                     >
//                       <FiX size={18} className="sm:w-5 sm:h-5" />
//                     </button>
//                   </div>
//                   <hr className="border-gray-100" />

//                   <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto max-h-[calc(80vh-100px)]">
//                     {/* Best Practices */}
//                     <div className="space-y-3 sm:space-y-4">
//                       <h4 className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
//                         Best Practices
//                       </h4>
//                       {[
//                         {
//                           title: "Use a professional email",
//                           desc: "Avoid nicknames or unprofessional handles. Example: firstname.lastname@gmail.com",
//                         },
//                         {
//                           title: "Include a complete name",
//                           desc: "Use your full legal name or the name you professionally go by.",
//                         },
//                         {
//                           title: "Phone number format",
//                           desc: "Include your country code for international opportunities.",
//                         },
//                         {
//                           title: "LinkedIn profile",
//                           desc: "Add your LinkedIn URL to showcase your professional network.",
//                         },
//                         {
//                           title: "Location matters",
//                           desc: "Include city and country to show your work eligibility.",
//                         },
//                       ].map((tip, idx) => (
//                         <div
//                           key={idx}
//                           className="flex items-start gap-2 sm:gap-3"
//                         >
//                           <div className="shrink-0 mt-0.5">
//                             <div className="p-1 sm:p-1.5 bg-emerald-100 rounded-lg">
//                               <FiCheckCircle className="text-emerald-500 w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                             </div>
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <p className="text-xs sm:text-sm font-semibold text-gray-800">
//                               {tip.title}
//                             </p>
//                             <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
//                               {tip.desc}
//                             </p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     {/* What to Avoid */}
//                     <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t border-gray-100">
//                       <h4 className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
//                         Common Mistakes
//                       </h4>
//                       {[
//                         {
//                           title: "Wrong email format",
//                           desc: "Double-check your email address for typos.",
//                         },
//                         {
//                           title: "Missing country code",
//                           desc: "Add +1, +44, etc., for international reachability.",
//                         },
//                         {
//                           title: "Outdated information",
//                           desc: "Always keep your contact details current.",
//                         },
//                       ].map((tip, idx) => (
//                         <div
//                           key={idx}
//                           className="flex items-start gap-2 sm:gap-3"
//                         >
//                           <div className="shrink-0 mt-0.5">
//                             <div className="p-1 sm:p-1.5 bg-[#c40116]/10 rounded-lg">
//                               <FiXCircle className="text-[#c40116] w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                             </div>
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <p className="text-xs sm:text-sm font-semibold text-gray-800">
//                               {tip.title}
//                             </p>
//                             <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
//                               {tip.desc}
//                             </p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </motion.div>
//               </div>
//             </div>
//           </AnimatePresence>
//         )}
//       </div>
//     </section>
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
import { TipsModal } from "@/app/components/resume";

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

  const saveToAPI = async (contactData: typeof contact) => {
    if (!userId) {
      console.error("User ID is required");
      return false;
    }

    setIsSaving(true);

    try {
      const fd = new FormData();

      fd.append("userId", userId);
      fd.append("firstName", contactData.firstName || "");
      fd.append("lastName", contactData.lastName || "");
      fd.append("email", contactData.email || "");
      fd.append("jobTitle", contactData.jobTitle || "");
      fd.append("dob", contactData.dob || "");
      fd.append("phone", contactData.phone || "");
      fd.append("country", contactData.country || "");
      fd.append("city", contactData.city || "");
      fd.append("address", contactData.address || "");
      fd.append("postCode", contactData.postcode || "");
      fd.append("linkedIn", contactData.linkedin || "");
      fd.append("github", contactData.github || "");
      fd.append("portfolio", contactData.portfolio || "");

      if (chosenResumeDetails?.id) {
        fd.append("templateId", String(chosenResumeDetails.id));
      }

      if (
        contactData.photo &&
        (contactData.photo.startsWith("blob:") ||
          contactData.photo.startsWith("data:image"))
      ) {
        let fileImage;

        if (contactData.photo.startsWith("blob:")) {
          fileImage = await blobUrlToFile(contactData.photo, "profile.jpg");
        } else if (contactData.photo.startsWith("data:image")) {
          fileImage = base64ToFile(contactData.photo, "profile.jpg");
        }

        if (fileImage) {
          fd.append("photo", fileImage);
        }
      }

      const response = await axios.post(
        `${API_URL}/api/contact-resume/update`,
        fd,
        {
          params: {
            userId: userId,
            templateId:
              chosenResumeDetails?.id || chosenResumeDetails?.templateId,
            id: contactId || "",
            resume: resumeId || "abc",
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setContact((prev) => ({ ...prev, contactId: response.data.resume._id }));
      fetchContact(response.data.resume._id);
      return true;
    } catch (err) {
      console.error("Error saving contact:", err);
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
          skills: [],
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
      {/* Sticky Stepper - Always at top */}
      {/* <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <Stepper />
      </div> */}

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
                                value={contact.linkedin || ""}
                                onChange={(e) =>
                                  handleContactChange(
                                    "linkedin",
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
                                value={contact.postcode || ""}
                                onChange={(e) =>
                                  handleContactChange(
                                    "postcode",
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

      {/* Sticky Footer Buttons - Always at bottom - Responsive */}
      <div className="sticky bottom-0 z-20 bg-white/80 backdrop-blur-md border-t border-gray-100 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 ">
          <div className="flex justify-between items-center gap-3">
            <button
              className="text-xs sm:text-sm font-medium text-gray-500 hover:text-indigo-600 transition flex items-center gap-1 cursor-pointer"
              onClick={() => router.push("/choose-template")}
            >
              ← Back to Templates
            </button>
            <button
              className="px-4 sm:px-6 py-2 sm:py-2.5  bg-linear-to-r from-indigo-600 to-indigo-500 text-white t font-medium rounded-lg sm:rounded-xl shadow-md transition-all hover:shadow-indigo-300 flex items-center gap-1.5 sm:gap-2 cursor-pointer"
              onClick={handleNext}
            >
              <span>Continue to Experience</span>
              <IoArrowForward className="w-3 h-3 sm:w-4 sm:h-4" />
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

      {/* {contactTipsClicked && (
        <AnimatePresence>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 backdrop-blur-md bg-black/50"
              onClick={() => setContactTipsClicked(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md mx-4 bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="bg-linear-to-r from-indigo-600 to-purple-600 px-4 sm:px-6 py-4 sm:py-5">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-white/20 rounded-xl">
                    <FaRegLightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      Pro Tips
                    </h3>
                    <p className="text-indigo-100 text-xs sm:text-sm">
                      Boost your resume's impact
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="bg-amber-50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-5 border border-amber-100">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                    <IoStar className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500" />
                    <span className="text-xs sm:text-sm font-semibold text-amber-700">
                      Did you know?
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700">
                    Profiles with complete contact info get{" "}
                    <span className="font-bold text-amber-600">
                      40% more responses
                    </span>{" "}
                    from recruiters
                  </p>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <h4 className="text-[10px] sm:text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                    Best Practices
                  </h4>
                  {[
                    "Use a professional email address (firstname.lastname@domain.com)",
                    "Include country code in phone number for international opportunities",
                    "Add LinkedIn profile URL to showcase your professional network",
                    "Keep all information up to date and accurate",
                  ].map((tip, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg hover:bg-gray-50 transition"
                    >
                      <FiCheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-700">
                        {tip}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-100">
                <button
                  onClick={() => setContactTipsClicked(false)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-linear-to-r from-indigo-600 to-purple-600 text-white text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl hover:shadow-lg transition-all"
                >
                  Got it, thanks! ✨
                </button>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>
      )} */}



<TipsModal
  isOpen={contactTipsClicked}
  onClose={() => setContactTipsClicked(false)}
  title="Contact Tips"
  subtitle="Make it easy for recruiters to reach you"
  hasAI={false}
  proTip="Complete contact info = 40% more responses from recruiters"
  bestPractices={[
    { tip: "Use your legal full name", example: "No nicknames or abbreviations" },
    { tip: "Use a professional email", example: "name@domain.com" },
    { tip: "Include country code in phone", example: "+1 (555) 123-4567" },
    { tip: "Add your target job title", example: "Senior Software Engineer" },
    { tip: "Include LinkedIn profile URL", example: "linkedin.com/in/username" },
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
      <p className="text-xs sm:text-sm font-semibold text-indigo-700 mb-2">Quick Checklist</p>
      <div className="grid sm:grid-cols-2 gap-1">
        <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" /><span className="text-xs sm:text-sm text-gray-600">Legal name</span></div>
       <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" /><span className="text-xs sm:text-sm text-gray-600">LinkedIn URL</span></div>
        <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" /><span className="text-xs sm:text-sm text-gray-600">Phone with code</span></div>
        
         <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" /><span className="text-xs sm:text-sm text-gray-600">Professional email</span></div>
      </div>
    </div>
  }
/>

  
    </div>
  );
};

export default ContactForm;
