import prisma from "@/lib/prisma";
import Header from "@/components/Header";
import CustomerReviewSubmission from "@/components/CustomerReviewSubmission";
import CustomerReviewsDisplay from "@/components/CustomerReviewsDisplay";

async function getApprovedCustomerReviews() {
  return await prisma.customerReview.findMany({
    where: { isApproved: true },
    orderBy: { createdAt: "desc" },
  });
}

export default async function CustomerReviewsPage() {
  const reviews = await getApprovedCustomerReviews();

  return (
    <>
      <Header />
      <main className="bg-background text-foreground min-h-screen py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          {/* Hero Section */}
          <section className="py-16 text-center">
            <h1 className="text-4xl md:text-2xl font-extrabold text-foreground mb-4 animate-fadeIn">
              What Our Customers Say
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Real stories from real adventurers. Join the conversation!
            </p>
          </section>

          {/* Reviews Section */}
          <section className="py-12">
            <CustomerReviewsDisplay reviews={reviews} />
          </section>

          {/* Submission Section */}
          <section className="py-12">
            <div className="rounded-2xl  p-8 md:p-12">
              <h2 className="text-3xl md:text-2xl font-bold text-foreground mb-6 text-center">
                Tell Us Your Story
              </h2>
              <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
                Share your safari experience with the world.
              </p>
              <CustomerReviewSubmission />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}