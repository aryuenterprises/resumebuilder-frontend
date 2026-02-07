// // import React from 'react';
// // import { Page, Text, View, Document, StyleSheet, Link } from '@react-pdf/renderer';

// // // Create styles with proper A4 dimensions
// // const styles = StyleSheet.create({
// //   page: {
// //     padding: 30, // 30mm total padding (15mm each side)
// //     paddingTop: 25,
// //     paddingBottom: 25,
// //     fontSize: 10,
// //     fontFamily: 'Helvetica',
// //     lineHeight: 1.3,
// //     color: '#000000',
// //   },
// //   container: {
// //     flex: 1,
// //     flexDirection: 'column',
// //     minHeight: '100%',
// //   },
  
// //   // Header styles - Larger and more prominent
// //   header: {
// //     marginBottom: 20,
// //     textAlign: 'center',
// //     paddingBottom: 15,
// //     borderBottom: '1 solid #e0e0e0',
// //   },
// //   name: {
// //     fontSize: 22, // Increased
// //     fontWeight: 'bold',
// //     textTransform: 'uppercase',
// //     marginBottom: 5,
// //     letterSpacing: 1,
// //   },
// //   jobTitle: {
// //     fontSize: 14, // Increased
// //     fontWeight: 'bold',
// //     color: '#333333',
// //     marginBottom: 8,
// //   },
// //   address: {
// //     fontSize: 10,
// //     color: '#555555',
// //     marginBottom: 5,
// //   },
// //   contactDetails: {
// //     flexDirection: 'row',
// //     justifyContent: 'center',
// //     gap: 20,
// //     marginTop: 8,
// //     marginBottom: 8,
// //     fontSize: 10,
// //     fontWeight: 'bold',
// //     color: '#333333',
// //   },
// //   contactItem: {
// //     fontSize: 10,
// //     fontWeight: 'bold',
// //     color: '#333333',
// //   },
// //   links: {
// //     flexDirection: 'row',
// //     justifyContent: 'center',
// //     gap: 15,
// //     marginBottom: 10,
// //   },
// //   link: {
// //     fontSize: 10,
// //     fontWeight: 600,
// //     color: '#333333',
// //     textDecoration: 'none',
// //   },
  
// //   // Section styles
// //   section: {
// //     marginBottom: 15,
// //     pageBreakInside: 'avoid',
// //   },
// //   sectionTitle: {
// //     backgroundColor: '#f0f0f0',
// //     paddingTop: 5,
// //     paddingBottom: 5,
// //     marginTop: 12,
// //     marginBottom: 8,
// //     textAlign: 'center',
// //     fontWeight: 'bold',
// //     fontSize: 12,
// //     textTransform: 'uppercase',
// //     letterSpacing: 0.5,
// //   },
// //   sectionContent: {
// //     fontSize: 10,
// //     color: '#333333',
// //     lineHeight: 1.4,
// //   },
  
// //   // Experience & Education item styles
// //   experienceItem: {
// //     marginBottom: 12,
// //     pageBreakInside: 'avoid',
// //   },
// //   educationItem: {
// //     marginBottom: 12,
// //     pageBreakInside: 'avoid',
// //   },
// //   itemHeader: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'flex-start',
// //     marginBottom: 3,
// //     pageBreakInside: 'avoid',
// //   },
// //   itemTitleContainer: {
// //     flex: 1,
// //   },
// //   itemTitle: {
// //     fontSize: 11,
// //     fontWeight: 'bold',
// //     color: '#222222',
// //     marginBottom: 2,
// //   },
// //   itemSubtitle: {
// //     fontSize: 10,
// //     color: '#555555',
// //     fontWeight: 'normal',
// //     fontStyle: 'italic',
// //   },
// //   itemDate: {
// //     fontSize: 9,
// //     color: '#666666',
// //     fontWeight: 'normal',
// //     whiteSpace: 'nowrap',
// //     minWidth: 90,
// //     textAlign: 'right',
// //     marginLeft: 10,
// //   },
// //   itemContent: {
// //     fontSize: 10,
// //     color: '#444444',
// //     lineHeight: 1.4,
// //     marginTop: 4,
// //     pageBreakInside: 'avoid',
// //   },
  
// //   // Skills & Languages styles
// //   skillsGrid: {
// //     flexDirection: 'row',
// //     flexWrap: 'wrap',
// //     justifyContent: 'space-between',
// //     marginTop: 8,
// //   },
// //   skillItem: {
// //     width: '48%',
// //     marginBottom: 8,
// //     pageBreakInside: 'avoid',
// //   },
// //   skillName: {
// //     fontSize: 10,
// //     color: '#333333',
// //     marginBottom: 2,
// //   },
// //   skillBar: {
// //     height: 4,
// //     backgroundColor: '#e0e0e0',
// //     borderRadius: 2,
// //     overflow: 'hidden',
// //   },
// //   skillLevel: {
// //     height: '100%',
// //     backgroundColor: '#222222',
// //   },
  
// //   // Lists for certifications, hobbies, etc.
// //   listContainer: {
// //     marginTop: 4,
// //     pageBreakInside: 'avoid',
// //   },
// //   listItem: {
// //     flexDirection: 'row',
// //     marginBottom: 3,
// //     alignItems: 'flex-start',
// //   },
// //   bullet: {
// //     fontSize: 10,
// //     marginRight: 6,
// //     marginTop: 1,
// //   },
// //   listContent: {
// //     fontSize: 10,
// //     color: '#444444',
// //     lineHeight: 1.4,
// //     flex: 1,
// //   },
  
// //   // Divider
// //   divider: {
// //     borderBottom: '1 solid #e0e0e0',
// //     marginVertical: 10,
// //   },
// // });

// // // Helper component for bullet lists
// // const BulletList = ({ items, style = {} }) => (
// //   <View style={[styles.listContainer, style]}>
// //     {items.map((item, index) => (
// //       <View key={index} style={styles.listItem}>
// //         <Text style={styles.bullet}>•</Text>
// //         <Text style={styles.listContent}>{item}</Text>
// //       </View>
// //     ))}
// //   </View>
// // );

// // // Helper to clean HTML content
// // const cleanHtml = (html) => {
// //   if (!html) return '';
// //   return html.replace(/<[^>]*>/g, '').trim();
// // };

// // // Helper to parse HTML into bullet points
// // const parseHtmlToBullets = (html) => {
// //   if (!html) return [];
// //   const text = cleanHtml(html);
// //   return text.split(/[\n•·\-]/)
// //     .map(item => item.trim())
// //     .filter(item => item.length > 0);
// // };

// // // MonthYearDisplay for PDF
// // const MonthYearDisplayPDF = ({ value, shortYear = true }) => {
// //   if (!value) return null;
  
// //   try {
// //     const date = new Date(value);
// //     const month = date.toLocaleDateString('en-US', { month: 'short' });
// //     const year = shortYear 
// //       ? date.getFullYear().toString().slice(-2)
// //       : date.getFullYear();
    
// //     return <Text>{month} {year}</Text>;
// //   } catch (error) {
// //     return <Text>{value}</Text>;
// //   }
// // };

// // // Main PDF Component
// // const Resume4PDF = ({ data }) => {
// //   const contact = data?.contact || {};
// //   const educations = data?.educations || [];
// //   const experiences = data?.experiences || [];
// //   const skills = data?.skills || [];
// //   const finalize = data?.finalize || {};
// //   const summary = data?.summary || "";
  
// //   const linkedinUrl = contact?.linkedin || contact?.linkedIn;
// //   const addressParts = [
// //     contact?.address,
// //     contact?.city,
// //     contact?.country,
// //     contact?.postcode
// //   ].filter(Boolean);

// //   return (
// //     <Document>
// //       <Page size="A4" style={styles.page}>
// //         <View style={styles.container}>
// //           {/* Header Section */}
// //           <View style={styles.header}>
// //             <Text style={styles.name}>
// //               {contact?.firstName || ''} {contact?.lastName || ''}
// //             </Text>
// //             <Text style={styles.jobTitle}>
// //               {contact?.jobTitle?.name || ''}
// //             </Text>
// //             {addressParts.length > 0 && (
// //               <Text style={styles.address}>
// //                 {addressParts.join(', ')}
// //               </Text>
// //             )}
// //             <View style={styles.contactDetails}>
// //               {contact?.email && (
// //                 <Text style={styles.contactItem}>{contact.email}</Text>
// //               )}
// //               {contact?.phone && (
// //                 <Text style={styles.contactItem}>{contact.phone}</Text>
// //               )}
// //             </View>
// //             {(linkedinUrl || contact?.portfolio) && (
// //               <View style={styles.links}>
// //                 {linkedinUrl && (
// //                   <Link 
// //                     src={linkedinUrl.startsWith('http') ? linkedinUrl : `https://${linkedinUrl}`} 
// //                     style={styles.link}
// //                   >
// //                     LinkedIn
// //                   </Link>
// //                 )}
// //                 {contact?.portfolio && (
// //                   <Link 
// //                     src={contact.portfolio.startsWith('http') ? contact.portfolio : `https://${contact.portfolio}`} 
// //                     style={styles.link}
// //                   >
// //                     Portfolio
// //                   </Link>
// //                 )}
// //               </View>
// //             )}
// //           </View>

// //           {/* Summary Section */}
// //           {summary && (
// //             <View style={styles.section}>
// //               <Text style={styles.sectionTitle}>Summary</Text>
// //               <Text style={styles.sectionContent}>
// //                 {cleanHtml(summary)}
// //               </Text>
// //             </View>
// //           )}

// //           {/* Divider */}
// //           {summary && (experiences.length > 0 || educations.length > 0 || skills.length > 0) && (
// //             <View style={styles.divider} />
// //           )}

// //           {/* Experience Section */}
// //           {experiences.length > 0 && (
// //             <View style={styles.section}>
// //               <Text style={styles.sectionTitle}>Experience</Text>
// //               {experiences.map((exp, index) => (
// //                 <View key={index} style={styles.experienceItem}>
// //                   <View style={styles.itemHeader}>
// //                     <View style={styles.itemTitleContainer}>
// //                       <Text style={styles.itemTitle}>{exp.jobTitle || ''}</Text>
// //                       {(exp.employer || exp.location) && (
// //                         <Text style={styles.itemSubtitle}>
// //                           {exp.employer || ''}
// //                           {exp.employer && exp.location && ' — '}
// //                           {exp.location || ''}
// //                         </Text>
// //                       )}
// //                     </View>
// //                     {(exp.startDate || exp.endDate) && (
// //                       <View style={styles.itemDate}>
// //                         <Text>
// //                           {exp.startDate && (
// //                             <MonthYearDisplayPDF value={exp.startDate} shortYear={true} />
// //                           )}
// //                           {exp.startDate && exp.endDate && ' - '}
// //                           {exp.endDate ? (
// //                             <MonthYearDisplayPDF value={exp.endDate} shortYear={true} />
// //                           ) : (
// //                             exp.startDate && 'Present'
// //                           )}
// //                         </Text>
// //                       </View>
// //                     )}
// //                   </View>
// //                   {exp.text && (
// //                     <BulletList 
// //                       items={parseHtmlToBullets(exp.text)} 
// //                     />
// //                   )}
// //                 </View>
// //               ))}
// //             </View>
// //           )}

// //           {/* Education Section */}
// //           {educations.length > 0 && (
// //             <View style={styles.section}>
// //               <Text style={styles.sectionTitle}>Education</Text>
// //               {educations.map((edu, index) => (
// //                 <View key={index} style={styles.educationItem}>
// //                   <View style={styles.itemHeader}>
// //                     <View style={styles.itemTitleContainer}>
// //                       <Text style={styles.itemTitle}>{edu.schoolname || ''}</Text>
// //                       {(edu.degree || edu.location) && (
// //                         <Text style={styles.itemSubtitle}>
// //                           {edu.degree || ''}
// //                           {edu.degree && edu.location && ' — '}
// //                           {edu.location || ''}
// //                         </Text>
// //                       )}
// //                     </View>
// //                     {(edu.startDate || edu.endDate) && (
// //                       <View style={styles.itemDate}>
// //                         <Text>
// //                           {edu.startDate || ''}
// //                           {edu.startDate && edu.endDate && ' - '}
// //                           {edu.endDate || ''}
// //                         </Text>
// //                       </View>
// //                     )}
// //                   </View>
// //                   {edu.text && (
// //                     <BulletList 
// //                       items={parseHtmlToBullets(edu.text)}
// //                     />
// //                   )}
// //                 </View>
// //               ))}
// //             </View>
// //           )}

// //           {/* Skills Section */}
// //           {skills.length > 0 && (
// //             <View style={styles.section}>
// //               <Text style={styles.sectionTitle}>Skills</Text>
// //               <View style={styles.skillsGrid}>
// //                 {skills.map((skill, index) => (
// //                   <View key={index} style={styles.skillItem}>
// //                     <Text style={styles.skillName}>{skill.skill || ''}</Text>
// //                     {skill.level && (
// //                       <View style={styles.skillBar}>
// //                         <View 
// //                           style={[
// //                             styles.skillLevel, 
// //                             { width: `${(Number(skill.level) / 4) * 100}%` }
// //                           ]} 
// //                         />
// //                       </View>
// //                     )}
// //                   </View>
// //                 ))}
// //               </View>
// //             </View>
// //           )}

// //           {/* Additional Sections */}
// //           {Array.isArray(finalize?.languages) && 
// //            finalize.languages.some(lang => lang?.name?.trim()) && (
// //             <View style={styles.section}>
// //               <Text style={styles.sectionTitle}>Languages</Text>
// //               <View style={styles.skillsGrid}>
// //                 {finalize.languages.map((lang, index) => (
// //                   lang?.name?.trim() && (
// //                     <View key={index} style={styles.skillItem}>
// //                       <Text style={styles.skillName}>{lang.name}</Text>
// //                       {lang.level && (
// //                         <View style={styles.skillBar}>
// //                           <View 
// //                             style={[
// //                               styles.skillLevel, 
// //                               { width: `${(Number(lang.level) / 4) * 100}%` }
// //                             ]} 
// //                           />
// //                         </View>
// //                       )}
// //                     </View>
// //                   )
// //                 ))}
// //               </View>
// //             </View>
// //           )}

// //           {Array.isArray(finalize?.certificationsAndLicenses) && 
// //            finalize.certificationsAndLicenses.some(item => cleanHtml(item?.name)?.trim()) && (
// //             <View style={styles.section}>
// //               <Text style={styles.sectionTitle}>Certifications and Licenses</Text>
// //               <BulletList 
// //                 items={finalize.certificationsAndLicenses
// //                   .filter(item => cleanHtml(item?.name)?.trim())
// //                   .map(item => cleanHtml(item.name))
// //                 } 
// //               />
// //             </View>
// //           )}

// //           {Array.isArray(finalize?.hobbiesAndInterests) && 
// //            finalize.hobbiesAndInterests.some(item => cleanHtml(item?.name)?.trim()) && (
// //             <View style={styles.section}>
// //               <Text style={styles.sectionTitle}>Hobbies and Interests</Text>
// //               <BulletList 
// //                 items={finalize.hobbiesAndInterests
// //                   .filter(item => cleanHtml(item?.name)?.trim())
// //                   .map(item => cleanHtml(item.name))
// //                 } 
// //               />
// //             </View>
// //           )}

// //           {Array.isArray(finalize?.awardsAndHonors) && 
// //            finalize.awardsAndHonors.some(item => cleanHtml(item?.name)?.trim()) && (
// //             <View style={styles.section}>
// //               <Text style={styles.sectionTitle}>Awards and Honors</Text>
// //               <BulletList 
// //                 items={finalize.awardsAndHonors
// //                   .filter(item => cleanHtml(item?.name)?.trim())
// //                   .map(item => cleanHtml(item.name))
// //                 } 
// //               />
// //             </View>
// //           )}
// //         </View>
// //       </Page>
// //     </Document>
// //   );
// // };

// // export default Resume4PDF;








// import React from 'react';
// import { Page, Text, View, Document, StyleSheet, Link } from '@react-pdf/renderer';

// // Create styles with proper A4 dimensions
// const styles = StyleSheet.create({
//   page: {
//     padding: 30, // 30mm total padding (15mm each side)
//     paddingTop: 25,
//     paddingBottom: 25,
//     fontSize: 10,
//     fontFamily: 'Helvetica',
//     lineHeight: 1.3,
//     color: '#000000',
//   },
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     minHeight: '100%',
//   },
  
//   // Header styles - Larger and more prominent
//   header: {
//     marginBottom: 20,
//     textAlign: 'center',
//     paddingBottom: 15,
//     borderBottom: '1 solid #e0e0e0',
//   },
//   name: {
//     fontSize: 22, // Increased
//     fontWeight: 'bold',
//     textTransform: 'uppercase',
//     marginBottom: 5,
//     letterSpacing: 1,
//   },
//   jobTitle: {
//     fontSize: 14, // Increased
//     fontWeight: 'bold',
//     color: '#333333',
//     marginBottom: 8,
//   },
//   address: {
//     fontSize: 10,
//     color: '#555555',
//     marginBottom: 5,
//     marginTop:5
//   },
//   contactDetails: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 20,
//     marginTop: 8,
//     marginBottom: 8,
//     fontSize: 10,
//     fontWeight: 'bold',
//     color: '#333333',
//   },
//   contactItem: {
//     fontSize: 10,
//     fontWeight: 'bold',
//     color: '#333333',
//   },
//   links: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 15,
//     marginBottom: 10,
//   },
//   link: {
//     fontSize: 10,
//     fontWeight: 600,
//     color: '#333333',
//     textDecoration: 'none',
//   },
  
//   // Section styles
//   section: {
//     marginBottom: 15,
//     pageBreakInside: 'avoid',
//   },
//   sectionTitle: {
//     backgroundColor: '#f0f0f0',
//     paddingTop: 5,
//     paddingBottom: 5,
//     marginTop: 12,
//     marginBottom: 8,
//     textAlign: 'center',
//     fontWeight: 'bold',
//     fontSize: 12,
//     textTransform: 'uppercase',
//     letterSpacing: 0.5,
//   },
//   sectionContent: {
//     fontSize: 10,
//     color: '#333333',
//     lineHeight: 1.4,
//   },
  
//   // Experience & Education item styles
//   experienceItem: {
//     marginBottom: 12,
//     pageBreakInside: 'avoid',
//   },
//   educationItem: {
//     marginBottom: 12,
//     pageBreakInside: 'avoid',
//   },
//   itemHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: 3,
//     pageBreakInside: 'avoid',
//   },
//   itemTitleContainer: {
//     flex: 1,
//   },
//   itemTitle: {
//     fontSize: 11,
//     fontWeight: 'bold',
//     color: '#222222',
//     marginBottom: 2,
//   },
//   itemSubtitle: {
//     fontSize: 10,
//     color: '#555555',
//     fontWeight: 'normal',
//     fontStyle: 'italic',
//   },
//   itemDate: {
//     fontSize: 9,
//     color: '#666666',
//     fontWeight: 'normal',
//     whiteSpace: 'nowrap',
//     minWidth: 90,
//     textAlign: 'right',
//     marginLeft: 10,
//   },
//   itemContent: {
//     fontSize: 10,
//     color: '#444444',
//     lineHeight: 1.4,
//     marginTop: 4,
//     pageBreakInside: 'avoid',
//   },
  
//   // Skills & Languages styles
//   skillsGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     marginTop: 8,
//   },
//   skillItem: {
//     width: '48%',
//     marginBottom: 8,
//     pageBreakInside: 'avoid',
//   },
//   skillName: {
//     fontSize: 10,
//     color: '#333333',
//     marginBottom: 2,
//   },
//   skillBar: {
//     height: 4,
//     backgroundColor: '#e0e0e0',
//     borderRadius: 2,
//     overflow: 'hidden',
//   },
//   skillLevel: {
//     height: '100%',
//     backgroundColor: '#222222',
//   },
  
//   // Lists for certifications, hobbies, etc.
//   listContainer: {
//     marginTop: 4,
//     pageBreakInside: 'avoid',
//   },
//   listItem: {
//     flexDirection: 'row',
//     marginBottom: 3,
//     alignItems: 'flex-start',
//   },
//   bullet: {
//     fontSize: 10,
//     marginRight: 6,
//     marginTop: 1,
//   },
//   listContent: {
//     fontSize: 10,
//     color: '#444444',
//     lineHeight: 1.4,
//     flex: 1,
//   },
  
//   // Divider
//   divider: {
//     borderBottom: '1 solid #e0e0e0',
//     marginVertical: 10,
//   },
// });

// // Helper component for bullet lists
// const BulletList = ({ items, style = {} }) => (
//   <View style={[styles.listContainer, style]}>
//     {items.map((item, index) => (
//       <View key={index} style={styles.listItem}>
//         <Text style={styles.bullet}>•</Text>
//         <Text style={styles.listContent}>{item}</Text>
//       </View>
//     ))}
//   </View>
// );

// // Helper to clean HTML content
// const cleanHtml = (html) => {
//   if (!html) return '';
//   return html.replace(/<[^>]*>/g, '').trim();
// };

// // Helper to parse HTML into bullet points
// const parseHtmlToBullets = (html) => {
//   if (!html) return [];
//   const text = cleanHtml(html);
//   return text.split(/[\n•·\-]/)
//     .map(item => item.trim())
//     .filter(item => item.length > 0);
// };

// // MonthYearDisplay for PDF
// const MonthYearDisplayPDF = ({ value, shortYear = true }) => {
//   if (!value) return null;
  
//   try {
//     const date = new Date(value);
//     const month = date.toLocaleDateString('en-US', { month: 'short' });
//     const year = shortYear 
//       ? date.getFullYear().toString().slice(-2)
//       : date.getFullYear();
    
//     return <Text>{month} {year}</Text>;
//   } catch (error) {
//     return <Text>{value}</Text>;
//   }
// };

// // Main PDF Component
// const Resume4PDF = ({ data }) => {
//   const contact = data?.contact || {};
//   const educations = data?.educations || [];
//   const experiences = data?.experiences || [];
//   const skills = data?.skills || [];
//   const finalize = data?.finalize || {};
//   const summary = data?.summary || "";
  
//   const linkedinUrl = contact?.linkedin || contact?.linkedIn;
//   const addressParts = [
//     contact?.address,
//     contact?.city,
//     contact?.country,
//     contact?.postcode
//   ].filter(Boolean);

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.container}>
//           {/* Header Section */}
//           <View style={styles.header}>
//             <Text style={styles.name}>
//               {contact?.firstName || ''} {contact?.lastName || ''}
//             </Text>
//             {/* <Text style={styles.jobTitle}>
//               {contact?.jobTitle?.name || ''}
//             </Text> */}
//             {addressParts.length > 0 && (
//               <Text style={styles.address}>
//                 {addressParts.join(', ')}
//               </Text>
//             )}
//             <View style={styles.contactDetails}>
//               {contact?.email && (
//                 <Text style={styles.contactItem}>{contact.email}</Text>
//               )}
//               {contact?.phone && (
//                 <Text style={styles.contactItem}>{contact.phone}</Text>
//               )}
//             </View>
//             {(linkedinUrl || contact?.portfolio) && (
//               <View style={styles.links}>
//                 {linkedinUrl && (
//                   <Link 
//                     src={linkedinUrl.startsWith('http') ? linkedinUrl : `https://${linkedinUrl}`} 
//                     style={styles.link}
//                   >
//                     LinkedIn
//                   </Link>
//                 )}
//                 {contact?.portfolio && (
//                   <Link 
//                     src={contact.portfolio.startsWith('http') ? contact.portfolio : `https://${contact.portfolio}`} 
//                     style={styles.link}
//                   >
//                     Portfolio
//                   </Link>
//                 )}
//               </View>
//             )}
//           </View>

//           {/* Summary Section */}
//           {summary && (
//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>Summary</Text>
//               <Text style={styles.sectionContent}>
//                 {cleanHtml(summary)}
//               </Text>
//             </View>
//           )}

//           {/* Divider */}
//           {summary && (experiences.length > 0 || educations.length > 0 || skills.length > 0) && (
//             <View style={styles.divider} />
//           )}

//           {/* Experience Section */}
//           {experiences.length > 0 && (
//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>Experience</Text>
//               {experiences.map((exp, index) => (
//                 <View key={index} style={styles.experienceItem}>
//                   <View style={styles.itemHeader}>
//                     <View style={styles.itemTitleContainer}>
//                       <Text style={styles.itemTitle}>{exp.jobTitle || ''}</Text>
//                       {(exp.employer || exp.location) && (
//                         <Text style={styles.itemSubtitle}>
//                           {exp.employer || ''}
//                           {exp.employer && exp.location && ' — '}
//                           {exp.location || ''}
//                         </Text>
//                       )}
//                     </View>
//                     {(exp.startDate || exp.endDate) && (
//                       <View style={styles.itemDate}>
//                         <Text>
//                           {exp.startDate && (
//                             <MonthYearDisplayPDF value={exp.startDate} shortYear={true} />
//                           )}
//                           {exp.startDate && exp.endDate && ' - '}
//                           {exp.endDate ? (
//                             <MonthYearDisplayPDF value={exp.endDate} shortYear={true} />
//                           ) : (
//                             exp.startDate && 'Present'
//                           )}
//                         </Text>
//                       </View>
//                     )}
//                   </View>
//                   {exp.text && (
//                     <BulletList 
//                       items={parseHtmlToBullets(exp.text)} 
//                     />
//                   )}
//                 </View>
//               ))}
//             </View>
//           )}

//           {/* Education Section */}
//           {educations.length > 0 && (
//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>Education</Text>
//               {educations.map((edu, index) => (
//                 <View key={index} style={styles.educationItem}>
//                   <View style={styles.itemHeader}>
//                     <View style={styles.itemTitleContainer}>
//                       <Text style={styles.itemTitle}>{edu.schoolname || ''}</Text>
//                       {(edu.degree || edu.location) && (
//                         <Text style={styles.itemSubtitle}>
//                           {edu.degree || ''}
//                           {edu.degree && edu.location && ' — '}
//                           {edu.location || ''}
//                         </Text>
//                       )}
//                     </View>
//                     {(edu.startDate || edu.endDate) && (
//                       <View style={styles.itemDate}>
//                         <Text>
//                           {edu.startDate || ''}
//                           {edu.startDate && edu.endDate && ' - '}
//                           {edu.endDate || ''}
//                         </Text>
//                       </View>
//                     )}
//                   </View>
//                   {edu.text && (
//                     <BulletList 
//                       items={parseHtmlToBullets(edu.text)}
//                     />
//                   )}
//                 </View>
//               ))}
//             </View>
//           )}

//           {/* Skills Section */}
//           {skills.length > 0 && (
//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>Skills</Text>
//               <View style={styles.skillsGrid}>
//                 {skills.map((skill, index) => (
//                   <View key={index} style={styles.skillItem}>
//                     <Text style={styles.skillName}>{skill.skill || ''}</Text>
//                     {skill.level && (
//                       <View style={styles.skillBar}>
//                         <View 
//                           style={[
//                             styles.skillLevel, 
//                             { width: `${(Number(skill.level) / 4) * 100}%` }
//                           ]} 
//                         />
//                       </View>
//                     )}
//                   </View>
//                 ))}
//               </View>
//             </View>
//           )}

//           {/* Additional Sections */}
//           {Array.isArray(finalize?.languages) && 
//            finalize.languages.some(lang => lang?.name?.trim()) && (
//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>Languages</Text>
//               <View style={styles.skillsGrid}>
//                 {finalize.languages.map((lang, index) => (
//                   lang?.name?.trim() && (
//                     <View key={index} style={styles.skillItem}>
//                       <Text style={styles.skillName}>{lang.name}</Text>
//                       {lang.level && (
//                         <View style={styles.skillBar}>
//                           <View 
//                             style={[
//                               styles.skillLevel, 
//                               { width: `${(Number(lang.level) / 4) * 100}%` }
//                             ]} 
//                           />
//                         </View>
//                       )}
//                     </View>
//                   )
//                 ))}
//               </View>
//             </View>
//           )}

//           {Array.isArray(finalize?.certificationsAndLicenses) && 
//            finalize.certificationsAndLicenses.some(item => cleanHtml(item?.name)?.trim()) && (
//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>Certifications and Licenses</Text>
//               <BulletList 
//                 items={finalize.certificationsAndLicenses
//                   .filter(item => cleanHtml(item?.name)?.trim())
//                   .map(item => cleanHtml(item.name))
//                 } 
//               />
//             </View>
//           )}

//           {Array.isArray(finalize?.hobbiesAndInterests) && 
//            finalize.hobbiesAndInterests.some(item => cleanHtml(item?.name)?.trim()) && (
//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>Hobbies and Interests</Text>
//               <BulletList 
//                 items={finalize.hobbiesAndInterests
//                   .filter(item => cleanHtml(item?.name)?.trim())
//                   .map(item => cleanHtml(item.name))
//                 } 
//               />
//             </View>
//           )}

//           {Array.isArray(finalize?.awardsAndHonors) && 
//            finalize.awardsAndHonors.some(item => cleanHtml(item?.name)?.trim()) && (
//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>Awards and Honors</Text>
//               <BulletList 
//                 items={finalize.awardsAndHonors
//                   .filter(item => cleanHtml(item?.name)?.trim())
//                   .map(item => cleanHtml(item.name))
//                 } 
//               />
//             </View>
//           )}
//         </View>
//       </Page>
//     </Document>
//   );
// };

// export default Resume4PDF;









import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link } from '@react-pdf/renderer';

// Create styles to match Resume4 design
const styles = StyleSheet.create({
  page: {
    padding: 20,
    paddingTop: 25,
    paddingBottom: 25,
    fontSize: 11,
    fontFamily: 'Helvetica',
    lineHeight: 1.3,
    color: '#000000',
    width: '210mm',
    height: '297mm',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  
  // Header styles - Matching Resume4
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  address: {
    fontSize: 11,
    color: '#555555',
    marginBottom: 4,
  },
  contactDetails: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 6,
    marginBottom: 6,
    fontSize: 11,
    fontWeight: 600,
    color: '#333333',
  },
  contactItem: {
    fontSize: 11,
    fontWeight: 600,
    color: '#333333',
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 10,
  },
  link: {
    fontSize: 11,
    fontWeight: 600,
    color: '#333333',
    textDecoration: 'none',
  },
  
  // Section styles - Matching Resume4
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    backgroundColor: '#f0f0f0',
    padding: 4,
    paddingTop: 4,
    paddingBottom: 4,
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionContent: {
    fontSize: 11,
    color: '#444444',
    lineHeight: 1.5,
    marginBottom: 12,
  },
  
  // Experience & Education item styles
  experienceItem: {
    marginBottom: 10,
  },
  educationItem: {
    marginBottom: 10,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 3,
  },
  itemTitleContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#222222',
  },
  itemSubtitle: {
    fontSize: 12,
    color: '#555555',
    fontWeight: 500,
  },
  itemDate: {
    fontSize: 11,
    color: '#666666',
    fontWeight: 500,
    whiteSpace: 'nowrap',
    minWidth: 90,
    textAlign: 'right',
    marginLeft: 10,
  },
  itemContent: {
    fontSize: 11,
    color: '#444444',
    lineHeight: 1.5,
    marginTop: 4,
  },
  
  // Skills & Languages styles
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 12,
  },
  skillItem: {
    width: '48%',
    marginBottom: 6,
  },
  skillName: {
    fontSize: 11,
    color: '#333333',
    marginBottom: 2,
  },
  skillBar: {
    height: 3,
    backgroundColor: '#e0e0e0',
    borderRadius: 1.5,
    overflow: 'hidden',
  },
  skillLevel: {
    height: '100%',
    backgroundColor: '#222222',
  },
  
  // Lists for certifications, hobbies, etc.
  listContainer: {
    marginTop: 4,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 2,
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: 11,
    marginRight: 6,
    marginTop: 1,
  },
  listContent: {
    fontSize: 11,
    color: '#444444',
    lineHeight: 1.5,
    flex: 1,
  },
  
  // Custom section for HTML content
  htmlContent: {
    fontSize: 11,
    color: '#444444',
    lineHeight: 1.5,
  },
  
  // Websites and Social Media styling
  websiteItem: {
    marginBottom: 4,
  },
  websiteLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: '#333333',
  },
  websiteValue: {
    fontSize: 11,
    color: '#444444',
  },
  
  // References styling
  referenceItem: {
    marginBottom: 4,
  },
});

// Helper component for bullet lists
const BulletList = ({ items, style = {} }) => (
  <View style={[styles.listContainer, style]}>
    {items.map((item, index) => (
      <View key={index} style={styles.listItem}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.listContent}>{item}</Text>
      </View>
    ))}
  </View>
);

// Helper to clean HTML content
const cleanHtml = (html) => {
  if (!html) return '';
  // Remove HTML tags but preserve line breaks
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim();
};

// Helper to parse HTML into text with line breaks preserved
const parseHtmlToText = (html) => {
  if (!html) return '';
  const text = cleanHtml(html);
  // Split by newlines and filter out empty lines
  return text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
};

// MonthYearDisplay for PDF - matching Resume4 format
const MonthYearDisplayPDF = ({ value, shortYear = true }) => {
  if (!value) return null;
  
  try {
    const date = new Date(value);
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const year = shortYear 
      ? date.getFullYear().toString().slice(-2)
      : date.getFullYear();
    
    return <Text>{month} {year}</Text>;
  } catch (error) {
    return <Text>{value}</Text>;
  }
};

// Helper to render HTML content with proper formatting
const HTMLContent = ({ html, style = {} }) => {
  if (!html) return null;
  
  const text = cleanHtml(html);
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  
  return (
    <View style={style}>
      {lines.map((line, index) => (
        <Text key={index} style={[styles.htmlContent, { marginBottom: 2 }]}>
          {line}
        </Text>
      ))}
    </View>
  );
};

// Main PDF Component - Updated to match Resume4
const Resume4PDF = ({ data }) => {
  const contact = data?.contact || {};
  const educations = data?.educations || [];
  const experiences = data?.experiences || [];
  const skills = data?.skills || [];
  const finalize = data?.finalize || {};
  const summary = data?.summary || "";

  console.log(data)
  
  const linkedinUrl = contact?.linkedin || contact?.linkedIn;
  const addressParts = [
    contact?.address,
    contact?.city,
    contact?.country,
    contact?.postcode
  ].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Header Section - Matching Resume4 */}
          <View style={styles.header}>
            <Text style={styles.name}>
              {contact?.firstName || ''} {contact?.lastName || ''}
            </Text>
            <Text style={styles.jobTitle}>
              {contact?.jobTitle?.name || ''}
            </Text>
            {addressParts.length > 0 && (
              <Text style={styles.address}>
                {addressParts.join(', ')}
              </Text>
            )}
            <View style={styles.contactDetails}>
              {contact?.email && (
                <Text style={styles.contactItem}>{contact.email}</Text>
              )}
              {contact?.phone && (
                <Text style={styles.contactItem}>{contact.phone}</Text>
              )}
            </View>
            {(linkedinUrl || contact?.portfolio) && (
              <View style={styles.links}>
                {linkedinUrl && (
                  <Link 
                    src={linkedinUrl.startsWith('http') ? linkedinUrl : `https://${linkedinUrl}`} 
                    style={styles.link}
                  >
                    LinkedIn
                  </Link>
                )}
                {contact?.portfolio && (
                  <Link 
                    src={contact.portfolio.startsWith('http') ? contact.portfolio : `https://${contact.portfolio}`} 
                    style={styles.link}
                  >
                    Portfolio
                  </Link>
                )}
              </View>
            )}
          </View>

          {/* Summary Section */}
          {summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Summary</Text>
              <HTMLContent 
                html={summary}
                style={styles.sectionContent}
              />
            </View>
          )}

          {/* Experience Section */}
          {experiences.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {experiences.map((exp, index) => (
                <View key={index} style={styles.experienceItem}>
                  <View style={styles.itemHeader}>
                    <View style={styles.itemTitleContainer}>
                      <Text style={styles.itemTitle}>{exp.jobTitle || ''}</Text>
                      {(exp.employer || exp.location) && (
                        <Text style={styles.itemSubtitle}>
                          {exp.employer || ''}
                          {exp.employer && exp.location && ' — '}
                          {exp.location || ''}
                        </Text>
                      )}
                    </View>
                    {(exp.startDate || exp.endDate) && (
                      <View style={styles.itemDate}>
                        <Text>
                          {exp.startDate && (
                            <MonthYearDisplayPDF value={exp.startDate} shortYear={true} />
                          )}
                          {exp.startDate && exp.endDate && ' - '}
                          {exp.endDate ? (
                            <MonthYearDisplayPDF value={exp.endDate} shortYear={true} />
                          ) : (
                            exp.startDate && 'Present'
                          )}
                        </Text>
                      </View>
                    )}
                  </View>
                  {exp.text && (
                    <HTMLContent 
                      html={exp.text}
                      style={styles.itemContent}
                    />
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Education Section */}
          {educations.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {educations.map((edu, index) => (
                <View key={index} style={styles.educationItem}>
                  <View style={styles.itemHeader}>
                    <View style={styles.itemTitleContainer}>
                      <Text style={styles.itemTitle}>{edu.schoolname || ''}</Text>
                      {(edu.degree || edu.location) && (
                        <Text style={styles.itemSubtitle}>
                          {edu.degree || ''}
                          {edu.degree && edu.location && ' — '}
                          {edu.location || ''}
                        </Text>
                      )}
                    </View>
                    {(edu.startDate || edu.endDate) && (
                      <View style={styles.itemDate}>
                        <Text>
                          {edu.startDate || ''}
                          {edu.startDate && edu.endDate && ' - '}
                          {edu.endDate || ''}
                        </Text>
                      </View>
                    )}
                  </View>
                  {edu.text && (
                    <HTMLContent 
                      html={edu.text}
                      style={styles.itemContent}
                    />
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Skills Section */}
          {skills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={styles.skillsGrid}>
                {skills.map((skill, index) => (
                  <View key={index} style={styles.skillItem}>
                    <Text style={styles.skillName}>{skill.skill || ''}</Text>
                    {skill.level && (
                      <View style={styles.skillBar}>
                        <View 
                          style={[
                            styles.skillLevel, 
                            { width: `${(Number(skill.level) / 4) * 100}%` }
                          ]} 
                        />
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Languages Section */}
          {Array.isArray(finalize?.languages) && 
           finalize.languages.some(lang => lang?.name?.trim()) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Languages</Text>
              <View style={styles.skillsGrid}>
                {finalize.languages.map((lang, index) => (
                  lang?.name?.trim() && (
                    <View key={index} style={styles.skillItem}>
                      <Text style={styles.skillName}>{lang.name}</Text>
                      {lang.level && (
                        <View style={styles.skillBar}>
                          <View 
                            style={[
                              styles.skillLevel, 
                              { width: `${(Number(lang.level) / 4) * 100}%` }
                            ]} 
                          />
                        </View>
                      )}
                    </View>
                  )
                ))}
              </View>
            </View>
          )}

          {/* Certifications and Licenses */}
          {Array.isArray(finalize?.certificationsAndLicenses) && 
           finalize.certificationsAndLicenses.some(item => cleanHtml(item?.name)?.trim()) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Certifications and Licenses</Text>
              <View style={styles.sectionContent}>
                {finalize.certificationsAndLicenses
                  .filter(item => cleanHtml(item?.name)?.trim())
                  .map((item, index) => (
                    <HTMLContent key={index} html={item.name} />
                  ))
                }
              </View>
            </View>
          )}

          {/* Hobbies and Interests */}
          {Array.isArray(finalize?.hobbiesAndInterests) && 
           finalize.hobbiesAndInterests.some(item => cleanHtml(item?.name)?.trim()) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Hobbies and Interests</Text>
              <View style={styles.sectionContent}>
                {finalize.hobbiesAndInterests
                  .filter(item => cleanHtml(item?.name)?.trim())
                  .map((item, index) => (
                    <HTMLContent key={index} html={item.name} />
                  ))
                }
              </View>
            </View>
          )}

          {/* Awards and Honors */}
          {Array.isArray(finalize?.awardsAndHonors) && 
           finalize.awardsAndHonors.some(item => cleanHtml(item?.name)?.trim()) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Awards and Honors</Text>
              <View style={styles.sectionContent}>
                {finalize.awardsAndHonors
                  .filter(item => cleanHtml(item?.name)?.trim())
                  .map((item, index) => (
                    <HTMLContent key={index} html={item.name} />
                  ))
                }
              </View>
            </View>
          )}

          {/* Websites and Social Media */}
          {Array.isArray(finalize?.websitesAndSocialMedia) &&
           finalize.websitesAndSocialMedia.some(item => 
             (item?.websiteUrl?.trim()) || (item?.socialMedia?.trim())
           ) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Websites and Social Media</Text>
              <View style={styles.sectionContent}>
                {finalize.websitesAndSocialMedia.map((item, index) => (
                  (item?.websiteUrl?.trim() || item?.socialMedia?.trim()) && (
                    <View key={index} style={styles.websiteItem}>
                      {item.websiteUrl?.trim() && (
                        <Text style={styles.htmlContent}>
                          Website: {item.websiteUrl}
                        </Text>
                      )}
                      {item.socialMedia?.trim() && (
                        <Text style={styles.htmlContent}>
                          Social Media: {item.socialMedia}
                        </Text>
                      )}
                    </View>
                  )
                ))}
              </View>
            </View>
          )}

          {/* References */}
          {Array.isArray(finalize?.references) && 
           finalize.references.some(item => cleanHtml(item?.name)?.trim()) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>References</Text>
              <View style={styles.sectionContent}>
                {finalize.references
                  .filter(item => cleanHtml(item?.name)?.trim())
                  .map((item, index) => (
                    <HTMLContent key={index} html={item.name} />
                  ))
                }
              </View>
            </View>
          )}

          {/* Custom Sections */}
          {Array.isArray(finalize?.customSection) &&
           finalize.customSection.some(section => 
             section?.name?.trim() || section?.description?.trim()
           ) && (
            <View style={styles.section}>
              {finalize.customSection
                .filter(section => 
                  section?.name?.trim() || section?.description?.trim()
                )
                .map((section, index) => (
                  <View key={index} style={styles.section}>
                    {section.name?.trim() && (
                      <Text style={styles.sectionTitle}>{section.name}</Text>
                    )}
                    {section.description?.trim() && (
                      <HTMLContent 
                        html={section.description}
                        style={styles.sectionContent}
                      />
                    )}
                  </View>
                ))
              }
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default Resume4PDF;







