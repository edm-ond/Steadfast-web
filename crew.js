// Crew Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeCrew();
});

// Sample data for groups, squads, and events
const sampleGroups = [
    {
        id: 1,
        name: "Fatherhood & Parenting",
        category: "fatherhood",
        description: "For dads navigating the challenges and joys of parenting",
        members: 247,
        activity: "high",
        tags: ["Parenting", "Family", "Work-Life Balance"],
        isPublic: true,
        rules: ["Be respectful", "No judgment", "Confidentiality"]
    },
    {
        id: 2,
        name: "Career Transition Support",
        category: "career",
        description: "Men supporting each other through career changes and challenges",
        members: 189,
        activity: "medium",
        tags: ["Career", "Professional", "Networking"],
        isPublic: true,
        rules: ["Professional conduct", "Supportive feedback", "Job leads welcome"]
    },
    {
        id: 3,
        name: "Relationship Support",
        category: "relationships",
        description: "Navigating relationships, communication, and personal growth",
        members: 156,
        activity: "high",
        tags: ["Relationships", "Communication", "Dating"],
        isPublic: true,
        rules: ["Respect privacy", "Constructive advice only", "No explicit content"]
    },
    {
        id: 4,
        name: "Anxiety & Stress Management",
        category: "general",
        description: "Share strategies and support for managing anxiety and stress",
        members: 312,
        activity: "high",
        tags: ["Anxiety", "Stress", "Coping Strategies"],
        isPublic: true,
        rules: ["Trigger warnings", "Be supportive", "Share resources"]
    },
    {
        id: 5,
        name: "Fitness & Mental Health",
        category: "general",
        description: "Connecting physical health with mental wellbeing",
        members: 128,
        activity: "medium",
        tags: ["Fitness", "Health", "Wellness"],
        isPublic: true,
        rules: ["Share progress", "No body shaming", "Motivational only"]
    },
    {
        id: 6,
        name: "Men's Recovery Support",
        category: "recovery",
        description: "Support for men in recovery from various challenges",
        members: 94,
        activity: "medium",
        tags: ["Recovery", "Support", "Growth"],
        isPublic: false,
        rules: ["Anonymous sharing", "No triggers", "Professional advice only"]
    }
];

const sampleEvents = [
    {
        id: 1,
        title: "Mindfulness for Busy Men",
        description: "Learn practical mindfulness techniques that fit into a busy schedule",
        date: getFutureDate(2),
        time: "19:00",
        type: "workshop",
        platform: "zoom",
        host: "Michael Roberts",
        attendees: 23,
        maxAttendees: 50
    },
    {
        id: 2,
        title: "Career Q&A with Industry Leaders",
        description: "Ask questions and get advice from successful professionals",
        date: getFutureDate(5),
        time: "18:30",
        type: "qna",
        platform: "teams",
        host: "David Chen",
        attendees: 45,
        maxAttendees: 100
    },
    {
        id: 3,
        title: "Fatherhood Roundtable",
        description: "Open discussion about the challenges and joys of modern fatherhood",
        date: getFutureDate(7),
        time: "20:00",
        type: "support",
        platform: "zoom",
        host: "James Wilson",
        attendees: 18,
        maxAttendees: 30
    }
];

let currentGroupId = null;
let currentSquadId = null;

function initializeCrew() {
    loadStats();
    loadGroups();
    loadSquads();
    loadEvents();
    setupSearchAndFilters();
}

function loadStats() {
    // Load community stats
    const totalMembers = 1200 + Math.floor(Math.random() * 300);
    const myGroups = JSON.parse(localStorage.getItem('myGroups') || '[]').length;
    const upcomingEvents = sampleEvents.length;
    const activeChats = JSON.parse(localStorage.getItem('activeChats') || '0');
    
    document.getElementById('totalMembers').textContent = totalMembers.toLocaleString();
    document.getElementById('myGroups').textContent = myGroups;
    document.getElementById('upcomingEvents').textContent = upcomingEvents;
    document.getElementById('activeChats').textContent = activeChats;
}

function loadGroups() {
    const grid = document.getElementById('groupsGrid');
    const myGroups = JSON.parse(localStorage.getItem('myGroups') || '[]');
    
    grid.innerHTML = '';
    
    sampleGroups.forEach(group => {
        const isMember = myGroups.some(g => g.id === group.id);
        const card = createGroupCard(group, isMember);
        grid.appendChild(card);
    });
}

function createGroupCard(group, isMember) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';
    
    let activityClass = '';
    let activityText = '';
    
    switch(group.activity) {
        case 'high':
            activityClass = 'activity-high';
            activityText = 'High Activity';
            break;
        case 'medium':
            activityClass = 'activity-medium';
            activityText = 'Medium Activity';
            break;
        case 'low':
            activityClass = 'activity-low';
            activityText = 'Low Activity';
            break;
    }
    
    col.innerHTML = `
        <div class="card group-card" data-id="${group.id}" data-category="${group.category}">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <h5 class="card-title">${group.name}</h5>
                    <span class="activity-level ${activityClass}">${activityText}</span>
                </div>
                
                <p class="card-text text-muted small">${group.description}</p>
                
                <div class="group-tags mb-3">
                    ${group.tags.map(tag => `<span class="badge bg-light text-dark">${tag}</span>`).join('')}
                </div>
                
                <div class="d-flex justify-content-between align-items-center">
                    <div class="member-count">
                        <i class="fas fa-users"></i> ${group.members} members
                    </div>
                    <div class="group-actions">
                        ${isMember ? 
                            `<button class="btn btn-sm btn-outline-success" onclick="openGroupChat(${group.id})">
                                <i class="fas fa-comments"></i> Chat
                            </button>
                            <button class="btn btn-sm btn-outline-secondary" onclick="viewGroup(${group.id})">
                                <i class="fas fa-info-circle"></i>
                            </button>` :
                            `<button class="btn btn-sm btn-primary" onclick="viewGroup(${group.id})">
                                Learn More
                            </button>`
                        }
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

function loadSquads() {
    const grid = document.getElementById('squadsGrid');
    const noSquads = document.getElementById('noSquadsMessage');
    const squads = JSON.parse(localStorage.getItem('mySquads') || '[]');
    
    grid.innerHTML = '';
    
    if (squads.length === 0) {
        noSquads.style.display = 'block';
        return;
    }
    
    noSquads.style.display = 'none';
    
    squads.forEach(squad => {
        const card = createSquadCard(squad);
        grid.appendChild(card);
    });
}

function createSquadCard(squad) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';
    
    // Generate member avatars
    const membersHtml = squad.members.slice(0, 4).map((member, index) => 
        `<div class="member-avatar" style="z-index: ${10 - index};" title="${member}">${member.charAt(0)}</div>`
    ).join('');
    
    const moreMembers = squad.members.length > 4 ? 
        `<div class="member-avatar more" style="z-index: 6;" title="${squad.members.length - 4} more">+${squad.members.length - 4}</div>` : '';
    
    col.innerHTML = `
        <div class="card squad-card">
            <div class="card-body">
                <h5 class="card-title">${squad.name}</h5>
                <p class="card-text text-muted small">${squad.description}</p>
                
                <div class="squad-progress progress">
                    <div class="progress-bar" style="width: ${(squad.members.length / squad.maxMembers) * 100}%"></div>
                </div>
                
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <small class="text-muted">${squad.members.length}/${squad.maxMembers} members</small>
                    <span class="badge bg-light text-dark">${getPurposeText(squad.purpose)}</span>
                </div>
                
                <div class="squad-members">
                    ${membersHtml}${moreMembers}
                </div>
                
                <div class="d-flex gap-2 mt-3">
                    <button class="btn btn-sm btn-outline-primary flex-fill" onclick="openSquadChat(${squad.id})">
                        <i class="fas fa-comments"></i> Chat
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="leaveSquad(${squad.id})">
                        <i class="fas fa-sign-out-alt"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

function getPurposeText(purpose) {
    const purposes = {
        'fitness': 'Fitness',
        'meditation': 'Meditation',
        'career': 'Career',
        'recovery': 'Recovery',
        'learning': 'Learning',
        'other': 'Other'
    };
    return purposes[purpose] || purpose;
}

function loadEvents() {
    const container = document.getElementById('eventsList');
    const myEvents = JSON.parse(localStorage.getItem('myEvents') || '[]');
    
    container.innerHTML = '';
    
    sampleEvents.forEach(event => {
        const isRegistered = myEvents.some(e => e.id === event.id);
        const card = createEventCard(event, isRegistered);
        container.appendChild(card);
    });
}

function createEventCard(event, isRegistered) {
    const eventDate = new Date(event.date);
    const month = eventDate.toLocaleDateString('en', { month: 'short' });
    const day = eventDate.getDate();
    
    const col = document.createElement('div');
    col.className = 'col-12 mb-3';
    
    col.innerHTML = `
        <div class="card event-card">
            <div class="card-body">
                <div class="d-flex">
                    <div class="event-date me-3">
                        <div class="month">${month}</div>
                        <div class="day">${day}</div>
                    </div>
                    <div class="flex-grow-1">
                        <div class="d-flex justify-content-between align-items-start">
                            <div>
                                <h5 class="card-title mb-1">${event.title}</h5>
                                <p class="card-text text-muted mb-2">${event.description}</p>
                            </div>
                            <span class="event-type-badge badge bg-primary">${event.type.toUpperCase()}</span>
                        </div>
                        
                        <div class="event-details small text-muted mb-3">
                            <div>
                                <i class="fas fa-clock"></i> ${formatTime(event.time)} • 
                                <i class="fas fa-video"></i> ${event.platform.charAt(0).toUpperCase() + event.platform.slice(1)} • 
                                <i class="fas fa-user"></i> Hosted by ${event.host}
                            </div>
                            <div>
                                <i class="fas fa-users"></i> ${event.attendees}/${event.maxAttendees} attendees
                            </div>
                        </div>
                        
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                ${isRegistered ? 
                                    '<span class="badge bg-success"><i class="fas fa-check"></i> Registered</span>' :
                                    '<span class="badge bg-secondary">Open for Registration</span>'
                                }
                            </div>
                            <div>
                                ${!isRegistered ? 
                                    `<button class="btn btn-sm btn-primary" onclick="registerForEvent(${event.id})">
                                        <i class="fas fa-calendar-plus"></i> Register
                                    </button>` :
                                    `<button class="btn btn-sm btn-outline-secondary" onclick="unregisterFromEvent(${event.id})">
                                        Cancel Registration
                                    </button>`
                                }
                                <button class="btn btn-sm btn-outline-info ms-1" onclick="viewEventDetails(${event.id})">
                                    Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

function setupSearchAndFilters() {
    // Group search
    document.getElementById('groupSearch').addEventListener('input', function() {
        filterGroups();
    });
    
    // Group category filter
    document.getElementById('groupCategory').addEventListener('change', function() {
        filterGroups();
    });
}

function filterGroups() {
    const searchTerm = document.getElementById('groupSearch').value.toLowerCase();
    const category = document.getElementById('groupCategory').value;
    
    const cards = document.querySelectorAll('.group-card');
    
    cards.forEach(card => {
        let show = true;
        const name = card.querySelector('.card-title').textContent.toLowerCase();
        const cardCategory = card.getAttribute('data-category');
        
        // Search filter
        if (searchTerm && !name.includes(searchTerm)) {
            show = false;
        }
        
        // Category filter
        if (category && cardCategory !== category) {
            show = false;
        }
        
        card.parentElement.style.display = show ? 'block' : 'none';
    });
}

function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('#crewTabs .nav-link').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab and activate button
    document.getElementById(tabName + 'Tab').style.display = 'block';
    event.target.classList.add('active');
}

function viewGroup(groupId) {
    const group = sampleGroups.find(g => g.id === groupId);
    const myGroups = JSON.parse(localStorage.getItem('myGroups') || '[]');
    const isMember = myGroups.some(g => g.id === groupId);
    
    if (!group) return;
    
    currentGroupId = groupId;
    
    document.getElementById('groupDetailTitle').textContent = group.name;
    
    let rulesHtml = '';
    group.rules.forEach(rule => {
        rulesHtml += `<li>${rule}</li>`;
    });
    
    document.getElementById('groupDetailContent').innerHTML = `
        <div class="mb-4">
            <p class="lead">${group.description}</p>
            <div class="d-flex gap-2 mb-3">
                <span class="badge bg-primary">${group.members} members</span>
                <span class="badge bg-secondary">${group.isPublic ? 'Public' : 'Private'} group</span>
            </div>
        </div>
        
        <div class="mb-4">
            <h6>Group Rules:</h6>
            <ul>
                ${rulesHtml}
            </ul>
        </div>
        
        <div class="mb-3">
            <h6>Tags:</h6>
            <div class="group-tags">
                ${group.tags.map(tag => `<span class="badge bg-light text-dark">${tag}</span>`).join('')}
            </div>
        </div>
        
        ${isMember ? 
            `<div class="alert alert-success">
                <i class="fas fa-check-circle"></i> You are a member of this group
            </div>` :
            `<div class="alert alert-info">
                <i class="fas fa-info-circle"></i> Join to participate in discussions and events
            </div>`
        }
    `;
    
    // Show/hide join/leave buttons
    document.getElementById('joinGroupBtn').style.display = isMember ? 'none' : 'block';
    document.getElementById('leaveGroupBtn').style.display = isMember ? 'block' : 'none';
    
    const modal = new bootstrap.Modal(document.getElementById('groupDetailModal'));
    modal.show();
}

function joinGroup() {
    if (!currentGroupId) return;
    
    const group = sampleGroups.find(g => g.id === currentGroupId);
    const myGroups = JSON.parse(localStorage.getItem('myGroups') || '[]');
    
    if (myGroups.some(g => g.id === currentGroupId)) {
        showNotification('You are already a member of this group.', 'warning');
        return;
    }
    
    myGroups.push({
        id: group.id,
        name: group.name,
        joined: new Date().toISOString()
    });
    
    localStorage.setItem('myGroups', JSON.stringify(myGroups));
    
    showNotification(`Joined ${group.name}!`, 'success');
    loadStats();
    loadGroups();
    
    // Update modal
    document.getElementById('joinGroupBtn').style.display = 'none';
    document.getElementById('leaveGroupBtn').style.display = 'block';
    
    const alertHtml = `<div class="alert alert-success">
        <i class="fas fa-check-circle"></i> You are now a member of this group
    </div>`;
    document.getElementById('groupDetailContent').insertAdjacentHTML('afterbegin', alertHtml);
}

function leaveGroup() {
    if (!currentGroupId) return;
    
    const group = sampleGroups.find(g => g.id === currentGroupId);
    let myGroups = JSON.parse(localStorage.getItem('myGroups') || '[]');
    
    myGroups = myGroups.filter(g => g.id !== currentGroupId);
    localStorage.setItem('myGroups', JSON.stringify(myGroups));
    
    showNotification(`Left ${group.name}.`, 'info');
    loadStats();
    loadGroups();
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('groupDetailModal'));
    modal.hide();
}

function createSquad() {
    const name = document.getElementById('squadName').value.trim();
    const purpose = document.getElementById('squadPurpose').value;
    const description = document.getElementById('squadDescription').value.trim();
    const maxMembers = parseInt(document.getElementById('squadMaxMembers').value);
    const isPrivate = document.getElementById('squadPrivate').checked;
    
    if (!name || !description) {
        showNotification('Please fill in all required fields.', 'warning');
        return;
    }
    
    const squad = {
        id: Date.now(),
        name: name,
        purpose: purpose,
        description: description,
        maxMembers: maxMembers,
        isPrivate: isPrivate,
        members: ['You'],
        created: new Date().toISOString()
    };
    
    // Save to localStorage
    let squads = JSON.parse(localStorage.getItem('mySquads') || '[]');
    squads.push(squad);
    localStorage.setItem('mySquads', JSON.stringify(squads));
    
        // Close modal and reset form
    const modal = bootstrap.Modal.getInstance(document.getElementById('createSquadModal'));
    modal.hide();
    document.getElementById('createSquadModal').querySelector('form').reset();
    
    showNotification('Squad created successfully!', 'success');
    loadSquads();
    loadStats();
}

function leaveSquad(squadId) {
    if (confirm('Are you sure you want to leave this squad?')) {
        let squads = JSON.parse(localStorage.getItem('mySquads') || '[]');
        squads = squads.filter(s => s.id !== squadId);
        localStorage.setItem('mySquads', JSON.stringify(squads));
        
        showNotification('Left the squad.', 'info');
        loadSquads();
        loadStats();
    }
}

function createEvent() {
    const title = document.getElementById('eventTitle').value.trim();
    const description = document.getElementById('eventDescription').value.trim();
    const date = document.getElementById('eventDate').value;
    const time = document.getElementById('eventTime').value;
    const type = document.getElementById('eventType').value;
    const platform = document.getElementById('eventPlatform').value;
    
    if (!title || !description || !date || !time) {
        showNotification('Please fill in all required fields.', 'warning');
        return;
    }
    
    const event = {
        id: Date.now(),
        title: title,
        description: description,
        date: date,
        time: time,
        type: type,
        platform: platform,
        host: 'You',
        attendees: 1,
        maxAttendees: 50,
        created: new Date().toISOString()
    };
    
    // For demo, we'll just show a success message
    // In a real app, this would save to a database
    
    // Close modal and reset form
    const modal = bootstrap.Modal.getInstance(document.getElementById('createEventModal'));
    modal.hide();
    document.getElementById('createEventModal').querySelector('form').reset();
    
    showNotification('Event created successfully!', 'success');
}

function registerForEvent(eventId) {
    const event = sampleEvents.find(e => e.id === eventId);
    let myEvents = JSON.parse(localStorage.getItem('myEvents') || '[]');
    
    if (myEvents.some(e => e.id === eventId)) {
        showNotification('You are already registered for this event.', 'warning');
        return;
    }
    
    myEvents.push({
        id: event.id,
        title: event.title,
        date: event.date,
        time: event.time
    });
    
    localStorage.setItem('myEvents', JSON.stringify(myEvents));
    
    showNotification(`Registered for ${event.title}!`, 'success');
    loadEvents();
    loadStats();
}

function unregisterFromEvent(eventId) {
    const event = sampleEvents.find(e => e.id === eventId);
    let myEvents = JSON.parse(localStorage.getItem('myEvents') || '[]');
    
    myEvents = myEvents.filter(e => e.id !== eventId);
    localStorage.setItem('myEvents', JSON.stringify(myEvents));
    
    showNotification(`Cancelled registration for ${event.title}.`, 'info');
    loadEvents();
    loadStats();
}

function viewEventDetails(eventId) {
    const event = sampleEvents.find(e => e.id === eventId);
    if (event) {
        alert(`Event Details:\n\n${event.title}\n${event.description}\n\nDate: ${new Date(event.date).toLocaleDateString()}\nTime: ${formatTime(event.time)}\nPlatform: ${event.platform}\nHost: ${event.host}\nAttendees: ${event.attendees}/${event.maxAttendees}`);
    }
}

function openGroupChat(groupId) {
    const group = sampleGroups.find(g => g.id === groupId);
    if (!group) return;
    
    currentGroupId = groupId;
    document.getElementById('chatModalTitle').textContent = group.name + ' Chat';
    document.getElementById('chatMessages').innerHTML = `
        <div class="chat-message other">
            <div class="message-sender">Group Bot</div>
            <div>Welcome to the ${group.name} chat! Be respectful and supportive.</div>
            <div class="message-time">Just now</div>
        </div>
    `;
    
    const modal = new bootstrap.Modal(document.getElementById('chatModal'));
    modal.show();
}

function openSquadChat(squadId) {
    const squads = JSON.parse(localStorage.getItem('mySquads') || '[]');
    const squad = squads.find(s => s.id === squadId);
    if (!squad) return;
    
    currentSquadId = squadId;
    document.getElementById('chatModalTitle').textContent = squad.name + ' Squad Chat';
    document.getElementById('chatMessages').innerHTML = `
        <div class="chat-message other">
            <div class="message-sender">Squad Bot</div>
            <div>Welcome to your squad chat! Use this space to coordinate and support each other.</div>
            <div class="message-time">Just now</div>
        </div>
    `;
    
    const modal = new bootstrap.Modal(document.getElementById('chatModal'));
    modal.show();
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    const messagesContainer = document.getElementById('chatMessages');
    
    if (!message) return;
    
    const messageHtml = `
        <div class="chat-message own new">
            <div class="message-sender">You</div>
            <div>${message}</div>
            <div class="message-time">Just now</div>
        </div>
    `;
    
    messagesContainer.insertAdjacentHTML('beforeend', messageHtml);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    input.value = '';
    
    // Simulate a response after 2 seconds
    setTimeout(() => {
        const responses = [
            "Thanks for sharing that!",
            "I can relate to what you're saying.",
            "That's a great point.",
            "Has anyone else experienced this?",
            "Thanks for being open about this."
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const responseHtml = `
            <div class="chat-message other new">
                <div class="message-sender">Community Member</div>
                <div>${randomResponse}</div>
                <div class="message-time">Just now</div>
            </div>
        `;
        
        messagesContainer.insertAdjacentHTML('beforeend', responseHtml);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 2000);
}

function filterEvents(filter) {
    // For demo purposes, we'll just show a message
    // In a real app, this would filter the events list
    const filterTexts = {
        'upcoming': 'Showing upcoming events',
        'past': 'Showing past events',
        'my': 'Showing events you registered for'
    };
    
    showNotification(filterTexts[filter] || 'Filter applied', 'info');
}

// Utility functions
function getFutureDate(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}
// In the joinGroup function, add:
function joinGroup() {
    if (!currentGroupId) return;
    
    const group = sampleGroups.find(g => g.id === currentGroupId);
    const myGroups = JSON.parse(localStorage.getItem('myGroups') || '[]');
    
    if (myGroups.some(g => g.id === currentGroupId)) {
        showNotification('You are already a member of this group.', 'warning');
        return;
    }
    
    myGroups.push({
        id: group.id,
        name: group.name,
        joined: new Date().toISOString()
    });
    
    localStorage.setItem('myGroups', JSON.stringify(myGroups));
    
    showNotification(`Joined ${group.name}!`, 'success');
    loadStats();
    loadGroups();
    
    // Track achievement
    achievements.checkOnAction('group_joined', myGroups.length);
    
    document.getElementById('joinGroupBtn').style.display = 'none';
    document.getElementById('leaveGroupBtn').style.display = 'block';
    
    const alertHtml = `<div class="alert alert-success">
        <i class="fas fa-check-circle"></i> You are now a member of this group
    </div>`;
    document.getElementById('groupDetailContent').insertAdjacentHTML('afterbegin', alertHtml);
}

// In the createSquad function, add:
function createSquad() {
    const name = document.getElementById('squadName').value.trim();
    const purpose = document.getElementById('squadPurpose').value;
    const description = document.getElementById('squadDescription').value.trim();
    const maxMembers = parseInt(document.getElementById('squadMaxMembers').value);
    const isPrivate = document.getElementById('squadPrivate').checked;
    
    if (!name || !description) {
        showNotification('Please fill in all required fields.', 'warning');
        return;
    }
    
    const squad = {
        id: Date.now(),
        name: name,
        purpose: purpose,
        description: description,
        maxMembers: maxMembers,
        isPrivate: isPrivate,
        members: ['You'],
        created: new Date().toISOString()
    };
    
    let squads = JSON.parse(localStorage.getItem('mySquads') || '[]');
    squads.push(squad);
    localStorage.setItem('mySquads', JSON.stringify(squads));
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('createSquadModal'));
    modal.hide();
    document.getElementById('createSquadModal').querySelector('form').reset();
    
    showNotification('Squad created successfully!', 'success');
    
    // Track achievement
    achievements.checkOnAction('squad_joined', squads.length);
    
    loadSquads();
    loadStats();
}