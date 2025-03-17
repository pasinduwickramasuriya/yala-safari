import prisma from "@/lib/prisma";
import Image from "next/image";
import { redirect } from "next/navigation";

// Simple admin check (replace with your auth logic)
async function checkAdmin() {
  const isAdmin = true; // Placeholder; replace with real auth (e.g., NextAuth.js)
  if (!isAdmin) redirect("/");
}

async function getCustomerReviews() {
  return await prisma.customerReview.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default async function AdminCustomerReviewsPage() {
  await checkAdmin();
  const reviews = await getCustomerReviews();

  async function handleApprove(id: number) {
    "use server";
    await prisma.customerReview.update({
      where: { id },
      data: { isApproved: true },
    });
  }

  async function handleDelete(id: number) {
    "use server";
    await prisma.customerReview.delete({ where: { id } });
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Manage Customer Reviews
        </h1>
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-6"
            >
              {review.imageUrl && (
                <div className="relative w-full md:w-1/4 h-40">
                  <Image
                    src={review.imageUrl}
                    alt={`${review.customerName}'s review`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
              <div className="flex-1">
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  <strong>Name:</strong> {review.customerName}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  <strong>Email:</strong> {review.customerEmail}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{review.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Submitted: {new Date(review.createdAt).toLocaleDateString()}
                </p>
                <div className="flex gap-4">
                  {!review.isApproved && (
                    <form action={handleApprove.bind(null, review.id)}>
                      <button
                        type="submit"
                        className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-all"
                      >
                        Approve
                      </button>
                    </form>
                  )}
                  <form action={handleDelete.bind(null, review.id)}>
                    <button
                      type="submit"
                      className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-all"
                    >
                      Delete
                    </button>
                  </form>
                </div>
                {review.isApproved && (
                  <span className="text-green-500 text-sm mt-2 inline-block">Approved</span>
                )}
              </div>
            </div>
          ))}
          {reviews.length === 0 && (
            <p className="text-gray-600 dark:text-gray-300 text-center">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}