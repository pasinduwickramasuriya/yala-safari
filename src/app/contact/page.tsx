'use client'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Add logic to send form data (e.g., via an API or email service)
    alert('Thank you for your message! We’ll get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-6">Contact Us</h1>
      <p>Email: info@yalasafari.com | Phone: +94 123 456 789</p>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-6 bg-white p-6 rounded shadow-md">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
        />
        <textarea
          placeholder="Message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
        />
        <button type="submit" className="btn w-full">Send Message</button>
      </form>
    </div>
  )
}