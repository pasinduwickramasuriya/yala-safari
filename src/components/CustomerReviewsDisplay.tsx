import Image from "next/image";

interface Review {
  id: number;
  customerName: string;
  customerEmail: string;
  description: string;
  imageUrl: string | null;
  createdAt: Date;
}

interface CustomerReviewsDisplayProps {
  reviews: Review[];
}

export default function CustomerReviewsDisplay({ reviews }: CustomerReviewsDisplayProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-black  rounded-xl shadow-md p-6 flex flex-col gap-4"
        >
          {review.imageUrl && (
            <div className="relative h-48 w-full">
              <Image
                src={review.imageUrl}
                alt={`${review.customerName}'s review`}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
          <p className="text-gray-600 dark:text-gray-300 text-base">{review.description}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            - {review.customerName} ({review.customerEmail}) on{" "}
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
      {reviews.length === 0 && (
        <p className="text-gray-600 dark:text-gray-300 text-center col-span-full">
          No approved reviews yet.
        </p>
      )}
    </div>
  );
}