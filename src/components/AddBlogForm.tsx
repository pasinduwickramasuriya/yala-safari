"use client";

import { useState, useEffect } from "react";
import slugify from "slugify";
import { Button } from "@/components/ui/button"; // Shadcn Button
import { Label } from "@/components/ui/label"; // Shadcn Label
import { Textarea } from "@/components/ui/textarea"; // Shadcn Textarea
import { cn } from "@/lib/utils"; // Shadcn utility for className merging

interface Blog {
  id?: number;
  title: string;
  content: string;
  imageUrl?: string;
  slug?: string;
}

export default function AddBlogForm({ blogToEdit }: { blogToEdit?: Blog }) {
  const [formData, setFormData] = useState({ title: "", content: "" });
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
    let imageUrl = blogToEdit?.imageUrl || "";
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit (corrected comment from 2MB)
        alert("File too large. Max size is 5MB.");
        return;
      }
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
        const resUpload = await fetch("/api/upload", {
          method: "POST",
          body: formDataUpload,
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (resUpload.ok) {
          const { url } = await resUpload.json();
          imageUrl = url;
        } else {
          const errorText = await resUpload.text();
          console.error("Upload failed:", errorText);
          alert(`Error uploading image: ${errorText || resUpload.statusText}`);
          return;
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("Upload error:", error);
          alert(`Error uploading image: ${error.message || "Request timed out"}`);
        } else {
          console.error("Upload error:", error);
          alert("Error uploading image: Request timed out");
        }
        return;
      }
    }
    const blogData = {
      ...(blogToEdit ? { id: blogToEdit.id } : {}),
      ...formData,
      imageUrl,
      slug: slugify(formData.title, { lower: true }),
    };

    const method = blogToEdit ? "PUT" : "POST";
    const res = await fetch("/api/blog", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blogData),
    });

    if (res.ok) {
      window.location.reload();
    } else {
      let errorMessage = "Unknown error";
      try {
        const errorData = await res.json();
        errorMessage = errorData.error || errorMessage;
      } catch (jsonError) {
        console.error("Failed to parse JSON:", jsonError);
        errorMessage = `Server error ${res.status}: ${res.statusText}`;
      }
      alert(`Error ${blogToEdit ? "updating" : "adding"} blog post: ${errorMessage}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-background p-6 rounded-xl shadow-md text-foreground"
    >
      <h2 className="text-xl font-semibold text-foreground mb-6">
        {blogToEdit ? "Edit Blog Post" : "Add New Blog Post"}
      </h2>

      {/* Title */}
      <div className="space-y-2 mb-6">
        <Label htmlFor="title" className="text-muted-foreground">
          Title
        </Label>
        <input
          id="title"
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className={cn(
            "w-full p-2 border border-border rounded-lg bg-background/80 text-foreground placeholder-muted-foreground/50",
            "focus:ring-primary focus:border-primary"
          )}
        />
      </div>

      {/* Content */}
      <div className="space-y-2 mb-6">
        <Label htmlFor="content" className="text-muted-foreground">
          Content
        </Label>
        <Textarea
          id="content"
          placeholder="Content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className={cn(
            "w-full p-2 border border-border rounded-lg bg-background/80 text-foreground placeholder-muted-foreground/50",
            "focus:ring-primary focus:border-primary min-h-[150px]"
          )}
        />
      </div>

      {/* Image Upload */}
      <div className="space-y-2 mb-6">
        <Label htmlFor="image" className="text-muted-foreground">
          Image
        </Label>
        <input
          id="image"
          type="file"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          className="w-full p-2 text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-muted file:text-foreground"
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className={cn(
          "w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-full",
          "transition-all"
        )}
      >
        {blogToEdit ? "Update Blog Post" : "Add Blog Post"}
      </Button>
    </form>
  );
}