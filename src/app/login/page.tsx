"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button"; // Shadcn Button
import { Label } from "@/components/ui/label"; // Shadcn Label
import { cn } from "@/lib/utils"; // Shadcn utility for className merging

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.ok) router.push("/admin/dashboard");
    else alert("Login failed");
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-background">
        <form
          onSubmit={handleSubmit}
          className="bg-background p-6 rounded-xl shadow-md text-foreground w-full max-w-md"
        >
          <h1 className="text-2xl font-semibold text-foreground mb-6">
            Admin Login
          </h1>

          {/* Email */}
          <div className="space-y-2 mb-6">
            <Label htmlFor="email" className="text-muted-foreground">
              Email
            </Label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(
                "w-full p-2 border border-border rounded-lg bg-background/80 text-foreground placeholder-muted-foreground/50",
                "focus:ring-primary focus:border-primary"
              )}
            />
          </div>

          {/* Password */}
          <div className="space-y-2 mb-6">
            <Label htmlFor="password" className="text-muted-foreground">
              Password
            </Label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            Login
          </Button>
        </form>
      </div>
    </>
  );
}