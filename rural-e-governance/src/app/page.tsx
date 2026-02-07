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
  MessageSquare,
  Leaf,
  Briefcase,
  Home as HomeIcon,
  FileText,
  CheckCircle,
  TrendingUp,
  Award
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
      color: 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100',
      textColor: 'text-emerald-700',
      iconColor: 'text-emerald-600',
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
      color: 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100',
      textColor: 'text-blue-700',
      iconColor: 'text-blue-600',
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
      color: 'bg-gradient-to-br from-purple-50 to-violet-50 border-purple-100',
      textColor: 'text-purple-700',
      iconColor: 'text-purple-600',
      features: [
        { icon: Users, text: 'User Management' },
        { icon: ShieldCheck, text: 'System Monitoring' },
        { icon: Globe, text: 'Analytics & Reports' },
      ]
    },
  ];

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    router.push(`/login?role=${roleId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-25 to-gray-50">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-lg shadow-md">
                <HomeIcon className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-teal-800 bg-clip-text text-transparent">
                  Grama e-Seva
                </h1>
                <p className="text-xs text-gray-500">Rural Governance Portal</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full font-medium">
                🇮🇳 Digital India Initiative
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900 via-teal-800 to-emerald-900">
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMiAwIDYuNjI4IDUuMzczIDEyIDEyIDEyIDYuNjI4IDAgMTItNS4zNzIgMTItMTIgMC02LjYyNy01LjM3Mi0xMi0xMi0xMnptLTEyIDQ0Yy02LjYyNyAwLTEyIDUuMzczLTEyIDEyaDYwYzAtNi42MjctNS4zNzMtMTItMTItMTJ6IiBmaWxsPSIjRkZGIiBvcGFjaXR5PSIwLjEiLz48L2c+PC9zdmc+')]"></div>
        </div>
        
        <div className="relative container mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
            <Leaf className="h-4 w-4 text-emerald-200 mr-2" />
            <span className="text-emerald-100 text-sm">Empowering Rural India</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="text-white">Digital Governance</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
              For Every Village
            </span>
          </h1>
          
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto mb-10 leading-relaxed">
            Bridging the digital divide with accessible e-governance solutions.
            Empowering rural communities through transparent, efficient, and citizen-centric services.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <Globe className="h-5 w-5 text-emerald-200 mr-2" />
              <span className="text-white">12+ Regional Languages</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <Smartphone className="h-5 w-5 text-emerald-200 mr-2" />
              <span className="text-white">Offline-First Design</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <Award className="h-5 w-5 text-emerald-200 mr-2" />
              <span className="text-white">Secure & Verified</span>
            </div>
          </div>
          
          <div className="animate-bounce">
            <ArrowRight className="h-8 w-8 text-white mx-auto rotate-90" />
          </div>
        </div>
      </div>

      {/* Role Selection */}
      <div className="container mx-auto px-6 py-20 -mt-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl mb-6 shadow-md">
              <Users className="h-8 w-8 text-emerald-700" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Access <span className="text-emerald-700">Digital Services</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Select your role to access personalized governance services designed for rural empowerment
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
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-br from-emerald-900 to-teal-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">50K+</div>
              <p className="text-emerald-200">Villages Served</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">1.2M+</div>
              <p className="text-emerald-200">Schemes Processed</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">98%</div>
              <p className="text-emerald-200">Resolution Rate</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <p className="text-emerald-200">Service Available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Transforming Rural <span className="text-emerald-700">Governance</span>
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive digital solutions designed for rural India's unique needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: MessageSquare,
              title: 'AI Eligibility Checker',
              description: 'Instant verification for government schemes',
              color: 'from-blue-500 to-cyan-500'
            },
            {
              icon: FileText,
              title: 'Digital Applications',
              description: 'Paperless applications for all services',
              color: 'from-emerald-500 to-teal-500'
            },
            {
              icon: Briefcase,
              title: 'Job Portal',
              description: 'Government and local employment opportunities',
              color: 'from-amber-500 to-orange-500'
            },
            {
              icon: TrendingUp,
              title: 'Progress Tracking',
              description: 'Real-time status updates on all requests',
              color: 'from-purple-500 to-pink-500'
            }
          ].map((feature, index) => (
            <div key={index} className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1">
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4 shadow-md`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                {feature.title}
              </h4>
              <p className="text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="mt-16 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-emerald-600 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Transparent Process</h4>
              <p className="text-sm text-gray-600">End-to-end tracking of all applications</p>
            </div>
            <div className="text-center">
              <ShieldCheck className="h-8 w-8 text-emerald-600 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Secure Platform</h4>
              <p className="text-sm text-gray-600">Aadhaar verified secure transactions</p>
            </div>
            <div className="text-center">
              <BookOpen className="h-8 w-8 text-emerald-600 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Digital Literacy</h4>
              <p className="text-sm text-gray-600">Training materials in local languages</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
                  <Globe className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Grama e-Seva</h3>
                  <p className="text-sm text-gray-400">Rural e-Governance Portal</p>
                </div>
              </div>
              <p className="text-gray-400 max-w-md">
                Empowering rural communities through transparent, accessible, and efficient digital governance.
              </p>
            </div>
            
            <div className="text-center md:text-right">
              <div className="flex items-center justify-center md:justify-end space-x-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <span className="font-bold">🇮🇳</span>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Digital India Initiative</p>
                  <p className="text-gray-400">Ministry of Rural Development</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                © 2024 Rural e-Governance Portal. All rights reserved.
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
            <p>A collaborative initiative towards inclusive digital governance for rural India</p>
          </div>
        </div>
      </footer>
    </div>
  );
}