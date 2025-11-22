// Toolkit Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeToolkit();
});

function initializeToolkit() {
    // Category filter functionality
    const filterButtons = document.querySelectorAll('.category-filter .btn');
    const toolCards = document.querySelectorAll('.tool-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            filterTools(category);
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('toolSearch');
    searchInput.addEventListener('input', function() {
        searchTools(this.value);
    });
    
    // Prompt buttons
    const promptButtons = document.querySelectorAll('.prompt-btn');
    promptButtons.forEach(button => {
        button.addEventListener('click', function() {
            const prompt = this.getAttribute('data-prompt');
            document.getElementById('journalEntry').value = prompt + '\n\n';
        });
    });
    
    // Load any saved journal draft
    loadJournalDraft();
}

function filterTools(category) {
    const sections = document.querySelectorAll('.tool-section');
    const tools = document.querySelectorAll('[data-category]');
    
    if (category === 'all') {
        // Show all sections and tools
        sections.forEach(section => section.style.display = 'block');
        tools.forEach(tool => tool.style.display = 'block');
    } else {
        // Hide all sections first
        sections.forEach(section => section.style.display = 'none');
        
        // Show tools that match category and their parent sections
        tools.forEach(tool => {
            if (tool.getAttribute('data-category') === category) {
                tool.style.display = 'block';
                tool.closest('.tool-section').style.display = 'block';
            } else {
                tool.style.display = 'none';
            }
        });
    }
}

function searchTools(searchTerm) {
    const tools = document.querySelectorAll('.tool-card');
    const lowerSearchTerm = searchTerm.toLowerCase();
    
    tools.forEach(tool => {
        const text = tool.textContent.toLowerCase();
        if (text.includes(lowerSearchTerm)) {
            tool.closest('[data-category]').style.display = 'block';
        } else {
            tool.closest('[data-category]').style.display = 'none';
        }
    });
}

// Drill Functions
function startBoxBreathing() {
    const modal = new bootstrap.Modal(document.getElementById('drillModal'));
    const drillContent = document.getElementById('drillContent');
    
    drillContent.innerHTML = `
        <div class="breathing-instruction">Follow the circle - Breathe in and out</div>
        <div class="breathing-circle">
            <span>Breathe</span>
        </div>
        <div class="breathing-steps">
            <p>1. Breathe IN for 4 seconds</p>
            <p>2. Hold for 4 seconds</p>
            <p>3. Breathe OUT for 4 seconds</p>
            <p>4. Hold for 4 seconds</p>
        </div>
        <div class="mt-3">
            <div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 100%"></div>
            </div>
            <small class="text-muted">Drill will complete in 5 minutes</small>
        </div>
    `;
    
    document.getElementById('drillModalTitle').textContent = 'Box Breathing';
    modal.show();
    
    // Simulate drill completion after 5 seconds (for demo)
    setTimeout(() => {
        if (document.getElementById('drillModal').classList.contains('show')) {
            finishDrill();
        }
    }, 5000);
}

function startBodyScan() {
    const modal = new bootstrap.Modal(document.getElementById('drillModal'));
    const drillContent = document.getElementById('drillContent');
    
    drillContent.innerHTML = `
        <div class="breathing-instruction">Body Scan Meditation</div>
        <div class="text-start">
            <p>1. Close your eyes and take a deep breath</p>
            <p>2. Focus on your toes - notice any sensations</p>
            <p>3. Slowly move up through your body</p>
            <p>4. Release tension in each area</p>
            <p>5. Finish with 3 deep breaths</p>
        </div>
        <div class="mt-3">
            <div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 100%"></div>
            </div>
            <small class="text-muted">Drill will complete in 5 minutes</small>
        </div>
    `;
    
    document.getElementById('drillModalTitle').textContent = 'Body Scan';
    modal.show();
    
    setTimeout(() => {
        if (document.getElementById('drillModal').classList.contains('show')) {
            finishDrill();
        }
    }, 5000);
}

function startAngerRelease() {
    const modal = new bootstrap.Modal(document.getElementById('drillModal'));
    const drillContent = document.getElementById('drillContent');
    
    drillContent.innerHTML = `
        <div class="breathing-instruction">Anger Release Techniques</div>
        <div class="text-start">
            <p>1. Acknowledge the anger without judgment</p>
            <p>2. Take 5 deep belly breaths</p>
            <p>3. Tense and release each muscle group</p>
            <p>4. Visualize the anger leaving your body</p>
            <p>5. Replace with calm, positive energy</p>
        </div>
        <div class="mt-3">
            <div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 100%"></div>
            </div>
            <small class="text-muted">Drill will complete in 5 minutes</small>
        </div>
    `;
    
    document.getElementById('drillModalTitle').textContent = 'Anger Release';
    modal.show();
    
    setTimeout(() => {
        if (document.getElementById('drillModal').classList.contains('show')) {
            finishDrill();
        }
    }, 5000);
}

function finishDrill() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('drillModal'));
    modal.hide();
    
    showNotification('Drill completed! Great work.', 'success');
    
    // Update drill count in localStorage
    let drillCount = parseInt(localStorage.getItem('drillCount') || '0');
    drillCount++;
    localStorage.setItem('drillCount', drillCount.toString());
}

function openSkillBuilder(skill) {
    showNotification(`Opening ${skill} skill builder...`, 'info');
    // In a real app, this would navigate to the skill builder page
}

// Journal Functions
function saveJournalEntry() {
    const entry = document.getElementById('journalEntry').value.trim();
    
    if (!entry) {
        showNotification('Please write something before saving.', 'warning');
        return;
    }
    
    const journalData = {
        date: new Date().toISOString(),
        entry: entry,
        timestamp: new Date().getTime()
    };
    
    let journalEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    journalEntries.push(journalData);
    localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
    
    // Clear the textarea but don't clear draft until saved
    document.getElementById('journalEntry').value = '';
    localStorage.removeItem('journalDraft');
    
    showNotification('Journal entry saved successfully!', 'success');
    
    // Update journal count
    let journalCount = parseInt(localStorage.getItem('journalCount') || '0');
    journalCount++;
    localStorage.setItem('journalCount', journalCount.toString());
}

function viewJournalHistory() {
    const journalEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    
    if (journalEntries.length === 0) {
        alert('No journal entries yet. Start writing!');
        return;
    }
    
    let historyText = 'Your Journal History:\n\n';
    journalEntries.forEach((entry, index) => {
        const date = new Date(entry.date).toLocaleDateString();
        historyText += `${index + 1}. ${date}:\n${entry.entry}\n\n`;
    });
    
    alert(historyText);
}

function loadJournalDraft() {
    const draft = localStorage.getItem('journalDraft');
    if (draft) {
        document.getElementById('journalEntry').value = draft;
    }
}

// Auto-save journal draft
document.getElementById('journalEntry')?.addEventListener('input', function() {
    localStorage.setItem('journalDraft', this.value);
});
// In the finishDrill function, add:
function finishDrill() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('drillModal'));
    modal.hide();
    
    showNotification('Drill completed! Great work.', 'success');
    
    let drillCount = parseInt(localStorage.getItem('drillCount') || '0');
    drillCount++;
    localStorage.setItem('drillCount', drillCount.toString());
    
    // Track achievement
    achievements.checkOnAction('drill_completed', drillCount);
}

// In the saveJournalEntry function, add:
function saveJournalEntry() {
    const entry = document.getElementById('journalEntry').value.trim();
    
    if (!entry) {
        showNotification('Please write something before saving.', 'warning');
        return;
    }
    
    const journalData = {
        date: new Date().toISOString(),
        entry: entry,
        timestamp: new Date().getTime()
    };
    
    let journalEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    journalEntries.push(journalData);
    localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
    
    document.getElementById('journalEntry').value = '';
    localStorage.removeItem('journalDraft');
    
    showNotification('Journal entry saved successfully!', 'success');
    
    let journalCount = parseInt(localStorage.getItem('journalCount') || '0');
    journalCount++;
    localStorage.setItem('journalCount', journalCount.toString());
    
    // Track achievement
    achievements.checkOnAction('journal_created', journalEntries.length);
}