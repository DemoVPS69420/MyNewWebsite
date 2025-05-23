// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Select all elements that have a data-text attribute
    const elements = document.querySelectorAll('[data-text]');

    // Make sure content is visible immediately (important for ensuring site content appears)
    elements.forEach(element => {
        element.style.opacity = '1';
    });

    // Hide the email initially and replace with a click prompt
    const emailElement = document.querySelector('.email-container');
    const originalEmail = emailElement.getAttribute('data-text');
    emailElement.textContent = "Click to reveal email";
    emailElement.classList.add('hidden-email');
    
    // Add click event to reveal email
    emailElement.addEventListener('click', function() {
        if (emailElement.classList.contains('hidden-email')) {
            emailElement.classList.remove('hidden-email');
            
            // Clear the current text
            emailElement.textContent = '';
            
            // Create a typing animation specifically for the email
            const emailTyping = anime({
                targets: emailElement,
                innerHTML: [0, originalEmail].map(value => {
                    if (value === 0) return '';
                    return value.split('').map((letter, i) => {
                        return `<span style="display:inline-block;">${letter}</span>`;
                    }).join('');
                }),
                duration: originalEmail.length * 40,
                easing: 'steps(' + originalEmail.length + ')',
            });
        }
    });

    // Define typing animation with a fallback to ensure content is visible
    setTimeout(() => {
        // Initialize animations for each text element (except email)
        elements.forEach((element, index) => {
            // Skip the email element as we're handling it separately
            if (element === emailElement) return;
            
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