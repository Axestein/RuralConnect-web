// src/components/learning/VideoCard.tsx
import { Play, Download, BookOpen } from 'lucide-react';

interface VideoCardProps {
  title: string;
  description: string;
  duration: string;
  category: string;
  offlineAvailable: boolean;
}

export default function VideoCard({
  title,
  description,
  duration,
  category,
  offlineAvailable
}: VideoCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-gray-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-blue-600 text-white p-4 rounded-full">
            <Play className="h-8 w-8" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
          {duration}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{title}</h3>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {category}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        
        <div className="flex justify-between items-center">
          <button className="flex items-center text-blue-600 hover:text-blue-800">
            <Play className="h-4 w-4 mr-1" />
            Watch
          </button>
          
          {offlineAvailable ? (
            <button className="flex items-center text-green-600 hover:text-green-800">
              <Download className="h-4 w-4 mr-1" />
              Available Offline
            </button>
          ) : (
            <button className="flex items-center text-gray-600 hover:text-gray-800">
              <Download className="h-4 w-4 mr-1" />
              Download
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
