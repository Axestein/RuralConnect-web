// src/app/citizen/complaints/new/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Camera,
  MapPin,
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react';
import ImageCapture from '@/components/complaints/ImageCapture';

export default function NewComplaintPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [location, setLocation] = useState<{
    address: string;
    lat: number;
    lng: number;
    village: string;
    district: string;
  } | null>(null);
  const [images, setImages] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'pothole' as const,
    priority: 'medium' as const,
    userPhone: '',
    village: '',
    district: ''
  });

  const categories = [
    { value: 'pothole', label: 'Pothole/Road Damage', icon: '🛣️' },
    { value: 'sanitation', label: 'Sanitation/Garbage', icon: '🗑️' },
    { value: 'water', label: 'Water Supply', icon: '💧' },
    { value: 'electricity', label: 'Electricity Issue', icon: '⚡' },
    { value: 'drainage', label: 'Drainage Blockage', icon: '🚰' },
    { value: 'street-light', label: 'Street Light', icon: '💡' },
    { value: 'other', label: 'Other', icon: '❓' },
  ];

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsSubmitting(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Reverse geocoding using OpenStreetMap
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
          
          const address = data.display_name || 'Unknown location';
          const village = data.address?.village || data.address?.town || 'Unknown';
          const district = data.address?.county || data.address?.state_district || 'Unknown';
          
          setLocation({
            address,
            lat: latitude,
            lng: longitude,
            village,
            district
          });

          setFormData(prev => ({
            ...prev,
            village,
            district
          }));
          
        } catch (error) {
          console.error('Geocoding error:', error);
          alert('Could not fetch location details. Please enter manually.');
          
          setLocation({
            address: 'Location captured',
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            village: '',
            district: ''
          });
        } finally {
          setIsSubmitting(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert('Unable to get your location. Please enable location services.');
        setIsSubmitting(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!location) {
      alert('Please capture your location');
      return;
    }

    if (images.length === 0) {
      alert('Please add at least one photo of the issue');
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock API call - replace with actual API
      const complaintData = {
        ...formData,
        location,
        images,
        status: 'pending',
        createdAt: new Date().toISOString(),
        id: `CMP${Date.now()}`,
        userName: 'Rajesh Kumar', // In real app, get from auth
        userId: 'user123'
      };

      // Save to localStorage for demo
      const existingComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
      localStorage.setItem('complaints', JSON.stringify([...existingComplaints, complaintData]));

      // Also save to officer view
      const officerComplaints = JSON.parse(localStorage.getItem('officerComplaints') || '[]');
      localStorage.setItem('officerComplaints', JSON.stringify([...officerComplaints, complaintData]));

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      alert('Complaint submitted successfully!');
      router.push('/citizen/dashboard');
      
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit complaint. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
              1
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium">Details</p>
            </div>
          </div>
          <div className="w-12 h-1 bg-gray-300"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
              2
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium">Photos</p>
            </div>
          </div>
          <div className="w-12 h-1 bg-gray-300"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              3
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium">Location</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Report an Issue</h1>
        <p className="text-gray-600 mb-6">
          Help improve your village by reporting infrastructure issues
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Complaint Details */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-blue-600" />
              Issue Details
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issue Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Large pothole on main road"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe the issue in detail. Include measurements if possible."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setFormData({...formData, category: cat.value as any})}
                      className={`p-3 border rounded-lg text-left transition-colors ${
                        formData.category === cat.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-xl mr-2">{cat.icon}</span>
                        <span className="text-sm">{cat.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority *
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'high', label: 'High - Immediate danger', color: 'bg-red-100 text-red-800' },
                    { value: 'medium', label: 'Medium - Needs attention', color: 'bg-yellow-100 text-yellow-800' },
                    { value: 'low', label: 'Low - Minor issue', color: 'bg-green-100 text-green-800' },
                  ].map((priority) => (
                    <label key={priority.value} className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg cursor-pointer">
                      <input
                        type="radio"
                        name="priority"
                        value={priority.value}
                        checked={formData.priority === priority.value}
                        onChange={(e) => setFormData({...formData, priority: e.target.value as any})}
                        className="text-blue-600"
                      />
                      <div>
                        <span className={`text-xs px-2 py-1 rounded-full ${priority.color}`}>
                          {priority.value.toUpperCase()}
                        </span>
                        <p className="text-sm text-gray-600 mt-1">{priority.label}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Photo Upload */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Camera className="h-5 w-5 mr-2 text-blue-600" />
              Add Photos
            </h2>
            <p className="text-gray-600 text-sm">
              Clear photos help us understand and resolve issues faster. Capture from different angles.
            </p>
            <ImageCapture onImagesChange={setImages} maxImages={5} />
          </div>

          {/* Step 3: Location */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-blue-600" />
              Location Details
            </h2>

            <div>
              <button
                type="button"
                onClick={getLocation}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                ) : (
                  <MapPin className="h-5 w-5 mr-2" />
                )}
                {location ? 'Update Location' : 'Capture Current Location'}
              </button>
            </div>

            {location && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Location Captured</p>
                    <p className="text-sm text-gray-600 mt-1">{location.address}</p>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <label className="text-xs text-gray-500">Village/Town</label>
                        <input
                          type="text"
                          value={formData.village}
                          onChange={(e) => setFormData({...formData, village: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="Enter village name"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">District</label>
                        <input
                          type="text"
                          value={formData.district}
                          onChange={(e) => setFormData({...formData, district: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="Enter district"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Contact Number *
              </label>
              <input
                type="tel"
                required
                value={formData.userPhone}
                onChange={(e) => setFormData({...formData, userPhone: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter 10-digit mobile number"
                maxLength={10}
              />
              <p className="text-xs text-gray-500 mt-2">
                This will be used for status updates
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t">
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !location || images.length === 0}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  'Submit Complaint'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}