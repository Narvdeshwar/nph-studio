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
  clientOutcome?: string;
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
    overview: 'Modern emergency healthcare platform with 24/7 care access and PMJAY integration.',
    problem: 'The super speciality hospital needed an ultra-reliable digital presence to connect critical trauma patients with 24/7 emergency lines and government health schemes.',
    solution: 'Engineered a sub-second Next.js SSR architecture with high-accessibility emergency UI, doctor directories, and instant appointment routing.',
    color: '#DC2626', // Red
    bg: '#170b0b', // Dark red-tinted background
    link: 'https://care-well-hospital-six.vercel.app/',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1600&auto=format&fit=crop',
    clientOutcome: 'Client Outcome: < 1.0s Page Load',
    metrics: [
      { label: 'PAGE LOAD', value: '< 1.0s' },
      { label: 'UPTIME', value: '99.9%' },
      { label: 'ACCESSIBILITY', value: '100 / 100' }
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
    overview: 'A high-performance AI news aggregation platform tailored specifically for Indian developers and founders.',
    problem: 'Founders needed a signal-dense, noise-free source for AI news without generic tech news clutter or sponsored clickbait.',
    solution: 'Built a high-performance aggregation engine with automated RSS processing pipeline and Next.js static generation.',
    color: '#8B5CF6',
    bg: '#1C132B',
    link: 'https://aibulletin.in/',
    image: '/aibulletin.png',
    clientOutcome: 'Client Outcome: 71.7K Google Impressions',
    metrics: [
      { label: 'TOTAL IMPRESSIONS', value: '71.7K' },
      { label: 'ACTIVE USERS', value: '1.2K' },
      { label: 'AVG POSITION', value: '9.2' }
    ],
    techStack: ['Next.js', 'Tailwind CSS', 'Supabase', 'Framer Motion', 'Golang'],
    features: [
      'Automated RSS Aggregation Pipeline',
      'Advanced Content Filtering & Tagging',
      'High-performance Static Generation',
      'SEO-Optimized Structured Data',
      'Custom Admin Subscriber Dashboard'
    ],
    results: [
      'Achieved 71.7K organic search impressions and 443 clicks on Google Search.',
      'Grew to 1.2K active users and 1.9K sessions with high engagement.',
      'Built a fully functional custom admin portal for seamless newsletter subscriber management.'
    ]
  },
  {
    slug: 'lms-platform',
    title: 'SSS Online Academy',
    category: 'EdTech Streaming Platform',
    overview: 'A lightweight, highly scalable Learning Management Platform engineered for independent educators to stream and monetize course content globally.',
    problem: 'The client faced crippling platform subscription fees and sluggish video playback on legacy platforms (Teachable/Kajabi), resulting in student churn.',
    solution: 'Engineered a bespoke video learning platform using Next.js, Mux Video streaming, and Stripe integration with sub-second lesson load times.',
    color: '#B87B38',
    bg: '#2A1A0B',
    link: 'https://courses.sachinnssharma.com/',
    image: '/work/edtech.webp',
    clientOutcome: 'Client Outcome: < 250ms Video Latency',
    metrics: [
      { label: 'ACTIVE STUDENTS', value: '1,000+' },
      { label: 'SUCCESS RATE', value: '100%' },
      { label: 'VIDEO LATENCY', value: '< 250ms' }
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
    overview: 'A bespoke Business Intelligence dashboard that unifies fragmented company data into a single, real-time pane of glass.',
    problem: 'Executives were drowning in fragmented data scattered across Stripe, Google Analytics, and internal databases, requiring hours of manual compilation.',
    solution: 'Built a unified dashboard aggregating real-time API data sources into performant, reactive interactive data visualizations.',
    color: '#10B981',
    bg: '#0A1A14',
    link: 'https://nph-studio.in/work/bi-dashboard',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
    clientOutcome: 'Client Outcome: 15h Saved Per Week',
    metrics: [
      { label: 'TIME SAVED', value: '15h/wk' },
      { label: 'REVENUE LEAK', value: '12% Saved' },
      { label: 'QUERY SPEED', value: '< 100ms' }
    ],
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
  },
  {
    slug: 'jspark',
    title: 'JSpark AI',
    category: 'Generative AI Platform',
    overview: 'An advanced AI-powered platform designed to accelerate productivity through intelligent automation and generative models.',
    problem: 'Enterprise teams needed automated AI workflows connected directly to their private data lakes without security risks or model hallucination.',
    solution: 'Designed and shipped a low-latency enterprise RAG platform with isolated vector clusters, structured JSON outputs, and guardrails.',
    color: '#06B6D4',
    bg: '#0B1324',
    link: 'https://jspark.ai/',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1600&auto=format&fit=crop',
    clientOutcome: 'Client Outcome: 380ms LLM Query Latency',
    metrics: [
      { label: 'VECTOR RETRIEVAL', value: '100K Chunks' },
      { label: 'RESPONSE LATENCY', value: '380ms' },
      { label: 'ACCURACY SCORE', value: '99.4%' }
    ],
    techStack: ['Next.js', 'Python', 'FastAPI', 'Pinecone', 'OpenAI'],
    features: [
      'Generative AI Integration',
      'Real-time Data Processing',
      'High-Performance UI',
      'Seamless User Authentication',
      'Responsive Design'
    ],
    results: [
      'Cut enterprise document search and synthesis time from hours to seconds.',
      'Zero hallucinations via strict reciprocal rank fusion retrieval.'
    ]
  },
  {
    slug: 'jspark-prime',
    title: 'JSpark Prime',
    category: 'Enterprise SaaS',
    overview: 'High-density mission-critical data visualization and B2B workflow intelligence platform.',
    problem: 'Enterprise clients required a scalable, secure, and highly available environment with elevated rate limits and dedicated capabilities.',
    solution: 'Architected an enterprise-grade SaaS architecture with enhanced security, role-based access, and optimized backend processing.',
    color: '#3B82F6',
    bg: '#1C190F',
    link: 'https://jsparkprime.com/',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600&auto=format&fit=crop',
    clientOutcome: 'Client Outcome: 99.99% Enterprise SLA',
    metrics: [
      { label: 'UPTIME SLA', value: '99.99%' },
      { label: 'DATA REFRESH', value: '< 50ms' },
      { label: 'SCALE LIMIT', value: '10M Events' }
    ],
    techStack: ['Next.js', 'PostgreSQL', 'Stripe Integration', 'Enterprise Auth'],
    features: [
      'Enterprise Tier Access',
      'Advanced API Limits',
      'Custom Analytics Dashboard',
      'Priority Processing',
      'Secure Data Handling'
    ],
    results: [
      'Delivered guaranteed 99.99% enterprise service uptime.',
      'Unified enterprise user operations under single dashboard.'
    ]
  },
  {
    slug: 'ssslux',
    title: 'SSSLux Luxury',
    category: 'Luxury E-Commerce & 3D',
    overview: 'A world-class luxury digital commerce platform with immersive WebGL 3D product previews and headless checkout.',
    problem: 'High-end luxury brands struggle to convey tactile craftsmanship through flat 2D photography, leading to buyer hesitation.',
    solution: 'Engineered an immersive, WebGL-enhanced frontend with buttery smooth animations, deep aesthetic contrast, and ultra-premium typography.',
    color: '#EC4899',
    bg: '#14130F',
    link: 'https://ssslux.vercel.app/',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop',
    clientOutcome: 'Client Outcome: 60 FPS WebGL Inspection',
    metrics: [
      { label: '3D CONFIGURATOR', value: '60 FPS' },
      { label: 'CHECKOUT HOPS', value: '1-Click' },
      { label: 'MOBILE SCORE', value: '100%' }
    ],
    techStack: ['Next.js', 'Three.js', 'Shopify API', 'Tailwind CSS'],
    features: [
      'Cinematic Animations',
      'Premium Typography',
      'Immersive Scrolling',
      'High-End UI/UX',
      'Interactive 3D Preview'
    ],
    results: [
      'Increased user engagement by 3.2x through interactive 3D product exploration.',
      'Eliminated checkout friction with headless Shopify API architecture.'
    ]
  }
];

export function getCaseStudyBySlug(slug: string): CaseStudyData | undefined {
  return caseStudies.find(study => study.slug === slug);
}
