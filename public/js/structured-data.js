// Load the structured data for the site
(function() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Capitol Insights",
    "description": "Capitol Insights delivers ethical effective government relations services throughout Texas transforming policy challenges into strategic advantages for organizations.",
    "image": "https://images.unsplash.com/photo-1585468274952-66591eb14165?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630",
    "url": "https://capitol-insights.com",
    "telephone": "214-213-3443",
    "location": [
      {
        "@type": "Place",
        "name": "Capitol Insights Austin Office",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "1005 Congress Ave Suite 800",
          "addressLocality": "Austin",
          "addressRegion": "TX",
          "postalCode": "78701",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "30.2712",
          "longitude": "-97.7403"
        }
      },
      {
        "@type": "Place",
        "name": "Capitol Insights Dallas Office",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "P.O. Box 195892",
          "addressLocality": "Dallas",
          "addressRegion": "TX",
          "postalCode": "75219",
          "addressCountry": "US"
        }
      }
    ],
    "areaServed": {
      "@type": "State",
      "name": "Texas"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "17:00"
    },
    "sameAs": [
      "https://twitter.com/capitolinsights",
      "https://linkedin.com/company/capitol-insights"
    ]
  };

  // Create and inject the structured data
  function injectStructuredData() {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }

  // Execute when the DOM is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectStructuredData);
  } else {
    injectStructuredData();
  }
})();
