// Calendar Logic
let currentMonth = 0; // January 2026
let currentYear = 2026;
let activeFilters = new Set(['bangladeshi', 'american', 'christian', 'special', 'gpbc']);
let selectedDate = null;
let currentEvent = null;

const CODE_OWNER = 'gilbert-baidya'; // Change to your GitHub username

// Google Sheets Database Configuration
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxN025_2hB-8X00M3cDDkit0HqTSUuh2VttI3GJ26gbaohwKFncar3ExvJtJW4PtuqERQ/exec';
const USE_GOOGLE_SHEETS = true; // Set to false to use localStorage instead

// EmailJS configuration - replace these with your actual values
const EMAILJS_PUBLIC_KEY = '__rLqwMXgJLla26DS';
const EMAILJS_SERVICE_ID = 'service_qndkrol';
const EMAILJS_TEMPLATE_ID = 'template_tf8nnjr';

// Initialize EmailJS for notifications (only if configured)
if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
}

// Initialize calendar on page load
document.addEventListener('DOMContentLoaded', async function() {
    // Load events from Google Sheets if configured
    if (USE_GOOGLE_SHEETS && GOOGLE_SHEETS_URL !== 'YOUR_WEB_APP_URL_HERE') {
        showLoadingIndicator('Loading events from database...');
        const loaded = await loadEventsFromGoogleSheets();
        hideLoadingIndicator();
        
        if (!loaded) {
            // Fallback to localStorage if Google Sheets fails
            loadCustomEvents();
        }
    } else {
        // Use localStorage
        loadCustomEvents();
    }
    
    initializeCalendar();
    setupEventListeners();
    checkAndShowReminders();
    setupDonationModal();
});

function initializeCalendar() {
    renderCalendar();
    renderMonthEvents();
}

function setupEventListeners() {
    // Navigation buttons
    document.getElementById('prevMonth').addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
        renderMonthEvents();
    });

    document.getElementById('nextMonth').addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
        renderMonthEvents();
    });

    // Filter checkboxes
    document.querySelectorAll('.filter').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const category = e.target.dataset.category;
            if (e.target.checked) {
                activeFilters.add(category);
            } else {
                activeFilters.delete(category);
            }
            renderCalendar();
            renderMonthEvents();
        });
    });

    // Print button
    document.getElementById('printBtn').addEventListener('click', () => {
        window.print();
    });

    // Download as image button
    document.getElementById('downloadImageBtn').addEventListener('click', downloadCalendarAsImage);

    // Share button
    document.getElementById('shareBtn').addEventListener('click', shareEvents);

    // Reminder button
    document.getElementById('reminderBtn').addEventListener('click', showReminderModal);

    // Close modals
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Add event form
    document.getElementById('addEventForm').addEventListener('submit', (e) => {
        e.preventDefault();
        addGPBCEvent();
    });

    document.getElementById('cancelAddEvent').addEventListener('click', () => {
        document.getElementById('addEventModal').style.display = 'none';
    });

    // Delete event button
    document.getElementById('deleteEventBtn').addEventListener('click', deleteCurrentEvent);
    
    // Donation button
    document.getElementById('donationBtn').addEventListener('click', showDonationModal);
}

function renderCalendar() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    
    document.getElementById('currentMonth').textContent = `${monthNames[currentMonth]} ${currentYear}`;

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const prevLastDay = new Date(currentYear, currentMonth, 0);
    
    const firstDayIndex = firstDay.getDay();
    const lastDayDate = lastDay.getDate();
    const prevLastDayDate = prevLastDay.getDate();

    const calendarGrid = document.querySelector('.calendar-grid');
    
    // Keep weekday headers
    const weekdayHeaders = calendarGrid.querySelectorAll('.weekday');
    calendarGrid.innerHTML = '';
    weekdayHeaders.forEach(header => calendarGrid.appendChild(header));

    // Previous month days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
        const day = createDayElement(prevLastDayDate - i, true);
        calendarGrid.appendChild(day);
    }

    // Current month days
    const today = new Date();
    for (let i = 1; i <= lastDayDate; i++) {
        const isToday = currentYear === today.getFullYear() && 
                       currentMonth === today.getMonth() && 
                       i === today.getDate();
        const day = createDayElement(i, false, isToday);
        calendarGrid.appendChild(day);
    }

    // Next month days to fill the grid
    const totalCells = firstDayIndex + lastDayDate;
    const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    
    for (let i = 1; i <= remainingCells; i++) {
        const day = createDayElement(i, true);
        calendarGrid.appendChild(day);
    }
}

function createDayElement(dayNumber, isOtherMonth, isToday = false) {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'day';
    
    if (isOtherMonth) {
        dayDiv.classList.add('other-month');
    }
    if (isToday) {
        dayDiv.classList.add('today');
    }

    const dayNumberDiv = document.createElement('div');
    dayNumberDiv.className = 'day-number';
    dayNumberDiv.textContent = dayNumber;
    dayDiv.appendChild(dayNumberDiv);

    // Make day clickable to add events (only for current month days)
    if (!isOtherMonth) {
        dayDiv.style.cursor = 'pointer';
        dayDiv.addEventListener('click', (e) => {
            // Only show add event modal if not clicking on an event marker
            if (!e.target.classList.contains('event-marker')) {
                const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
                showAddEventModal(dateString);
            }
        });
    }

    // Add events for this day
    if (!isOtherMonth) {
        const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
        const dayEvents = getEventsForDate(dateString);
        
        const now = new Date();
        const sevenDaysAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
        
        dayEvents.forEach(event => {
            if (activeFilters.has(event.category)) {
                const eventMarker = document.createElement('div');
                eventMarker.className = `event-marker ${event.category}`;
                
                // Check if event was added in the last 7 days
                const isNew = event.timestamp && new Date(event.timestamp) > sevenDaysAgo;
                const newIcon = isNew ? '🆕 ' : '';
                
                eventMarker.textContent = `${newIcon}${categoryEmojis[event.category]} ${event.name}`;
                
                // Add special styling for new events
                if (isNew) {
                    eventMarker.style.fontWeight = 'bold';
                    eventMarker.style.animation = 'pulse 2s infinite';
                }
                
                eventMarker.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showEventDetail(event);
                });
                dayDiv.appendChild(eventMarker);
            }
        });
    }

    return dayDiv;
}

function getEventsForDate(dateString) {
    return events.filter(event => event.date === dateString);
}

function getEventsForMonth(month, year) {
    return events.filter(event => {
        // Fix timezone issue by treating as local date
        const [eventYear, eventMonth, eventDay] = event.date.split('-');
        return parseInt(eventMonth) - 1 === month && parseInt(eventYear) === year;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
}

function renderMonthEvents() {
    const monthEventsDiv = document.getElementById('monthEvents');
    const monthEvents = getEventsForMonth(currentMonth, currentYear);
    
    if (monthEvents.length === 0) {
        monthEventsDiv.innerHTML = '<p style="color: #666;">No events this month</p>';
        return;
    }

    monthEventsDiv.innerHTML = '';
    
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
    
    monthEvents.forEach(event => {
        if (activeFilters.has(event.category)) {
            const eventItem = document.createElement('div');
            eventItem.className = `event-item ${event.category}`;
            
            // Fix timezone issue by treating as local date
            const [year, month, day] = event.date.split('-');
            const eventDate = new Date(year, month - 1, day);
            const formattedDate = eventDate.toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
            });
            
            // Check if event was added in the last 7 days
            const isNew = event.timestamp && new Date(event.timestamp) > sevenDaysAgo;
            const newBadge = isNew ? '<span style="background: #ff4444; color: white; padding: 2px 8px; border-radius: 10px; font-size: 0.75em; margin-left: 8px; font-weight: bold;">NEW</span>' : '';
            
            // Add special styling for new events
            if (isNew) {
                eventItem.style.background = 'linear-gradient(135deg, #fff3cd 0%, #ffffff 100%)';
                eventItem.style.borderLeft = '4px solid #ff4444';
                eventItem.style.boxShadow = '0 2px 8px rgba(255, 68, 68, 0.2)';
            }
            
            eventItem.innerHTML = `
                <div class="event-name">${categoryEmojis[event.category]} ${event.name}${newBadge}</div>
                <div class="event-date">${formattedDate}</div>
            `;
            
            eventItem.addEventListener('click', () => showEventDetail(event));
            monthEventsDiv.appendChild(eventItem);
        }
    });
}

function showEventDetail(event) {
    currentEvent = event;
    const modal = document.getElementById('eventDetailModal');
    // Fix timezone issue by treating as local date
    const [year, month, day] = event.date.split('-');
    const eventDate = new Date(year, month - 1, day);
    const formattedDate = eventDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric',
        month: 'long', 
        day: 'numeric' 
    });

    document.getElementById('eventTitle').textContent = `${categoryEmojis[event.category]} ${event.name}`;
    document.getElementById('eventDate').textContent = formattedDate;
    document.getElementById('eventDescription').textContent = event.description;
    
    // Remove any existing contact info
    const existingContactInfo = document.querySelector('.event-contact-info');
    if (existingContactInfo) {
        existingContactInfo.remove();
    }
    
    // Add contact info if available
    const descriptionElement = document.getElementById('eventDescription');
    if (event.addedBy || event.contact) {
        const contactInfo = document.createElement('div');
        contactInfo.className = 'event-contact-info';
        contactInfo.style.cssText = `
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid #e9ecef;
            font-size: 0.9em;
            color: #666;
        `;
        contactInfo.innerHTML = `
            <strong>📋 Added by:</strong> ${event.addedBy || 'Unknown'}<br>
            ${event.contact ? `<strong>📞 Contact:</strong> ${event.contact}` : ''}
        `;
        descriptionElement.parentNode.insertBefore(contactInfo, descriptionElement.nextSibling);
    }
    
    const categoryBadge = document.createElement('span');
    categoryBadge.style.cssText = `
        display: inline-block;
        padding: 5px 15px;
        background: ${categoryColors[event.category]};
        color: white;
        border-radius: 15px;
        margin-top: 10px;
        font-size: 0.9em;
    `;
    categoryBadge.textContent = event.category.charAt(0).toUpperCase() + event.category.slice(1);
    
    const categoryDiv = document.getElementById('eventCategory');
    categoryDiv.innerHTML = '';
    categoryDiv.appendChild(categoryBadge);
    
    // Show delete button only for GPBC events created by code owner
    const deleteContainer = document.getElementById('deleteButtonContainer');
    if (event.category === 'gpbc' && event.owner === CODE_OWNER) {
        deleteContainer.style.display = 'block';
    } else {
        deleteContainer.style.display = 'none';
    }
    
    modal.style.display = 'block';
}

function shareEvents() {
    const monthEvents = getEventsForMonth(currentMonth, currentYear);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    
    let shareText = `📅 Grace and Praise Bangladeshi Church\n1325 Richardson Street, CA 92408\n\nCalendar Events - ${monthNames[currentMonth]} ${currentYear}\n\n`;
    
    monthEvents.forEach(event => {
        if (activeFilters.has(event.category)) {
            const [year, month, day] = event.date.split('-');
            const eventDate = new Date(year, month - 1, day);
            const formattedDate = eventDate.toLocaleDateString('en-US', { 
                weekday: 'short',
                month: 'short', 
                day: 'numeric' 
            });
            shareText += `${categoryEmojis[event.category]} ${formattedDate}: ${event.name}\n`;
        }
    });
    
    shareText += `\n---\nView full calendar at Grace and Praise Bangladeshi Church`;

    if (navigator.share) {
        navigator.share({
            title: `Grace and Praise Bangladeshi Church - ${monthNames[currentMonth]} ${currentYear}`,
            text: shareText
        }).catch(err => {
            console.log('Share failed:', err);
            copyToClipboard(shareText);
        });
    } else {
        copyToClipboard(shareText);
    }
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Events copied to clipboard! You can now paste and share them.');
}

function showReminderModal() {
    const modal = document.getElementById('reminderModal');
    const reminderList = document.getElementById('reminderList');
    const reminders = getUpcomingReminders();
    
    if (reminders.length === 0) {
        reminderList.innerHTML = '<p style="color: #666; padding: 20px; text-align: center;">No upcoming reminders for the next 2 months</p>';
    } else {
        reminderList.innerHTML = '';
        reminders.forEach(reminder => {
            const reminderItem = document.createElement('div');
            reminderItem.className = `reminder-item ${reminder.category}`;
            if (reminder.daysUntil <= 30) {
                reminderItem.classList.add('urgent');
            }
            
            reminderItem.innerHTML = `
                <div style="font-weight: bold; margin-bottom: 5px;">
                    ${categoryEmojis[reminder.category]} ${reminder.name}
                </div>
                <div style="color: #666; font-size: 0.9em;">
                    ${reminder.dateFormatted}
                </div>
                <div style="margin-top: 5px; color: ${reminder.daysUntil <= 30 ? '#856404' : '#155724'}; font-weight: bold;">
                    ${reminder.daysUntil} days remaining
                </div>
            `;
            
            reminderList.appendChild(reminderItem);
        });
    }
    
    modal.style.display = 'block';
}

function checkAndShowReminders() {
    // Check if we should show automatic reminders (once per day)
    const lastCheck = localStorage.getItem('lastReminderCheck');
    const today = new Date().toDateString();
    
    if (lastCheck !== today) {
        const reminders = getUpcomingReminders().filter(r => r.daysUntil <= 60);
        if (reminders.length > 0) {
            localStorage.setItem('lastReminderCheck', today);
            // Show a subtle notification
            setTimeout(() => {
                const urgentReminders = reminders.filter(r => r.daysUntil <= 30);
                if (urgentReminders.length > 0) {
                    alert(`🔔 You have ${urgentReminders.length} event(s) coming up in the next month! Click "View Reminders" to see them.`);
                }
            }, 2000);
        }
    }
}

function showAddEventModal(dateString) {
    selectedDate = dateString;
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric',
        month: 'long', 
        day: 'numeric' 
    });
    
    document.getElementById('eventDateInput').value = formattedDate;
    document.getElementById('eventAddedBy').value = '';
    document.getElementById('eventContact').value = '';
    document.getElementById('eventName').value = '';
    document.getElementById('eventDescription').value = '';
    document.getElementById('addEventModal').style.display = 'block';
    document.getElementById('eventAddedBy').focus();
}

async function addGPBCEvent() {
    const addedBy = document.getElementById('eventAddedBy').value.trim();
    const contact = document.getElementById('eventContact').value.trim();
    const name = document.getElementById('eventName').value.trim();
    const description = document.getElementById('eventDescription').value.trim();
    
    if (!addedBy) {
        alert('Please enter your name');
        return;
    }
    
    if (!contact) {
        alert('Please enter your email or phone number');
        return;
    }
    
    if (!name) {
        alert('Please enter an event name');
        return;
    }
    
    const newEvent = {
        date: selectedDate,
        name: name,
        category: 'gpbc',
        description: description || 'Grace and Praise Bangladeshi Church event',
        addedBy: addedBy,
        contact: contact,
        owner: CODE_OWNER, // Mark event as created by code owner
        timestamp: new Date().toISOString() // Add timestamp for "NEW" badge
    };
    
    // Show loading
    showLoadingIndicator('Saving event...');
    
    // Try to save to Google Sheets first
    if (USE_GOOGLE_SHEETS && GOOGLE_SHEETS_URL !== 'YOUR_WEB_APP_URL_HERE') {
        const saved = await saveEventToGoogleSheets(newEvent);
        if (saved) {
            // Reload all events from Google Sheets to get the latest data
            await loadEventsFromGoogleSheets();
        } else {
            // Fallback to localStorage
            events.push(newEvent);
            saveCustomEvents();
        }
    } else {
        // Use localStorage
        events.push(newEvent);
        saveCustomEvents();
    }
    
    hideLoadingIndicator();
    
    // Send email notification
    sendEventNotification(newEvent);
    
    document.getElementById('addEventModal').style.display = 'none';
    renderCalendar();
    renderMonthEvents();
    alert(`✓ Event "${name}" added successfully!`);
}

async function deleteCurrentEvent() {
    if (!currentEvent || currentEvent.category !== 'gpbc' || currentEvent.owner !== CODE_OWNER) {
        alert('Only events created by the code owner can be deleted.');
        return;
    }
    
    if (confirm(`Are you sure you want to delete "${currentEvent.name}"?`)) {
        showLoadingIndicator('Deleting event...');
        
        // Try to delete from Google Sheets first
        if (USE_GOOGLE_SHEETS && GOOGLE_SHEETS_URL !== 'YOUR_WEB_APP_URL_HERE') {
            const deleted = await deleteEventFromGoogleSheets(currentEvent);
            if (deleted) {
                // Reload all events from Google Sheets to get the latest data
                await loadEventsFromGoogleSheets();
            } else {
                // Fallback to localStorage
                console.log('Using localStorage fallback for delete');
                const index = events.findIndex(e => 
                    e.date === currentEvent.date && 
                    e.name === currentEvent.name && 
                    e.category === 'gpbc' &&
                    e.owner === CODE_OWNER
                );
                
                if (index !== -1) {
                    events.splice(index, 1);
                    saveCustomEvents();
                }
            }
        } else {
            // Remove from local array when using localStorage
            const index = events.findIndex(e => 
                e.date === currentEvent.date && 
                e.name === currentEvent.name && 
                e.category === 'gpbc' &&
                e.owner === CODE_OWNER
            );
            
            if (index !== -1) {
                events.splice(index, 1);
                saveCustomEvents();
            }
        }
        
        hideLoadingIndicator();
        
        // Close modal and refresh calendar
        document.getElementById('eventDetailModal').style.display = 'none';
        renderCalendar();
        renderMonthEvents();
        alert(`✓ Event "${currentEvent.name}" deleted successfully!`);
        currentEvent = null;
    }
}

function downloadCalendarAsImage() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    
    // Create a vertical layout container for mobile/reels format (9:16 ratio)
    const originalContainer = document.querySelector('.container');
    const cloneContainer = originalContainer.cloneNode(true);
    
    // Create wrapper for vertical format (1080x1920 - YouTube Shorts/Reels size)
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
        position: fixed;
        left: -10000px;
        top: 0;
        width: 1080px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 40px 30px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;
    
    // Style the cloned container
    cloneContainer.style.cssText = `
        background: white;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        overflow: hidden;
        max-width: 100%;
    `;
    
    // Hide controls in clone
    const controls = cloneContainer.querySelector('.controls');
    if (controls) controls.style.display = 'none';
    
    // Adjust calendar grid for vertical view
    const calendarGrid = cloneContainer.querySelector('.calendar-grid');
    if (calendarGrid) {
        calendarGrid.style.padding = '15px';
        calendarGrid.style.margin = '15px';
    }
    
    // Adjust day cells for better mobile visibility
    const days = cloneContainer.querySelectorAll('.day');
    days.forEach(day => {
        day.style.minHeight = '90px';
        day.style.padding = '8px';
    });
    
    // Adjust event markers
    const eventMarkers = cloneContainer.querySelectorAll('.event-marker');
    eventMarkers.forEach(marker => {
        marker.style.fontSize = '0.7em';
        marker.style.padding = '2px 5px';
    });
    
    // Style events sidebar for vertical view
    const eventsSidebar = cloneContainer.querySelector('.events-sidebar');
    if (eventsSidebar) {
        eventsSidebar.style.padding = '20px';
        eventsSidebar.style.background = '#f8f9fa';
    }
    
    wrapper.appendChild(cloneContainer);
    document.body.appendChild(wrapper);
    
    // Capture with mobile-optimized dimensions
    html2canvas(wrapper, {
        backgroundColor: null,
        scale: 1.5,
        logging: false,
        useCORS: true,
        width: 1080,
        windowWidth: 1080
    }).then(canvas => {
        // Remove temporary wrapper
        document.body.removeChild(wrapper);
        
        // Convert to JPG and download
        canvas.toBlob(function(blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `GPBC-${monthNames[currentMonth]}-${currentYear}-Mobile.jpg`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            alert('✓ Mobile-optimized calendar downloaded!\nPerfect for Instagram Stories, YouTube Shorts, and Facebook Reels!');
        }, 'image/jpeg', 0.95);
    }).catch(err => {
        document.body.removeChild(wrapper);
        console.error('Screenshot failed:', err);
        alert('Failed to capture calendar. Please try again.');
    });
}

function setupDonationModal() {
    // Generate Zelle QR code
    const zelleQR = document.getElementById('zelleQR');
    if (zelleQR && zelleQR.innerHTML === '' && typeof QRCode !== 'undefined') {
        try {
            new QRCode(zelleQR, {
                text: 'mailto:gracepraisebangladeshichurch@gmail.com',
                width: 180,
                height: 180,
                colorDark: '#667eea',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });
        } catch (e) {
            console.log('Error generating Zelle QR code:', e);
        }
    }
    
    // Generate PayPal QR code
    const paypalQR = document.getElementById('paypalQR');
    if (paypalQR && paypalQR.innerHTML === '' && typeof QRCode !== 'undefined') {
        try {
            new QRCode(paypalQR, {
                text: 'https://www.paypal.com/paypalme/gpbchurch',
                width: 180,
                height: 180,
                colorDark: '#0070ba',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });
        } catch (e) {
            console.log('Error generating PayPal QR code:', e);
        }
    }
}

function showDonationModal() {
    try {
        const modal = document.getElementById('donationModal');
        if (!modal) {
            console.error('Donation modal not found');
            return;
        }
        setupDonationModal(); // Ensure QR codes are generated
        modal.style.display = 'block';
    } catch (e) {
        console.error('Error showing donation modal:', e);
        alert('Unable to open donation modal. Please refresh the page and try again.');
    }
}

function sendEventNotification(event) {
    // Skip if EmailJS is not configured
    if (typeof emailjs === 'undefined' || EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
        console.log('Email notifications not configured. Event added successfully without notification.');
        return;
    }
    
    // Format the date nicely
    const [year, month, day] = event.date.split('-');
    const eventDate = new Date(year, month - 1, day);
    const formattedDate = eventDate.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric',
        month: 'long', 
        day: 'numeric' 
    });
    
    // Email template parameters
    const templateParams = {
        to_email: 'gracepraisebangladeshichurch@gmail.com',
        cc_email: 'gilbert.baidya@gmail.com',
        event_name: event.name,
        event_date: formattedDate,
        event_description: event.description,
        added_by: event.addedBy || event.owner || 'User',
        contact_info: event.contact || 'Not provided',
        timestamp: new Date().toLocaleString()
    };
    
    // Send email using EmailJS
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(function(response) {
            console.log('Email notification sent successfully!', response.status, response.text);
        }, function(error) {
            console.log('Failed to send email notification:', error);
        });
}
