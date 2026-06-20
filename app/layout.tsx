// // @ts-ignore
// import "./globals.css";
// import type { Metadata } from "next";
// import { Poppins } from "next/font/google";
// import Script from "next/script";
// import { CreateProvider } from "./context/CreateContext";
// import { removeSessionStorage } from "./utils";
// import FacebookPixel from "./components/FacebookPixels";

// const poppins = Poppins({
//   variable: "--font-poppins",
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700", "800"],
// });

// export const metadata: Metadata = {
//   metadataBase: new URL("https://passats.aryuacademy.com"),

//   title:
//     "PassATS - AI-Powered Resume Builder That Beats Applicant Tracking Systems",
//   description:
//     "Create ATS-optimized resumes that get past automated screening systems. Professional templates, AI suggestions, and keyword optimization to land your dream job.",
//   keywords:
//     "resume builder, ATS resume, applicant tracking system, resume optimizer, job application, CV builder, professional resume, AI resume, resume templates, job search, career tools",
//   authors: [{ name: "PassATS" }],
//   creator: "PassATS",
//   publisher: "PassATS",
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-video-preview": -1,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//     },
//   },

//   openGraph: {
//     type: "website",
//     locale: "en_US",
//     url: "https://passats.aryuacademy.com",
//     siteName: "PassATS",
//     title:
//       "PassATS - AI-Powered Resume Builder That Beats Applicant Tracking Systems",
//     description:
//       "Create ATS-optimized resumes that get past automated screening systems.",
//     images: [
//       {
//         url: "https://passats.aryuacademy.com/og-image.jpg",
//         width: 1200,
//         height: 630,
//         alt: "PassATS Resume Builder - Create ATS-Friendly Resumes",
//         type: "image/jpeg", // Add this
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "PassATS - AI Resume Builder",
//     description:
//       "Create ATS-optimized resumes that beat automated screening systems",
//     images: ["https://passats.aryuacademy.com/og-image.jpg"],
//     creator: "@passats",
//     site: "@passats",
//   },
//   viewport: {
//     width: "device-width",
//     initialScale: 1,
//     maximumScale: 5,
//   },
//   category: "technology",

//   alternates: {
//     canonical: "https://passats.aryuacademy.com/",
//   },
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <head>
//         <Script
//           src="https://checkout.razorpay.com/v1/checkout.js"
//           strategy="lazyOnload"
//         />
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link
//           rel="preconnect"
//           href="https://fonts.gstatic.com"
//           crossOrigin="anonymous"
//         />
//         <meta name="theme-color" content="#ffffff" />
//         <meta name="application-name" content="PassATS" />
//         <meta name="apple-mobile-web-app-capable" content="yes" />
//         <meta name="apple-mobile-web-app-status-bar-style" content="default" />
//         <meta name="apple-mobile-web-app-title" content="PassATS" />
//         <meta name="format-detection" content="telephone=no" />
//         <meta name="mobile-web-app-capable" content="yes" />
//         <meta name="msapplication-TileColor" content="#ffffff" />
//         <meta name="msapplication-tap-highlight" content="no" />

//         {/* Google Analytics Script */}
//         <Script
//           src="https://www.googletagmanager.com/gtag/js?id=G-PDQMQYS7BM"
//           strategy="afterInteractive"
//         />
//         <Script id="google-analytics" strategy="afterInteractive">
//           {`
//             window.dataLayer = window.dataLayer || [];
//             function gtag(){dataLayer.push(arguments);}
//             gtag('js', new Date());

//             gtag('config', 'G-PDQMQYS7BM');
//           `}
//         </Script>
//       </head>
//       <body
//         className={` ${poppins.variable} antialiased font-poppins overflow-x-hidden`}
//       >
//         <FacebookPixel />
//         <CreateProvider>{children}</CreateProvider>
//       </body>
//     </html>
//   );
// }





// @ts-ignore
// import "./globals.css";
// import type { Metadata } from "next";
// import { Poppins } from "next/font/google";
// import Script from "next/script";
// import { CreateProvider } from "./context/CreateContext";
// import { removeSessionStorage } from "./utils";
// import FacebookPixel from "./components/FacebookPixels";

// const poppins = Poppins({
//   variable: "--font-poppins",
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700", "800"],
// });

// export const metadata: Metadata = {
//   metadataBase: new URL("https://passats.aryuacademy.com"),

//   title:
//     "PassATS - AI-Powered Resume Builder That Beats Applicant Tracking Systems",
//   description:
//     "Create ATS-optimized resumes that get past automated screening systems. Professional templates, AI suggestions, and keyword optimization to land your dream job.",
//   keywords:
//     "resume builder, ATS resume, applicant tracking system, resume optimizer, job application, CV builder, professional resume, AI resume, resume templates, job search, career tools",
//   authors: [{ name: "PassATS" }],
//   creator: "PassATS",
//   publisher: "PassATS",
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-video-preview": -1,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//     },
//   },

//   openGraph: {
//     type: "website",
//     locale: "en_US",
//     url: "https://passats.aryuacademy.com",
//     siteName: "PassATS",
//     title:
//       "PassATS - AI-Powered Resume Builder That Beats Applicant Tracking Systems",
//     description:
//       "Create ATS-optimized resumes that get past automated screening systems.",
//     images: [
//       {
//         url: "https://passats.aryuacademy.com/og-image.jpg",
//         width: 1200,
//         height: 630,
//         alt: "PassATS Resume Builder - Create ATS-Friendly Resumes",
//         type: "image/jpeg",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "PassATS - AI Resume Builder",
//     description:
//       "Create ATS-optimized resumes that beat automated screening systems",
//     images: ["https://passats.aryuacademy.com/og-image.jpg"],
//     creator: "@passats",
//     site: "@passats",
//   },
//   viewport: {
//     width: "device-width",
//     initialScale: 1,
//     maximumScale: 5,
//   },
//   category: "technology",

//   alternates: {
//     canonical: "https://passats.aryuacademy.com/",
//   },
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <head>
//         {/* Google Tag Manager */}
//         <Script id="google-tag-manager" strategy="afterInteractive">
//           {`
//             (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
//             new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
//             j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
//             'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
//             })(window,document,'script','dataLayer','GTM-52W3KQQ4');
//           `}
//         </Script>
//         {/* End Google Tag Manager */}
        
//         <Script
//           src="https://checkout.razorpay.com/v1/checkout.js"
//           strategy="lazyOnload"
//         />
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link
//           rel="preconnect"
//           href="https://fonts.gstatic.com"
//           crossOrigin="anonymous"
//         />
//         <meta name="theme-color" content="#ffffff" />
//         <meta name="application-name" content="PassATS" />
//         <meta name="apple-mobile-web-app-capable" content="yes" />
//         <meta name="apple-mobile-web-app-status-bar-style" content="default" />
//         <meta name="apple-mobile-web-app-title" content="PassATS" />
//         <meta name="format-detection" content="telephone=no" />
//         <meta name="mobile-web-app-capable" content="yes" />
//         <meta name="msapplication-TileColor" content="#ffffff" />
//         <meta name="msapplication-tap-highlight" content="no" />

//         {/* Google Analytics Script */}
//         <Script
//           src="https://www.googletagmanager.com/gtag/js?id=G-PDQMQYS7BM"
//           strategy="afterInteractive"
//         />
//         <Script id="google-analytics" strategy="afterInteractive">
//           {`
//             window.dataLayer = window.dataLayer || [];
//             function gtag(){dataLayer.push(arguments);}
//             gtag('js', new Date());

//             gtag('config', 'G-PDQMQYS7BM');
//           `}
//         </Script>
//       </head>
//       <body
//         className={` ${poppins.variable} antialiased font-poppins overflow-x-hidden`}
//       >
//         {/* Google Tag Manager (noscript) */}
//         <noscript>
//           <iframe 
//             src="https://www.googletagmanager.com/ns.html?id=GTM-52W3KQQ4"
//             height="0" 
//             width="0" 
//             style={{ display: "none", visibility: "hidden" }}
//           />
//         </noscript>
//         {/* End Google Tag Manager (noscript) */}
        
//         <FacebookPixel />
//         <CreateProvider>{children}</CreateProvider>
//       </body>
//     </html>
//   );
// }
































// @ts-ignore
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import { CreateProvider } from "./context/CreateContext";
import FacebookPixel from "./components/FacebookPixels";
import SessionInitializer from "./components/SessionInitializer"; // 👈 Import it here

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://passats.aryuacademy.com"),

  title:
    "PassATS - AI-Powered Resume Builder That Beats Applicant Tracking Systems",
  description:
    "Create ATS-optimized resumes that get past automated screening systems. Professional templates, AI suggestions, and keyword optimization to land your dream job.",
  keywords:
    "resume builder, ATS resume, applicant tracking system, resume optimizer, job application, CV builder, professional resume, AI resume, resume templates, job search, career tools",
  authors: [{ name: "PassATS" }],
  creator: "PassATS",
  publisher: "PassATS",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://passats.aryuacademy.com",
    siteName: "PassATS",
    title:
      "PassATS - AI-Powered Resume Builder That Beats Applicant Tracking Systems",
    description:
      "Create ATS-optimized resumes that get past automated screening systems.",
    images: [
      {
        url: "https://passats.aryuacademy.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PassATS Resume Builder - Create ATS-Friendly Resumes",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PassATS - AI Resume Builder",
    description:
      "Create ATS-optimized resumes that beat automated screening systems",
    images: ["https://passats.aryuacademy.com/og-image.jpg"],
    creator: "@passats",
    site: "@passats",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  category: "technology",

  alternates: {
    canonical: "https://passats.aryuacademy.com/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Scripts stay exactly the same */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-52W3KQQ4');`}
        </Script>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#ffffff" />
        {/* Analytics stays exactly the same */}
      </head>
      <body className={`${poppins.variable} antialiased font-poppins overflow-x-hidden`}>
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-52W3KQQ4" height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
        </noscript>
        
        <FacebookPixel />
        
        {/* 🛡️ Now it wraps clean because it's a dedicated client boundary file */}
        <SessionInitializer>
          <CreateProvider>{children}</CreateProvider>
        </SessionInitializer>
      </body>
    </html>
  );
}
