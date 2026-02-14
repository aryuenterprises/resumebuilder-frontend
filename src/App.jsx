import { createContext, useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Homepage from "./Componets/Homepage";
import Choose_template from "./Componets/Choose_template";
import Resume_details from "./Componets/Resume_details";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Forget_password from "./Pages/Forget_password";
import TermsPage from "./Pages/TermsPage";
import Policy from "./Pages/Polciy";
import Cookies from "./Pages/Cookies";
import Subscription from "./Pages/Subscription";
import Layout from "./Componets/Layout";
import Resume1 from "./Templates/Resume1";
import RegisterForm from "./Pages/RegisterForm.jsx";
import Chnage_template from "./Pages/Change_template.jsx";
import Dashboard from "./Dashboard component/Dashboard.jsx";
import PaymentPlans from "./Pages/PaymentPlans.jsx";
import Setting from "./Dashboard component/Setting.jsx";
import Logout from "./Dashboard component/Logout.jsx";
import Resume from "./Dashboard component/document-modules/Resume.jsx";
import Plan from "./Dashboard component/plan.jsx";

import { ToastContainer } from "react-toastify";
import Pdf_download from "./Componets/Pdf_download.jsx";
import axios from "axios";
import { API_URL } from "./Config.jsx";
import Password from "./Pages/Password.jsx";
import SubscriptionPopup from "./Componets/SubscriptionPopup.jsx";
import Payment_history from "./Dashboard component/Payment_history.jsx";
import Error from "./Pages/Error.jsx";
import Email_verify from "./Pages/Email_verify.jsx";
import HomePage from "./Pages/HomePage.jsx";
import ScrollToTop from "./Componets/common/ScrollToTop.jsx";

export const CreateContext = createContext(); // Create context

const App = () =>  {
  const [userLoggedIn, setUserLoggedIn] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("Resumnit_user"));
    setUserId(userdata?.id || userdata?._id);
    setUserLoggedIn(userdata);
  }, []);

  const [globalState, setGlobalState] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [tags, setTags] = useState([]);
  const [tones, setTones] = useState([]);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postcode, setPostcode] = useState("");
  const [contactid, setContactid] = useState("");
  const [croppedImage, setCroppedImage] = useState(null);
  const [experiences, setExperiences] = useState([
    {
      id: Date.now(),
      jobTitle: "",
      employer: "",
      location: "",
      text: "",
      startDate: null,
      endDate: null,
      isOpen: true,
      touched: {},
      showPicker: false,
      year: new Date().getFullYear(),
    },
  ]);
  const [education, setEducation] = useState([
    {
      id: Date.now(),
      schoolname: "",
      degree: "",
      location: "",
      text: "",
      startDate: null,
      endDate: null,
      isOpen: true,
      touched: {},
      showPicker: false,
      year: new Date().getFullYear(),
    },
  ]);
  const [skills, setSkills] = useState([
    { skill: "", level: 2, id: Date.now() + Math.random() },
  ]);
  const [text, setText] = useState("");
  const [allplandetails, setAllplandetails] = useState([]);
  const [allPlanStatusDetails, setAllPlanStatusDetails] = useState("");
  const [Userdata, setUserdata] = useState([]);
  const [accessdate, setAccessdate] = useState("");
  const [globalSkillsData, setGlobalSkillsData] = useState([
    { globalSkill: "", level: 2, id: Date.now() + Math.random() },
  ]);
  const [currencysymbol, setCurrencySymbol] = useState([]);
  const [userdelete, setuserdelete] = useState(null);
  const [logoimage, setLogoImage] = useState("");
 
  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("Resumnit_user"));
    const userId = userdata?.id || userdata?._id;

    if (!userId) return;

    const fetchPlans = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/users/dashboard`, {
          params: { userId },
        });

        const plans = res?.data?.payments?.[0]?.plan || [];
        setAllplandetails(plans);
        setAllPlanStatusDetails(res?.data?.payments?.[0]?.status);
        setAccessdate(res?.data?.payments?.[0]?.accessPeriod);

        setCurrencySymbol(res?.data?.setting?.[0]?.currenyType);
        setuserdelete(res?.data?.user?.shouldRedirect);
        if (res?.data?.user?.shouldRedirect === true) {
          localStorage.removeItem("Resumnit_user");
          localStorage.removeItem("Resumnit_token");
          navigate("/", { replace: true });
        }

        // setlogoimage(res?.data?.setting?.[0]?.logoImage)

        // Assume this is inside your useEffect or API call
        const logoFromApi = res?.data?.setting?.[0]?.logoImage;

        if (logoFromApi) {
          const logoUrl = `${API_URL}/api/uploads/others/${logoFromApi}`;

          // Set in state
          setLogoImage(logoFromApi);

          //   in localStorage
          localStorage.setItem("dashboardLogo", logoUrl);
        }

        // console.log("Fetched plan details:", plans);
      } catch (err) {
        console.error("Error fetching plans:", err);
      }
    };

    fetchPlans();
    const interval = setInterval(fetchPlans, 60000);

    return () => clearInterval(interval);
  }, [location.pathname]);

  const [logoPreview, setLogoPreview] = useState("");

  // On component mount, load from localStorage
  useEffect(() => {
    const savedLogo = localStorage.getItem("dashboardLogo");
    if (savedLogo) {
      setLogoPreview(savedLogo);
    }
  }, []);

  return (
    <>
      <CreateContext.Provider
        value={{
          globalState,
          setGlobalState,
          
          contactid,
          setContactid,
          firstName,
          setFirstName,
          lastName,
          setLastName,
          jobTitle,
          setJobTitle,
          phone,
          setPhone,
          email,
          setEmail,
          tags,
          setTags,
          tones,
          setTones,
          address,
          setAddress,
          city,
          setCity,
          country,
          setCountry,
          postcode,
          setPostcode,
          linkedin,
          setLinkedin,
          portfolio,
          setPortfolio,
          croppedImage,
          setCroppedImage,
          experiences,
          setExperiences,
          education,
          setEducation,
          text,
          setText,
          skills,
          setSkills,
          globalSkillsData,
          setGlobalSkillsData,
          allplandetails,
          setAllplandetails,
          allPlanStatusDetails,
          Userdata,
          setUserdata,
          accessdate,
          setAccessdate,
          currencysymbol,
          setCurrencySymbol,
          userdelete,
          setuserdelete,
          logoPreview,
          setLogoPreview,
        }}
      >
        <Layout>
          <ToastContainer />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/choose-template" element={<Choose_template />} />
            <Route path="/resume-details" element={<Resume_details />} />
            {/* <Route path="/Resume-details/:id/:name" element={<Resume_details />} /> */}

            <Route path="/contact-us" element={<Contact />} />

            <Route path="/register-form" element={<RegisterForm />} />
            <Route path="/change-template" element={<Chnage_template />} />

            <Route path="/verify-email-success" element={<Email_verify />} />

            <Route path="/loging" element={<Login />} />
            <Route path="/forget-password" element={<Forget_password />} />
            <Route path="/change-password" element={<Password />} />

            {/* terms pages */}
            <Route path="/terms-conditions" element={<TermsPage />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/cookies" element={<Cookies />} />

            <Route path="/subscription" element={<Subscription />} />

            {/* resume template */}

            <Route path="/resume1" element={<Resume1 />} />

            {/* dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Setting />} />
            <Route path="/loginig" element={<Logout />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/plan" element={<Plan />} />
            <Route path="/Plan-history" element={<Payment_history />} />

            {/* payment plans */}

            <Route path="/payment-plan" element={<PaymentPlans />} />

            <Route path="/pdf-download" element={<Pdf_download />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Layout>
      </CreateContext.Provider>
    </>
  );
}

export default App;




