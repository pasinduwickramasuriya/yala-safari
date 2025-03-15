'use client';
import { useRouter } from 'next/navigation';

export default function DeleteBlogButton({ blogId }: { blogId: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch(`/api/blog?id=${blogId}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      router.refresh(); // Refresh the page to update the list
    } else {
      alert('Error deleting blog post');
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
    >
      Delete
    </button>
  );
}