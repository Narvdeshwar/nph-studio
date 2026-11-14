import { Metadata } from 'next';
import { WorkShowcase } from '@/components/premium/WorkShowcase';
import { Footer } from '@/components/premium/Footer';

export const metadata: Metadata = {
  title: 'Selected Works & Case Studies | NPH Studio',
  description:
    'Explore production-grade digital products, full-stack SaaS MVPs, and enterprise AI architectures engineered by NPH Studio.',
  alternates: {
    canonical: 'https://www.nph-studio.in/work',
  },
  openGraph: {
    url: 'https://www.nph-studio.in/work',
    title: 'Selected Works & Case Studies | NPH Studio',
    description:
      'Engineered for speed, reliability, and scale: Explore case studies across healthcare, AI engines, LMS platforms, and enterprise SaaS.',
  },
};

export default function WorkPage() {
  return (
    <div className="relative bg-[#FAF7F2] text-neutral-900 min-h-screen font-sans">
      <WorkShowcase />
      <Footer />
    </div>
  );
}
