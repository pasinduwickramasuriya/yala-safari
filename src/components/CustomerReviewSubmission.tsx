// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function CustomerReviewSubmission() {
//   const [formData, setFormData] = useState({
//     customerName: "",
//     customerEmail: "",
//     description: "",
//     image: null as File | null,
//   });
//   const [loading, setLoading] = useState(false);
//   const [notification, setNotification] = useState<string | null>(null);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setNotification(null);

//     const data = new FormData();
//     data.append("customerName", formData.customerName);
//     data.append("customerEmail", formData.customerEmail);
//     data.append("description", formData.description);
//     if (formData.image) data.append("image", formData.image);

//     try {
//       const res = await fetch("/api/customer-reviews", {
//         method: "POST",
//         body: data,
//       });

//       if (res.ok) {
//         setNotification("Review submitted successfully! Awaiting admin approval.");
//         setFormData({ customerName: "", customerEmail: "", description: "", image: null });
//         setTimeout(() => router.refresh(), 2000); // Refresh page to show new reviews (if approved)
//       } else {
//         const errorData = await res.json();
//         setNotification(`Error: ${errorData.error || "Something went wrong"}`);
//       }
//     } catch (error) {
//       setNotification("Error submitting review. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-black dark:bg-gray-900 rounded-xl shadow-lg p-6 md:p-8 max-w-xl mx-auto">
//       <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
//         Share Your Safari Experience
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Customer Name */}
//         <div>
//           <label className="block text-gray-700 dark:text-white font-medium mb-1">
//             Your Name
//           </label>
//           <input
//             type="text"
//             value={formData.customerName}
//             onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
//             className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500"
//             required
//           />
//         </div>
//         {/* Customer Email */}
//         <div>
//           <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
//             Your Email
//           </label>
//           <input
//             type="email"
//             value={formData.customerEmail}
//             onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
//             className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500"
//             required
//           />
//         </div>
//         {/* Description */}
//         <div>
//           <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
//             Your Review
//           </label>
//           <textarea
//             value={formData.description}
//             onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//             className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 min-h-[120px]"
//             placeholder="Tell us about your safari adventure!"
//             required
//           />
//         </div>
//         {/* Image Upload */}
//         <div>
//           <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
//             Upload Image (Optional)
//           </label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
//             className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//           />
//         </div>
//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-lg font-semibold shadow-md hover:from-green-700 hover:to-teal-700 disabled:bg-gray-400 transition-all duration-300"
//           disabled={loading}
//         >
//           {loading ? "Submitting..." : "Submit Review"}
//         </button>
//       </form>
//       {/* Notification */}
//       {notification && (
//         <div className="mt-4 p-4 bg-black text-white rounded-lg text-center">
//           {notification}
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CustomerReviewSubmission() {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    description: "",
    image: null as File | null,
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setNotification(null);

    const data = new FormData();
    data.append("customerName", formData.customerName);
    data.append("customerEmail", formData.customerEmail);
    data.append("description", formData.description);
    if (formData.image) data.append("image", formData.image);

    try {
      const res = await fetch("/api/customer-reviews", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        setNotification("Review submitted successfully! Awaiting admin approval.");
        setFormData({ customerName: "", customerEmail: "", description: "", image: null });
        setTimeout(() => router.refresh(), 2000);
      } else {
        const errorData = await res.json();
        setNotification(`Error: ${errorData.error || "Something went wrong"}`);
      }
    } catch (error) {
      setNotification("Error submitting review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black rounded-xl shadow-lg p-6 md:p-8 max-w-100 mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">
        Share Your Safari Experience
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Name */}
        <div>
          <label className="block text-white font-medium mb-1">Your Name</label>
          <input
            type="text"
            value={formData.customerName}
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
            className="w-full h-7 p-3 border border-white rounded-lg bg-black text-white placeholder-white-10 focus:ring-2 focus:ring-white focus:border-white"
            placeholder="Your name"
            required
          />
        </div>
        {/* Customer Email */}
        <div>
          <label className="block text-white font-medium mb-1">Your Email</label>
          <input
            type="email"
            value={formData.customerEmail}
            onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
            className="w-full h-7 p-3 border border-white rounded-lg bg-black text-white placeholder-white-10 focus:ring-2 focus:ring-white focus:border-white"
            placeholder="Your email"
            required
          />
        </div>
        {/* Description */}
        <div>
          <label className="block text-white font-medium mb-1">Your Review</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-3 border border-white rounded-lg bg-black text-white placeholder-white-10 focus:ring-2 focus:ring-white focus:border-white min-h-[10px]"
            placeholder="Tell us about your safari adventure!"
            required
          />
        </div>
        {/* Image Upload */}
        <div>
          <label className="block text-white font-medium mb-1">Upload Image (Optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
            className="w-full p-3 border border-white rounded-lg bg-black text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white file:text-black file:font-semibold"
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-white text-black py-3 rounded-lg font-semibold shadow-md hover:bg-gray-200 disabled:bg-gray-400 disabled:text-gray-600 transition-all duration-300"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
      {/* Notification */}
      {notification && (
        <div className="mt-4 p-4 bg-white text-black rounded-lg text-center">
          {notification}
        </div>
      )}
    </div>
  );
}