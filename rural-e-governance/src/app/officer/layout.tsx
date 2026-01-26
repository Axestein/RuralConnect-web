// src/app/officer/layout.tsx
import type { Metadata } from 'next';
import OfficerHeader from '@/components/officer/OfficerHeader';

export const metadata: Metadata = {
  title: 'Officer Dashboard - Rural e-Governance',
  description: 'Government officer portal for rural e-governance',
};

export default function OfficerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <OfficerHeader />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}