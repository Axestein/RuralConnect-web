// types/complaint.ts
export interface Complaint {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  title: string;
  description: string;
  category: 'pothole' | 'sanitation' | 'water' | 'electricity' | 'road' | 'drainage' | 'street-light' | 'other';
  location: {
    address: string;
    lat: number;
    lng: number;
    village: string;
    district: string;
  };
  images: string[]; // Base64 or URLs
  status: 'pending' | 'in-progress' | 'resolved' | 'rejected';
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string;
  assignedOfficer?: string;
  estimatedResolutionDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  updates: ComplaintUpdate[];
}

export interface ComplaintUpdate {
  id: string;
  message: string;
  status: string;
  updatedBy: string;
  createdAt: Date;
}

export type ComplaintStatus = 'pending' | 'in-progress' | 'resolved' | 'rejected';