'use client';

import { useState, useEffect } from 'react';

interface HeroSection {
  id: number;
  imageUrl: string;
  title: string;
  subtitle: string;
}

export default function AdminHeroSection() {
  const [heroSections, setHeroSections] = useState<HeroSection[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<HeroSection | null>(null);

  // Fetch hero sections on mount
  useEffect(() => {
    fetch('/api/hero-section')
      .then((res) => res.json())
      .then((data) => setHeroSections(data));
  }, []);

  // Add a new hero section
  const handleAdd = async (formData: FormData) => {
    const res = await fetch('/api/hero-section', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      const newHeroSection = await res.json();
      setHeroSections([...heroSections, newHeroSection]);
      setIsAdding(false);
    }
  };

  // Edit an existing hero section
  const handleEdit = async (id: number, formData: FormData) => {
    const res = await fetch(`/api/hero-section/${id}`, {
      method: 'PUT',
      body: formData,
    });
    if (res.ok) {
      const updatedHeroSection = await res.json();
      setHeroSections(
        heroSections.map((hs) => (hs.id === id ? updatedHeroSection : hs))
      );
      setIsEditing(null);
    }
  };

  // Delete a hero section
  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/hero-section/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setHeroSections(heroSections.filter((hs) => hs.id !== id));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Hero Sections</h2>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setIsAdding(true)}
      >
        Add New
      </button>
      <div className="space-y-4">
        {heroSections.map((hs) => (
          <div key={hs.id} className="flex items-center space-x-4 border p-2">
            <img src={hs.imageUrl} alt={hs.title} className="w-20 h-20 object-cover" />
            <div>
              <h3 className="font-semibold">{hs.title}</h3>
              <p>{hs.subtitle}</p>
            </div>
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded"
              onClick={() => setIsEditing(hs)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => handleDelete(hs.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      {(isAdding || isEditing) && (
        <HeroForm
          heroSection={isEditing}
          onSubmit={(formData) =>
            isEditing ? handleEdit(isEditing.id, formData) : handleAdd(formData)
          }
          onCancel={() => (isAdding ? setIsAdding(false) : setIsEditing(null))}
        />
      )}
    </div>
  );
}

interface HeroFormProps {
  heroSection?: HeroSection | null;
  onSubmit: (formData: FormData) => void;
  onCancel: () => void;
}

function HeroForm({ heroSection, onSubmit, onCancel }: HeroFormProps) {
  const [title, setTitle] = useState(heroSection?.title || '');
  const [subtitle, setSubtitle] = useState(heroSection?.subtitle || '');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    if (file) formData.append('file', file);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 p-4 border rounded">
      <div className="mb-2">
        <label className="block">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block">Subtitle</label>
        <input
          type="text"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="w-full border p-2"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block">Image</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full"
          required={!heroSection} // Required only when adding, not editing
        />
      </div>
      <div className="flex space-x-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}