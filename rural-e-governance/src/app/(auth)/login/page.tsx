// src/app/(auth)/login/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  Smartphone,
  User,
  ShieldCheck,
  Building2,
  Users
} from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'citizen';
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: role
  });

  const roleDetails = {
    citizen: {
      title: 'Citizen Login',
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
      description: 'Access complaint filing, schemes, and learning materials'
    },
    officer: {
      title: 'Officer Login',
      icon: ShieldCheck,
      color: 'bg-green-100 text-green-600',
      description: 'Manage complaints and government schemes'
    },
    admin: {
      title: 'Admin Login',
      icon: Building2,
      color: 'bg-purple-100 text-purple-600',
      description: 'System administration and monitoring'
    }
  };

  const currentRole = roleDetails[role as keyof typeof roleDetails] || roleDetails.citizen;
  const RoleIcon = currentRole.icon;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would validate and send to API
    console.log('Login attempt:', formData);
    
    // Redirect to respective dashboard
    switch(role) {
      case 'citizen':
        router.push('/citizen/dashboard');
        break;
      case 'officer':
        router.push('/officer/dashboard');
        break;
      case 'admin':
        router.push('/admin/dashboard');
        break;
      default:
        router.push('/citizen/dashboard');
    }
  };

  const handleRoleChange = (newRole: string) => {
    router.push(`/login?role=${newRole}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      {/* Role Selection Tabs */}
      <div className="flex border-b mb-8">
        {Object.entries(roleDetails).map(([key, details]) => {
          const Icon = details.icon;
          const isActive = role === key;
          return (
            <button
              key={key}
              onClick={() => handleRoleChange(key)}
              className={`flex-1 py-4 flex flex-col items-center transition-colors ${
                isActive 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium capitalize">{key}</span>
            </button>
          );
        })}
      </div>

      {/* Role Header */}
      <div className="text-center mb-8">
        <div className={`inline-flex p-3 rounded-full ${currentRole.color} mb-4`}>
          <RoleIcon className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {currentRole.title}
        </h1>
        <p className="text-gray-600">
          {currentRole.description}
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {role === 'citizen' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number (Optional)
            </label>
            <div className="relative">
              <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter mobile number"
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <Link
            href="/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Sign In
        </button>

        <div className="text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{' '}
            <Link
              href={`/register?role=${role}`}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Sign up here
            </Link>
          </p>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <User className="h-5 w-5 mr-2 text-gray-600" />
            <span className="text-sm">Aadhaar</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <ShieldCheck className="h-5 w-5 mr-2 text-gray-600" />
            <span className="text-sm">DigiLocker</span>
          </button>
        </div>
      </form>
    </div>
  );
}