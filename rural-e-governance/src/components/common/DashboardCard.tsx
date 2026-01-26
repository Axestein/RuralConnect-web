// src/components/common/DashboardCard.tsx
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color: string;
}

export default function DashboardCard({
  title,
  description,
  icon: Icon,
  href,
  color
}: DashboardCardProps) {
  return (
    <Link
      href={href}
      className="block bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-200"
    >
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-900 mb-2">
            {title}
          </h3>
          <p className="text-gray-600 text-sm">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}