// Progress Charts and Analytics
class ProgressCharts {
    constructor() {
        this.moodChart = null;
        this.activityChart = null;
        this.moodDistributionChart = null;
        this.currentRange = 'week';
    }

    init() {
        this.loadProgressStats();
        this.createMoodChart();
        this.createActivityChart();
        this.createMoodDistributionChart();
        this.createWeeklyActivity();
    }

    // Load and display progress statistics
    loadProgressStats() {
        // Calculate current streak
        const streak = this.calculateCurrentStreak();
        document.getElementById('currentStreak').textContent = streak;
        
        // Add fire emoji for streaks
        const streakFire = document.getElementById('streakFire');
        if (streak >= 7) {
            streakFire.innerHTML = '🔥'.repeat(Math.min(3, Math.floor(streak / 7)));
        }

        // Load other stats
        const drillsCompleted = parseInt(localStorage.getItem('drillCount') || '0');
        const journalEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]').length;
        const sessionsBooked = JSON.parse(localStorage.getItem('therapySessions') || '[]').length;
        const groupsJoined = JSON.parse(localStorage.getItem('myGroups') || '[]').length;

        document.getElementById('drillsCompleted').textContent = drillsCompleted;
        document.getElementById('journalEntriesCount').textContent = journalEntries;
        document.getElementById('sessionsBooked').textContent = sessionsBooked;
        document.getElementById('groupsJoined').textContent = groupsJoined;
    }

    // Calculate current streak of consecutive days with mood entries
    calculateCurrentStreak() {
        const moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
        if (moodHistory.length === 0) return 0;

        // Sort by date descending
        moodHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        let streak = 0;
        let currentDate = new Date();
        
        // Check consecutive days from today backwards
        for (let i = 0; i < moodHistory.length; i++) {
            const entryDate = new Date(moodHistory[i].date);
            const diffTime = currentDate - entryDate;
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === streak) {
                streak++;
            } else {
                break;
            }
        }
        
        return streak;
    }

    // Create mood trend chart
    createMoodChart() {
        const ctx = document.getElementById('moodChart').getContext('2d');
        const moodData = this.getMoodDataForRange(this.currentRange);
        
        if (this.moodChart) {
            this.moodChart.destroy();
        }

        this.moodChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: moodData.labels,
                datasets: [{
                    label: 'Mood Score',
                    data: moodData.scores,
                    borderColor: getComputedStyle(document.documentElement).getPropertyValue('--secondary-color') || '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--secondary-color') || '#3498db',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--card-bg') || '#ffffff',
                        titleColor: getComputedStyle(document.documentElement).getPropertyValue('--text-color') || '#2c3e50',
                        bodyColor: getComputedStyle(document.documentElement).getPropertyValue('--text-color') || '#2c3e50',
                        borderColor: getComputedStyle(document.documentElement).getPropertyValue('--border-color') || '#dee2e6',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                const moodScore = context.parsed.y;
                                const moodTexts = ['Very Low', 'Low', 'Neutral', 'Good', 'Excellent'];
                                return `Mood: ${moodTexts[moodScore - 1] || 'Unknown'}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        min: 1,
                        max: 5,
                        ticks: {
                            stepSize: 1,
                            callback: function(value) {
                                const moodIcons = ['😔', '😕', '😐', '🙂', '😊'];
                                return moodIcons[value - 1] || '';
                            }
                        },
                        grid: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--border-color') || 'rgba(0,0,0,0.1)'
                        }
                    },
                    x: {
                        grid: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--border-color') || 'rgba(0,0,0,0.1)'
                        }
                    }
                }
            }
        });
    }

    // Create activity distribution chart
    createActivityChart() {
        const ctx = document.getElementById('activityChart').getContext('2d');
        const activityData = this.getActivityData();
        
        if (this.activityChart) {
            this.activityChart.destroy();
        }

        this.activityChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Drills', 'Journal', 'Sessions', 'Community'],
                datasets: [{
                    data: activityData,
                    backgroundColor: [
                        '#3498db', // Drills - blue
                        '#2ecc71', // Journal - green
                        '#e74c3c', // Sessions - red
                        '#9b59b6'  // Community - purple
                    ],
                    borderWidth: 2,
                    borderColor: getComputedStyle(document.documentElement).getPropertyValue('--card-bg') || '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '60%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--text-color') || '#2c3e50',
                            padding: 15
                        }
                    }
                }
            }
        });
    }

    // Create mood distribution chart
    createMoodDistributionChart() {
        const ctx = document.getElementById('moodDistributionChart').getContext('2d');
        const moodDistribution = this.getMoodDistribution();
        
        if (this.moodDistributionChart) {
            this.moodDistributionChart.destroy();
        }

        this.moodDistributionChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['😔 Very Low', '😕 Low', '😐 Neutral', '🙂 Good', '😊 Excellent'],
                datasets: [{
                    label: 'Entries',
                    data: moodDistribution,
                    backgroundColor: [
                        '#e74c3c', // Very Low - red
                        '#e67e22', // Low - orange
                        '#f1c40f', // Neutral - yellow
                        '#2ecc71', // Good - green
                        '#3498db'  // Excellent - blue
                    ],
                    borderWidth: 0,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--border-color') || 'rgba(0,0,0,0.1)'
                        },
                        ticks: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--text-color') || '#2c3e50'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--text-color') || '#2c3e50'
                        }
                    }
                }
            }
        });
    }

    // Create weekly activity calendar
    createWeeklyActivity() {
        const weekActivity = document.getElementById('weekActivity');
        const activity = this.getWeeklyActivity();
        
        const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
        
        weekActivity.innerHTML = '';
        
        for (let i = 0; i < 7; i++) {
            const dayIndex = (today + i + 1) % 7; // Start from today
            const activityLevel = activity[dayIndex] || 0;
            
            let activityClass = 'activity-none';
            if (activityLevel > 2) activityClass = 'activity-high';
            else if (activityLevel > 0) activityClass = 'activity-medium';
            
            const dayDiv = document.createElement('div');
            dayDiv.className = `day-activity ${activityClass}`;
            dayDiv.title = `${days[dayIndex]}: ${activityLevel} activities`;
            dayDiv.textContent = days[dayIndex];
            
            weekActivity.appendChild(dayDiv);
        }
    }

    // Get mood data for selected time range
    getMoodDataForRange(range) {
        const moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
        
        // Sort by date
        moodHistory.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        let filteredData = [];
        const now = new Date();
        
        switch(range) {
            case 'week':
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                filteredData = moodHistory.filter(entry => new Date(entry.date) >= weekAgo);
                break;
            case 'month':
                const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                filteredData = moodHistory.filter(entry => new Date(entry.date) >= monthAgo);
                break;
            case 'all':
            default:
                filteredData = moodHistory;
                break;
        }
        
        const labels = filteredData.map(entry => {
            const date = new Date(entry.date);
            return date.toLocaleDateString('en', { month: 'short', day: 'numeric' });
        });
        
        const scores = filteredData.map(entry => parseInt(entry.mood));
        
        return { labels, scores };
    }

    // Get activity data for distribution chart
    getActivityData() {
        const drillsCompleted = parseInt(localStorage.getItem('drillCount') || '0');
        const journalEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]').length;
        const sessionsBooked = JSON.parse(localStorage.getItem('therapySessions') || '[]').length;
        const groupsJoined = JSON.parse(localStorage.getItem('myGroups') || '[]').length;
        
        return [drillsCompleted, journalEntries, sessionsBooked, groupsJoined];
    }

    // Get mood distribution data
    getMoodDistribution() {
        const moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
        const distribution = [0, 0, 0, 0, 0]; // Very Low to Excellent
        
        moodHistory.forEach(entry => {
            const moodIndex = parseInt(entry.mood) - 1;
            if (moodIndex >= 0 && moodIndex < 5) {
                distribution[moodIndex]++;
            }
        });
        
        return distribution;
    }

    // Get weekly activity data
    getWeeklyActivity() {
        const activity = [0, 0, 0, 0, 0, 0, 0]; // Sunday to Saturday
        
        // Count mood entries by day of week
        const moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
        moodHistory.forEach(entry => {
            const date = new Date(entry.date);
            const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
            activity[dayOfWeek]++;
        });
        
        // Count drills by day of week (you would need to track drill dates)
        // For now, we'll just return the mood activity
        
        return activity;
    }

    // Change chart time range
    changeRange(range) {
        this.currentRange = range;
        
        // Update button states
        document.querySelectorAll('.btn-group .btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Refresh charts
        this.createMoodChart();
    }

    // Refresh all charts (call this when new data is added)
    refresh() {
        this.loadProgressStats();
        this.createMoodChart();
        this.createActivityChart();
        this.createMoodDistributionChart();
        this.createWeeklyActivity();
    }
}

// Initialize charts
const progressCharts = new ProgressCharts();

// Global function for range buttons
function changeChartRange(range) {
    progressCharts.changeRange(range);
}