// Script to swap the "Need Customized Research or Analysis?" section with the "Subscribe to Legislative Updates" section
document.addEventListener('DOMContentLoaded', function() {
  // Wait a bit for React to render the components
  setTimeout(function() {
    // Find the sections by their headings
    const subscribeSection = Array.from(document.querySelectorAll('section')).find(section => 
      section.querySelector('h2') && 
      section.querySelector('h2').textContent === 'Subscribe to Legislative Updates'
    );
    
    const researchSection = Array.from(document.querySelectorAll('section')).find(section => 
      section.querySelector('h2') && 
      section.querySelector('h2').textContent === 'Need Customized Research or Analysis?'
    );
    
    // If both sections are found, swap them
    if (subscribeSection && researchSection) {
      const subscribeSectionParent = subscribeSection.parentNode;
      const researchSectionParent = researchSection.parentNode;
      
      // Create placeholders
      const subscribePlaceholder = document.createElement('div');
      const researchPlaceholder = document.createElement('div');
      
      // Replace with placeholders
      subscribeSectionParent.replaceChild(subscribePlaceholder, subscribeSection);
      researchSectionParent.replaceChild(researchPlaceholder, researchSection);
      
      // Swap sections
      subscribeSectionParent.replaceChild(researchSection, subscribePlaceholder);
      researchSectionParent.replaceChild(subscribeSection, researchPlaceholder);
      
      console.log('Sections swapped successfully');
    } else {
      console.log('Could not find both sections to swap');
    }
  }, 500); // Wait 500ms for React to render
});
