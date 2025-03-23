"use client";

import { useState, useEffect } from "react";
import { countries } from "countries-list"; // Import country data
import { Button } from "@/components/ui/button"; // Shadcn Button
import { Label } from "@/components/ui/label"; // Shadcn Label
import { cn } from "@/lib/utils"; // Shadcn utility for className merging

interface BookingData {
  name: string;
  phoneCode: string;
  phoneNumber: string;
  email: string;
  date: string;
  country: string;
  tourPackage: string;
  message: string;
}

type Notification = {
  type: "success" | "error";
  message: string;
} | null;

export default function BookingForm({ tourPackage }: { tourPackage: string }) {
  const [formData, setFormData] = useState<BookingData>({
    name: "",
    phoneCode: "+94", // Default to Sri Lanka
    phoneNumber: "",
    email: "",
    date: "",
    country: "",
    tourPackage,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<Notification>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setNotification(null);

    const fullPhone = `${formData.phoneCode}${formData.phoneNumber}`;
    const submissionData = { ...formData, phone: fullPhone };

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (res.ok) {
        setNotification({
          type: "success",
          message: "Booking submitted successfully! Check your email for confirmation.",
        });
        setFormData({
          name: "",
          phoneCode: "+94",
          phoneNumber: "",
          email: "",
          date: "",
          country: "",
          tourPackage,
          message: "",
        });
      } else {
        const errorData = await res.json();
        setNotification({
          type: "error",
          message: `Error submitting booking: ${errorData.error || "Unknown error"}`,
        });
      }
    } catch (error) {
      console.error("Booking error:", error);
      setNotification({
        type: "error",
        message: "Error submitting booking. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Auto-dismiss notification after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Convert countries object to array and sort A-Z
  const countryList = Object.entries(countries)
    .map(([code, data]) => ({
      code,
      name: data.name,
      phoneCode: `+${data.phone}`,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section className="py-20 bg-background/95 dark:bg-background/95">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-2xl font-bold text-foreground text-center mb-12">
            Book Your Yala Safari Adventure
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-muted-foreground">
                Full Name
              </Label>
              <input
                id="name"
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className={cn(
                  "bg-background/80 dark:bg-background/80 border-border text-foreground placeholder-muted-foreground/50",
                  "focus:ring-primary focus:border-primary rounded-lg w-full px-4 py-2"
                )}
              />
            </div>

            {/* Phone Number with Country Code */}
            <div className="space-y-2">
              <Label htmlFor="phoneCode" className="text-muted-foreground">
                Phone Number
              </Label>
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-2">
                <select
                  id="phoneCode"
                  value={formData.phoneCode}
                  onChange={(e) => setFormData({ ...formData, phoneCode: e.target.value })}
                  required
                  className={cn(
                    "appearance-none bg-background/80 dark:bg-background border-border text-foreground",
                    "focus:ring-primary focus:border-primary rounded-lg w-full sm:w-1/3 px-4 py-2",
                    "dark:text-foreground dark:placeholder-muted-foreground/50"
                  )}
                >
                  {countryList.map((country) => (
                    <option
                      key={country.code}
                      value={country.phoneCode}
                      className="bg-background text-foreground dark:bg-gray-900 dark:text-gray-100"
                    >
                      {country.phoneCode} ({country.name})
                    </option>
                  ))}
                </select>
                <input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Your Phone"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  required
                  className={cn(
                    "bg-background/80 dark:bg-background/80 border-border text-foreground placeholder-muted-foreground/50",
                    "focus:ring-primary focus:border-primary rounded-lg w-full sm:w-2/3 px-4 py-2"
                  )}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-muted-foreground">
                Email Address
              </Label>
              <input
                id="email"
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className={cn(
                  "bg-background/80 dark:bg-background/80 border-border text-foreground placeholder-muted-foreground/50",
                  "focus:ring-primary focus:border-primary rounded-lg w-full px-4 py-2"
                )}
              />
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-muted-foreground">
                Preferred Date
              </Label>
              <input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className={cn(
                  "bg-background/80 dark:bg-background/80 border-border text-foreground",
                  "focus:ring-primary focus:border-primary rounded-lg w-full px-4 py-2"
                )}
              />
            </div>

            {/* Country */}
            <div className="space-y-2">
              <Label htmlFor="country" className="text-muted-foreground">
                Country
              </Label>
              <select
                id="country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                required
                className={cn(
                  "appearance-none bg-background/80 dark:bg-background border-border text-foreground",
                  "focus:ring-primary focus:border-primary rounded-lg w-full px-4 py-2",
                  "dark:text-foreground dark:placeholder-muted-foreground/50"
                )}
              >
                <option
                  value=""
                  disabled
                  className="bg-background text-foreground dark:bg-gray-900 dark:text-gray-100"
                >
                  Select your country
                </option>
                {countryList.map((country) => (
                  <option
                    key={country.code}
                    value={country.name}
                    className="bg-background text-foreground dark:bg-gray-900 dark:text-gray-100"
                  >
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tour Package */}
            <div className="space-y-2">
              <Label htmlFor="tourPackage" className="text-muted-foreground">
                Tour Package
              </Label>
              <input
                id="tourPackage"
                type="text"
                value={formData.tourPackage}
                onChange={(e) => setFormData({ ...formData, tourPackage: e.target.value })}
                disabled
                className={cn(
                  "bg-muted dark:bg-muted border-border text-foreground",
                  "rounded-lg w-full px-4 py-2 cursor-not-allowed"
                )}
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message" className="text-muted-foreground">
                Message (Optional)
              </Label>
              <textarea
                id="message"
                placeholder="Any special requests?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={cn(
                  "bg-background/80 dark:bg-background/80 border-border text-foreground placeholder-muted-foreground/50",
                  "focus:ring-primary focus:border-primary rounded-lg w-full px-4 py-2 min-h-[100px]"
                )}
              />
            </div>

            {/* Submit Button */}
            <div className="flex flex-col gap-4">
              <Button
                type="submit"
                disabled={loading}
                className={cn(
                  "w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-full",
                  "disabled:bg-muted disabled:text-muted-foreground transition-all"
                )}
              >
                {loading ? "Submitting..." : "Book Now"}
              </Button>
            </div>

            {/* Notification */}
            {notification && (
              <div
                className={cn(
                  "mt-6 p-4 rounded-lg text-center text-foreground",
                  notification.type === "error"
                    ? "bg-destructive/20 dark:bg-destructive/20 text-destructive-foreground"
                    : "bg-success/20 dark:bg-success/20 text-success-foreground"
                )}
              >
                {notification.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}