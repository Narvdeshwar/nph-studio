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
  image?: string;
  metrics?: { label: string; value: string }[];
  techStack?: string[];
  features?: string[];
  results?: string[];
}

export const caseStudies: CaseStudyData[] = [
  {
    slug: 'care-well-hospital',
    title: 'Care Well Hospital',
    category: 'Healthcare Platform',
    overview: 'A modern, high-performance digital presence for Care Well Super Speciality Hospital. Built to enhance patient access to 24/7 emergency services, specialist care, and Ayushman Bharat Yojana scheme details.',
    problem: 'The hospital needed a fast, accessible, and highly reliable website to inform patients about critical emergency services, department specialities, and government health schemes like PMJAY.',
    solution: 'Designed and developed a blazing-fast, responsive web platform utilizing Next.js and Tailwind CSS. The site features intuitive navigation for booking consultations, accessing emergency contacts, and exploring medical departments.',
    color: '#DC2626', // Red
    bg: '#170b0b', // Dark red-tinted background
    link: 'https://care-well-hospital-six.vercel.app/',
    image: '', // No specific asset yet, UI will handle fallback
    metrics: [
      { label: 'Platform Uptime', value: '99.9%' },
      { label: 'Load Time', value: '< 1s' },
      { label: 'Accessibility', value: '100' }
    ],
    techStack: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    features: [
      'Emergency Contact Integration',
      'Department Discovery',
      'Government Scheme Information',
      'Responsive Medical UI',
      'Lightning Fast Routing'
    ],
    results: [
      'Successfully digitized patient information access.',
      'Improved emergency contact visibility for local residents.',
      'Established a premium online brand for the super speciality hospital.'
    ]
  },
  {
    slug: 'aibulletin',
    title: 'AIBulletin',
    category: 'AI News Platform',
    overview: 'A high-performance AI news aggregation platform tailored specifically for Indian developers and founders. AIBulletin processes hundreds of RSS feeds to deliver a noise-free, curated feed of the most critical AI developments.',
    problem: 'Founders needed a noise-free source for AI news. Existing platforms were cluttered with generic tech news, making it difficult to isolate high-value AI research and industry updates.',
    solution: 'Built a high-performance aggregation engine. Using Next.js and a custom RSS processing pipeline, we created a lightning-fast platform with structured data that immediately ranked on search engines.',
    color: '#8B5CF6',
    bg: '#1C132B',
    link: 'https://aibulletin.in/',
    image: '/work/aibulletin.webp',
    metrics: [
      { label: 'Total clicks', value: '419+' },
      { label: 'Total impressions', value: '70K' },
      { label: 'Avg Position', value: 'Top 10' }
    ],
    techStack: ['Next.js', 'Tailwind CSS', 'Supabase', 'Framer Motion', 'Golang', 'RSS Parser'],
    features: [
      'Automated RSS Aggregation Pipeline',
      'Advanced Content Filtering & Tagging',
      'High-performance Static Generation',
      'SEO-Optimized Structured Data',
      'Premium Dark Mode UI'
    ],
    results: [
      'Achieved 70K organic impressions and 419 clicks within the first few weeks.',
      'Secured a highly engaged audience of developers and founders.',
      'Reached an average search position of 8.9 across all queries.',
      'Zero-latency page loads via Next.js static generation.'
    ]
  },
  {
    slug: 'lms-platform',
    title: 'LMS Platform',
    category: 'EdTech Platform',
    overview: 'A lightweight, highly scalable Learning Management System designed for independent educators to host and monetize their courses without the bloat of traditional LMS solutions.',
    problem: 'Educators needed a fast, lightweight platform. Existing solutions like Teachable or Kajabi were too expensive and bloated with features independent creators did not need.',
    solution: 'Delivered a sleek, full-featured platform with high-definition video streaming. We built a custom course delivery platform optimized for fast video playback and seamless student progress tracking.',
    color: '#B87B38',
    bg: '#2A1A0B',
    link: 'https://courses.sachinnssharma.com/',
    image: '/work/edtech.webp',
    metrics: [
      { label: 'Active Students', value: '1000+' },
      { label: 'Success Rate', value: '100%' },
      { label: 'Expert Courses', value: '10+' }
    ],
    techStack: ['Next.js', 'PostgreSQL', 'Stripe', 'AWS S3', 'Mux Video'],
    features: [
      'HD Video Streaming Integration',
      'Automated Progress Tracking',
      'Secure Payment Processing',
      'Student Dashboard',
      'Creator Analytics'
    ],
    results: [
      'Launched a fully-featured platform in record time.',
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
