// Achievements System
class AchievementSystem {
    constructor() {
        this.achievements = this.initializeAchievements();
        this.unlockedAchievements = JSON.parse(localStorage.getItem('unlockedAchievements') || '[]');
        this.init();
    }

    initializeAchievements() {
        return {
            'first_step': {
                id: 'first_step',
                name: 'First Step',
                description: 'Complete your first mental fitness drill',
                icon: '🎯',
                color: 'primary',
                requirement: { type: 'drills_completed', target: 1 },
                xp: 10
            },
            'mood_tracker': {
                id: 'mood_tracker', 
                name: 'Mood Tracker',
                description: 'Log your mood for 3 consecutive days',
                icon: '📊',
                color: 'info',
                requirement: { type: 'mood_streak', target: 3 },
                xp: 15
            },
            'journal_starter': {
                id: 'journal_starter',
                name: 'Journal Starter',
                description: 'Write your first journal entry',
                icon: '📖',
                color: 'success',
                requirement: { type: 'journal_entries', target: 1 },
                xp: 10
            },
            'week_warrior': {
                id: 'week_warrior',
                name: 'Week Warrior',
                description: '7-day streak of daily check-ins',
                icon: '🔥',
                color: 'warning',
                requirement: { type: 'checkin_streak', target: 7 },
                xp: 25
            },
            'drill_enthusiast': {
                id: 'drill_enthusiast',
                name: 'Drill Enthusiast',
                description: 'Complete 10 different drills',
                icon: '💪',
                color: 'primary',
                requirement: { type: 'drills_completed', target: 10 },
                xp: 30
            },
            'social_butterfly': {
                id: 'social_butterfly',
                name: 'Social Butterfly',
                description: 'Join your first support group',
                icon: '🦋',
                color: 'info',
                requirement: { type: 'groups_joined', target: 1 },
                xp: 15
            },
            'crew_member': {
                id: 'crew_member',
                name: 'Crew Member',
                description: 'Create or join an accountability squad',
                icon: '👥',
                color: 'success',
                requirement: { type: 'squads_joined', target: 1 },
                xp: 20
            },
            'help_seeker': {
                id: 'help_seeker',
                name: 'Help Seeker',
                description: 'Book your first session with a professional',
                icon: '🛠️',
                color: 'warning',
                requirement: { type: 'sessions_booked', target: 1 },
                xp: 25
            }
        };
    }

    init() {
        this.checkAllAchievements();
    }

    checkOnAction(actionType, count = 1) {
        switch(actionType) {
            case 'drill_completed':
                this.checkDrillAchievements(count);
                break;
            case 'mood_logged':
                this.checkMoodAchievements(count);
                break;
            case 'journal_created':
                this.checkJournalAchievements(count);
                break;
            case 'group_joined':
                this.checkGroupAchievements(count);
                break;
            case 'squad_joined':
                this.checkSquadAchievements(count);
                break;
            case 'session_booked':
                this.checkSessionAchievements(count);
                break;
        }
    }

    checkDrillAchievements(currentCount) {
        this.checkAchievementByType('drills_completed', currentCount);
    }

    checkMoodAchievements(currentCount) {
        this.checkAchievementByType('mood_streak', currentCount);
        this.checkAchievementByType('checkin_streak', currentCount);
    }

    checkJournalAchievements(currentCount) {
        this.checkAchievementByType('journal_entries', currentCount);
    }

    checkGroupAchievements(currentCount) {
        this.checkAchievementByType('groups_joined', currentCount);
    }

    checkSquadAchievements(currentCount) {
        this.checkAchievementByType('squads_joined', currentCount);
    }

    checkSessionAchievements(currentCount) {
        this.checkAchievementByType('sessions_booked', currentCount);
    }

    checkAchievementByType(requirementType, currentCount) {
        Object.values(this.achievements).forEach(achievement => {
            if (achievement.requirement.type === requirementType && 
                currentCount >= achievement.requirement.target &&
                !this.isUnlocked(achievement.id)) {
                this.unlockAchievement(achievement.id);
            }
        });
    }

    checkAllAchievements() {
        const userData = this.getUserData();
        
        Object.values(this.achievements).forEach(achievement => {
            if (this.isUnlocked(achievement.id)) return;

            const requirement = achievement.requirement;
            let currentValue = 0;

            switch(requirement.type) {
                case 'drills_completed':
                    currentValue = userData.drillsCompleted;
                    break;
                case 'mood_streak':
                    currentValue = userData.moodStreak;
                    break;
                case 'checkin_streak':
                    currentValue = userData.checkinStreak;
                    break;
                case 'journal_entries':
                    currentValue = userData.journalEntries;
                    break;
                case 'groups_joined':
                    currentValue = userData.groupsJoined;
                    break;
                case 'squads_joined':
                    currentValue = userData.squadsJoined;
                    break;
                case 'sessions_booked':
                    currentValue = userData.sessionsBooked;
                    break;
            }

            if (currentValue >= requirement.target) {
                this.unlockAchievement(achievement.id);
            }
        });
    }

    getUserData() {
        const moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
        const journalEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
        const therapySessions = JSON.parse(localStorage.getItem('therapySessions') || '[]');
        const myGroups = JSON.parse(localStorage.getItem('myGroups') || '[]');
        const mySquads = JSON.parse(localStorage.getItem('mySquads') || '[]');
        
        const moodStreak = this.calculateMoodStreak(moodHistory);
        const checkinStreak = this.calculateCheckinStreak(moodHistory);
        const drillsCompleted = parseInt(localStorage.getItem('drillCount') || '0');

        return {
            drillsCompleted: drillsCompleted,
            moodStreak: moodStreak,
            checkinStreak: checkinStreak,
            journalEntries: journalEntries.length,
            groupsJoined: myGroups.length,
            squadsJoined: mySquads.length,
            sessionsBooked: therapySessions.length
        };
    }

    calculateMoodStreak(moodHistory) {
        if (moodHistory.length === 0) return 0;
        
        let streak = 0;
        const today = new Date();
        const sortedHistory = moodHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        for (let i = 0; i < sortedHistory.length; i++) {
            const entryDate = new Date(sortedHistory[i].date);
            const diffTime = Math.abs(today - entryDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === i) {
                streak++;
            } else {
                break;
            }
        }
        
        return streak;
    }

    calculateCheckinStreak(moodHistory) {
        return this.calculateMoodStreak(moodHistory);
    }

    unlockAchievement(achievementId) {
        if (this.isUnlocked(achievementId)) return;

        const achievement = this.achievements[achievementId];
        this.unlockedAchievements.push({
            id: achievementId,
            unlockedAt: new Date().toISOString(),
            xp: achievement.xp
        });

        localStorage.setItem('unlockedAchievements', JSON.stringify(this.unlockedAchievements));
        this.showUnlockNotification(achievement);
        this.updateTotalXP();
        
        console.log(`Achievement unlocked: ${achievement.name}`);
    }

    isUnlocked(achievementId) {
        return this.unlockedAchievements.some(a => a.id === achievementId);
    }

    showUnlockNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = `achievement-notification alert alert-${achievement.color}`;
        notification.innerHTML = `
            <div class="d-flex align-items-center">
                <div class="achievement-icon me-3" style="font-size: 2rem;">
                    ${achievement.icon}
                </div>
                <div class="flex-grow-1">
                    <h5 class="mb-1">Achievement Unlocked!</h5>
                    <p class="mb-1"><strong>${achievement.name}</strong></p>
                    <p class="mb-0 small">${achievement.description}</p>
                    <p class="mb-0 small text-muted">+${achievement.xp} XP</p>
                </div>
                <button type="button" class="btn-close" onclick="this.parentElement.parentElement.remove()"></button>
            </div>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 1060;
            min-width: 350px;
            max-width: 400px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    updateTotalXP() {
        const totalXP = this.unlockedAchievements.reduce((sum, achievement) => sum + achievement.xp, 0);
        localStorage.setItem('totalXP', totalXP.toString());
        this.updateLevel();
    }

    updateLevel() {
        const totalXP = parseInt(localStorage.getItem('totalXP') || '0');
        const level = Math.floor(totalXP / 100) + 1;
        localStorage.setItem('userLevel', level.toString());
        
        const levelElement = document.getElementById('userLevel');
        if (levelElement) {
            levelElement.textContent = level;
        }
    }

    getUnlockedAchievements() {
        return this.unlockedAchievements.map(unlocked => {
            return {
                ...this.achievements[unlocked.id],
                unlockedAt: unlocked.unlockedAt
            };
        });
    }

    getLockedAchievements() {
        return Object.values(this.achievements).filter(achievement => 
            !this.isUnlocked(achievement.id)
        );
    }

    getProgress(achievementId) {
        const achievement = this.achievements[achievementId];
        if (!achievement) return 0;
        
        if (this.isUnlocked(achievementId)) return 100;
        
        const userData = this.getUserData();
        const requirement = achievement.requirement;
        let currentValue = 0;

        switch(requirement.type) {
            case 'drills_completed':
                currentValue = userData.drillsCompleted;
                break;
            case 'mood_streak':
                currentValue = userData.moodStreak;
                break;
            case 'checkin_streak':
                currentValue = userData.checkinStreak;
                break;
            case 'journal_entries':
                currentValue = userData.journalEntries;
                break;
            case 'groups_joined':
                currentValue = userData.groupsJoined;
                break;
            case 'squads_joined':
                currentValue = userData.squadsJoined;
                break;
            case 'sessions_booked':
                currentValue = userData.sessionsBooked;
                break;
        }

        const progress = Math.min((currentValue / requirement.target) * 100, 100);
        return Math.round(progress);
    }

    getTotalXP() {
        return parseInt(localStorage.getItem('totalXP') || '0');
    }

    getLevel() {
        return parseInt(localStorage.getItem('userLevel') || '1');
    }
}

const achievements = new AchievementSystem();