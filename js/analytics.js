/**
 * User Interaction Analytics
 * Tracks and logs user interactions (clicks and page views) across the website
 */

// Initialize analytics when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Track the initial page view when the page loads
    logEvent('view', 'page', document.title);
    
    // Set up click tracking for all elements
    setupClickTracking();
});

/**
 * Sets up click event listeners across the entire document
 */
function setupClickTracking() {
    document.addEventListener('click', function(event) {
        const target = event.target;
        
        // Determine the type of element that was clicked
        let elementType = determineElementType(target);
        
        // Get any relevant identifier for the element
        let elementIdentifier = getElementIdentifier(target);
        
        // Log the click event
        logEvent('click', elementType, elementIdentifier);
    });
}

/**
 * Determines the type of element that was interacted with
 * @param {HTMLElement} element - The DOM element
 * @return {string} The determined element type
 */
function determineElementType(element) {
    // Check for common interactive elements
    if (element.tagName === 'A') return 'link';
    if (element.tagName === 'BUTTON') return 'button';
    if (element.tagName === 'IMG') return 'image';
    if (element.tagName === 'INPUT') {
        return element.type + '-input'; // e.g., "text-input", "checkbox-input"
    }
    if (element.tagName === 'SELECT') return 'dropdown';
    if (element.tagName === 'TEXTAREA') return 'textarea';
    
    // Check for navigation items
    if (element.closest('nav')) return 'navigation-item';
    
    // Check for common content elements
    if (element.tagName === 'H1' || element.tagName === 'H2' || 
        element.tagName === 'H3' || element.tagName === 'H4' || 
        element.tagName === 'H5' || element.tagName === 'H6') return 'heading';
    if (element.tagName === 'P') return 'paragraph';
    
    // Check for common UI components by class
    if (element.closest('.theme-toggle')) return 'theme-toggle';
    if (element.closest('.carousel-btn')) return 'carousel-button';
    
    // If the element itself doesn't match but it's a child of a button or link
    if (element.closest('button')) return 'button';
    if (element.closest('a')) return 'link';
    
    // Default to the element's tag name if no specific type is determined
    return element.tagName.toLowerCase() || 'unknown-element';
}

/**
 * Gets an identifier for the element to make logging more meaningful
 * @param {HTMLElement} element - The DOM element
 * @return {string} An identifier for the element
 */
function getElementIdentifier(element) {
    // Try to get the most meaningful identifier in descending order of specificity
    if (element.id) return '#' + element.id;
    if (element.className && typeof element.className === 'string' && element.className.trim() !== '') 
        return '.' + element.className.split(' ')[0];
    if (element.alt) return 'alt: ' + truncateText(element.alt);
    if (element.title) return 'title: ' + truncateText(element.title);
    if (element.textContent) return 'text: ' + truncateText(element.textContent);
    
    // For links and buttons, try to get text content
    if (element.tagName === 'A' || element.tagName === 'BUTTON') {
        const text = element.textContent.trim();
        if (text) return text;
        if (element.href) return element.href;
    }
    
    // For inputs, use name, placeholder or type
    if (element.tagName === 'INPUT') {
        if (element.name) return element.name;
        if (element.placeholder) return element.placeholder;
        return element.type || 'input';
    }
    
    // Fallback to position in parent
    const parent = element.parentElement;
    if (parent) {
        const children = Array.from(parent.children);
        const index = children.indexOf(element);
        return `${element.tagName.toLowerCase()}[${index}] in ${parent.tagName.toLowerCase()}`;
    }
    
    return 'unnamed-element';
}

/**
 * Truncates text to a reasonable length for logging
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length
 * @return {string} Truncated text
 */
function truncateText(text, maxLength = 30) {
    text = text.trim();
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

/**
 * Logs an event to the console in the specified format
 * @param {string} eventType - Type of event (click, view)
 * @param {string} objectType - Type of object interacted with
 * @param {string} objectIdentifier - Identifier for the object
 */
function logEvent(eventType, objectType, objectIdentifier) {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp}, ${eventType}, ${objectType}: ${objectIdentifier}`);
}
