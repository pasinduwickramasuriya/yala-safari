// 'use client'
// import { useState } from 'react'
// import slugify from 'slugify'

// export default function AddPackageForm() {
//   const [formData, setFormData] = useState({ name: '', description: '', price: 0 })
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
//     const packageData = { ...formData, imageUrl, slug: slugify(formData.name, { lower: true }) }
//     const res = await fetch('/api/packages', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(packageData)
//     })
//     if (res.ok) window.location.reload()
//     else alert('Error adding package')
//   }

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md text-black">
//       <h2 className="text-xl font-semibold mb-4">Add New Package</h2>
//       <input
//         type="text"
//         placeholder="Name"
//         value={formData.name}
//         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//         className="w-full p-2 mb-4 border rounded"
//       />
//       <textarea
//         placeholder="Description"
//         value={formData.description}
//         onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//         className="w-full p-2 mb-4 border rounded"
//       />
//       <input
//         type="file"
//         onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
//         className="w-full p-2 mb-4"
//       />
//       <input
//         type="number"
//         placeholder="Price"
//         value={formData.price}
//         onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
//         className="w-full p-2 mb-4 border rounded"
//       />
//       <button type="submit" className="btn w-full">Add Package</button>
//     </form>
//   )
// }


// 'use client';
// import { useState, useEffect } from 'react';
// import slugify from 'slugify';

// interface Package {
//   id?: number;
//   name: string;
//   description: string;
//   price: number;
//   imageUrl?: string;
//   slug?: string;
// }

// export default function AddPackageForm({ packageToEdit }: { packageToEdit?: Package }) {
//   const [formData, setFormData] = useState({ name: '', description: '', price: 0 });
//   const [file, setFile] = useState<File | null>(null);

//   // Prefill form if editing
//   useEffect(() => {
//     if (packageToEdit) {
//       setFormData({
//         name: packageToEdit.name,
//         description: packageToEdit.description,
//         price: packageToEdit.price,
//       });
//     }
//   }, [packageToEdit]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     let imageUrl = packageToEdit?.imageUrl || '';
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
//     const packageData = { ...formData, imageUrl, slug: slugify(formData.name, { lower: true }) };
    
//     const url = packageToEdit ? `/api/packages?id=${packageToEdit.id}` : '/api/packages';
//     const method = packageToEdit ? 'PUT' : 'POST';

//     const res = await fetch(url, {
//       method,
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(packageData),
//     });

//     if (res.ok) window.location.reload();
//     else alert(`Error ${packageToEdit ? 'updating' : 'adding'} package`);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md text-black">
//       <h2 className="text-xl font-semibold mb-4">{packageToEdit ? 'Edit Package' : 'Add New Package'}</h2>
//       <input
//         type="text"
//         placeholder="Name"
//         value={formData.name}
//         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//         className="w-full p-2 mb-4 border rounded"
//       />
//       <textarea
//         placeholder="Description"
//         value={formData.description}
//         onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//         className="w-full p-2 mb-4 border rounded"
//       />
//       <input
//         type="file"
//         onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
//         className="w-full p-2 mb-4"
//       />
//       <input
//         type="number"
//         placeholder="Price"
//         value={formData.price}
//         onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
//         className="w-full p-2 mb-4 border rounded"
//       />
//       <button type="submit" className="btn w-full">
//         {packageToEdit ? 'Update Package' : 'Add Package'}
//       </button>
//     </form>
//   );
// }




// 'use client';
// import { useState, useEffect } from 'react';
// import slugify from 'slugify';

// interface Package {
//   id?: number;
//   name: string;
//   description: string;
//   price: number;
//   imageUrl?: string;
//   slug?: string;
// }

// export default function AddPackageForm({ packageToEdit }: { packageToEdit?: Package }) {
//   const [formData, setFormData] = useState({ name: '', description: '', price: 0 });
//   const [file, setFile] = useState<File | null>(null);

//   useEffect(() => {
//     if (packageToEdit) {
//       setFormData({
//         name: packageToEdit.name,
//         description: packageToEdit.description,
//         price: packageToEdit.price,
//       });
//     }
//   }, [packageToEdit]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     let imageUrl = packageToEdit?.imageUrl || '';
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
//     const packageData = {
//       ...(packageToEdit ? { id: packageToEdit.id } : {}), // Include id when editing
//       ...formData,
//       imageUrl,
//       slug: slugify(formData.name, { lower: true }),
//     };

//     const url = '/api/packages'; // Same endpoint for POST and PUT
//     const method = packageToEdit ? 'PUT' : 'POST';

//     const res = await fetch(url, {
//       method,
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(packageData),
//     });

//     if (res.ok) {
//       window.location.reload();
//     } else {
//       const errorData = await res.json(); // Get error details
//       alert(`Error ${packageToEdit ? 'updating' : 'adding'} package: ${errorData.error || 'Unknown error'}`);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md text-black">
//       <h2 className="text-xl font-semibold mb-4">{packageToEdit ? 'Edit Package' : 'Add New Package'}</h2>
//       <input
//         type="text"
//         placeholder="Name"
//         value={formData.name}
//         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//         className="w-full p-2 mb-4 border rounded"
//       />
//       <textarea
//         placeholder="Description"
//         value={formData.description}
//         onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//         className="w-full p-2 mb-4 border rounded"
//       />
//       <input
//         type="file"
//         onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
//         className="w-full p-2 mb-4"
//       />
//       <input
//         type="number"
//         placeholder="Price"
//         value={formData.price}
//         onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
//         className="w-full p-2 mb-4 border rounded"
//       />
//       <button type="submit" className="btn w-full">
//         {packageToEdit ? 'Update Package' : 'Add Package'}
//       </button>
//     </form>
//   );
// }





// 'use client';
// import { useState, useEffect } from 'react';
// import slugify from 'slugify';

// interface Package {
//   id?: number;
//   name: string;
//   description: string;
//   price: number;
//   imageUrl?: string;
//   slug?: string;
// }

// export default function AddPackageForm({ packageToEdit }: { packageToEdit?: Package }) {
//   const [formData, setFormData] = useState({ name: '', description: '', price: 0 });
//   const [file, setFile] = useState<File | null>(null);

//   useEffect(() => {
//     if (packageToEdit) {
//       setFormData({
//         name: packageToEdit.name,
//         description: packageToEdit.description,
//         price: packageToEdit.price,
//       });
//     }
//   }, [packageToEdit]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     let imageUrl = packageToEdit?.imageUrl || '';
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
//     const packageData = {
//       ...(packageToEdit ? { id: packageToEdit.id } : {}),
//       ...formData,
//       imageUrl,
//       slug: slugify(formData.name, { lower: true }),
//     };

//     const url = '/api/packages';
//     const method = packageToEdit ? 'PUT' : 'POST';

//     const res = await fetch(url, {
//       method,
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(packageData),
//     });

//     if (res.ok) {
//       window.location.reload();
//     } else {
//       const errorData = await res.json();
//       alert(`Error ${packageToEdit ? 'updating' : 'adding'} package: ${errorData.error || 'Unknown error'}`);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md text-black">
//       <h2 className="text-xl font-semibold mb-4">{packageToEdit ? 'Edit Package' : 'Add New Package'}</h2>
//       <input
//         type="text"
//         placeholder="Name"
//         value={formData.name}
//         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//         className="w-full p-2 mb-4 border rounded"
//       />
//       <textarea
//         placeholder="Description"
//         value={formData.description}
//         onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//         className="w-full p-2 mb-4 border rounded"
//       />
//       <input
//         type="file"
//         onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
//         className="w-full p-2 mb-4"
//       />
//       <input
//         type="number"
//         placeholder="Price"
//         value={formData.price}
//         onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
//         className="w-full p-2 mb-4 border rounded"
//       />
//       <button type="submit" className="btn w-full">
//         {packageToEdit ? 'Update Package' : 'Add Package'}
//       </button>
//     </form>
//   );
// }



// 'use client';
// import { useState, useEffect } from 'react';
// import slugify from 'slugify';

// interface Package {
//   id?: number;
//   name: string;
//   description: string;
//   price: number;
//   imageUrl?: string;
//   slug?: string;
// }

// export default function AddPackageForm({ packageToEdit }: { packageToEdit?: Package }) {
//   const [formData, setFormData] = useState({ name: '', description: '', price: 0 });
//   const [file, setFile] = useState<File | null>(null);

//   useEffect(() => {
//     if (packageToEdit) {
//       setFormData({
//         name: packageToEdit.name,
//         description: packageToEdit.description,
//         price: packageToEdit.price,
//       });
//     }
//   }, [packageToEdit]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     let imageUrl = packageToEdit?.imageUrl || '';
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
//     const packageData = {
//       ...(packageToEdit ? { id: packageToEdit.id } : {}),
//       ...formData,
//       imageUrl,
//       slug: slugify(formData.name, { lower: true }),
//     };

//     const url = '/api/packages';
//     const method = packageToEdit ? 'PUT' : 'POST';

//     console.log('Sending:', packageData); // Debug what’s sent

//     const res = await fetch(url, {
//       method,
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(packageData),
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
//       alert(`Error ${packageToEdit ? 'updating' : 'adding'} package: ${errorMessage}`);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md text-black">
//       <h2 className="text-xl font-semibold mb-4">{packageToEdit ? 'Edit Package' : 'Add New Package'}</h2>
//       <input
//         type="text"
//         placeholder="Name"
//         value={formData.name}
//         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//         className="w-full p-2 mb-4 border rounded"
//       />
//       <textarea
//         placeholder="Description"
//         value={formData.description}
//         onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//         className="w-full p-2 mb-4 border rounded"
//       />
//       <input
//         type="file"
//         onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
//         className="w-full p-2 mb-4"
//       />
//       <input
//         type="number"
//         placeholder="Price"
//         value={formData.price}
//         onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
//         className="w-full p-2 mb-4 border rounded"
//       />
//       <button type="submit" className="btn w-full">
//         {packageToEdit ? 'Update Package' : 'Add Package'}
//       </button>
//     </form>
//   );
// }



'use client';
import { useState, useEffect } from 'react';
import slugify from 'slugify';

interface Package {
  id?: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  slug?: string;
}

export default function AddPackageForm({ packageToEdit }: { packageToEdit?: Package }) {
  const [formData, setFormData] = useState({ name: '', description: '', price: 0 });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (packageToEdit) {
      setFormData({
        name: packageToEdit.name,
        description: packageToEdit.description,
        price: packageToEdit.price,
      });
    }
  }, [packageToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = packageToEdit?.imageUrl || '';
    if (file) {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      const resUpload = await fetch('/api/upload', { method: 'POST', body: formDataUpload });
      if (resUpload.ok) {
        const { url } = await resUpload.json();
        imageUrl = url;
      } else {
        alert('Error uploading image');
        return;
      }
    }
    const packageData = {
      ...(packageToEdit ? { id: packageToEdit.id } : {}),
      ...formData,
      imageUrl,
      slug: slugify(formData.name, { lower: true }),
    };

    const url = '/api/packages';
    const method = packageToEdit ? 'PUT' : 'POST';

    console.log('Sending to server:', packageData); // Debug what’s sent

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(packageData),
    });

    console.log('Response status:', res.status, 'Response ok:', res.ok); // Debug response

    if (res.ok) {
      window.location.reload();
    } else {
      let errorMessage = 'Unknown error';
      try {
        const text = await res.text(); // Get raw response text
        console.log('Raw response:', text); // Debug raw response
        const errorData = JSON.parse(text); // Try parsing as JSON
        errorMessage = errorData.error || errorMessage;
      } catch (jsonError) {
        console.error('Failed to parse JSON:', jsonError);
        errorMessage = `Server error ${res.status}: ${res.statusText}`;
      }
      alert(`Error ${packageToEdit ? 'updating' : 'adding'} package: ${errorMessage}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md text-black">
      <h2 className="text-xl font-semibold mb-4">{packageToEdit ? 'Edit Package' : 'Add New Package'}</h2>
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
      <button type="submit" className="btn w-full">
        {packageToEdit ? 'Update Package' : 'Add Package'}
      </button>
    </form>
  );
}