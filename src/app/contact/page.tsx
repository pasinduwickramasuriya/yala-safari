// "use client";

// import Footer from "@/components/Footer";
// import Header from "@/components/Header";
// import HeroAbout from "@/components/HeroAbout";
// import prisma from "@/lib/prisma";
// import { useState, useEffect } from "react";

// interface ContactData {
//   name: string;
//   email: string;
//   message: string;
// }

// type Notification = {
//   type: "success" | "error";
//   message: string;
// } | null;



// export default  function Contact() {
//   const [formData, setFormData] = useState<ContactData>({ name: "", email: "", message: "" });
//   const [notification, setNotification] = useState<Notification>(null);
 

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setNotification(null);

//     try {
//       const res = await fetch("/api/contact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (res.ok) {
//         setNotification({
//           type: "success",
//           message: "Thank you for your message! We’ll get back to you soon.",
//         });
//         setFormData({ name: "", email: "", message: "" });
//       } else {
//         const errorData = await res.json();
//         setNotification({
//           type: "error",
//           message: `Error sending message: ${errorData.error || "Unknown error"}`,
//         });
//       }
//     } catch (error) {
//       console.error("Contact error:", error);
//       setNotification({
//         type: "error",
//         message: "Error sending message. Please try again.",
//       });
//     }
//   };

//   // Auto-dismiss notification after 3 seconds
//   useEffect(() => {
//     if (notification) {
//       const timer = setTimeout(() => setNotification(null), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [notification]);

//   return (
//     <>
//       <Header />
      
//       <main className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen">
//         {/* Contact Hero */}
//         <section className="bg-black text-white py-16">
//           <div className="container mx-auto px-4 md:px-0 text-center">
//             <h1 className="text-4xl md:text-5xl font-extrabold mb-6 animate-fadeIn tracking-tight">
//               Contact Us
//             </h1>
//             <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
//               Reach out to us for inquiries, support, or to plan your next adventure!
//             </p>
//           </div>
//         </section>

//         {/* Contact Info and Form */}
//         <section className="py-16">
//           <div className="container mx-auto px-4 md:px-0">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//               {/* Contact Info */}
//               <div className="space-y-6">
//                 <h2 className="text-3xl font-bold text-green-700 dark:text-green-500 mb-4">
//                   Get in Touch
//                 </h2>
//                 <div className="flex items-center space-x-4">
//                   <svg
//                     className="w-6 h-6 text-green-600"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                     />
//                   </svg>
//                   <a
//                     href="mailto:info@yalasafari.com"
//                     className="text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500 transition-colors duration-300"
//                   >
//                     info@yalasafari.com
//                   </a>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   <svg
//                     className="w-6 h-6 text-green-600"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path d="M20.94 11A8.994 8.994 0 0013 3.06V1h-2v2.06A8.994 8.994 0 003.06 11H1v2h2.06A8.994 8.994 0 0011 20.94V23h2v-2.06A8.994 8.994 0 0020.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
//                   </svg>
//                   <a
//                     href="https://wa.me/94123456789"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500 transition-colors duration-300 flex items-center"
//                   >
//                     <span>+94 123 456 789</span>
//                     <img
//                       src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
//                       alt="WhatsApp"
//                       className="w-6 h-6 ml-2"
//                     />
//                   </a>
//                 </div>
//                 {/* Map with Location Icon */}
//                 <div className="mt-6">
//                   <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
//                     Our Location
//                   </h3>
//                   <div className="relative h-94 rounded-lg overflow-hidden shadow-md">
//                     <iframe
//                       src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3968.3666666666666!2d81.3013!3d6.2661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTUnNTcuOCJOIDgxwrAxOCcwNC41IkU!5e0!3m2!1sen!2slk!4v1698765432100!5m2!1sen!2slk"
//                       width="100%"
//                       height="100%"
//                       style={{ border: 0 }}
//                       allowFullScreen
//                       loading="lazy"
//                       referrerPolicy="no-referrer-when-downgrade"
//                     ></iframe>
//                   </div>
//                 </div>
//               </div>

//               {/* Contact Form */}
//               <div className={`relative ${notification ? "blur-sm" : ""}`}>
//                 <form
//                   onSubmit={handleSubmit}
//                   className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg"
//                 >
//                   <h2 className="text-2xl font-bold text-green-700 dark:text-green-500 mb-6">
//                     Send Us a Message
//                   </h2>
//                   <div className="mb-5">
//                     <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
//                       Name
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Your Name"
//                       value={formData.name}
//                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                       className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//                       required
//                     />
//                   </div>
//                   <div className="mb-5">
//                     <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       placeholder="Your Email"
//                       value={formData.email}
//                       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                       className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//                       required
//                     />
//                   </div>
//                   <div className="mb-5">
//                     <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
//                       Message
//                     </label>
//                     <textarea
//                       placeholder="Your Message"
//                       value={formData.message}
//                       onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//                       className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-y min-h-[120px]"
//                       required
//                     />
//                   </div>
//                   <button
//                     type="submit"
//                     className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-lg font-semibold shadow-md hover:from-green-700 hover:to-teal-700 transition-all duration-300"
//                   >
//                     Send Message
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />

//       {/* Notification Modal */}
//       {notification && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
//           <div
//             className={`p-6 rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all duration-500 animate-fadeIn ${
//               notification.type === "success" ? "bg-black text-white" : "bg-red-600 text-white"
//             }`}
//           >
//             <p className="text-lg font-semibold text-center">{notification.message}</p>
//             <div className="mt-4 flex justify-center">
//               <button
//                 onClick={() => setNotification(null)}
//                 className="bg-black text-green-700 dark:text-green-500 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
//               >
//                 OK
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



import prisma from "@/lib/prisma";
import ContactClient from "@/components/ContactClient"; // Import the Client Component

// Fetch data server-side
async function fetchData() {
  const heroSections = await prisma.heroSection.findMany();
  return { heroSections };
}

export default async function Contact() {
  const { heroSections } = await fetchData();

  return <ContactClient heroSections={heroSections} />;
}