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
    
    // Clear existing dots before creating new ones
    dotsContainer.innerHTML = '';
    
    // Create indicator dots - exactly one per game card
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
            // Play the sound for the newly displayed game
            playGameSound(currentCard.querySelector('h4').textContent);
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

document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...

    // Game carousel functionality
    const gamesCarousel = document.getElementById('games-carousel');
    const prevButton = document.getElementById('prev-games');
    const nextButton = document.getElementById('next-games');
    const randomButton = document.getElementById('random-game');
    const dotsContainer = document.getElementById('carousel-dots');
    
    // Get all game cards
    const gameCards = document.querySelectorAll('.game-simple-card');
    const totalGames = gameCards.length;
    
    // Sound functionality
    const soundEnabled = localStorage.getItem('game-sounds') !== 'disabled';
    let currentlyPlaying = null;
    
    // Game sound mapping
    const gameSounds = {
        'Red Dead Redemption': 'rdr.mp3',
        'Red Dead Redemption 2': 'rdr2.mp3',
        'GTA Vice City': 'gtavc.mp3',
        'GTA 5': 'gta5.mp3',
        'Far Cry 5': 'fc5.mp3',
        'Far Cry 6': 'fc6.mp3',
        'AC Mirage': 'acm.mp3',
        'AC Valhalla': 'acv.mp3',
        'BGMI': 'bgmi.mp3',
        'Call of Duty': 'cod.mp3',
        'Among Us': 'amongus.mp3',
        'Mystery Game': 'mystery.mp3'
    };
    
    // Create sound toggle button
    const soundToggle = document.createElement('button');
    soundToggle.className = 'sound-toggle';
    soundToggle.innerHTML = soundEnabled ? 
        '<i class="fas fa-volume-up"></i>' : 
        '<i class="fas fa-volume-mute"></i>';
    soundToggle.setAttribute('aria-label', soundEnabled ? 'Mute game sounds' : 'Enable game sounds');
    soundToggle.setAttribute('title', soundEnabled ? 'Mute game sounds' : 'Enable game sounds');
    
    // Add sound toggle to controls
    document.querySelector('.games-controls').prepend(soundToggle);
    
    // Sound toggle functionality
    soundToggle.addEventListener('click', function() {
        const newState = localStorage.getItem('game-sounds') !== 'disabled' ? 'disabled' : 'enabled';
        localStorage.setItem('game-sounds', newState);
        
        // Update button appearance
        if (newState === 'disabled') {
            this.innerHTML = '<i class="fas fa-volume-mute"></i>';
            this.setAttribute('aria-label', 'Enable game sounds');
            this.setAttribute('title', 'Enable game sounds');
            // Stop any playing sound
            if (currentlyPlaying) {
                currentlyPlaying.pause();
                currentlyPlaying.currentTime = 0;
            }
        } else {
            this.innerHTML = '<i class="fas fa-volume-up"></i>';
            this.setAttribute('aria-label', 'Mute game sounds');
            this.setAttribute('title', 'Mute game sounds');
            // Play sound for current game
            playGameSound(getCurrentGameName());
        }
    });
    
    // Function to get current visible game name
    function getCurrentGameName() {
        // For the single-game view (where cards are displayed or hidden)
        const visibleCard = document.querySelector('.game-simple-card[style*="display: block"]');
        if (visibleCard) {
            return visibleCard.querySelector('h4').textContent;
        }
        
        // Fallback to the scroll position method
        const visibleGameIndex = currentIndex;
        const visibleGame = gameCards[visibleGameIndex];
        if (visibleGame) {
            return visibleGame.querySelector('h4').textContent;
        }
        
        return null;
    }
    
    // Function to play sound for a specific game
    function playGameSound(gameName) {
        if (!gameName || localStorage.getItem('game-sounds') === 'disabled') return;
        
        console.log('Playing sound for:', gameName); // Debug log
        
        // Stop any currently playing sound
        if (currentlyPlaying) {
            currentlyPlaying.pause();
            currentlyPlaying.currentTime = 0;
        }
        
        // Check if the game has a sound defined
        if (gameSounds[gameName]) {
            // Create audio path
            const audioPath = `audio/${gameSounds[gameName]}`;
            
            // Create and play the new sound without fetch check
            const audio = new Audio(audioPath);
            audio.volume = 0.5; // Set to 50% volume
            audio.play().catch(error => {
                console.log(`Error playing sound: ${error.message}`);
            });
            currentlyPlaying = audio;
        }
    }
    
    // Calculate single card width including margin
    const cardWidth = gameCards[0].offsetWidth + 20; // 20px for margin
    let currentIndex = 0;
    
    // Ensure correct ordering of games (RDR first, Mystery last)
    function reorderGames() {
        const gamesList = Array.from(gameCards);
        const container = gameCards[0].parentElement;
        
        // Find RDR and Mystery Game cards
        let rdrCard = null;
        let mysteryCard = null;
        
        gamesList.forEach(card => {
            const title = card.querySelector('h4').textContent;
            if (title === 'Red Dead Redemption') {
                rdrCard = card;
            } else if (title === 'Mystery Game') {
                mysteryCard = card;
            }
        });
        
        // If both cards exist, reorder them
        if (rdrCard && mysteryCard) {
            // Move RDR to the beginning
            container.insertBefore(rdrCard, container.firstChild);
            
            // Move Mystery to the end
            container.appendChild(mysteryCard);
            
            // Reset current index to ensure we're at the first game
            currentIndex = 0;
            
            // Update the display of all cards
            gameCards.forEach((card, index) => {
                card.style.display = index === 0 ? 'block' : 'none';
            });
        }
    }
    
    // Call reordering function
    reorderGames();
    
    // Clear existing dots to prevent duplicates
    dotsContainer.innerHTML = '';
    
    // Create dots for carousel - exactly one per game
    for (let i = 0; i < totalGames; i++) {
        const dot = document.createElement('span');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToGame(i);
        });
        dotsContainer.appendChild(dot);
    }
    
    function updateDots() {
        const dots = document.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToGame(index) {
        currentIndex = index;
        
        // Hide all cards first
        gameCards.forEach(card => {
            card.style.display = 'none';
        });
        
        // Show only the selected card
        gameCards[index].style.display = 'block';
        gameCards[index].style.opacity = '1';
        
        // Update scroll position for horizontal layouts
        gamesCarousel.scrollTo({
            left: index * cardWidth,
            behavior: 'smooth'
        });
        
        // Update dots
        updateDots();
        
        // Play sound for the selected game
        setTimeout(() => {
            playGameSound(gameCards[index].querySelector('h4').textContent);
        }, 300); // Small delay to ensure display completes
    }
    
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            goToGame(currentIndex - 1);
        } else {
            goToGame(totalGames - 1); // Loop to the end
        }
    });
    
    nextButton.addEventListener('click', () => {
        if (currentIndex < totalGames - 1) {
            goToGame(currentIndex + 1);
        } else {
            goToGame(0); // Loop to the beginning
        }
    });
    
    randomButton.addEventListener('click', () => {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * totalGames);
        } while (randomIndex === currentIndex && totalGames > 1);
        
        goToGame(randomIndex);
        // Ensure dots are updated after random selection
        updateDots();
    });
    
    // Detect when scroll ends to play sound
    let scrollTimeout;
    gamesCarousel.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            currentIndex = Math.round(gamesCarousel.scrollLeft / cardWidth);
            updateDots();
            playGameSound(getCurrentGameName());
        }, 150);
    });

    // ...existing code...
});
