// Script to update resource images on the resources page
// Version 4.0 - Direct image replacement approach
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
        img {
            object-fit: contain !important;
            width: 100% !important;
            height: auto !important;
            min-height: 200px !important;
        }
        .image-container, .rounded-t-xl, [class*="rounded-t"] {
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
            
            // Direct approach: Find all images on the page and check their parent elements
            const allImages = document.querySelectorAll('img');
            console.log('Found', allImages.length, 'images on the page');
            
            // Process each image
            allImages.forEach(function(img) {
                // Get the parent card element
                const card = img.closest('.bg-white') || img.closest('[class*="card"]') || img.parentElement;
                if (!card) {
                    console.log('No parent card found for image');
                    return;
                }
                
                // Try to find the title element
                const titleElement = card.querySelector('h3') || card.querySelector('h2') || card.querySelector('[class*="title"]');
                if (!titleElement) {
                    console.log('No title element found in card');
                    return;
                }
                
                const title = titleElement.textContent.trim();
                console.log('Found card with title:', title);
                
                // Handle Texas Legislative Calendar 2025
                if (title.includes('Legislative Calendar') || title.includes('Calendar 2025')) {
                    console.log('Updating Texas Legislative Calendar 2025 image');
                    
                    // Set the image source
                    img.src = 'https://res.cloudinary.com/dwnmuolg8/image/upload/v1743313784/33727E2E-27C9-44FD-BA77-4C5F3CFD7F4A_oia0si.png';
                    img.alt = 'Texas Legislative Calendar 2025';
                    
                    // Adjust image styling to ensure full image is visible
                    img.style.objectFit = 'contain';
                    img.style.width = '100%';
                    img.style.height = 'auto';
                    img.style.minHeight = '200px';
                    
                    // Find the image container and adjust its height if needed
                    const imageContainer = img.parentElement;
                    if (imageContainer) {
                        imageContainer.style.height = 'auto';
                        imageContainer.style.minHeight = '200px';
                    }
                } 
                // Handle Texas Legislative Advocacy Guide
                else if (title.includes('Advocacy Guide') || title.includes('Legislative Advocacy')) {
                    console.log('Updating Texas Legislative Advocacy Guide image');
                    
                    // Set the image source
                    img.src = 'https://res.cloudinary.com/dwnmuolg8/image/upload/v1743461383/Image_Mar_31_2025_05_47_12_PM_vwvuxs.png';
                    img.alt = 'Texas Legislative Advocacy Guide';
                    
                    // Adjust image styling to ensure full image is visible
                    img.style.objectFit = 'contain';
                    img.style.width = '100%';
                    img.style.height = 'auto';
                    img.style.minHeight = '200px';
                    
                    // Find the image container and adjust its height if needed
                    const imageContainer = img.parentElement;
                    if (imageContainer) {
                        imageContainer.style.height = 'auto';
                        imageContainer.style.minHeight = '200px';
                    }
                    
                    // Update the date if needed
                    const dateLabel = card.querySelector('.text-xs.font-medium.text-blue-600.bg-blue-50.rounded-full.px-2.py-1') || 
                                     card.querySelector('[class*="date"]');
                    if (dateLabel && dateLabel.textContent.trim() !== 'December 14, 2024') {
                        dateLabel.textContent = 'December 14, 2024';
                    }
                }
            });
            
            // Fallback approach: If no images were found, try to find the cards first
            if (allImages.length === 0) {
                console.log('No images found, trying fallback approach');
                
                // Find all potential resource cards
                const resourceCards = document.querySelectorAll('.bg-white, [class*="card"], [class*="resource"]');
                console.log('Found', resourceCards.length, 'potential resource cards');
                
                resourceCards.forEach(function(card) {
                    // Try to find the title element
                    const titleElement = card.querySelector('h3') || card.querySelector('h2') || card.querySelector('[class*="title"]');
                    if (!titleElement) {
                        console.log('No title element found in card');
                        return;
                    }
                    
                    const title = titleElement.textContent.trim();
                    console.log('Found card with title:', title);
                    
                    // Get or create an image element
                    let imgElement = card.querySelector('img');
                    if (!imgElement) {
                        console.log('No image element found, creating one');
                        imgElement = document.createElement('img');
                        
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
                    
                    // Handle Texas Legislative Calendar 2025
                    if (title.includes('Legislative Calendar') || title.includes('Calendar 2025')) {
                        console.log('Updating Texas Legislative Calendar 2025 image');
                        
                        // Set the image source
                        imgElement.src = 'https://res.cloudinary.com/dwnmuolg8/image/upload/v1743313784/33727E2E-27C9-44FD-BA77-4C5F3CFD7F4A_oia0si.png';
                        imgElement.alt = 'Texas Legislative Calendar 2025';
                        
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
                    } 
                    // Handle Texas Legislative Advocacy Guide
                    else if (title.includes('Advocacy Guide') || title.includes('Legislative Advocacy')) {
                        console.log('Updating Texas Legislative Advocacy Guide image');
                        
                        // Set the image source
                        imgElement.src = 'https://res.cloudinary.com/dwnmuolg8/image/upload/v1743461383/Image_Mar_31_2025_05_47_12_PM_vwvuxs.png';
                        imgElement.alt = 'Texas Legislative Advocacy Guide';
                        
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
                        const dateLabel = card.querySelector('.text-xs.font-medium.text-blue-600.bg-blue-50.rounded-full.px-2.py-1') || 
                                         card.querySelector('[class*="date"]');
                        if (dateLabel && dateLabel.textContent.trim() !== 'December 14, 2024') {
                            dateLabel.textContent = 'December 14, 2024';
                        }
                    }
                });
            }
            
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
    
    // Also run after a short delay to ensure all content is loaded
    setTimeout(updateResourceImages, 1000);
    setTimeout(updateResourceImages, 2000);
});
