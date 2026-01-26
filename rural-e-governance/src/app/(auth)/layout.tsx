// src/app/(auth)/layout.tsx
import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/"
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <Link
            href="/"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <Home className="h-5 w-5 mr-2" />
            Rural e-Governance
          </Link>
        </div>
        
        <div className="max-w-md mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}