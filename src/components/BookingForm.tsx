'use client';
import { useState } from 'react';

interface BookingData {
  name: string;
  phone: string;
  email: string;
  date: string;
  country: string;
  tourPackage: string;
  message: string;
}

export default function BookingForm({ tourPackage }: { tourPackage: string }) {
  const [formData, setFormData] = useState<BookingData>({
    name: '',
    phone: '',
    email: '',
    date: '',
    country: '',
    tourPackage,
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Booking submitted successfully! Check your email for confirmation.');
        setFormData({
          name: '',
          phone: '',
          email: '',
          date: '',
          country: '',
          tourPackage,
          message: '',
        });
      } else {
        const errorData = await res.json();
        alert(`Error submitting booking: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Error submitting booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md text-black max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Book Your Safari</h2>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <input
        type="tel"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <input
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Country"
        value={formData.country}
        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Tour Package"
        value={formData.tourPackage}
        onChange={(e) => setFormData({ ...formData, tourPackage: e.target.value })}
        className="w-full p-2 mb-4 border rounded"
        disabled // Pre-filled from package page
      />
      <textarea
        placeholder="Message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className="w-full p-2 mb-4 border rounded"
      />
      <button
        type="submit"
        className="btn w-full bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Booking'}
      </button>
    </form>
  );
}