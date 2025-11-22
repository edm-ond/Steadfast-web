// Mood Tracking
document.addEventListener('DOMContentLoaded', function() {
    // Mood selection
    const moodButtons = document.querySelectorAll('.mood-btn');
    moodButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            moodButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const mood = this.getAttribute('data-mood');
            saveMood(mood);
        });
    });
    
    // Load saved mood if exists
    loadSavedMood();
});

function saveMood(mood) {
    const today = new Date().toDateString();
    const moodData = {
        date: today,
        mood: mood,
        timestamp: new Date().getTime()
    };
    
    // Save to localStorage
    let moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
    moodHistory.push(moodData);
    localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
    
    showNotification('Mood saved!', 'success');
}

function loadSavedMood() {
    const today = new Date().toDateString();
    const moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
    
    // Find today's mood if exists
    const todayMood = moodHistory.find(entry => 
        new Date(entry.date).toDateString() === today
    );
    
    if (todayMood) {
        const moodButton = document.querySelector(`.mood-btn[data-mood="${todayMood.mood}"]`);
        if (moodButton) {
            moodButton.classList.add('active');
        }
    }
}

// Quick Actions
function startDrill() {
    showNotification('Starting breathing exercise...', 'info');
    // In future, this will open a breathing exercise modal
    setTimeout(() => {
        showNotification('Drill completed! Great job.', 'success');
        
        // Update streak and count
        updateProgress();
    }, 3000);
}

function openJournal() {
    const journalEntry = prompt('How are you feeling right now?');
    if (journalEntry) {
        saveJournalEntry(journalEntry);
    }
}

function saveJournalEntry(entry) {
    const journalData = {
        date: new Date().toISOString(),
        entry: entry,
        timestamp: new Date().getTime()
    };
    
    let journalEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    journalEntries.push(journalData);
    localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
    
    showNotification('Journal entry saved!', 'success');
    updateProgress();
}

function updateProgress() {
    // This will update the progress stats on the page
    // For now, just show a notification
    showNotification('Progress updated!', 'info');
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1050;
        min-width: 250px;
    `;
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// Initialize app
function initApp() {
    console.log('Steadfast app initialized');
    
    // Check if first time user
    if (!localStorage.getItem('appInitialized')) {
        showNotification('Welcome to Steadfast! Track your mood daily.', 'info');
        localStorage.setItem('appInitialized', 'true');
    }
}

// Start the app
initApp();
// Add these functions to your existing script.js

// Notification function (if not already there)
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1050;
        min-width: 250px;
    `;
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}
// Auth-related functions
function showAuthTab(tab) {
    document.getElementById('loginForm').style.display = tab === 'login' ? 'block' : 'none';
    document.getElementById('signupForm').style.display = tab === 'signup' ? 'block' : 'none';
    
    // Update active tab
    document.querySelectorAll('#authTabs .nav-link').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');
}

function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showNotification('Please fill in all fields', 'warning');
        return;
    }
    
    const result = auth.login(email, password);
    showNotification(result.message, result.success ? 'success' : 'error');
    
    if (result.success) {
        const modal = bootstrap.Modal.getInstance(document.getElementById('authModal'));
        modal.hide();
        
        // Clear form
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPassword').value = '';
    }
}

function handleSignup() {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirm = document.getElementById('signupConfirm').value;
    
    if (!name || !email || !password || !confirm) {
        showNotification('Please fill in all fields', 'warning');
        return;
    }
    
    if (password !== confirm) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters', 'warning');
        return;
    }
    
    const result = auth.register(name, email, password);
    showNotification(result.message, result.success ? 'success' : 'error');
    
    if (result.success) {
        const modal = bootstrap.Modal.getInstance(document.getElementById('authModal'));
        modal.hide();
        
        // Clear form
        document.getElementById('signupName').value = '';
        document.getElementById('signupEmail').value = '';
        document.getElementById('signupPassword').value = '';
        document.getElementById('signupConfirm').value = '';
    }
}

function showPreferences() {
    const user = auth.getCurrentUser();
    if (!user) return;
    
    // Load current preferences
    document.getElementById('prefReminders').value = user.preferences.dailyReminders.toString();
    document.getElementById('prefTheme').value = user.preferences.theme;
    document.getElementById('prefNotifications').checked = user.preferences.notifications;
    
    const modal = new bootstrap.Modal(document.getElementById('preferencesModal'));
    modal.show();
}

function savePreferences() {
    const reminders = document.getElementById('prefReminders').value === 'true';
    const theme = document.getElementById('prefTheme').value;
    const notifications = document.getElementById('prefNotifications').checked;
    
    auth.updatePreferences({
        dailyReminders: reminders,
        theme: theme,
        notifications: notifications
    });
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('preferencesModal'));
    modal.hide();
}

function exportData() {
    if (!auth.isLoggedIn()) {
        showNotification('Please log in to export data', 'warning');
        return;
    }
    
    const userData = {
        moodHistory: JSON.parse(localStorage.getItem('moodHistory') || '[]'),
        journalEntries: JSON.parse(localStorage.getItem('journalEntries') || '[]'),
        therapySessions: JSON.parse(localStorage.getItem('therapySessions') || '[]'),
        myGroups: JSON.parse(localStorage.getItem('myGroups') || '[]'),
        mySquads: JSON.parse(localStorage.getItem('mySquads') || '[]'),
        myEvents: JSON.parse(localStorage.getItem('myEvents') || '[]'),
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `steadfast-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('Data exported successfully!', 'success');
}
// Theme functionality
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    if (auth.isLoggedIn()) {
        // Update user preferences
        auth.updatePreferences({ theme: newTheme });
    } else {
        // Apply theme without saving to user (guest mode)
        auth.applyTheme(newTheme);
    }
    
    updateThemeButtonText();
}

function updateThemeButtonText() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const themeText = document.getElementById('themeText');
    if (themeText) {
        themeText.textContent = currentTheme === 'light' ? 'Dark Mode' : 'Light Mode';
    }
}

// Update the initApp function to set theme button text
function initApp() {
    console.log('Steadfast app initialized');
    updateThemeButtonText();
    
    // Check if first time user
    if (!localStorage.getItem('appInitialized')) {
        showNotification('Welcome to Steadfast! Track your mood daily.', 'info');
        localStorage.setItem('appInitialized', 'true');
    }
}

// Update the showPreferences function to reflect current theme
function showPreferences() {
    const user = auth.getCurrentUser();
    if (!user) return;
    
    // Load current preferences
    document.getElementById('prefReminders').value = user.preferences.dailyReminders.toString();
    document.getElementById('prefTheme').value = user.preferences.theme;
    document.getElementById('prefNotifications').checked = user.preferences.notifications;
    
    const modal = new bootstrap.Modal(document.getElementById('preferencesModal'));
    modal.show();
}
// Theme functionality
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    if (auth.isLoggedIn()) {
        // Update user preferences
        auth.updatePreferences({ theme: newTheme });
    } else {
        // Apply theme without saving to user (guest mode)
        auth.applyTheme(newTheme);
    }
    
    updateThemeButtonText();
}

function updateThemeButtonText() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const themeText = document.getElementById('themeText');
    if (themeText) {
        themeText.textContent = currentTheme === 'light' ? 'Dark Mode' : 'Light Mode';
    }
}

// Update the initApp function to set theme button text
function initApp() {
    console.log('Steadfast app initialized');
    updateThemeButtonText();
    
    // Check if first time user
    if (!localStorage.getItem('appInitialized')) {
        showNotification('Welcome to Steadfast! Track your mood daily.', 'info');
        localStorage.setItem('appInitialized', 'true');
    }
}

// Update the showPreferences function to reflect current theme
function showPreferences() {
    const user = auth.getCurrentUser();
    if (!user) return;
    
    // Load current preferences
    document.getElementById('prefReminders').value = user.preferences.dailyReminders.toString();
    document.getElementById('prefTheme').value = user.preferences.theme;
    document.getElementById('prefNotifications').checked = user.preferences.notifications;
    
    const modal = new bootstrap.Modal(document.getElementById('preferencesModal'));
    modal.show();
}
// Chart-related functions
function initCharts() {
    // Wait a bit for the page to load completely
    setTimeout(() => {
        progressCharts.initCharts();
        updateStatsCards();
    }, 500);
}

function updateStatsCards() {
    // Update the quick stats cards
    const drillCount = localStorage.getItem('drillCount') || '0';
    const journalCount = localStorage.getItem('journalCount') || '0';
    const sessionCount = JSON.parse(localStorage.getItem('therapySessions') || '[]').length;
    const streak = calculateCurrentStreak();

    document.getElementById('totalDrills').textContent = drillCount;
    document.getElementById('totalJournal').textContent = journalCount;
    document.getElementById('totalSessions').textContent = sessionCount;
    document.getElementById('currentStreak').textContent = streak;
}

function calculateCurrentStreak() {
    const moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
    if (moodHistory.length === 0) return 0;

    // Sort by date descending
    moodHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    let streak = 0;
    let currentDate = new Date();
    
    // Check consecutive days from today backwards
    for (let i = 0; i < moodHistory.length; i++) {
        const entryDate = new Date(moodHistory[i].date);
        const expectedDate = new Date(currentDate);
        
        if (entryDate.toDateString() === expectedDate.toDateString()) {
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        } else {
            break;
        }
    }
    
    return streak;
}

function exportAllCharts() {
    // Export each chart as image
    Object.keys(progressCharts.charts).forEach(chartId => {
        progressCharts.exportChartAsImage(chartId);
    });
    showNotification('Charts exported as images!', 'success');
}

// Update the initApp function to include charts
function initApp() {
    console.log('Steadfast app initialized');
    updateThemeButtonText();
    initCharts();
    
    // Check if first time user
    if (!localStorage.getItem('appInitialized')) {
        showNotification('Welcome to Steadfast! Track your mood daily.', 'info');
        localStorage.setItem('appInitialized', 'true');
    }
}

// Update charts when new data is added (add to existing functions)
function saveMood(mood) {
    // ... existing code ...
    
    // Update charts after saving mood
    setTimeout(() => {
        progressCharts.updateCharts();
        updateStatsCards();
    }, 1000);
}

function finishDrill() {
    // ... existing code ...
    
    // Update charts after completing drill
    setTimeout(() => {
        progressCharts.updateCharts();
        updateStatsCards();
    }, 1000);
}

function saveJournalEntry(entry) {
    // ... existing code ...
    
    // Update charts after saving journal
    setTimeout(() => {
        progressCharts.updateCharts();
        updateStatsCards();
    }, 1000);
}
// Update the initApp function to initialize charts
function initApp() {
    console.log('Steadfast app initialized');
    updateThemeButtonText();
    
    // Initialize charts if on dashboard
    if (document.getElementById('moodChart')) {
        // Wait a bit for the page to load completely
        setTimeout(() => {
            progressCharts.init();
        }, 500);
    }
    
    // Check if first time user
    if (!localStorage.getItem('appInitialized')) {
        showNotification('Welcome to Steadfast! Track your mood daily.', 'info');
        localStorage.setItem('appInitialized', 'true');
    }
}

// Update the saveMood function to refresh charts
function saveMood(mood) {
    const today = new Date().toDateString();
    const moodData = {
        date: today,
        mood: mood,
        timestamp: new Date().getTime()
    };
    
    // Save to localStorage
    let moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
    moodHistory.push(moodData);
    localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
    
    showNotification('Mood saved!', 'success');
    
    // Refresh charts if they exist
    if (typeof progressCharts !== 'undefined') {
        progressCharts.refresh();
    }
}

// Update other functions that save data to refresh charts
function saveJournalEntry(entry) {
    // ... existing code ...
    
    // Refresh charts
    if (typeof progressCharts !== 'undefined') {
        progressCharts.refresh();
    }
}

function finishDrill() {
    // ... existing code ...
    
    // Refresh charts
    if (typeof progressCharts !== 'undefined') {
        progressCharts.refresh();
    }
}
// Add to script.js - Notification permission
function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                showNotification('Reminders enabled! You\'ll get daily check-ins.', 'success');
            } else {
                showNotification('Reminders will show in the app instead of popups.', 'info');
            }
        });
    }
}

// Update the handleSignup function to request notification permission
function handleSignup() {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirm = document.getElementById('signupConfirm').value;
    
    if (!name || !email || !password || !confirm) {
        showNotification('Please fill in all fields', 'warning');
        return;
    }
    
    if (password !== confirm) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters', 'warning');
        return;
    }
    
    const result = auth.register(name, email, password);
    showNotification(result.message, result.success ? 'success' : 'error');
    
    if (result.success) {
        // Request notification permission after successful signup
        setTimeout(() => {
            requestNotificationPermission();
        }, 1000);
        
        const modal = bootstrap.Modal.getInstance(document.getElementById('authModal'));
        modal.hide();
        
        // Clear form
        document.getElementById('signupName').value = '';
        document.getElementById('signupEmail').value = '';
        document.getElementById('signupPassword').value = '';
        document.getElementById('signupConfirm').value = '';
    }
}
// Add to script.js - Show test buttons in development
function showTestReminders() {
    // Only show in development (you can remove this in production)
    const testSection = document.getElementById('testReminders');
    if (testSection && window.location.hostname === 'localhost') {
        testSection.style.display = 'block';
    }
}

// Call this in your initApp function
function initApp() {
    console.log('Steadfast app initialized');
    updateThemeButtonText();
    showTestReminders(); // Add this line
    
    // Check if first time user
    if (!localStorage.getItem('appInitialized')) {
        showNotification('Welcome to Steadfast! Track your mood daily.', 'info');
        localStorage.setItem('appInitialized', 'true');
    }
}
function showPreferences() {
    const user = auth.getCurrentUser();
    if (!user) return;
    
    // Load current preferences
    document.getElementById('prefReminders').checked = user.preferences.dailyReminders;
    document.getElementById('prefTheme').value = user.preferences.theme;
    document.getElementById('prefNotifications').checked = user.preferences.notifications;
    
    // Show/hide reminder times based on reminder toggle
    toggleReminderTimes();
    
    const modal = new bootstrap.Modal(document.getElementById('preferencesModal'));
    modal.show();
}

function toggleReminderTimes() {
    const remindersEnabled = document.getElementById('prefReminders').checked;
    document.getElementById('reminderTimes').style.display = remindersEnabled ? 'block' : 'none';
}

// Add event listener for reminder toggle
document.addEventListener('DOMContentLoaded', function() {
    const reminderToggle = document.getElementById('prefReminders');
    if (reminderToggle) {
        reminderToggle.addEventListener('change', toggleReminderTimes);
    }
});
// Add to the saveMood function
function saveMood(mood) {
    const today = new Date().toDateString();
    const moodData = {
        date: today,
        mood: mood,
        timestamp: new Date().getTime()
    };
    
    let moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
    moodHistory.push(moodData);
    localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
    
    // Track achievement
    achievements.checkOnAction('mood_logged', moodHistory.length);
    
    showNotification('Mood saved!', 'success');
}

// Add achievement tracking functions
function trackDrillCompletion() {
    const drillCount = parseInt(localStorage.getItem('drillCount') || '0');
    achievements.checkOnAction('drill_completed', drillCount);
}

function trackJournalEntry() {
    const journalEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    achievements.checkOnAction('journal_created', journalEntries.length);
}

function trackGroupJoin() {
    const myGroups = JSON.parse(localStorage.getItem('myGroups') || '[]');
    achievements.checkOnAction('group_joined', myGroups.length);
}

function trackSquadJoin() {
    const mySquads = JSON.parse(localStorage.getItem('mySquads') || '[]');
    achievements.checkOnAction('squad_joined', mySquads.length);
}

function trackSessionBooking() {
    const therapySessions = JSON.parse(localStorage.getItem('therapySessions') || '[]');
    achievements.checkOnAction('session_booked', therapySessions.length);
}

// Update the initApp function
function initApp() {
    console.log('Steadfast app initialized');
    updateThemeButtonText();
    
    // Load dashboard achievements if on dashboard
    if (window.location.pathname.includes('dashboard.html') || window.location.pathname === '/') {
        loadDashboardAchievements();
    }
    
    // Check if first time user
    if (!localStorage.getItem('appInitialized')) {
        showNotification('Welcome to Steadfast! Track your mood daily.', 'info');
        localStorage.setItem('appInitialized', 'true');
    }
}

// Load dashboard achievements
function loadDashboardAchievements() {
    const container = document.getElementById('dashboardAchievements');
    if (!container) return;

    const unlocked = achievements.getUnlockedAchievements();
    const recentAchievements = unlocked.slice(-3);
    
    container.innerHTML = '';
    
    if (recentAchievements.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center">
                <p class="text-muted">Complete activities to unlock achievements!</p>
                <a href="achievements.html" class="btn btn-sm btn-primary">View Achievements</a>
            </div>
        `;
        return;
    }

    recentAchievements.forEach(achievement => {
        const col = document.createElement('div');
        col.className = 'col-4';
        col.innerHTML = `
            <div class="text-center">
                <div style="font-size: 2rem;">${achievement.icon}</div>
                <small class="d-block mt-1">${achievement.name}</small>
            </div>
        `;
        container.appendChild(col);
    });

    const totalAchievements = Object.keys(achievements.achievements).length;
    const progressElement = document.getElementById('achievementsProgress');
    if (progressElement) {
        progressElement.textContent = `${unlocked.length}/${totalAchievements} achievements unlocked`;
    }
}