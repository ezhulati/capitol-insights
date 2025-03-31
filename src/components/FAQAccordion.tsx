import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { generateFAQStructuredData } from '../utils/structured-data';

export interface FAQItem {
  question: string;
  answer: React.ReactNode;
  id?: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
  description?: string;
  className?: string;
  includeSchema?: boolean; // Whether to include structured data
  itemClassName?: string;
}

/**
 * FAQ Accordion component with Schema.org structured data
 * 
 * This component renders an accessible FAQ accordion with proper 
 * schema.org structured data for enhanced search results.
 */
const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items,
  title,
  description,
  className = '',
  includeSchema = true,
  itemClassName = '',
}) => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setOpenItems(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  // Format items for structured data
  const faqSchemaItems = items.map(item => ({
    question: typeof item.question === 'string' ? item.question : 'FAQ Question',
    answer: typeof item.answer === 'string' 
      ? item.answer 
      : React.isValidElement(item.answer) 
        ? 'See website for answer' // Fallback for React elements
        : String(item.answer)
  }));

  // Generate unique IDs for items if not provided
  const itemsWithIds = items.map((item, index) => ({
    ...item,
    id: item.id || `faq-item-${index}`
  }));

  return (
    <div className={`faq-accordion ${className}`}>
      {includeSchema && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(generateFAQStructuredData(faqSchemaItems))}
          </script>
        </Helmet>
      )}

      {title && (
        <h2 className="text-2xl font-bold text-navy-800 mb-4">{title}</h2>
      )}
      
      {description && (
        <p className="text-slate-600 mb-8">{description}</p>
      )}

      <div className="space-y-4">
        {itemsWithIds.map((item) => (
          <div 
            key={item.id}
            className={`border border-slate-200 rounded-lg overflow-hidden ${itemClassName}`}
          >
            <button
              onClick={() => toggleItem(item.id!)}
              className="w-full flex justify-between items-center p-4 text-left bg-white hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2"
              aria-expanded={openItems[item.id!] || false}
              aria-controls={`faq-content-${item.id}`}
            >
              <span className="font-medium text-navy-800">{item.question}</span>
              <span className="ml-2 flex-shrink-0 text-gold-500">
                {openItems[item.id!] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </span>
            </button>
            
            <div
              id={`faq-content-${item.id}`}
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                openItems[item.id!] ? 'max-h-96' : 'max-h-0'
              }`}
              aria-hidden={!openItems[item.id!]}
            >
              <div className="p-4 pt-0 border-t border-slate-100 bg-white prose prose-sm max-w-none text-slate-600">
                {typeof item.answer === 'string' ? (
                  <p>{item.answer}</p>
                ) : (
                  item.answer
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQAccordion;
