export interface CaseStudyData {
  slug: string;
  title: string;
  category: string;
  overview: string;
  problem: string;
  solution: string;
  color: string;
  bg: string;
  link?: string;
  metrics?: { label: string; value: string }[];
  techStack?: string[];
  features?: string[];
  results?: string[];
}

export const caseStudies: CaseStudyData[] = [
  {
    slug: 'aibulletin',
    title: 'AIBulletin',
    category: 'AI News Platform',
    overview: 'A high-performance AI news aggregation platform tailored specifically for Indian developers and founders. AIBulletin processes hundreds of RSS feeds to deliver a noise-free, curated feed of the most critical AI developments.',
    problem: 'Founders needed a noise-free source for AI news. Existing platforms were cluttered with generic tech news, making it difficult to isolate high-value AI research and industry updates.',
    solution: 'Built a high-performance aggregation engine. Using Next.js and a custom RSS processing pipeline, we created a lightning-fast platform with structured data that immediately ranked on search engines.',
    color: '#FF5A36',
    bg: '#1A0F0D',
    link: 'http://aibulletin.in/',
    metrics: [
      { label: 'Total clicks', value: '392' },
      { label: 'Total impressions', value: '63.6K' }
    ],
    techStack: ['Next.js', 'Tailwind CSS', 'Supabase', 'Framer Motion', 'RSS Parser'],
    features: [
      'Automated RSS Aggregation Pipeline',
      'Advanced Content Filtering & Tagging',
      'High-performance Static Generation',
      'SEO-Optimized Structured Data',
      'Premium Dark Mode UI'
    ],
    results: [
      'Achieved 63.6K organic impressions within the first few weeks.',
      'Secured a highly engaged audience of developers and founders.',
      'Zero-latency page loads via Next.js static generation.'
    ]
  },
  {
    slug: 'lms-platform',
    title: 'LMS Platform',
    category: 'EdTech MVP',
    overview: 'A lightweight, highly scalable Learning Management System designed for independent educators to host and monetize their courses without the bloat of traditional LMS solutions.',
    problem: 'Educators needed a fast, lightweight platform. Existing solutions like Teachable or Kajabi were too expensive and bloated with features independent creators did not need.',
    solution: 'Delivered a sleek MVP with video streaming. We built a custom course delivery platform optimized for fast video playback and seamless student progress tracking.',
    color: '#3B82F6',
    bg: '#0D1522',
    techStack: ['Next.js', 'PostgreSQL', 'Stripe', 'AWS S3', 'Mux Video'],
    features: [
      'HD Video Streaming Integration',
      'Automated Progress Tracking',
      'Secure Payment Processing',
      'Student Dashboard',
      'Creator Analytics'
    ],
    results: [
      'Launched MVP in under 4 weeks.',
      'Reduced platform costs for creators by 70% compared to legacy solutions.',
      'Achieved 99.9% video playback reliability.'
    ]
  },
  {
    slug: 'bi-dashboard',
    title: 'BI Dashboard',
    category: 'Business Intelligence Tool',
    overview: 'A bespoke Business Intelligence dashboard that unifies fragmented company data into a single, real-time pane of glass for executive decision-making.',
    problem: 'Executives were drowning in fragmented data. Key metrics were scattered across Stripe, Google Analytics, and internal databases, requiring hours of manual compilation.',
    solution: 'Built a unified dashboard with custom charting. We aggregated API data sources into a beautiful, performant dashboard featuring complex data visualizations.',
    color: '#10B981',
    bg: '#0A1A14',
    techStack: ['React', 'Recharts', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    features: [
      'Real-time Data Syncing',
      'Custom Interactive Charts',
      'Role-based Access Control',
      'Automated PDF Reports',
      'Data Export Capabilities'
    ],
    results: [
      'Saved the executive team 15+ hours per week in manual reporting.',
      'Identified a 12% revenue leak through unified data visibility.',
      'Achieved sub-second query times on millions of data points.'
    ]
  }
];

export function getCaseStudyBySlug(slug: string): CaseStudyData | undefined {
  return caseStudies.find(study => study.slug === slug);
}
