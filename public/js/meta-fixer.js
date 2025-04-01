// Meta tags fixer with CSP nonce compliance
(function() {
  // Get the nonce from the window object (set by index.html)
  const nonce = window.__CSP_NONCE__ || '';
  
  // Get the page type from the URL
  const path = window.location.pathname;
  
  // Define meta descriptions for different pages - fixed paths with proper key detection
  const metaMap = {
    "home": {
      path: "/",
      title: "Capitol Insights | Strategic Texas Government Relations & Lobbying",
      description: "When legislation threatens your business, will you be introducing yourself to lawmakers or activating relationships you've already built? 40+ years of legislative success."
    },
    "services": {
      path: "/services",
      title: "Texas Government Relations Services | Legislative Advocacy & Lobbying",
      description: "Our government relations services have secured $32M in appropriations and achieved 22% reduction in compliance costs through strategic advocacy and expert policy analysis."
    },
    "team": {
      path: "/team",
      title: "Meet Our Texas Government Relations Team | Capitol Insights",
      description: "Our team brings 40+ years of experience in Texas politics with established relationships with key legislators, officials, and agency heads throughout the state."
    },
    "approach": {
      path: "/approach",
      title: "Strategic Government Relations Approach | Texas Lobbying Firm",
      description: "Our 4-step government relations methodology has secured an 85% success rate across 20+ legislative sessions by building relationships before they're needed."
    },
    "results": {
      path: "/results",
      title: "Government Relations Success Stories & Case Studies | Capitol Insights",
      description: "Explore how our strategic government relations approach has delivered measurable results including $32M in appropriations and 85% success rate across 200+ initiatives."
    },
    "contact": {
      path: "/contact",
      title: "Contact Capitol Insights | Texas Government Relations Experts",
      description: "Schedule a consultation with our government relations team to discuss your legislative needs and discover how we can help navigate Texas politics for your organization."
    },
    "updates": {
      path: "/updates",
      title: "Texas Legislative Updates & Policy Insights | Capitol Insights",
      description: "Stay informed with expert analysis of Texas legislative developments, regulatory changes, and policy trends that may impact your organization."
    }
  };

  // Function to log meta data (only in development mode)
  function logDebug(message) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[MetaFixer] ${message}`);
    }
  }
  
  // Get page entry
  let pageData = null;
  // Direct path match
  for (const key in metaMap) {
    if (metaMap[key].path === path) {
      pageData = metaMap[key];
      logDebug(`Found exact path match for: ${path}`);
      break;
    }
  }
  
  // Homepage fallback for root
  if (!pageData && (path === "/" || path === "")) {
    pageData = metaMap.home;
    logDebug("Using homepage data for root path");
  }
  
  // Default fallback
  if (!pageData) {
    pageData = metaMap.home;
    logDebug(`No match found for path: ${path} - using homepage data as fallback`);
  }
  
  // Function to ensure a meta tag exists with the correct content
  function ensureMetaTag(name, content) {
    let meta = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
    
    if (!meta) {
      meta = document.createElement('meta');
      if (name.startsWith('og:')) {
        meta.setAttribute('property', name);
      } else {
        meta.setAttribute('name', name);
      }
      document.head.appendChild(meta);
    }
    
    meta.setAttribute('content', content);
    return meta;
  }
  
  // Update document title and meta tags
  function updateMetaTags() {
    document.title = pageData.title;
    
    ensureMetaTag('description', pageData.description);
    ensureMetaTag('og:title', pageData.title);
    ensureMetaTag('og:description', pageData.description);
    ensureMetaTag('twitter:title', pageData.title);
    ensureMetaTag('twitter:description', pageData.description);
  }
  
  // Initial update
  updateMetaTags();
  
  // Use MutationObserver to watch for changes to head and re-apply if needed
  const observer = new MutationObserver(function(mutations) {
    let needsUpdate = false;
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        // Check if our meta tags were removed
        if (!document.querySelector('meta[name="description"]') || 
            !document.querySelector('meta[property="og:description"]')) {
          needsUpdate = true;
        }
      }
    });
    
    if (needsUpdate) {
      updateMetaTags();
    }
    
    // Also update document title if it changed
    if (document.title !== pageData.title) {
      document.title = pageData.title;
    }
  });
  
  // Start observing the head for changes
  observer.observe(document.head, { childList: true, subtree: true });
})();
