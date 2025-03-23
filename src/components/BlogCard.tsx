"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Shadcn Button
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Shadcn Card components
import { cn } from "@/lib/utils"; // Shadcn utility for className merging

interface Blog {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  slug: string;
  createdAt: Date;
}

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Card
      className={cn(
        "group bg-background rounded-xl overflow-hidden transform transition-all duration-300",
        "hover:shadow-2xl hover:-translate-y-2 max-w-2xl mx-auto flex flex-col md:flex-row"
      )}
    >
      {/* Image Section */}
      <div className="relative w-full md:w-1/3 h-48 md:h-auto">
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          fill
          className={cn(
            "object-cover rounded-t-xl md:rounded-l-xl md:rounded-t-none transition-transform duration-500",
            "group-hover:scale-105"
          )}
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={false}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="flex flex-col w-full md:w-2/3">
        <CardHeader className="p-6 pb-0">
          <CardTitle
            className={cn(
              "text-lg md:text-xl font-bold text-foreground line-clamp-2"
            )}
          >
            {blog.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-2">
          <p
            className={cn(
              "text-muted-foreground text-sm line-clamp-2 mb-3"
            )}
          >
            {blog.content.substring(0, 100)}...
          </p>
          <p
            className={cn(
              "text-xs text-muted-foreground/70"
            )}
          >
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button
            asChild
            className={cn(
              "bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full",
              "transition-all duration-300 self-start"
            )}
          >
            <Link href={`/blog/${blog.slug}`}>
              Read More
            </Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}