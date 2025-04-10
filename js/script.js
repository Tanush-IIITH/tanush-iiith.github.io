// Script for Tanush Garg's personal website

document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    updateCopyrightYear();
    
    // Initialize animations for the About Me section
    initAboutSection();
    
    // Initialize hover effects for skill badges
    initSkillBadges();
    
    // Initialize games wheel functionality
    initGamesWheel();
});

/**
 * Updates the copyright year in the footer
 */
function updateCopyrightYear() {
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Initialize animations and interactions for the About Me section
 */
function initAboutSection() {
    // Add animation to profile picture
    const profilePicture = document.querySelector('.profile-picture img');
    if (profilePicture) {
        profilePicture.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
        });
        
        profilePicture.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        });
    }
    
    // Add animations to interest items
    const interestItems = document.querySelectorAll('.interest-item');
    interestItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.3) translateY(-3px)';
            }
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) translateY(0)';
            }
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.05)';
        });
    });
    
    // Add subtle animation to badges
    const badges = document.querySelectorAll('.badge');
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 5px 10px rgba(0, 0, 0, 0.15)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 3px 8px rgba(0, 0, 0, 0.1)';
        });
    });
}

/**
 * Initialize hover effects for skill badges
 */
function initSkillBadges() {
    const skillBadges = document.querySelectorAll('.skill-badge');
    
    skillBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.15)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

// Initialize animations for hobby items
document.querySelectorAll('.hobby-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
});

/**
 * Initialize the games showcase functionality
 * This replaces the previous wheel implementation with a more accurate carousel
 */
function initGamesWheel() {
    // Get all necessary elements
    const gameCardWrapper = document.querySelector('.game-card-wrapper');
    const gameCards = document.querySelectorAll('.game-card');
    const prevButton = document.getElementById('prev-game');
    const nextButton = document.getElementById('next-game');
    const randomButton = document.getElementById('random-game-btn');
    const showInfoButton = document.getElementById('show-game-btn');
    const selectedGameName = document.getElementById('selected-game-name');
    const selectedGameInfo = document.getElementById('selected-game-info');
    const selectionSound = document.getElementById('game-selection-sound');
    
    // If elements don't exist, exit function
    if (!gameCardWrapper || !gameCards.length) return;
    
    // Game information
    const gameInfo = {
        rdr1: {
            name: "Red Dead Redemption",
            description: "An epic Western adventure set in the American frontier. You play as John Marston, an outlaw forced to hunt down his former gang members to save his family.",
            soundId: "game-sound-rdr1"
        },
        rdr2: {
            name: "Red Dead Redemption 2",
            description: "A prequel to RDR1, following Arthur Morgan and the Van der Linde gang as they rob, fight and steal their way across America's rugged heartland to survive.",
            soundId: "game-sound-rdr2"
        },
        gtavc: {
            name: "GTA Vice City",
            description: "Set in the 1980s, this game follows Tommy Vercetti in the neon-soaked Vice City as he builds a criminal empire while seeking revenge against those who set him up.",
            soundId: "game-sound-gtavc"
        },
        gta5: {
            name: "Grand Theft Auto V",
            description: "An action-adventure game with an open world design, following three criminals as they commit heists while under pressure from government agencies.",
            soundId: "game-sound-gta5"
        },
        fc5: {
            name: "Far Cry 5",
            description: "Set in fictional Hope County, Montana, you play as a deputy sheriff confronting a doomsday cult led by the charismatic Joseph Seed.",
            soundId: "game-sound-fc5"
        },
        fc6: {
            name: "Far Cry 6",
            description: "Takes place on the fictional Caribbean island of Yara, where you fight against the regime of dictator Antón Castillo, played by Giancarlo Esposito.",
            soundId: "game-sound-fc6"
        },
        "ac-mirage": {
            name: "Assassin's Creed Mirage",
            description: "A return to the series' roots, set in 9th century Baghdad following the journey of Basim from street thief to Master Assassin.",
            soundId: "game-sound-ac-mirage"
        },
        "ac-valhalla": {
            name: "Assassin's Creed Valhalla",
            description: "Play as Eivor, a Viking raider leading their clan from Norway to England to find a new home amid the conflict of the Dark Ages.",
            soundId: "game-sound-ac-valhalla"
        },
        bgmi: {
            name: "Battlegrounds Mobile India",
            description: "The Indian version of PUBG Mobile, a battle royale game where 100 players fight to be the last one standing on an island full of weapons and vehicles.",
            soundId: "game-sound-bgmi"
        },
        cod: {
            name: "Call of Duty",
            description: "A first-person shooter series known for its cinematic single-player campaigns and competitive multiplayer modes across various historical and modern settings.",
            soundId: "game-sound-cod"
        },
        amongus: {
            name: "Among Us",
            description: "A multiplayer game of teamwork and betrayal where crewmates complete tasks while trying to identify the impostors who are secretly sabotaging the mission.",
            soundId: "game-sound-amongus"
        },
        mystery: {
            name: "Mystery Game",
            description: "Even I don't know what this game is—yet. It's a title I'm looking forward to discovering and playing soon! Whether it turns out to be an underrated indie gem or a blockbuster I somehow missed, I'm super excited to dive into it. Stay tuned, maybe it'll become one of my all-time favorites!",
            soundId: "game-sound-mystery"
        }
    };
    
    // Set up variables
    let currentIndex = 0;
    const totalCards = gameCards.length;
    
    // Function to update the carousel display
    function updateCarousel() {
        // Remove active class from all cards
        gameCards.forEach(card => card.classList.remove('active'));
        
        // Add active class to current card
        gameCards[currentIndex].classList.add('active');
        
        // Position the wrapper to center the active card
        const translateX = -currentIndex * 100;
        gameCardWrapper.style.transform = `translateX(${translateX}%)`;
        
        // Automatically display info for the currently shown game
        const selectedGame = gameCards[currentIndex].dataset.game;
        displayGameInfo(selectedGame);
    }
    
    // Function to display game info
    function displayGameInfo(gameId) {
        const game = gameInfo[gameId];
        if (!game) return;
        
        // Update the info display
        selectedGameName.textContent = game.name;
        selectedGameInfo.innerHTML = `<p>${game.description}</p>`;
        
        // Play the game sound
        const gameSound = document.getElementById(game.soundId);
        if (gameSound) {
            gameSound.currentTime = 0;
            gameSound.volume = 0.5;
            gameSound.play().catch(e => console.log("Game sound play prevented:", e));
        }
    }
    
    // Initialize the carousel and display first game's info
    updateCarousel();
    
    // Set up event listeners for navigation buttons
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
            updateCarousel();
            
            // Play selection sound
            if (selectionSound) {
                selectionSound.currentTime = 0;
                selectionSound.volume = 0.3;
                selectionSound.play().catch(e => {});
            }
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalCards;
            updateCarousel();
            
            // Play selection sound
            if (selectionSound) {
                selectionSound.currentTime = 0;
                selectionSound.volume = 0.3;
                selectionSound.play().catch(e => {});
            }
        });
    }
    
    // Set up event listener for random button
    if (randomButton) {
        randomButton.addEventListener('click', () => {
            // Generate a random index different from current
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * totalCards);
            } while (newIndex === currentIndex);
            
            currentIndex = newIndex;
            updateCarousel(); // This will now automatically update the game info too
            
            // Add animation to the selected card
            gameCards[currentIndex].classList.add('selected');
            setTimeout(() => {
                gameCards[currentIndex].classList.remove('selected');
            }, 1000);
        });
    }
    
    // Allow clicking on cards directly
    gameCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel(); // This will now automatically update the game info too
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Only proceed if the carousel is visible in viewport
        const rect = gameCardWrapper?.getBoundingClientRect();
        if (!rect || rect.bottom < 0 || rect.top > window.innerHeight) return;
        
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
            updateCarousel();
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % totalCards;
            updateCarousel();
        }
    });
}
