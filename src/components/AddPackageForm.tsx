'use client'
import { useState } from 'react'
import slugify from 'slugify'

export default function AddPackageForm() {
  const [formData, setFormData] = useState({ name: '', description: '', price: 0 })
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    let imageUrl = ''
    if (file) {
      const formDataUpload = new FormData()
      formDataUpload.append('file', file)
      const resUpload = await fetch('/api/upload', { method: 'POST', body: formDataUpload })
      if (resUpload.ok) {
        const { url } = await resUpload.json()
        imageUrl = url
      } else {
        alert('Error uploading image')
        return
      }
    }
    const packageData = { ...formData, imageUrl, slug: slugify(formData.name, { lower: true }) }
    const res = await fetch('/api/packages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(packageData)
    })
    if (res.ok) window.location.reload()
    else alert('Error adding package')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md text-black">
      <h2 className="text-xl font-semibold mb-4">Add New Package</h2>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full p-2 mb-4 border rounded"
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        className="w-full p-2 mb-4"
      />
      <input
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
        className="w-full p-2 mb-4 border rounded"
      />
      <button type="submit" className="btn w-full">Add Package</button>
    </form>
  )
}