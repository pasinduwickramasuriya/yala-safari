// "use client";

// import { useState, useEffect } from "react";
// import { countries } from "countries-list"; // Import country data

// interface BookingData {
//   name: string;
//   phoneCode: string;
//   phoneNumber: string;
//   email: string;
//   date: string;
//   country: string;
//   tourPackage: string;
//   message: string;
// }

// type Notification = {
//   type: "success" | "error";
//   message: string;
// } | null;

// export default function BookingForm({ tourPackage }: { tourPackage: string }) {
//   const [formData, setFormData] = useState<BookingData>({
//     name: "",
//     phoneCode: "+94", // Default to Sri Lanka
//     phoneNumber: "",
//     email: "",
//     date: "",
//     country: "",
//     tourPackage,
//     message: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [notification, setNotification] = useState<Notification>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setNotification(null); // Clear previous notification

//     const fullPhone = `${formData.phoneCode}${formData.phoneNumber}`;
//     const submissionData = { ...formData, phone: fullPhone };

//     try {
//       const res = await fetch("/api/book", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(submissionData),
//       });

//       if (res.ok) {
//         setNotification({
//           type: "success",
//           message: "Booking submitted successfully! Check your email for confirmation.",
//         });
//         setFormData({
//           name: "",
//           phoneCode: "+94",
//           phoneNumber: "",
//           email: "",
//           date: "",
//           country: "",
//           tourPackage,
//           message: "",
//         });
//       } else {
//         const errorData = await res.json();
//         setNotification({
//           type: "error",
//           message: `Error submitting booking: ${errorData.error || "Unknown error"}`,
//         });
//       }
//     } catch (error) {
//       console.error("Booking error:", error);
//       setNotification({
//         type: "error",
//         message: "Error submitting booking. Please try again.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Auto-dismiss notification after 3 seconds
//   useEffect(() => {
//     if (notification) {
//       const timer = setTimeout(() => setNotification(null), 3000);
//       return () => clearTimeout(timer); // Cleanup on unmount or notification change
//     }
//   }, [notification]);

//   // Convert countries object to array for dropdowns
//   const countryList = Object.entries(countries).map(([code, data]) => ({
//     code,
//     name: data.name,
//     phoneCode: `+${data.phone}`,
//   }));

//   return (
//     <div className="relative">
//       {/* Form */}
//       <form
//         onSubmit={handleSubmit}
//         className={`bg-white dark:bg-gray-900 p-6 md:p-8 rounded-xl shadow-lg max-w-lg mx-auto my-8 transform transition-all duration-300 hover:shadow-xl ${
//           notification ? "blur-sm" : ""
//         }`}
//       >
//         <h2 className="text-2xl md:text-3xl font-bold text-green-700 dark:text-green-500 mb-6 text-center">
//           Book Your Yala Safari Adventure
//         </h2>

//         {/* Name */}
//         <div className="mb-5">
//           <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
//             Full Name
//           </label>
//           <input
//             type="text"
//             placeholder="Your Name"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//             required
//           />
//         </div>

//         {/* Phone Number with Country Code */}
//         <div className="mb-5 flex gap-3">
//           <div className="w-1/3">
//             <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
//               Code
//             </label>
//             <select
//               value={formData.phoneCode}
//               onChange={(e) => setFormData({ ...formData, phoneCode: e.target.value })}
//               className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               required
//             >
//               {countryList.map((country) => (
//                 <option key={country.code} value={country.phoneCode}>
//                   {country.phoneCode} ({country.name})
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="w-2/3">
//             <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               placeholder="Your Phone"
//               value={formData.phoneNumber}
//               onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
//               className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//               required
//             />
//           </div>
//         </div>

//         {/* Email */}
//         <div className="mb-5">
//           <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
//             Email Address
//           </label>
//           <input
//             type="email"
//             placeholder="Your Email"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//             required
//           />
//         </div>

//         {/* Date */}
//         <div className="mb-5">
//           <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
//             Preferred Date
//           </label>
//           <input
//             type="date"
//             value={formData.date}
//             onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//             className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//             required
//           />
//         </div>

//         {/* Country */}
//         <div className="mb-5">
//           <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
//             Country
//           </label>
//           <select
//             value={formData.country}
//             onChange={(e) => setFormData({ ...formData, country: e.target.value })}
//             className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent"
//             required
//           >
//             <option value="" disabled>
//               Select your country
//             </option>
//             {countryList.map((country) => (
//               <option key={country.code} value={country.name}>
//                 {country.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Tour Package */}
//         <div className="mb-5">
//           <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
//             Tour Package
//           </label>
//           <input
//             type="text"
//             value={formData.tourPackage}
//             onChange={(e) => setFormData({ ...formData, tourPackage: e.target.value })}
//             className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-not-allowed"
//             disabled
//           />
//         </div>

//         {/* Message */}
//         <div className="mb-5">
//           <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
//             Message (Optional)
//           </label>
//           <textarea
//             placeholder="Any special requests?"
//             value={formData.message}
//             onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//             className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-y min-h-[100px]"
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-lg font-semibold shadow-md hover:from-green-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300"
//           disabled={loading}
//         >
//           {loading ? "Submitting..." : "Book Now"}
//         </button>
//       </form>

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
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { countries } from "countries-list"; // Import country data

interface BookingData {
  name: string;
  phoneCode: string;
  phoneNumber: string;
  email: string;
  date: string;
  country: string;
  tourPackage: string;
  message: string;
}

type Notification = {
  type: "success" | "error";
  message: string;
} | null;

export default function BookingForm({ tourPackage }: { tourPackage: string }) {
  const [formData, setFormData] = useState<BookingData>({
    name: "",
    phoneCode: "+94", // Default to Sri Lanka
    phoneNumber: "",
    email: "",
    date: "",
    country: "",
    tourPackage,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<Notification>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setNotification(null); // Clear previous notification

    const fullPhone = `${formData.phoneCode}${formData.phoneNumber}`;
    const submissionData = { ...formData, phone: fullPhone };

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (res.ok) {
        setNotification({
          type: "success",
          message: "Booking submitted successfully! Check your email for confirmation.",
        });
        setFormData({
          name: "",
          phoneCode: "+94",
          phoneNumber: "",
          email: "",
          date: "",
          country: "",
          tourPackage,
          message: "",
        });
      } else {
        const errorData = await res.json();
        setNotification({
          type: "error",
          message: `Error submitting booking: ${errorData.error || "Unknown error"}`,
        });
      }
    } catch (error) {
      console.error("Booking error:", error);
      setNotification({
        type: "error",
        message: "Error submitting booking. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Auto-dismiss notification after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer); // Cleanup on unmount or notification change
    }
  }, [notification]);

  // Convert countries object to array and sort A-Z
  const countryList = Object.entries(countries)
    .map(([code, data]) => ({
      code,
      name: data.name,
      phoneCode: `+${data.phone}`,
    }))
    .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically A-Z

  return (
    <div className="relative">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className={`bg-white dark:bg-gray-900 p-6 md:p-8 rounded-xl shadow-lg max-w-lg mx-auto my-8 transform transition-all duration-300 hover:shadow-xl ${
          notification ? "blur-sm" : ""
        }`}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-green-700 dark:text-green-500 mb-6 text-center">
          Book Your Yala Safari Adventure
        </h2>

        {/* Name */}
        <div className="mb-5">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            required
          />
        </div>

        {/* Phone Number with Country Code */}
        <div className="mb-5 flex gap-3">
          <div className="w-1/3">
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
              Code
            </label>
            <select
              value={formData.phoneCode}
              onChange={(e) => setFormData({ ...formData, phoneCode: e.target.value })}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              {countryList.map((country) => (
                <option key={country.code} value={country.phoneCode}>
                  {country.phoneCode} ({country.name})
                </option>
              ))}
            </select>
          </div>
          <div className="w-2/3">
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Your Phone"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            required
          />
        </div>

        {/* Date */}
        <div className="mb-5">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
            Preferred Date
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            required
          />
        </div>

        {/* Country */}
        <div className="mb-5">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
            Country
          </label>
          <select
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          >
            <option value="" disabled>
              Select your country
            </option>
            {countryList.map((country) => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tour Package */}
        <div className="mb-5">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
            Tour Package
          </label>
          <input
            type="text"
            value={formData.tourPackage}
            onChange={(e) => setFormData({ ...formData, tourPackage: e.target.value })}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-not-allowed"
            disabled
          />
        </div>

        {/* Message */}
        <div className="mb-5">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
            Message (Optional)
          </label>
          <textarea
            placeholder="Any special requests?"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-y min-h-[100px]"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-lg font-semibold shadow-md hover:from-green-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Book Now"}
        </button>
      </form>

      {/* Notification Modal */}
      {notification && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div
            className={`p-6 rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all duration-500 animate-fadeIn ${
              notification.type === "success" ? "bg-black text-white" : "bg-red-600 text-white"
            }`}
          >
            <p className="text-lg font-semibold text-center">{notification.message}</p>
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setNotification(null)}
                className="bg-black text-green-700 dark:text-green-500 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}