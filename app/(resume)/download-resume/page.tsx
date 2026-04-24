// // "use client";
// // import React from "react";
// // import Header from "../../components/layouts/Header";
// // import Footer from "../../components/layouts/Footer";
// // import { templateData } from "@/app/data";
// // import { getLocalStorage } from "@/app/utils";
// // import { Template } from "@/app/types";
// // import ProtectedRoute from "@/app/utils/ProtectedRoute";

// // const page = () => {
// //   const chosenTemplate = getLocalStorage<Template>("chosenTemplate");

// //   const selectedResume = templateData.find(
// //     (resume) => resume.id == chosenTemplate?.id || chosenTemplate?.templateId,
// //   );

// //   const SelectedComponent = selectedResume?.component;

// //   return (
// //     <ProtectedRoute>
// //       <Header />

// //       {SelectedComponent && <SelectedComponent />}

// //       <Footer />
// //     </ProtectedRoute>
// //   );
// // };

// // export default page;

// // app/download-resume/page.tsx

// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import Header from "../../components/layouts/Header";
// import Footer from "../../components/layouts/Footer";
// import { templateData } from "@/app/data";
// import { getLocalStorage } from "@/app/utils";
// import { Template } from "@/app/types";
// import ProtectedRoute from "@/app/utils/ProtectedRoute";

// const Page = () => {
//   const [scale, setScale] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [selectedComponent, setSelectedComponent] = useState<any>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const resumeRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     // Load template on mount
//     const loadTemplate = () => {
//       const chosenTemplate = getLocalStorage<Template>("chosenTemplate");
//       const selectedResume = templateData.find(
//         (resume) => resume.id == chosenTemplate?.id || chosenTemplate?.templateId,
//       );
//       setSelectedComponent(() => selectedResume?.component);
//       setLoading(false);
//     };

//     loadTemplate();
//   }, []);

//   useEffect(() => {
//     const calculateScale = () => {
//       if (containerRef.current && resumeRef.current) {
//         const containerWidth = containerRef.current.clientWidth;
//         // Calculate scale to fit (adjust 800 based on your actual resume width)
//         const newScale = Math.min(1, containerWidth / 800);
//         setScale(newScale);
//       }
//     };

//     // Small delay to ensure DOM is ready
//     setTimeout(calculateScale, 100);

//     window.addEventListener('resize', calculateScale);
//     return () => window.removeEventListener('resize', calculateScale);
//   }, [selectedComponent]); // Re-run when component loads

//   const handlePrint = () => {
//     window.print();
//   };

//   if (loading) {
//     return (
//       <ProtectedRoute>
//         <Header />
//         <div className="min-h-screen bg-gray-100 flex justify-center items-center">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
//             <p className="mt-4 text-gray-600">Loading resume...</p>
//           </div>
//         </div>
//         <Footer />
//       </ProtectedRoute>
//     );
//   }

//   if (!selectedComponent) {
//     return (
//       <ProtectedRoute>
//         <Header />
//         <div className="min-h-screen bg-gray-100 flex justify-center items-center">
//           <div className="text-center">
//             <p className="text-gray-600">No resume template found.</p>
//             <a href="/dashboard" className="text-emerald-500 underline mt-2 inline-block">
//               Go to Dashboard
//             </a>
//           </div>
//         </div>
//         <Footer />
//       </ProtectedRoute>
//     );
//   }

//   return (
//     <ProtectedRoute>
//       <Header />

//       <div className=" bg-gray-100 py-8">
//         <div className="container mx-auto px-4">
//           {/* Simple Controls */}
//           <div className="text-center mb-4 no-print">
//             <button
//               onClick={handlePrint}
//               className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg shadow-md transition-colors"
//             >
//               Download PDF / Print
//             </button>
//             <p className="text-xs text-gray-500 mt-2">
//               Click print, then choose "Save as PDF" to download
//             </p>
//           </div>

//           {/* Auto-scaled Resume */}
//           <div ref={containerRef} className="flex justify-center overflow-hidden h-fit">
//             <div
//               ref={resumeRef}
//               className="transition-all duration-300"
//               style={{
//                 transform: `scale(${scale})`,
//                 transformOrigin: 'top center',
//               }}
//             >
//               {React.createElement(selectedComponent)}
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         @media print {
//           .no-print {
//             display: none !important;
//           }
//           body {
//             margin: 0;
//             padding: 0;
//           }
//           .t1-resume, [class*="resume"] {
//             transform: scale(1) !important;
//             margin: 0 auto !important;
//           }
//         }
//       `}</style>

//       <Footer />
//     </ProtectedRoute>
//   );
// };

// export default Page;















"use client";
import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import { templateData } from "@/app/data";
import { getLocalStorage } from "@/app/utils";
import { Template } from "@/app/types";
import ProtectedRoute from "@/app/utils/ProtectedRoute";
import Link from "next/link";

const Page = () => {
  const [scale, setScale] = useState(1);
  const [selectedComponent, setSelectedComponent] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadTemplate = () => {
      const chosenTemplate = getLocalStorage<Template>("chosenTemplate");
      const selectedResume = templateData.find(
        (resume) =>
          resume.id == chosenTemplate?.id || chosenTemplate?.templateId,
      );
      setSelectedComponent(() => selectedResume?.component);
    };

    loadTemplate();
  }, []);

  useEffect(() => {
    const calculateScale = () => {
      if (containerRef.current && resumeRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const newScale = Math.min(1, containerWidth / 800);
        setScale(newScale);
      }
    };

    setTimeout(calculateScale, 100);
    window.addEventListener("resize", calculateScale);
    return () => window.removeEventListener("resize", calculateScale);
  }, [selectedComponent]);

  
  if (!selectedComponent) {
    return (
      <ProtectedRoute>
        <Header />
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
          <div className="text-center">
            <p className="text-gray-600">No resume template found.</p>
            <Link
              href="/dashboard"
              className="text-emerald-500 underline mt-2 inline-block"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
        <Footer />
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Header />

      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          {/* Auto-scaled Resume with Hidden Overflow */}
          <div
            ref={containerRef}
            className="flex justify-center overflow-hidden"
            style={{
              height: `${297 * scale}mm`, // Set exact height to match scaled content
            }}
          >
            <div
              ref={resumeRef}
              className="transition-all duration-300"
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "top center",
                height: `${297 / scale}mm`, // Compensate for scale
                width: `${210 / scale}mm`,
              }}
            >
              {React.createElement(selectedComponent)}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </ProtectedRoute>
  );
};

export default Page;
