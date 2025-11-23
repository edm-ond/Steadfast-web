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
        // Games data - ACTUAL PLAYABLE GAMES
const games = [
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
        gameType: "interactive",
        playable: true
    },
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
            "Review your mood patterns weekly"
        ],
        playText: "Start Tracking",
        gameType: "tool",
        playable: true
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
            "Reflect on why each item matters to you"
        ],
        playText: "Start Journaling",
        gameType: "tool",
        playable: true
    },
    {
        title: "Mindfulness Bell",
        category: "Mindfulness",
        duration: "1 min",
        description: "Random mindfulness reminders throughout your day.",
        icon: "🔔",
        features: [
            "Random mindfulness prompts",
            "Customizable intervals",
            "Gentle reminders"
        ],
        instructions: [
            "Set how often you want reminders",
            "When the bell rings, pause and breathe",
            "Follow the mindfulness prompt"
        ],
        playText: "Set Reminder",
        gameType: "interactive",
        playable: true
    },
    {
        title: "Positive Affirmations",
        category: "Self-Esteem",
        duration: "2 min",
        description: "Build self-confidence with daily positive affirmations.",
        icon: "💪",
        features: [
            "Custom affirmations",
            "Daily reminders",
            "Progress tracking"
        ],
        instructions: [
            "Choose or create your affirmations",
            "Repeat them daily",
            "Track your consistency"
        ],
        playText: "Start Affirmations",
        gameType: "interactive",
        playable: true
    },
    {
        title: "Stress Wave",
        category: "Anxiety Management",
        duration: "5 min",
        description: "Visualize and release stress with interactive waves.",
        icon: "🌊",
        features: [
            "Visual stress representation",
            "Breathing synchronization",
            "Progressive release"
        ],
        instructions: [
            "Visualize your stress as a wave",
            "Breathe in as the wave grows",
            "Breathe out as the wave releases"
        ],
        playText: "Release Stress",
        gameType: "interactive",
        playable: true
    }
];

// Game Modal Elements
const gameModal = document.createElement('div');
gameModal.id = 'gameModal';
gameModal.innerHTML = `
    <div class="game-modal-content">
        <span class="close game-close">&times;</span>
        <div id="gameInstructionsView">
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
        <div id="gamePlayView" style="display: none;">
            <div id="gameContainer"></div>
            <div class="game-actions">
                <button class="game-button secondary" id="gameBackButton">Back to Instructions</button>
                <button class="game-button" id="gameRestartButton">Restart</button>
            </div>
        </div>
    </div>
`;
document.body.appendChild(gameModal);

// Current game state
let currentGame = null;
let gameInterval = null;

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
    setupGameModal();
});

function setupGameModal() {
    const gameCloseBtn = document.querySelector('.game-close');
    const gameModalCloseBtn = document.getElementById('gameModalClose');
    const gameModalPlayBtn = document.getElementById('gameModalPlay');
    const gameBackBtn = document.getElementById('gameBackButton');
    const gameRestartBtn = document.getElementById('gameRestartButton');

    gameCloseBtn.addEventListener('click', closeGameModal);
    gameModalCloseBtn.addEventListener('click', closeGameModal);
    gameModalPlayBtn.addEventListener('click', startCurrentGame);
    gameBackBtn.addEventListener('click', showGameInstructions);
    gameRestartBtn.addEventListener('click', restartCurrentGame);
    
    window.addEventListener('click', function(event) {
        if (event.target === gameModal) {
            closeGameModal();
        }
    });
}

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
    currentGame = game;
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
    
    // Show instructions view, hide play view
    document.getElementById('gameInstructionsView').style.display = 'block';
    document.getElementById('gamePlayView').style.display = 'none';
    
    gameModal.style.display = 'block';
}

function startCurrentGame() {
    if (!currentGame) return;
    
    // Hide instructions, show game
    document.getElementById('gameInstructionsView').style.display = 'none';
    document.getElementById('gamePlayView').style.display = 'block';
    
    // Load the specific game
    loadGame(currentGame);
}

function showGameInstructions() {
    document.getElementById('gameInstructionsView').style.display = 'block';
    document.getElementById('gamePlayView').style.display = 'none';
    stopCurrentGame();
}

function restartCurrentGame() {
    if (currentGame) {
        stopCurrentGame();
        loadGame(currentGame);
    }
}

function stopCurrentGame() {
    if (gameInterval) {
        clearInterval(gameInterval);
        gameInterval = null;
    }
}

function closeGameModal() {
    gameModal.style.display = 'none';
    stopCurrentGame();
    currentGame = null;
}

// GAME IMPLEMENTATIONS
function loadGame(game) {
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.innerHTML = '';
    
    switch(game.title) {
        case "Breathing Exercise":
            loadBreathingExercise(gameContainer);
            break;
        case "Mood Tracker":
            loadMoodTracker(gameContainer);
            break;
        case "Gratitude Journal":
            loadGratitudeJournal(gameContainer);
            break;
        case "Mindfulness Bell":
            loadMindfulnessBell(gameContainer);
            break;
        case "Positive Affirmations":
            loadPositiveAffirmations(gameContainer);
            break;
        case "Stress Wave":
            loadStressWave(gameContainer);
            break;
        default:
            gameContainer.innerHTML = '<p>Game coming soon!</p>';
    }
}

// 1. BREATHING EXERCISE GAME
function loadBreathingExercise(container) {
    container.innerHTML = `
        <div class="breathing-game">
            <h3>4-7-8 Breathing Exercise</h3>
            <div class="breathing-circle" id="breathingCircle">
                <div class="breathing-text" id="breathingText">Get Ready</div>
            </div>
            <div class="breathing-stats">
                <div>Cycle: <span id="cycleCount">0</span>/5</div>
                <div>Time: <span id="breathingTime">0</span>s</div>
            </div>
            <div class="breathing-controls">
                <button class="game-button" id="pauseBreathing">Pause</button>
            </div>
        </div>
    `;
    
    const circle = document.getElementById('breathingCircle');
    const text = document.getElementById('breathingText');
    const cycleCount = document.getElementById('cycleCount');
    const timeDisplay = document.getElementById('breathingTime');
    const pauseBtn = document.getElementById('pauseBreathing');
    
    let isPaused = false;
    let currentPhase = 'ready'; // ready, inhale, hold, exhale
    let timeLeft = 3; // 3 second ready period
    let cycles = 0;
    let totalTime = 0;
    
    const phaseTimes = {
        'ready': 3,
        'inhale': 4,
        'hold': 7,
        'exhale': 8
    };
    
    const phaseTexts = {
        'ready': 'Get Ready',
        'inhale': 'Breathe In',
        'hold': 'Hold',
        'exhale': 'Breathe Out'
    };
    
    function updateBreathing() {
        if (isPaused) return;
        
        totalTime++;
        timeDisplay.textContent = totalTime;
        
        if (timeLeft > 0) {
            timeLeft--;
            
            // Visual feedback
            if (currentPhase === 'inhale') {
                const scale = 1 + (1 - timeLeft / phaseTimes.inhale) * 0.5;
                circle.style.transform = `scale(${scale})`;
            } else if (currentPhase === 'exhale') {
                const scale = 1.5 - (1 - timeLeft / phaseTimes.exhale) * 0.5;
                circle.style.transform = `scale(${scale})`;
            }
            
        } else {
            // Move to next phase
            switch(currentPhase) {
                case 'ready':
                    currentPhase = 'inhale';
                    break;
                case 'inhale':
                    currentPhase = 'hold';
                    break;
                case 'hold':
                    currentPhase = 'exhale';
                    break;
                case 'exhale':
                    currentPhase = 'inhale';
                    cycles++;
                    cycleCount.textContent = cycles;
                    if (cycles >= 5) {
                        text.textContent = "Complete! 🎉";
                        clearInterval(gameInterval);
                        return;
                    }
                    break;
            }
            
            timeLeft = phaseTimes[currentPhase];
            text.textContent = phaseTexts[currentPhase];
            
            // Reset visual state
            if (currentPhase === 'inhale') {
                circle.style.transform = 'scale(1)';
            }
        }
    }
    
    pauseBtn.addEventListener('click', function() {
        isPaused = !isPaused;
        pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
    });
    
    gameInterval = setInterval(updateBreathing, 1000);
}

// 2. MOOD TRACKER GAME
function loadMoodTracker(container) {
    const moods = [
        { emoji: '😢', name: 'Sad', value: 1 },
        { emoji: '😔', name: 'Down', value: 2 },
        { emoji: '😐', name: 'Neutral', value: 3 },
        { emoji: '🙂', name: 'Okay', value: 4 },
        { emoji: '😊', name: 'Good', value: 5 },
        { emoji: '😄', name: 'Great', value: 6 },
        { emoji: '🤩', name: 'Amazing', value: 7 }
    ];
    
    container.innerHTML = `
        <div class="mood-tracker-game">
            <h3>How are you feeling today?</h3>
            <div class="mood-options">
                ${moods.map(mood => `
                    <div class="mood-option" data-value="${mood.value}">
                        <span class="mood-emoji">${mood.emoji}</span>
                        <span class="mood-name">${mood.name}</span>
                    </div>
                `).join('')}
            </div>
            <div class="mood-journal" style="display: none;">
                <h4>What's influencing your mood?</h4>
                <textarea id="moodNotes" placeholder="Write about what's affecting your mood today..."></textarea>
                <button class="game-button" id="saveMood">Save Entry</button>
            </div>
            <div class="mood-history" id="moodHistory"></div>
        </div>
    `;
    
    const moodOptions = container.querySelectorAll('.mood-option');
    const moodJournal = container.querySelector('.mood-journal');
    const moodNotes = document.getElementById('moodNotes');
    const saveMoodBtn = document.getElementById('saveMood');
    const moodHistory = document.getElementById('moodHistory');
    
    let selectedMood = null;
    
    // Load previous moods from localStorage
    loadMoodHistory();
    
    moodOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove previous selection
            moodOptions.forEach(opt => opt.classList.remove('selected'));
            // Select current
            this.classList.add('selected');
            selectedMood = this.getAttribute('data-value');
            moodJournal.style.display = 'block';
        });
    });
    
    saveMoodBtn.addEventListener('click', function() {
        if (!selectedMood) return;
        
        const moodEntry = {
            mood: selectedMood,
            notes: moodNotes.value,
            date: new Date().toISOString(),
            timestamp: Date.now()
        };
        
        // Save to localStorage
        const savedMoods = JSON.parse(localStorage.getItem('steadfastMoods') || '[]');
        savedMoods.push(moodEntry);
        localStorage.setItem('steadfastMoods', JSON.stringify(savedMoods));
        
        // Update history
        loadMoodHistory();
        
        // Reset form
        moodNotes.value = '';
        moodOptions.forEach(opt => opt.classList.remove('selected'));
        moodJournal.style.display = 'none';
        selectedMood = null;
        
        alert('Mood saved! 💫');
    });
    
    function loadMoodHistory() {
        const savedMoods = JSON.parse(localStorage.getItem('steadfastMoods') || '[]');
        
        if (savedMoods.length === 0) {
            moodHistory.innerHTML = '<p>No mood entries yet. Start tracking!</p>';
            return;
        }
        
        // Show last 5 entries
        const recentMoods = savedMoods.slice(-5).reverse();
        moodHistory.innerHTML = `
            <h4>Recent Moods:</h4>
            ${recentMoods.map(entry => {
                const mood = moods.find(m => m.value == entry.mood);
                const date = new Date(entry.date).toLocaleDateString();
                return `
                    <div class="mood-history-entry">
                        <span class="mood-emoji">${mood.emoji}</span>
                        <span class="mood-date">${date}</span>
                        ${entry.notes ? `<span class="mood-note">"${entry.notes}"</span>` : ''}
                    </div>
                `;
            }).join('')}
        `;
    }
}

// 3. GRATITUDE JOURNAL GAME
function loadGratitudeJournal(container) {
    container.innerHTML = `
        <div class="gratitude-journal-game">
            <h3>Today I'm grateful for...</h3>
            <div class="gratitude-entries">
                <input type="text" id="gratitude1" placeholder="1. Something I'm grateful for...">
                <input type="text" id="gratitude2" placeholder="2. Another thing I'm grateful for...">
                <input type="text" id="gratitude3" placeholder="3. One more thing I'm grateful for...">
            </div>
            <button class="game-button" id="saveGratitude">Save Gratitude Journal</button>
            <div class="gratitude-history" id="gratitudeHistory"></div>
        </div>
    `;
    
    const saveBtn = document.getElementById('saveGratitude');
    const gratitudeHistory = document.getElementById('gratitudeHistory');
    
    // Load previous entries
    loadGratitudeHistory();
    
    saveBtn.addEventListener('click', function() {
        const entries = [
            document.getElementById('gratitude1').value,
            document.getElementById('gratitude2').value,
            document.getElementById('gratitude3').value
        ].filter(entry => entry.trim() !== '');
        
        if (entries.length === 0) {
            alert('Please write at least one thing you're grateful for!');
            return;
        }
        
        const gratitudeEntry = {
            entries: entries,
            date: new Date().toISOString()
        };
        
        // Save to localStorage
        const savedGratitude = JSON.parse(localStorage.getItem('steadfastGratitude') || '[]');
        savedGratitude.push(gratitudeEntry);
        localStorage.setItem('steadfastGratitude', JSON.stringify(savedGratitude));
        
        // Update history
        loadGratitudeHistory();
        
        // Clear inputs
        document.getElementById('gratitude1').value = '';
        document.getElementById('gratitude2').value = '';
        document.getElementById('gratitude3').value = '';
        
        alert('Gratitude journal saved! ✨');
    });
    
    function loadGratitudeHistory() {
        const savedGratitude = JSON.parse(localStorage.getItem('steadfastGratitude') || '[]');
        
        if (savedGratitude.length === 0) {
            gratitudeHistory.innerHTML = '<p>No gratitude entries yet. Start journaling!</p>';
            return;
        }
        
        // Show last 3 entries
        const recentEntries = savedGratitude.slice(-3).reverse();
        gratitudeHistory.innerHTML = `
            <h4>Recent Gratitude:</h4>
            ${recentEntries.map(entry => {
                const date = new Date(entry.date).toLocaleDateString();
                return `
                    <div class="gratitude-history-entry">
                        <strong>${date}</strong>
                        <ul>
                            ${entry.entries.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }).join('')}
        `;
    }
}

// 4. MINDFULNESS BELL GAME
function loadMindfulnessBell(container) {
    container.innerHTML = `
        <div class="mindfulness-bell-game">
            <h3>Mindfulness Reminder</h3>
            <div class="bell-controls">
                <label>Remind me every:</label>
                <select id="bellInterval">
                    <option value="5">5 minutes</option>
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                </select>
            </div>
            <div class="bell-status" id="bellStatus">
                <p>Bell is currently <span id="bellState">off</span></p>
            </div>
            <div class="bell-actions">
                <button class="game-button" id="startBell">Start Bell</button>
                <button class="game-button secondary" id="stopBell" disabled>Stop Bell</button>
            </div>
            <div class="mindfulness-prompts" id="promptsContainer" style="display: none;">
                <h4>Mindfulness Prompt:</h4>
                <p id="currentPrompt"></p>
                <button class="game-button" id="acknowledgePrompt">I've Paused & Breathed</button>
            </div>
        </div>
    `;
    
    const startBtn = document.getElementById('startBell');
    const stopBtn = document.getElementById('stopBell');
    const bellState = document.getElementById('bellState');
    const promptsContainer = document.getElementById('promptsContainer');
    const currentPrompt = document.getElementById('currentPrompt');
    const acknowledgeBtn = document.getElementById('acknowledgePrompt');
    
    const prompts = [
        "Take three deep breaths and notice how you feel.",
        "Check in with your body. Where are you holding tension?",
        "Look around and name three things you can see.",
        "What sounds can you hear? Listen mindfully for a moment.",
        "Notice your thoughts without judgment, then let them pass.",
        "Feel your feet on the ground. Be present in this moment."
    ];
    
    let bellInterval = null;
    
    startBtn.addEventListener('click', function() {
        const interval = parseInt(document.getElementById('bellInterval').value) * 60 * 1000; // Convert to milliseconds
        
        bellInterval = setInterval(() => {
            // Show random prompt
            const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
            currentPrompt.textContent = randomPrompt;
            promptsContainer.style.display = 'block';
            
            // Optional: Add sound notification here
        }, interval);
        
        bellState.textContent = 'on';
        bellState.style.color = '#43e97b';
        startBtn.disabled = true;
        stopBtn.disabled = false;
    });
    
    stopBtn.addEventListener('click', function() {
        if (bellInterval) {
            clearInterval(bellInterval);
            bellInterval = null;
        }
        
        bellState.textContent = 'off';
        bellState.style.color = '#f5576c';
        startBtn.disabled = false;
        stopBtn.disabled = true;
        promptsContainer.style.display = 'none';
    });
    
    acknowledgeBtn.addEventListener('click', function() {
        promptsContainer.style.display = 'none';
        alert('Great job taking a mindful moment! 🧘');
    });
    }
// 5. POSITIVE AFFIRMATIONS GAME
function loadPositiveAffirmations(container) {
    const defaultAffirmations = [
        "I am worthy of love and respect",
        "I am capable of handling whatever comes my way",
        "I choose to see the good in myself and others",
        "I am constantly growing and evolving",
        "My challenges help me become stronger",
        "I deserve happiness and fulfillment",
        "I am enough just as I am",
        "I trust myself to make good decisions"
    ];
    
    container.innerHTML = `
        <div class="affirmations-game">
            <h3>Positive Affirmations</h3>
            <div class="affirmation-display">
                <div class="affirmation-card" id="affirmationCard">
                    <p id="currentAffirmation">Click next to begin</p>
                </div>
                <div class="affirmation-controls">
                    <button class="game-button secondary" id="prevAffirmation">Previous</button>
                    <button class="game-button" id="nextAffirmation">Next Affirmation</button>
                </div>
            </div>
            <div class="custom-affirmations">
                <h4>Add Your Own Affirmations:</h4>
                <input type="text" id="newAffirmation" placeholder="Write your own positive affirmation...">
                <button class="game-button" id="addAffirmation">Add</button>
            </div>
            <div class="affirmation-progress">
                <p>Affirmations viewed today: <span id="affirmationCount">0</span></p>
            </div>
        </div>
    `;
    
    const affirmationCard = document.getElementById('affirmationCard');
    const currentAffirmation = document.getElementById('currentAffirmation');
    const prevBtn = document.getElementById('prevAffirmation');
    const nextBtn = document.getElementById('nextAffirmation');
    const newAffirmationInput = document.getElementById('newAffirmation');
    const addAffirmationBtn = document.getElementById('addAffirmation');
    const affirmationCount = document.getElementById('affirmationCount');
    
    let affirmations = JSON.parse(localStorage.getItem('steadfastAffirmations') || JSON.stringify(defaultAffirmations));
    let currentIndex = 0;
    let todayCount = parseInt(localStorage.getItem('steadfastAffirmationCount') || '0');
    
    affirmationCount.textContent = todayCount;
    
    function displayAffirmation(index) {
        currentAffirmation.textContent = affirmations[index];
        currentAffirmation.style.opacity = '0';
        setTimeout(() => {
            currentAffirmation.style.opacity = '1';
        }, 200);
        
        // Update count
        todayCount++;
        affirmationCount.textContent = todayCount;
        localStorage.setItem('steadfastAffirmationCount', todayCount.toString());
    }
    
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % affirmations.length;
        displayAffirmation(currentIndex);
    });
    
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + affirmations.length) % affirmations.length;
        displayAffirmation(currentIndex);
    });
    
    addAffirmationBtn.addEventListener('click', function() {
        const newAffirmation = newAffirmationInput.value.trim();
        if (newAffirmation) {
            affirmations.push(newAffirmation);
            localStorage.setItem('steadfastAffirmations', JSON.stringify(affirmations));
            newAffirmationInput.value = '';
            alert('Affirmation added! 💫');
        }
    });
    
    // Display first affirmation
    displayAffirmation(currentIndex);
}

// 6. STRESS WAVE GAME
function loadStressWave(container) {
    container.innerHTML = `
        <div class="stress-wave-game">
            <h3>Release Your Stress</h3>
            <div class="wave-container">
                <canvas id="stressWave" width="400" height="200"></canvas>
            </div>
            <div class="wave-controls">
                <label>Stress Level: <span id="stressLevel">5</span>/10</label>
                <input type="range" id="stressSlider" min="1" max="10" value="5">
            </div>
            <div class="breathing-guide">
                <p>Breathe with the wave: Inhale as it grows, exhale as it releases</p>
                <button class="game-button" id="startWave">Start Wave</button>
                <button class="game-button secondary" id="resetWave">Reset</button>
            </div>
        </div>
    `;
    
    const canvas = document.getElementById('stressWave');
    const ctx = canvas.getContext('2d');
    const stressSlider = document.getElementById('stressSlider');
    const stressLevel = document.getElementById('stressLevel');
    const startBtn = document.getElementById('startWave');
    const resetBtn = document.getElementById('resetWave');
    
    let isAnimating = false;
    let wavePhase = 0;
    let stressValue = 5;
    
    stressSlider.addEventListener('input', function() {
        stressValue = parseInt(this.value);
        stressLevel.textContent = stressValue;
        drawWave();
    });
    
    function drawWave() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw wave based on stress level and phase
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        
        for (let x = 0; x < canvas.width; x++) {
            const y = canvas.height / 2 + 
                      Math.sin((x + wavePhase) * 0.05) * (stressValue * 5) * 
                      Math.sin(wavePhase * 0.1);
            ctx.lineTo(x, y);
        }
        
        ctx.strokeStyle = stressValue > 7 ? '#f5576c' : stressValue > 4 ? '#ffa726' : '#43e97b';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Draw calming effect when stress is low
        if (stressValue < 4) {
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, stressValue * 3, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(67, 233, 123, 0.1)';
            ctx.fill();
        }
    }
    
    function animateWave() {
        if (!isAnimating) return;
        
        wavePhase += 0.5;
        
        // Gradually reduce stress level during animation
        if (stressValue > 1 && Math.random() < 0.02) {
            stressValue--;
            stressSlider.value = stressValue;
            stressLevel.textContent = stressValue;
        }
        
        drawWave();
        requestAnimationFrame(animateWave);
    }
    
    startBtn.addEventListener('click', function() {
        isAnimating = true;
        animateWave();
        startBtn.disabled = true;
    });
    
    resetBtn.addEventListener('click', function() {
        isAnimating = false;
        stressValue = 5;
        stressSlider.value = 5;
        stressLevel.textContent = '5';
        wavePhase = 0;
        drawWave();
        startBtn.disabled = false;
    });
    
    // Initial draw
    drawWave();
}
