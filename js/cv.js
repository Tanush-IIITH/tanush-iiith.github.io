// CV page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Timeline items animation
    const timelineItems = document.querySelectorAll('.cv-timeline-item');
    
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
    
    // Download button animation
    const downloadBtn = document.querySelector('.cv-download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });
        
        downloadBtn.addEventListener('mouseout', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });

        downloadBtn.addEventListener('click', function(e) {
            // Create a temporary link to test if the file exists
            const testLink = document.createElement('a');
            testLink.href = downloadBtn.getAttribute('href');
            
            // Add error handling
            const handleError = () => {
                e.preventDefault();
                alert('Sorry, the CV PDF is currently unavailable. Please try again later.');
                console.error('CV PDF file not found at: ' + testLink.href);
            };
            
            // Use fetch to check if the file exists
            fetch(testLink.href)
                .then(response => {
                    if (!response.ok) {
                        handleError();
                    }
                    // If response is ok, the default link behavior will continue
                })
                .catch(error => {
                    handleError();
                });
        });
    }
    
    // Skill tags animation
    const skillTags = document.querySelectorAll('.cv-skill-tag');
    
    if (skillTags.length > 0) {
        skillTags.forEach((tag, index) => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                tag.style.transition = 'all 0.3s ease';
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0)';
            }, 500 + (index * 40));
        });
    }
    
    // Achievement bullets animation
    const achievementItems = document.querySelectorAll('.cv-achievement-list li');
    
    if (achievementItems.length > 0) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        }, { threshold: 0.1 });
        
        achievementItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(20px)';
            item.style.transition = `all 0.4s ease ${index * 0.1}s`;
            observer.observe(item);
        });
    }
});
