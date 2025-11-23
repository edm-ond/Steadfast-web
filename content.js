// Video data - UPDATE WITH YOUR LOCAL VIDEOS
// Replace the sample data with your actual videos in your folder
const videos = [
    {
        title: "Understanding Male Depression",
        duration: "18:42",
        category: "Depression",
        description: "Learn about the unique ways depression manifests in men and how to recognize the signs.",
        thumbnailText: "Depression Awareness",
        videoFile: "videos/depression-awareness.mp4" // UPDATE WITH YOUR VIDEO FILE PATH
    },
    {
        title: "Managing Anger Constructively",
        duration: "22:15",
        category: "Anger Management",
        description: "Healthy ways to process and express anger without damaging relationships.",
        thumbnailText: "Anger Management",
        videoFile: "videos/anger-management.mp4" // UPDATE WITH YOUR VIDEO FILE PATH
    },
    {
        title: "Building Emotional Resilience",
        duration: "25:30",
        category: "Resilience",
        description: "Strategies to develop mental toughness and bounce back from life's challenges.",
        thumbnailText: "Emotional Resilience",
        videoFile: "videos/emotional-resilience.mp4" // UPDATE WITH YOUR VIDEO FILE PATH
    },
    {
        title: "Breaking the Stigma of Therapy",
        duration: "16:50",
        category: "Therapy",
        description: "Why therapy is a sign of strength, not weakness, for men.",
        thumbnailText: "Therapy Benefits",
        videoFile: "videos/therapy-benefits.mp4" // UPDATE WITH YOUR VIDEO FILE PATH
    },
    {
        title: "Mindfulness for Busy Men",
        duration: "14:20",
        category: "Mindfulness",
        description: "Simple mindfulness practices that fit into a busy schedule.",
        thumbnailText: "Mindfulness",
        videoFile: "videos/mindfulness.mp4" // UPDATE WITH YOUR VIDEO FILE PATH
    }
    // ADD MORE VIDEOS HERE AS NEEDED
];

// Book data - UPDATE WITH YOUR BOOK RECOMMENDATIONS
const books = [
    {
        title: "The Mask of Masculinity",
        author: "Lewis Howes",
        category: "Masculinity",
        description: "How men can break free from the stereotypes that limit their emotional expression.",
        imageText: "Mask of Masculinity",
        bookUrl: "#" // ADD YOUR BOOK LINK HERE
    },
    {
        title: "Daring Greatly",
        author: "Brené Brown",
        category: "Vulnerability",
        description: "How the courage to be vulnerable transforms the way we live, love, and lead.",
        imageText: "Daring Greatly",
        bookUrl: "#" // ADD YOUR BOOK LINK HERE
    },
    {
        title: "The Way of the Superior Man",
        author: "David Deida",
        category: "Purpose",
        description: "A spiritual guide to mastering the challenges of women, work, and sexual desire.",
        imageText: "Superior Man",
        bookUrl: "#" // ADD YOUR BOOK LINK HERE
    },
    {
        title: "Lost Connections",
        author: "Johann Hari",
        category: "Depression",
        description: "Uncovering the real causes of depression and the unexpected solutions.",
        imageText: "Lost Connections",
        bookUrl: "#" // ADD YOUR BOOK LINK HERE
    },
    {
        title: "Iron John: A Book About Men",
        author: "Robert Bly",
        category: "Masculinity",
        description: "A groundbreaking look at masculinity through myth and story.",
        imageText: "Iron John",
        bookUrl: "#" // ADD YOUR BOOK LINK HERE
    },
    {
        title: "The Resilience Factor",
        author: "Karen Reivich & Andrew Shatte",
        category: "Resilience",
        description: "7 keys to finding your inner strength and overcoming life's hurdles.",
        imageText: "Resilience Factor",
        bookUrl: "#" // ADD YOUR BOOK LINK HERE
    }
    // ADD MORE BOOKS HERE AS NEEDED
];

// Modal elements
const modal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const modalVideoTitle = document.getElementById('modalVideoTitle');
const modalVideoDescription = document.getElementById('modalVideoDescription');
const closeBtn = document.querySelector('.close');

// Populate content when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Populate videos
    const videosGrid = document.getElementById('videos-grid');
    videos.forEach(video => {
        const card = createVideoCard(video);
        videosGrid.appendChild(card);
    });
    
    // Populate books
    const booksGrid = document.getElementById('books-grid');
    books.forEach(book => {
        const card = createBookCard(book);
        booksGrid.appendChild(card);
    });
    
    // Set up modal event listeners
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
});

function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.setAttribute('data-video', video.videoFile);
    card.setAttribute('data-title', video.title);
    card.setAttribute('data-description', video.description);
    
    card.innerHTML = `
        <div class="video-thumbnail">
            <div class="play-icon">▶</div>
            <span>${video.thumbnailText}</span>
        </div>
        <div class="video-content">
            <h3 class="video-title">${video.title}</h3>
            <div class="video-meta">
                <span>${video.duration}</span>
                <span>${video.category}</span>
            </div>
            <p class="video-description">${video.description}</p>
            <button class="video-button watch-btn">Watch Now</button>
        </div>
    `;
    
    // Add click event to the card and button
    const watchBtn = card.querySelector('.watch-btn');
    watchBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        openModal(video);
    });
    
    card.addEventListener('click', function() {
        openModal(video);
    });
    
    return card;
}

function createBookCard(book) {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
        <div class="book-cover">
            ${book.imageText}
        </div>
        <div class="book-content">
            <h3 class="book-title">${book.title}</h3>
            <div class="book-meta">
                <span>${book.author}</span>
                <span>${book.category}</span>
            </div>
            <p class="book-description">${book.description}</p>
            <a href="${book.bookUrl}" class="book-button" target="_blank">Learn More</a>
        </div>
    `;
    return card;
}

function openModal(video) {
    modalVideo.src = video.videoFile;
    modalVideoTitle.textContent = video.title;
    modalVideoDescription.textContent = video.description;
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
    modalVideo.pause();
    modalVideo.currentTime = 0;
}
// Games data - ADD YOUR GAMES HERE
const games = [
    {
        title: "Mood Tracker",
        category: "Self-Awareness",
        duration: "5 min",
        description: "Track and visualize your daily moods to identify patterns and triggers.",
        icon: "📊",
        features: [
            "Daily mood logging",
            "Pattern recognition",
            "Progress tracking"
        ],
        instructions: [
            "Rate your current mood on a scale of 1-10",
            "Add notes about what influenced your mood",
            "Review your mood patterns weekly",
            "Identify triggers and positive influences"
        ],
        playText: "Start Tracking",
        gameType: "tool"
    },
    {
        title: "Breathing Exercise",
        category: "Stress Relief",
        duration: "3 min",
        description: "Guided breathing exercises to calm your nervous system and reduce anxiety.",
        icon: "🌬️",
        features: [
            "4-7-8 breathing technique",
            "Visual guidance",
            "Calming audio"
        ],
        instructions: [
            "Find a comfortable seated position",
            "Follow the visual guide for inhale and exhale",
            "Inhale for 4 seconds, hold for 7, exhale for 8",
            "Repeat for 5-10 cycles"
        ],
        playText: "Start Breathing",
        gameType: "interactive"
    },
    {
        title: "Gratitude Journal",
        category: "Positive Psychology",
        duration: "5 min",
        description: "Cultivate positivity by regularly noting things you're grateful for.",
        icon: "🙏",
        features: [
            "Daily gratitude prompts",
            "Private journaling",
            "Reflection exercises"
        ],
        instructions: [
            "Write down 3 things you're grateful for today",
            "Be specific and detailed in your entries",
            "Reflect on why each item matters to you",
            "Review past entries when feeling down"
        ],
        playText: "Start Journaling",
        gameType: "tool"
    },
    {
        title: "Stress Buster",
        category: "Anxiety Management",
        duration: "10 min",
        description: "Interactive exercises to release tension and manage stressful moments.",
        icon: "💥",
        features: [
            "Progressive muscle relaxation",
            "Mindful distraction techniques",
            "Quick stress relief tools"
        ],
        instructions: [
            "Identify your current stress level",
            "Choose an exercise based on your needs",
            "Follow the guided instructions",
            "Reassess your stress level after"
        ],
        playText: "Bust Stress",
        gameType: "interactive"
    },
    {
        title: "Mindfulness Challenge",
        category: "Mindfulness",
        duration: "7 days",
        description: "A 7-day mindfulness challenge to build consistent meditation practice.",
        icon: "🧠",
        features: [
            "Daily guided meditations",
            "Progress tracking",
            "Community support"
        ],
        instructions: [
            "Commit to 7 consecutive days",
            "Start with 5-minute sessions",
            "Use the provided guided meditations",
            "Reflect on your experience daily"
        ],
        playText: "Start Challenge",
        gameType: "challenge"
    },
    {
        title: "Positive Habits Builder",
        category: "Personal Growth",
        duration: "21 days",
        description: "Build lasting positive habits with this 21-day habit formation program.",
        icon: "🌟",
        features: [
            "Habit tracking",
            "Daily reminders",
            "Milestone celebrations"
        ],
        instructions: [
            "Choose one positive habit to focus on",
            "Set realistic daily goals",
            "Track your consistency",
            "Celebrate small wins along the way"
        ],
        playText: "Build Habits",
        gameType: "program"
    }
];

// Game Modal Elements
const gameModal = document.createElement('div');
gameModal.id = 'gameModal';
gameModal.innerHTML = `
    <div class="game-modal-content">
        <span class="close game-close">&times;</span>
        <h2 class="game-modal-title" id="gameModalTitle"></h2>
        <p class="game-modal-description" id="gameModalDescription"></p>
        <div class="game-instructions">
            <h4>How to Play:</h4>
            <ol id="gameModalInstructions"></ol>
        </div>
        <div class="game-actions">
            <button class="game-button" id="gameModalPlay">Play Now</button>
            <button class="game-button secondary" id="gameModalClose">Maybe Later</button>
        </div>
    </div>
`;
document.body.appendChild(gameModal);

// Update the DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // ... existing video and book code ...
    
    // Populate games
    const gamesGrid = document.getElementById('games-grid');
    games.forEach(game => {
        const card = createGameCard(game);
        gamesGrid.appendChild(card);
    });
    
    // Set up game modal event listeners
    const gameCloseBtn = document.querySelector('.game-close');
    const gameModalCloseBtn = document.getElementById('gameModalClose');
    
    gameCloseBtn.addEventListener('click', closeGameModal);
    gameModalCloseBtn.addEventListener('click', closeGameModal);
    window.addEventListener('click', function(event) {
        if (event.target === gameModal) {
            closeGameModal();
        }
    });
    
    // Play button event listener
    document.getElementById('gameModalPlay').addEventListener('click', function() {
        alert('Starting the game! In a real app, this would launch the interactive experience.');
        closeGameModal();
    });
});

// Create Game Card Function
function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.setAttribute('data-game', game.title);
    
    card.innerHTML = `
        <div class="game-image ${game.category.toLowerCase().replace(' ', '-')}">
            <div class="game-icon">${game.icon}</div>
        </div>
        <div class="game-content">
            <h3 class="game-title">${game.title}</h3>
            <div class="game-meta">
                <span>${game.category}</span>
                <span>${game.duration}</span>
            </div>
            <p class="game-description">${game.description}</p>
            <div class="game-features">
                <ul>
                    ${game.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            <button class="game-button play-game-btn">${game.playText}</button>
        </div>
    `;
    
    // Add click event to the play button
    const playBtn = card.querySelector('.play-game-btn');
    playBtn.addEventListener('click', function() {
        openGameModal(game);
    });
    
    return card;
}

// Game Modal Functions
function openGameModal(game) {
    document.getElementById('gameModalTitle').textContent = game.title;
    document.getElementById('gameModalDescription').textContent = game.description;
    
    const instructionsList = document.getElementById('gameModalInstructions');
    instructionsList.innerHTML = '';
    game.instructions.forEach(instruction => {
        const li = document.createElement('li');
        li.textContent = instruction;
        instructionsList.appendChild(li);
    });
    
    document.getElementById('gameModalPlay').textContent = game.playText;
    gameModal.style.display = 'block';
}

function closeGameModal() {
    gameModal.style.display = 'none';
}