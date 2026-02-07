// src/components/common/RoleCard.tsx
'use client';

import { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  text: string;
}

interface RoleCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  textColor: string;
  iconColor: string;
  features: Feature[];
  isSelected: boolean;
  onClick: () => void;
}

export default function RoleCard({
  title,
  description,
  icon: Icon,
  color,
  textColor,
  iconColor,
  features,
  isSelected,
  onClick,
}: RoleCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        group relative p-6 rounded-2xl cursor-pointer transition-all duration-300
        ${color} border-2 hover:border-emerald-300
        ${isSelected ? 'border-emerald-400 shadow-2xl scale-[1.02]' : 'border-transparent shadow-lg hover:shadow-2xl'}
        hover:-translate-y-1
      `}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative">
        {/* Icon */}
        <div className={`
          inline-flex p-3 rounded-xl bg-white shadow-md mb-4
          ${isSelected ? 'ring-2 ring-emerald-400' : ''}
        `}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        
        {/* Title */}
        <h3 className={`text-xl font-bold mb-2 ${textColor}`}>
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 mb-6 text-sm">
          {description}
        </p>
        
        {/* Features */}
        <div className="space-y-3 mb-6">
          {features.map((feature, index) => {
            const FeatureIcon = feature.icon;
            return (
              <div key={index} className="flex items-center space-x-2">
                <div className="p-1 bg-white rounded-md shadow-sm">
                  <FeatureIcon className="h-3 w-3 text-gray-500" />
                </div>
                <span className="text-sm text-gray-700">{feature.text}</span>
              </div>
            );
          })}
        </div>
        
        {/* CTA Button */}
        <button className={`
          w-full py-3 px-4 rounded-xl font-medium text-sm
          flex items-center justify-center space-x-2 transition-all duration-300
          ${isSelected 
            ? 'bg-emerald-600 text-white shadow-md' 
            : 'bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-700'
          }
        `}>
          <span>Continue as {title}</span>
          <ArrowRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
        </button>
      </div>
    </div>
  );
}