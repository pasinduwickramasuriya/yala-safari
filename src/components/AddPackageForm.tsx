"use client";

import { useState, useEffect } from "react";
import slugify from "slugify";
import { Button } from "@/components/ui/button"; // Shadcn Button
import { Label } from "@/components/ui/label"; // Shadcn Label
import { Textarea } from "@/components/ui/textarea"; // Shadcn Textarea
import { cn } from "@/lib/utils"; // Shadcn utility for className merging

interface Package {
  id?: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  slug?: string;
}

export default function AddPackageForm({ packageToEdit }: { packageToEdit?: Package }) {
  const [formData, setFormData] = useState({ name: "", description: "", price: 0 });
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
    let imageUrl = packageToEdit?.imageUrl || "";
    if (file) {
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);
      const resUpload = await fetch("/api/upload", { method: "POST", body: formDataUpload });
      if (resUpload.ok) {
        const { url } = await resUpload.json();
        imageUrl = url;
      } else {
        alert("Error uploading image");
        return;
      }
    }
    const packageData = {
      ...(packageToEdit ? { id: packageToEdit.id } : {}),
      ...formData,
      imageUrl,
      slug: slugify(formData.name, { lower: true }),
    };

    const url = "/api/packages";
    const method = packageToEdit ? "PUT" : "POST";

    console.log("Sending to server:", packageData); // Debug what’s sent

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(packageData),
    });

    console.log("Response status:", res.status, "Response ok:", res.ok); // Debug response

    if (res.ok) {
      window.location.reload();
    } else {
      let errorMessage = "Unknown error";
      try {
        const text = await res.text(); // Get raw response text
        console.log("Raw response:", text); // Debug raw response
        const errorData = JSON.parse(text); // Try parsing as JSON
        errorMessage = errorData.error || errorMessage;
      } catch (jsonError) {
        console.error("Failed to parse JSON:", jsonError);
        errorMessage = `Server error ${res.status}: ${res.statusText}`;
      }
      alert(`Error ${packageToEdit ? "updating" : "adding"} package: ${errorMessage}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-background p-6 rounded-xl shadow-md text-foreground"
    >
      <h2 className="text-xl font-semibold text-foreground mb-6">
        {packageToEdit ? "Edit Package" : "Add New Package"}
      </h2>

      {/* Name */}
      <div className="space-y-2 mb-6">
        <Label htmlFor="name" className="text-muted-foreground">
          Name
        </Label>
        <input
          id="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={cn(
            "w-full p-2 border border-border rounded-lg bg-background/80 text-foreground placeholder-muted-foreground/50",
            "focus:ring-primary focus:border-primary"
          )}
        />
      </div>

      {/* Description */}
      <div className="space-y-2 mb-6">
        <Label htmlFor="description" className="text-muted-foreground">
          Description
        </Label>
        <Textarea
          id="description"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className={cn(
            "w-full p-2 border border-border rounded-lg bg-background/80 text-foreground placeholder-muted-foreground/50",
            "focus:ring-primary focus:border-primary min-h-[100px]"
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

      {/* Price */}
      <div className="space-y-2 mb-6">
        <Label htmlFor="price" className="text-muted-foreground">
          Price
        </Label>
        <input
          id="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
          className={cn(
            "w-full p-2 border border-border rounded-lg bg-background/80 text-foreground placeholder-muted-foreground/50",
            "focus:ring-primary focus:border-primary"
          )}
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
        {packageToEdit ? "Update Package" : "Add Package"}
      </Button>
    </form>
  );
}