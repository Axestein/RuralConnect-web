// src/components/citizen/CitizenFooter.tsx
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe,
  Shield,
  Heart
} from 'lucide-react';

export default function CitizenFooter() {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-6 w-6 text-blue-400" />
              <h3 className="text-lg font-bold">Rural e-Governance</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Empowering rural communities through digital governance and inclusive development.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Government Schemes</a></li>
              <li><a href="#" className="hover:text-white">Complaint Status</a></li>
              <li><a href="#" className="hover:text-white">Learning Materials</a></li>
              <li><a href="#" className="hover:text-white">Job Opportunities</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Complaint Filing</a></li>
              <li><a href="#" className="hover:text-white">Scheme Eligibility</a></li>
              <li><a href="#" className="hover:text-white">Digital Learning</a></li>
              <li><a href="#" className="hover:text-white">Document Services</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>Toll Free: 1800-XXX-XXXX</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>support@ruralgov.in</span>
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Rural Development Ministry, Delhi</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Rural e-Governance Portal. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Globe className="h-5 w-5" />
              </a>
              <p className="text-sm text-gray-400 flex items-center">
                <Heart className="h-4 w-4 mr-1 text-red-400" />
                Made for rural development
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            This platform is developed as part of the Digital India initiative.
          </p>
        </div>
      </div>
    </footer>
  );
}