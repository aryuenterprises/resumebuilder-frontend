// "use client";
// import React, {
//   useContext,
//   useState,
//   useCallback,
//   useEffect,
//   forwardRef,
//   useImperativeHandle,
// } from "react";
// import Cropper from "react-easy-crop";
// import { useDropzone } from "react-dropzone";
// import { motion } from "framer-motion";
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
// } from "react-icons/io5";
// import { GrUserWorker } from "react-icons/gr";
// import { FiTrash2 } from "react-icons/fi";
// import { FaLinkedin, FaGlobeAmericas } from "react-icons/fa";
// import "primereact/resources/themes/lara-light-indigo/theme.css";
// import "primereact/resources/primereact.min.css";
// import { API_URL } from "@/app/config/api";
// import { CreateContext } from "@/app/context/CreateContext";
// import Stepper from "../../../components/resume/Steppers";
// import { getCroppedImgWithOptions } from "@/app/utils";

// interface ContactFormProps {
//   templateId?: {
//     id: string;
//     pic: string;
//   };
//   editid?: string;
// }

// const Contact_form = forwardRef<
//   { handleSubmit: () => Promise<boolean> },
//   ContactFormProps
// >((props, ref) => {
//   const [userLoggedIn, setUserLoggedIn] = useState<any>("");
//   const Userid = userLoggedIn?.id || userLoggedIn?._id;
//   const router = useRouter();

//   // Get data from props or fallback to context/state
//   const pic = props.templateId?.pic || "true";
//   const templateId = props.templateId?.id;
//   const editid = props.editid;

//   const { contact, setContact } = useContext(CreateContext);
//   const [showAdditional, setShowAdditional] = useState<boolean>(false);
//   const [open, setOpen] = useState(false);
//   const [imageSrc, setImageSrc] = useState<string | null>(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

//   const fetchContact = async () => {
//     const userdata = JSON.parse(
//       localStorage.getItem("Resumnit_user") || "null",
//     );
//     const userId = userdata?.id || userdata?._id;

//     setUserLoggedIn(userdata);
//     if (!editid || !userId) return;

//     try {
//       const response = await axios.get(
//         `${API_URL}/api/contact-resume/get-contact/${userId}`,
//         {
//           params: {
//             resumeId: editid,
//           },
//         },
//       );

//       const data = response.data[0] || response.data;

//       setContact((prev) => ({
//         ...prev,
//         contactId: data?._id || "",
//         firstName: data?.firstName || userLoggedIn?.firstName || "",
//         lastName: data?.lastName || userLoggedIn?.lastName || "",
//         jobTitle: data?.jobTitle || "",
//         phone: data?.phone || userLoggedIn?.phone || "",
//         email: data?.email || userLoggedIn?.email || "",
//         address: data?.address || "",
//         city: data?.city || userLoggedIn?.city || "",
//         country: data?.country || userLoggedIn?.country || "",
//         postcode: data?.postCode || "",
//         linkedin: data?.linkedIn || "",
//         portfolio: data?.portfolio || "",
//         croppedImage: data?.photo || null,
//       }));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchContact();
//   }, [Userid, editid]);

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

//   const handleSubmit = async (e?: React.FormEvent) => {
//     if (e) e.preventDefault();

//     if (!Userid) {
//       console.error("User ID is required");
//       return false;
//     }

//     try {
//       const fd = new FormData();

//       fd.append("userId", Userid);
//       fd.append("firstName", contact.firstName || "");
//       fd.append("lastName", contact.lastName || "");
//       fd.append("email", contact.email || "");
//       fd.append(
//         "jobTitle",
//         contact.jobTitle?.length > 0 ? contact.jobTitle : "",
//       );
//       fd.append("phone", contact.phone || "");
//       fd.append("country", contact.country || "");
//       fd.append("city", contact.city || "");
//       fd.append("address", contact.address || "");
//       fd.append("postCode", contact.postcode || "");
//       fd.append("linkedIn", contact.linkedin || "");
//       fd.append("portfolio", contact.portfolio || "");
//       if (templateId) {
//         fd.append("templateId", templateId);
//       }

//       if (contact.croppedImage) {
//         let fileImage;

//         if (contact.croppedImage.startsWith("blob:")) {
//           fileImage = await blobUrlToFile(contact.croppedImage, "profile.jpg");
//         } else if (contact.croppedImage.startsWith("data:image")) {
//           fileImage = base64ToFile(contact.croppedImage, "profile.jpg");
//         }

//         if (fileImage) {
//           fd.append("photo", fileImage);
//         }
//       }

//       const response = await axios.post(
//         `${API_URL}/api/contact-resume/update`,
//         fd,
//         {
//           params: { userId: Userid, templateId: templateId, id: editid },
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         },
//       );

//       // toast.success("Contact updated successfully.");
//       await fetchContact();
//       return true;
//     } catch (err) {
//       console.error("Error sending message:", err);
//       return false;
//     }
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
//       // setCroppedImage(croppedBlob as string);
//       setContact((prev) => ({ ...prev, croppedImage: croppedBlob as string }));

//       setImageSrc(null);
//       setOpen(false);
//     } catch (e) {
//       console.error(e);
//     }
//   }, [imageSrc, croppedAreaPixels]);

//   return (
//     <section className="relative h-screen overflow-hidden">
//       <div className="p-3 md:p-4 lg:p-5 bg-white rounded-xl shadow-soft h-full flex flex-col">
//         <Stepper />

//         {/* Scrollable Form Content */}
//         <div className="flex-1 overflow-y-auto pb-5 mt-3">
//           <div className="flex items-center gap-2 sm:gap-3 mb-2 ">
//             <div className="p-1.5 sm:p-2 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
//               <IoPersonOutline className="w-5 h-5 sm:w-6 sm:h-6 text-[#c40116]" />
//             </div>
//             <h1 className="text-xl sm:text-2xl font-semibold bg-linear-to-r from-[#5e000b] to-[#c40116] bg-clip-text text-transparent">
//               Contact Details
//             </h1>
//           </div>
//           <p className="text-gray-600 text-xs sm:text-sm font-medium">
//             Add your up-to-date contact information so employers and recruiters
//             can easily reach you.
//           </p>
//           <form className="space-y-5 sm:space-y-6 bg-[#f3f4f6]/80 p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl ">
//             {/* Profile Photo Section */}
//             {(pic === "true" || contact.croppedImage) && (
//               <div className="bg-linear-to-r from-gray-50 to-white p-3 sm:p-4 rounded-xl border border-gray-100 shadow-subtle">
//                 <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
//                   {contact.croppedImage ? (
//                     <div className="relative group self-start">
//                       <div className="absolute inset-0 bg-linear-to-r from-[#c40116]/20 to-[#be0117]/20 rounded-xl blur-md group-hover:blur-lg transition-all duration-300"></div>
//                       {contact.croppedImage.startsWith("blob:") ||
//                       contact.croppedImage.startsWith("data:") ? (
//                         // eslint-disable-next-line @next/next/no-img-element
//                         <img
//                           src={contact.croppedImage}
//                           alt="Profile"
//                           className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
//                           onClick={(e) => e.preventDefault()}
//                         />
//                       ) : (
//                         // eslint-disable-next-line @next/next/no-img-element
//                         <img
//                           src={`${API_URL}/api/uploads/photos/${contact.croppedImage}`}
//                           alt="Profile"
//                           className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
//                           onClick={(e) => e.preventDefault()}
//                         />
//                       )}
//                     </div>
//                   ) : (
//                     <div
//                       className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-200 hover:border-[#c40116] hover:from-[#c40116]/10 hover:to-[#be0117]/10 transition-all duration-300 group self-start"
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
//                       <button
//                         type="button"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           setOpen(true);
//                         }}
//                         className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-linear-to-r from-[#c40116] to-[#be0117] text-white text-xs font-medium rounded-lg hover:shadow-lg hover:shadow-[#c40116]/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex-1 sm:flex-none"
//                       >
//                         <IoCloudUploadOutline className="w-3.5 h-3.5" />
//                         <span className="whitespace-nowrap">Upload Photo</span>
//                       </button>

//                       <button
//                         type="button"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           setContact((prev) => ({
//                             ...prev,
//                             croppedImage: null,
//                           }));
//                         }}
//                         className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-linear-to-r from-gray-100 to-gray-50 text-gray-700 text-xs font-medium rounded-lg border border-gray-200 hover:border-[#c40116] hover:text-[#c40116] hover:shadow-md transition-all duration-200 flex-1 sm:flex-none"
//                       >
//                         <FiTrash2 className="w-3.5 h-3.5" />
//                         <span className="whitespace-nowrap">Delete Photo</span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Photo Upload Modal */}
//             {open && (
//               <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto"
//                 >
//                   <div className="p-4 sm:p-5">
//                     <div className="flex items-center justify-between mb-4">
//                       <h2 className="text-lg font-semibold text-gray-800">
//                         Upload Profile Photo
//                       </h2>
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setImageSrc(null);
//                           setOpen(false);
//                         }}
//                         className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
//                       >
//                         <IoClose className="w-5 h-5 text-gray-500" />
//                       </button>
//                     </div>

//                     {/* Dropzone Area */}
//                     {!imageSrc ? (
//                       <div
//                         {...getRootProps()}
//                         className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-[#c40116] hover:bg-gray-50/50 transition-all duration-300"
//                       >
//                         <input {...getInputProps()} />
//                         <div className="flex flex-col items-center justify-center gap-3">
//                           <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 flex items-center justify-center">
//                             <IoCloudUploadOutline className="w-6 h-6 text-[#c40116]" />
//                           </div>
//                           <div>
//                             <p className="text-sm font-medium text-gray-700 mb-1">
//                               Drag & drop your photo here
//                             </p>
//                             <p className="text-xs text-gray-500">
//                               or click to browse (JPG, PNG, WEBP)
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="space-y-4">
//                         <div className="relative h-64 w-full bg-gray-100 rounded-xl overflow-hidden">
//                           <Cropper
//                             image={imageSrc}
//                             crop={crop}
//                             zoom={zoom}
//                             aspect={1}
//                             onCropChange={setCrop}
//                             onZoomChange={setZoom}
//                             onCropComplete={onCropComplete}
//                           />
//                         </div>

//                         <div className="space-y-3">
//                           <div>
//                             <label className="block text-xs font-medium text-gray-700 mb-1">
//                               Zoom
//                             </label>
//                             <input
//                               type="range"
//                               min={1}
//                               max={3}
//                               step={0.1}
//                               value={zoom}
//                               onChange={(e) =>
//                                 setZoom(parseFloat(e.target.value))
//                               }
//                               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                             />
//                           </div>

//                           <div className="flex gap-2">
//                             <button
//                               type="button"
//                               onClick={() => {
//                                 setImageSrc(null);
//                                 setCrop({ x: 0, y: 0 });
//                                 setZoom(1);
//                               }}
//                               className="flex-1 px-4 py-2.5 bg-linear-to-r from-gray-100 to-gray-50 text-gray-700 text-sm font-medium rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
//                             >
//                               Cancel
//                             </button>
//                             <button
//                               type="button"
//                               onClick={handleCropSave}
//                               className="flex-1 px-4 py-2.5 bg-linear-to-r from-[#c40116] to-[#be0117] text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-[#c40116]/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
//                             >
//                               Save Photo
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </motion.div>
//               </div>
//             )}

//             {/* Name Section - Compact for two columns */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
//               {/* First Name */}
//               <div className="group">
//                 <label
//                   htmlFor="firstName"
//                   className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                 >
//                   First Name
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     id="firstName"
//                     value={contact.firstName}
//                     // onChange={(e) => setFirstName(e.target.value)}
//                     onChange={(e) =>
//                       setContact((prev) => ({
//                         ...prev,
//                         firstName: e.target.value,
//                       }))
//                     }
//                     placeholder="Yuvaraj"
//                     className="w-full px-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                   />
//                 </div>
//               </div>

//               {/* Last Name */}
//               <div className="group">
//                 <label
//                   htmlFor="lastName"
//                   className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                 >
//                   Last Name
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     id="lastName"
//                     value={contact.lastName}
//                     // onChange={(e) => setLastName(e.target.value)}
//                     onChange={(e) =>
//                       setContact((prev) => ({
//                         ...prev,
//                         lastName: e.target.value,
//                       }))
//                     }
//                     placeholder="Thangaraj"
//                     className="w-full px-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                   />
//                 </div>
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
//                 <div className="relative">
//                   <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                     <IoCallOutline className="w-4 h-4" />
//                   </div>
//                   <input
//                     type="tel"
//                     id="phone"
//                     value={contact.phone}
//                     onChange={(e) =>
//                       setContact((prev) => ({ ...prev, phone: e.target.value }))
//                     }
//                     placeholder="12345-12345"
//                     className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                   />
//                 </div>
//               </div>

//               {/* Email */}
//               <div className="group">
//                 <label
//                   htmlFor="email"
//                   className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                 >
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                     <IoMailOutline className="w-4 h-4" />
//                   </div>
//                   <input
//                     type="email"
//                     id="email"
//                     value={contact.email}
//                     // onChange={(e) => setEmail(e.target.value)}
//                     onChange={(e) =>
//                       setContact((prev) => ({ ...prev, email: e.target.value }))
//                     }
//                     placeholder="youremail@example.com"
//                     className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Job Title */}
//             <div
//               className={`grid gap-6 mb-6 ${
//                 pic === "true" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
//               }`}
//             >
//               <div className="mb-6">
//                 <label
//                   htmlFor="jobTitle"
//                   className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                 >
//                   Desired job title
//                 </label>

//                 <div className="relative">
//                   <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                     <GrUserWorker className="w-4 h-4" />
//                   </div>
//                   <input
//                     type="text"
//                     id="jobTitle"
//                     value={contact.jobTitle}
//                     onChange={(e) =>
//                       setContact((prev) => ({
//                         ...prev,
//                         jobTitle: e.target.value,
//                       }))
//                     }
//                     placeholder="Software Engineer"
//                     className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Toggle Button - More Compact */}
//             <button
//               type="button"
//               onClick={() => setShowAdditional(!showAdditional)}
//               className="w-full p-3 flex items-center justify-between bg-white hover:from-gray-100/80 hover:to-white transition-all duration-300 group rounded-xl"
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

//             {/* Additional Information Section - Compact */}
//             <div className="bg-linear-to-br from-gray-50/50 to-white/50 rounded-xl border border-gray-100 overflow-hidden">
//               <div
//                 className={`transition-all duration-500 ease-in-out ${
//                   showAdditional ? "max-h-500 opacity-100" : "max-h-0 opacity-0"
//                 }`}
//               >
//                 <div className="p-3 sm:p-4  space-y-4">
//                   {/* LinkedIn & Portfolio - Compact */}
//                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
//                     <div className="group">
//                       <label
//                         htmlFor="LinkedIn"
//                         className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                       >
//                         LinkedIn Profile
//                       </label>
//                       <div className="relative">
//                         <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                           <FaLinkedin className="w-4 h-4" />
//                         </div>
//                         <input
//                           type="url"
//                           id="LinkedIn"
//                           value={contact.linkedin}
//                           // onChange={(e) => setLinkedin(e.target.value)}
//                           onChange={(e) =>
//                             setContact((prev) => ({
//                               ...prev,
//                               linkedin: e.target.value,
//                             }))
//                           }
//                           placeholder="linkedin.com"
//                           className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                         />
//                       </div>
//                     </div>

//                     <div className="group">
//                       <label
//                         htmlFor="Portfolio"
//                         className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                       >
//                         Portfolio / Website
//                       </label>
//                       <div className="relative">
//                         <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                           <FaGlobeAmericas className="w-4 h-4" />
//                         </div>
//                         <input
//                           type="text"
//                           id="Portfolio"
//                           value={contact.portfolio}
//                           // onChange={(e) => setPortfolio(e.target.value)}
//                           onChange={(e) =>
//                             setContact((prev) => ({
//                               ...prev,
//                               portfolio: e.target.value,
//                             }))
//                           }
//                           placeholder="yourportfolio.com"
//                           className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
//                     {/* Address */}
//                     <div className="group">
//                       <label
//                         htmlFor="Address"
//                         className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                       >
//                         Full Address
//                       </label>
//                       <div className="relative">
//                         <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                           <IoLocationOutline className="w-4 h-4" />
//                         </div>
//                         <input
//                           type="text"
//                           id="Address"
//                           value={contact.address}
//                           // onChange={(e) => setAddress(e.target.value)}
//                           onChange={(e) =>
//                             setContact((prev) => ({
//                               ...prev,
//                               address: e.target.value,
//                             }))
//                           }
//                           placeholder="123 Main Street, Apt 4B"
//                           className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                         />
//                       </div>
//                     </div>

//                     <div className="group">
//                       <label
//                         htmlFor="Post"
//                         className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                       >
//                         Postal Code
//                       </label>
//                       <div className="relative">
//                         <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                           <svg
//                             className="w-4 h-4"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
//                             />
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M9 22V12h6v10"
//                             />
//                           </svg>
//                         </div>
//                         <input
//                           type="text"
//                           id="Post"
//                           value={contact.postcode}
//                           // onChange={(e) => setPostcode(e.target.value)}
//                           onChange={(e) =>
//                             setContact((prev) => ({
//                               ...prev,
//                               postcode: e.target.value,
//                             }))
//                           }
//                           placeholder="10001"
//                           className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Location Information - Compact */}
//                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
//                     <div className="group">
//                       <label
//                         htmlFor="Country"
//                         className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                       >
//                         Country
//                       </label>
//                       <div className="relative">
//                         <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                           <IoGlobeOutline className="w-4 h-4" />
//                         </div>
//                         <input
//                           type="text"
//                           id="Country"
//                           value={contact.country}
//                           // onChange={(e) => setCountry(e.target.value)}
//                           onChange={(e) =>
//                             setContact((prev) => ({
//                               ...prev,
//                               country: e.target.value,
//                             }))
//                           }
//                           placeholder="United States"
//                           className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                         />
//                       </div>
//                     </div>

//                     <div className="group">
//                       <label
//                         htmlFor="City"
//                         className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                       >
//                         City
//                       </label>
//                       <div className="relative">
//                         <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                           <IoLocationOutline className="w-4 h-4" />
//                         </div>
//                         <input
//                           type="text"
//                           id="City"
//                           value={contact.city}
//                           // onChange={(e) => setCity(e.target.value)}
//                           onChange={(e) =>
//                             setContact((prev) => ({
//                               ...prev,
//                               city: e.target.value,
//                             }))
//                           }
//                           placeholder="New York"
//                           className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>

//         {/* Fixed Footer - Always visible at bottom */}
//         <div className="shrink-0 pt-4 mt-4 border-t border-gray-200">
//           <div className="flex justify-between">
//             <button
//               className="bg-gray-200 text-[#374151] border border-gray-300 text-sm md:text-base px-4 py-2 md:px-6 md:py-2.5 rounded-lg font-nunito font-semibold hover:bg-gray-100 transition-colors duration-300"
//               onClick={() => router.push("/choose-template")}
//             >
//               Back
//             </button>

//             <button
//               className="bg-red-600 hover:bg-red-700 text-white text-sm md:text-base px-4 py-2 md:px-6 md:py-2.5 rounded-lg font-nunito font-semibold transition-colors duration-300"
//               onClick={() => router.push("/resume-details/experience")}
//             >
//               Next Experience
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// });

// export default Contact_form;

// "use client";
// import React, { useContext, useState, useCallback, useEffect } from "react";
// import Cropper from "react-easy-crop";
// import { useDropzone } from "react-dropzone";
// import { motion } from "framer-motion";
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
// } from "react-icons/io5";
// import { GrUserWorker } from "react-icons/gr";
// import { FiTrash2 } from "react-icons/fi";
// import { FaLinkedin, FaGlobeAmericas } from "react-icons/fa";
// import "primereact/resources/themes/lara-light-indigo/theme.css";
// import "primereact/resources/primereact.min.css";
// import { API_URL } from "@/app/config/api";
// import { CreateContext } from "@/app/context/CreateContext";
// import Stepper from "../../../components/resume/Steppers";
// import { getCroppedImgWithOptions, getLocalStorage } from "@/app/utils";
// import { Template } from "@/app/types";
// import { User } from "@/app/types/user.types";

// const Contact_form = () => {
//   const router = useRouter();

//   const userDetails = getLocalStorage<User>("user_details");
//   const userId = userDetails?.id;
//   const chosenResumeDetails = getLocalStorage<Template>("chosenTemplate");
//   const { contact, setContact } = useContext(CreateContext);

//   const [showAdditional, setShowAdditional] = useState<boolean>(false);
//   const [open, setOpen] = useState(false);
//   const [imageSrc, setImageSrc] = useState<string | null>(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

//   const fetchContact = async () => {
//     try {
//       const response = await axios.get(
//         `${API_URL}/api/contact-resume/get-contact/${userId}`,
//         {
//           params: {
//             resumeId: chosenResumeDetails?.id,
//           },
//         },
//       );

//       const data = response.data[0] || response.data;

//       setContact((prev) => ({
//         ...prev,
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
//       }));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchContact();
//   }, []);

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

//   const handleSubmit = async (e?: React.FormEvent) => {
//     if (e) e.preventDefault();

//     if (!userId) {
//       console.error("User ID is required");
//       return false;
//     }

//     try {
//       const fd = new FormData();

//       fd.append("userId", userId);
//       fd.append("firstName", contact.firstName || "");
//       fd.append("lastName", contact.lastName || "");
//       fd.append("email", contact.email || "");
//       fd.append(
//         "jobTitle",
//         contact.jobTitle?.length > 0 ? contact.jobTitle : "",
//       );
//       fd.append("phone", contact.phone || "");
//       fd.append("country", contact.country || "");
//       fd.append("city", contact.city || "");
//       fd.append("address", contact.address || "");
//       fd.append("postCode", contact.postcode || "");
//       fd.append("linkedIn", contact.linkedin || "");
//       fd.append("portfolio", contact.portfolio || "");
//       if (chosenResumeDetails?.id) {
//         fd.append("templateId", String(chosenResumeDetails.id));
//       }

//       if (contact.croppedImage) {
//         let fileImage;

//         if (contact.croppedImage.startsWith("blob:")) {
//           fileImage = await blobUrlToFile(contact.croppedImage, "profile.jpg");
//         } else if (contact.croppedImage.startsWith("data:image")) {
//           fileImage = base64ToFile(contact.croppedImage, "profile.jpg");
//         }

//         if (fileImage) {
//           fd.append("photo", fileImage);
//         }
//       }

//       const response = await axios.post(
//         `${API_URL}/api/contact-resume/update`,
//         fd,
//         {
//           params: { userId: userId, templateId: chosenResumeDetails?.id },
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         },
//       );

//       // toast.success("Contact updated successfully.");
//       await fetchContact();
//       return true;
//     } catch (err) {
//       console.error("Error sending message:", err);
//       return false;
//     }
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
//       // setCroppedImage(croppedBlob as string);
//       setContact((prev) => ({ ...prev, croppedImage: croppedBlob as string }));

//       setImageSrc(null);
//       setOpen(false);
//     } catch (e) {
//       console.error(e);
//     }
//   }, [imageSrc, croppedAreaPixels]);

//   return (
//     <section className="relative h-screen overflow-hidden">
//       <div className="p-3 md:p-4 lg:p-5 bg-white  shadow-soft h-full flex flex-col">
//         <Stepper />

//         {/* Scrollable Form Content */}
//         <div className="flex-1 overflow-y-auto pb-5 mt-3">
//           <div className="flex items-center gap-2 sm:gap-3 mb-2 ">
//             <div className="p-1.5 sm:p-2 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
//               <IoPersonOutline className="w-5 h-5 sm:w-6 sm:h-6 text-[#c40116]" />
//             </div>
//             <h1 className="text-xl sm:text-2xl font-semibold bg-linear-to-r from-[#5e000b] to-[#c40116] bg-clip-text text-transparent">
//               Contact Details
//             </h1>
//           </div>
//           <p className="text-gray-600 text-xs sm:text-sm font-medium">
//             Add your up-to-date contact information so employers and recruiters
//             can easily reach you.
//           </p>
//           <form className="space-y-5 sm:space-y-6 bg-[#f3f4f6]/80 p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl ">
//             {/* Profile Photo Section */}
//            {(chosenResumeDetails?.pic === "true" || contact.croppedImage) && (
//               <div className="bg-linear-to-r from-gray-50 to-white p-3 sm:p-4 rounded-xl border border-gray-100 shadow-subtle">
//                 <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
//                   {contact.croppedImage ? (
//                     <div className="relative group self-start">
//                       <div className="absolute inset-0 bg-linear-to-r from-[#c40116]/20 to-[#be0117]/20 rounded-xl blur-md group-hover:blur-lg transition-all duration-300"></div>
//                       {contact.croppedImage.startsWith("blob:") ||
//                       contact.croppedImage.startsWith("data:") ? (
//                         // eslint-disable-next-line @next/next/no-img-element
//                         <img
//                           src={contact.croppedImage}
//                           alt="Profile"
//                           className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
//                           onClick={(e) => e.preventDefault()}
//                         />
//                       ) : (
//                         // eslint-disable-next-line @next/next/no-img-element
//                         <img
//                           src={`${API_URL}/api/uploads/photos/${contact.croppedImage}`}
//                           alt="Profile"
//                           className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
//                           onClick={(e) => e.preventDefault()}
//                         />
//                       )}
//                     </div>
//                   ) : (
//                     <div
//                       className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-200 hover:border-[#c40116] hover:from-[#c40116]/10 hover:to-[#be0117]/10 transition-all duration-300 group self-start"
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
//                       <button
//                         type="button"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           setOpen(true);
//                         }}
//                         className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-linear-to-r from-[#c40116] to-[#be0117] text-white text-xs font-medium rounded-lg hover:shadow-lg hover:shadow-[#c40116]/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex-1 sm:flex-none"
//                       >
//                         <IoCloudUploadOutline className="w-3.5 h-3.5" />
//                         <span className="whitespace-nowrap">Upload Photo</span>
//                       </button>

//                       <button
//                         type="button"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           setContact((prev) => ({
//                             ...prev,
//                             croppedImage: null,
//                           }));
//                         }}
//                         className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-linear-to-r from-gray-100 to-gray-50 text-gray-700 text-xs font-medium rounded-lg border border-gray-200 hover:border-[#c40116] hover:text-[#c40116] hover:shadow-md transition-all duration-200 flex-1 sm:flex-none"
//                       >
//                         <FiTrash2 className="w-3.5 h-3.5" />
//                         <span className="whitespace-nowrap">Delete Photo</span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Photo Upload Modal */}
//             {open && (
//               <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto"
//                 >
//                   <div className="p-4 sm:p-5">
//                     <div className="flex items-center justify-between mb-4">
//                       <h2 className="text-lg font-semibold text-gray-800">
//                         Upload Profile Photo
//                       </h2>
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setImageSrc(null);
//                           setOpen(false);
//                         }}
//                         className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
//                       >
//                         <IoClose className="w-5 h-5 text-gray-500" />
//                       </button>
//                     </div>

//                     {/* Dropzone Area */}
//                     {!imageSrc ? (
//                       <div
//                         {...getRootProps()}
//                         className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-[#c40116] hover:bg-gray-50/50 transition-all duration-300"
//                       >
//                         <input {...getInputProps()} />
//                         <div className="flex flex-col items-center justify-center gap-3">
//                           <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 flex items-center justify-center">
//                             <IoCloudUploadOutline className="w-6 h-6 text-[#c40116]" />
//                           </div>
//                           <div>
//                             <p className="text-sm font-medium text-gray-700 mb-1">
//                               Drag & drop your photo here
//                             </p>
//                             <p className="text-xs text-gray-500">
//                               or click to browse (JPG, PNG, WEBP)
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="space-y-4">
//                         <div className="relative h-64 w-full bg-gray-100 rounded-xl overflow-hidden">
//                           <Cropper
//                             image={imageSrc}
//                             crop={crop}
//                             zoom={zoom}
//                             aspect={1}
//                             onCropChange={setCrop}
//                             onZoomChange={setZoom}
//                             onCropComplete={onCropComplete}
//                           />
//                         </div>

//                         <div className="space-y-3">
//                           <div>
//                             <label className="block text-xs font-medium text-gray-700 mb-1">
//                               Zoom
//                             </label>
//                             <input
//                               type="range"
//                               min={1}
//                               max={3}
//                               step={0.1}
//                               value={zoom}
//                               onChange={(e) =>
//                                 setZoom(parseFloat(e.target.value))
//                               }
//                               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                             />
//                           </div>

//                           <div className="flex gap-2">
//                             <button
//                               type="button"
//                               onClick={() => {
//                                 setImageSrc(null);
//                                 setCrop({ x: 0, y: 0 });
//                                 setZoom(1);
//                               }}
//                               className="flex-1 px-4 py-2.5 bg-linear-to-r from-gray-100 to-gray-50 text-gray-700 text-sm font-medium rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
//                             >
//                               Cancel
//                             </button>
//                             <button
//                               type="button"
//                               onClick={handleCropSave}
//                               className="flex-1 px-4 py-2.5 bg-linear-to-r from-[#c40116] to-[#be0117] text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-[#c40116]/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
//                             >
//                               Save Photo
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </motion.div>
//               </div>
//             )}

//             {/* Name Section - Compact for two columns */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
//               {/* First Name */}
//               <div className="group">
//                 <label
//                   htmlFor="firstName"
//                   className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                 >
//                   First Name
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     id="firstName"
//                     value={contact.firstName}
//                     // onChange={(e) => setFirstName(e.target.value)}
//                     onChange={(e) =>
//                       setContact((prev) => ({
//                         ...prev,
//                         firstName: e.target.value,
//                       }))
//                     }
//                     placeholder="Yuvaraj"
//                     className="w-full px-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                   />
//                 </div>
//               </div>

//               {/* Last Name */}
//               <div className="group">
//                 <label
//                   htmlFor="lastName"
//                   className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                 >
//                   Last Name
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     id="lastName"
//                     value={contact.lastName}
//                     // onChange={(e) => setLastName(e.target.value)}
//                     onChange={(e) =>
//                       setContact((prev) => ({
//                         ...prev,
//                         lastName: e.target.value,
//                       }))
//                     }
//                     placeholder="Thangaraj"
//                     className="w-full px-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                   />
//                 </div>
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
//                 <div className="relative">
//                   <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                     <IoCallOutline className="w-4 h-4" />
//                   </div>
//                   <input
//                     type="tel"
//                     id="phone"
//                     value={contact.phone}
//                     onChange={(e) =>
//                       setContact((prev) => ({ ...prev, phone: e.target.value }))
//                     }
//                     placeholder="12345-12345"
//                     className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                   />
//                 </div>
//               </div>

//               {/* Email */}
//               <div className="group">
//                 <label
//                   htmlFor="email"
//                   className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                 >
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                     <IoMailOutline className="w-4 h-4" />
//                   </div>
//                   <input
//                     type="email"
//                     id="email"
//                     value={contact.email}
//                     // onChange={(e) => setEmail(e.target.value)}
//                     onChange={(e) =>
//                       setContact((prev) => ({ ...prev, email: e.target.value }))
//                     }
//                     placeholder="youremail@example.com"
//                     className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Job Title */}
//             <div className={`grid gap-6 mb-6               `}>
//               <div className="mb-6">
//                 <label
//                   htmlFor="jobTitle"
//                   className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                 >
//                   Desired job title
//                 </label>

//                 <div className="relative">
//                   <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                     <GrUserWorker className="w-4 h-4" />
//                   </div>
//                   <input
//                     type="text"
//                     id="jobTitle"
//                     value={contact.jobTitle}
//                     onChange={(e) =>
//                       setContact((prev) => ({
//                         ...prev,
//                         jobTitle: e.target.value,
//                       }))
//                     }
//                     placeholder="Software Engineer"
//                     className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Toggle Button - More Compact */}
//             <button
//               type="button"
//               onClick={() => setShowAdditional(!showAdditional)}
//               className="w-full p-3 flex items-center justify-between bg-white hover:from-gray-100/80 hover:to-white transition-all duration-300 group rounded-xl"
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

//             {/* Additional Information Section - Compact */}
//             <div className="bg-linear-to-br from-gray-50/50 to-white/50 rounded-xl border border-gray-100 overflow-hidden">
//               <div
//                 className={`transition-all duration-500 ease-in-out ${
//                   showAdditional ? "max-h-500 opacity-100" : "max-h-0 opacity-0"
//                 }`}
//               >
//                 <div className="p-3 sm:p-4  space-y-4">
//                   {/* LinkedIn & Portfolio - Compact */}
//                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
//                     <div className="group">
//                       <label
//                         htmlFor="LinkedIn"
//                         className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                       >
//                         LinkedIn Profile
//                       </label>
//                       <div className="relative">
//                         <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                           <FaLinkedin className="w-4 h-4" />
//                         </div>
//                         <input
//                           type="url"
//                           id="LinkedIn"
//                           value={contact.linkedin}
//                           // onChange={(e) => setLinkedin(e.target.value)}
//                           onChange={(e) =>
//                             setContact((prev) => ({
//                               ...prev,
//                               linkedin: e.target.value,
//                             }))
//                           }
//                           placeholder="linkedin.com"
//                           className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                         />
//                       </div>
//                     </div>

//                     <div className="group">
//                       <label
//                         htmlFor="Portfolio"
//                         className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                       >
//                         Portfolio / Website
//                       </label>
//                       <div className="relative">
//                         <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                           <FaGlobeAmericas className="w-4 h-4" />
//                         </div>
//                         <input
//                           type="text"
//                           id="Portfolio"
//                           value={contact.portfolio}
//                           // onChange={(e) => setPortfolio(e.target.value)}
//                           onChange={(e) =>
//                             setContact((prev) => ({
//                               ...prev,
//                               portfolio: e.target.value,
//                             }))
//                           }
//                           placeholder="yourportfolio.com"
//                           className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
//                     {/* Address */}
//                     <div className="group">
//                       <label
//                         htmlFor="Address"
//                         className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                       >
//                         Full Address
//                       </label>
//                       <div className="relative">
//                         <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                           <IoLocationOutline className="w-4 h-4" />
//                         </div>
//                         <input
//                           type="text"
//                           id="Address"
//                           value={contact.address}
//                           // onChange={(e) => setAddress(e.target.value)}
//                           onChange={(e) =>
//                             setContact((prev) => ({
//                               ...prev,
//                               address: e.target.value,
//                             }))
//                           }
//                           placeholder="123 Main Street, Apt 4B"
//                           className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                         />
//                       </div>
//                     </div>

//                     <div className="group">
//                       <label
//                         htmlFor="Post"
//                         className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                       >
//                         Postal Code
//                       </label>
//                       <div className="relative">
//                         <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                           <svg
//                             className="w-4 h-4"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
//                             />
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M9 22V12h6v10"
//                             />
//                           </svg>
//                         </div>
//                         <input
//                           type="text"
//                           id="Post"
//                           value={contact.postcode}
//                           // onChange={(e) => setPostcode(e.target.value)}
//                           onChange={(e) =>
//                             setContact((prev) => ({
//                               ...prev,
//                               postcode: e.target.value,
//                             }))
//                           }
//                           placeholder="10001"
//                           className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Location Information - Compact */}
//                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
//                     <div className="group">
//                       <label
//                         htmlFor="Country"
//                         className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                       >
//                         Country
//                       </label>
//                       <div className="relative">
//                         <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                           <IoGlobeOutline className="w-4 h-4" />
//                         </div>
//                         <input
//                           type="text"
//                           id="Country"
//                           value={contact.country}
//                           // onChange={(e) => setCountry(e.target.value)}
//                           onChange={(e) =>
//                             setContact((prev) => ({
//                               ...prev,
//                               country: e.target.value,
//                             }))
//                           }
//                           placeholder="United States"
//                           className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                         />
//                       </div>
//                     </div>

//                     <div className="group">
//                       <label
//                         htmlFor="City"
//                         className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                       >
//                         City
//                       </label>
//                       <div className="relative">
//                         <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                           <IoLocationOutline className="w-4 h-4" />
//                         </div>
//                         <input
//                           type="text"
//                           id="City"
//                           value={contact.city}
//                           // onChange={(e) => setCity(e.target.value)}
//                           onChange={(e) =>
//                             setContact((prev) => ({
//                               ...prev,
//                               city: e.target.value,
//                             }))
//                           }
//                           placeholder="New York"
//                           className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>

//         {/* Fixed Footer - Always visible at bottom */}
//         <div className="shrink-0 pt-4 mt-4 border-t border-gray-200">
//           <div className="flex justify-between">
//             <button
//               className="bg-gray-200 text-[#374151] border border-gray-300 text-sm md:text-base px-4 py-2 md:px-6 md:py-2.5 rounded-lg font-nunito font-semibold hover:bg-gray-100 transition-colors duration-300"
//               onClick={() => router.push("/choose-template")}
//             >
//               Back
//             </button>

//             <button
//               className="bg-red-600 hover:bg-red-700 text-white text-sm md:text-base px-4 py-2 md:px-6 md:py-2.5 rounded-lg font-nunito font-semibold transition-colors duration-300"
//               onClick={() => router.push("/resume-details/experience")}
//             >
//               Next Experience
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contact_form;

// "use client";

// import React, { useContext, useState, useCallback, useEffect, useRef } from "react";
// import Cropper from "react-easy-crop";
// import { useDropzone } from "react-dropzone";
// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import {
//   IoPersonOutline,
//   IoCloudUploadOutline,
//   IoClose,
//   IoChevronDown,
//   IoCallOutline,
//   IoMailOutline,
//   IoGlobeOutline,
//   IoLocationOutline,
//   IoInformationCircleOutline,
// } from "react-icons/io5";import { GrUserWorker } from "react-icons/gr";
// import { FiTrash2 } from "react-icons/fi";
// import { FaLinkedin, FaGlobeAmericas } from "react-icons/fa";
// import "primereact/resources/themes/lara-light-indigo/theme.css";
// import "primereact/resources/primereact.min.css";
// import { API_URL } from "@/app/config/api";
// import { CreateContext } from "@/app/context/CreateContext";
// import Stepper from "../../../components/resume/Steppers";
// import { getLocalStorage, setLocalStorage } from "@/app/utils";
// import { Template, FullResumeData } from "@/app/types";
// import { User } from "@/app/types/user.types";
// // import { toast } from "react-toastify";

// // Define the getCroppedImgWithOptions function if not imported
// const getCroppedImgWithOptions = async (
//   imageSrc: string,
//   crop: any,
//   outputType: string
// ): Promise<string> => {
//   // This is a placeholder - you need to implement this or import from your utils
//   // For now, returning the original image
//   return imageSrc;
// };

// const Contact_form = () => {
//   const router = useRouter();

//   const userDetails = getLocalStorage<User>("user_details");
//   const userId = userDetails?.id;
//   const chosenResumeDetails = getLocalStorage<Template>("chosenTemplate");
//   const { contact, setContact, fullResumeData, setFullResumeData } = useContext(CreateContext);

//   const [showAdditional, setShowAdditional] = useState<boolean>(false);
//   const [open, setOpen] = useState(false);
//   const [imageSrc, setImageSrc] = useState<string | null>(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
//   const [isSaving, setIsSaving] = useState<boolean>(false);
//   const [lastSavedData, setLastSavedData] = useState<string>("");
//   const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   // Helper function to update fullResumeData safely
//   const updateFullResumeData = useCallback((updatedContact: typeof contact) => {
//     if (fullResumeData) {
//       // If fullResumeData exists, update it
//       const updatedFullData = {
//         ...fullResumeData,
//         contact: updatedContact
//       };
//       setFullResumeData(updatedFullData);
//       setLocalStorage("fullResumeData", updatedFullData);
//     } else {
//       // If fullResumeData doesn't exist, create a new one
//       const newFullResumeData: FullResumeData = {
//         template: chosenResumeDetails || null,
//         contact: updatedContact,
//         experiences: [],
//         education: [],
//         skills: [],
//         summary: "",
//         finalize: {}
//       };
//       setFullResumeData(newFullResumeData);
//       setLocalStorage("fullResumeData", newFullResumeData);
//     }
//   }, [fullResumeData, chosenResumeDetails, setFullResumeData]);

//   const fetchContact = async () => {
//     try {
//       const response = await axios.get(
//         `${API_URL}/api/contact-resume/get-contact/${userId}`,
//         {
//           params: {
//             resumeId: chosenResumeDetails?.id,
//           },
//         },
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

//       // Update fullResumeData safely
//       updateFullResumeData(updatedContact);

//       setLastSavedData(JSON.stringify(updatedContact));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchContact();
//   }, []);

//   // Save to localStorage whenever contact changes
//   useEffect(() => {
//     // Only update if contact has meaningful data (not just initial empty state)
//     if (contact.firstName || contact.lastName || contact.email) {
//       updateFullResumeData(contact);
//     }
//   }, [contact, updateFullResumeData]);

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

//     // Check if data has changed from last saved
//     const currentDataString = JSON.stringify(contactData);
//     if (currentDataString === lastSavedData) {
//       return true; // No changes to save
//     }

//     setIsSaving(true);

//     try {
//       const fd = new FormData();

//       fd.append("userId", userId);
//       fd.append("firstName", contactData.firstName || "");
//       fd.append("lastName", contactData.lastName || "");
//       fd.append("email", contactData.email || "");
//       fd.append(
//         "jobTitle",
//         contactData.jobTitle?.length > 0 ? contactData.jobTitle : "",
//       );
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

//       // Only append photo if it's a new image (blob or base64)
//       if (contactData.croppedImage &&
//           (contactData.croppedImage.startsWith("blob:") ||
//            contactData.croppedImage.startsWith("data:image"))) {
//         let fileImage;

//         if (contactData.croppedImage.startsWith("blob:")) {
//           fileImage = await blobUrlToFile(contactData.croppedImage, "profile.jpg");
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
//           params: { userId: userId, templateId: chosenResumeDetails?.id },
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         },
//       );

//       // Update last saved data
//       setLastSavedData(currentDataString);

//       // Show success message (optional)
//       // toast.success("Contact saved successfully.");

//       return true;
//     } catch (err) {
//       console.error("Error saving contact:", err);
//       // toast.error("Failed to save contact.");
//       return false;
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // Debounced save function using setTimeout
//   const debouncedSave = useCallback((contactData: typeof contact) => {
//     // Clear any existing timeout
//     if (saveTimeoutRef.current) {
//       clearTimeout(saveTimeoutRef.current);
//     }

//     // Set a new timeout
//     saveTimeoutRef.current = setTimeout(() => {
//       saveToAPI(contactData);
//     }, 1000); // Wait 1 second after last typing
//   }, []);

//   // Handle input changes with auto-save
//   const handleContactChange = (field: keyof typeof contact, value: string) => {
//     // Update local state
//     setContact((prev) => {
//       const updated = { ...prev, [field]: value };

//       // Trigger debounced API save
//       debouncedSave(updated);

//       return updated;
//     });
//   };

//   // Handle immediate save for specific actions (like blur)
//   const handleBlur = () => {
//     // Clear any pending timeout
//     if (saveTimeoutRef.current) {
//       clearTimeout(saveTimeoutRef.current);
//     }
//     // Save immediately
//     saveToAPI(contact);
//   };

//   // Cleanup timeout on unmount
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

//   const { getRootProps, getInputProps } = useDropzone({
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

//       // Update contact with new cropped image
//       setContact((prev) => {
//         const updated = { ...prev, croppedImage: croppedBlob as string };

//         // Save to API immediately for photo
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
//       saveToAPI(updated); // Save immediately
//       return updated;
//     });
//   };

//   return (
//     <section className="relative h-screen overflow-hidden">
//       <div className="p-3 md:p-4 lg:p-5 bg-white shadow-soft h-full flex flex-col">
//         <Stepper />

//         {/* Scrollable Form Content */}
//         <div className="flex-1 overflow-y-auto pb-5 mt-3">
//           <div className="flex items-center justify-between gap-2 sm:gap-3 mb-2">
//             <div className="flex items-center gap-2">
//               <div className="p-1.5 sm:p-2 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
//                 <IoPersonOutline className="w-5 h-5 sm:w-6 sm:h-6 text-[#c40116]" />
//               </div>
//               <h1 className="text-xl sm:text-2xl font-semibold bg-linear-to-r from-[#5e000b] to-[#c40116] bg-clip-text text-transparent">
//                 Contact Details
//               </h1>
//             </div>

//             {/* Auto-save indicator */}
//             {isSaving && (
//               <div className="flex items-center gap-2 text-xs text-gray-500">
//                 <div className="w-3 h-3 border-2 border-gray-300 border-t-[#c40116] rounded-full animate-spin"></div>
//                 <span>Saving...</span>
//               </div>
//             )}
//           </div>

//           <p className="text-gray-600 text-xs sm:text-sm font-medium">
//             Add your up-to-date contact information so employers and recruiters
//             can easily reach you.
//           </p>

//           <form className="space-y-5 sm:space-y-6 bg-[#f3f4f6]/80 p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl ">
//             {/* Profile Photo Section */}
//             {(chosenResumeDetails?.pic === "true" || contact.croppedImage) && (
//               <div className="bg-linear-to-r from-gray-50 to-white p-3 sm:p-4 rounded-xl border border-gray-100 shadow-subtle">
//                 <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
//                   {contact.croppedImage ? (
//                     <div className="relative group self-start">
//                       <div className="absolute inset-0 bg-linear-to-r from-[#c40116]/20 to-[#be0117]/20 rounded-xl blur-md group-hover:blur-lg transition-all duration-300"></div>
//                       {contact.croppedImage.startsWith("blob:") ||
//                       contact.croppedImage.startsWith("data:") ? (
//                         // eslint-disable-next-line @next/next/no-img-element
//                         <img
//                           src={contact.croppedImage}
//                           alt="Profile"
//                           className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
//                           onClick={(e) => e.preventDefault()}
//                         />
//                       ) : (
//                         // eslint-disable-next-line @next/next/no-img-element
//                         <img
//                           src={`${API_URL}/api/uploads/photos/${contact.croppedImage}`}
//                           alt="Profile"
//                           className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
//                           onClick={(e) => e.preventDefault()}
//                         />
//                       )}
//                     </div>
//                   ) : (
//                     <div
//                       className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-200 hover:border-[#c40116] hover:from-[#c40116]/10 hover:to-[#be0117]/10 transition-all duration-300 group self-start"
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
//                       <button
//                         type="button"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           setOpen(true);
//                         }}
//                         className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-linear-to-r from-[#c40116] to-[#be0117] text-white text-xs font-medium rounded-lg hover:shadow-lg hover:shadow-[#c40116]/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex-1 sm:flex-none"
//                       >
//                         <IoCloudUploadOutline className="w-3.5 h-3.5" />
//                         <span className="whitespace-nowrap">Upload Photo</span>
//                       </button>

//                       <button
//                         type="button"
//                         onClick={handleDeletePhoto}
//                         className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-linear-to-r from-gray-100 to-gray-50 text-gray-700 text-xs font-medium rounded-lg border border-gray-200 hover:border-[#c40116] hover:text-[#c40116] hover:shadow-md transition-all duration-200 flex-1 sm:flex-none"
//                       >
//                         <FiTrash2 className="w-3.5 h-3.5" />
//                         <span className="whitespace-nowrap">Delete Photo</span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Photo Upload Modal */}
//             {open && (
//               <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto"
//                 >
//                   <div className="p-4 sm:p-5">
//                     <div className="flex items-center justify-between mb-4">
//                       <h2 className="text-lg font-semibold text-gray-800">
//                         Upload Profile Photo
//                       </h2>
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setImageSrc(null);
//                           setOpen(false);
//                         }}
//                         className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
//                       >
//                         <IoClose className="w-5 h-5 text-gray-500" />
//                       </button>
//                     </div>

//                     {/* Dropzone Area */}
//                     {!imageSrc ? (
//                       <div
//                         {...getRootProps()}
//                         className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-[#c40116] hover:bg-gray-50/50 transition-all duration-300"
//                       >
//                         <input {...getInputProps()} />
//                         <div className="flex flex-col items-center justify-center gap-3">
//                           <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 flex items-center justify-center">
//                             <IoCloudUploadOutline className="w-6 h-6 text-[#c40116]" />
//                           </div>
//                           <div>
//                             <p className="text-sm font-medium text-gray-700 mb-1">
//                               Drag & drop your photo here
//                             </p>
//                             <p className="text-xs text-gray-500">
//                               or click to browse (JPG, PNG, WEBP)
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="space-y-4">
//                         <div className="relative h-64 w-full bg-gray-100 rounded-xl overflow-hidden">
//                           <Cropper
//                             image={imageSrc}
//                             crop={crop}
//                             zoom={zoom}
//                             aspect={1}
//                             onCropChange={setCrop}
//                             onZoomChange={setZoom}
//                             onCropComplete={onCropComplete}
//                           />
//                         </div>

//                         <div className="space-y-3">
//                           <div>
//                             <label className="block text-xs font-medium text-gray-700 mb-1">
//                               Zoom
//                             </label>
//                             <input
//                               type="range"
//                               min={1}
//                               max={3}
//                               step={0.1}
//                               value={zoom}
//                               onChange={(e) =>
//                                 setZoom(parseFloat(e.target.value))
//                               }
//                               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                             />
//                           </div>

//                           <div className="flex gap-2">
//                             <button
//                               type="button"
//                               onClick={() => {
//                                 setImageSrc(null);
//                                 setCrop({ x: 0, y: 0 });
//                                 setZoom(1);
//                               }}
//                               className="flex-1 px-4 py-2.5 bg-linear-to-r from-gray-100 to-gray-50 text-gray-700 text-sm font-medium rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
//                             >
//                               Cancel
//                             </button>
//                             <button
//                               type="button"
//                               onClick={handleCropSave}
//                               className="flex-1 px-4 py-2.5 bg-linear-to-r from-[#c40116] to-[#be0117] text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-[#c40116]/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
//                             >
//                               Save Photo
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </motion.div>
//               </div>
//             )}

//             {/* Name Section */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//               {/* First Name */}
//               <div className="group">
//                 <label
//                   htmlFor="firstName"
//                   className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                 >
//                   First Name
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     id="firstName"
//                     value={contact.firstName}
//                     onChange={(e) => handleContactChange("firstName", e.target.value)}
//                     onBlur={handleBlur}
//                     placeholder="Yuvaraj"
//                     className="w-full px-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                   />
//                 </div>
//               </div>

//               {/* Last Name */}
//               <div className="group">
//                 <label
//                   htmlFor="lastName"
//                   className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                 >
//                   Last Name
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     id="lastName"
//                     value={contact.lastName}
//                     onChange={(e) => handleContactChange("lastName", e.target.value)}
//                     onBlur={handleBlur}
//                     placeholder="Thangaraj"
//                     className="w-full px-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Phone + Email */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//               {/* Phone */}
//               <div className="group">
//                 <label
//                   htmlFor="phone"
//                   className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                 >
//                   Phone Number
//                 </label>
//                 <div className="relative">
//                   <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                     <IoCallOutline className="w-4 h-4" />
//                   </div>
//                   <input
//                     type="tel"
//                     id="phone"
//                     value={contact.phone}
//                     onChange={(e) => handleContactChange("phone", e.target.value)}
//                     onBlur={handleBlur}
//                     placeholder="12345-12345"
//                     className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                   />
//                 </div>
//               </div>

//               {/* Email */}
//               <div className="group">
//                 <label
//                   htmlFor="email"
//                   className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                 >
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                     <IoMailOutline className="w-4 h-4" />
//                   </div>
//                   <input
//                     type="email"
//                     id="email"
//                     value={contact.email}
//                     onChange={(e) => handleContactChange("email", e.target.value)}
//                     onBlur={handleBlur}
//                     placeholder="youremail@example.com"
//                     className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Job Title */}
//             <div>
//               <label
//                 htmlFor="jobTitle"
//                 className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//               >
//                 Desired job title
//               </label>
//               <div className="relative">
//                 <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                   <GrUserWorker className="w-4 h-4" />
//                 </div>
//                 <input
//                   type="text"
//                   id="jobTitle"
//                   value={contact.jobTitle}
//                   onChange={(e) => handleContactChange("jobTitle", e.target.value)}
//                   onBlur={handleBlur}
//                   placeholder="Software Engineer"
//                   className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                 />
//               </div>
//             </div>

//             {/* Toggle Button */}
//             <button
//               type="button"
//               onClick={() => setShowAdditional(!showAdditional)}
//               className="w-full p-3 flex items-center justify-between bg-white hover:from-gray-100/80 hover:to-white transition-all duration-300 group rounded-xl"
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

//             {/* Additional Information Section */}
//             <div className="bg-linear-to-br from-gray-50/50 to-white/50 rounded-xl border border-gray-100 overflow-hidden">
//               <div
//                 className={`transition-all duration-500 ease-in-out ${
//                   showAdditional ? "max-h-500 opacity-100" : "max-h-0 opacity-0"
//                 }`}
//               >
//                 <div className="p-3 sm:p-4 space-y-4">
//                   {/* LinkedIn & Portfolio */}
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                     <div className="group">
//                       <label
//                         htmlFor="LinkedIn"
//                         className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                       >
//                         LinkedIn Profile
//                       </label>
//                       <div className="relative">
//                         <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                           <FaLinkedin className="w-4 h-4" />
//                         </div>
//                         <input
//                           type="url"
//                           id="LinkedIn"
//                           value={contact.linkedin}
//                           onChange={(e) => handleContactChange("linkedin", e.target.value)}
//                           onBlur={handleBlur}
//                           placeholder="linkedin.com/in/yourprofile"
//                           className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                         />
//                       </div>
//                     </div>

//                     <div className="group">
//                       <label
//                         htmlFor="Portfolio"
//                         className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                       >
//                         Portfolio / Website
//                       </label>
//                       <div className="relative">
//                         <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                           <FaGlobeAmericas className="w-4 h-4" />
//                         </div>
//                         <input
//                           type="text"
//                           id="Portfolio"
//                           value={contact.portfolio}
//                           onChange={(e) => handleContactChange("portfolio", e.target.value)}
//                           onBlur={handleBlur}
//                           placeholder="yourportfolio.com"
//                           className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Address and Postal Code */}
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                     {/* Address */}
//                     <div className="group">
//                       <label
//                         htmlFor="Address"
//                         className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                       >
//                         Full Address
//                       </label>
//                       <div className="relative">
//                         <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                           <IoLocationOutline className="w-4 h-4" />
//                         </div>
//                         <input
//                           type="text"
//                           id="Address"
//                           value={contact.address}
//                           onChange={(e) => handleContactChange("address", e.target.value)}
//                           onBlur={handleBlur}
//                           placeholder="123 Main Street, Apt 4B"
//                           className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                         />
//                       </div>
//                     </div>

//                     <div className="group">
//                       <label
//                         htmlFor="Post"
//                         className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                       >
//                         Postal Code
//                       </label>
//                       <div className="relative">
//                         <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                           <svg
//                             className="w-4 h-4"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
//                             />
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M9 22V12h6v10"
//                             />
//                           </svg>
//                         </div>
//                         <input
//                           type="text"
//                           id="Post"
//                           value={contact.postcode}
//                           onChange={(e) => handleContactChange("postcode", e.target.value)}
//                           onBlur={handleBlur}
//                           placeholder="10001"
//                           className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Country and City */}
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                     <div className="group">
//                       <label
//                         htmlFor="Country"
//                         className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                       >
//                         Country
//                       </label>
//                       <div className="relative">
//                         <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                           <IoGlobeOutline className="w-4 h-4" />
//                         </div>
//                         <input
//                           type="text"
//                           id="Country"
//                           value={contact.country}
//                           onChange={(e) => handleContactChange("country", e.target.value)}
//                           onBlur={handleBlur}
//                           placeholder="United States"
//                           className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                         />
//                       </div>
//                     </div>

//                     <div className="group">
//                       <label
//                         htmlFor="City"
//                         className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                       >
//                         City
//                       </label>
//                       <div className="relative">
//                         <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                           <IoLocationOutline className="w-4 h-4" />
//                         </div>
//                         <input
//                           type="text"
//                           id="City"
//                           value={contact.city}
//                           onChange={(e) => handleContactChange("city", e.target.value)}
//                           onBlur={handleBlur}
//                           placeholder="New York"
//                           className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>

//         {/* Fixed Footer */}
//         <div className="shrink-0 pt-4 mt-4 border-t border-gray-200">
//           <div className="flex justify-between">
//             <button
//               className="bg-gray-200 text-[#374151] border border-gray-300 text-sm md:text-base px-4 py-2 md:px-6 md:py-2.5 rounded-lg font-nunito font-semibold hover:bg-gray-100 transition-colors duration-300"
//               onClick={() => router.push("/choose-template")}
//             >
//               Back
//             </button>

//             <button
//               className="bg-red-600 hover:bg-red-700 text-white text-sm md:text-base px-4 py-2 md:px-6 md:py-2.5 rounded-lg font-nunito font-semibold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//               onClick={() => {
//                 // Clear any pending timeout
//                 if (saveTimeoutRef.current) {
//                   clearTimeout(saveTimeoutRef.current);
//                 }
//                 // Save immediately before navigation
//                 saveToAPI(contact).then(() => {
//                   router.push("/resume-details/experience");
//                 });
//               }}
//               disabled={isSaving}
//             >
//               {isSaving ? "Saving..." : "Next Experience"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contact_form;

// ////////////////////////////////////////////////////////////////////////////////

// "use client";

// import React, {
//   useContext,
//   useState,
//   useCallback,
//   useEffect,
//   useRef,
//   useMemo,
// } from "react";
// import Cropper from "react-easy-crop";
// import { useDropzone } from "react-dropzone";
// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import {
//   IoPersonOutline,
//   IoCloudUploadOutline,
//   IoClose,
//   IoChevronDown,
//   IoCallOutline,
//   IoMailOutline,
//   IoGlobeOutline,
//   IoLocationOutline,
//   IoInformationCircleOutline,
// } from "react-icons/io5";
// import { GrUserWorker } from "react-icons/gr";
// import { FiTrash2 } from "react-icons/fi";
// import { FaLinkedin, FaGlobeAmericas } from "react-icons/fa";
// import "primereact/resources/themes/lara-light-indigo/theme.css";
// import "primereact/resources/primereact.min.css";
// import { API_URL } from "@/app/config/api";
// import { CreateContext } from "@/app/context/CreateContext";
// import Stepper from "../../../components/resume/Steppers";
// import { getLocalStorage, setLocalStorage } from "@/app/utils";
// import { Template, FullResumeData } from "@/app/types";
// import { User } from "@/app/types/user.types";

// const getCroppedImgWithOptions = async (
//   imageSrc: string,
//   crop: any,
//   outputType: string,
// ): Promise<string> => {
//   // This is a placeholder - you need to implement this or import from your utils
//   // For now, returning the original image
//   return imageSrc;
// };

// const Contactform = () => {
//   const router = useRouter();

//   const userDetails = getLocalStorage<User>("user_details");
//   const userId = userDetails?.id;
//   const chosenResumeDetails = getLocalStorage<Template>("chosenTemplate");
//   const { contact, setContact, fullResumeData, setFullResumeData } =
//     useContext(CreateContext);

//   const [showAdditional, setShowAdditional] = useState<boolean>(false);
//   const [open, setOpen] = useState(false);
//   const [imageSrc, setImageSrc] = useState<string | null>(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
//   const [isSaving, setIsSaving] = useState<boolean>(false);
//   const [lastSavedData, setLastSavedData] = useState<string>("");
//   const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   // Use a ref to track if this is the initial mount
//   const isInitialMount = useRef(true);

//   // Helper function to update fullResumeData safely - now with useCallback but with proper dependencies
//   const updateFullResumeData = useCallback(
//     (updatedContact: typeof contact) => {
//       if (fullResumeData) {
//         // If fullResumeData exists, update it
//         const updatedFullData = {
//           ...fullResumeData,
//           contact: updatedContact,
//         };
//         setFullResumeData(updatedFullData);
//         setLocalStorage("fullResumeData", updatedFullData);
//       } else {
//         // If fullResumeData doesn't exist, create a new one
//         const newFullResumeData: FullResumeData = {
//           template: chosenResumeDetails || null,
//           contact: updatedContact,
//           experiences: [],
//           education: [],
//           skills: [],
//           summary: "",
//           finalize: {},
//         };
//         setFullResumeData(newFullResumeData);
//         setLocalStorage("fullResumeData", newFullResumeData);
//       }
//     },
//     [fullResumeData, chosenResumeDetails, setFullResumeData],
//   ); // Added setFullResumeData to dependencies

//   const fetchContact = async () => {
//     try {
//       const response = await axios.get(
//         `${API_URL}/api/contact-resume/get-contact/${userId}`,
//         {
//           params: {
//             resumeId: chosenResumeDetails?.id,
//           },
//         },
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

//       // Update fullResumeData safely
//       updateFullResumeData(updatedContact);

//       setLastSavedData(JSON.stringify(updatedContact));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchContact();
//   }, []); // Empty dependency array - only run on mount

//   // Save to localStorage whenever contact changes - with proper condition to avoid infinite loop
//   useEffect(() => {
//     // Skip the first render to avoid unnecessary update
//     if (isInitialMount.current) {
//       isInitialMount.current = false;
//       return;
//     }

//     // Only update if contact has meaningful data (not just initial empty state)
//     // and if the contact has actually changed from the previous value
//     if (contact.firstName || contact.lastName || contact.email) {
//       // Use a timeout to break the potential cycle
//       const timeoutId = setTimeout(() => {
//         updateFullResumeData(contact);
//       }, 0);

//       return () => clearTimeout(timeoutId);
//     }
//   }, [contact, updateFullResumeData]); // Added updateFullResumeData to dependencies

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

//     // Check if data has changed from last saved
//     const currentDataString = JSON.stringify(contactData);
//     if (currentDataString === lastSavedData) {
//       return true; // No changes to save
//     }

//     setIsSaving(true);

//     try {
//       const fd = new FormData();

//       fd.append("userId", userId);
//       fd.append("firstName", contactData.firstName || "");
//       fd.append("lastName", contactData.lastName || "");
//       fd.append("email", contactData.email || "");
//       fd.append(
//         "jobTitle",
//         contactData.jobTitle?.length > 0 ? contactData.jobTitle : "",
//       );
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

//       // Only append photo if it's a new image (blob or base64)
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
//           params: { userId: userId, templateId: chosenResumeDetails?.id },
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         },
//       );

//       // Update last saved data
//       setLastSavedData(currentDataString);

//       return true;
//     } catch (err) {
//       console.error("Error saving contact:", err);
//       return false;
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // Debounced save function using setTimeout - memoized to prevent recreation
//   const debouncedSave = useCallback((contactData: typeof contact) => {
//     // Clear any existing timeout
//     if (saveTimeoutRef.current) {
//       clearTimeout(saveTimeoutRef.current);
//     }

//     // Set a new timeout
//     saveTimeoutRef.current = setTimeout(() => {
//       saveToAPI(contactData);
//     }, 1000); // Wait 1 second after last typing
//   }, []); // Empty dependency array since it doesn't depend on any props/state

//   // Handle input changes with auto-save
//   const handleContactChange = (field: keyof typeof contact, value: string) => {
//     // Update local state
//     setContact((prev) => {
//       const updated = { ...prev, [field]: value };

//       // Trigger debounced API save
//       debouncedSave(updated);

//       return updated;
//     });
//   };

//   // Handle immediate save for specific actions (like blur)
//   const handleBlur = () => {
//     // Clear any pending timeout
//     if (saveTimeoutRef.current) {
//       clearTimeout(saveTimeoutRef.current);
//     }
//     // Save immediately
//     saveToAPI(contact);
//   };

//   // Cleanup timeout on unmount
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

//   const { getRootProps, getInputProps } = useDropzone({
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

//       // Update contact with new cropped image
//       setContact((prev) => {
//         const updated = { ...prev, croppedImage: croppedBlob as string };

//         // Save to API immediately for photo
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
//       saveToAPI(updated); // Save immediately
//       return updated;
//     });
//   };

//   return (
//     <section className="relative h-screen overflow-hidden">
//       <div className="p-3 md:p-4 lg:p-5 bg-white shadow-soft h-full flex flex-col">
//         <Stepper />

//         {/* Scrollable Form Content */}
//         <div className="flex-1 overflow-y-auto pb-5 mt-3">
//           <div className="flex items-center justify-between gap-2 sm:gap-3 mb-2">
//             <div className="flex items-center gap-2">
//               <div className="p-1.5 sm:p-2 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
//                 <IoPersonOutline className="w-5 h-5 sm:w-6 sm:h-6 text-[#c40116]" />
//               </div>
//               <h1 className="text-xl sm:text-2xl font-semibold bg-linear-to-r from-[#5e000b] to-[#c40116] bg-clip-text text-transparent">
//                 Contact Details
//               </h1>
//             </div>

//             {/* Auto-save indicator */}
//             {isSaving && (
//               <div className="flex items-center gap-2 text-xs text-gray-500">
//                 <div className="w-3 h-3 border-2 border-gray-300 border-t-[#c40116] rounded-full animate-spin"></div>
//                 <span>Saving...</span>
//               </div>
//             )}
//           </div>

//           <p className="text-gray-600 text-xs sm:text-sm font-medium">
//             Add your up-to-date contact information so employers and recruiters
//             can easily reach you.
//           </p>

//           <form className="space-y-5 sm:space-y-6 bg-[#f3f4f6]/80 p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl ">
//             {/* Profile Photo Section */}
//             {(chosenResumeDetails?.pic === "true" || contact.croppedImage) && (
//               <div className="bg-linear-to-r from-gray-50 to-white p-3 sm:p-4 rounded-xl border border-gray-100 shadow-subtle">
//                 <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
//                   {contact.croppedImage ? (
//                     <div className="relative group self-start">
//                       <div className="absolute inset-0 bg-linear-to-r from-[#c40116]/20 to-[#be0117]/20 rounded-xl blur-md group-hover:blur-lg transition-all duration-300"></div>
//                       {contact.croppedImage.startsWith("blob:") ||
//                       contact.croppedImage.startsWith("data:") ? (
//                         // eslint-disable-next-line @next/next/no-img-element
//                         <img
//                           src={contact.croppedImage}
//                           alt="Profile"
//                           className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
//                           onClick={(e) => e.preventDefault()}
//                         />
//                       ) : (
//                         // eslint-disable-next-line @next/next/no-img-element
//                         <img
//                           src={`${API_URL}/api/uploads/photos/${contact.croppedImage}`}
//                           alt="Profile"
//                           className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
//                           onClick={(e) => e.preventDefault()}
//                         />
//                       )}
//                     </div>
//                   ) : (
//                     <div
//                       className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-200 hover:border-[#c40116] hover:from-[#c40116]/10 hover:to-[#be0117]/10 transition-all duration-300 group self-start"
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
//                       <button
//                         type="button"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           setOpen(true);
//                         }}
//                         className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-linear-to-r from-[#c40116] to-[#be0117] text-white text-xs font-medium rounded-lg hover:shadow-lg hover:shadow-[#c40116]/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex-1 sm:flex-none"
//                       >
//                         <IoCloudUploadOutline className="w-3.5 h-3.5" />
//                         <span className="whitespace-nowrap">Upload Photo</span>
//                       </button>

//                       <button
//                         type="button"
//                         onClick={handleDeletePhoto}
//                         className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-linear-to-r from-gray-100 to-gray-50 text-gray-700 text-xs font-medium rounded-lg border border-gray-200 hover:border-[#c40116] hover:text-[#c40116] hover:shadow-md transition-all duration-200 flex-1 sm:flex-none"
//                       >
//                         <FiTrash2 className="w-3.5 h-3.5" />
//                         <span className="whitespace-nowrap">Delete Photo</span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Photo Upload Modal */}
//             {open && (
//               <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto"
//                 >
//                   <div className="p-4 sm:p-5">
//                     <div className="flex items-center justify-between mb-4">
//                       <h2 className="text-lg font-semibold text-gray-800">
//                         Upload Profile Photo
//                       </h2>
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setImageSrc(null);
//                           setOpen(false);
//                         }}
//                         className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
//                       >
//                         <IoClose className="w-5 h-5 text-gray-500" />
//                       </button>
//                     </div>

//                     {/* Dropzone Area */}
//                     {!imageSrc ? (
//                       <div
//                         {...getRootProps()}
//                         className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-[#c40116] hover:bg-gray-50/50 transition-all duration-300"
//                       >
//                         <input {...getInputProps()} />
//                         <div className="flex flex-col items-center justify-center gap-3">
//                           <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 flex items-center justify-center">
//                             <IoCloudUploadOutline className="w-6 h-6 text-[#c40116]" />
//                           </div>
//                           <div>
//                             <p className="text-sm font-medium text-gray-700 mb-1">
//                               Drag & drop your photo here
//                             </p>
//                             <p className="text-xs text-gray-500">
//                               or click to browse (JPG, PNG, WEBP)
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="space-y-4">
//                         <div className="relative h-64 w-full bg-gray-100 rounded-xl overflow-hidden">
//                           <Cropper
//                             image={imageSrc}
//                             crop={crop}
//                             zoom={zoom}
//                             aspect={1}
//                             onCropChange={setCrop}
//                             onZoomChange={setZoom}
//                             onCropComplete={onCropComplete}
//                           />
//                         </div>

//                         <div className="space-y-3">
//                           <div>
//                             <label className="block text-xs font-medium text-gray-700 mb-1">
//                               Zoom
//                             </label>
//                             <input
//                               type="range"
//                               min={1}
//                               max={3}
//                               step={0.1}
//                               value={zoom}
//                               onChange={(e) =>
//                                 setZoom(parseFloat(e.target.value))
//                               }
//                               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                             />
//                           </div>

//                           <div className="flex gap-2">
//                             <button
//                               type="button"
//                               onClick={() => {
//                                 setImageSrc(null);
//                                 setCrop({ x: 0, y: 0 });
//                                 setZoom(1);
//                               }}
//                               className="flex-1 px-4 py-2.5 bg-linear-to-r from-gray-100 to-gray-50 text-gray-700 text-sm font-medium rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
//                             >
//                               Cancel
//                             </button>
//                             <button
//                               type="button"
//                               onClick={handleCropSave}
//                               className="flex-1 px-4 py-2.5 bg-linear-to-r from-[#c40116] to-[#be0117] text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-[#c40116]/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
//                             >
//                               Save Photo
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </motion.div>
//               </div>
//             )}

//             {/* Name Section */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//               {/* First Name */}
//               <div className="group">
//                 <label
//                   htmlFor="firstName"
//                   className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                 >
//                   First Name
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     id="firstName"
//                     value={contact.firstName}
//                     onChange={(e) =>
//                       handleContactChange("firstName", e.target.value)
//                     }
//                     onBlur={handleBlur}
//                     placeholder="Yuvaraj"
//                     className="w-full px-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                   />
//                 </div>
//               </div>

//               {/* Last Name */}
//               <div className="group">
//                 <label
//                   htmlFor="lastName"
//                   className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                 >
//                   Last Name
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     id="lastName"
//                     value={contact.lastName}
//                     onChange={(e) =>
//                       handleContactChange("lastName", e.target.value)
//                     }
//                     onBlur={handleBlur}
//                     placeholder="Thangaraj"
//                     className="w-full px-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Phone + Email */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//               {/* Phone */}
//               <div className="group">
//                 <label
//                   htmlFor="phone"
//                   className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                 >
//                   Phone Number
//                 </label>
//                 <div className="relative">
//                   <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                     <IoCallOutline className="w-4 h-4" />
//                   </div>
//                   <input
//                     type="tel"
//                     id="phone"
//                     value={contact.phone}
//                     onChange={(e) =>
//                       handleContactChange("phone", e.target.value)
//                     }
//                     onBlur={handleBlur}
//                     placeholder="12345-12345"
//                     className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                   />
//                 </div>
//               </div>

//               {/* Email */}
//               <div className="group">
//                 <label
//                   htmlFor="email"
//                   className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                 >
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                     <IoMailOutline className="w-4 h-4" />
//                   </div>
//                   <input
//                     type="email"
//                     id="email"
//                     value={contact.email}
//                     onChange={(e) =>
//                       handleContactChange("email", e.target.value)
//                     }
//                     onBlur={handleBlur}
//                     placeholder="youremail@example.com"
//                     className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Job Title */}
//             <div>
//               <label
//                 htmlFor="jobTitle"
//                 className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//               >
//                 Desired job title
//               </label>
//               <div className="relative">
//                 <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                   <GrUserWorker className="w-4 h-4" />
//                 </div>
//                 <input
//                   type="text"
//                   id="jobTitle"
//                   value={contact.jobTitle}
//                   onChange={(e) =>
//                     handleContactChange("jobTitle", e.target.value)
//                   }
//                   onBlur={handleBlur}
//                   placeholder="Software Engineer"
//                   className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                 />
//               </div>
//             </div>

//             {/* Toggle Button */}
//             <button
//               type="button"
//               onClick={() => setShowAdditional(!showAdditional)}
//               className="w-full p-3 flex items-center justify-between bg-white hover:from-gray-100/80 hover:to-white transition-all duration-300 group rounded-xl"
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

//             {/* Additional Information Section */}
//             <div className="bg-linear-to-br from-gray-50/50 to-white/50 rounded-xl border border-gray-100 overflow-hidden">
//               <div
//                 className={`transition-all duration-500 ease-in-out ${
//                   showAdditional ? "max-h-500 opacity-100" : "max-h-0 opacity-0"
//                 }`}
//               >
//                 <div className="p-3 sm:p-4 space-y-4">
//                   {/* LinkedIn & Portfolio */}
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                     <div className="group">
//                       <label
//                         htmlFor="LinkedIn"
//                         className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                       >
//                         LinkedIn Profile
//                       </label>
//                       <div className="relative">
//                         <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                           <FaLinkedin className="w-4 h-4" />
//                         </div>
//                         <input
//                           type="url"
//                           id="LinkedIn"
//                           value={contact.linkedin}
//                           onChange={(e) =>
//                             handleContactChange("linkedin", e.target.value)
//                           }
//                           onBlur={handleBlur}
//                           placeholder="linkedin.com/in/yourprofile"
//                           className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                         />
//                       </div>
//                     </div>

//                     <div className="group">
//                       <label
//                         htmlFor="Portfolio"
//                         className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                       >
//                         Portfolio / Website
//                       </label>
//                       <div className="relative">
//                         <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                           <FaGlobeAmericas className="w-4 h-4" />
//                         </div>
//                         <input
//                           type="text"
//                           id="Portfolio"
//                           value={contact.portfolio}
//                           onChange={(e) =>
//                             handleContactChange("portfolio", e.target.value)
//                           }
//                           onBlur={handleBlur}
//                           placeholder="yourportfolio.com"
//                           className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Address and Postal Code */}
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                     {/* Address */}
//                     <div className="group">
//                       <label
//                         htmlFor="Address"
//                         className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                       >
//                         Full Address
//                       </label>
//                       <div className="relative">
//                         <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                           <IoLocationOutline className="w-4 h-4" />
//                         </div>
//                         <input
//                           type="text"
//                           id="Address"
//                           value={contact.address}
//                           onChange={(e) =>
//                             handleContactChange("address", e.target.value)
//                           }
//                           onBlur={handleBlur}
//                           placeholder="123 Main Street, Apt 4B"
//                           className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                         />
//                       </div>
//                     </div>

//                     <div className="group">
//                       <label
//                         htmlFor="Post"
//                         className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                       >
//                         Postal Code
//                       </label>
//                       <div className="relative">
//                         <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                           <svg
//                             className="w-4 h-4"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
//                             />
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M9 22V12h6v10"
//                             />
//                           </svg>
//                         </div>
//                         <input
//                           type="text"
//                           id="Post"
//                           value={contact.postcode}
//                           onChange={(e) =>
//                             handleContactChange("postcode", e.target.value)
//                           }
//                           onBlur={handleBlur}
//                           placeholder="10001"
//                           className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Country and City */}
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                     <div className="group">
//                       <label
//                         htmlFor="Country"
//                         className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                       >
//                         Country
//                       </label>
//                       <div className="relative">
//                         <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                           <IoGlobeOutline className="w-4 h-4" />
//                         </div>
//                         <input
//                           type="text"
//                           id="Country"
//                           value={contact.country}
//                           onChange={(e) =>
//                             handleContactChange("country", e.target.value)
//                           }
//                           onBlur={handleBlur}
//                           placeholder="United States"
//                           className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                         />
//                       </div>
//                     </div>

//                     <div className="group">
//                       <label
//                         htmlFor="City"
//                         className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
//                       >
//                         City
//                       </label>
//                       <div className="relative">
//                         <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                           <IoLocationOutline className="w-4 h-4" />
//                         </div>
//                         <input
//                           type="text"
//                           id="City"
//                           value={contact.city}
//                           onChange={(e) =>
//                             handleContactChange("city", e.target.value)
//                           }
//                           onBlur={handleBlur}
//                           placeholder="New York"
//                           className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>

//         {/* Fixed Footer */}
//         <div className="shrink-0 pt-4 mt-4 border-t border-gray-200">
//           <div className="flex justify-between">
//             <button
//               className="bg-gray-200 text-[#374151] border border-gray-300 text-sm md:text-base px-4 py-2 md:px-6 md:py-2.5 rounded-lg font-nunito font-semibold hover:bg-gray-100 transition-colors duration-300"
//               onClick={() => router.push("/choose-template")}
//             >
//               Back
//             </button>

//             <button
//               className="bg-red-600 hover:bg-red-700 text-white text-sm md:text-base px-4 py-2 md:px-6 md:py-2.5 rounded-lg font-nunito font-semibold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//               onClick={() => {
//                 // Clear any pending timeout
//                 if (saveTimeoutRef.current) {
//                   clearTimeout(saveTimeoutRef.current);
//                 }
//                 // Save immediately before navigation
//                 saveToAPI(contact).then(() => {
//                   router.push("/resume-details/experience");
//                 });
//               }}
//               disabled={isSaving}
//             >
//               {isSaving ? "Saving..." : "Next Experience"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contactform;

///////////////////////////////////////////////////////////////////////////////////

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
import { motion } from "framer-motion";
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
} from "react-icons/io5";
import { GrUserWorker } from "react-icons/gr";
import { FiTrash2 } from "react-icons/fi";
import { FaLinkedin, FaGlobeAmericas } from "react-icons/fa";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { API_URL } from "@/app/config/api";
import { CreateContext } from "@/app/context/CreateContext";
import Stepper from "../../../components/resume/Steppers";
import {
  getCroppedImgWithOptions,
  getLocalStorage,
  setLocalStorage,
} from "@/app/utils";
import { Template } from "@/app/types";
import { User } from "@/app/types/user.types";

const ContactForm = () => {
  const router = useRouter();

  const userDetails = getLocalStorage<User>("user_details");
  const userId = userDetails?.id;
  const chosenResumeDetails = getLocalStorage<Template>("chosenTemplate");
  const { contact, setContact, fullResumeData, setFullResumeData } =
    useContext(CreateContext);

  const [showAdditional, setShowAdditional] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [showPhotoViewer, setShowPhotoViewer] = useState<boolean>(false);

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Track initial load
  const initialLoadDone = useRef(false);

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

      // Mark initial load as complete
      initialLoadDone.current = true;
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchContact();
  }, []);

  useEffect(() => {
    // Don't save until initial data is loaded
    if (!initialLoadDone.current) return;

    // Check if we have existing data in localStorage or context
    const existingData = fullResumeData || getLocalStorage("fullResumeData");

    if (existingData) {
      // Update existing data
      setLocalStorage("fullResumeData", {
        ...existingData,
        contact: contact,
      });
    } else {
      // Create new data structure if nothing exists
      setLocalStorage("fullResumeData", {
        template: chosenResumeDetails || null,
        contact: contact,
        experiences: [],
        education: [],
        skills: [],
        summary: "",
        finalize: {},
      });
    }
  }, [contact, fullResumeData, chosenResumeDetails]);

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
      fd.append(
        "jobTitle",
        contactData.jobTitle?.length > 0 ? contactData.jobTitle : "",
      );
      fd.append("phone", contactData.phone || "");
      fd.append("country", contactData.country || "");
      fd.append("city", contactData.city || "");
      fd.append("address", contactData.address || "");
      fd.append("postCode", contactData.postcode || "");
      fd.append("linkedIn", contactData.linkedin || "");
      fd.append("portfolio", contactData.portfolio || "");

      if (chosenResumeDetails?.id) {
        fd.append("templateId", String(chosenResumeDetails.id));
      }

      if (
        contactData.croppedImage &&
        (contactData.croppedImage.startsWith("blob:") ||
          contactData.croppedImage.startsWith("data:image"))
      ) {
        let fileImage;

        if (contactData.croppedImage.startsWith("blob:")) {
          fileImage = await blobUrlToFile(
            contactData.croppedImage,
            "profile.jpg",
          );
        } else if (contactData.croppedImage.startsWith("data:image")) {
          fileImage = base64ToFile(contactData.croppedImage, "profile.jpg");
        }

        if (fileImage) {
          fd.append("photo", fileImage);
        }
      }

      const response = await axios.post(
        `${API_URL}/api/contact-resume/update`,
        fd,
        {
          params: { userId: userId, templateId: chosenResumeDetails?.id },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      fetchContact();
      return true;
    } catch (err) {
      console.error("Error saving contact:", err);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const debouncedSave = useCallback((contactData: typeof contact) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      saveToAPI(contactData);
    }, 1000);
  }, []);

  const handleContactChange = (field: keyof typeof contact, value: string) => {
    setContact((prev) => {
      const updated = { ...prev, [field]: value };
      debouncedSave(updated);
      return updated;
    });
  };

  const handleBlur = () => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveToAPI(contact);
  };

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

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
        const updated = { ...prev, croppedImage: croppedBlob as string };
        saveToAPI(updated);
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
      const updated = { ...prev, croppedImage: null };
      saveToAPI(updated);
      return updated;
    });
  };

  return (
    <section className="relative h-screen overflow-hidden">
      <div className="p-3 md:p-4 lg:p-5 bg-white shadow-soft h-full flex flex-col">
        <Stepper />

        {/* Photo Viewer Modal */}
        {showPhotoViewer && contact.croppedImage && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative max-w-3xl max-h-[80vh]"
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setShowPhotoViewer(false)}
                className="absolute -top-10 right-0 bg-black rounded text-white hover:text-gray-300 cursor-pointer transition-all duration-700 group p-2 x backdrop-blur-sm group "
              >
                <IoClose className="w-4 h-4 xs:w-5 xs:h-5 transition-all duration-700 group-hover:rotate-90" />
              </button>

              {/* Image */}
              {contact.croppedImage.startsWith("blob:") ||
              contact.croppedImage.startsWith("data:") ? (
                <img
                  src={contact.croppedImage}
                  alt="Profile"
                  className="max-w-full max-h-[50vh] rounded-lg object-contain"
                />
              ) : (
                <img
                  src={`${API_URL}/api/uploads/photos/${contact.croppedImage}`}
                  alt="Profile"
                  className="max-w-full max-h-[50vh] rounded-lg object-contain"
                />
              )}
            </motion.div>
          </div>
        )}


{/* Photo Upload Modal */}
            {open && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto"
                >
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-800">
                        Upload Profile Photo
                      </h2>
                      <button
                        type="button"
                        onClick={() => {
                          setImageSrc(null);
                          setOpen(false);
                        }}
                        className="p-1 bg-gray-200 rounded-lg transition-colors cursor-pointer"
                      >
                        <IoClose className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>

                    

                    {/* Dropzone Area */}
                    {!imageSrc ? (
                      <div
                        {...getRootProps()}
                        className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-[#c40116] hover:bg-gray-50/50 transition-all duration-300"
                      >
                        <input {...getInputProps()} />
                        <div className="flex flex-col items-center justify-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 flex items-center justify-center">
                            <IoCloudUploadOutline className="w-6 h-6 text-[#c40116]" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-1">
                              Drag & drop your photo here
                            </p>
                            <p className="text-xs text-gray-500">
                              or click to browse (JPG, PNG, WEBP)
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="relative h-64 w-full bg-gray-100 rounded-xl overflow-hidden">
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

                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Zoom
                            </label>
                            <input
                              type="range"
                              min={1}
                              max={3}
                              step={0.1}
                              value={zoom}
                              onChange={(e) =>
                                setZoom(parseFloat(e.target.value))
                              }
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
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
                              className="flex-1 px-4 py-2.5 bg-linear-to-r from-gray-100 to-gray-50 text-gray-700 text-sm font-medium rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={handleCropSave}
                              className="flex-1 px-4 py-2.5 bg-linear-to-r from-[#c40116] to-[#be0117] text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-[#c40116]/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                            >
                              Save Photo
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            )}

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto pb-5 mt-3">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="p-1.5 sm:p-2 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
              <IoPersonOutline className="w-5 h-5 sm:w-6 sm:h-6 text-[#c40116]" />
            </div>
            <h1 className="text-xl sm:text-2xl font-semibold bg-linear-to-r from-[#5e000b] to-[#c40116] bg-clip-text text-transparent">
              Contact Details
            </h1>
            {isSaving && (
              <span className="ml-auto text-xs text-gray-500">Saving...</span>
            )}
          </div>
          <p className="text-gray-600 text-xs sm:text-sm font-medium">
            Add your up-to-date contact information so employers and recruiters
            can easily reach you.
          </p>
          <form className="space-y-5 sm:space-y-6 bg-[#f3f4f6]/80 p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl ">
            {/* Profile Photo Section */}
            {chosenResumeDetails?.pic === "true" && (
              <div className="bg-linear-to-r from-gray-50 to-white p-3 sm:p-4 rounded-xl border border-gray-100 shadow-subtle">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                  {contact.croppedImage ? (
                    <div className="relative group self-start">
                      <div className="absolute inset-0 bg-linear-to-r from-[#c40116]/20 to-[#be0117]/20 rounded-xl blur-md group-hover:blur-lg transition-all duration-300"></div>

                      {/* Clickable Photo with View/Edit Options */}
                      <div className="relative">
                        {/* Main photo */}
                        {contact.croppedImage.startsWith("blob:") ||
                        contact.croppedImage.startsWith("data:") ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={contact.croppedImage}
                            alt="Profile"
                            className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border-2 border-white shadow-md cursor-pointer"
                          />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={`${API_URL}/api/uploads/photos/${contact.croppedImage}`}
                            alt="Profile"
                            className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border-2 border-white shadow-md cursor-pointer"
                          />
                        )}

                        {/* Hover overlay with actions */}
                        <div className="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowPhotoViewer(true);
                            }}
                            className="p-1 bg-white/20 rounded-lg cursor-pointer hover:bg-white/30 transition-colors"
                          >
                            <IoEyeOutline className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-200 hover:border-[#c40116] hover:from-[#c40116]/10 hover:to-[#be0117]/10 transition-all duration-300 group self-start"
                      onClick={(e) => {
                        e.preventDefault();
                        setOpen(true);
                      }}
                    >
                      <IoPersonOutline className="w-6 h-6 sm:w-7 sm:h-7 text-gray-400 group-hover:text-[#c40116] transition-colors" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      Profile Photo
                    </h3>
                    {/* <div className="flex flex-wrap gap-2"> */}
                    {/* <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setOpen(true);
                        }}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-linear-to-r from-[#c40116] to-[#be0117] text-white text-xs font-medium rounded-lg hover:shadow-lg hover:shadow-[#c40116]/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex-1 sm:flex-none"
                      >
                        <IoCloudUploadOutline className="w-3.5 h-3.5" />
                        <span className="whitespace-nowrap">Upload Photo</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeletePhoto();
                        }}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-linear-to-r from-gray-100 to-gray-50 text-gray-700 text-xs font-medium rounded-lg border border-gray-200 hover:border-[#c40116] hover:text-[#c40116] hover:shadow-md transition-all duration-200 flex-1 sm:flex-none"
                      >
                        <FiTrash2 className="w-3.5 h-3.5" />
                        <span className="whitespace-nowrap">Delete Photo</span>
                      </button> */}

                    {/* </div> */}

                    <div className="flex flex-wrap gap-2">
                      {!contact.croppedImage ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setOpen(true);
                          }}
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-linear-to-r from-[#c40116] to-[#be0117] text-white text-xs font-medium rounded-lg hover:shadow-lg hover:shadow-[#c40116]/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex-1 sm:flex-none"
                        >
                          <IoCloudUploadOutline className="w-3.5 h-3.5" />
                          <span className="whitespace-nowrap">
                            Upload Photo
                          </span>
                        </button>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setOpen(true);
                            }}
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-linear-to-r from-[#c40116] to-[#be0117] text-white text-xs font-medium rounded-lg hover:shadow-lg hover:shadow-[#c40116]/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex-1 sm:flex-none"
                          >
                            <IoPencilOutline className="w-3.5 h-3.5" />
                            <span className="whitespace-nowrap">
                              Change Photo
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              handleDeletePhoto();
                            }}
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-linear-to-r from-gray-100 to-gray-50 text-gray-700 text-xs font-medium rounded-lg border border-gray-200 hover:border-[#c40116] hover:text-[#c40116] hover:shadow-md transition-all duration-200 flex-1 sm:flex-none"
                          >
                            <FiTrash2 className="w-3.5 h-3.5" />
                            <span className="whitespace-nowrap">
                              Delete Photo
                            </span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            

            {/* Name Section - Compact for two columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              {/* First Name */}
              <div className="group">
                <label
                  htmlFor="firstName"
                  className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
                >
                  First Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="firstName"
                    value={contact.firstName}
                    onChange={(e) =>
                      handleContactChange("firstName", e.target.value)
                    }
                    onBlur={handleBlur}
                    placeholder="Yuvaraj"
                    className="w-full px-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Last Name */}
              <div className="group">
                <label
                  htmlFor="lastName"
                  className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
                >
                  Last Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="lastName"
                    value={contact.lastName}
                    onChange={(e) =>
                      handleContactChange("lastName", e.target.value)
                    }
                    onBlur={handleBlur}
                    placeholder="Thangaraj"
                    className="w-full px-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Phone + Email - Compact for two columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              {/* Phone */}
              <div className="group">
                <label
                  htmlFor="phone"
                  className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <IoCallOutline className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    value={contact.phone}
                    onChange={(e) =>
                      handleContactChange("phone", e.target.value)
                    }
                    onBlur={handleBlur}
                    placeholder="12345-12345"
                    className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="group">
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <IoMailOutline className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={contact.email}
                    onChange={(e) =>
                      handleContactChange("email", e.target.value)
                    }
                    onBlur={handleBlur}
                    placeholder="youremail@example.com"
                    className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Job Title */}
            <div className={`grid gap-6 mb-6               `}>
              <div className="mb-6">
                <label
                  htmlFor="jobTitle"
                  className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
                >
                  Desired job title
                </label>

                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <GrUserWorker className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    id="jobTitle"
                    value={contact.jobTitle}
                    onChange={(e) =>
                      handleContactChange("jobTitle", e.target.value)
                    }
                    onBlur={handleBlur}
                    placeholder="Software Engineer"
                    className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Toggle Button - More Compact */}
            <button
              type="button"
              onClick={() => setShowAdditional(!showAdditional)}
              className="w-full p-3 flex items-center justify-between bg-white hover:from-gray-100/80 hover:to-white transition-all duration-300 group rounded-xl"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`p-1.5 rounded-lg transition-all duration-300 ${
                    showAdditional
                      ? "bg-[#c40116]/10 text-[#c40116]"
                      : "bg-gray-100 text-gray-600 group-hover:bg-[#c40116]/10 group-hover:text-[#c40116]"
                  }`}
                >
                  <IoInformationCircleOutline className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-[#c40116] transition-colors whitespace-nowrap">
                  Additional Information
                </span>
              </div>
              <IoChevronDown
                className={`w-4 h-4 text-gray-500 group-hover:text-[#c40116] transition-all duration-300 ${
                  showAdditional ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Additional Information Section - Compact */}
            <div className="bg-linear-to-br from-gray-50/50 to-white/50 rounded-xl border border-gray-100 overflow-hidden">
              <div
                className={`transition-all duration-500 ease-in-out ${
                  showAdditional ? "max-h-500 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-3 sm:p-4  space-y-4">
                  {/* LinkedIn & Portfolio - Compact */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                    <div className="group">
                      <label
                        htmlFor="LinkedIn"
                        className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
                      >
                        LinkedIn Profile
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <FaLinkedin className="w-4 h-4" />
                        </div>
                        <input
                          type="url"
                          id="LinkedIn"
                          value={contact.linkedin}
                          onChange={(e) =>
                            handleContactChange("linkedin", e.target.value)
                          }
                          onBlur={handleBlur}
                          placeholder="linkedin.com"
                          className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label
                        htmlFor="Portfolio"
                        className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
                      >
                        Portfolio / Website
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <FaGlobeAmericas className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          id="Portfolio"
                          value={contact.portfolio}
                          onChange={(e) =>
                            handleContactChange("portfolio", e.target.value)
                          }
                          onBlur={handleBlur}
                          placeholder="yourportfolio.com"
                          className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                    {/* Address */}
                    <div className="group">
                      <label
                        htmlFor="Address"
                        className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
                      >
                        Full Address
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <IoLocationOutline className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          id="Address"
                          value={contact.address}
                          onChange={(e) =>
                            handleContactChange("address", e.target.value)
                          }
                          onBlur={handleBlur}
                          placeholder="123 Main Street, Apt 4B"
                          className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label
                        htmlFor="Post"
                        className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
                      >
                        Postal Code
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 22V12h6v10"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          id="Post"
                          value={contact.postcode}
                          onChange={(e) =>
                            handleContactChange("postcode", e.target.value)
                          }
                          onBlur={handleBlur}
                          placeholder="10001"
                          className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Location Information - Compact */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                    <div className="group">
                      <label
                        htmlFor="Country"
                        className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
                      >
                        Country
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <IoGlobeOutline className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          id="Country"
                          value={contact.country}
                          onChange={(e) =>
                            handleContactChange("country", e.target.value)
                          }
                          onBlur={handleBlur}
                          placeholder="United States"
                          className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label
                        htmlFor="City"
                        className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
                      >
                        City
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <IoLocationOutline className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          id="City"
                          value={contact.city}
                          onChange={(e) =>
                            handleContactChange("city", e.target.value)
                          }
                          onBlur={handleBlur}
                          placeholder="New York"
                          className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Fixed Footer - Always visible at bottom */}
        <div className="shrink-0 pt-4 mt-4 border-t border-gray-200">
          <div className="flex justify-between">
            <button
              className="bg-gray-200 text-[#374151] border border-gray-300 text-sm md:text-base px-4 py-2 md:px-6 md:py-2.5 rounded-lg font-nunito font-semibold hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
              onClick={() => router.push("/choose-template")}
            >
              Back
            </button>

            <button
              className="bg-red-600 hover:bg-red-700 text-white text-sm md:text-base px-4 py-2 md:px-6 md:py-2.5 rounded-lg font-nunito font-semibold transition-colors duration-300 cursor-pointer"
              onClick={() => {
                if (saveTimeoutRef.current) {
                  clearTimeout(saveTimeoutRef.current);
                }
                saveToAPI(contact).then(() => {
                  router.push("/resume-details/experience");
                });
              }}
            >
              Next Experience
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
