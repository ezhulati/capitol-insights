// Script to update resource images on the resources page
// Version 3.0 - No caching, immediate execution, improved selectors
document.addEventListener('DOMContentLoaded', function() {
    // Clear any cached versions of the page
    if ('caches' in window) {
        caches.keys().then(function(cacheNames) {
            cacheNames.forEach(function(cacheName) {
                caches.delete(cacheName);
            });
        });
    }

    // Add a style tag to ensure images are displayed correctly
    const styleTag = document.createElement('style');
    styleTag.textContent = `
        .resource-card img {
            object-fit: contain !important;
            width: 100% !important;
            height: auto !important;
            min-height: 200px !important;
        }
        .resource-card .image-container {
            height: auto !important;
            min-height: 200px !important;
        }
    `;
    document.head.appendChild(styleTag);
    
    // Function to update resource images
    function updateResourceImages() {
        // Check if we're on the resources page
        if (window.location.pathname.includes('/resources')) {
            console.log('Resource image updater script running on resources page');
            
            // Add resource-card class to all cards for styling
            document.querySelectorAll('.bg-white.rounded-xl.overflow-hidden.shadow-md.border.border-slate-100').forEach(function(card) {
                card.classList.add('resource-card');
            });
            
            // Find all resource cards in the Featured Resources section - use multiple selectors for robustness
            const resourceCards = document.querySelectorAll('.resource-card, .bg-white.rounded-xl.overflow-hidden, [data-testid="resource-card"]');
            console.log('Found', resourceCards.length, 'resource cards');
            
            resourceCards.forEach(function(card) {
                // Get the title element
                const titleElement = card.querySelector('h3.text-xl.font-bold.text-navy-900, h3.text-lg.font-bold.text-navy-900');
                if (!titleElement) {
                    console.log('No title element found in card');
                    return;
                }
                
                const title = titleElement.textContent.trim();
                console.log('Found resource card with title:', title);
                
                // Handle Texas Legislative Calendar 2025
                if (title === 'Texas Legislative Calendar 2025' || title.includes('Legislative Calendar')) {
                    console.log('Updating Texas Legislative Calendar 2025 image');
                    
                    // Get the image element
                    let imgElement = card.querySelector('img');
                    
                    // If no image element exists, create one
                    if (!imgElement) {
                        console.log('No image element found, creating one');
                        imgElement = document.createElement('img');
                        imgElement.alt = 'Texas Legislative Calendar 2025';
                        
                        // Find a suitable container for the image
                        const imageContainer = card.querySelector('.rounded-t-xl, .bg-blue-100, .overflow-hidden') || card.firstElementChild;
                        
                        if (imageContainer) {
                            // Add the image to the container
                            imageContainer.appendChild(imgElement);
                        } else {
                            // If no container found, add the image to the card itself
                            card.prepend(imgElement);
                        }
                    }
                    
                    // Set the image source
                    imgElement.src = 'https://res.cloudinary.com/dwnmuolg8/image/upload/v1743313784/33727E2E-27C9-44FD-BA77-4C5F3CFD7F4A_oia0si.png';
                    
                    // Adjust image styling to ensure full image is visible
                    imgElement.style.objectFit = 'contain';
                    imgElement.style.width = '100%';
                    imgElement.style.height = 'auto';
                    imgElement.style.minHeight = '200px';
                    
                    // Find the image container and adjust its height if needed
                    const imageContainer = imgElement.parentElement;
                    if (imageContainer) {
                        imageContainer.style.height = 'auto';
                        imageContainer.style.minHeight = '200px';
                    }
                    
                    // Store this card as a reference for other cards
                    window.calendarCard = card;
                } 
                // Handle Texas Legislative Advocacy Guide
                else if (title.includes('Texas Legislative Advocacy Guide') || title.includes('Advocacy Guide')) {
                    console.log('Processing Texas Legislative Advocacy Guide card');
                    
                    // Get the image element
                    let imgElement = card.querySelector('img');
                    
                    // If no image element exists, create one
                    if (!imgElement) {
                        console.log('No image element found, creating one');
                        imgElement = document.createElement('img');
                        imgElement.alt = 'Texas Legislative Advocacy Guide';
                        
                        // Find a suitable container for the image
                        const imageContainer = card.querySelector('.rounded-t-xl, .bg-blue-100, .overflow-hidden') || card.firstElementChild;
                        
                        if (imageContainer) {
                            // Add the image to the container
                            imageContainer.appendChild(imgElement);
                        } else {
                            // If no container found, add the image to the card itself
                            card.prepend(imgElement);
                        }
                    }
                    
                    // Set the image source
                    imgElement.src = 'https://res.cloudinary.com/dwnmuolg8/image/upload/v1743461383/Image_Mar_31_2025_05_47_12_PM_vwvuxs.png';
                    
                    // Adjust image styling to ensure full image is visible
                    imgElement.style.objectFit = 'contain';
                    imgElement.style.width = '100%';
                    imgElement.style.height = 'auto';
                    imgElement.style.minHeight = '200px';
                    
                    // Find the image container and adjust its height if needed
                    const imageContainer = imgElement.parentElement;
                    if (imageContainer) {
                        imageContainer.style.height = 'auto';
                        imageContainer.style.minHeight = '200px';
                    }
                    
                    // Update the date if needed
                    const dateLabel = card.querySelector('.text-xs.font-medium.text-blue-600.bg-blue-50.rounded-full.px-2.py-1');
                    if (dateLabel && dateLabel.textContent.trim() !== 'December 14, 2024') {
                        dateLabel.textContent = 'December 14, 2024';
                    }
                }
            });
            
            // Also update images in the All Resources section
            const allResourceCards = document.querySelectorAll('.bg-white.rounded-lg.border.border-slate-100.shadow-sm');
            
            allResourceCards.forEach(function(card) {
                // Get the title element
                const titleElement = card.querySelector('h3.text-lg.font-bold.text-navy-900');
                if (!titleElement) return;
                
                const title = titleElement.textContent.trim();
                
                // These cards don't have images, but if they did, we would update them here
                // This is for future-proofing in case the design changes
            });
            
            console.log('Resource image update complete');
        }
    }
    
    // Run the update function immediately
    updateResourceImages();
    
    // Also run when the URL changes (for single-page applications)
    let lastUrl = location.href; 
    new MutationObserver(function() {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            updateResourceImages();
        }
    }).observe(document, {subtree: true, childList: true});
});
