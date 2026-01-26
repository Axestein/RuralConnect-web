// // src/app/citizen/layout.tsx
// import Header from '@/components/common/Header';
// import Footer from '@/components/common/Footer';
// import OfflineIndicator from '@/components/common/OfflineIndicator';

// export default function CitizenLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <>
//       <Header />
//       <OfflineIndicator />
//       <main className="container mx-auto px-4 py-8">
//         {children}
//       </main>
//       <Footer />
//     </>
//   );
// }

// src/app/citizen/layout.tsx
import type { Metadata } from 'next';
import CitizenHeader from '@/components/citizen/CitizenHeader';
import CitizenFooter from '@/components/citizen/CitizenFooter';

export const metadata: Metadata = {
  title: 'Citizen Dashboard - Rural e-Governance',
  description: 'Citizen portal for rural e-governance services',
};

export default function CitizenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <CitizenHeader />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <CitizenFooter />
    </div>
  );
}