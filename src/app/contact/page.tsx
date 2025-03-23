import prisma from "@/lib/prisma";
import ContactClient from "@/components/ContactClient"; // Import the Client Component

// Fetch data server-side
async function fetchData() {
  const heroSections = await prisma.heroSection.findMany();
  return { heroSections };
}

export default async function Contact() {
  const { heroSections } = await fetchData();

  return <ContactClient heroSections={heroSections} />;
}