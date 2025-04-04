// Script to update resource images on the resources page
document.addEventListener('DOMContentLoaded', function() {
    // Function to update resource images
    function updateResourceImages() {
        // Check if we're on the resources page
        if (window.location.pathname.includes('/resources')) {
            console.log('Resource image updater script running on resources page');
            
            // Set a timeout to ensure the page has fully loaded and React has rendered
            setTimeout(() => {
                // Find all resource cards in the Featured Resources section
                const resourceCards = document.querySelectorAll('.bg-white.rounded-xl.overflow-hidden.shadow-md.border.border-slate-100');
                
                resourceCards.forEach(card => {
                    // Get the title element
                    const titleElement = card.querySelector('h3.text-xl.font-bold.text-navy-900, h3.text-lg.font-bold.text-navy-900');
                    if (!titleElement) {
                        console.log('No title element found in card');
                        return;
                    }
                    
                    const title = titleElement.textContent.trim();
                    console.log('Found resource card with title:', title);
                    
                    // Handle Texas Legislative Calendar 2025
                    if (title === 'Texas Legislative Calendar 2025') {
                        // Get the image element
                        const imgElement = card.querySelector('img');
                        if (!imgElement) {
                            console.log('No image element found for title:', title);
                            return;
                        }
                        
                        console.log('Updating Texas Legislative Calendar 2025 image');
                        imgElement.src = 'https://res.cloudinary.com/dwnmuolg8/image/upload/v1743313784/33727E2E-27C9-44FD-BA77-4C5F3CFD7F4A_oia0si.png';
                    } 
                    // Handle Texas Legislative Advocacy Guide
                    else if (title.includes('Texas Legislative Advocacy Guide')) {
                        console.log('Processing Texas Legislative Advocacy Guide card');
                        
                        // Try to find the image element
                        let imgElement = card.querySelector('img');
                        
                        // If no image element exists, look for a div that might be a container for the image
                        if (!imgElement) {
                            console.log('No direct img element found, looking for image container');
                            const imageContainer = card.querySelector('.rounded-t-xl, .bg-blue-100, .overflow-hidden');
                            
                            if (imageContainer) {
                                console.log('Found potential image container, checking for img inside');
                                imgElement = imageContainer.querySelector('img');
                                
                                // If still no image, create one and add it to the container
                                if (!imgElement) {
                                    console.log('Creating new img element for Texas Legislative Advocacy Guide');
                                    imgElement = document.createElement('img');
                                    imgElement.alt = 'Texas Legislative Advocacy Guide';
                                    imgElement.className = 'w-full h-auto object-cover';
                                    imageContainer.appendChild(imgElement);
                                }
                            } else {
                                // If no suitable container found, try to find the first div in the card
                                console.log('No image container found, looking for first div');
                                const firstDiv = card.querySelector('div');
                                
                                if (firstDiv) {
                                    console.log('Found first div, creating img element');
                                    imgElement = document.createElement('img');
                                    imgElement.alt = 'Texas Legislative Advocacy Guide';
                                    imgElement.className = 'w-full h-auto object-cover';
                                    firstDiv.prepend(imgElement);
                                } else {
                                    console.log('Could not find a suitable place to add an image');
                                    return;
                                }
                            }
                        }
                        
                        console.log('Updating Texas Legislative Advocacy Guide image');
                        // Use an image that matches the style of the Texas Legislative Calendar 2025 image
                        imgElement.src = 'https://res.cloudinary.com/dwnmuolg8/image/upload/v1743313784/33727E2E-27C9-44FD-BA77-4C5F3CFD7F4A_oia0si.png';
                    }
                });
                
                // Also update images in the All Resources section
                const allResourceCards = document.querySelectorAll('.bg-white.rounded-lg.border.border-slate-100.shadow-sm');
                
                allResourceCards.forEach(card => {
                    // Get the title element
                    const titleElement = card.querySelector('h3.text-lg.font-bold.text-navy-900');
                    if (!titleElement) return;
                    
                    const title = titleElement.textContent.trim();
                    
                    // These cards don't have images, but if they did, we would update them here
                    // This is for future-proofing in case the design changes
                });
                
                console.log('Resource image update complete');
            }, 1000); // Wait 1 second for the page to fully render
        }
    }
    
    // Run the update function
    updateResourceImages();
    
    // Also run when the URL changes (for single-page applications)
    let lastUrl = location.href; 
    new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            updateResourceImages();
        }
    }).observe(document, {subtree: true, childList: true});
});
