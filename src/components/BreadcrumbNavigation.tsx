import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  path: string;
  isLast?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Breadcrumb Navigation Component
 * 
 * Displays a hierarchical navigation path showing the user's current location
 * within the website. This improves user experience and is good for SEO.
 * 
 * Usage:
 * ```
 * <BreadcrumbNavigation 
 *   items={[
 *     { name: 'Home', path: '/' },
 *     { name: 'Resources', path: '/resources' },
 *     { name: 'Legislative Guides', path: '/resources/guides', isLast: true }
 *   ]} 
 * />
 * ```
 */
const BreadcrumbNavigation: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  // Don't render if no items or only one item
  if (!items || items.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${className}`}>
      <ol className="flex flex-wrap items-center">
        {items.map((item, index) => {
          const isLast = item.isLast || index === items.length - 1;
          
          return (
            <li key={item.path} className="flex items-center">
              {isLast ? (
                <span 
                  aria-current="page"
                  className="text-navy-800 font-medium"
                >
                  {item.name}
                </span>
              ) : (
                <>
                  <Link 
                    to={item.path} 
                    className="text-slate-500 hover:text-gold-600 hover:underline"
                  >
                    {item.name}
                  </Link>
                  <ChevronRight size={14} className="mx-2 text-slate-400" aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;
