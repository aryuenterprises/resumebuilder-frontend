import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import Header from "../Pages/Header";
import Resume4 from "../Templates/Resume4";
import Resume4PDF from "../Templates/Resume4pdf";
import Swal from "sweetalert2";
import axios from "axios";
import { API_URL } from "../Config";
import { CreateContext } from "../App";

function Pdf_download() {
  const UseContext = useContext(CreateContext);
  const Allplans = UseContext?.allplandetails;

  const [userLoggedIn, setUserLoggedIn] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfData, setPdfData] = useState(null);

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("Resumnit_user"));
    setUserId(userdata?.id || userdata?._id || "");
    setUserLoggedIn(userdata);
  }, []);

  const location = useLocation();
  const contactId = location.state?.contactId || location.state?.contactid || null;

  const [templateId, setTemplateId] = useState("");
  const [alldetails, setAlldetails] = useState({});

  const fetchContact = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/experience/get-all-contacts/${contactId}`,
      );

      if (response.data?.data?.length > 0) {
        const data = response.data.data[0];
        console.log("data",data)

        const formattedData = {
          contact: data.contact || {},
          educations: data.educations || [],
          experiences: data.experiences || [],
          skills: data.skills || [],
          finalize: data.finalize?.[0] || {},
          planSubscription: data.planSubscriptions?.[0] || {},
          summary: data.summary?.[0] || "", // Extract text from summary array
          resume: data.hasResume || [],
        };

        console.log("Fetched data:", formattedData); // Debug log
        
        setAlldetails(formattedData);
        setPdfData(formattedData); // Set PDF data separately
        setTemplateId(data.contact?.templateId || "");
      }
    } catch (error) {
      console.log("Error fetching contact:", error);
    }
  };

  useEffect(() => {
    if (contactId) {
      fetchContact();
    }
  }, [contactId]);

  const navigate = useNavigate();

  const handleEdit = (templateId, editid) => {
    navigate("/resume-details", {
      state: { templateId: { id: templateId }, editid: editid },
    });
  };

  const [hasPlan, setHasPlan] = useState(false);

  useEffect(() => {
    if (
      !Allplans ||
      Allplans === "FREE" ||
      (Array.isArray(Allplans) && Allplans.length === 0)
    ) {
      setHasPlan(false);
    } else {
      setHasPlan(true);
    }
  }, [Allplans]);

  // Function to handle PDF download and upload
  const handleDownloadAndUpload = async (blob) => {
    try {
      if (!blob) {
        console.error("No blob received");
        return;
      }

      const fileName = `${userLoggedIn.firstName || "resume"}.pdf`;
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      // Upload to backend
      const formData = new FormData();
      formData.append("resume", blob, fileName);
      formData.append("userId", userId);
      formData.append("contactId", alldetails.contact._id);
      formData.append("message", "success");

      await axios.post(`${API_URL}/api/users/download-resume`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        icon: "success",
        title: "PDF Downloaded",
        text: "Resume downloaded successfully!",
        timer: 2000,
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Upload error:", error);
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "PDF was downloaded but could not be saved to your account.",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };


  console.log("pdfData",pdfData)

  return (
    <div className="relative">
      <Header />
      <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
        {/* <h2 className="text-xl font-semibold font-nunito mb-4 text-gray-700">
          Download Your Resume
        </h2> */}

        {/* Download Button using react-pdf */}
        {/* <div className="mt-2 mb-6">
          {pdfData ? (
            <PDFDownloadLink
              document={<Resume4PDF data={pdfData} />}
              fileName={`${userLoggedIn.firstName || "resume"}.pdf`}
              className="download-btn bg-red-600 text-white px-6 py-3 font-nunito rounded-lg font-semibold hover:bg-red-700 transition shadow-md"
              onClick={() => {
                console.log("Starting PDF generation with data:", pdfData);
                setLoading(true);
              }}
              onRender={({ blob, error }) => {
                if (error) {
                  console.error("PDF generation error:", error);
                  Swal.fire({
                    icon: "error",
                    title: "PDF Generation Failed",
                    text: error.message || "Could not generate PDF",
                    confirmButtonText: "OK",
                  });
                  setLoading(false);
                  return;
                }
                
                if (blob) {
                  console.log("PDF blob generated:", blob);
                  handleDownloadAndUpload(blob);
                } else {
                  console.error("No blob received");
                  setLoading(false);
                }
              }}
            >
              {({ loading: pdfLoading }) => (
                <span>
                  {pdfLoading || loading ? "Generating PDF..." : "Download PDF"}
                </span>
              )}
            </PDFDownloadLink>
          ) : (
            <button 
              className="bg-gray-400 text-white px-6 py-3 font-nunito rounded-lg font-semibold cursor-not-allowed"
              disabled
            >
              Loading Data...
            </button>
          )}
        </div> */}

      

        <Resume4/>

       
  
      </div>
    </div>
  );
}

export default Pdf_download;