// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Select all elements that have a data-text attribute
    const elements = document.querySelectorAll('[data-text]');

    // Make sure content is visible immediately (important for ensuring site content appears)
    elements.forEach(element => {
        element.style.opacity = '1';
    });

    // Define typing animation with a fallback to ensure content is visible
    setTimeout(() => {
        // Initialize animations for each text element
        elements.forEach((element, index) => {
            // Store the original text
            const text = element.getAttribute('data-text');
            
            // Create a timeline for this element
            const timeline = anime.timeline({
                targets: element,
                delay: index * 150, // Stagger the animations
                easing: 'easeInOutSine',
                complete: function() {
                    // Ensure the text is fully visible after animation
                    element.style.opacity = '1';
                    element.textContent = text; 
                }
            });
            
            // Add the typing effect to the timeline
            timeline.add({
                innerHTML: [0, text].map(value => {
                    if (value === 0) return '';
                    return value.split('').map((letter, i) => {
                        return `<span style="display:inline-block;">${letter}</span>`;
                    }).join('');
                }),
                duration: text.length * 40,
                delay: 0,
                easing: 'steps(' + text.length + ')',
                begin: function() {
                    // Make element visible at start of animation
                    element.style.opacity = '1';
                    element.innerHTML = '';
                }
            });
        });
        
        // Add fade-in and slide-up animation for sections
        anime({
            targets: ['section', 'header', 'footer'],
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
            delay: anime.stagger(200, {start: 300}),
            easing: 'easeOutExpo'
        });
    }, 100); // Short delay to ensure DOM is ready
});