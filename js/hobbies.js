// Hobbies page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Hobby item hover effects
    const hobbyItems = document.querySelectorAll('.hobby-item');
    
    hobbyItems.forEach(item => {
        item.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';
        });
        
        item.addEventListener('mouseout', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Animate hobby items on scroll
    if (hobbyItems.length > 0) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        hobbyItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = `all 0.6s ease ${index * 0.15}s`;
            observer.observe(item);
        });
    }
    
    // Image hover animations
    const hobbyImages = document.querySelectorAll('.hobby-image img, .hobby-image-container img');
    
    hobbyImages.forEach(image => {
        image.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        image.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Standardize animation duration for all hobby categories
    const animationDuration = 0.3; // in seconds

    // Update animation durations for all hobby categories
    document.querySelectorAll('.hobby-item').forEach(item => {
        // Set consistent animation/transition duration for all hobby items
        item.style.transitionDuration = `${animationDuration}s`;
    });
});

// Enhanced Games Showcase Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM Elements
    const prevButton = document.getElementById('prev-game');
    const nextButton = document.getElementById('next-game');
    const randomGameBtn = document.getElementById('random-game-btn');
    const currentGameNum = document.getElementById('current-game-num');
    const totalGames = document.getElementById('total-games');
    const carouselTrack = document.getElementById('game-carousel-track');
    
    // Get all game data from the hidden list
    const gameItems = document.querySelectorAll('.game-item');
    const gameData = Array.from(gameItems).map(item => ({
        id: item.getAttribute('data-game'),
        title: item.textContent,
        image: item.getAttribute('data-image'),
        developer: item.getAttribute('data-developer'),
        year: item.getAttribute('data-year'),
        genre: item.getAttribute('data-genre'),
        playTime: item.getAttribute('data-playtime'),
        favorite: item.getAttribute('data-favorite'),
        description: item.getAttribute('data-description')
    }));
    
    // Set total games count
    totalGames.textContent = gameData.length;
    
    // Current game index
    let currentIndex = 0;
    
    // Initialize carousel
    function initCarousel() {
        // Create game cards
        gameData.forEach(game => {
            const gameCard = createGameCard(game);
            carouselTrack.appendChild(gameCard);
        });
        
        // Set initial position
        updateCarousel();
    }
    
    // Create game card
    function createGameCard(game) {
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');
        gameCard.setAttribute('data-game', game.id);
        
        gameCard.innerHTML = `
            <div class="game-card-header">
                <h4 class="game-card-title">${game.title}</h4>
                <span class="game-card-tag">${game.genre}</span>
            </div>
            <div class="game-card-body">
                <div class="game-card-info">
                    <div class="game-card-image">
                        <img src="${game.image}" alt="${game.title}" onerror="this.src='images/hobbies/placeholder.jpg'">
                    </div>
                </div>
                <div class="game-card-description">
                    <p>${game.description}</p>
                </div>
                <div class="game-card-notes">
                    <p><i class="fas fa-star"></i> <strong>My favorite:</strong> ${game.favorite}</p>
                </div>
            </div>
        `;
        
        return gameCard;
    }
    
    // Update carousel position
    function updateCarousel() {
        // Update card visibility
        document.querySelectorAll('.game-card').forEach((card, index) => {
            if (index === currentIndex) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
        
        // Transform the carousel track
        carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update counter
        currentGameNum.textContent = currentIndex + 1;
    }
    
    // Navigate to previous game
    function goToPrevGame() {
        currentIndex = (currentIndex <= 0) ? gameData.length - 1 : currentIndex - 1;
        updateCarousel();
    }
    
    // Navigate to next game
    function goToNextGame() {
        currentIndex = (currentIndex >= gameData.length - 1) ? 0 : currentIndex + 1;
        updateCarousel();
    }
    
    // Random game
    function goToRandomGame() {
        const randomIndex = Math.floor(Math.random() * gameData.length);
        currentIndex = randomIndex;
        updateCarousel();
    }
    
    // Navigate to specific game
    function goToGame(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    // Event listeners
    prevButton.addEventListener('click', goToPrevGame);
    nextButton.addEventListener('click', goToNextGame);
    randomGameBtn.addEventListener('click', goToRandomGame);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            goToPrevGame();
        } else if (e.key === 'ArrowRight') {
            goToNextGame();
        }
    });
    
    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.querySelector('.carousel-viewport').addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.querySelector('.carousel-viewport').addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) {
            goToNextGame(); // Swipe left
        } else if (touchEndX > touchStartX + threshold) {
            goToPrevGame(); // Swipe right
        }
    }
    
    // Initialize
    initCarousel();
});

// Single Game View Functionality
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('games-carousel');
    const prevBtn = document.getElementById('prev-games');
    const nextBtn = document.getElementById('next-games');
    const randomBtn = document.getElementById('random-game');
    const dotsContainer = document.getElementById('carousel-dots');
    
    if(!carousel || !dotsContainer) return; // Exit if elements don't exist
    
    // Get all game cards
    const cards = carousel.querySelectorAll('.game-simple-card');
    const totalCards = cards.length;
    
    // Current position
    let currentIndex = 0;
    
    // Create indicator dots
    for(let i = 0; i < totalCards; i++) {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if(i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showGame(i));
        dotsContainer.appendChild(dot);
    }
    
    // Initialize - hide all cards except the first one
    cards.forEach((card, index) => {
        card.style.display = index === 0 ? 'block' : 'none';
    });
    
    // Update dots based on current game
    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Show specific game
    function showGame(index) {
        // Hide current game
        cards[currentIndex].style.display = 'none';
        
        // Update index
        currentIndex = index;
        
        // Show new game with fade-in effect
        const currentCard = cards[currentIndex];
        currentCard.style.opacity = '0';
        currentCard.style.display = 'block';
        
        setTimeout(() => {
            currentCard.style.opacity = '1';
        }, 10);
        
        // Update dots
        updateDots();
    }
    
    // Navigate to previous game
    function prevGame() {
        const newIndex = (currentIndex - 1 + totalCards) % totalCards;
        showGame(newIndex);
    }
    
    // Navigate to next game
    function nextGame() {
        const newIndex = (currentIndex + 1) % totalCards;
        showGame(newIndex);
    }
    
    // Pick a random game
    function randomGame() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * totalCards);
        } while (newIndex === currentIndex && totalCards > 1);
        
        showGame(newIndex);
    }
    
    // Add event listeners
    prevBtn.addEventListener('click', prevGame);
    nextBtn.addEventListener('click', nextGame);
    randomBtn.addEventListener('click', randomGame);
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Check if focus is in the games section
        const gamesBox = document.querySelector('.games-box');
        const rect = gamesBox.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if(isInViewport) {
            if(e.key === 'ArrowLeft') prevGame();
            if(e.key === 'ArrowRight') nextGame();
        }
    });
    
    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const threshold = 50;
        if(touchEndX < touchStartX - threshold) {
            nextGame(); // Swipe left
        } else if(touchEndX > touchStartX + threshold) {
            prevGame(); // Swipe right
        }
    }
    
    // Add fade transition to all cards
    cards.forEach(card => {
        card.style.transition = 'opacity 0.3s ease';
    });
});

// Add these animations to the CSS file
document.head.insertAdjacentHTML('beforeend', `
<style>
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
</style>
`);
