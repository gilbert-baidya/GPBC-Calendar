// Google Sheets Database Integration
// This file handles syncing events with Google Sheets

// Google Sheets API functions
async function loadEventsFromGoogleSheets() {
    if (!USE_GOOGLE_SHEETS || !GOOGLE_SHEETS_URL || GOOGLE_SHEETS_URL === 'YOUR_WEB_APP_URL_HERE') {
        console.log('Google Sheets not configured, using localStorage');
        return false;
    }

    try {
        const response = await fetch(GOOGLE_SHEETS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: JSON.stringify({
                action: 'getEvents'
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.events) {
            // Clear existing GPBC events from array
            for (let i = events.length - 1; i >= 0; i--) {
                if (events[i].category === 'gpbc') {
                    events.splice(i, 1);
                }
            }
            
            // Add events from Google Sheets
            data.events.forEach(event => {
                if (event.date && event.name) {
                    events.push({
                        date: event.date,
                        name: event.name,
                        category: event.category || 'gpbc',
                        description: event.description || '',
                        addedBy: event.addedBy || '',
                        contact: event.contact || '',
                        owner: event.owner || '',
                        timestamp: event.timestamp || ''
                    });
                }
            });
            
            console.log(`Loaded ${data.events.length} events from Google Sheets`);
            return true;
        }
        
        return false;
    } catch (error) {
        console.error('Error loading events from Google Sheets:', error);
        console.log('Falling back to localStorage');
        return false;
    }
}

async function saveEventToGoogleSheets(event) {
    if (!USE_GOOGLE_SHEETS || !GOOGLE_SHEETS_URL || GOOGLE_SHEETS_URL === 'YOUR_WEB_APP_URL_HERE') {
        console.log('Google Sheets not configured, using localStorage');
        return false;
    }

    try {
        const response = await fetch(GOOGLE_SHEETS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: JSON.stringify({
                action: 'addEvent',
                event: {
                    date: event.date,
                    name: event.name,
                    category: event.category,
                    description: event.description || '',
                    addedBy: event.addedBy || '',
                    contact: event.contact || '',
                    owner: event.owner || CODE_OWNER
                }
            })
        });

        const data = await response.json();
        
        if (data.success) {
            console.log('Event saved to Google Sheets successfully');
            return true;
        } else {
            console.error('Failed to save event to Google Sheets:', data.message);
            return false;
        }
    } catch (error) {
        console.error('Error saving event to Google Sheets:', error);
        return false;
    }
}

async function deleteEventFromGoogleSheets(event) {
    if (!USE_GOOGLE_SHEETS || !GOOGLE_SHEETS_URL || GOOGLE_SHEETS_URL === 'YOUR_WEB_APP_URL_HERE') {
        console.log('Google Sheets not configured, using localStorage');
        return false;
    }

    try {
        const response = await fetch(GOOGLE_SHEETS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: JSON.stringify({
                action: 'deleteEvent',
                event: {
                    date: event.date,
                    name: event.name,
                    owner: event.owner || CODE_OWNER
                }
            })
        });

        const data = await response.json();
        
        if (data.success) {
            console.log('Event deleted from Google Sheets successfully');
            return true;
        } else {
            console.error('Failed to delete event from Google Sheets:', data.message);
            return false;
        }
    } catch (error) {
        console.error('Error deleting event from Google Sheets:', error);
        return false;
    }
}

// Show loading indicator
function showLoadingIndicator(message = 'Loading...') {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loadingIndicator';
    loadingDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px 40px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        text-align: center;
    `;
    loadingDiv.innerHTML = `
        <div style="font-size: 1.2em; margin-bottom: 10px;">⏳ ${message}</div>
        <div style="color: #666;">Please wait...</div>
    `;
    document.body.appendChild(loadingDiv);
}

function hideLoadingIndicator() {
    const loadingDiv = document.getElementById('loadingIndicator');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}
