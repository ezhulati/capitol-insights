import React from 'react';

const SkipToContent = () => {
  return (
    <a
      href="#main-content"
      className="fixed z-50 opacity-0 focus:opacity-100 bg-navy-900 text-white px-4 py-2 rounded-br-lg transition-opacity duration-200 -translate-y-full focus:translate-y-0 left-0 top-0"
    >
      Skip to main content
    </a>
  );
};

export default SkipToContent;