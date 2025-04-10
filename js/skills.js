// Skills page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Animate skill categories on scroll
    const skillCategories = document.querySelectorAll('.skill-category');
    
    if (skillCategories.length > 0) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        skillCategories.forEach((category, index) => {
            category.style.opacity = '0';
            category.style.transform = 'translateY(30px)';
            category.style.transition = `all 0.6s ease ${index * 0.3}s`;
            observer.observe(category);
        });
    }
    
    // Skill item hover animations
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseover', function() {
            const icon = this.querySelector('.skill-icon img');
            if (icon) {
                icon.style.transform = 'scale(1.15)';
            }
            this.style.transform = 'translateY(-3px)';
        });
        
        item.addEventListener('mouseout', function() {
            const icon = this.querySelector('.skill-icon img');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
            this.style.transform = '';
        });
    });
    
    // Create skill tag appearing animation
    const allSkillItems = document.querySelectorAll('.skill-item');
    
    allSkillItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 300 + (index * 50));
    });
});
