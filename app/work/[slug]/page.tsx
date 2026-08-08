import { notFound } from 'next/navigation';
import { getCaseStudyBySlug, caseStudies } from '@/data/case-studies';
import { CaseStudyTemplate } from '@/components/premium/CaseStudyTemplate';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = getCaseStudyBySlug(params.slug);

  if (!study) {
    notFound();
  }

  return <CaseStudyTemplate study={study} />;
}
