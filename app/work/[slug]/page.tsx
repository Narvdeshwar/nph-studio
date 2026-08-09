import { notFound } from 'next/navigation';
import { getCaseStudyBySlug, caseStudies } from '@/data/case-studies';
import { CaseStudyTemplate } from '@/components/premium/CaseStudyTemplate';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const study = getCaseStudyBySlug(resolvedParams.slug);

  if (!study) {
    notFound();
  }

  return <CaseStudyTemplate study={study} />;
}
