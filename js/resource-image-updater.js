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
                    const titleElement = card.querySelector('h3.text-xl.font-bold.text-navy-900');
                    if (!titleElement) return;
                    
                    const title = titleElement.textContent.trim();
                    
                    // Get the image element
                    const imgElement = card.querySelector('img');
                    if (!imgElement) return;
                    
                    // Update image based on title
                    if (title === 'Texas Legislative Calendar 2025') {
                        console.log('Updating Texas Legislative Calendar 2025 image');
                        imgElement.src = 'https://res.cloudinary.com/dwnmuolg8/image/upload/v1743313784/33727E2E-27C9-44FD-BA77-4C5F3CFD7F4A_oia0si.png';
                    } else if (title === 'Texas Legislative Advocacy Guide') {
                        console.log('Updating Texas Legislative Advocacy Guide image');
                        imgElement.src = 'https://res.cloudinary.com/dwnmuolg8/image/upload/v1743461383/Image_Mar_31_2025_05_47_12_PM_vwvuxs.png';
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
