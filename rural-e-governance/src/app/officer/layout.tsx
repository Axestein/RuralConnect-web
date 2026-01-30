// src/app/officer/layout.tsx
import type { Metadata } from 'next';
import OfficerHeader from '../../components/officer/OfficerHeader';

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
      {/* Officer Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-green-400" />
                <span className="font-bold">Officer Portal</span>
              </div>
              <p className="text-sm text-gray-400 mt-1">Rural Development Department</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400">
                © 2024 Rural e-Governance. Officer Access Only.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Version 1.0.0 • Last login: Today, 10:30 AM
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Add the Shield import at the top if not already there
import { Shield } from 'lucide-react';