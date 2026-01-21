// import React, {
//   useContext,
//   useState,
//   useCallback,
//   useEffect,
//   forwardRef,
//   useImperativeHandle,
// } from "react";
// import { Dropdown } from "primereact/dropdown";
// import { CreateContext } from "../App";
// import Cropper from "react-easy-crop";
// import { useDropzone } from "react-dropzone";
// import { getCroppedImg } from "./cropImageUtils";
// import { motion, AnimatePresence } from "framer-motion";
// import { useLocation, useParams } from "react-router-dom";
// import axios from "axios";
// import { API_URL } from "../Config";
// import Swal from "sweetalert2";
// import { toast } from "react-toastify";
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
//   IoInformationCircleOutline
// } from "react-icons/io5";
// import { FiTrash2 } from "react-icons/fi";
// import { FaLinkedin, FaGlobeAmericas } from "react-icons/fa";

// const Contact_form = forwardRef((props, ref) => {
//   const [userLoggedIn, setUserLoggedIn] = useState("");

//   const Userid = userLoggedIn?.id || userLoggedIn?._id;

//   const location = useLocation();
//   const pic = location.state?.templateId.pic;

//   const templateId = location.state?.templateId.id;

//   const editid = location.state?.editid;

//   const { firstName, setFirstName } = useContext(CreateContext);
//   const { lastName, setLastName } = useContext(CreateContext);
//   const { jobTitle, setJobTitle } = useContext(CreateContext);

//   const { phone, setPhone } = useContext(CreateContext);
//   const { email, setEmail } = useContext(CreateContext);
//   const { tags, setTags } = useContext(CreateContext);
//   const { tones, setTones } = useContext(CreateContext);
//   const { address, setAddress } = useContext(CreateContext);

//   const { city, setCity } = useContext(CreateContext);
//   const { country, setCountry } = useContext(CreateContext);
//   const { postcode, setPostcode } = useContext(CreateContext);
//   const { linkedin, setLinkedin } = useContext(CreateContext);
//   const { portfolio, setPortfolio } = useContext(CreateContext);

//   const { croppedImage, setCroppedImage } = useContext(CreateContext);

//   const { contactid, setContactid } = useContext(CreateContext);

//   // console.log("usecontect", firstName)
//   // const [firstName, setFirstName] = useState("");
//   const [firstTouched, setFirstTouched] = useState(false);

//   // const [lastName, setLastName] = useState("");
//   const [lastTouched, setLastTouched] = useState(false);

//   // const [jobTitle, setJobTitle] = useState(null);
//   const [jobTouched, setJobTouched] = useState(false);

//   // const [phone, setPhone] = useState("");
//   const [phoneTouched, setPhoneTouched] = useState(false);

//   // const [email, setEmail] = useState("");
//   const [emailTouched, setEmailTouched] = useState(false);

//   // const [address, setAddress] = useState("");
//   const [addressTouched, setAddressTouched] = useState("");

//   // const [city, setCity] = useState("");
//   const [cityTouched, setCityTouched] = useState("");
//   // const [country, setCountry] = useState("");
//   const [countryTouched, setCountryTouched] = useState(false);
//   // const [postcode, setPostcode] = useState("");
//   const [postTouched, setPostTouched] = useState("");

//   const [linkedinTouched, setLinkedinTouched] = useState(false);

//   const [portfolioTouched, setPortfolioTouched] = useState(false);
//   const [showAdditional, setShowAdditional] = useState(false);

//   const isValid = (value, touched) => touched && value?.trim() !== "";
//   const [error, setErrors] = useState({});

//   const fixKeywords = (val) => {
//     if (!val) return [];

//     // Case 1: Entire array is a single string like:
//     // "[\"[\\\"[]\\\",\\\"Analysis\\\"]\",\"Compliance\",\"Variance\"]"
//     if (Array.isArray(val) && val.length === 1 && typeof val[0] === "string") {
//       try {
//         val = JSON.parse(val[0]); // Convert the string into array
//       } catch {
//         return [];
//       }
//     }

//     // Case 2: First element is again a stringified array:
//     // ["[\"[]\",\"Analysis\"]", "Compliance", "Variance"]
//     val = val.map((item) => {
//       try {
//         const parsed = JSON.parse(item);
//         if (Array.isArray(parsed)) {
//           // remove the "[]" and keep the real keyword
//           return parsed.filter((x) => x !== "[]")[0];
//         }
//         return parsed;
//       } catch {
//         return item; // not JSON, return as-is
//       }
//     });

//     return val;
//   };

//   const fetchContact = async () => {
//     const userdata = JSON.parse(localStorage.getItem("Resumnit_user"));

//     const userId = userdata?.id || userdata?._id;

//     setUserLoggedIn(userdata);
//     // console.log("userIdkududa",userId)
//     try {
//       const response = await axios.get(
//         `${API_URL}/api/contact-resume/get-contact/${userId}`,
//         {
//           params: {
//             resumeId: editid,
//           },
//         }
//       );
//       console.log(response.data);

//       const data = response.data[0] || response.data;

//       console.log("id ", data);

//       setContactid(data?._id);
//       setFirstName(data?.firstName || userLoggedIn?.firstName);
//       setLastName(data?.lastName || userLoggedIn?.lastName);
//       setJobTitle(data?.jobTitle || "");
//       setPhone(data?.phone || userLoggedIn?.phone);
//       setEmail(data?.email || userLoggedIn?.email);
//       // setTags(data?.keywords || []);
//       // setTones(data?.tones || []);
//       setTags(fixKeywords(data?.keywords));

//       setTones(fixKeywords(data?.tones));

//       setAddress(data?.address || "");
//       setCity(data?.city || userLoggedIn?.city);
//       setCountry(data?.country || userLoggedIn?.country);
//       setPostcode(data?.postCode || "");
//       setLinkedin(data?.linkedIn || "");
//       setPortfolio(data?.portfolio || "");
//       setCroppedImage(data?.photo || "");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchContact();
//   }, [Userid]);

//   const [jobData, setJobdata] = useState([]);
//   // console.log("jobData", jobData)

//   const fetchJobtitle = async () => {
//     try {
//       const response = await axios.get(
//         `${API_URL}/api/desired-job-title/desired-job-title`
//       );

//       console.log("jobtitle", response);

//       setJobdata(response.data?.data || []);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchJobtitle();
//   }, []);

//   const blobUrlToFile = async (blobUrl, fileName) => {
//     const response = await fetch(blobUrl);
//     const blob = await response.blob();
//     return new File([blob], fileName, { type: blob.type });
//   };

//   const handleSubmit = async (e) => {
//     if (e) e.preventDefault();

//     try {
//       const fd = new FormData();

//       fd.append("userId", Userid);
//       fd.append("firstName", firstName);
//       fd.append("lastName", lastName);
//       fd.append("email", email);
//       fd.append("jobTitle", jobTitle.length > 0 ? jobTitle : "");
//       fd.append("keywords", JSON.stringify(tags));
//       fd.append("tones", JSON.stringify(tones));
//       fd.append("phone", phone);
//       fd.append("country", country);
//       fd.append("city", city);
//       fd.append("address", address);
//       fd.append("postCode", postcode);
//       fd.append("linkedIn", linkedin);
//       fd.append("portfolio", portfolio);
//       fd.append("templateId", templateId);

//       // IMPORTANT — croppedImage must be a FILE, not base64
//       // if croppedImage is base64, convert it first (I will give the function below)
//       //     if (croppedImage && croppedImage.startsWith("blob:")) {
//       //   const fileImage = await blobUrlToFile(croppedImage, "profile.jpg");
//       //   fd.append("photo", fileImage);
//       // }

//       if (croppedImage) {
//         let fileImage;

//         if (croppedImage.startsWith("blob:")) {
//           fileImage = await blobUrlToFile(croppedImage, "profile.jpg");
//         } else if (croppedImage.startsWith("data:image")) {
//           fileImage = base64ToFile(croppedImage, "profile.jpg");
//         }

//         fd.append("photo", fileImage);
//       }

//       const response = await axios.post(
//         `${API_URL}/api/contact-resume/update`,
//         fd,
//         {
//           params: { userId: Userid, templateId: templateId, id: editid },
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       toast.success("Contact updated successfully.");
//       await fetchContact();
//       return true;
//     } catch (err) {
//       console.error("Error sending message:", err);
//       setErrors(err);
//       return false;
//     }
//   };

//   useImperativeHandle(ref, () => ({
//     handleSubmit,
//   }));

//   const jobTitles = Object.keys(jobData).map((key) => ({
//     label: jobData[key].name,
//     value: jobData[key]._id,
//   }));

//   const selectedJob = Object.values(jobData).find(
//     (job) => job._id === jobTitle
//   );

//   console.log("selectedJob", selectedJob);

//   // const [tags, setTags] = useState([]);
//   // const [tones, setTones] = useState([]);

//   const removeTone = (tone) => {
//     setTones(tones.filter((t) => t !== tone));
//   };

//   const removeTag = (tag) => {
//     setTags(tags.filter((t) => t !== tag));
//   };

//   // ###########################################%%%%%%%%%%%%%%%%%%#$$$$$$$$$$$$$$$$$$$$$$$ //

//   const [open, setOpen] = useState(false);
//   const [imageSrc, setImageSrc] = useState(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
//   // const [croppedImage, setCroppedImage] = useState(null);

//   console.log("croppedImage", croppedImage);

//   const onDrop = useCallback((acceptedFiles) => {
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

//   const onCropComplete = useCallback((_, croppedPixels) => {
//     setCroppedAreaPixels(croppedPixels);
//   }, []);

//   const handleCropSave = useCallback(async () => {
//     try {
//       // get blob (not base64)
//       const croppedBlob = await getCroppedImg(
//         imageSrc,
//         croppedAreaPixels,
//         "blob"
//       );
//       setCroppedImage(croppedBlob); // ✅ store blob in context
//       setImageSrc(null);
//       setOpen(false);
//     } catch (e) {
//       console.error(e);
//     }
//   }, [imageSrc, croppedAreaPixels]);

//   return (
//     <section>
//       <div className="p-4 bg-white h-[500px]  scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 scrollbar-thumb-rounded-md">
//         <h1 className="text-[24px] font-poppins font-semibold text-[#2e404a] mb-2">
//           Contacts
//         </h1>
//         <p className="text-[#3e5679] text-[16px] font-nunito font-normal mb-8">
//           Add your up-to-date contact information so employers and recruiters
//           can easily reach you.
//         </p>

//         <form>
//           {(pic === "true" || croppedImage) && (
//             <div className="flex gap-5  items-center mt-4 ">
//               {croppedImage ? (
//                 <div className="relative">
//                   <img
//                     src={`${API_URL}/api/uploads/photos/${croppedImage}`}
//                     alt="Profile"
//                     className="w-24 h-16 rounded-md object-cover border mb-3"
//                     onClick={(e) => {
//                       e.preventDefault();
//                     }}
//                   />
//                 </div>
//               ) : (
//                 <div
//                   className="w-24 h-16 rounded-md bg-gray-200 flex items-center cursor-pointer justify-center mb-3"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setOpen(true);
//                   }}
//                 >
//                   <IoPersonOutline className="text-gray-300 w-full h-full" />
//                 </div>
//               )}

//               <div className="w-full">
//                 <div>
//                   <div
//                     type="button"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       setOpen(true);
//                     }}
//                     className="text-blue-500 font-roboto font-medium  flex gap-1 items-center cursor-pointer"
//                   >
//                     <IoCloudUploadOutline size={16} />
//                     Upload photo
//                   </div>
//                 </div>
//                 <div>
//                   <div
//                     onClick={(e) => {
//                       e.preventDefault();
//                       setCroppedImage(null);
//                     }}
//                     className=" flex items-center font-roboto gap-1 text-red-700 cursor-pointer mt-2 "
//                   >
//                     <FiTrash2 size={16} />
//                     Delete Photo
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Name Section */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//             {/* First Name */}
//             <div>
//               <label
//                 htmlFor="firstName"
//                 className="block text-[#374151] text-[16px] font-nunito font-normal mb-1"
//               >
//                 First name
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   id="firstName"
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                   onBlur={() => setFirstTouched(true)}
//                   placeholder="Enter your First Name"
//                   className="w-full p-3 pr-12 border text-black text-[16px] font-nunito font-normal rounded-lg bg-[#f7f9fc] shadow-sm focus:outline-none  focus:border-blue-500    focus:ring-2 focus:ring-[#abdffc]  focus:shadow-md  transition-all duration-300"
//                 />
//                 {(isValid(firstName, firstTouched) ||
//                   firstName?.trim() !== "") && (
//                   <div className="absolute inset-y-0 right-2 flex items-center">
//                     <div className="bg-green-500 rounded-full h-4 w-4 flex items-center justify-center">
//                       <svg
//                         className="h-3 w-3 text-white"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Last Name */}
//             <div>
//               <label
//                 htmlFor="lastName"
//                 className="block text-[#374151] text-[16px] font-nunito font-normal mb-1"
//               >
//                 Last name
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   id="lastName"
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                   onBlur={() => setLastTouched(true)}
//                   placeholder="Taylor"
//                   className="w-full p-3 pr-12 border text-black text-[16px] font-nunito font-normal rounded-lg bg-[#f7f9fc] shadow-sm focus:outline-none  focus:border-blue-500    focus:ring-2 focus:ring-[#abdffc]  focus:shadow-md  transition-all duration-300"
//                 />
//                 {(isValid(lastName, lastTouched) ||
//                   lastName?.trim() !== "") && (
//                   <div className="absolute inset-y-0 right-2 flex items-center">
//                     <div className="bg-green-500 rounded-full h-4 w-4 flex items-center justify-center">
//                       <svg
//                         className="h-3 w-3 text-white"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Phone + Email */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//             {/* Phone */}
//             <div>
//               <label
//                 htmlFor="phone"
//                 className="block text-[#374151] text-[16px] font-nunito font-normal mb-1"
//               >
//                 Phone
//               </label>
//               <div className="relative">
//                 <input
//                   type="tel"
//                   id="phone"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   onBlur={() => setPhoneTouched(true)}
//                   placeholder="305-123-4444"
//                   className="w-full p-3 pr-12 border text-black text-[16px] font-nunito font-normal rounded-lg bg-[#f7f9fc] shadow-sm focus:outline-none  focus:border-blue-500    focus:ring-2 focus:ring-[#abdffc]  focus:shadow-md  transition-all duration-300"
//                 />
//                 {(isValid(phone, phoneTouched) || phone?.trim() !== "") && (
//                   <div className="absolute inset-y-0 right-2 flex items-center">
//                     <div className="bg-green-500 rounded-full h-4 w-4 flex items-center justify-center">
//                       <svg
//                         className="h-3 w-3 text-white"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Email */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-[#374151] text-[16px] font-nunito font-normal mb-1"
//               >
//                 Email
//               </label>
//               <div className="relative">
//                 <input
//                   type="email"
//                   id="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   onBlur={() => setEmailTouched(true)}
//                   placeholder="you@example.com"
//                   className="w-full p-3 pr-12 border text-black text-[16px] font-nunito font-normal rounded-lg bg-[#f7f9fc] shadow-sm focus:outline-none  focus:border-blue-500    focus:ring-2 focus:ring-[#abdffc]  focus:shadow-md  transition-all duration-300"
//                 />
//                 {(isValid(email, emailTouched) || email?.trim() !== "") && (
//                   <div className="absolute inset-y-0 right-2 flex items-center">
//                     <div className="bg-green-500 rounded-full h-4 w-4 flex items-center justify-center">
//                       <svg
//                         className="h-3 w-3 text-white"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Additional Info Button */}
//           <div className=" bg-white">
//             <div
//               className={`overflow-hidden transition-all duration-500 ease-in-out ${
//                 showAdditional
//                   ? "max-h-96 opacity-100 mt-4"
//                   : "max-h-0 opacity-0"
//               }`}
//             >
//               {/* linked protifol */}

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                 {/* Phone */}
//                 <div>
//                   <label
//                     htmlFor="LinkedIn"
//                     className="block text-[#374151] text-[16px] font-nunito font-normal mb-1"
//                   >
//                     LinkedIn
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="url"
//                       id="LinkedIn"
//                       value={linkedin}
//                       onChange={(e) => setLinkedin(e.target.value)}
//                       onBlur={() => setLinkedinTouched(true)}
//                       placeholder="LinkedIn"
//                       className="w-full p-3 pr-12 border text-black text-[16px] font-nunito font-normal rounded-lg bg-[#f7f9fc] shadow-sm focus:outline-none  focus:border-blue-500    focus:ring-2 focus:ring-[#abdffc]  focus:shadow-md  transition-all duration-300"
//                     />
//                     {(isValid(linkedin, linkedinTouched) ||
//                       linkedin?.trim() !== "") && (
//                       <div className="absolute inset-y-0 right-2 flex items-center">
//                         <div className="bg-green-500 rounded-full h-4 w-4 flex items-center justify-center">
//                           <svg
//                             className="h-3 w-3 text-white"
//                             fill="currentColor"
//                             viewBox="0 0 20 20"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label
//                     htmlFor="Portfolio"
//                     className="block text-[#374151] text-[16px] font-nunito font-normal mb-1"
//                   >
//                     Portfolio / Personal Site
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       id="Portfolio"
//                       value={portfolio}
//                       onChange={(e) => setPortfolio(e.target.value)}
//                       onBlur={() => setPortfolioTouched(true)}
//                       placeholder="Portfolio"
//                       className="w-full p-3 pr-12 border text-black text-[16px] font-nunito font-normal rounded-lg bg-[#f7f9fc] shadow-sm focus:outline-none  focus:border-blue-500    focus:ring-2 focus:ring-[#abdffc]  focus:shadow-md  transition-all duration-300"
//                     />
//                     {(isValid(portfolio, portfolioTouched) ||
//                       portfolio?.trim() !== "") && (
//                       <div className="absolute inset-y-0 right-2 flex items-center">
//                         <div className="bg-green-500 rounded-full h-4 w-4 flex items-center justify-center">
//                           <svg
//                             className="h-3 w-3 text-white"
//                             fill="currentColor"
//                             viewBox="0 0 20 20"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                 {/* Phone */}
//                 <div>
//                   <label
//                     htmlFor="Country"
//                     className="block text-[#374151] text-[16px] font-nunito font-normal mb-1"
//                   >
//                     Country
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="tel"
//                       id="Country"
//                       value={country}
//                       onChange={(e) => setCountry(e.target.value)}
//                       onBlur={() => setCountryTouched(true)}
//                       placeholder="Country"
//                       className="w-full p-3 pr-12 border text-black text-[16px] font-nunito font-normal rounded-lg bg-[#f7f9fc] shadow-sm focus:outline-none  focus:border-blue-500    focus:ring-2 focus:ring-[#abdffc]  focus:shadow-md  transition-all duration-300"
//                     />
//                     {(isValid(country, countryTouched) ||
//                       country?.trim() !== "") && (
//                       <div className="absolute inset-y-0 right-2 flex items-center">
//                         <div className="bg-green-500 rounded-full h-4 w-4 flex items-center justify-center">
//                           <svg
//                             className="h-3 w-3 text-white"
//                             fill="currentColor"
//                             viewBox="0 0 20 20"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label
//                     htmlFor="City"
//                     className="block text-[#374151] text-[16px] font-nunito font-normal mb-1"
//                   >
//                     City
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       id="City"
//                       value={city}
//                       onChange={(e) => setCity(e.target.value)}
//                       onBlur={() => setCityTouched(true)}
//                       placeholder="City"
//                       className="w-full p-3 pr-12 border text-black text-[16px] font-nunito font-normal rounded-lg bg-[#f7f9fc] shadow-sm focus:outline-none  focus:border-blue-500    focus:ring-2 focus:ring-[#abdffc]  focus:shadow-md  transition-all duration-300"
//                     />
//                     {(isValid(city, cityTouched) || city?.trim() !== "") && (
//                       <div className="absolute inset-y-0 right-2 flex items-center">
//                         <div className="bg-green-500 rounded-full h-4 w-4 flex items-center justify-center">
//                           <svg
//                             className="h-3 w-3 text-white"
//                             fill="currentColor"
//                             viewBox="0 0 20 20"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                 {/* addres */}
//                 <div>
//                   <label
//                     htmlFor="Address"
//                     className="block text-[#374151] text-[16px] font-nunito font-normal mb-1"
//                   >
//                     Address
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="tel"
//                       id="Address"
//                       value={address}
//                       onChange={(e) => setAddress(e.target.value)}
//                       onBlur={() => setAddressTouched(true)}
//                       placeholder="Address"
//                       className="w-full p-3 pr-12 border text-black text-[16px] font-nunito font-normal rounded-lg bg-[#f7f9fc] shadow-sm focus:outline-none  focus:border-blue-500    focus:ring-2 focus:ring-[#abdffc]  focus:shadow-md  transition-all duration-300"
//                     />
//                     {(isValid(address, addressTouched) ||
//                       address?.trim() !== "") && (
//                       <div className="absolute inset-y-0 right-2 flex items-center">
//                         <div className="bg-green-500 rounded-full h-4 w-4 flex items-center justify-center">
//                           <svg
//                             className="h-3 w-3 text-white"
//                             fill="currentColor"
//                             viewBox="0 0 20 20"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* post */}
//                 <div>
//                   <label
//                     htmlFor="Post"
//                     className="block text-[#374151] text-[16px] font-nunito font-normal mb-1"
//                   >
//                     Post code
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       id="Post"
//                       value={postcode}
//                       onChange={(e) => setPostcode(e.target.value)}
//                       onBlur={() => setPostTouched(true)}
//                       placeholder="Post code"
//                       className="w-full p-3 pr-12 border text-black text-[16px] font-nunito font-normal rounded-lg bg-[#f7f9fc] shadow-sm focus:outline-none  focus:border-blue-500    focus:ring-2 focus:ring-[#abdffc]  focus:shadow-md  transition-all duration-300"
//                     />
//                     {(isValid(postcode, postTouched) ||
//                       postcode?.trim() !== "") && (
//                       <div className="absolute inset-y-0 right-2 flex items-center">
//                         <div className="bg-green-500 rounded-full h-4 w-4 flex items-center justify-center">
//                           <svg
//                             className="h-3 w-3 text-white"
//                             fill="currentColor"
//                             viewBox="0 0 20 20"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <button
//               type="button"
//               onClick={() => setShowAdditional(!showAdditional)}
//               className="flex items-center text-[#2da2ff] hover:text-[#2da2ff] font-semibold mt-2 mb-2"
//             >
//               Additional information
//               <svg
//                 className={`w-4 h-4 ml-1 transition-transform duration-300 ${
//                   showAdditional ? "rotate-180" : ""
//                 }`}
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M19 9l-7 7-7-7"
//                 ></path>
//               </svg>
//             </button>
//           </div>
//         </form>

//         {open && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-lg p-6 relative">
//               <div className="flex justify-end">
//                 {" "}
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setImageSrc(null);
//                     setOpen(false);
//                   }}
//                   className=" text-gray-500 hover:text-gray-700 transition"
//                   title="Close"
//                 >
//                   ✕
//                 </button>
//               </div>

//               <h2 className="text-xl font-semibold mb-4 text-center">
//                 Photo Upload
//               </h2>

//               <div
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4, ease: "easeOut" }}
//               >
//                 {!imageSrc ? (
//                   <>
//                     <p className="text-gray-500 text-sm mb-4 text-center">
//                       Drag and drop your photo here or upload from your device.
//                     </p>

//                     <div
//                       {...getRootProps()}
//                       className={`border-2 border-dashed rounded-md p-10 flex flex-col items-center justify-center cursor-pointer transition ${
//                         isDragActive
//                           ? "border-blue-400 bg-blue-50"
//                           : "border-gray-300"
//                       }`}
//                     >
//                       <input {...getInputProps()} />
//                       <IoCloudUploadOutline
//                         size={50}
//                         className="text-gray-500 mb-3"
//                       />
//                       <p className="text-gray-700">
//                         {isDragActive
//                           ? "Drop your photo here..."
//                           : "Drag and drop or click to upload"}
//                       </p>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <div className="relative w-full h-64 bg-gray-100 rounded-md overflow-hidden">
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

//                     <div
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.2, duration: 0.4 }}
//                       className="flex items-center justify-between mt-4"
//                     >
//                       <input
//                         type="range"
//                         min={1}
//                         max={3}
//                         step={0.1}
//                         value={zoom}
//                         onChange={(e) => setZoom(e.target.value)}
//                         className="w-1/2"
//                       />

//                       <div className="flex gap-3">
//                         <button
//                           type="button"
//                           onClick={() => setImageSrc(null)}
//                           className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition"
//                         >
//                           Change Image
//                         </button>
//                         <button
//                           type="button"
//                           onClick={handleCropSave}
//                           className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
//                         >
//                           Save
//                         </button>
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// });

// export default Contact_form;

import React, {
  useContext,
  useState,
  useCallback,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { CreateContext } from "../App";
import Cropper from "react-easy-crop";
import { useDropzone } from "react-dropzone";
import { getCroppedImg } from "./cropImageUtils";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../Config";
import { toast } from "react-toastify";
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
} from "react-icons/io5";
import { FiTrash2 } from "react-icons/fi";
import { FaLinkedin, FaGlobeAmericas } from "react-icons/fa";
import { Dropdown } from "primereact/dropdown";

const Contact_form = forwardRef((props, ref) => {
  const [userLoggedIn, setUserLoggedIn] = useState("");

  const Userid = userLoggedIn?.id || userLoggedIn?._id;

  const location = useLocation();
  const pic = location.state?.templateId.pic;

  const templateId = location.state?.templateId.id;

  const editid = location.state?.editid;

  const { firstName, setFirstName } = useContext(CreateContext);
  const { lastName, setLastName } = useContext(CreateContext);
  const { jobTitle, setJobTitle } = useContext(CreateContext);

  const { phone, setPhone } = useContext(CreateContext);
  const { email, setEmail } = useContext(CreateContext);
  const { tags, setTags } = useContext(CreateContext);
  const { tones, setTones } = useContext(CreateContext);
  const { address, setAddress } = useContext(CreateContext);

  const { city, setCity } = useContext(CreateContext);
  const { country, setCountry } = useContext(CreateContext);
  const { postcode, setPostcode } = useContext(CreateContext);
  const { linkedin, setLinkedin } = useContext(CreateContext);
  const { portfolio, setPortfolio } = useContext(CreateContext);

  const { croppedImage, setCroppedImage } = useContext(CreateContext);
  const { contactid, setContactid } = useContext(CreateContext);

  const [firstTouched, setFirstTouched] = useState(false);
  const [lastTouched, setLastTouched] = useState(false);
  const [jobTouched, setJobTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [addressTouched, setAddressTouched] = useState("");
  const [cityTouched, setCityTouched] = useState("");
  const [countryTouched, setCountryTouched] = useState(false);
  const [postTouched, setPostTouched] = useState("");
  const [linkedinTouched, setLinkedinTouched] = useState(false);
  const [portfolioTouched, setPortfolioTouched] = useState(false);
  const [showAdditional, setShowAdditional] = useState(false);
  const [errors, setErrors] = useState({});
  const [jobData, setJobdata] = useState([]);
  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const isValid = (value, touched) => touched && value?.trim() !== "";

  const fixKeywords = (val) => {
    if (!val) return [];

    if (Array.isArray(val) && val.length === 1 && typeof val[0] === "string") {
      try {
        val = JSON.parse(val[0]);
      } catch {
        return [];
      }
    }

    val = val.map((item) => {
      try {
        const parsed = JSON.parse(item);
        if (Array.isArray(parsed)) {
          return parsed.filter((x) => x !== "[]")[0];
        }
        return parsed;
      } catch {
        return item;
      }
    });

    return val;
  };

  const fetchContact = async () => {
    const userdata = JSON.parse(localStorage.getItem("Resumnit_user"));
    const userId = userdata?.id || userdata?._id;

    setUserLoggedIn(userdata);
    try {
      const response = await axios.get(
        `${API_URL}/api/contact-resume/get-contact/${userId}`,
        {
          params: {
            resumeId: editid,
          },
        }
      );

      const data = response.data[0] || response.data;

      setContactid(data?._id);
      setFirstName(data?.firstName || userLoggedIn?.firstName);
      setLastName(data?.lastName || userLoggedIn?.lastName);
      setJobTitle(data?.jobTitle || "");
      setPhone(data?.phone || userLoggedIn?.phone);
      setEmail(data?.email || userLoggedIn?.email);
      setTags(fixKeywords(data?.keywords));
      setTones(fixKeywords(data?.tones));
      setAddress(data?.address || "");
      setCity(data?.city || userLoggedIn?.city);
      setCountry(data?.country || userLoggedIn?.country);
      setPostcode(data?.postCode || "");
      setLinkedin(data?.linkedIn || "");
      setPortfolio(data?.portfolio || "");
      setCroppedImage(data?.photo || "");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContact();
  }, [Userid]);

  const fetchJobtitle = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/desired-job-title/desired-job-title`
      );
      setJobdata(response.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobtitle();
  }, []);

  const jobTitles = Object.keys(jobData).map((key) => ({
    label: jobData[key].name,
    value: jobData[key]._id,
  }));

  const blobUrlToFile = async (blobUrl, fileName) => {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  };

  const base64ToFile = (base64, fileName) => {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    try {
      const fd = new FormData();

      fd.append("userId", Userid);
      fd.append("firstName", firstName);
      fd.append("lastName", lastName);
      fd.append("email", email);
      fd.append("jobTitle", jobTitle?.length > 0 ? jobTitle : "");
      fd.append("keywords", JSON.stringify(tags));
      fd.append("tones", JSON.stringify(tones));
      fd.append("phone", phone);
      fd.append("country", country);
      fd.append("city", city);
      fd.append("address", address);
      fd.append("postCode", postcode);
      fd.append("linkedIn", linkedin);
      fd.append("portfolio", portfolio);
      fd.append("templateId", templateId);

      if (croppedImage) {
        let fileImage;

        if (croppedImage.startsWith("blob:")) {
          fileImage = await blobUrlToFile(croppedImage, "profile.jpg");
        } else if (croppedImage.startsWith("data:image")) {
          fileImage = base64ToFile(croppedImage, "profile.jpg");
        }

        if (fileImage) {
          fd.append("photo", fileImage);
        }
      }

      const response = await axios.post(
        `${API_URL}/api/contact-resume/update`,
        fd,
        {
          params: { userId: Userid, templateId: templateId, id: editid },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Contact updated successfully.");
      await fetchContact();
      return true;
    } catch (err) {
      console.error("Error sending message:", err);
      setErrors(err);
      return false;
    }
  };

  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  const onDrop = useCallback((acceptedFiles) => {
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

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleCropSave = useCallback(async () => {
    try {
      const croppedBlob = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        "blob"
      );
      setCroppedImage(croppedBlob);
      setImageSrc(null);
      setOpen(false);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels]);

  return (
    // <section className="">
    //   <div className="p-6 bg-white rounded-xl shadow-soft h-[500px] ">
    //     {/* Header Section */}
    //     <div className="mb-8">
    //       <div className="flex items-center gap-3 mb-3">
    //         <div className="p-2 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
    //           <IoPersonOutline className="w-6 h-6 text-[#c40116]" />
    //         </div>
    //         <h1 className="text-2xl font-semibold bg-gradient-to-r from-[#5e000b] to-[#c40116] bg-clip-text text-transparent">
    //           Contact Details
    //         </h1>
    //       </div>
    //       <p className="text-gray-600 text-sm font-medium">
    //         Add your up-to-date contact information so employers and recruiters
    //         can easily reach you.
    //       </p>
    //     </div>

    //     <form className="space-y-8">
    //       {/* Profile Photo Section */}
    //       {(pic === "true" || croppedImage) && (
    //         <div className="bg-gradient-to-r from-gray-50 to-white p-5 rounded-xl border border-gray-100 shadow-subtle">
    //           <div className="flex items-center gap-6">
    //             {croppedImage ? (
    //               <div className="relative group">
    //                 <div className="absolute inset-0 bg-gradient-to-r from-[#c40116]/20 to-[#be0117]/20 rounded-xl blur-md group-hover:blur-lg transition-all duration-300"></div>
    //                 {croppedImage.startsWith("blob:") ||
    //                 croppedImage.startsWith("data:") ? (
    //                   <img
    //                     src={croppedImage}
    //                     alt="Profile"
    //                     className="relative w-20 h-20 rounded-xl object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
    //                     onClick={(e) => e.preventDefault()}
    //                   />
    //                 ) : (
    //                   <img
    //                     src={`${API_URL}/api/uploads/photos/${croppedImage}`}
    //                     alt="Profile"
    //                     className="relative w-20 h-20 rounded-xl object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
    //                     onClick={(e) => e.preventDefault()}
    //                   />
    //                 )}
    //               </div>
    //             ) : (
    //               <div
    //                 className="w-20 h-20 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-200 hover:border-[#c40116] hover:from-[#c40116]/10 hover:to-[#be0117]/10 transition-all duration-300 group"
    //                 onClick={(e) => {
    //                   e.preventDefault();
    //                   setOpen(true);
    //                 }}
    //               >
    //                 <IoPersonOutline className="w-10 h-10 text-gray-400 group-hover:text-[#c40116] transition-colors" />
    //               </div>
    //             )}

    //             <div className="flex-1">
    //               <h3 className="text-sm font-semibold text-gray-700 mb-3">
    //                 Profile Photo
    //               </h3>
    //               <div className="flex flex-wrap gap-3">
    //                 <button
    //                   type="button"
    //                   onClick={(e) => {
    //                     e.preventDefault();
    //                     setOpen(true);
    //                   }}
    //                   className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-[#c40116]/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
    //                 >
    //                   <IoCloudUploadOutline size={16} />
    //                   Upload Photo
    //                 </button>

    //                 <button
    //                   type="button"
    //                   onClick={(e) => {
    //                     e.preventDefault();
    //                     setCroppedImage(null);
    //                   }}
    //                   className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 text-sm font-medium rounded-lg border border-gray-200 hover:border-[#c40116] hover:text-[#c40116] hover:shadow-md transition-all duration-200"
    //                 >
    //                   <FiTrash2 size={16} />
    //                   Delete Photo
    //                 </button>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       )}

    //       {/* Photo Upload Modal */}
    //       {open && (
    //         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    //           <motion.div
    //             initial={{ opacity: 0, scale: 0.95 }}
    //             animate={{ opacity: 1, scale: 1 }}
    //             className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-lg overflow-hidden"
    //           >
    //             <div className="p-6">
    //               <div className="flex items-center justify-between mb-6">
    //                 <h2 className="text-xl font-semibold text-gray-800">
    //                   Upload Profile Photo
    //                 </h2>
    //                 <button
    //                   type="button"
    //                   onClick={() => {
    //                     setImageSrc(null);
    //                     setOpen(false);
    //                   }}
    //                   className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
    //                 >
    //                   <IoClose className="w-5 h-5 text-gray-500" />
    //                 </button>
    //               </div>

    //               {!imageSrc ? (
    //                 <motion.div
    //                   initial={{ opacity: 0, y: 20 }}
    //                   animate={{ opacity: 1, y: 0 }}
    //                   className="text-center"
    //                 >
    //                   <div
    //                     {...getRootProps()}
    //                     className={`border-3 border-dashed rounded-2xl p-12 cursor-pointer transition-all duration-300 ${
    //                       isDragActive
    //                         ? "border-[#c40116] bg-[#c40116]/10 border-[#be0117]/50"
    //                         : "border-gray-300 hover:border-[#c40116] hover:bg-[#c40116]/5"
    //                     }`}
    //                   >
    //                     <input {...getInputProps()} />
    //                     <div className="mb-6">
    //                       <div className="inline-flex p-4 bg-gradient-to-br from-[#c40116]/20 to-[#be0117]/20 rounded-2xl mb-4">
    //                         <IoCloudUploadOutline className="w-12 h-12 text-[#c40116]" />
    //                       </div>
    //                     </div>
    //                     <h3 className="text-lg font-semibold text-gray-800 mb-2">
    //                       {isDragActive
    //                         ? "Drop your photo here..."
    //                         : "Drag & drop or click to upload"}
    //                     </h3>
    //                     <p className="text-gray-500 text-sm mb-4">
    //                       Supports JPG, PNG, GIF up to 5MB
    //                     </p>
    //                     <button
    //                       type="button"
    //                       className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
    //                     >
    //                       Browse Files
    //                     </button>
    //                   </div>
    //                 </motion.div>
    //               ) : (
    //                 <>
    //                   <div className="relative w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden mb-6">
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

    //                   <div className="space-y-6">
    //                     <div>
    //                       <label className="block text-sm font-medium text-gray-700 mb-2">
    //                         Zoom
    //                       </label>
    //                       <input
    //                         type="range"
    //                         min={1}
    //                         max={3}
    //                         step={0.1}
    //                         value={zoom}
    //                         onChange={(e) => setZoom(e.target.value)}
    //                         className="w-full h-2 bg-gradient-to-r from-[#c40116]/20 to-[#be0117]/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-[#c40116] [&::-webkit-slider-thumb]:to-[#be0117]"
    //                       />
    //                     </div>

    //                     <div className="flex gap-3">
    //                       <button
    //                         type="button"
    //                         onClick={() => setImageSrc(null)}
    //                         className="flex-1 px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 rounded-xl font-medium hover:shadow-md transition-all duration-200"
    //                       >
    //                         Cancel
    //                       </button>
    //                       <button
    //                         type="button"
    //                         onClick={handleCropSave}
    //                         className="flex-1 px-4 py-3 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#c40116]/25 transition-all duration-200"
    //                       >
    //                         Save Photo
    //                       </button>
    //                     </div>
    //                   </div>
    //                 </>
    //               )}
    //             </div>
    //           </motion.div>
    //         </div>
    //       )}

    //       {/* Name Section */}
    //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //         {/* First Name */}
    //         <div className="group">
    //           <label
    //             htmlFor="firstName"
    //             className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-[#c40116] transition-colors"
    //           >
    //             First Name
    //           </label>
    //           <div className="relative">
    //             <input
    //               type="text"
    //               id="firstName"
    //               value={firstName}
    //               onChange={(e) => setFirstName(e.target.value)}
    //               onBlur={() => setFirstTouched(true)}
    //               placeholder="Enter your first name"
    //               className="w-full px-4 py-3.5 bg-gradient-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
    //             />
    //             {(isValid(firstName, firstTouched) ||
    //               firstName?.trim() !== "") && (
    //               <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
    //                 <div className="flex items-center justify-center w-5 h-5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full shadow-sm">
    //                   <IoCheckmark className="w-3 h-3 text-white" />
    //                 </div>
    //               </div>
    //             )}
    //           </div>
    //         </div>

    //         {/* Last Name */}
    //         <div className="group">
    //           <label
    //             htmlFor="lastName"
    //             className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-[#c40116] transition-colors"
    //           >
    //             Last Name
    //           </label>
    //           <div className="relative">
    //             <input
    //               type="text"
    //               id="lastName"
    //               value={lastName}
    //               onChange={(e) => setLastName(e.target.value)}
    //               onBlur={() => setLastTouched(true)}
    //               placeholder="Taylor"
    //               className="w-full px-4 py-3.5 bg-gradient-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
    //             />
    //             {(isValid(lastName, lastTouched) ||
    //               lastName?.trim() !== "") && (
    //               <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
    //                 <div className="flex items-center justify-center w-5 h-5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full shadow-sm">
    //                   <IoCheckmark className="w-3 h-3 text-white" />
    //                 </div>
    //               </div>
    //             )}
    //           </div>
    //         </div>
    //       </div>

    //       {/* Phone + Email */}
    //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //         {/* Phone */}
    //         <div className="group">
    //           <label
    //             htmlFor="phone"
    //             className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-[#c40116] transition-colors"
    //           >
    //             Phone Number
    //           </label>
    //           <div className="relative">
    //             <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
    //               <IoCallOutline className="w-5 h-5" />
    //             </div>
    //             <input
    //               type="tel"
    //               id="phone"
    //               value={phone}
    //               onChange={(e) => setPhone(e.target.value)}
    //               onBlur={() => setPhoneTouched(true)}
    //               placeholder="+1 (305) 123-4444"
    //               className="w-full pl-12 pr-4 py-3.5 bg-gradient-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
    //             />
    //             {(isValid(phone, phoneTouched) || phone?.trim() !== "") && (
    //               <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
    //                 <div className="flex items-center justify-center w-5 h-5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full shadow-sm">
    //                   <IoCheckmark className="w-3 h-3 text-white" />
    //                 </div>
    //               </div>
    //             )}
    //           </div>
    //         </div>

    //         {/* Email */}
    //         <div className="group">
    //           <label
    //             htmlFor="email"
    //             className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-[#c40116] transition-colors"
    //           >
    //             Email Address
    //           </label>
    //           <div className="relative">
    //             <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
    //               <IoMailOutline className="w-5 h-5" />
    //             </div>
    //             <input
    //               type="email"
    //               id="email"
    //               value={email}
    //               onChange={(e) => setEmail(e.target.value)}
    //               onBlur={() => setEmailTouched(true)}
    //               placeholder="you@example.com"
    //               className="w-full pl-12 pr-4 py-3.5 bg-gradient-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
    //             />
    //             {(isValid(email, emailTouched) || email?.trim() !== "") && (
    //               <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
    //                 <div className="flex items-center justify-center w-5 h-5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full shadow-sm">
    //                   <IoCheckmark className="w-3 h-3 text-white" />
    //                 </div>
    //               </div>
    //             )}
    //           </div>
    //         </div>
    //       </div>

    //       {/* Toggle Button */}
    //       <button
    //         type="button"
    //         onClick={() => setShowAdditional(!showAdditional)}
    //         className="w-full p-5 flex items-center justify-between bg-gradient-to-r from-gray-50/80 to-white/80 hover:from-gray-100/80 hover:to-white transition-all duration-300 group"
    //       >
    //         <div className="flex items-center gap-3">
    //           <div
    //             className={`p-2 rounded-lg transition-all duration-300 ${
    //               showAdditional
    //                 ? "bg-[#c40116]/10 text-[#c40116]"
    //                 : "bg-gray-100 text-gray-600 group-hover:bg-[#c40116]/10 group-hover:text-[#c40116]"
    //             }`}
    //           >
    //             <IoInformationCircleOutline className="w-5 h-5" />
    //           </div>
    //           <span className="text-sm font-semibold text-gray-700 group-hover:text-[#c40116] transition-colors">
    //             Additional Information
    //           </span>
    //         </div>
    //         <IoChevronDown
    //           className={`w-5 h-5 text-gray-500 group-hover:text-[#c40116] transition-all duration-300 ${
    //             showAdditional ? "rotate-180" : ""
    //           }`}
    //         />
    //       </button>

    //       {/* Additional Information Section */}
    //       <div className="bg-gradient-to-br from-gray-50/50 to-white/50 rounded-2xl border border-gray-100 overflow-hidden">
    //         <div
    //           className={`transition-all duration-500 ease-in-out ${
    //             showAdditional
    //               ? "max-h-[2000px] opacity-100"
    //               : "max-h-0 opacity-0"
    //           }`}
    //         >
    //           <div className="p-6 space-y-6">
    //             {/* LinkedIn & Portfolio */}
    //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //               <div className="group">
    //                 <label
    //                   htmlFor="LinkedIn"
    //                   className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-[#c40116] transition-colors"
    //                 >
    //                   LinkedIn Profile
    //                 </label>
    //                 <div className="relative">
    //                   <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
    //                     <FaLinkedin className="w-5 h-5" />
    //                   </div>
    //                   <input
    //                     type="url"
    //                     id="LinkedIn"
    //                     value={linkedin}
    //                     onChange={(e) => setLinkedin(e.target.value)}
    //                     onBlur={() => setLinkedinTouched(true)}
    //                     placeholder="linkedin.com/in/username"
    //                     className="w-full pl-12 pr-12 py-3.5 bg-gradient-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
    //                   />
    //                   {(isValid(linkedin, linkedinTouched) ||
    //                     linkedin?.trim() !== "") && (
    //                     <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
    //                       <div className="flex items-center justify-center w-5 h-5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full shadow-sm">
    //                         <IoCheckmark className="w-3 h-3 text-white" />
    //                       </div>
    //                     </div>
    //                   )}
    //                 </div>
    //               </div>

    //               <div className="group">
    //                 <label
    //                   htmlFor="Portfolio"
    //                   className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-[#c40116] transition-colors"
    //                 >
    //                   Portfolio / Website
    //                 </label>
    //                 <div className="relative">
    //                   <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
    //                     <FaGlobeAmericas className="w-5 h-5" />
    //                   </div>
    //                   <input
    //                     type="text"
    //                     id="Portfolio"
    //                     value={portfolio}
    //                     onChange={(e) => setPortfolio(e.target.value)}
    //                     onBlur={() => setPortfolioTouched(true)}
    //                     placeholder="yourportfolio.com"
    //                     className="w-full pl-12 pr-12 py-3.5 bg-gradient-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
    //                   />
    //                   {(isValid(portfolio, portfolioTouched) ||
    //                     portfolio?.trim() !== "") && (
    //                     <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
    //                       <div className="flex items-center justify-center w-5 h-5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full shadow-sm">
    //                         <IoCheckmark className="w-3 h-3 text-white" />
    //                       </div>
    //                     </div>
    //                   )}
    //                 </div>
    //               </div>
    //             </div>

    //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //               {/* Address */}
    //               <div className="group">
    //                 <label
    //                   htmlFor="Address"
    //                   className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-[#c40116] transition-colors"
    //                 >
    //                   Full Address
    //                 </label>
    //                 <div className="relative">
    //                   <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
    //                     <IoLocationOutline className="w-5 h-5" />
    //                   </div>
    //                   <input
    //                     type="text"
    //                     id="Address"
    //                     value={address}
    //                     onChange={(e) => setAddress(e.target.value)}
    //                     onBlur={() => setAddressTouched(true)}
    //                     placeholder="123 Main Street, Apt 4B"
    //                     className="w-full pl-12 pr-12 py-3.5 bg-gradient-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
    //                   />
    //                   {(isValid(address, addressTouched) ||
    //                     address?.trim() !== "") && (
    //                     <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
    //                       <div className="flex items-center justify-center w-5 h-5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full shadow-sm">
    //                         <IoCheckmark className="w-3 h-3 text-white" />
    //                       </div>
    //                     </div>
    //                   )}
    //                 </div>
    //               </div>

    //               <div className="group">
    //                 <label
    //                   htmlFor="Post"
    //                   className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-[#c40116] transition-colors"
    //                 >
    //                   Postal Code
    //                 </label>
    //                 <div className="relative">
    //                   <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
    //                     <svg
    //                       className="w-5 h-5"
    //                       fill="none"
    //                       stroke="currentColor"
    //                       viewBox="0 0 24 24"
    //                     >
    //                       <path
    //                         strokeLinecap="round"
    //                         strokeLinejoin="round"
    //                         strokeWidth="2"
    //                         d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
    //                       />
    //                       <path
    //                         strokeLinecap="round"
    //                         strokeLinejoin="round"
    //                         strokeWidth="2"
    //                         d="M9 22V12h6v10"
    //                       />
    //                     </svg>
    //                   </div>
    //                   <input
    //                     type="text"
    //                     id="Post"
    //                     value={postcode}
    //                     onChange={(e) => setPostcode(e.target.value)}
    //                     onBlur={() => setPostTouched(true)}
    //                     placeholder="10001"
    //                     className="w-full pl-12 pr-12 py-3.5 bg-gradient-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
    //                   />
    //                   {(isValid(postcode, postTouched) ||
    //                     postcode?.trim() !== "") && (
    //                     <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
    //                       <div className="flex items-center justify-center w-5 h-5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full shadow-sm">
    //                         <IoCheckmark className="w-3 h-3 text-white" />
    //                       </div>
    //                     </div>
    //                   )}
    //                 </div>
    //               </div>
    //             </div>

    //             {/* Location Information */}
    //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //               <div className="group">
    //                 <label
    //                   htmlFor="Country"
    //                   className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-[#c40116] transition-colors"
    //                 >
    //                   Country
    //                 </label>
    //                 <div className="relative">
    //                   <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
    //                     <IoGlobeOutline className="w-5 h-5" />
    //                   </div>
    //                   <input
    //                     type="text"
    //                     id="Country"
    //                     value={country}
    //                     onChange={(e) => setCountry(e.target.value)}
    //                     onBlur={() => setCountryTouched(true)}
    //                     placeholder="United States"
    //                     className="w-full pl-12 pr-12 py-3.5 bg-gradient-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
    //                   />
    //                   {(isValid(country, countryTouched) ||
    //                     country?.trim() !== "") && (
    //                     <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
    //                       <div className="flex items-center justify-center w-5 h-5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full shadow-sm">
    //                         <IoCheckmark className="w-3 h-3 text-white" />
    //                       </div>
    //                     </div>
    //                   )}
    //                 </div>
    //               </div>

    //               <div className="group">
    //                 <label
    //                   htmlFor="City"
    //                   className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-[#c40116] transition-colors"
    //                 >
    //                   City
    //                 </label>
    //                 <div className="relative">
    //                   <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
    //                     <IoLocationOutline className="w-5 h-5" />
    //                   </div>
    //                   <input
    //                     type="text"
    //                     id="City"
    //                     value={city}
    //                     onChange={(e) => setCity(e.target.value)}
    //                     onBlur={() => setCityTouched(true)}
    //                     placeholder="New York"
    //                     className="w-full pl-12 pr-12 py-3.5 bg-gradient-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
    //                   />
    //                   {(isValid(city, cityTouched) || city?.trim() !== "") && (
    //                     <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
    //                       <div className="flex items-center justify-center w-5 h-5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full shadow-sm">
    //                         <IoCheckmark className="w-3 h-3 text-white" />
    //                       </div>
    //                     </div>
    //                   )}
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </form>
    //   </div>
    // </section>

    <section className="">
      <div className="p-3 md:p-4 lg:p-5 bg-white rounded-xl shadow-soft h-auto min-h-[500px]">
        {/* Header Section */}
        <div className="mb-5 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="p-1.5 sm:p-2 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
              <IoPersonOutline className="w-5 h-5 sm:w-6 sm:h-6 text-[#c40116]" />
            </div>
            <h1 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-[#5e000b] to-[#c40116] bg-clip-text text-transparent">
              Contact Details
            </h1>
          </div>
          <p className="text-gray-600 text-xs sm:text-sm font-medium">
            Add your up-to-date contact information so employers and recruiters
            can easily reach you.
          </p>
        </div>

        <form className="space-y-5 sm:space-y-6">
          {/* Profile Photo Section */}
          {(pic === "true" || croppedImage) && (
            <div className="bg-gradient-to-r from-gray-50 to-white p-3 sm:p-4 rounded-xl border border-gray-100 shadow-subtle">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                {croppedImage ? (
                  <div className="relative group self-start">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#c40116]/20 to-[#be0117]/20 rounded-xl blur-md group-hover:blur-lg transition-all duration-300"></div>
                    {croppedImage.startsWith("blob:") ||
                    croppedImage.startsWith("data:") ? (
                      <img
                        src={croppedImage}
                        alt="Profile"
                        className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
                        onClick={(e) => e.preventDefault()}
                      />
                    ) : (
                      <img
                        src={`${API_URL}/api/uploads/photos/${croppedImage}`}
                        alt="Profile"
                        className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
                        onClick={(e) => e.preventDefault()}
                      />
                    )}
                  </div>
                ) : (
                  <div
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-200 hover:border-[#c40116] hover:from-[#c40116]/10 hover:to-[#be0117]/10 transition-all duration-300 group self-start"
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
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setOpen(true);
                      }}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white text-xs font-medium rounded-lg hover:shadow-lg hover:shadow-[#c40116]/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex-1 sm:flex-none"
                    >
                      <IoCloudUploadOutline className="w-3.5 h-3.5" />
                      <span className="whitespace-nowrap">Upload Photo</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setCroppedImage(null);
                      }}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 text-xs font-medium rounded-lg border border-gray-200 hover:border-[#c40116] hover:text-[#c40116] hover:shadow-md transition-all duration-200 flex-1 sm:flex-none"
                    >
                      <FiTrash2 className="w-3.5 h-3.5" />
                      <span className="whitespace-nowrap">Delete Photo</span>
                    </button>
                  </div>
                </div>
              </div>
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
                      className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <IoClose className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  {/* Modal content remains the same */}
                </div>
              </motion.div>
            </div>
          )}

          {/* Name Section - Compact for two columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  onBlur={() => setFirstTouched(true)}
                  placeholder="Enter your first name"
                  className="w-full px-3 py-2.5 sm:py-3 bg-gradient-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                />
                {(isValid(firstName, firstTouched) ||
                  firstName?.trim() !== "") && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="flex items-center justify-center w-4 h-4 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full shadow-sm">
                      <IoCheckmark className="w-2.5 h-2.5 text-white" />
                    </div>
                  </div>
                )}
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
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  onBlur={() => setLastTouched(true)}
                  placeholder="Taylor"
                  className="w-full px-3 py-2.5 sm:py-3 bg-gradient-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                />
                {(isValid(lastName, lastTouched) ||
                  lastName?.trim() !== "") && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="flex items-center justify-center w-4 h-4 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full shadow-sm">
                      <IoCheckmark className="w-2.5 h-2.5 text-white" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Phone + Email - Compact for two columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onBlur={() => setPhoneTouched(true)}
                  placeholder="+1 (305) 123-4444"
                  className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-gradient-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                />
                {(isValid(phone, phoneTouched) || phone?.trim() !== "") && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="flex items-center justify-center w-4 h-4 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full shadow-sm">
                      <IoCheckmark className="w-2.5 h-2.5 text-white" />
                    </div>
                  </div>
                )}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setEmailTouched(true)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-gradient-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                />
                {(isValid(email, emailTouched) || email?.trim() !== "") && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="flex items-center justify-center w-4 h-4 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full shadow-sm">
                      <IoCheckmark className="w-2.5 h-2.5 text-white" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Job Title */}
          <div
            className={`grid gap-6 mb-6 ${
              pic === "true" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
            }`}
          >
            <div className="mb-6">
              <label
                htmlFor="jobTitle"
                className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-[#c40116] transition-colors"
              >
                Desired job title
              </label>
              <div className="relative">
                {/* <input
                type="text"
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                onBlur={() => setJobTouched(true)}
                placeholder="Accountant"
                  className="w-full p-3 pr-12 border text-black text-[16px] font-nunito font-normal rounded-lg bg-[#f7f9fc] shadow-sm focus:outline-none  focus:border-blue-500    focus:ring-2 focus:ring-[#abdffc]  focus:shadow-md  transition-all duration-300"
              /> */}

                <Dropdown
                  value={jobTitle}
                  onChange={(e) => {
                    setJobTitle(e.value); // store selected value
                    setTags([]); // reset tags
                    setTones([]);
                    setJobTouched(true);
                  }}
                  options={jobTitles}
                  optionLabel="label"
                  placeholder="Select Title"
                  filter
                  className="w-full pr-3 py-1 bg-gradient-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Toggle Button - More Compact */}
          <button
            type="button"
            onClick={() => setShowAdditional(!showAdditional)}
            className="w-full p-3 flex items-center justify-between bg-gradient-to-r from-gray-50/80 to-white/80 hover:from-gray-100/80 hover:to-white transition-all duration-300 group rounded-xl"
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
          <div className="bg-gradient-to-br from-gray-50/50 to-white/50 rounded-xl border border-gray-100 overflow-hidden">
            <div
              className={`transition-all duration-500 ease-in-out ${
                showAdditional
                  ? "max-h-[2000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-3 sm:p-4  space-y-4">
                {/* LinkedIn & Portfolio - Compact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        onBlur={() => setLinkedinTouched(true)}
                        placeholder="linkedin.com/in/username"
                        className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-gradient-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                      />
                      {(isValid(linkedin, linkedinTouched) ||
                        linkedin?.trim() !== "") && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="flex items-center justify-center w-4 h-4 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full shadow-sm">
                            <IoCheckmark className="w-2.5 h-2.5 text-white" />
                          </div>
                        </div>
                      )}
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
                        value={portfolio}
                        onChange={(e) => setPortfolio(e.target.value)}
                        onBlur={() => setPortfolioTouched(true)}
                        placeholder="yourportfolio.com"
                        className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-gradient-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                      />
                      {(isValid(portfolio, portfolioTouched) ||
                        portfolio?.trim() !== "") && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="flex items-center justify-center w-4 h-4 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full shadow-sm">
                            <IoCheckmark className="w-2.5 h-2.5 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        onBlur={() => setAddressTouched(true)}
                        placeholder="123 Main Street, Apt 4B"
                        className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-gradient-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                      />
                      {(isValid(address, addressTouched) ||
                        address?.trim() !== "") && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="flex items-center justify-center w-4 h-4 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full shadow-sm">
                            <IoCheckmark className="w-2.5 h-2.5 text-white" />
                          </div>
                        </div>
                      )}
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
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                        onBlur={() => setPostTouched(true)}
                        placeholder="10001"
                        className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-gradient-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                      />
                      {(isValid(postcode, postTouched) ||
                        postcode?.trim() !== "") && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="flex items-center justify-center w-4 h-4 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full shadow-sm">
                            <IoCheckmark className="w-2.5 h-2.5 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Location Information - Compact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        onBlur={() => setCountryTouched(true)}
                        placeholder="United States"
                        className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-gradient-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                      />
                      {(isValid(country, countryTouched) ||
                        country?.trim() !== "") && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="flex items-center justify-center w-4 h-4 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full shadow-sm">
                            <IoCheckmark className="w-2.5 h-2.5 text-white" />
                          </div>
                        </div>
                      )}
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
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onBlur={() => setCityTouched(true)}
                        placeholder="New York"
                        className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-gradient-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                      />
                      {(isValid(city, cityTouched) || city?.trim() !== "") && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="flex items-center justify-center w-4 h-4 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full shadow-sm">
                            <IoCheckmark className="w-2.5 h-2.5 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
});

export default Contact_form;
