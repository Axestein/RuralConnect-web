// src/components/complaints/ComplaintDetailModal.tsx
'use client';

import { X, Camera, MapPin, User, Phone, Calendar, AlertCircle } from 'lucide-react';
import { Complaint } from '@/types/complaint';

interface ComplaintDetailModalProps {
  complaint: Complaint;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (status: string) => void;
}

export default function ComplaintDetailModal({
  complaint,
  isOpen,
  onClose,
  onStatusChange
}: ComplaintDetailModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Complaint Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{complaint.title}</h3>
              <div className="flex items-center space-x-2 mt-2">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  complaint.priority === 'high' ? 'bg-red-100 text-red-800' :
                  complaint.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {complaint.priority.toUpperCase()}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  complaint.status === 'resolved' ? 'bg-green-100 text-green-800' :
                  complaint.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  complaint.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {complaint.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Images Grid */}
          {complaint.images.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <Camera className="h-5 w-5 text-gray-600 mr-2" />
                <h4 className="font-medium">Photos ({complaint.images.length})</h4>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {complaint.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Evidence ${idx + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Description</h4>
                <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                  {complaint.description}
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Location Details</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-gray-600">{complaint.location.address}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-gray-600">
                      {complaint.location.village}, {complaint.location.district}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Complainant Details</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-gray-600">{complaint.userName}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-gray-600">{complaint.userPhone}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-gray-600">
                      Reported: {new Date(complaint.createdAt).toLocaleString()}
                    </span>
                  </div>
                  {complaint.updatedAt && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-gray-600">
                        Updated: {new Date(complaint.updatedAt).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Update */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Update Status</h4>
                <div className="grid grid-cols-2 gap-2">
                  {['pending', 'in-progress', 'resolved', 'rejected'].map((status) => (
                    <button
                      key={status}
                      onClick={() => onStatusChange(status)}
                      disabled={complaint.status === status}
                      className={`px-4 py-2 rounded-lg text-sm ${
                        complaint.status === status
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add Note */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Add Note</h4>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Add update note for citizen..."
                />
                <button className="mt-2 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Close
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}