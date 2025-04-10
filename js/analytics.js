/**
 * Simple analytics tracking for the website
 * Records page visits and user interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize analytics
    console.log('Analytics initialized at: ' + getFormattedTimestamp());
    
    // Track page view
    trackPageView();
    
    // Track clicks on all interactive elements
    setupClickTracking();
});

/**
 * Get current timestamp in ISO format: YYYY-MM-DD HH:MM:SS
 * @returns {string} Formatted timestamp
 */
function getFormattedTimestamp() {
    const now = new Date();
    
    // Format: YYYY-MM-DD HH:MM:SS
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * Track a page view with the current URL
 */
function trackPageView() {
    const pageData = {
        url: window.location.href,
        title: document.title,
        timestamp: getFormattedTimestamp(),
        referrer: document.referrer || 'direct'
    };
    
    console.log('Page viewed:', pageData);
    // In a real implementation, you would send this data to a server
    // sendAnalyticsData('pageview', pageData);
}

/**
 * Set up click tracking for interactive elements
 */
function setupClickTracking() {
    // Track clicks on links, buttons, and other interactive elements
    document.addEventListener('click', function(event) {
        // Find the closest clickable element
        const clickedElement = event.target.closest('a, button, .clickable, [role="button"]');
        
        if (clickedElement) {
            const clickData = {
                element: getElementDescription(clickedElement),
                timestamp: getFormattedTimestamp(),
                path: getElementPath(clickedElement)
            };
            
            console.log('Element clicked:', clickData);
            // In a real implementation, you would send this data to a server
            // sendAnalyticsData('click', clickData);
        }
    });
    
    // Modify the existing click tracking to include timestamps
    document.addEventListener('click', function(event) {
        // Get the clicked element
        const clickedElement = event.target;
        
        // Extract element information for tracking
        const elementInfo = {
            tag: clickedElement.tagName,
            id: clickedElement.id || 'none',
            class: clickedElement.className || 'none',
            text: clickedElement.innerText?.substring(0, 20) || 'none',
            timestamp: getFormattedTimestamp()
        };
        
        // Log the click with timestamp for analytics
        console.log('Click tracked:', elementInfo);
        
        // Your existing analytics tracking code
        // ...existing tracking code...
    });
}

/**
 * Get a description of the clicked element
 * @param {HTMLElement} element - The clicked element
 * @returns {object} Element description
 */
function getElementDescription(element) {
    return {
        tag: element.tagName.toLowerCase(),
        id: element.id || null,
        classes: Array.from(element.classList).join(' ') || null,
        text: element.innerText?.trim().substring(0, 50) || null,
        href: element.href || null
    };
}

/**
 * Get the DOM path of an element
 * @param {HTMLElement} element - The element
 * @returns {string} DOM path
 */
function getElementPath(element) {
    let path = [];
    let currentElement = element;
    
    while (currentElement && currentElement !== document.body) {
        let selector = currentElement.tagName.toLowerCase();
        
        if (currentElement.id) {
            selector += `#${currentElement.id}`;
        } else if (currentElement.className) {
            selector += `.${Array.from(currentElement.classList).join('.')}`;
        }
        
        path.unshift(selector);
        currentElement = currentElement.parentElement;
    }
    
    return path.join(' > ');
}

/**
 * Send analytics data to a server (placeholder function)
 * @param {string} eventType - Type of event
 * @param {object} data - Event data
 */
function sendAnalyticsData(eventType, data) {
    // This would be implemented to send data to your analytics server
    // For now, we just log to console
    console.log(`Analytics event (${eventType}):`, data);
}
