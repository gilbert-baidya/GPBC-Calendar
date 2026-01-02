/**
 * Homepage Dynamic Events Display
 * Automatically renders upcoming special events from events.js data
 */

console.log('Homepage Events script loaded');

class HomepageEvents {
    constructor() {
        this.container = document.getElementById('dynamic-events-container');
        if (this.container) {
            console.log('Dynamic events container found');
            this.init();
        } else {
            console.warn('No dynamic events container found on this page');
        }
    }

    init() {
        this.renderUpcomingEvents();
    }

    getSpecialGPBCEvents() {
        // Get current date
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Get events from the global events array (from events.js)
        if (typeof events === 'undefined') {
            console.error('Events array not found. Make sure events.js is loaded before homepage-events.js');
            return [];
        }

        // Filter for special events that haven't passed
        const specialEvents = events.filter(event => {
            const eventDate = new Date(event.date);
            eventDate.setHours(0, 0, 0, 0);
            
            // Event must be in the future or today
            if (eventDate < today) return false;
            
            // Include GPBC special events (not recurring weekly services)
            const isGPBCSpecial = event.category === 'gpbc' && 
                                 event.eventType === 'worship' &&
                                 event.description && 
                                 event.description.includes('Special service');
            
            // Include Christian holidays that the church celebrates
            const isChristianHoliday = event.category === 'christian' && 
                                      (event.name.includes('Easter') || 
                                       event.name.includes('Christmas') || 
                                       event.name.includes('Good Friday') || 
                                       event.name.includes('Holy Thursday') ||
                                       event.name.includes('Pentecost') ||
                                       event.name.includes('Advent'));
            
            return isGPBCSpecial || isChristianHoliday;
        });

        // Sort by date (earliest first)
        specialEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Return up to 3 upcoming events
        return specialEvents.slice(0, 3);
    }

    formatEventDate(dateString) {
        const date = new Date(dateString);
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return date.toLocaleDateString('en-US', options);
    }

    getEventIcon(event) {
        // Return emoji icons based on event name/type
        if (event.name.includes('Christmas') || event.name.includes('Advent')) return '🎄';
        if (event.name.includes('Easter')) return '🐣';
        if (event.name.includes('New Year')) return '🎉';
        if (event.name.includes('Prayer') || event.name.includes('Fasting')) return '🙏';
        if (event.name.includes('Good Friday') || event.name.includes('Maundy') || event.name.includes('Holy Thursday')) return '✝️';
        if (event.name.includes('Pentecost')) return '🕊️';
        if (event.name.includes('Thanksgiving')) return '🦃';
        if (event.eventType === 'worship') return '🎵';
        if (event.eventType === 'fellowship') return '🤝';
        return '⛪'; // Default church icon
    }

    getEventDetails(event) {
        // Extract or generate event details
        const details = {
            when: this.formatEventDate(event.date),
            time: event.eventTime || 'TBA',
            where: '1325 Richardson St, San Bernardino, CA 92408',
            whatToExpect: this.getWhatToExpect(event),
            whosInvited: 'Everyone! Bring family and friends. All ages welcome.'
        };

        return details;
    }

    getWhatToExpect(event) {
        // Generate "What to Expect" based on event type or name
        if (event.description && event.description.length > 50) {
            return event.description;
        }

        if (event.name.includes('Christmas')) {
            return 'Celebrate the birth of Jesus with Christmas carols, a special message, candlelight service, and fellowship';
        }
        if (event.name.includes('Easter')) {
            return 'Celebrate the resurrection of Jesus Christ with uplifting worship, powerful message, and communion';
        }
        if (event.name.includes('New Year')) {
            return 'Worship music, testimonies of gratitude, prayer for the new year, and fellowship';
        }
        if (event.name.includes('Good Friday')) {
            return 'A solemn service remembering Jesus\'s sacrifice, featuring scripture readings, worship, and communion';
        }
        if (event.name.includes('Holy Thursday') || event.name.includes('Maundy')) {
            return 'A beautiful service commemorating the Last Supper, including foot washing ceremony and communion';
        }
        if (event.name.includes('Prayer') || event.name.includes('Fasting')) {
            return 'Dedicated time of corporate prayer, worship, and seeking God\'s guidance';
        }

        return 'Special worship service with music, prayer, biblical teaching, and fellowship';
    }

    createEventCard(event) {
        const icon = this.getEventIcon(event);
        const details = this.getEventDetails(event);
        
        const card = document.createElement('section');
        card.className = 'special-event-details';
        card.id = `event-${event.date}`;
        card.setAttribute('aria-labelledby', `event-heading-${event.date}`);

        card.innerHTML = `
            <div class="event-details-content">
                <div class="event-header-section">
                    <span class="event-icon-large" aria-hidden="true">${icon}</span>
                    <div>
                        <h2 id="event-heading-${event.date}">${event.name}</h2>
                        <p class="event-tagline">${event.description || 'Join us for this special gathering'}</p>
                    </div>
                </div>
                
                <div class="event-info-grid">
                    <div class="event-info-item">
                        <span class="info-icon">📅</span>
                        <div>
                            <h3>When</h3>
                            <time datetime="${event.date}T${details.time}">${details.when}${details.time !== 'TBA' ? ' at ' + details.time : ''}</time>
                            ${event.name.includes('New Year') ? '<p class="info-subtext">Ring in the New Year with us!</p>' : ''}
                        </div>
                    </div>
                    
                    <div class="event-info-item">
                        <span class="info-icon">📍</span>
                        <div>
                            <h3>Where</h3>
                            <address>${details.where.split(',')[0]}<br>${details.where.split(',').slice(1).join(',')}</address>
                            <a href="https://maps.google.com/?q=1325+Richardson+St,+San+Bernardino,+CA+92408" target="_blank" rel="noopener noreferrer" class="map-link">Get Directions →</a>
                        </div>
                    </div>
                    
                    <div class="event-info-item">
                        <span class="info-icon">🎵</span>
                        <div>
                            <h3>What to Expect</h3>
                            <p>${details.whatToExpect}</p>
                        </div>
                    </div>
                    
                    <div class="event-info-item">
                        <span class="info-icon">👥</span>
                        <div>
                            <h3>Who's Invited</h3>
                            <p>${details.whosInvited}</p>
                        </div>
                    </div>
                </div>
                
                <div class="event-cta">
                    <a href="give.html" class="btn btn-primary">RSVP / Support Event</a>
                    <a href="calendar.html" class="btn btn-secondary">View Full Calendar</a>
                </div>
            </div>
        `;

        return card;
    }

    renderUpcomingEvents() {
        const upcomingEvents = this.getSpecialGPBCEvents();

        console.log('Found special events:', upcomingEvents.length);

        if (upcomingEvents.length === 0) {
            // Hide the container if no events
            this.container.style.display = 'none';
            console.log('No upcoming special events to display');
            return;
        }

        // Clear container
        this.container.innerHTML = '';
        this.container.style.display = 'block';

        // Render each event
        upcomingEvents.forEach(event => {
            const eventCard = this.createEventCard(event);
            this.container.appendChild(eventCard);
        });

        console.log(`Rendered ${upcomingEvents.length} event card(s)`);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new HomepageEvents();
    });
} else {
    new HomepageEvents();
}
