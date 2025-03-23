"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Shadcn Button
import { Textarea } from "@/components/ui/textarea"; // Shadcn Textarea
import { Label } from "@/components/ui/label"; // Shadcn Label
import { cn } from "@/lib/utils"; // Shadcn utility for className merging

export default function CustomerReviewSubmission() {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    description: "",
    image: null as File | null,
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false); // New state to toggle form visibility
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
        setTimeout(() => {
          router.refresh();
          setIsFormOpen(false); // Close form on successful submission
        }, 2000);
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
    <section className="py-20 bg-background/95 dark:bg-background/95">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-2xl font-bold text-foreground text-center mb-12">
            Share Your Safari Experience
          </h2>
          {/* Toggle Button */}
          {!isFormOpen && (
            <div className="text-center">
              <Button
                onClick={() => setIsFormOpen(true)}
                className={cn(
                  "bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-8 rounded-full",
                  "transition-all"
                )}
              >
                Write a Review
              </Button>
            </div>
          )}
          {/* Form (shown only when isFormOpen is true) */}
          {isFormOpen && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Name */}
              <div className="space-y-2">
                <Label htmlFor="customerName" className="text-muted-foreground">
                  Your Name
                </Label>
                <input
                  id="customerName"
                  type="text"
                  value={formData.customerName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, customerName: e.target.value })
                  }
                  placeholder="Your Name"
                  required
                  className={cn(
                    "bg-background/80 dark:bg-background/80 border-border text-foreground placeholder-muted-foreground/50",
                    "focus:ring-primary focus:border-primary rounded-lg w-full px-4 py-2"
                  )}
                />
              </div>
              {/* Customer Email */}
              <div className="space-y-2">
                <Label htmlFor="customerEmail" className="text-muted-foreground">
                  Email Address
                </Label>
                <input
                  id="customerEmail"
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, customerEmail: e.target.value })
                  }
                  placeholder="Email Address"
                  required
                  className={cn(
                    "bg-background/80 dark:bg-background/80 border-border text-foreground placeholder-muted-foreground/50",
                    "focus:ring-primary focus:border-primary rounded-lg w-full px-4 py-2"
                  )}
                />
              </div>
              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-muted-foreground">
                  Your Review
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Your Review"
                  required
                  className={cn(
                    "bg-background/80 dark:bg-background/80 border-border text-foreground placeholder-muted-foreground/50",
                    "focus:ring-primary focus:border-primary rounded-lg min-h-[100px]"
                  )}
                />
              </div>
              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="image" className="text-muted-foreground">
                  Upload Image (Optional)
                </Label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, image: e.target.files?.[0] || null })
                  }
                  className={cn(
                    "bg-background/80 dark:bg-background/80 border-border text-foreground",
                    "file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-muted file:text-foreground file:font-medium",
                    "focus:ring-primary focus:border-primary rounded-lg w-full"
                  )}
                />
              </div>
              {/* Buttons (Stacked Vertically) */}
              <div className="flex flex-col gap-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    "w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-full",
                    "disabled:bg-muted disabled:text-muted-foreground transition-all"
                  )}
                >
                  {loading ? "Submitting..." : "Submit Review"}
                </Button>
                <Button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className={cn(
                    "w-full bg-muted hover:bg-muted/90 text-muted-foreground font-medium py-3 rounded-full",
                    "transition-all"
                  )}
                >
                  Cancel
                </Button>
              </div>
              {/* Notification */}
              {notification && (
                <div
                  className={cn(
                    "mt-6 p-4 rounded-lg text-center text-foreground",
                    notification.includes("Error")
                      ? "bg-destructive/20 dark:bg-destructive/20 text-destructive-foreground"
                      : "bg-success/20 dark:bg-success/20 text-success-foreground"
                  )}
                >
                  {notification}
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}