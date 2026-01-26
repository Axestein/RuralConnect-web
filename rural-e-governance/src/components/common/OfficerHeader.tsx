// src/components/officer/OfficerHeader.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  ClipboardCheck, 
  Users, 
  FileText,
  BarChart3,
  Bell,
  User,
  Shield,
  LogOut
} from 'lucide-react';
import { useState } from 'react';

export default function OfficerHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Dashboard', href: '/officer/dashboard', icon: Home },
    { name: 'Complaints', href: '/officer/complaints', icon: ClipboardCheck },
    { name: 'Citizens', href: '/officer/citizens', icon: Users },
    { name: 'Reports', href: '/officer/reports', icon: FileText },
    { name: 'Analytics', href: '/officer/analytics', icon: BarChart3 },
  ];

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/officer/dashboard" className="flex items-center space-x-2">
            <div className="bg-green-100 p-2 rounded-lg">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Rural e-Governance</h1>
              <p className="text-xs text-gray-600">Officer Portal</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-green-50 text-green-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <link.icon className="h-5 w-5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <button className="relative p-2">
              <Bell className="h-6 w-6 text-gray-600" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            
            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
              >
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-green-600" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">Vikram Singh</p>
                  <p className="text-xs text-gray-500">RDO Officer</p>
                </div>
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b">
                    <p className="font-medium">Vikram Singh</p>
                    <p className="text-sm text-gray-500">vikram@rural.gov</p>
                    <p className="text-xs text-green-600 font-medium">Officer ID: RDO-234</p>
                  </div>
                  <div className="p-2">
                    <Link
                      href="/officer/profile"
                      className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-100"
                    >
                      <User className="h-4 w-4" />
                      <span>Officer Profile</span>
                    </Link>
                    <Link
                      href="/"
                      className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="space-y-1">
                <div className="w-6 h-0.5 bg-gray-600"></div>
                <div className="w-6 h-0.5 bg-gray-600"></div>
                <div className="w-6 h-0.5 bg-gray-600"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                    pathname.startsWith(link.href)
                      ? 'bg-green-50 text-green-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <link.icon className="h-5 w-5" />
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}