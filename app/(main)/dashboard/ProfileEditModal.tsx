// // ProfileEditModal.tsx
// "use client";

// import React, { useState, useEffect, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiX,
//   FiUser,
//   FiMail,
//   FiPhone,
//   FiMapPin,
//   FiSave,
//   FiCheck,
//   FiLock,
// } from "react-icons/fi";
// import toast from "react-hot-toast";
// import apiClient from "@/app/utils/apiClient";

// interface ProfileData {
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone: string;
//   country: string;
//   city: string;
//   state: string;
// }

// interface ProfileEditModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   profile: ProfileData | null;
//   onSuccess?: () => void;
// }

// const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
//   isOpen,
//   onClose,
//   profile,
//   onSuccess,
// }) => {
//   const [formData, setFormData] = useState<ProfileData>({
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone: "",
//     country: "",
//     city: "",
//     state: "",
//   });
//   const [initialData, setInitialData] = useState<ProfileData>({
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone: "",
//     country: "",
//     city: "",
//     state: "",
//   });
//   const [isSaving, setIsSaving] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   // Sync form when modal opens
//   useEffect(() => {
//     if (profile && isOpen) {
//       const next = {
//         first_name: profile.first_name || "",
//         last_name: profile.last_name || "",
//         email: profile.email || "",
//         phone: profile.phone || "",
//         country: profile.country || "",
//         city: profile.city || "",
//         state: profile.state || "",
//       };
//       setFormData(next);
//       setInitialData(next);
//       setErrors({});
//       setIsSuccess(false);
//     }
//   }, [profile, isOpen]);

//   // Lock body scroll
//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "auto";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isOpen]);

//   // Esc to close
//   useEffect(() => {
//     if (!isOpen) return;
//     const handler = (e: KeyboardEvent) => {
//       if (e.key === "Escape" && !isSaving) onClose();
//     };
//     window.addEventListener("keydown", handler);
//     return () => window.removeEventListener("keydown", handler);
//   }, [isOpen, isSaving, onClose]);

//   // Dirty check (email excluded since it's read-only)
//   const isDirty = useMemo(() => {
//     const editableKeys: (keyof ProfileData)[] = [
//       "first_name",
//       "last_name",
//       "phone",
//       "country",
//       "city",
//       "state",
//     ];
//     return editableKeys.some(
//       (k) => formData[k].trim() !== initialData[k].trim(),
//     );
//   }, [formData, initialData]);

//   const handleChange = (field: keyof ProfileData, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     if (errors[field]) {
//       setErrors((prev) => {
//         const next = { ...prev };
//         delete next[field];
//         return next;
//       });
//     }
//   };

//   const validate = () => {
//     const newErrors: Record<string, string> = {};

//     if (!formData.first_name.trim()) {
//       newErrors.first_name = "First name is required";
//     }
//     if (!formData.last_name.trim()) {
//       newErrors.last_name = "Last name is required";
//     }
//     if (formData.phone && !/^[\d\s()+\-]{6,20}$/.test(formData.phone)) {
//       newErrors.phone = "Enter a valid phone number";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validate()) return;

//     const userDetails = JSON.parse(
//       localStorage.getItem("user_details") || "{}",
//     );
//     const userId = userDetails?.id;

//     if (!userId) {
//       toast.error("User session not found. Please login again.");
//       return;
//     }

//     try {
//       setIsSaving(true);

//       // Email intentionally excluded from the payload — it's read-only.
//       const { email, ...payload } = formData;

//       const res = await apiClient.patch(
//         `/registered-user/${userId}`,
//         payload,
//       );

//       if (res?.data) {
//         const updatedUserDetails = { ...userDetails, ...formData };
//         localStorage.setItem(
//           "user_details",
//           JSON.stringify(updatedUserDetails),
//         );

//         setIsSuccess(true);
//         setTimeout(() => {
//           toast.success("Profile updated successfully!");
//           onSuccess?.();
//           onClose();
//           setTimeout(() => setIsSuccess(false), 300);
//         }, 600);
//       }
//     } catch (err: any) {
//       console.error(err);
//       const message =
//         err?.response?.data?.message ||
//         err?.response?.data?.error ||
//         "Failed to update profile. Please try again.";
//       toast.error(message);
//     } finally {
//       if (!isSuccess) setIsSaving(false);
//       else setTimeout(() => setIsSaving(false), 700);
//     }
//   };

//   // Shared input class helper to keep JSX clean
//   const inputClass = (hasError?: boolean) =>
//     `w-full px-3 py-2.5 text-sm bg-white border rounded-xl outline-none transition-all placeholder:text-gray-300 ${
//       hasError
//         ? "border-red-300 bg-red-50/50 focus:border-red-400 focus:ring-2 focus:ring-red-100"
//         : "border-gray-200 hover:border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
//     }`;

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-3 sm:p-4"
//           onClick={() => !isSaving && onClose()}
//         >
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0, y: 20 }}
//             animate={{ scale: 1, opacity: 1, y: 0 }}
//             exit={{ scale: 0.9, opacity: 0, y: 20 }}
//             transition={{ type: "spring", damping: 25, stiffness: 300 }}
//             className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-lg max-h-[95vh] overflow-hidden flex flex-col"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Success overlay */}
//             <AnimatePresence>
//               {isSuccess && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="absolute inset-0 z-30 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center gap-3"
//                 >
//                   <motion.div
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ type: "spring", stiffness: 260, damping: 18 }}
//                     className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center"
//                   >
//                     <FiCheck className="w-8 h-8 text-emerald-600" />
//                   </motion.div>
//                   <p className="text-sm font-medium text-gray-700">
//                     Profile Saved!
//                   </p>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Header */}
//             <div className="bg-gradient-to-r from-indigo-600 to-purple-500 p-4 sm:p-5 flex-shrink-0">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2 sm:gap-3">
//                   <div className="p-1.5 sm:p-2 bg-white/20 rounded-lg">
//                     <FiUser className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                   </div>
//                   <div>
//                     <h2 className="text-base sm:text-lg font-bold text-white">
//                       Edit Profile
//                     </h2>
//                     <p className="text-indigo-100 text-[11px] sm:text-xs">
//                       Update your personal information
//                     </p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => !isSaving && onClose()}
//                   disabled={isSaving}
//                   className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition cursor-pointer disabled:opacity-50"
//                 >
//                   <FiX className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                 </button>
//               </div>
//             </div>

//             {/* Form */}
//             <form
//               onSubmit={handleSubmit}
//               className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4"
//             >
//               {/* First / Last name */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                 <div>
//                   <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                     First Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.first_name}
//                     onChange={(e) =>
//                       handleChange("first_name", e.target.value)
//                     }
//                     className={inputClass(!!errors.first_name)}
//                     placeholder="Enter first name"
//                   />
//                   <AnimatePresence>
//                     {errors.first_name && (
//                       <motion.p
//                         initial={{ opacity: 0, y: -4 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -4 }}
//                         className="text-red-500 text-[11px] mt-1.5"
//                       >
//                         {errors.first_name}
//                       </motion.p>
//                     )}
//                   </AnimatePresence>
//                 </div>
//                 <div>
//                   <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                     Last Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.last_name}
//                     onChange={(e) =>
//                       handleChange("last_name", e.target.value)
//                     }
//                     className={inputClass(!!errors.last_name)}
//                     placeholder="Enter last name"
//                   />
//                   <AnimatePresence>
//                     {errors.last_name && (
//                       <motion.p
//                         initial={{ opacity: 0, y: -4 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -4 }}
//                         className="text-red-500 text-[11px] mt-1.5"
//                       >
//                         {errors.last_name}
//                       </motion.p>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </div>

//               {/* Email — read-only */}
//               <div>
//                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                   <FiMail className="inline w-3.5 h-3.5 mr-1" /> Email
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="email"
//                     value={formData.email}
//                     readOnly
//                     disabled
//                     className="w-full pl-3 pr-10 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none text-gray-500 cursor-not-allowed"
//                   />
//                   <FiLock className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
//                 </div>
//                 <p className="text-gray-400 text-[11px] mt-1.5">
//                   Email cannot be changed
//                 </p>
//               </div>

//               {/* Phone + Country — same row */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                 <div>
//                   <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                     <FiPhone className="inline w-3.5 h-3.5 mr-1" /> Phone
//                   </label>
//                   <input
//                     type="tel"
//                     value={formData.phone}
//                     onChange={(e) => handleChange("phone", e.target.value)}
//                     className={inputClass(!!errors.phone)}
//                     placeholder="+1 (555) 000-0000"
//                   />
//                   <AnimatePresence>
//                     {errors.phone && (
//                       <motion.p
//                         initial={{ opacity: 0, y: -4 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -4 }}
//                         className="text-red-500 text-[11px] mt-1.5"
//                       >
//                         {errors.phone}
//                       </motion.p>
//                     )}
//                   </AnimatePresence>
//                 </div>
//                 <div>
//                   <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                     <FiMapPin className="inline w-3.5 h-3.5 mr-1" /> Country
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.country}
//                     onChange={(e) => handleChange("country", e.target.value)}
//                     className={inputClass()}
//                     placeholder="Country"
//                   />
//                 </div>
//               </div>

//               {/* State + City — same row */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                 <div>
//                   <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                     State
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.state}
//                     onChange={(e) => handleChange("state", e.target.value)}
//                     className={inputClass()}
//                     placeholder="State"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                     City
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.city}
//                     onChange={(e) => handleChange("city", e.target.value)}
//                     className={inputClass()}
//                     placeholder="City"
//                   />
//                 </div>
//               </div>

//               {/* Actions */}
//               <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   disabled={isSaving}
//                   className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isSaving || !isDirty}
//                   className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
//                 >
//                   {isSaving ? (
//                     <>
//                       <motion.div
//                         className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white"
//                         animate={{ rotate: 360 }}
//                         transition={{
//                           duration: 0.8,
//                           repeat: Infinity,
//                           ease: "linear",
//                         }}
//                       />
//                       Saving...
//                     </>
//                   ) : (
//                     <>
//                       <FiSave className="w-4 h-4" />
//                       {isDirty ? "Save Changes" : "No changes"}
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default ProfileEditModal;














// // ProfileEditModal.tsx
// "use client";

// import React, { useState, useEffect, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiX,
//   FiUser,
//   FiMail,
//   FiPhone,
//   FiMapPin,
//   FiSave,
//   FiCheck,
//   FiLock,
// } from "react-icons/fi";
// import toast from "react-hot-toast";
// import apiClient from "@/app/utils/apiClient";

// interface ProfileData {
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone: string;
//   country: string;
//   city: string;
//   state: string;
// }

// interface ProfileEditModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   profile: ProfileData | null;
//   onSuccess?: () => void;
// }

// // --- Validation regexes -------------------------------------------------
// // Letters only (incl. unicode letters), spaces, hyphens, apostrophes.
// // No digits, no special characters like @, #, $, etc.
// const NAME_REGEX = /^[\p{L}][\p{L}\s'.-]*$/u;

// // Letters, spaces, hyphens, apostrophes, periods, commas (for place names).
// const PLACE_REGEX = /^[\p{L}][\p{L}\s'.,-]*$/u;

// // Phone: optional +, digits, spaces, hyphens, parentheses. 7-15 digits total.
// const PHONE_REGEX = /^\+?[\d\s()-]{7,20}$/;
// const PHONE_DIGITS_REGEX = /\d/g;

// const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
//   isOpen,
//   onClose,
//   profile,
//   onSuccess,
// }) => {
//   const [formData, setFormData] = useState<ProfileData>({
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone: "",
//     country: "",
//     city: "",
//     state: "",
//   });
//   const [initialData, setInitialData] = useState<ProfileData>({
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone: "",
//     country: "",
//     city: "",
//     state: "",
//   });
//   const [isSaving, setIsSaving] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   // Sync form when modal opens
//   useEffect(() => {
//     if (profile && isOpen) {
//       const next = {
//         first_name: profile.first_name || "",
//         last_name: profile.last_name || "",
//         email: profile.email || "",
//         phone: profile.phone || "",
//         country: profile.country || "",
//         city: profile.city || "",
//         state: profile.state || "",
//       };
//       setFormData(next);
//       setInitialData(next);
//       setErrors({});
//       setIsSuccess(false);
//     }
//   }, [profile, isOpen]);

//   // Lock body scroll
//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "auto";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isOpen]);

//   // Esc to close
//   useEffect(() => {
//     if (!isOpen) return;
//     const handler = (e: KeyboardEvent) => {
//       if (e.key === "Escape" && !isSaving) onClose();
//     };
//     window.addEventListener("keydown", handler);
//     return () => window.removeEventListener("keydown", handler);
//   }, [isOpen, isSaving, onClose]);

//   // Dirty check (email excluded since it's read-only)
//   const isDirty = useMemo(() => {
//     const editableKeys: (keyof ProfileData)[] = [
//       "first_name",
//       "last_name",
//       "phone",
//       "country",
//       "city",
//       "state",
//     ];
//     return editableKeys.some(
//       (k) => formData[k].trim() !== initialData[k].trim(),
//     );
//   }, [formData, initialData]);

//   // --- Per-field validators --------------------------------------------
//   const validateField = (
//     field: keyof ProfileData,
//     value: string,
//   ): string | null => {
//     const trimmed = value.trim();

//     // Email is read-only — always valid
//     if (field === "email") return null;

//     // All editable fields are mandatory
//     if (!trimmed) {
//       switch (field) {
//         case "first_name":
//           return "First name is required";
//         case "last_name":
//           return "Last name is required";
//         case "phone":
//           return "Phone number is required";
//         case "country":
//           return "Country is required";
//         case "state":
//           return "State is required";
//         case "city":
//           return "City is required";
//         default:
//           return "This field is required";
//       }
//     }

//     switch (field) {
//       case "first_name":
//       case "last_name": {
//         if (trimmed.length < 2)
//           return `${field === "first_name" ? "First" : "Last"} name must be at least 2 characters`;
//         if (trimmed.length > 50)
//           return `${field === "first_name" ? "First" : "Last"} name must be under 50 characters`;
//         if (/\d/.test(trimmed))
//           return "Numbers are not allowed in names";
//         if (!NAME_REGEX.test(trimmed))
//           return "Only letters, spaces, hyphens and apostrophes are allowed";
//         return null;
//       }

//       case "phone": {
//         if (!PHONE_REGEX.test(trimmed))
//           return "Only digits, spaces, +, -, ( ) are allowed";
//         const digits = (trimmed.match(PHONE_DIGITS_REGEX) || []).length;
//         if (digits < 7) return "Phone number is too short";
//         if (digits > 15) return "Phone number is too long";
//         return null;
//       }

//       case "country":
//       case "state":
//       case "city": {
//         if (trimmed.length < 2)
//           return `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least 2 characters`;
//         if (trimmed.length > 60)
//           return `${field.charAt(0).toUpperCase() + field.slice(1)} must be under 60 characters`;
//         if (/\d/.test(trimmed))
//           return "Numbers are not allowed here";
//         if (!PLACE_REGEX.test(trimmed))
//           return "Only letters, spaces, hyphens, periods and commas are allowed";
//         return null;
//       }

//       default:
//         return null;
//     }
//   };

//   const validateAll = (): Record<string, string> => {
//     const newErrors: Record<string, string> = {};
//     (Object.keys(formData) as (keyof ProfileData)[]).forEach((field) => {
//       const err = validateField(field, formData[field]);
//       if (err) newErrors[field] = err;
//     });
//     return newErrors;
//   };

//   const handleChange = (field: keyof ProfileData, value: string) => {
//     // Block characters that can never be valid in the given field
//     // so the user gets immediate feedback while typing.
//     if (field === "first_name" || field === "last_name") {
//       // allow letters, spaces, hyphens, apostrophes, periods
//       if (/[0-9]/.test(value)) return;
//       if (!/^[\p{L}\s'.-]*$/u.test(value)) return;
//     }
//     if (field === "country" || field === "state" || field === "city") {
//       if (/[0-9]/.test(value)) return;
//       if (!/^[\p{L}\s'.,-]*$/u.test(value)) return;
//     }
//     if (field === "phone") {
//       if (!/^[+\d\s()-]*$/.test(value)) return;
//     }

//     setFormData((prev) => ({ ...prev, [field]: value }));

//     // Clear error for this field as user types
//     if (errors[field]) {
//       setErrors((prev) => {
//         const next = { ...prev };
//         delete next[field];
//         return next;
//       });
//     }
//   };

//   const handleBlur = (field: keyof ProfileData) => {
//     const err = validateField(field, formData[field]);
//     setErrors((prev) => {
//       const next = { ...prev };
//       if (err) next[field] = err;
//       else delete next[field];
//       return next;
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const newErrors = validateAll();
//     setErrors(newErrors);

//     if (Object.keys(newErrors).length > 0) {
//       toast.error("Please fix the highlighted fields");
//       return;
//     }

//     const userDetails = JSON.parse(
//       localStorage.getItem("user_details") || "{}",
//     );
//     const userId = userDetails?.id;

//     if (!userId) {
//       toast.error("User session not found. Please login again.");
//       return;
//     }

//     try {
//       setIsSaving(true);

//       // Email intentionally excluded from the payload — it's read-only.
//       const { email, ...payload } = formData;
//       // Trim all string values before sending
//       const trimmedPayload = Object.fromEntries(
//         Object.entries(payload).map(([k, v]) => [k, v.trim()]),
//       );

//       const res = await apiClient.patch(
//         `/registered-user/${userId}`,
//         trimmedPayload,
//       );

//       if (res?.data) {
//         const updatedUserDetails = { ...userDetails, ...trimmedPayload };
//         localStorage.setItem(
//           "user_details",
//           JSON.stringify(updatedUserDetails),
//         );

//         setIsSuccess(true);
//         setTimeout(() => {
//           toast.success("Profile updated successfully!");
//           onSuccess?.();
//           onClose();
//           setTimeout(() => setIsSuccess(false), 300);
//         }, 600);
//       }
//     } catch (err: any) {
//       console.error(err);
//       const message =
//         err?.response?.data?.message ||
//         err?.response?.data?.error ||
//         "Failed to update profile. Please try again.";
//       toast.error(message);
//     } finally {
//       if (!isSuccess) setIsSaving(false);
//       else setTimeout(() => setIsSaving(false), 700);
//     }
//   };

//   // Shared input class helper to keep JSX clean
//   const inputClass = (hasError?: boolean) =>
//     `w-full px-3 py-2.5 text-sm bg-white border rounded-xl outline-none transition-all placeholder:text-gray-300 ${
//       hasError
//         ? "border-red-300 bg-red-50/50 focus:border-red-400 focus:ring-2 focus:ring-red-100"
//         : "border-gray-200 hover:border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
//     }`;

//   // Error message renderer
//   const renderError = (field: keyof ProfileData) => (
//     <AnimatePresence>
//       {errors[field] && (
//         <motion.p
//           initial={{ opacity: 0, y: -4 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -4 }}
//           className="text-red-500 text-[11px] mt-1.5"
//         >
//           {errors[field]}
//         </motion.p>
//       )}
//     </AnimatePresence>
//   );

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-3 sm:p-4"
//           onClick={() => !isSaving && onClose()}
//         >
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0, y: 20 }}
//             animate={{ scale: 1, opacity: 1, y: 0 }}
//             exit={{ scale: 0.9, opacity: 0, y: 20 }}
//             transition={{ type: "spring", damping: 25, stiffness: 300 }}
//             className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-lg max-h-[95vh] overflow-hidden flex flex-col"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Success overlay */}
//             <AnimatePresence>
//               {isSuccess && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="absolute inset-0 z-30 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center gap-3"
//                 >
//                   <motion.div
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ type: "spring", stiffness: 260, damping: 18 }}
//                     className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center"
//                   >
//                     <FiCheck className="w-8 h-8 text-emerald-600" />
//                   </motion.div>
//                   <p className="text-sm font-medium text-gray-700">
//                     Profile Saved!
//                   </p>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Header */}
//             <div className="bg-gradient-to-r from-indigo-600 to-purple-500 p-4 sm:p-5 flex-shrink-0">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2 sm:gap-3">
//                   <div className="p-1.5 sm:p-2 bg-white/20 rounded-lg">
//                     <FiUser className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                   </div>
//                   <div>
//                     <h2 className="text-base sm:text-lg font-bold text-white">
//                       Edit Profile
//                     </h2>
//                     <p className="text-indigo-100 text-[11px] sm:text-xs">
//                       Update your personal information
//                     </p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => !isSaving && onClose()}
//                   disabled={isSaving}
//                   className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition cursor-pointer disabled:opacity-50"
//                 >
//                   <FiX className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                 </button>
//               </div>
//             </div>

//             {/* Form */}
//             <form
//               onSubmit={handleSubmit}
//               className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4"
//               noValidate
//             >
//               {/* First / Last name */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                 <div>
//                   <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                     First Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.first_name}
//                     onChange={(e) =>
//                       handleChange("first_name", e.target.value)
//                     }
//                     onBlur={() => handleBlur("first_name")}
//                     className={inputClass(!!errors.first_name)}
//                     placeholder="Enter first name"
//                     autoComplete="given-name"
//                   />
//                   {renderError("first_name")}
//                 </div>
//                 <div>
//                   <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                     Last Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.last_name}
//                     onChange={(e) =>
//                       handleChange("last_name", e.target.value)
//                     }
//                     onBlur={() => handleBlur("last_name")}
//                     className={inputClass(!!errors.last_name)}
//                     placeholder="Enter last name"
//                     autoComplete="family-name"
//                   />
//                   {renderError("last_name")}
//                 </div>
//               </div>

//               {/* Email — read-only */}
//               <div>
//                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                   <FiMail className="inline w-3.5 h-3.5 mr-1" /> Email
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="email"
//                     value={formData.email}
//                     readOnly
//                     disabled
//                     className="w-full pl-3 pr-10 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none text-gray-500 cursor-not-allowed"
//                   />
//                   <FiLock className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
//                 </div>
//                 <p className="text-gray-400 text-[11px] mt-1.5">
//                   Email cannot be changed
//                 </p>
//               </div>

//               {/* Phone + Country — same row */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                 <div>
//                   <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                     <FiPhone className="inline w-3.5 h-3.5 mr-1" /> Phone{" "}
//                     <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="tel"
//                     value={formData.phone}
//                     onChange={(e) => handleChange("phone", e.target.value)}
//                     onBlur={() => handleBlur("phone")}
//                     className={inputClass(!!errors.phone)}
//                     placeholder="+1 (555) 000-0000"
//                     autoComplete="tel"
//                   />
//                   {renderError("phone")}
//                 </div>
//                 <div>
//                   <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                     <FiMapPin className="inline w-3.5 h-3.5 mr-1" /> Country{" "}
//                     <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.country}
//                     onChange={(e) => handleChange("country", e.target.value)}
//                     onBlur={() => handleBlur("country")}
//                     className={inputClass(!!errors.country)}
//                     placeholder="Country"
//                     autoComplete="country-name"
//                   />
//                   {renderError("country")}
//                 </div>
//               </div>

//               {/* State + City — same row */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                 <div>
//                   <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                     State <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.state}
//                     onChange={(e) => handleChange("state", e.target.value)}
//                     onBlur={() => handleBlur("state")}
//                     className={inputClass(!!errors.state)}
//                     placeholder="State"
//                     autoComplete="address-level1"
//                   />
//                   {renderError("state")}
//                 </div>
//                 <div>
//                   <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                     City <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.city}
//                     onChange={(e) => handleChange("city", e.target.value)}
//                     onBlur={() => handleBlur("city")}
//                     className={inputClass(!!errors.city)}
//                     placeholder="City"
//                     autoComplete="address-level2"
//                   />
//                   {renderError("city")}
//                 </div>
//               </div>

//               {/* Actions */}
//               <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   disabled={isSaving}
//                   className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isSaving || !isDirty}
//                   className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
//                 >
//                   {isSaving ? (
//                     <>
//                       <motion.div
//                         className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white"
//                         animate={{ rotate: 360 }}
//                         transition={{
//                           duration: 0.8,
//                           repeat: Infinity,
//                           ease: "linear",
//                         }}
//                       />
//                       Saving...
//                     </>
//                   ) : (
//                     <>
//                       <FiSave className="w-4 h-4" />
//                       {isDirty ? "Save Changes" : "No changes"}
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default ProfileEditModal;
























// ProfileEditModal.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiSave,
  FiCheck,
  FiLock,
} from "react-icons/fi";
import toast from "react-hot-toast";
import apiClient from "@/app/utils/apiClient";

interface ProfileData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  state: string;
}

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData | null;
  onSuccess?: () => void;
}

// --- Validation regexes -------------------------------------------------
// Letters only (incl. unicode letters), spaces, hyphens, apostrophes.
const NAME_REGEX = /^[\p{L}][\p{L}\s'.-]*$/u;

// Letters, spaces, hyphens, apostrophes, periods, commas (for place names).
const PLACE_REGEX = /^[\p{L}][\p{L}\s'.,-]*$/u;

// Phone: exactly 10 digits (formatting characters stripped on input).
const PHONE_REGEX = /^\d{10}$/;
const PHONE_MAX_DIGITS = 10;

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<ProfileData>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    state: "",
  });
  const [initialData, setInitialData] = useState<ProfileData>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    state: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync form when modal opens
  useEffect(() => {
    if (profile && isOpen) {
      const next = {
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        email: profile.email || "",
        // Normalize phone: keep only digits, max 10
        phone: (profile.phone || "")
          .replace(/\D/g, "")
          .slice(0, PHONE_MAX_DIGITS),
        country: profile.country || "",
        city: profile.city || "",
        state: profile.state || "",
      };
      setFormData(next);
      setInitialData(next);
      setErrors({});
      setIsSuccess(false);
    }
  }, [profile, isOpen]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Esc to close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSaving) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, isSaving, onClose]);

  // Dirty check (email excluded since it's read-only)
  const isDirty = useMemo(() => {
    const editableKeys: (keyof ProfileData)[] = [
      "first_name",
      "last_name",
      "phone",
      "country",
      "city",
      "state",
    ];
    return editableKeys.some(
      (k) => formData[k].trim() !== initialData[k].trim(),
    );
  }, [formData, initialData]);

  // --- Per-field validators --------------------------------------------
  const validateField = (
    field: keyof ProfileData,
    value: string,
  ): string | null => {
    const trimmed = value.trim();

    // Email is read-only — always valid
    if (field === "email") return null;

    // All editable fields are mandatory
    if (!trimmed) {
      switch (field) {
        case "first_name":
          return "First name is required";
        case "last_name":
          return "Last name is required";
        case "phone":
          return "Phone number is required";
        case "country":
          return "Country is required";
        case "state":
          return "State is required";
        case "city":
          return "City is required";
        default:
          return "This field is required";
      }
    }

    switch (field) {
      case "first_name":
      case "last_name": {
        if (trimmed.length < 2)
          return `${field === "first_name" ? "First" : "Last"} name must be at least 2 characters`;
        if (trimmed.length > 50)
          return `${field === "first_name" ? "First" : "Last"} name must be under 50 characters`;
        if (/\d/.test(trimmed))
          return "Numbers are not allowed in names";
        if (!NAME_REGEX.test(trimmed))
          return "Only letters, spaces, hyphens and apostrophes are allowed";
        return null;
      }

      case "phone": {
        // Strip formatting characters just in case
        const digits = trimmed.replace(/\D/g, "");
        if (digits.length === 0)
          return "Phone number is required";
        if (digits.length < PHONE_MAX_DIGITS)
          return `Phone number must be exactly ${PHONE_MAX_DIGITS} digits`;
        if (digits.length > PHONE_MAX_DIGITS)
          return `Phone number must be exactly ${PHONE_MAX_DIGITS} digits`;
        if (!PHONE_REGEX.test(digits))
          return "Only digits are allowed";
        return null;
      }

      case "country":
      case "state":
      case "city": {
        if (trimmed.length < 2)
          return `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least 2 characters`;
        if (trimmed.length > 60)
          return `${field.charAt(0).toUpperCase() + field.slice(1)} must be under 60 characters`;
        if (/\d/.test(trimmed))
          return "Numbers are not allowed here";
        if (!PLACE_REGEX.test(trimmed))
          return "Only letters, spaces, hyphens, periods and commas are allowed";
        return null;
      }

      default:
        return null;
    }
  };

  const validateAll = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};
    (Object.keys(formData) as (keyof ProfileData)[]).forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });
    return newErrors;
  };

  const handleChange = (field: keyof ProfileData, value: string) => {
    // Block characters that can never be valid in the given field
    // so the user gets immediate feedback while typing.
    if (field === "first_name" || field === "last_name") {
      if (/[0-9]/.test(value)) return;
      if (!/^[\p{L}\s'.-]*$/u.test(value)) return;
    }
    if (field === "country" || field === "state" || field === "city") {
      if (/[0-9]/.test(value)) return;
      if (!/^[\p{L}\s'.,-]*$/u.test(value)) return;
    }
    if (field === "phone") {
      // Keep only digits and cap at 10
      const digitsOnly = value.replace(/\D/g, "").slice(0, PHONE_MAX_DIGITS);
      setFormData((prev) => ({ ...prev, phone: digitsOnly }));

      if (errors.phone) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next.phone;
          return next;
        });
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error for this field as user types
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleBlur = (field: keyof ProfileData) => {
    const err = validateField(field, formData[field]);
    setErrors((prev) => {
      const next = { ...prev };
      if (err) next[field] = err;
      else delete next[field];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateAll();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the highlighted fields");
      return;
    }

    const userDetails = JSON.parse(
      localStorage.getItem("user_details") || "{}",
    );
    const userId = userDetails?.id;

    if (!userId) {
      toast.error("User session not found. Please login again.");
      return;
    }

    try {
      setIsSaving(true);

      // Email intentionally excluded from the payload — it's read-only.
      const { email, ...payload } = formData;
      // Trim all string values and normalize phone to digits-only
      const trimmedPayload = Object.fromEntries(
        Object.entries(payload).map(([k, v]) => [
          k,
          k === "phone" ? v.replace(/\D/g, "") : v.trim(),
        ]),
      );

      const res = await apiClient.patch(
        `/registered-user/${userId}`,
        trimmedPayload,
      );

      if (res?.data) {
        const updatedUserDetails = { ...userDetails, ...trimmedPayload };
        localStorage.setItem(
          "user_details",
          JSON.stringify(updatedUserDetails),
        );

        setIsSuccess(true);
        setTimeout(() => {
          toast.success("Profile updated successfully!");
          onSuccess?.();
          onClose();
          setTimeout(() => setIsSuccess(false), 300);
        }, 600);
      }
    } catch (err: any) {
      console.error(err);
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to update profile. Please try again.";
      toast.error(message);
    } finally {
      if (!isSuccess) setIsSaving(false);
      else setTimeout(() => setIsSaving(false), 700);
    }
  };

  // Shared input class helper to keep JSX clean
  const inputClass = (hasError?: boolean) =>
    `w-full px-3 py-2.5 text-sm bg-white border rounded-xl outline-none transition-all placeholder:text-gray-300 ${
      hasError
        ? "border-red-300 bg-red-50/50 focus:border-red-400 focus:ring-2 focus:ring-red-100"
        : "border-gray-200 hover:border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
    }`;

  // Error message renderer
  const renderError = (field: keyof ProfileData) => (
    <AnimatePresence>
      {errors[field] && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="text-red-500 text-[11px] mt-1.5"
        >
          {errors[field]}
        </motion.p>
      )}
    </AnimatePresence>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-3 sm:p-4"
          onClick={() => !isSaving && onClose()}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-lg max-h-[95vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Success overlay */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-30 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center gap-3"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center"
                  >
                    <FiCheck className="w-8 h-8 text-emerald-600" />
                  </motion.div>
                  <p className="text-sm font-medium text-gray-700">
                    Profile Saved!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-500 p-4 sm:p-5 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-white/20 rounded-lg">
                    <FiUser className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-white">
                      Edit Profile
                    </h2>
                    <p className="text-indigo-100 text-[11px] sm:text-xs">
                      Update your personal information
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => !isSaving && onClose()}
                  disabled={isSaving}
                  className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition cursor-pointer disabled:opacity-50"
                >
                  <FiX className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4"
              noValidate
            >
              {/* First / Last name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.first_name}
                    onChange={(e) =>
                      handleChange("first_name", e.target.value)
                    }
                    onBlur={() => handleBlur("first_name")}
                    className={inputClass(!!errors.first_name)}
                    placeholder="Enter first name"
                    autoComplete="given-name"
                  />
                  {renderError("first_name")}
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.last_name}
                    onChange={(e) =>
                      handleChange("last_name", e.target.value)
                    }
                    onBlur={() => handleBlur("last_name")}
                    className={inputClass(!!errors.last_name)}
                    placeholder="Enter last name"
                    autoComplete="family-name"
                  />
                  {renderError("last_name")}
                </div>
              </div>

              {/* Email — read-only */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  <FiMail className="inline w-3.5 h-3.5 mr-1" /> Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    readOnly
                    disabled
                    className="w-full pl-3 pr-10 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none text-gray-500 cursor-not-allowed"
                  />
                  <FiLock className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                </div>
                <p className="text-gray-400 text-[11px] mt-1.5">
                  Email cannot be changed
                </p>
              </div>

              {/* Phone + Country — same row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    <FiPhone className="inline w-3.5 h-3.5 mr-1" /> Phone{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={PHONE_MAX_DIGITS}
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    onBlur={() => handleBlur("phone")}
                    className={inputClass(!!errors.phone)}
                    placeholder="10-digit phone number"
                    autoComplete="tel"
                  />
                  {renderError("phone")}
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    <FiMapPin className="inline w-3.5 h-3.5 mr-1" /> Country{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => handleChange("country", e.target.value)}
                    onBlur={() => handleBlur("country")}
                    className={inputClass(!!errors.country)}
                    placeholder="Country"
                    autoComplete="country-name"
                  />
                  {renderError("country")}
                </div>
              </div>

              {/* State + City — same row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                    onBlur={() => handleBlur("state")}
                    className={inputClass(!!errors.state)}
                    placeholder="State"
                    autoComplete="address-level1"
                  />
                  {renderError("state")}
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    onBlur={() => handleBlur("city")}
                    className={inputClass(!!errors.city)}
                    placeholder="City"
                    autoComplete="address-level2"
                  />
                  {renderError("city")}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSaving}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving || !isDirty}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  {isSaving ? (
                    <>
                      <motion.div
                        className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FiSave className="w-4 h-4" />
                      {isDirty ? "Save Changes" : "No changes"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProfileEditModal;