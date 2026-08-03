import type { Metadata } from 'next';
import EngineeringShell from '@/components/engineering/EngineeringShell';
import '../../styles/engineering.css';

export const metadata: Metadata = {
  title: { default: 'Engineering', template: '%s · Engineering' },
  description: 'A configuration-backed record of Sampreet Patil’s homelab, development environment, infrastructure, uses, and architectural decisions.',
  alternates: { canonical: '/engineering' },
  openGraph: { title: 'Engineering · Sampreet Patil', description: 'Homelab architecture, service operations, development practice, uses, and decisions.', url: '/engineering', type: 'website' },
  twitter: { card: 'summary_large_image', title: 'Engineering · Sampreet Patil', description: 'Configuration-backed engineering field notes.' },
};

export default function EngineeringLayout({ children }: { children: React.ReactNode }) { return <EngineeringShell>{children}</EngineeringShell>; }
