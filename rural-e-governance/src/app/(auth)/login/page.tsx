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
  Users,
  Leaf,
  Flower,
  Landmark,
  Home as HomeIcon,
  Key,
  Fingerprint,
  Sprout,
  Palette
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
      title: 'नागरिक प्रवेश',
      subtitle: 'Citizen Login',
      icon: Users,
      bgColor: 'from-emerald-100 to-teal-50',
      borderColor: 'border-emerald-200',
      iconColor: 'text-emerald-600',
      description: 'सेवा याचिका, योजनाएँ, और शिक्षण सामग्री तक पहुँच'
    },
    officer: {
      title: 'अधिकारी प्रवेश',
      subtitle: 'Officer Login',
      icon: ShieldCheck,
      bgColor: 'from-blue-100 to-indigo-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600',
      description: 'शिकायत प्रबंधन और सरकारी योजनाएँ'
    },
    admin: {
      title: 'प्रशासक प्रवेश',
      subtitle: 'Admin Login',
      icon: Building2,
      bgColor: 'from-purple-100 to-violet-50',
      borderColor: 'border-purple-200',
      iconColor: 'text-purple-600',
      description: 'सिस्टम प्रशासन और निगरानी'
    }
  };

  const currentRole = roleDetails[role as keyof typeof roleDetails] || roleDetails.citizen;
  const RoleIcon = currentRole.icon;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50 relative overflow-hidden">
      {/* Heritage Background Patterns */}
      <div className="absolute inset-0 opacity-5">
        {/* Warli Art Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUwIDI1QzI1IDI1IDI1IDUwIDI1IDUwczAgMjUgMjUgMjUgMjUtMjUgMjUtMjVTNzUgMjUgNTAgMjV6IiBmaWxsPSJub25lIiBzdHJva2U9IiMxNjczMzAiIHN0cm9rZS13aWR0aD0iMSIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iMjUiIHI9IjIiIGZpbGw9IiMxNjczMzAiLz48Y2lyY2xlIGN4PSI3NSIgY3k9IjUwIiByPSIyIiBmaWxsPSIjMTY3MzMwIi8+PC9zdmc+')]"></div>
        {/* Madhubani Border Pattern */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAwIDIwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDEwIGMxMC00IDIwLTggMzAtMTAgczIwIDIgMzAgMTBjMTAgOCAyMCAxMiAzMCAxMCAxMCAyIDIwLTQgMzAtMTAgMTAtNiAyMC04IDMwLTEwIDEwLTIgMjAgMCAzMCA0IDEwIDQgMjAgMTAgMzAgMTQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzE2NzMzMCIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3N2Zz4=')]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAwIDIwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDEwIGMxMC02IDIwLTEwIDMwLTEwIDEwIDAgMjAgNCAzMCAxMCAxMCA2IDIwIDEwIDMwIDEwIDEwIDAgMjAtNCAzMC0xMCAxMC02IDIwLTEwIDMwLTEwIDEwIDAgMjAgNCAzMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMTY3MzMwIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvc3ZnPg==')]"></div>
      </div>

      {/* Traditional Indian Motifs */}
      <div className="absolute top-4 left-4 opacity-10">
        <Flower className="h-32 w-32 text-emerald-800" />
      </div>
      <div className="absolute bottom-4 right-4 opacity-10">
        <Palette className="h-32 w-32 text-amber-800" />
      </div>

      <div className="container mx-auto px-4 py-12 relative">
        {/* Header with Heritage Design */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-emerald-600 rounded-full blur-md opacity-50"></div>
              <div className="relative bg-gradient-to-br from-amber-100 to-emerald-50 p-3 rounded-full shadow-lg border border-amber-200">
                <Landmark className="h-8 w-8 text-emerald-700" />
              </div>
            </div>
            <div className="ml-4 text-left">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-emerald-800 bg-clip-text text-transparent">
                ग्राम ई-सेवा
              </h1>
              <p className="text-xs text-gray-600">Rural e-Governance Portal</p>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          {/* Login Container with Traditional Border */}
          <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border-2 border-amber-100">
            {/* Decorative Top Border - Traditional Rangoli Pattern */}
            <div className="h-2 bg-gradient-to-r from-amber-500 via-emerald-500 to-amber-500 relative">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMiIgdmlld0JveD0iMCAwIDIwIDIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxIiByPSIwLjUiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuNSIvPjwvc3ZnPg==')]"></div>
            </div>

            <div className="p-8">
              {/* Role Selection with Traditional Tabs */}
              <div className="flex mb-8 border-b-2 border-amber-100">
                {Object.entries(roleDetails).map(([key, details]) => {
                  const Icon = details.icon;
                  const isActive = role === key;
                  return (
                    <button
                      key={key}
                      onClick={() => handleRoleChange(key)}
                      className={`flex-1 py-4 flex flex-col items-center transition-all duration-300 relative ${
                        isActive 
                          ? `text-emerald-700 ${details.bgColor}` 
                          : 'text-gray-500 hover:text-gray-700 hover:bg-amber-50'
                      } rounded-t-lg`}
                    >
                      {isActive && (
                        <div className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-emerald-500"></div>
                      )}
                      <Icon className={`h-6 w-6 mb-2 ${isActive ? details.iconColor : 'text-gray-400'}`} />
                      <span className="text-sm font-medium capitalize">
                        {key === 'citizen' ? 'नागरिक' : key === 'officer' ? 'अधिकारी' : 'प्रशासक'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Role Header with Traditional Indian Design */}
              <div className="text-center mb-8 relative">
                <div className={`inline-flex p-4 rounded-2xl ${currentRole.bgColor} border ${currentRole.borderColor} shadow-lg mb-4 relative`}>
                  <div className="absolute -top-2 -right-2">
                    <Sprout className="h-4 w-4 text-emerald-500" />
                  </div>
                  <RoleIcon className={`h-10 w-10 ${currentRole.iconColor}`} />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1 font-serif">
                  {currentRole.title}
                </h1>
                <p className="text-sm text-emerald-700 font-medium mb-2">
                  {currentRole.subtitle}
                </p>
                <p className="text-gray-600 text-sm">
                  {currentRole.description}
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-serif">
                    <span className="text-emerald-700">ईमेल पता</span>
                    <span className="text-gray-500 ml-2">/ Email Address</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <Mail className="h-5 w-5 text-amber-500 group-focus-within:text-emerald-600 transition-colors" />
                    </div>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-amber-50/50 transition-all duration-300"
                      placeholder="अपना ईमेल दर्ज करें / Enter your email"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-serif">
                    <span className="text-emerald-700">पासवर्ड</span>
                    <span className="text-gray-500 ml-2">/ Password</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <Key className="h-5 w-5 text-amber-500 group-focus-within:text-emerald-600 transition-colors" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full pl-10 pr-12 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-amber-50/50 transition-all duration-300"
                      placeholder="अपना पासवर्ड दर्ज करें / Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg hover:bg-amber-100 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-amber-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-amber-600" />
                      )}
                    </button>
                  </div>
                </div>

                {role === 'citizen' && (
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-serif">
                      <span className="text-emerald-700">मोबाइल नंबर (वैकल्पिक)</span>
                      <span className="text-gray-500 ml-2">/ Mobile Number (Optional)</span>
                    </label>
                    <div className="relative group">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <Smartphone className="h-5 w-5 text-amber-500 group-focus-within:text-emerald-600 transition-colors" />
                      </div>
                      <input
                        type="tel"
                        className="w-full pl-10 pr-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-amber-50/50 transition-all duration-300"
                        placeholder="मोबाइल नंबर दर्ज करें / Enter mobile number"
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only"
                      />
                      <div className="w-5 h-5 border border-amber-300 rounded-md bg-amber-50 group-hover:bg-amber-100 transition-colors flex items-center justify-center">
                        <div className="hidden group-has-[:checked]:block w-3 h-3 bg-emerald-600 rounded-sm"></div>
                      </div>
                    </div>
                    <span className="ml-2 text-sm text-gray-600 font-serif">
                      मुझे याद रखें / Remember me
                    </span>
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-emerald-600 hover:text-emerald-800 font-serif transition-colors"
                  >
                    पासवर्ड भूल गए? / Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative font-serif text-lg">
                    प्रवेश करें / Sign In
                  </span>
                </button>

                <div className="text-center">
                  <p className="text-gray-600 text-sm font-serif">
                    खाता नहीं है?{' '}
                    <Link
                      href={`/register?role=${role}`}
                      className="text-emerald-600 hover:text-emerald-800 font-medium transition-colors"
                    >
                      यहाँ पंजीकरण करें / Sign up here
                    </Link>
                  </p>
                </div>

                {/* Traditional Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-amber-200"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 bg-white text-amber-600 text-sm font-serif">
                      या इसके साथ जारी रखें / Or continue with
                    </span>
                  </div>
                </div>

                {/* Indian Digital Identity Options */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="flex items-center justify-center py-3.5 border border-amber-200 rounded-xl hover:bg-amber-50 transition-all duration-300 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center">
                      <div className="p-1.5 bg-blue-100 rounded-lg mr-3">
                        <Fingerprint className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-700 font-serif">आधार / Aadhaar</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center py-3.5 border border-amber-200 rounded-xl hover:bg-amber-50 transition-all duration-300 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center">
                      <div className="p-1.5 bg-green-100 rounded-lg mr-3">
                        <ShieldCheck className="h-5 w-5 text-green-600" />
                      </div>
                      <span className="font-medium text-gray-700 font-serif">डिजी लॉकर / DigiLocker</span>
                    </div>
                  </button>
                </div>

                {/* Security Note */}
                <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-emerald-50 rounded-xl border border-amber-100">
                  <div className="flex items-center">
                    <ShieldCheck className="h-5 w-5 text-emerald-600 mr-2 flex-shrink-0" />
                    <p className="text-xs text-gray-600 font-serif">
                      <span className="font-medium text-emerald-700">सुरक्षा नोट: </span>
                      आपका डेटा सुरक्षित है। हम भारतीय डिजिटल गोपनीयता नीतियों का कड़ाई से पालन करते हैं।
                      <br />
                      <span className="font-medium text-emerald-700">Security Note: </span>
                      Your data is secure. We strictly adhere to Indian digital privacy policies.
                    </p>
                  </div>
                </div>
              </form>
            </div>

            {/* Decorative Bottom Border */}
            <div className="h-4 bg-gradient-to-r from-amber-500 via-emerald-500 to-amber-500 opacity-20"></div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500 font-serif">
              🇮🇳 एक डिजिटल भारत पहल / A Digital India Initiative
            </p>
            <p className="text-xs text-gray-400 mt-2">
              ग्रामीण विकास मंत्रालय / Ministry of Rural Development
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}