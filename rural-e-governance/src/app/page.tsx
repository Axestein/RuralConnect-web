// src/app/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  ShieldCheck, 
  Building2,
  ArrowRight,
  Globe,
  Smartphone,
  BookOpen,
  MessageSquare
} from 'lucide-react';
import RoleCard from '@/components/common/RoleCard';

export default function Home() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roles = [
    {
      id: 'citizen',
      title: 'Citizen',
      description: 'File complaints, check schemes, access learning materials',
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
      features: [
        { icon: MessageSquare, text: 'AI Scheme Eligibility Checker' },
        { icon: Smartphone, text: 'Complaint Filing with Photos' },
        { icon: BookOpen, text: 'Learning Portal' },
      ]
    },
    {
      id: 'officer',
      title: 'Government Officer',
      description: 'Handle complaints, track progress, manage schemes',
      icon: ShieldCheck,
      color: 'bg-green-100 text-green-600',
      features: [
        { icon: MessageSquare, text: 'Complaint Management' },
        { icon: Building2, text: 'Scheme Administration' },
        { icon: Users, text: 'Citizen Support' },
      ]
    },
    {
      id: 'admin',
      title: 'Administrator',
      description: 'Manage users, monitor system, generate reports',
      icon: Building2,
      color: 'bg-purple-100 text-purple-600',
      features: [
        { icon: Users, text: 'User Management' },
        { icon: ShieldCheck, text: 'System Monitoring' },
        { icon: Globe, text: 'Analytics & Reports' },
      ]
    },
  ];

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    // Navigate to login with role parameter
    router.push(`/login?role=${roleId}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Rural e-Governance Portal
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Digital platform for rural development. File complaints, access government schemes, 
            learn new skills, and connect with opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              <span>Multilingual Support</span>
            </div>
            <div className="flex items-center">
              <Smartphone className="h-5 w-5 mr-2" />
              <span>Works Offline</span>
            </div>
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              <span>AI Assistant</span>
            </div>
          </div>
        </div>
      </div>

      {/* Role Selection */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Select Your Role
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose your role to access customized features and services
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {roles.map((role) => (
            <RoleCard
              key={role.id}
              {...role}
              isSelected={selectedRole === role.id}
              onClick={() => handleRoleSelect(role.id)}
            />
          ))}
        </div>

        {/* Features Preview */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-8">Platform Features</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h4 className="font-semibold mb-2">AI Eligibility Checker</h4>
              <p className="text-sm text-gray-600">Check government scheme eligibility instantly</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="bg-green-100 text-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-6 w-6" />
              </div>
              <h4 className="font-semibold mb-2">Complaint Portal</h4>
              <p className="text-sm text-gray-600">Report issues with photo evidence</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h4 className="font-semibold mb-2">Learning Hub</h4>
              <p className="text-sm text-gray-600">Educational content & AI tutor</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="bg-orange-100 text-orange-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h4 className="font-semibold mb-2">Job Portal</h4>
              <p className="text-sm text-gray-600">Government and private job listings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">© 2024 Rural e-Governance. All rights reserved.</p>
          <p className="text-gray-400 text-sm">Empowering rural communities through digital governance</p>
        </div>
      </footer>
    </div>
  );
}