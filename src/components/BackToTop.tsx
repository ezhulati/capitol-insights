import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * BackToTop component that shows a button to scroll back to the top of the page
 * when the user has scrolled down past a certain threshold.
 */
const BackToTop: React.FC = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate how far down the page the user has scrolled
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Only show button when user has scrolled down at least 60% of the viewport height
      // or when they've scrolled past 500px, whichever is smaller
      const scrollThreshold = Math.min(windowHeight * 0.6, 500);
      
      if (scrollTop > scrollThreshold) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check in case page is already scrolled
    handleScroll();
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {showButton && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-30 bg-navy-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-xl hover:bg-navy-600 transition-all duration-300"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </>
  );
};

export default BackToTop;
