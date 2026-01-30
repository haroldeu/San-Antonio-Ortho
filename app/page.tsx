import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { TeamPreview } from "@/components/sections/TeamPreview";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { ContactStrip } from "@/components/sections/ContactStrip";
import { getServices } from "@/lib/services";

export default async function HomePage() {
  const services = await getServices();

  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesGrid services={services} />
      <WhyChooseUs />
      <TeamPreview />
      <Testimonials />
      <FAQ />
      <ContactStrip />
    </>
  );
}
