// Daily Reminders and Notification System
class ReminderSystem {
    constructor() {
        this.reminders = [];
        this.notificationPermission = 'default';
        this.checkPermission();
        this.loadReminders();
    }

    // Check and request notification permission
    async checkPermission() {
        if (!('Notification' in window)) {
            console.log('This browser does not support notifications');
            return false;
        }

        this.notificationPermission = Notification.permission;
        
        if (this.notificationPermission === 'default') {
            // We'll request permission when user enables reminders
            console.log('Notification permission not yet requested');
        }
        
        return this.notificationPermission === 'granted';
    }

    // Request notification permission
    async requestPermission() {
        if (!('Notification' in window)) {
            showNotification('Your browser does not support notifications', 'warning');
            return false;
        }

        try {
            const permission = await Notification.requestPermission();
            this.notificationPermission = permission;
            
            if (permission === 'granted') {
                showNotification('Notifications enabled! You will receive daily reminders.', 'success');
                return true;
            } else {
                showNotification('Notifications blocked. Enable them in browser settings to get reminders.', 'warning');
                return false;
            }
        } catch (error) {
            console.error('Error requesting notification permission:', error);
            showNotification('Error enabling notifications', 'error');
            return false;
        }
    }

    // Load reminders from localStorage
    loadReminders() {
        this.reminders = JSON.parse(localStorage.getItem('reminders') || '[]');
        
        // Set up default reminders if none exist
        if (this.reminders.length === 0) {
            this.setupDefaultReminders();
        }
        
        this.scheduleAllReminders();
    }

    // Set up default reminders
    setupDefaultReminders() {
        this.reminders = [
            {
                id: 1,
                title: 'Morning Check-in',
                message: 'How are you feeling today? Take a moment to check in with yourself.',
                time: '09:00',
                enabled: true,
                type: 'mood',
                days: [1, 2, 3, 4, 5, 6, 0] // All days
            },
            {
                id: 2,
                title: 'Daily Practice',
                message: 'Time for your daily mental fitness practice!',
                time: '18:00',
                enabled: true,
                type: 'practice',
                days: [1, 2, 3, 4, 5] // Weekdays only
            },
            {
                id: 3,
                title: 'Evening Reflection',
                message: 'Reflect on your day and write in your journal.',
                time: '21:00',
                enabled: true,
                type: 'journal',
                days: [1, 2, 3, 4, 5, 6, 0] // All days
            }
        ];
        
        this.saveReminders();
    }

    // Save reminders to localStorage
    saveReminders() {
        localStorage.setItem('reminders', JSON.stringify(this.reminders));
    }

    // Schedule all enabled reminders
    scheduleAllReminders() {
        // Clear existing timeouts
        this.clearAllReminders();
        
        this.reminders.forEach(reminder => {
            if (reminder.enabled) {
                this.scheduleReminder(reminder);
            }
        });
    }

    // Schedule a single reminder
    scheduleReminder(reminder) {
        const now = new Date();
        const [hours, minutes] = reminder.time.split(':').map(Number);
        
        // Create target time for today
        const targetTime = new Date();
        targetTime.setHours(hours, minutes, 0, 0);
        
        // If the time has already passed today, schedule for tomorrow
        if (targetTime <= now) {
            targetTime.setDate(targetTime.getDate() + 1);
        }
        
        const timeUntilReminder = targetTime.getTime() - now.getTime();
        
        // Check if today is one of the scheduled days
        const today = targetTime.getDay(); // 0 = Sunday, 1 = Monday, etc.
        if (!reminder.days.includes(today)) {
            // Schedule for next valid day
            this.scheduleForNextValidDay(reminder);
            return;
        }
        
        console.log(`Scheduling reminder "${reminder.title}" for ${targetTime}`);
        
        const timeoutId = setTimeout(() => {
            this.showReminder(reminder);
            // Schedule the next occurrence
            this.scheduleReminder(reminder);
        }, timeUntilReminder);
        
        reminder.timeoutId = timeoutId;
    }

    // Schedule reminder for next valid day
    scheduleForNextValidDay(reminder) {
        const now = new Date();
        const [hours, minutes] = reminder.time.split(':').map(Number);
        
        // Find next valid day
        let daysToAdd = 1;
        let nextValidDayFound = false;
        
        while (!nextValidDayFound && daysToAdd < 8) {
            const nextDate = new Date(now);
            nextDate.setDate(now.getDate() + daysToAdd);
            const nextDay = nextDate.getDay();
            
            if (reminder.days.includes(nextDay)) {
                nextValidDayFound = true;
                nextDate.setHours(hours, minutes, 0, 0);
                
                const timeUntilReminder = nextDate.getTime() - now.getTime();
                
                console.log(`Scheduling reminder "${reminder.title}" for ${nextDate}`);
                
                const timeoutId = setTimeout(() => {
                    this.showReminder(reminder);
                    this.scheduleReminder(reminder);
                }, timeUntilReminder);
                
                reminder.timeoutId = timeoutId;
            }
            
            daysToAdd++;
        }
    }

    // Show a reminder notification
    showReminder(reminder) {
        // Show browser notification
        if (this.notificationPermission === 'granted') {
            const notification = new Notification(reminder.title, {
                body: reminder.message,
                icon: '/icon-192.png', // You can add an icon later
                badge: '/icon-192.png',
                tag: `steadfast-reminder-${reminder.id}`,
                requireInteraction: true,
                actions: [
                    {
                        action: 'dismiss',
                        title: 'Dismiss'
                    },
                    {
                        action: 'open-app',
                        title: 'Open Steadfast'
                    }
                ]
            });

            notification.onclick = () => {
                window.focus();
                this.handleReminderAction(reminder);
                notification.close();
            };

            notification.onclose = () => {
                console.log('Notification closed');
            };

            // Auto-close after 30 seconds
            setTimeout(() => {
                notification.close();
            }, 30000);
        }

        // Also show in-app notification if the app is open
        this.showInAppReminder(reminder);
    }

    // Handle reminder actions
    handleReminderAction(reminder) {
        switch (reminder.type) {
            case 'mood':
                // Focus on mood check-in
                if (window.location.pathname.includes('index.html')) {
                    // Scroll to mood section
                    document.querySelector('.mood-selector')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                    window.location.href = 'index.html';
                }
                break;
            case 'journal':
                // Open journal
                if (window.location.pathname.includes('toolkit.html')) {
                    // Scroll to journal section
                    document.getElementById('journal-section')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                    window.location.href = 'toolkit.html';
                }
                break;
            case 'practice':
                // Open drills
                if (window.location.pathname.includes('toolkit.html')) {
                    // Scroll to drills section
                    document.getElementById('drills-section')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                    window.location.href = 'toolkit.html';
                }
                break;
            default:
                window.location.href = 'index.html';
        }
    }

    // Show in-app reminder (notification in the app)
    showInAppReminder(reminder) {
        const notificationHtml = `
            <div class="alert alert-info alert-dismissible fade show reminder-notification" role="alert">
                <div class="d-flex align-items-center">
                    <i class="fas fa-bell me-2"></i>
                    <div class="flex-grow-1">
                        <strong>${reminder.title}</strong><br>
                        <small>${reminder.message}</small>
                    </div>
                    <button type="button" class="btn btn-sm btn-outline-primary ms-2" onclick="reminderSystem.handleReminderAction(${JSON.stringify(reminder).replace(/"/g, '&quot;')})">
                        Open
                    </button>
                </div>
            </div>
        `;

        // Create notification container if it doesn't exist
        let notificationContainer = document.getElementById('reminderNotifications');
        if (!notificationContainer) {
            notificationContainer = document.createElement('div');
            notificationContainer.id = 'reminderNotifications';
            notificationContainer.className = 'reminder-notifications-container';
            document.body.prepend(notificationContainer);
        }

        // Add the notification
        const notificationElement = document.createElement('div');
        notificationElement.innerHTML = notificationHtml;
        notificationContainer.appendChild(notificationElement.firstElementChild);

        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (notificationElement.firstElementChild) {
                notificationElement.firstElementChild.remove();
            }
        }, 10000);
    }

    // Add a new reminder
    addReminder(reminderData) {
        const newReminder = {
            id: Date.now(),
            ...reminderData,
            enabled: true
        };
        
        this.reminders.push(newReminder);
        this.saveReminders();
        
        if (newReminder.enabled) {
            this.scheduleReminder(newReminder);
        }
        
        showNotification('Reminder added!', 'success');
        return newReminder;
    }

    // Update a reminder
    updateReminder(reminderId, updates) {
        const reminderIndex = this.reminders.findIndex(r => r.id === reminderId);
        if (reminderIndex === -1) return false;
        
        // Clear existing timeout if any
        if (this.reminders[reminderIndex].timeoutId) {
            clearTimeout(this.reminders[reminderIndex].timeoutId);
        }
        
        this.reminders[reminderIndex] = { ...this.reminders[reminderIndex], ...updates };
        this.saveReminders();
        
        if (this.reminders[reminderIndex].enabled) {
            this.scheduleReminder(this.reminders[reminderIndex]);
        }
        
        showNotification('Reminder updated!', 'success');
        return true;
    }

    // Delete a reminder
    deleteReminder(reminderId) {
        const reminderIndex = this.reminders.findIndex(r => r.id === reminderId);
        if (reminderIndex === -1) return false;
        
        // Clear timeout if any
        if (this.reminders[reminderIndex].timeoutId) {
            clearTimeout(this.reminders[reminderIndex].timeoutId);
        }
        
        this.reminders.splice(reminderIndex, 1);
        this.saveReminders();
        
        showNotification('Reminder deleted', 'info');
        return true;
    }

    // Toggle reminder enabled/disabled
    toggleReminder(reminderId) {
        const reminder = this.reminders.find(r => r.id === reminderId);
        if (!reminder) return false;
        
        if (reminder.enabled) {
            // Disable - clear timeout
            if (reminder.timeoutId) {
                clearTimeout(reminder.timeoutId);
                reminder.timeoutId = null;
            }
            reminder.enabled = false;
            showNotification('Reminder disabled', 'info');
        } else {
            // Enable - schedule
            reminder.enabled = true;
            this.scheduleReminder(reminder);
            showNotification('Reminder enabled', 'success');
        }
        
        this.saveReminders();
        return true;
    }

    // Clear all reminder timeouts
    clearAllReminders() {
        this.reminders.forEach(reminder => {
            if (reminder.timeoutId) {
                clearTimeout(reminder.timeoutId);
                reminder.timeoutId = null;
            }
        });
    }

    // Get all reminders
    getReminders() {
        return this.reminders;
    }

    // Test a reminder immediately (for development)
    testReminder(reminderId) {
        const reminder = this.reminders.find(r => r.id === reminderId);
        if (reminder) {
            this.showReminder(reminder);
            return true;
        }
        return false;
    }
}

// Initialize reminder system
const reminderSystem = new ReminderSystem();