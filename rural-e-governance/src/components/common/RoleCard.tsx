// src/components/common/RoleCard.tsx
import { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

interface RoleCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  features: Array<{
    icon: LucideIcon;
    text: string;
  }>;
  isSelected: boolean;
  onClick: () => void;
}

export default function RoleCard({
  title,
  description,
  icon: Icon,
  color,
  features,
  isSelected,
  onClick
}: RoleCardProps) {
  return (
    <div
      className={`relative bg-white rounded-xl shadow-lg p-6 border-2 transition-all duration-300 hover:shadow-xl cursor-pointer ${
        isSelected ? 'border-blue-500' : 'border-transparent'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-lg ${color}`}>
            <Icon className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            <p className="text-gray-600 text-sm mt-1">{description}</p>
          </div>
        </div>
        <ArrowRight className={`h-5 w-5 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} />
      </div>

      <div className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-3">
            <feature.icon className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">{feature.text}</span>
          </div>
        ))}
      </div>

      <button
        className={`w-full py-3 rounded-lg font-medium transition-colors ${
          isSelected
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Continue as {title}
      </button>
    </div>
  );
}