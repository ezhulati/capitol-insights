// Script to update resource images on the resources page
// Version 5.0 - Safari-compatible image replacement approach
(function() {
    // Detect Safari browser
    function isSafari() {
        const ua = navigator.userAgent.toLowerCase();
        return ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1 && ua.indexOf('android') === -1;
    }
    
    // Log browser detection
    const isSafariBrowser = isSafari();
    console.log('Resource image updater running in', isSafariBrowser ? 'Safari' : 'non-Safari browser');
    
    // Function to safely execute code with error handling
    function safeExecute(fn, fallbackFn) {
        try {
            return fn();
        } catch (error) {
            console.error('Error in resource image updater:', error);
            if (fallbackFn) {
                try {
                    return fallbackFn();
                } catch (fallbackError) {
                    console.error('Error in fallback function:', fallbackError);
                }
            }
        }
    }
    
    // Function to safely add styles
    function addStyles() {
        safeExecute(function() {
            // Add a style tag to ensure images are displayed correctly
            const styleTag = document.createElement('style');
            styleTag.textContent = `
                .resource-card img, .resource-item img, [class*="resource"] img {
                    object-fit: contain !important;
                    width: 100% !important;
                    height: auto !important;
                    min-height: 200px !important;
                    max-width: 100% !important;
                }
                .image-container, .rounded-t-xl, [class*="rounded-t"] {
                    height: auto !important;
                    min-height: 200px !important;
                    overflow: visible !important;
                }
                /* Safari-specific fixes */
                @supports (-webkit-hyphens:none) {
                    .resource-card, .resource-item, [class*="resource"] {
                        overflow: visible !important;
                    }
                    .resource-card img, .resource-item img, [class*="resource"] img {
                        position: relative !important;
                        display: block !important;
                    }
                }
            `;
            document.head.appendChild(styleTag);
            console.log('Resource image styles added');
        });
    }
    
    // Function to safely clear cache
    function clearCache() {
        safeExecute(function() {
            if ('caches' in window) {
                caches.keys().then(function(cacheNames) {
                    cacheNames.forEach(function(cacheName) {
                        caches.delete(cacheName);
                    });
                }).catch(function(error) {
                    console.warn('Error clearing caches:', error);
                });
            }
        });
    }
    
    // Function to update resource images
    function updateResourceImages() {
        safeExecute(function() {
            // Check if we're on the resources page
            const isResourcesPage = window.location.pathname.includes('/resources') || 
                                   document.title.toLowerCase().includes('resource') ||
                                   document.querySelector('[class*="resource"]');
            
            if (!isResourcesPage) {
                return;
            }
            
            console.log('Resource image updater running on resources page');
            
            // Add special class to all resource cards for easier targeting
            document.querySelectorAll('.bg-white, [class*="card"], [class*="resource"]').forEach(function(card) {
                card.classList.add('resource-card');
            });
            
            // Direct approach: Find all images on the page and check their parent elements
            const allImages = document.querySelectorAll('img');
            console.log('Found', allImages.length, 'images on the page');
            
            let updatedImages = 0;
            
            // Process each image
            allImages.forEach(function(img) {
                safeExecute(function() {
                    // Get the parent card element
                    let card = null;
                    
                    // Safari-friendly way to find parent card
                    let parent = img.parentElement;
                    while (parent && !card) {
                        if (parent.classList && 
                            (parent.classList.contains('bg-white') || 
                             parent.classList.contains('resource-card') || 
                             parent.className.includes('card') || 
                             parent.className.includes('resource'))) {
                            card = parent;
                        }
                        parent = parent.parentElement;
                    }
                    
                    // Fallback to direct parent if no card found
                    if (!card) {
                        card = img.parentElement;
                    }
                    
                    if (!card) {
                        return;
                    }
                    
                    // Try to find the title element
                    const titleElements = card.querySelectorAll('h3, h2, [class*="title"]');
                    let titleElement = null;
                    
                    for (let i = 0; i < titleElements.length; i++) {
                        if (titleElements[i].textContent.trim()) {
                            titleElement = titleElements[i];
                            break;
                        }
                    }
                    
                    if (!titleElement) {
                        return;
                    }
                    
                    const title = titleElement.textContent.trim();
                    
                    // Handle Texas Legislative Calendar 2025
                    if (title.includes('Legislative Calendar') || title.includes('Calendar 2025')) {
                        console.log('Updating Texas Legislative Calendar 2025 image');
                        
                        // Create a new image to replace the existing one
                        const newImg = new Image();
                        newImg.onload = function() {
                            // Only replace after the new image has loaded
                            img.src = newImg.src;
                            img.alt = 'Texas Legislative Calendar 2025';
                            
                            // Apply styles directly
                            img.style.objectFit = 'contain';
                            img.style.width = '100%';
                            img.style.height = 'auto';
                            img.style.minHeight = '200px';
                            img.style.maxWidth = '100%';
                            img.style.display = 'block';
                            
                            // For Safari, ensure the image is visible
                            if (isSafariBrowser) {
                                img.style.position = 'relative';
                            }
                            
                            updatedImages++;
                        };
                        
                        // Set source after defining onload handler
                        newImg.src = 'https://res.cloudinary.com/dwnmuolg8/image/upload/v1743313784/33727E2E-27C9-44FD-BA77-4C5F3CFD7F4A_oia0si.png';
                        
                        // Find the image container and adjust its height if needed
                        const imageContainer = img.parentElement;
                        if (imageContainer) {
                            imageContainer.style.height = 'auto';
                            imageContainer.style.minHeight = '200px';
                            imageContainer.style.overflow = 'visible';
                        }
                    } 
                    // Handle Texas Legislative Advocacy Guide
                    else if (title.includes('Advocacy Guide') || title.includes('Legislative Advocacy')) {
                        console.log('Updating Texas Legislative Advocacy Guide image');
                        
                        // Create a new image to replace the existing one
                        const newImg = new Image();
                        newImg.onload = function() {
                            // Only replace after the new image has loaded
                            img.src = newImg.src;
                            img.alt = 'Texas Legislative Advocacy Guide';
                            
                            // Apply styles directly
                            img.style.objectFit = 'contain';
                            img.style.width = '100%';
                            img.style.height = 'auto';
                            img.style.minHeight = '200px';
                            img.style.maxWidth = '100%';
                            img.style.display = 'block';
                            
                            // For Safari, ensure the image is visible
                            if (isSafariBrowser) {
                                img.style.position = 'relative';
                            }
                            
                            updatedImages++;
                        };
                        
                        // Set source after defining onload handler
                        newImg.src = 'https://res.cloudinary.com/dwnmuolg8/image/upload/v1743461383/Image_Mar_31_2025_05_47_12_PM_vwvuxs.png';
                        
                        // Find the image container and adjust its height if needed
                        const imageContainer = img.parentElement;
                        if (imageContainer) {
                            imageContainer.style.height = 'auto';
                            imageContainer.style.minHeight = '200px';
                            imageContainer.style.overflow = 'visible';
                        }
                        
                        // Update the date if needed
                        safeExecute(function() {
                            const dateLabels = card.querySelectorAll('.text-xs, [class*="date"]');
                            for (let i = 0; i < dateLabels.length; i++) {
                                const dateLabel = dateLabels[i];
                                if (dateLabel && dateLabel.textContent.trim() !== 'December 14, 2024') {
                                    dateLabel.textContent = 'December 14, 2024';
                                }
                            }
                        });
                    }
                });
            });
            
            // Safari-specific fallback: If no images were updated, try a more direct approach
            if (updatedImages === 0 && isSafariBrowser) {
                console.log('No images updated, trying Safari-specific fallback');
                
                // Find all potential resource cards
                const resourceCards = document.querySelectorAll('.bg-white, [class*="card"], [class*="resource"]');
                
                resourceCards.forEach(function(card) {
                    safeExecute(function() {
                        // Try to find the title element
                        const titleElements = card.querySelectorAll('h3, h2, [class*="title"]');
                        let titleElement = null;
                        
                        for (let i = 0; i < titleElements.length; i++) {
                            if (titleElements[i].textContent.trim()) {
                                titleElement = titleElements[i];
                                break;
                            }
                        }
                        
                        if (!titleElement) {
                            return;
                        }
                        
                        const title = titleElement.textContent.trim();
                        
                        // Handle Texas Legislative Calendar 2025
                        if (title.includes('Legislative Calendar') || title.includes('Calendar 2025')) {
                            // Create a new image element
                            const newImg = document.createElement('img');
                            newImg.src = 'https://res.cloudinary.com/dwnmuolg8/image/upload/v1743313784/33727E2E-27C9-44FD-BA77-4C5F3CFD7F4A_oia0si.png';
                            newImg.alt = 'Texas Legislative Calendar 2025';
                            newImg.style.objectFit = 'contain';
                            newImg.style.width = '100%';
                            newImg.style.height = 'auto';
                            newImg.style.minHeight = '200px';
                            newImg.style.maxWidth = '100%';
                            newImg.style.display = 'block';
                            newImg.style.position = 'relative';
                            
                            // Find existing image or a suitable container
                            const existingImg = card.querySelector('img');
                            if (existingImg) {
                                existingImg.parentNode.replaceChild(newImg, existingImg);
                            } else {
                                // Find a suitable container for the image
                                const imageContainer = card.querySelector('.rounded-t-xl, .bg-blue-100, .overflow-hidden') || 
                                                      card.firstElementChild;
                                
                                if (imageContainer) {
                                    // Add the image to the container
                                    imageContainer.prepend(newImg);
                                } else {
                                    // If no container found, add the image to the card itself
                                    card.prepend(newImg);
                                }
                            }
                        } 
                        // Handle Texas Legislative Advocacy Guide
                        else if (title.includes('Advocacy Guide') || title.includes('Legislative Advocacy')) {
                            // Create a new image element
                            const newImg = document.createElement('img');
                            newImg.src = 'https://res.cloudinary.com/dwnmuolg8/image/upload/v1743461383/Image_Mar_31_2025_05_47_12_PM_vwvuxs.png';
                            newImg.alt = 'Texas Legislative Advocacy Guide';
                            newImg.style.objectFit = 'contain';
                            newImg.style.width = '100%';
                            newImg.style.height = 'auto';
                            newImg.style.minHeight = '200px';
                            newImg.style.maxWidth = '100%';
                            newImg.style.display = 'block';
                            newImg.style.position = 'relative';
                            
                            // Find existing image or a suitable container
                            const existingImg = card.querySelector('img');
                            if (existingImg) {
                                existingImg.parentNode.replaceChild(newImg, existingImg);
                            } else {
                                // Find a suitable container for the image
                                const imageContainer = card.querySelector('.rounded-t-xl, .bg-blue-100, .overflow-hidden') || 
                                                      card.firstElementChild;
                                
                                if (imageContainer) {
                                    // Add the image to the container
                                    imageContainer.prepend(newImg);
                                } else {
                                    // If no container found, add the image to the card itself
                                    card.prepend(newImg);
                                }
                            }
                            
                            // Update the date if needed
                            safeExecute(function() {
                                const dateLabels = card.querySelectorAll('.text-xs, [class*="date"]');
                                for (let i = 0; i < dateLabels.length; i++) {
                                    const dateLabel = dateLabels[i];
                                    if (dateLabel && dateLabel.textContent.trim() !== 'December 14, 2024') {
                                        dateLabel.textContent = 'December 14, 2024';
                                    }
                                }
                            });
                        }
                    });
                });
            }
            
            console.log('Resource image update complete');
        });
    }
    
    // Function to initialize the script
    function initialize() {
        // Add styles first
        addStyles();
        
        // Clear cache (safely)
        clearCache();
        
        // Run the update function immediately
        updateResourceImages();
        
        // Set up URL change detection for SPAs
        safeExecute(function() {
            let lastUrl = location.href;
            
            // Use a more reliable method for Safari
            if (isSafariBrowser) {
                // Check URL periodically
                setInterval(function() {
                    const url = location.href;
                    if (url !== lastUrl) {
                        lastUrl = url;
                        updateResourceImages();
                    }
                }, 500);
            } else {
                // Use MutationObserver for other browsers
                new MutationObserver(function() {
                    const url = location.href;
                    if (url !== lastUrl) {
                        lastUrl = url;
                        updateResourceImages();
                    }
                }).observe(document, {subtree: true, childList: true});
            }
        });
        
        // Run multiple times to ensure images are updated
        setTimeout(updateResourceImages, 500);
        setTimeout(updateResourceImages, 1000);
        setTimeout(updateResourceImages, 2000);
        
        // For Safari, add extra attempts
        if (isSafariBrowser) {
            setTimeout(updateResourceImages, 3000);
            setTimeout(updateResourceImages, 5000);
        }
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        // Document already loaded, run immediately
        initialize();
    }
    
    // Also run on window load to ensure all resources are loaded
    window.addEventListener('load', updateResourceImages);
})();
