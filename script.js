// Function to create typing animation for an element
function createTypingAnimation(element) {
    // Get the text content
    const text = element.textContent;
    // Clear the content
    element.textContent = '';
    
    // Create a span for each character
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i];
        span.style.opacity = 0;
        element.appendChild(span);
    }
    
    // Create anime.js timeline for typing animation
    const timeline = anime.timeline({
        easing: 'easeInOutQuad',
        complete: () => {
            // After animation completes, set all spans to be visible
            // This ensures text remains visible if animations are interrupted
            Array.from(element.children).forEach(span => {
                span.style.opacity = 1;
            });
        }
    });
    
    // Add animation for each character
    timeline.add({
        targets: element.querySelectorAll('span'),
        opacity: 1,
        duration: 30,
        delay: anime.stagger(30),
        easing: 'easeInOutQuad'
    });
    
    return timeline;
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select all elements with the animate-text class
    const elements = document.querySelectorAll('.animate-text');
    
    // Create a master timeline
    const masterTimeline = anime.timeline({
        easing: 'easeOutExpo'
    });
    
    // Add each element's animation to the master timeline with appropriate delays
    elements.forEach((element, index) => {
        // Create a new typing animation for this element
        const typingAnimation = createTypingAnimation(element);
        
        // Add to master timeline with delay based on element position
        // This creates a cascading effect where each section animates after the previous one
        masterTimeline.add(typingAnimation, index * 100);
    });
    
    // Add some effects to sections as they appear
    anime({
        targets: ['section', 'header', 'footer'],
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        delay: anime.stagger(200, {start: 500}),
        easing: 'easeOutExpo'
    });
});