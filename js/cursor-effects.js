document.addEventListener('DOMContentLoaded', function() {
    // Create cursor elements
    const cursorOuter = document.createElement('div');
    cursorOuter.classList.add('cursor-outer');
    
    const cursorInner = document.createElement('div');
    cursorInner.classList.add('cursor-inner');
    
    // Append to body
    document.body.appendChild(cursorOuter);
    document.body.appendChild(cursorInner);
    
    // Variables for cursor position and animation
    let mouseX = 0;
    let mouseY = 0;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let speed = 0;
    let isMoving = false;
    let movingTimeout;
    let trailElements = [];
    let trailIndex = 0;
    const TRAIL_LENGTH = 5;
    
    // Check if we should enable the custom cursor (disable on touch devices)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Initially set cursor opacity to 0 during loading screen
    cursorOuter.style.opacity = '0';
    cursorInner.style.opacity = '0';
    
    // Create trail elements
    function createTrailElements() {
        for (let i = 0; i < TRAIL_LENGTH; i++) {
            const trail = document.createElement('div');
            trail.classList.add('cursor-trail');
            trail.style.opacity = 0;
            document.body.appendChild(trail);
            trailElements.push(trail);
        }
    }
    
    if (!isTouchDevice && window.innerWidth > 768) {
        // Create trail elements
        createTrailElements();
        
        // Add class to html to hide default cursor
        document.documentElement.classList.add('custom-cursor');
        
        // Track mouse movement
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Calculate speed of mouse movement
            const dx = mouseX - prevMouseX;
            const dy = mouseY - prevMouseY;
            speed = Math.sqrt(dx*dx + dy*dy);
            
            // Add moving class when mouse is moving
            if (speed > 2) {
                if (!isMoving) {
                    cursorOuter.classList.add('moving');
                    cursorInner.classList.add('moving');
                    isMoving = true;
                }
                
                // Clear previous timeout
                clearTimeout(movingTimeout);
                
                // Set timeout to remove moving class after mouse stops
                movingTimeout = setTimeout(function() {
                    cursorOuter.classList.remove('moving');
                    cursorInner.classList.remove('moving');
                    isMoving = false;
                }, 100);
                
                // Add cursor trail when moving
                const trail = trailElements[trailIndex];
                trail.style.left = mouseX + 'px';
                trail.style.top = mouseY + 'px';
                trail.style.opacity = 0.6;
                
                // Make the trail fade out
                setTimeout(function() {
                    trail.classList.add('fade');
                    setTimeout(() => {
                        trail.classList.remove('fade');
                        trail.style.opacity = 0;
                    }, 500);
                }, 50);
                
                // Cycle through trail elements
                trailIndex = (trailIndex + 1) % TRAIL_LENGTH;
            }
            
            prevMouseX = mouseX;
            prevMouseY = mouseY;
        });
        
        // Animate the cursor with smooth movement
        function animateCursor() {
            // Smooth follow effect
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            // Set position with transform for better performance
            cursorOuter.style.left = mouseX + 'px';
            cursorOuter.style.top = mouseY + 'px';
            cursorInner.style.left = mouseX + 'px';
            cursorInner.style.top = mouseY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        
        // Add click animation
        document.addEventListener('mousedown', function() {
            cursorOuter.classList.add('cursor-click');
            setTimeout(() => {
                cursorOuter.classList.remove('cursor-click');
            }, 500);
        });
        
        // Wait for page to load fully before showing custom cursor
        window.addEventListener('load', function() {
            setTimeout(() => {
                // Only show cursors after loader is gone
                if (document.body.classList.contains('loaded')) {
                    cursorOuter.style.opacity = '1';
                    cursorInner.style.opacity = '1';
                    animateCursor(); // Start animation loop
                    console.log('Custom cursor activated');
                }
            }, 1300); // Wait a bit longer than the loader animation
        });
        
        // Handle hover effects for interactive elements
        // Using event delegation to avoid issues with dynamically added elements
        document.body.addEventListener('mouseenter', function(e) {
            if (e.target.matches('a, button, input[type="button"], input[type="submit"], .result-card')) {
                cursorOuter.classList.add('hover');
                cursorInner.classList.add('hover');
            }
        }, true);
        
        document.body.addEventListener('mouseleave', function(e) {
            if (e.target.matches('a, button, input[type="button"], input[type="submit"], .result-card')) {
                cursorOuter.classList.remove('hover');
                cursorInner.classList.remove('hover');
            }
        }, true);
        
        // Restore cursor when leaving window
        document.addEventListener('mouseout', function(e) {
            if (e.relatedTarget === null) {
                document.documentElement.classList.remove('custom-cursor');
            }
        });
        
        document.addEventListener('mouseover', function() {
            document.documentElement.classList.add('custom-cursor');
        });
        
        // Hide cursor when tab/window loses focus
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                // Hide cursor elements when tab is not visible
                cursorOuter.style.opacity = '0';
                cursorInner.style.opacity = '0';
                trailElements.forEach(trail => {
                    trail.style.opacity = '0';
                });
            } else {
                // Show cursor elements when tab becomes visible again
                setTimeout(() => {
                    if (document.body.classList.contains('loaded')) {
                        cursorOuter.style.opacity = '1';
                        cursorInner.style.opacity = '1';
                    }
                }, 100);
            }
        });
        
        // Additional window blur/focus handlers
        window.addEventListener('blur', function() {
            document.documentElement.classList.remove('custom-cursor');
            cursorOuter.style.opacity = '0';
            cursorInner.style.opacity = '0';
            trailElements.forEach(trail => {
                trail.style.opacity = '0';
            });
        });
        
        window.addEventListener('focus', function() {
            if (!isTouchDevice && window.innerWidth > 768) {
                document.documentElement.classList.add('custom-cursor');
                setTimeout(() => {
                    if (document.body.classList.contains('loaded')) {
                        cursorOuter.style.opacity = '1';
                        cursorInner.style.opacity = '1';
                    }
                }, 100);
            }
        });
    } else {
        // Hide the custom cursor elements on touch devices
        cursorOuter.style.display = 'none';
        cursorInner.style.display = 'none';
    }
});
