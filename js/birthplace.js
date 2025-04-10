// Birthplace page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Location item image hover effects
    const locationImages = document.querySelectorAll('.location-image img');
    
    locationImages.forEach(image => {
        image.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        image.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Animate location items on scroll
    const locationItems = document.querySelectorAll('.location-item');
    
    if (locationItems.length > 0) {
        const observerOptions = {
            threshold: 0.15
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        locationItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = `all 0.5s ease ${index * 0.2}s`;
            observer.observe(item);
        });
    }
    
    // Special mention animation
    const specialMention = document.querySelector('.special-mention');
    if (specialMention) {
        const observer = new IntersectionObserver(function(entries) {
            if (entries[0].isIntersecting) {
                specialMention.style.opacity = '1';
                specialMention.style.transform = 'translateY(0)';
            }
        }, { threshold: 0.2 });
        
        specialMention.style.opacity = '0';
        specialMention.style.transform = 'translateY(30px)';
        specialMention.style.transition = 'all 0.7s ease';
        observer.observe(specialMention);
    }
});
