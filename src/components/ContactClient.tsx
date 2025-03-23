"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import HeroContact from "./HeroContact";
import Image from "next/image"; // Added for WhatsApp icon optimization
import { Button } from "@/components/ui/button"; // Shadcn Button
import { Label } from "@/components/ui/label"; // Shadcn Label
import { Textarea } from "@/components/ui/textarea"; // Shadcn Textarea
import { cn } from "@/lib/utils"; // Shadcn utility for className merging

interface ContactData {
  name: string;
  email: string;
  message: string;
}

type Notification = {
  type: "success" | "error";
  message: string;
} | null;

interface ContactClientProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  heroSections: any[]; // Replace with your actual HeroSection type
}

export default function ContactClient({ heroSections }: ContactClientProps) {
  const [formData, setFormData] = useState<ContactData>({ name: "", email: "", message: "" });
  const [notification, setNotification] = useState<Notification>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setNotification({
          type: "success",
          message: "Thank you for your message! We'll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        const errorData = await res.json();
        setNotification({
          type: "error",
          message: `Error sending message: ${errorData.error || "Unknown error"}`,
        });
      }
    } catch (error) {
      console.error("Contact error:", error);
      setNotification({
        type: "error",
        message: "Error sending message. Please try again.",
      });
    }
  };

  // Auto-dismiss notification after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <>
      <Header />
      <HeroContact heroSections={heroSections} />
      <main className="bg-background text-foreground min-h-screen">
        {/* Contact Hero */}
        <section className="bg-background text-foreground py-16">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6 animate-fadeIn tracking-tight">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Reach out to us for inquiries, support, or to plan your next adventure!
            </p>
          </div>
        </section>

        {/* Contact Info and Form */}
        <section className="py-16 bg-background/95 dark:bg-background/95">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-green-600 dark:text-green-500 mb-4">
                  Get in Touch
                </h2>
                <div className="flex items-center space-x-4">
                  <svg
                    className="w-6 h-6 text-green-600 dark:text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a
                    href="mailto:info@yalasafari.com"
                    className="text-muted-foreground hover:text-green-600 dark:hover:text-green-500 transition-colors duration-300"
                  >
                    pasindusadanjana17@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-4">
                  <svg
                    className="w-6 h-6 text-green-600 dark:text-green-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.94 11A8.994 8.994 0 0013 3.06V1h-2v2.06A8.994 8.994 0 003.06 11H1v2h2.06A8.994 8.994 0 0011 20.94V23h2v-2.06A8.994 8.994 0 0020.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
                  </svg>
                  <a
                    href="https://wa.me/94123456789"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-green-600 dark:hover:text-green-500 transition-colors duration-300 flex items-center"
                  >
                    <span>+94 778 158 004</span>
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                      alt="WhatsApp"
                      width={24}
                      height={24}
                      className="ml-2"
                    />
                  </a>
                </div>
                {/* Map with Location Icon */}
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Our Location
                  </h3>
                  <div className="relative h-64 rounded-lg overflow-hidden shadow-md border border-border/50">
                    <iframe
                      // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3968.3666666666666!2d81.3013!3d6.2661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTUnNTcuOCJOIDgxwrAxOCcwNC41IkU!5e0!3m2!1sen!2slk!4v1698765432100!5m2!1sen!2slk"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3968.3666666666666!2d81.30111451350646!3d6.265797090893244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTUnNTYuOSJOIDgxwrAxOCcwNC4wIkU!5e0!3m2!1sen!2slk!4v1698765432100!5m2!1sen!2slk"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Send Us a Message
                  </h2>
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-muted-foreground">
                      Name
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
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-muted-foreground">
                      Email
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
                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-muted-foreground">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className={cn(
                        "bg-background/80 dark:bg-background/80 border-border text-foreground placeholder-muted-foreground/50",
                        "focus:ring-primary focus:border-primary rounded-lg min-h-[120px]"
                      )}
                    />
                  </div>
                  {/* Submit Button */}
                  <div className="flex flex-col gap-4">
                    <Button
                      type="submit"
                      className={cn(
                        "w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-full",
                        "transition-all"
                      )}
                    >
                      Send Message
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
          </div>
        </section>
      </main>
    </>
  );
}