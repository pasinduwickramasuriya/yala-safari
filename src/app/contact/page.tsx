import prisma from "@/lib/prisma";
import ContactClient from "@/components/ContactClient"; // Import the Client Component

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Fetch data server-side
async function fetchData() {
  const heroSections = await prisma.heroSection.findMany();
  return { heroSections };
}

export default async function Contact() {
  const { heroSections } = await fetchData();

  return <ContactClient heroSections={heroSections} />;
}