// Garage Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeGarage();
});

// Sample professionals data
const professionals = [
    {
        id: 1,
        name: "Dr. Sarah Mwairimu",
        title: "Clinical Psychologist",
        specialty: ["Anxiety", "Stress", "Relationships"],
        type: "psychologist",
        availability: "weekdays",
        rating: 4.8,
        reviews: 124,
        image: "👩‍⚕️",
        bio: "Specialized in CBT and mindfulness approaches for anxiety and stress management.",
        experience: "8 years",
        languages: ["English", "Kiswahili"],
        acceptsInsurance: true,
        sessionPrice: 180
    },
    {
        id: 2,
        name: "Michael Roberts, KNH",
        title: "Therapist",
        specialty: ["Trauma", "PTSD", "Men's Issues"],
        type: "therapist",
        availability: "evenings",
        rating: 4.9,
        reviews: 89,
        image: "👨‍💼",
        bio: "Trauma-informed care with focus on men's mental health and resilience building.",
        experience: "12 years",
        languages: ["English,Kiswahili"],
        acceptsInsurance: true,
        sessionPrice: 150
    },
    {
        id: 3,
        name: "Davis Browns",
        title: "Mental Health Coach",
        specialty: ["Career", "Performance", "Mindset"],
        type: "coach",
        availability: "weekends",
        rating: 4.7,
        reviews: 67,
        image: "🧑‍💼",
        bio: "Executive and performance coaching for professionals seeking work-life balance.",
        experience: "6 years",
        languages: ["English", "Spanish","Kiswahili"],
        acceptsInsurance: false,
        sessionPrice: 120
    },
    {
        id: 4,
        name: "Dr. James Kim",
        title: "Psychiatrist",
        specialty: ["Medication", "Depression", "ADHD"],
        type: "psychiatrist",
        availability: "weekdays",
        rating: 4.6,
        reviews: 203,
        image: "👨‍🔬",
        bio: "Medication management and psychiatric evaluation with therapeutic support.",
        experience: "15 years",
        languages: ["English","Kiswahili"],
        acceptsInsurance: true,
        sessionPrice: 250
    },
    {
        id: 5,
        name: "Robert Kim, LMHC",
        title: "Counselor",
        specialty: ["Relationships", "Family", "Communication"],
        type: "counselor",
        availability: "evenings",
        rating: 4.8,
        reviews: 95,
        image: "👨‍🏫",
        bio: "Gottman Method certified for couples and family counseling.",
        experience: "10 years",
        languages: ["English", "Korean"],
        acceptsInsurance: true,
        sessionPrice: 140
    },
    {
        id: 6,
        name: "Alex Muthai",
        title: "Mindfulness Coach",
        specialty: ["Meditation", "Stress", "Mindfulness"],
        type: "coach",
        availability: "weekends",
        rating: 4.5,
        reviews: 45,
        image: "🧘‍♂️",
        bio: "Mindfulness and meditation practices for stress reduction and mental clarity.",
        experience: "5 years",
        languages: ["English"],
        acceptsInsurance: false,
        sessionPrice: 100
    }
];

let currentProfessional = null;

function initializeGarage() {
    loadProfessionals();
    setupFilters();
    loadSessions();
    
    // Search functionality
    const searchInput = document.getElementById('proSearch');
    searchInput.addEventListener('input', function() {
        filterProfessionals();
    });
}

function loadProfessionals() {
    const grid = document.getElementById('professionalsGrid');
    grid.innerHTML = '';
    
    professionals.forEach(pro => {
        const card = createProfessionalCard(pro);
        grid.appendChild(card);
    });
}

function createProfessionalCard(pro) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';
    
    // Create availability dot
    let availabilityDot = 'available';
    let availabilityText = 'Available';
    
    col.innerHTML = `
        <div class="card professional-card" data-id="${pro.id}" data-specialty="${pro.specialty.join(',')}" data-type="${pro.type}" data-availability="${pro.availability}">
            <div class="card-body">
                <div class="d-flex align-items-start mb-3">
                    <div class="professional-image-placeholder me-3" style="width: 60px; height: 60px; background: #e9ecef; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
                        ${pro.image}
                    </div>
                    <div class="flex-grow-1">
                        <h5 class="card-title mb-1">${pro.name}</h5>
                        <p class="text-muted mb-1">${pro.title}</p>
                        <div class="rating mb-1">
                            ${generateStars(pro.rating)}
                            <small class="text-muted">(${pro.reviews})</small>
                        </div>
                    </div>
                </div>
                
                <div class="specialty-tags mb-3">
                    ${pro.specialty.map(spec => `<span class="badge bg-light text-dark">${spec}</span>`).join('')}
                </div>
                
                <p class="card-text small text-muted mb-3">${pro.bio}</p>
                
                <div class="professional-info small text-muted mb-3">
                    <div><i class="fas fa-briefcase"></i> ${pro.experience} experience</div>
                    <div><i class="fas fa-language"></i> ${pro.languages.join(', ')}</div>
                    <div>
                        <i class="fas fa-shield-alt"></i> 
                        ${pro.acceptsInsurance ? 'Accepts insurance' : 'Private pay only'}
                    </div>
                </div>
                
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <strong>$${pro.sessionPrice}</strong>
                        <small class="text-muted">/session</small>
                    </div>
                    <div class="professional-actions">
                        <button class="btn btn-sm btn-outline-primary me-1" onclick="viewProfessional(${pro.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-primary" onclick="bookSession(${pro.id})">
                            <i class="fas fa-calendar-plus"></i> Book
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function setupFilters() {
    const specialtyFilter = document.getElementById('specialtyFilter');
    const typeFilter = document.getElementById('typeFilter');
    const availabilityFilter = document.getElementById('availabilityFilter');
    
    [specialtyFilter, typeFilter, availabilityFilter].forEach(filter => {
        filter.addEventListener('change', filterProfessionals);
    });
}

function filterProfessionals() {
    const searchTerm = document.getElementById('proSearch').value.toLowerCase();
    const specialty = document.getElementById('specialtyFilter').value;
    const type = document.getElementById('typeFilter').value;
    const availability = document.getElementById('availabilityFilter').value;
    
    const cards = document.querySelectorAll('.professional-card');
    
    cards.forEach(card => {
        let show = true;
        const name = card.querySelector('.card-title').textContent.toLowerCase();
        const cardSpecialty = card.getAttribute('data-specialty');
        const cardType = card.getAttribute('data-type');
        const cardAvailability = card.getAttribute('data-availability');
        
        // Search filter
        if (searchTerm && !name.includes(searchTerm)) {
            show = false;
        }
        
        // Specialty filter
        if (specialty && !cardSpecialty.includes(specialty)) {
            show = false;
        }
        
        // Type filter
        if (type && cardType !== type) {
            show = false;
        }
        
        // Availability filter
        if (availability && cardAvailability !== availability) {
            show = false;
        }
        
        card.parentElement.style.display = show ? 'block' : 'none';
    });
}

function clearFilters() {
    document.getElementById('proSearch').value = '';
    document.getElementById('specialtyFilter').value = '';
    document.getElementById('typeFilter').value = '';
    document.getElementById('availabilityFilter').value = '';
    filterProfessionals();
}

function scrollToPros() {
    document.getElementById('find-pros').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

function viewProfessional(id) {
    const pro = professionals.find(p => p.id === id);
    if (pro) {
        alert(`Professional Profile:\n\nName: ${pro.name}\nTitle: ${pro.title}\nSpecialty: ${pro.specialty.join(', ')}\nExperience: ${pro.experience}\nBio: ${pro.bio}\n\nRating: ${pro.rating}/5 (${pro.reviews} reviews)\nSession Price: $${pro.sessionPrice}\nAccepts Insurance: ${pro.acceptsInsurance ? 'Yes' : 'No'}`);
    }
}

function bookSession(id) {
    const pro = professionals.find(p => p.id === id);
    if (!pro) return;
    
    currentProfessional = pro;
    
    document.getElementById('bookSessionTitle').textContent = `Book with ${pro.name}`;
    document.getElementById('bookingProInfo').innerHTML = `
        <div class="d-flex align-items-center">
            <div class="me-3" style="font-size: 2rem;">${pro.image}</div>
            <div>
                <h6 class="mb-1">${pro.name}</h6>
                <p class="text-muted mb-1">${pro.title}</p>
                <p class="mb-0"><strong>$${pro.sessionPrice}</strong> per session</p>
            </div>
        </div>
    `;
    
    // Clear previous inputs
    document.getElementById('sessionDate').value = '';
    document.getElementById('sessionTime').value = '';
    document.getElementById('sessionType').value = 'video';
    document.getElementById('sessionNotes').value = '';
    
    const modal = new bootstrap.Modal(document.getElementById('bookSessionModal'));
    modal.show();
}

function confirmBooking() {
    const date = document.getElementById('sessionDate').value;
    const time = document.getElementById('sessionTime').value;
    const type = document.getElementById('sessionType').value;
    const notes = document.getElementById('sessionNotes').value;
    
    if (!date || !time) {
        showNotification('Please select both date and time.', 'warning');
        return;
    }
    
    if (!currentProfessional) {
        showNotification('Error: Professional not found.', 'error');
        return;
    }
    
    const session = {
        id: Date.now(),
        professional: currentProfessional.name,
        professionalId: currentProfessional.id,
        date: date,
        time: time,
        type: type,
        notes: notes,
        status: 'scheduled',
        timestamp: new Date().getTime()
    };
    
    // Save to localStorage
    let sessions = JSON.parse(localStorage.getItem('therapySessions') || '[]');
    sessions.push(session);
    localStorage.setItem('therapySessions', JSON.stringify(sessions));
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('bookSessionModal'));
    modal.hide();
    
    showNotification(`Session booked with ${currentProfessional.name}!`, 'success');
    currentProfessional = null;
}

function viewMySessions() {
    document.getElementById('find-pros').style.display = 'none';
    document.getElementById('my-sessions').style.display = 'block';
    loadSessions();
}

function hideSessions() {
    document.getElementById('find-pros').style.display = 'block';
    document.getElementById('my-sessions').style.display = 'none';
}

function showTab(tabName) {
    // Update active tab
    document.querySelectorAll('#sessionsTabs .nav-link').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Show correct content
    document.getElementById('upcomingSessions').style.display = 'none';
    document.getElementById('pastSessions').style.display = 'none';
    document.getElementById(tabName + 'Sessions').style.display = 'block';
}

function loadSessions() {
    const sessions = JSON.parse(localStorage.getItem('therapySessions') || '[]');
    const now = new Date().getTime();
    
    const upcoming = sessions.filter(s => new Date(s.date + 'T' + s.time) > new Date());
    const past = sessions.filter(s => new Date(s.date + 'T' + s.time) <= new Date());
    
    // Display upcoming sessions
    const upcomingList = document.getElementById('upcomingSessionsList');
    const noUpcoming = document.getElementById('noUpcomingSessions');
    
    if (upcoming.length === 0) {
        noUpcoming.style.display = 'block';
        upcomingList.innerHTML = '';
    } else {
        noUpcoming.style.display = 'none';
        upcomingList.innerHTML = upcoming.map(session => `
            <div class="session-card card mb-2">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <h6 class="mb-1">${session.professional}</h6>
                            <p class="mb-1">
                                <i class="fas fa-calendar"></i> ${new Date(session.date).toLocaleDateString()} 
                                at ${formatTime(session.time)}
                            </p>
                            <p class="mb-1 text-muted">
                                <i class="fas fa-video"></i> ${session.type.charAt(0).toUpperCase() + session.type.slice(1)} Session
                            </p>
                            ${session.notes ? `<p class="mb-0"><small>Notes: ${session.notes}</small></p>` : ''}
                        </div>
                        <div class="session-actions">
                            <button class="btn btn-sm btn-outline-danger" onclick="cancelSession(${session.id})">
                                <i class="fas fa-times"></i> Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Display past sessions
    const pastList = document.getElementById('pastSessionsList');
    const noPast = document.getElementById('noPastSessions');
    
    if (past.length === 0) {
        noPast.style.display = 'block';
        pastList.innerHTML = '';
    } else {
        noPast.style.display = 'none';
        pastList.innerHTML = past.map(session => `
            <div class="session-card card mb-2 past">
                <div class="card-body">
                    <div>
                        <h6 class="mb-1">${session.professional}</h6>
                        <p class="mb-1">
                            <i class="fas fa-calendar"></i> ${new Date(session.date).toLocaleDateString()} 
                            at ${formatTime(session.time)}
                        </p>
                        <p class="mb-1 text-muted">
                            <i class="fas fa-video"></i> ${session.type.charAt(0).toUpperCase() + session.type.slice(1)} Session
                        </p>
                        ${session.notes ? `<p class="mb-0"><small>Notes: ${session.notes}</small></p>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

function cancelSession(sessionId) {
    if (confirm('Are you sure you want to cancel this session?')) {
        let sessions = JSON.parse(localStorage.getItem('therapySessions') || '[]');
        sessions = sessions.filter(s => s.id !== sessionId);
        localStorage.setItem('therapySessions', JSON.stringify(sessions));
        
        showNotification('Session cancelled.', 'info');
        loadSessions();
    }
}

function submitQuestion() {
    const question = document.getElementById('questionText').value.trim();
    const category = document.getElementById('questionCategory').value;
    const anonymous = document.getElementById('anonymousQuestion').checked;
    
    if (!question) {
        showNotification('Please enter your question.', 'warning');
        return;
    }
    
    const questionData = {
        id: Date.now(),
        question: question,
        category: category,
        anonymous: anonymous,
        timestamp: new Date().getTime(),
        status: 'submitted'
    };
    
    // Save to localStorage
    let questions = JSON.parse(localStorage.getItem('proQuestions') || '[]');
    questions.push(questionData);
    localStorage.setItem('proQuestions', JSON.stringify(questions));
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('askProModal'));
    modal.hide();
    
    // Clear form
    document.getElementById('questionText').value = '';
    document.getElementById('questionCategory').value = 'general';
    document.getElementById('anonymousQuestion').checked = false;
    
    showNotification('Question submitted! You\'ll receive a response within 24 hours.', 'success');
}
// In the confirmBooking function, add:
function confirmBooking() {
    const date = document.getElementById('sessionDate').value;
    const time = document.getElementById('sessionTime').value;
    const type = document.getElementById('sessionType').value;
    const notes = document.getElementById('sessionNotes').value;
    
    if (!date || !time) {
        showNotification('Please select both date and time.', 'warning');
        return;
    }
    
    if (!currentProfessional) {
        showNotification('Error: Professional not found.', 'error');
        return;
    }
    
    const session = {
        id: Date.now(),
        professional: currentProfessional.name,
        professionalId: currentProfessional.id,
        date: date,
        time: time,
        type: type,
        notes: notes,
        status: 'scheduled',
        timestamp: new Date().getTime()
    };
    
    let sessions = JSON.parse(localStorage.getItem('therapySessions') || '[]');
    sessions.push(session);
    localStorage.setItem('therapySessions', JSON.stringify(sessions));
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('bookSessionModal'));
    modal.hide();
    
    showNotification(`Session booked with ${currentProfessional.name}!`, 'success');
    
    // Track achievement
    achievements.checkOnAction('session_booked', sessions.length);
    
    currentProfessional = null;
}