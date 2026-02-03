// import React, { useRef, useState, useEffect, useContext, use } from "react";

// import { useLocation, useNavigate } from "react-router-dom";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   PaymentElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import html2pdf from "html2pdf.js";

// import Header from "../Pages/Header";
// import Resume1 from "../Templates/Resume1";
// import Resume2 from "../Templates/Resume2";
// import Resume3 from "../Templates/Resume3";
// import Resume4 from "../Templates/Resume4";
// import Resume5 from "../Templates/Resume5";
// import Resume6 from "../Templates/Resume6";
// import Resume7 from "../Templates/Resume7";
// import Resume8 from "../Templates/Resume8";
// import Swal from "sweetalert2";
// import axios from "axios";
// import { API_URL } from "../Config";
// import { CreateContext } from "../App";


// // ------------------ MAIN PAGE ------------------
// function Pdf_download() {
//   const UseContext = useContext(CreateContext);
//   const Allplans = UseContext?.allplandetails;

//   const [userLoggedIn, setUserLoggedIn] = useState("");
//   const [userId, setUserId] = useState("");

//   useEffect(() => {
//     const userdata = JSON.parse(localStorage.getItem("Resumnit_user"));
//     setUserId(userdata?.id || userdata?._id || "");
//     setUserLoggedIn(userdata);
//   }, []);

//   const location = useLocation();
//   // const contactId = location.state?.contactid;
//   const contactId =
//     location.state?.contactId || location.state?.contactid || null;

//   // console.log("contactId", contactId)

//   const pdfRef = useRef();
//   const [showPayment, setShowPayment] = useState(false);

//   // console.log("showPayment", showPayment)

//   const [templateId, setTemplateId] = useState([]);

//   const [alldetails, setAlldetails] = useState({});

//   const fetchContact = async () => {
//     try {
//       const response = await axios.get(
//         `${API_URL}/api/experience/get-all-contacts/${contactId}`,
//       );

//       if (response.data?.data?.length > 0) {
//         const data = response.data.data[0];

//         // Extract all the pieces from the API structure
//         const formattedData = {
//           contact: data.contact || {},
//           educations: data.educations || [],
//           experiences: data.experiences || [],
//           skills: data.skills || [],
//           finalize: data.finalize?.[0] || {},
//           planSubscription: data.planSubscriptions?.[0] || {},
//           summary: data.summary || [],
//           resume: data.hasResume || [],
//         };

//         // Set everything into one state
//         setAlldetails(formattedData);

//         // Optionally set specific things separately if needed
//         setTemplateId(data.contact?.templateId || "");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchContact();
//   }, [contactId]);

//   const resumeComponents = [
//     { id: "1", component: Resume1 },
//     { id: "2", component: Resume2 },
//     { id: "3", component: Resume3 },
//     { id: "4", component: Resume4 },
//     { id: "5", component: Resume5 },
//     { id: "6", component: Resume6 },
//     { id: "7", component: Resume7 },
//     { id: "8", component: Resume8 },
//   ];

//   const matchedResume = resumeComponents.find((item) => item.id === templateId);

//   const handleDownloadPDF = async () => {
//     const element = pdfRef.current;
//     if (!element) return;

//     //  1. Hide Edit Buttons Before PDF Snapshot
//     const editButtons = document.querySelectorAll(".edit-btn");
//     editButtons.forEach((btn) => (btn.style.display = "none"));

//     const opt = {
//       margin: [5, 5],
//       filename: `${userLoggedIn.firstName || "preview"}.pdf`,
//       image: { type: "jpeg", quality: 1 },
//       html2canvas: { scale: 2, useCORS: true },
//       jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
//     };

//     try {
//       const worker = html2pdf().set(opt).from(element).toPdf();

//       const pdf = await worker.get("pdf");
//       pdf.save(`${userLoggedIn.firstName || "preview"}.pdf`);

//       // Convert to blob
//       const pdfBlob = pdf.output("blob");

//       // Upload blob to backend
//       const formData = new FormData();
//       formData.append(
//         "resume",
//         pdfBlob,
//         `${userLoggedIn.firstName || "preview"}.pdf`,
//       );
//       formData.append("userId", userId);
//       formData.append("contactId", alldetails.contact._id);
//       formData.append("message", "success");

//       await axios.post(`${API_URL}/api/users/download-resume`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       Swal.fire({
//         icon: "success",
//         title: "PDF Downloaded",
//         text: "Resume downloaded successfully!",
//         timer: 2000,
//         confirmButtonText: "OK",
//       }).then(() => window.location.reload());
//     } catch (err) {
//       console.error("PDF Error:", err);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: err.message,
//       }).then(() => navigate("/choose-template"));
//     } finally {
//       //  2. Show Edit Buttons Back After PDF Download
//       editButtons.forEach((btn) => (btn.style.display = "flex"));
//     }
//   };

//   const navigate = useNavigate();

//   const handleEdit = (templateId, editid) => {
//     // console.log("templateIddd",templateId)
//     navigate("/resume-details", {
//       state: { templateId: { id: templateId }, editid: editid },
//     });
//   };

//   const [hasPlan, setHasPlan] = useState(false);
//   console.log("has plan", hasPlan);

//   useEffect(() => {
//     if (
//       !Allplans ||
//       Allplans === "FREE" ||
//       (Array.isArray(Allplans) && Allplans.length === 0)
//     ) {
//       setHasPlan(false);
//     } else {
//       setHasPlan(true);
//     }
//   }, [Allplans]);

//   return (
//     <div>
//       <Header />
//       <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
//         <h2 className="text-xl font-semibold font-nunito mb-4 text-gray-700">
//           Download Your Resume
//         </h2>

//         <button
//           onClick={handleDownloadPDF}
//           className="mt-2 mb-6 bg-red-600 text-white px-6 py-2 font-nunito rounded-lg font-semibold hover:bg-red-700 transition"
//         >
//           Download PDF
//         </button>

//         <div
//           ref={pdfRef}
//           style={{
//             width: "210mm",
//             background: "#fff",
//             boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//             overflow: "visible",
//           }}
//         >
//           {matchedResume ? (
//             <div>
//               {/* Render resume */}
//               {React.createElement(matchedResume.component, {
//                 alldata: alldetails,
//               })}

//               {/* Edit button inside resume container */}
//               {hasPlan && (
//                 <button
//                   onClick={() => handleEdit(alldetails?.contact?.templateId)}
//                   style={{
//                     position: "absolute",
//                     top: "24%",
//                     right: "18%",
//                     zIndex: 10,
//                   }}
//                   disabled={alldetails?.hasResume === "true"}
//                   className="edit-btn px-3 py-1 bg-blue-500 hover:bg-blue-600 font-nunito text-white rounded flex items-center gap-1"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-4 w-4"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M15.232 5.232l3.536 3.536M9 11l6 6m-6 0h6m0 0V11"
//                     />
//                   </svg>
//                   Edit
//                 </button>
//               )}
//             </div>
//           ) : (
//             <p className="text-center text-gray-500 mt-10">
//               {templateId
//                 ? "No matching resume template found."
//                 : "Loading resume..."}
//             </p>
//           )}
//         </div>

//         {/* Second Edit button (outside pdfRef) */}
//         {hasPlan && alldetails?.contact?.templateId && (
//           <button
//             onClick={() =>
//               handleEdit(
//                 alldetails?.contact?.templateId,
//                 alldetails?.contact?._id,
//               )
//             }
//             style={{
//               position: "absolute",
//               top: "24%",
//               right: "18%",
//               zIndex: 10,
//             }}
//             className="edit-btn px-3 py-1 font-nunito bg-blue-500 hover:bg-blue-600 text-white rounded flex items-center gap-1"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-4 w-4"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M15.232 5.232l3.536 3.536M9 11l6 6m-6 0h6m0 0V11"
//               />
//             </svg>
//             Edit
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Pdf_download;




  // ///////////////////////////////////////////////////////////





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

        const formattedData = {
          contact: data.contact || {},
          educations: data.educations || [],
          experiences: data.experiences || [],
          skills: data.skills || [],
          finalize: data.finalize?.[0] || {},
          planSubscription: data.planSubscriptions?.[0] || {},
          summary: data.summary?.[0]?.text || "", // Extract text from summary array
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

  return (
    <div className="relative">
      <Header />
      <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
        <h2 className="text-xl font-semibold font-nunito mb-4 text-gray-700">
          Download Your Resume
        </h2>

        {/* Download Button using react-pdf */}
        <div className="mt-2 mb-6">
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
        </div>

        {/* Optional: PDF Preview (for debugging) */}
        <div className="w-[70vw]">
          <PDFViewer width="100%" height="500">
            <Resume4PDF data={alldetails} />
          </PDFViewer>
        </div>

        {/* HTML Preview (for editing) */}
        {/* <div className="mb-6" style={{
          width: "210mm",
          background: "#fff",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          padding: "20px",
          margin: "20px auto"
        }}>
          {pdfData ? (
            <Resume4 alldata={{ alldata: alldetails }} />
          ) : (
            <div className="flex items-center justify-center h-96">
              <p className="text-gray-500">Loading resume preview...</p>
            </div>
          )}
        </div> */}

        {/* Edit Button */}
        {hasPlan && alldetails?.contact?.templateId && (
          <button
            onClick={() =>
              handleEdit(
                alldetails?.contact?.templateId,
                alldetails?.contact?._id,
              )
            }
            className="edit-btn px-6 py-3 font-nunito bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center gap-2 shadow-md transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit Resume Details
          </button>
        )}
      </div>
    </div>
  );
}

export default Pdf_download;





// import React, { useRef, useState, useEffect, useContext } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import Header from "../Pages/Header";
// import Resume1 from "../Templates/Resume1";
// import Resume2 from "../Templates/Resume2";
// import Resume3 from "../Templates/Resume3";
// import Resume4 from "../Templates/Resume4";
// import Resume5 from "../Templates/Resume5";
// import Resume6 from "../Templates/Resume6";
// import Resume7 from "../Templates/Resume7";
// import Resume8 from "../Templates/Resume8";
// import Swal from "sweetalert2";
// import axios from "axios";
// import { API_URL } from "../Config";
// import { CreateContext } from "../App";

// function Pdf_download() {
//   const UseContext = useContext(CreateContext);
//   const Allplans = UseContext?.allplandetails;

//   const [userLoggedIn, setUserLoggedIn] = useState("");
//   const [userId, setUserId] = useState("");

//   useEffect(() => {
//     const userdata = JSON.parse(localStorage.getItem("Resumnit_user"));
//     setUserId(userdata?.id || userdata?._id || "");
//     setUserLoggedIn(userdata);
//   }, []);

//   const location = useLocation();
//   const contactId =
//     location.state?.contactId || location.state?.contactid || null;

//   const pdfRef = useRef();
//   const [templateId, setTemplateId] = useState("");
//   const [alldetails, setAlldetails] = useState({});
//   const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

//   const fetchContact = async () => {
//     try {
//       const response = await axios.get(
//         `${API_URL}/api/experience/get-all-contacts/${contactId}`,
//       );

//       if (response.data?.data?.length > 0) {
//         const data = response.data.data[0];

//         const formattedData = {
//           contact: data.contact || {},
//           educations: data.educations || [],
//           experiences: data.experiences || [],
//           skills: data.skills || [],
//           finalize: data.finalize?.[0] || {},
//           planSubscription: data.planSubscriptions?.[0] || {},
//           summary: data.summary || [],
//           resume: data.hasResume || [],
//         };

//         setAlldetails(formattedData);
//         setTemplateId(data.contact?.templateId || "");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchContact();
//   }, [contactId]);

//   const resumeComponents = [
//     { id: "1", component: Resume1 },
//     { id: "2", component: Resume2 },
//     { id: "3", component: Resume3 },
//     { id: "4", component: Resume4 },
//     { id: "5", component: Resume5 },
//     { id: "6", component: Resume6 },
//     { id: "7", component: Resume7 },
//     { id: "8", component: Resume8 },
//   ];

//   const matchedResume = resumeComponents.find((item) => item.id === templateId);

//   const handleDownloadPDF = async () => {
//     if (!pdfRef.current) return;
    
//     setIsGeneratingPDF(true);
    
//     // Hide edit buttons
//     const editButtons = document.querySelectorAll(".edit-btn");
//     editButtons.forEach((btn) => (btn.style.display = "none"));
    
//     try {
//       Swal.fire({
//         title: 'Generating PDF...',
//         allowOutsideClick: false,
//         didOpen: () => {
//           Swal.showLoading();
//         }
//       });

//       // Get the resume element
//       const element = pdfRef.current;
      
//       // Store original styles
//       const originalWidth = element.style.width;
//       const originalHeight = element.style.height;
//       const originalOverflow = element.style.overflow;
//       const originalBoxShadow = element.style.boxShadow;
//       const originalPosition = element.style.position;
//       const originalLeft = element.style.left;
//       const originalTop = element.style.top;
//       const originalZIndex = element.style.zIndex;
      
//       // Apply PDF generation styles temporarily
//       element.style.width = "794px"; // A4 width in pixels (210mm * 3.78)
//       element.style.height = "auto"; // Let content determine height
//       element.style.overflow = "visible";
//       element.style.boxShadow = "none";
//       element.style.position = "relative"; // Change from absolute
//       element.style.left = "0";
//       element.style.top = "0";
//       element.style.zIndex = "9999";
      
//       // Capture the entire resume with html2canvas
//       const canvas = await html2canvas(element, {
//         scale: 2, // Higher resolution
//         useCORS: true,
//         backgroundColor: '#ffffff',
//         logging: false,
//         windowWidth: 794,
//         windowHeight: element.scrollHeight,
//         onclone: function(clonedDoc) {
//           // Ensure cloned element has the same styles
//           const clonedElement = clonedDoc.querySelector('[data-resume-container]');
//           if (clonedElement) {
//             clonedElement.style.width = "794px";
//             clonedElement.style.height = "auto";
//             clonedElement.style.overflow = "visible";
//             clonedElement.style.boxShadow = "none";
            
//             // Hide edit buttons in cloned version
//             const cloneEditButtons = clonedElement.querySelectorAll('.edit-btn');
//             cloneEditButtons.forEach(btn => btn.style.display = 'none');
//           }
//         }
//       });

//       // Restore original styles
//       element.style.width = originalWidth;
//       element.style.height = originalHeight;
//       element.style.overflow = originalOverflow;
//       element.style.boxShadow = originalBoxShadow;
//       element.style.position = originalPosition;
//       element.style.left = originalLeft;
//       element.style.top = originalTop;
//       element.style.zIndex = originalZIndex;
      
//       // Create PDF with multi-page support
//       const pdf = new jsPDF({
//         orientation: 'portrait',
//         unit: 'mm',
//         format: 'a4',
//         compress: true,
//       });

//       const imgData = canvas.toDataURL('image/jpeg', 1.0);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();
      
//       // Calculate image dimensions to fit page width
//       const margin = 0; // No margins for full-page resume
//       const imgWidth = pdfWidth - (margin * 2);
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
//       let heightLeft = imgHeight;
//       let position = 0;
//       let pageCount = 1;
      
//       // Add first page
//       pdf.addImage(imgData, 'JPEG', margin, margin, imgWidth, imgHeight, '', 'FAST');
//       heightLeft -= pdfHeight;
      
//       // Add additional pages if content is taller than one page
//       while (heightLeft > 0) {
//         position = heightLeft - imgHeight;
//         pdf.addPage();
//         pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight, '', 'FAST');
//         heightLeft -= pdfHeight;
//         pageCount++;
//       }

//       const fileName = `${userLoggedIn.firstName || "resume"}.pdf`;
//       pdf.save(fileName);

//       // Upload to backend
//       const pdfBlob = pdf.output('blob');
//       const formData = new FormData();
//       formData.append("resume", pdfBlob, fileName);
//       formData.append("userId", userId);
//       formData.append("contactId", alldetails.contact._id);
//       formData.append("message", "success");

//       await axios.post(`${API_URL}/api/users/download-resume`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       Swal.fire({
//         icon: "success",
//         title: "PDF Downloaded",
//         text: `Resume downloaded successfully! ${pageCount > 1 ? `(${pageCount} pages)` : ''}`,
//         timer: 2000,
//         confirmButtonText: "OK",
//       });

//     } catch (err) {
//       console.error("PDF Generation Error:", err);
//       Swal.fire({
//         icon: "error",
//         title: "PDF Generation Failed",
//         text: "There was an error generating the PDF. Please try again.",
//         confirmButtonText: "OK",
//       });
//     } finally {
//       // Show edit buttons again
//       editButtons.forEach((btn) => (btn.style.display = "flex"));
//       setIsGeneratingPDF(false);
//     }
//   };

//   const navigate = useNavigate();

//   const handleEdit = (templateId, editid) => {
//     navigate("/resume-details", {
//       state: { templateId: { id: templateId }, editid: editid },
//     });
//   };

//   const [hasPlan, setHasPlan] = useState(false);

//   useEffect(() => {
//     if (
//       !Allplans ||
//       Allplans === "FREE" ||
//       (Array.isArray(Allplans) && Allplans.length === 0)
//     ) {
//       setHasPlan(false);
//     } else {
//       setHasPlan(true);
//     }
//   }, [Allplans]);

//   return (
//     <div>
//       <Header />
//       <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
//         <h2 className="text-xl font-semibold font-nunito mb-4 text-gray-700">
//           Download Your Resume
//         </h2>

//         <button
//           onClick={handleDownloadPDF}
//           disabled={isGeneratingPDF}
//           className="mt-2 mb-6 bg-red-600 text-white px-6 py-3 font-nunito rounded-lg font-semibold hover:bg-red-700 transition disabled:bg-red-400 disabled:cursor-not-allowed"
//         >
//           {isGeneratingPDF ? "Generating PDF..." : "Download PDF"}
//         </button>

//         <div
//           ref={pdfRef}
//           data-resume-container="true"
//           style={{
//             width: "210mm",
//             minHeight: "auto", // Changed from fixed height
//             height: "auto", // Let content determine height
//             background: "#fff",
//             boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//             overflow: "visible", // Changed to visible
//             position: "relative",
//             margin: "20px auto",
//             padding: "20px",
//             boxSizing: "border-box",
//             WebkitPrintColorAdjust: "exact",
//             printColorAdjust: "exact"
//           }}
//         >
//           {matchedResume ? (
//             <div className="relative">
//               {/* Render resume */}
//               {React.createElement(matchedResume.component, {
//                 alldata: alldetails,
//               })}

//               {/* Edit button inside resume container */}
//               {hasPlan && (
//                 <button
//                   onClick={() => handleEdit(alldetails?.contact?.templateId)}
//                   style={{
//                     position: "absolute",
//                     top: "20px",
//                     right: "20px",
//                     zIndex: 10,
//                   }}
//                   disabled={alldetails?.hasResume === "true"}
//                   className="edit-btn px-4 py-2 bg-blue-600 hover:bg-blue-700 font-nunito text-white rounded-md flex items-center gap-2 shadow-md"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
//                     />
//                   </svg>
//                   Edit
//                 </button>
//               )}
//             </div>
//           ) : (
//             <div className="flex items-center justify-center h-full">
//               <p className="text-center text-gray-500 text-lg">
//                 {templateId
//                   ? "No matching resume template found."
//                   : "Loading resume..."}
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Bottom Edit button */}
//         {hasPlan && alldetails?.contact?.templateId && (
//           <button
//             onClick={() =>
//               handleEdit(
//                 alldetails?.contact?.templateId,
//                 alldetails?.contact?._id,
//               )
//             }
//             className="mt-6 edit-btn px-6 py-3 font-nunito bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center gap-2 shadow-md transition"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
//               />
//             </svg>
//             Edit Resume Details
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Pdf_download;