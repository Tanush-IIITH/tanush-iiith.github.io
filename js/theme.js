// Theme toggle functionality with improved structure
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
});

/**
 * Initialize the theme toggle functionality
 * - Sets up event listeners
 * - Loads saved preferences
 * - Handles theme switching
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    if (!themeToggle) return;
    
    // Always initialize to light theme by default
    document.body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
    
    // Update icon to show moon (since we're in light mode)
    if (themeIcon) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
    
    // Apply saved theme preference on page load
    applyThemePreference();
    
    // Add click event listener to toggle button
    themeToggle.addEventListener('click', function() {
        toggleTheme();
    });
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const isDarkTheme = document.body.classList.toggle('dark-theme');
    
    // Update toggle button appearance
    themeToggle.classList.toggle('dark', isDarkTheme);
    
    // Update icon based on current state
    if (themeIcon) {
        if (isDarkTheme) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
    
    // Save user preference
    saveThemePreference(isDarkTheme);
    
    // Log theme change (for debugging)
    console.log('Theme switched to:', isDarkTheme ? 'dark' : 'light');
}

/**
 * Save the user's theme preference to localStorage
 * @param {boolean} isDarkTheme - Whether dark theme is enabled
 */
function saveThemePreference(isDarkTheme) {
    localStorage.setItem('darkTheme', isDarkTheme);
}

/**
 * Apply the saved theme preference from localStorage
 */
function applyThemePreference() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
    
    if (isDarkTheme) {
        document.body.classList.add('dark-theme');
        themeToggle.classList.add('dark');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    } else {
        document.body.classList.remove('dark-theme');
        themeToggle.classList.remove('dark');
        if (themeIcon) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
}
