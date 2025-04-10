// Education page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Timeline animation
    const timelineItems = document.querySelectorAll('.education-item');
    
    if (timelineItems.length > 0) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        }, { threshold: 0.2 });
        
        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = `all 0.5s ease ${index * 0.2}s`;
            observer.observe(item);
        });
    }
    
    // Achievement item animations
    const achievementItems = document.querySelectorAll('.achievement-item');
    
    if (achievementItems.length > 0) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        achievementItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = `all 0.5s ease ${index * 0.15}s`;
            observer.observe(item);
        });
    }
    
    // Education icons animation
    const icons = document.querySelectorAll('.education-type-heading i, .achievements-heading i');
    
    icons.forEach(icon => {
        icon.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.2) rotate(10deg)';
        });
        
        icon.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1) rotate(0)';
        });
    });
});
