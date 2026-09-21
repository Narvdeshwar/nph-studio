import { Metadata } from 'next';
import { Footer } from '@/components/premium/Footer';
import { ServicesList } from '@/components/premium/ServicesList';
import { TextMask } from '@/components/premium/TextMask';

export const metadata: Metadata = {
  title: "Services & Pricing | NPH Studio",
  description: "Transparent pricing for full-stack product development. Explore our packages for Landing Pages, Full-Stack MVPs, and AI/RAG integrations.",
  alternates: {
    canonical: 'https://www.nph-studio.in/services',
  },
  openGraph: {
    url: 'https://www.nph-studio.in/services',
    title: 'Services & Pricing | NPH Studio',
    description: 'Explore premium engineering services: Landing Pages, MVPs, and RAG/AI Pipelines.',
  }
};

export default function ServicesPage() {
  return (
    <div className="relative bg-background text-foreground min-h-screen font-sans">
      

      {/* Services Page Header */}
      <section className="relative pt-[25vh] pb-[5vh] px-8 sm:px-20 text-center bg-background z-20">
        <h1 className="text-[12vw] sm:text-[8vw] font-bold leading-[0.85] tracking-tighter uppercase mb-6 flex flex-col items-center">
          <TextMask>Engineering</TextMask>
          <TextMask delay={0.1}>Capabilities</TextMask>
        </h1>
        <p className="text-muted text-xl max-w-2xl mx-auto uppercase tracking-widest font-medium">
          Transparent pricing for full-stack product development. No hidden fees.
        </p>
      </section>

      {/* Services Pricing/Tiers */}
      <ServicesList />

      <Footer />
    </div>
  );
}
