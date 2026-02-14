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
  console.log(pic);
  const templateId = location.state?.templateId.id;
  console.log(templateId);
  const editid = location.state?.editid;
  console.log(editid);

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
        },
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
        `${API_URL}/api/desired-job-title/desired-job-title`,
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
        },
      );

      // toast.success("Contact updated successfully.");
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
        "blob",
      );
      setCroppedImage(croppedBlob);
      setImageSrc(null);
      setOpen(false);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels]);

  return (
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

        <form className="space-y-5 sm:space-y-6 bg-[#f3f4f6]/80 p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl ">
          {/* Profile Photo Section */}
          {pic === "true" && (
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
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        onBlur={() => setLinkedinTouched(true)}
                        placeholder="linkedin.com"
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
