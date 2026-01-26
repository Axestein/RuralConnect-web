
// Learning Portal Page
// src/app/citizen/learning/page.tsx
import VideoCard from '@/components/learning/VideoCard';
import TutorChat from '@/components/learning/TutorChat';
import { BookOpen } from 'lucide-react';

export default function LearningPage() {
  const videos = [
    {
      id: 1,
      title: 'Basic Digital Literacy',
      description: 'Learn how to use smartphones and basic apps',
      duration: '15:30',
      category: 'Digital',
      offlineAvailable: true
    },
    {
      id: 2,
      title: 'Organic Farming Techniques',
      description: 'Modern organic farming methods for better yield',
      duration: '22:45',
      category: 'Agriculture',
      offlineAvailable: true
    },
    {
      id: 3,
      title: 'Financial Literacy',
      description: 'Understanding banking, loans, and investments',
      duration: '18:20',
      category: 'Finance',
      offlineAvailable: false
    },
    {
      id: 4,
      title: 'Health and Hygiene',
      description: 'Basic healthcare practices for rural areas',
      duration: '12:15',
      category: 'Health',
      offlineAvailable: true
    }
  ];

  const documents = [
    { name: 'MNREGA Guidelines PDF', size: '2.4 MB' },
    { name: 'PM-Kisan Application Form', size: '1.1 MB' },
    { name: 'Soil Health Card Guide', size: '3.2 MB' },
    { name: 'Ayushman Bharat Benefits', size: '1.8 MB' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Portal</h1>
        <p className="text-gray-600">AI Tutor & Offline Learning Materials</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Video Lessons</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {videos.map((video) => (
                <VideoCard key={video.id} {...video} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Downloadable Documents</h2>
            <div className="bg-white rounded-lg shadow-md p-4">
              <ul className="space-y-3">
                {documents.map((doc, index) => (
                  <li key={index} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded">
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 text-blue-600 mr-3" />
                      <span>{doc.name}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">{doc.size}</span>
                      <button className="text-blue-600 hover:text-blue-800">
                        Download
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div>
          <TutorChat />
        </div>
      </div>
    </div>
  );
}