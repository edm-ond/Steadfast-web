// Simple authentication system using localStorage
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        // Check if user is already logged in
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateUI();
        }
    }

    // User registration
    register(name, email, password) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if user already exists
        if (users.find(user => user.email === email)) {
            return { success: false, message: 'User already exists' };
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            password: password, // In real app, this would be hashed
            joined: new Date().toISOString(),
            preferences: {
                theme: 'light',
                notifications: true,
                dailyReminders: true
            }
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Auto login after registration
        this.login(email, password);
        
        return { success: true, message: 'Account created successfully!' };
    }

    // User login
    login(email, password) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.updateUI();
            return { success: true, message: 'Login successful!' };
        } else {
            return { success: false, message: 'Invalid email or password' };
        }
    }

    // User logout
    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.updateUI();
        showNotification('Logged out successfully', 'info');
    }

    // Update UI based on login state
    updateUI() {
        const loginBtn = document.getElementById('loginBtn');
        const userMenu = document.getElementById('userMenu');
        const userName = document.getElementById('userName');
        
        if (this.currentUser && loginBtn && userMenu) {
            loginBtn.style.display = 'none';
            userMenu.style.display = 'block';
            if (userName) {
                userName.textContent = this.currentUser.name;
            }
            
            // Update dashboard welcome message
            const welcomeMsg = document.getElementById('welcomeMessage');
            if (welcomeMsg) {
                welcomeMsg.textContent = `Welcome back, ${this.currentUser.name}`;
            }
        } else if (loginBtn && userMenu) {
            loginBtn.style.display = 'block';
            userMenu.style.display = 'none';
        }
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.currentUser !== null;
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Update user preferences
    updatePreferences(newPreferences) {
        if (!this.currentUser) return;
        
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);
        
        if (userIndex !== -1) {
            users[userIndex].preferences = { ...users[userIndex].preferences, ...newPreferences };
            this.currentUser.preferences = users[userIndex].preferences;
            
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            
            showNotification('Preferences updated!', 'success');
        }
    }
}

// Initialize auth system
const auth = new AuthSystem();
// Add to AuthSystem class
applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('preferredTheme', theme);
}

// Update the init method to apply theme
init() {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        this.currentUser = JSON.parse(savedUser);
        this.updateUI();
        // Apply user's preferred theme
        this.applyTheme(this.currentUser.preferences.theme);
    } else {
        // Apply system preference or default theme
        const preferredTheme = localStorage.getItem('preferredTheme') || 'light';
        this.applyTheme(preferredTheme);
    }
}

// Update the updatePreferences method to apply theme changes
updatePreferences(newPreferences) {
    if (!this.currentUser) return;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === this.currentUser.id);
    
    if (userIndex !== -1) {
        users[userIndex].preferences = { ...users[userIndex].preferences, ...newPreferences };
        this.currentUser.preferences = users[userIndex].preferences;
        
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        
        // Apply theme if it was changed
        if (newPreferences.theme) {
            this.applyTheme(newPreferences.theme);
        }
        
        showNotification('Preferences updated!', 'success');
    }
}
// Add this method to AuthSystem class
detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

// Update the init method to handle auto theme
init() {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        this.currentUser = JSON.parse(savedUser);
        this.updateUI();
        
        // Apply user's preferred theme
        let theme = this.currentUser.preferences.theme;
        if (theme === 'auto') {
            theme = this.detectSystemTheme();
        }
        this.applyTheme(theme);
    } else {
        // Apply system preference or default theme
        const preferredTheme = localStorage.getItem('preferredTheme') || 'light';
        this.applyTheme(preferredTheme);
    }
    
    // Listen for system theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            const user = this.getCurrentUser();
            if (user && user.preferences.theme === 'auto') {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
}
// Add to AuthSystem class in auth.js

// Reminder system
setupReminders() {
    if (!this.currentUser) return;
    
    // Clear any existing reminders
    this.clearReminders();
    
    // If reminders are enabled, set them up
    if (this.currentUser.preferences.dailyReminders) {
        this.scheduleMoodReminder();
        this.scheduleDrillReminder();
        this.checkForPendingReminders();
    }
}

scheduleMoodReminder() {
    // Schedule mood check for 9 AM daily
    const now = new Date();
    const reminderTime = new Date();
    reminderTime.setHours(9, 0, 0, 0); // 9:00 AM
    
    // If it's already past 9 AM, schedule for tomorrow
    if (now > reminderTime) {
        reminderTime.setDate(reminderTime.getDate() + 1);
    }
    
    const timeUntilReminder = reminderTime - now;
    
    setTimeout(() => {
        this.showMoodReminder();
        // Reschedule for next day
        this.scheduleMoodReminder();
    }, timeUntilReminder);
    
    console.log('Mood reminder scheduled for:', reminderTime);
}

scheduleDrillReminder() {
    // Schedule drill reminder for 3 PM daily
    const now = new Date();
    const reminderTime = new Date();
    reminderTime.setHours(15, 0, 0, 0); // 3:00 PM
    
    // If it's already past 3 PM, schedule for tomorrow
    if (now > reminderTime) {
        reminderTime.setDate(reminderTime.getDate() + 1);
    }
    
    const timeUntilReminder = reminderTime - now;
    
    setTimeout(() => {
        this.showDrillReminder();
        // Reschedule for next day
        this.scheduleDrillReminder();
    }, timeUntilReminder);
    
    console.log('Drill reminder scheduled for:', reminderTime);
}

showMoodReminder() {
    if (!this.currentUser?.preferences.dailyReminders) return;
    
    // Check if user already logged mood today
    const today = new Date().toDateString();
    const moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
    const todayMood = moodHistory.find(entry => 
        new Date(entry.date).toDateString() === today
    );
    
    if (!todayMood) {
        this.showNotification(
            'Daily Check-in', 
            'How are you feeling today? Take a moment to log your mood.', 
            'mood'
        );
    }
}

showDrillReminder() {
    if (!this.currentUser?.preferences.dailyReminders) return;
    
    this.showNotification(
        'Mental Fitness Time', 
        'Ready for a quick 5-minute drill? Boost your mental fitness!', 
        'drill'
    );
}

showNotification(title, message, type = 'info') {
    // Check if browser notifications are supported and permitted
    if ('Notification' in window && Notification.permission === 'granted') {
        const notification = new Notification(title, {
            body: message,
            icon: '/icon.png', // You can add a favicon later
            tag: type // Allows replacing same-type notifications
        });
        
        notification.onclick = () => {
            window.focus();
            this.handleNotificationClick(type);
            notification.close();
        };
        
        // Auto close after 10 seconds
        setTimeout(() => notification.close(), 10000);
        
    } else {
        // Fallback to in-app notification
        this.showInAppReminder(title, message, type);
    }
}

showInAppReminder(title, message, type) {
    const reminder = document.createElement('div');
    reminder.className = `reminder-alert alert alert-${this.getAlertType(type)}`;
    reminder.innerHTML = `
        <div class="d-flex justify-content-between align-items-start">
            <div>
                <h6 class="alert-heading">${title}</h6>
                <p class="mb-2">${message}</p>
                <div class="reminder-actions">
                    ${this.getReminderActions(type)}
                </div>
            </div>
            <button type="button" class="btn-close" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;
    
    reminder.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 1060;
        min-width: 300px;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(reminder);
    
    // Auto remove after 15 seconds
    setTimeout(() => {
        if (reminder.parentElement) {
            reminder.remove();
        }
    }, 15000);
}

getAlertType(type) {
    const types = {
        'mood': 'info',
        'drill': 'success',
        'info': 'info',
        'warning': 'warning'
    };
    return types[type] || 'info';
}

getReminderActions(type) {
    if (type === 'mood') {
        return `
            <button class="btn btn-sm btn-outline-primary me-2" onclick="auth.handleMoodReminderAction('log')">
                Log Mood
            </button>
            <button class="btn btn-sm btn-outline-secondary" onclick="auth.handleMoodReminderAction('snooze')">
                Remind Later
            </button>
        `;
    } else if (type === 'drill') {
        return `
            <button class="btn btn-sm btn-outline-success me-2" onclick="auth.handleDrillReminderAction('start')">
                Start Drill
            </button>
            <button class="btn btn-sm btn-outline-secondary" onclick="auth.handleDrillReminderAction('snooze')">
                Later
            </button>
        `;
    }
    return '';
}

handleNotificationClick(type) {
    if (type === 'mood') {
        this.showMoodModal();
    } else if (type === 'drill') {
        this.showDrillModal();
    }
}

handleMoodReminderAction(action) {
    const reminder = event.target.closest('.reminder-alert');
    if (reminder) reminder.remove();
    
    if (action === 'log') {
        this.showMoodModal();
    } else if (action === 'snooze') {
        // Snooze for 1 hour
        setTimeout(() => this.showMoodReminder(), 60 * 60 * 1000);
    }
}

handleDrillReminderAction(action) {
    const reminder = event.target.closest('.reminder-alert');
    if (reminder) reminder.remove();
    
    if (action === 'start') {
        this.showDrillModal();
    } else if (action === 'snooze') {
        // Snooze for 1 hour
        setTimeout(() => this.showDrillReminder(), 60 * 60 * 1000);
    }
}

showMoodModal() {
    // Focus on mood selection in dashboard
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        document.querySelector('.mood-selector')?.scrollIntoView({ behavior: 'smooth' });
        // Highlight mood buttons
        document.querySelectorAll('.mood-btn').forEach(btn => {
            btn.style.transform = 'scale(1.1)';
            setTimeout(() => btn.style.transform = 'scale(1)', 1000);
        });
    } else {
        // Navigate to dashboard
        window.location.href = 'index.html';
    }
}

showDrillModal() {
    // Navigate to toolkit and open drills
    if (window.location.pathname.includes('toolkit.html')) {
        // Highlight drills section
        document.getElementById('drills-section')?.scrollIntoView({ behavior: 'smooth' });
    } else {
        window.location.href = 'toolkit.html';
    }
}

clearReminders() {
    // Clear any scheduled timeouts
    // In a real app, we'd track timeout IDs, but for simplicity we'll rely on the single scheduled timeout
}

checkForPendingReminders() {
    // Check if user missed any reminders today
    const now = new Date();
    const today = new Date().toDateString();
    
    // Check mood reminder (should have been done by 9 AM)
    if (now.getHours() >= 10) { // It's after 10 AM
        const moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
        const todayMood = moodHistory.find(entry => 
            new Date(entry.date).toDateString() === today
        );
        
        if (!todayMood) {
            // User missed morning mood check
            setTimeout(() => {
                this.showNotification(
                    'Missed Check-in', 
                    'You haven\'t logged your mood today. Want to do it now?', 
                    'mood'
                );
            }, 5000); // Show after 5 seconds
        }
    }
}

// Update the login method to setup reminders
login(email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.updateUI();
        this.applyTheme(user.preferences.theme);
        this.setupReminders(); // Add this line
        return { success: true, message: 'Login successful!' };
    } else {
        return { success: false, message: 'Invalid email or password' };
    }
}

// Update updatePreferences to handle reminder changes
updatePreferences(newPreferences) {
    if (!this.currentUser) return;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === this.currentUser.id);
    
    if (userIndex !== -1) {
        users[userIndex].preferences = { ...users[userIndex].preferences, ...newPreferences };
        this.currentUser.preferences = users[userIndex].preferences;
        
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        
        // Apply theme if it was changed
        if (newPreferences.theme) {
            this.applyTheme(newPreferences.theme);
        }
        
        // Update reminders if preference changed
        if (newPreferences.dailyReminders !== undefined) {
            if (newPreferences.dailyReminders) {
                this.setupReminders();
            } else {
                this.clearReminders();
            }
        }
        
        showNotification('Preferences updated!', 'success');
    }
}