// 'use client'
// import { useState } from 'react'
// import slugify from 'slugify'

// export default function AddBlogForm() {
//   const [formData, setFormData] = useState({ title: '', content: '' })
//   const [file, setFile] = useState<File | null>(null)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     let imageUrl = ''
//     if (file) {
//       const formDataUpload = new FormData()
//       formDataUpload.append('file', file)
//       const resUpload = await fetch('/api/upload', { method: 'POST', body: formDataUpload })
//       if (resUpload.ok) {
//         const { url } = await resUpload.json()
//         imageUrl = url
//       } else {
//         alert('Error uploading image')
//         return
//       }
//     }
//     const blogData = { ...formData, imageUrl, slug: slugify(formData.title, { lower: true }) }
//     const res = await fetch('/api/blog', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(blogData)
//     })
//     if (res.ok) window.location.reload()
//     else alert('Error adding blog post')
//   }

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md text-black">
//       <h2 className="text-xl font-semibold mb-4">Add New Blog Post</h2>
//       <input
//         type="text"
//         placeholder="Title"
//         value={formData.title}
//         onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//         className="w-full p-2 mb-4 border rounded"
//       />
//       <textarea
//         placeholder="Content"
//         value={formData.content}
//         onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//         className="w-full p-2 mb-4 border rounded"
//       />
//       <input
//         type="file"
//         onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
//         className="w-full p-2 mb-4"
//       />
//       <button type="submit" className="btn w-full">Add Blog Post</button>
//     </form>
//   )
// }


// 'use client';
// import { useState, useEffect } from 'react';
// import slugify from 'slugify';

// interface Blog {
//   id?: number;
//   title: string;
//   content: string;
//   imageUrl?: string;
//   slug?: string;
// }

// export default function AddBlogForm({ blogToEdit }: { blogToEdit?: Blog }) {
//   const [formData, setFormData] = useState({ title: '', content: '' });
//   const [file, setFile] = useState<File | null>(null);

//   useEffect(() => {
//     if (blogToEdit) {
//       setFormData({
//         title: blogToEdit.title,
//         content: blogToEdit.content,
//       });
//     }
//   }, [blogToEdit]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     let imageUrl = blogToEdit?.imageUrl || '';
//     if (file) {
//       const formDataUpload = new FormData();
//       formDataUpload.append('file', file);
//       const resUpload = await fetch('/api/upload', { method: 'POST', body: formDataUpload });
//       if (resUpload.ok) {
//         const { url } = await resUpload.json();
//         imageUrl = url;
//       } else {
//         alert('Error uploading image');
//         return;
//       }
//     }
//     const blogData = {
//       ...(blogToEdit ? { id: blogToEdit.id } : {}), // Include id for edits
//       ...formData,
//       imageUrl,
//       slug: slugify(formData.title, { lower: true }),
//     };

//     const method = blogToEdit ? 'PUT' : 'POST';
//     const res = await fetch('/api/blog', {
//       method,
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(blogData),
//     });

//     if (res.ok) {
//       window.location.reload();
//     } else {
//       let errorMessage = 'Unknown error';
//       try {
//         const errorData = await res.json();
//         errorMessage = errorData.error || errorMessage;
//       } catch (jsonError) {
//         console.error('Failed to parse JSON:', jsonError);
//         errorMessage = `Server error ${res.status}: ${res.statusText}`;
//       }
//       alert(`Error ${blogToEdit ? 'updating' : 'adding'} blog post: ${errorMessage}`);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md text-black">
//       <h2 className="text-xl font-semibold mb-4">{blogToEdit ? 'Edit Blog Post' : 'Add New Blog Post'}</h2>
//       <input
//         type="text"
//         placeholder="Title"
//         value={formData.title}
//         onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//         className="w-full p-2 mb-4 border rounded"
//       />
//       <textarea
//         placeholder="Content"
//         value={formData.content}
//         onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//         className="w-full p-2 mb-4 border rounded"
//       />
//       <input
//         type="file"
//         onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
//         className="w-full p-2 mb-4"
//       />
//       <button type="submit" className="btn w-full">
//         {blogToEdit ? 'Update Blog Post' : 'Add Blog Post'}
//       </button>
//     </form>
//   );
// }


'use client';
import { useState, useEffect } from 'react';
import slugify from 'slugify';

interface Blog {
  id?: number;
  title: string;
  content: string;
  imageUrl?: string;
  slug?: string;
}

export default function AddBlogForm({ blogToEdit }: { blogToEdit?: Blog }) {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (blogToEdit) {
      setFormData({
        title: blogToEdit.title,
        content: blogToEdit.content,
      });
    }
  }, [blogToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = blogToEdit?.imageUrl || '';
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 2MB limit
        alert('File too large. Max size is 2MB.');
        return;
      }
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 5s timeout
        const resUpload = await fetch('/api/upload', {
          method: 'POST',
          body: formDataUpload,
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (resUpload.ok) {
          const { url } = await resUpload.json();
          imageUrl = url;
        } else {
          const errorText = await resUpload.text();
          console.error('Upload failed:', errorText);
          alert(`Error uploading image: ${errorText || resUpload.statusText}`);
          return;
        }
      } catch (error: any) { // Type as any
        console.error('Upload error:', error);
        alert(`Error uploading image: ${error.message || 'Request timed out'}`);
        return;
      }
    }
    const blogData = {
      ...(blogToEdit ? { id: blogToEdit.id } : {}),
      ...formData,
      imageUrl,
      slug: slugify(formData.title, { lower: true }),
    };

    const method = blogToEdit ? 'PUT' : 'POST';
    const res = await fetch('/api/blog', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blogData),
    });

    if (res.ok) {
      window.location.reload();
    } else {
      let errorMessage = 'Unknown error';
      try {
        const errorData = await res.json();
        errorMessage = errorData.error || errorMessage;
      } catch (jsonError) {
        console.error('Failed to parse JSON:', jsonError);
        errorMessage = `Server error ${res.status}: ${res.statusText}`;
      }
      alert(`Error ${blogToEdit ? 'updating' : 'adding'} blog post: ${errorMessage}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md text-black">
      <h2 className="text-xl font-semibold mb-4">{blogToEdit ? 'Edit Blog Post' : 'Add New Blog Post'}</h2>
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full p-2 mb-4 border rounded"
      />
      <textarea
        placeholder="Content"
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        className="w-full p-2 mb-4"
      />
      <button type="submit" className="btn w-full">
        {blogToEdit ? 'Update Blog Post' : 'Add Blog Post'}
      </button>
    </form>
  );
}
