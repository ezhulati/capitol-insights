// Simple navigation script for multi-part documents
document.addEventListener('DOMContentLoaded', function() {
    // Add navigation links to the document
    const isPart2 = window.location.href.includes('municipal-advocacy-strategies-part2.html');
    const navContainer = document.createElement('div');
    navContainer.style.margin = '20px 0';
    navContainer.style.padding = '10px';
    navContainer.style.backgroundColor = '#f8f9fa';
    navContainer.style.borderRadius = '5px';
    navContainer.style.textAlign = 'center';
    
    if (isPart2) {
        // If on part 2, add a link back to part 1
        navContainer.innerHTML = '<a href="/files/municipal-advocacy-strategies.html" style="color: #1a56db; font-weight: 500; padding: 5px 10px;"><span style="margin-right: 5px;">←</span> Back to Part 1</a>';
        // Insert at the beginning of the body
        document.body.insertBefore(navContainer, document.body.firstChild);
    } else {
        // If on part 1, add a link to part 2
        const part2Link = document.createElement('div');
        part2Link.style.margin = '20px 0';
        part2Link.style.padding = '10px';
        part2Link.style.backgroundColor = '#f8f9fa';
        part2Link.style.borderRadius = '5px';
        part2Link.style.textAlign = 'center';
        part2Link.innerHTML = '<a href="/files/municipal-advocacy-strategies-part2.html" style="color: #1a56db; font-weight: 500; padding: 5px 10px;">Continue to Part 2 <span style="margin-left: 5px;">→</span></a>';
        // Add at the position where the content should continue (before closing tags)
        const insertAfterElement = document.querySelector('li strong:contains("Media Strategy")').closest('li');
        if (insertAfterElement) {
            insertAfterElement.parentNode.insertBefore(part2Link, null);
        } else {
            // Fallback - just append to the body
            document.body.appendChild(part2Link);
        }
    }
});
