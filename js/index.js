// Index/About Me page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Profile image hover effects
    const profileImage = document.querySelector('.profile-picture img');
    if (profileImage) {
        profileImage.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.03) rotate(1deg)';
        });
        
        profileImage.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Animate interest items on scroll
    const interestItems = document.querySelectorAll('.interest-item');
    
    if (interestItems.length > 0) {
        const observerOptions = {
            threshold: 0.2
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        interestItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = `all 0.5s ease ${index * 0.1}s`;
            observer.observe(item);
            
            // Add hover effect handlers
            item.addEventListener('mouseover', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
            });
            
            item.addEventListener('mouseout', function() {
                // Only reset if the item has been scrolled into view
                if (this.style.opacity === '1') {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = 'none';
                } else {
                    this.style.transform = 'translateY(20px)';
                    this.style.boxShadow = 'none';
                }
            });
        });
    }
    
    // Apply white color to innovator text
    const innovatorElements = document.querySelectorAll('.innovator h3, .innovator-text, .innovator .role-description');
    innovatorElements.forEach(element => {
        element.style.color = 'white';
    });

    // Ensure innovator badge text color is white (in case CSS is overridden)
    const innovatorBadge = document.querySelector('.badge.yellow');
    if (innovatorBadge) {
        innovatorBadge.style.color = 'white';
    }
});
