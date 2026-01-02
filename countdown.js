/**
 * Dynamic Countdown Timer System
 * GPBC Next Upcoming Service/Event Banner
 */

console.log('Countdown.js loaded');

class CountdownSystem {
    constructor() {
        console.log('CountdownSystem constructor called');
        // Regular weekly services
        this.services = [
            {
                name: 'Worship Practice & Session',
                day: 5, // Friday (0=Sunday, 5=Friday)
                time: '17:30', // 5:30 PM
                duration: 120, // 2 hours
                icon: '🎵',
                type: 'service'
            },
            {
                name: 'Fasting Prayer',
                day: 6, // Saturday
                time: '12:00', // 12:00 PM
                duration: 120,
                icon: '🙏',
                type: 'service'
            },
            {
                name: 'Sunday Service',
                day: 0, // Sunday
                time: '17:00', // 5:00 PM
                duration: 150,
                icon: '⛪',
                type: 'service'
            }
        ];

        // Special events (YYYY-MM-DD format)
        this.specialEvents = [
            {
                name: 'Pre-Christmas Service',
                date: '2025-12-13',
                time: '17:00', // 5:00 PM
                icon: '🎄',
                badge: 'Special Event',
                type: 'event'
            },
            {
                name: 'Christmas Eve Service',
                date: '2025-12-24',
                time: '17:00', // 5:00 PM
                icon: '🌟',
                badge: 'Christmas',
                type: 'event'
            },
            {
                name: 'Gratitude & New Year Celebration',
                date: '2025-12-31',
                time: '22:30', // 10:30 PM
                icon: '🎉',
                badge: 'New Year',
                type: 'event'
            }
        ];

        // Auto-init on home page OR About page
        if (document.querySelector('.hero') || document.getElementById('nextServiceCountdown')) {
            this.init();
        }
    }

    init() {
        this.createCountdownBanner();
        this.updateCountdown();
        this.updateInlineCountdown(); // Initialize inline special event countdown
        // Update every second
        setInterval(() => {
            this.updateCountdown();
            this.updateInlineCountdown();
        }, 1000);
    }

    createCountdownBanner() {
        // Element already exists in HTML - skip creation
        const existing = document.getElementById('nextEventBanner');
        if (existing) {
            console.log('Countdown banner element found, will populate via updateCountdown()');
            return;
        }

        // Do not auto-create countdown banner - it should be explicitly in HTML
        console.log('nextEventBanner element not found - skipping countdown creation');
        return;

        /* Disabled auto-creation - keeping code for reference
        const bannerDiv = document.createElement('div');
        bannerDiv.id = 'nextEventBanner';

        // Check if we're on About page first (has dedicated container)
        const container = document.getElementById('nextServiceCountdown');
        if (container) {
            // About page: insert into dedicated container
            bannerDiv.className = 'next-event-banner';
            container.appendChild(bannerDiv);
        } else {
            // Home page: insert BEFORE hero section (after nav, before hero title)
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                bannerDiv.className = 'countdown-hero-banner';
                heroSection.parentNode.insertBefore(bannerDiv, heroSection);
            }
        }
        */
    }

    getNextOccurrence(dayOfWeek, time) {
        const now = new Date();
        const [hours, minutes] = time.split(':').map(Number);
        
        const next = new Date();
        next.setHours(hours, minutes, 0, 0);
        
        // Calculate days until next occurrence
        const daysUntil = (dayOfWeek - now.getDay() + 7) % 7;
        
        if (daysUntil === 0) {
            // Same day - check if time has passed
            if (now > next) {
                next.setDate(next.getDate() + 7);
            }
        } else {
            next.setDate(next.getDate() + daysUntil);
        }
        
        return next;
    }

    isServiceHappeningNow(nextTime, duration) {
        const now = new Date();
        const endTime = new Date(nextTime.getTime() + duration * 60000);
        return now >= nextTime && now <= endTime;
    }

    formatCountdown(ms) {
        const seconds = Math.floor((ms / 1000) % 60);
        const minutes = Math.floor((ms / (1000 * 60)) % 60);
        const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
        const days = Math.floor(ms / (1000 * 60 * 60 * 24));

        return { days, hours, minutes, seconds };
    }

    createCountdownHTML(countdown, isLive = false, cardId = '') {
        if (isLive) {
            return `
                <div class="live-now-message" data-translate="no">
                    <span class="live-dot"></span>
                    <span data-lang="en">HAPPENING NOW!</span>
                    <span data-lang="bn" style="display:none;">এখন চলছে!</span>
                    <span class="live-dot"></span>
                </div>
            `;
        }

        return `
            <div class="countdown-label">
                <span data-lang="en">Time Remaining</span>
                <span data-lang="bn" style="display:none;">বাকি সময়</span>
            </div>
            <div class="countdown-timer" data-translate="no">
                <div class="time-unit">
                    <span class="time-value" data-countdown-days="${cardId}" data-translate="no">${String(countdown.days).padStart(2, '0')}</span>
                    <span class="time-label"><span data-lang="en">Days</span><span data-lang="bn" style="display:none;">দিন</span></span>
                </div>
                <div class="time-unit">
                    <span class="time-value" data-countdown-hours="${cardId}" data-translate="no">${String(countdown.hours).padStart(2, '0')}</span>
                    <span class="time-label"><span data-lang="en">Hours</span><span data-lang="bn" style="display:none;">ঘণ্টা</span></span>
                </div>
                <div class="time-unit">
                    <span class="time-value" data-countdown-minutes="${cardId}" data-translate="no">${String(countdown.minutes).padStart(2, '0')}</span>
                    <span class="time-label"><span data-lang="en">Mins</span><span data-lang="bn" style="display:none;">মিনিট</span></span>
                </div>
                <div class="time-unit">
                    <span class="time-value" data-countdown-seconds="${cardId}" data-translate="no">${String(countdown.seconds).padStart(2, '0')}</span>
                    <span class="time-label"><span data-lang="en">Secs</span><span data-lang="bn" style="display:none;">সেকেন্ড</span></span>
                </div>
            </div>
        `;
    }

    getNextEvent() {
        const now = new Date();
        const allEvents = [];

        // Add all services with their next occurrences
        this.services.forEach(service => {
            const nextTime = this.getNextOccurrence(service.day, service.time);
            const isLive = this.isServiceHappeningNow(nextTime, service.duration);
            
            allEvents.push({
                ...service,
                nextTime,
                isLive,
                sortTime: isLive ? now : nextTime
            });
        });

        // Add special events that haven't passed
        this.specialEvents.forEach(event => {
            const [year, month, day] = event.date.split('-').map(Number);
            const [hours, minutes] = event.time.split(':').map(Number);
            const eventDate = new Date(year, month - 1, day, hours, minutes);
            
            if (eventDate > now) {
                allEvents.push({
                    ...event,
                    nextTime: eventDate,
                    isLive: false,
                    sortTime: eventDate
                });
            }
        });

        // Sort by time and return the next one
        allEvents.sort((a, b) => a.sortTime - b.sortTime);
        return allEvents[0] || null;
    }

    updateCountdown() {
        const container = document.getElementById('nextEventBanner');
        
        console.log('Countdown update:', {
            mainContainer: !!container
        });
        
        if (!container) {
            console.warn('No countdown container found');
            return;
        }

        const now = new Date();
        
        // Check if we're on About page (shows all services) or Home page (shows only next service)
        const isAboutPage = document.getElementById('nextServiceCountdown') !== null;
        
        // Get all events with their countdowns
        const allEvents = [];
        
        // Add regular services
        this.services.forEach(service => {
            const nextTime = this.getNextOccurrence(service.day, service.time);
            const isLive = this.isServiceHappeningNow(nextTime, service.duration);
            const timeUntil = nextTime - now;
            
            allEvents.push({
                ...service,
                nextTime: nextTime,
                timeUntil: timeUntil,
                isLive: isLive,
                sortTime: nextTime,
                badge: 'Regular Service'
            });
        });
        
        // Add special events
        this.specialEvents.forEach(event => {
            const eventDate = new Date(event.date + 'T' + event.time);
            if (eventDate > now) {
                const timeUntil = eventDate - now;
                allEvents.push({
                    ...event,
                    nextTime: eventDate,
                    timeUntil: timeUntil,
                    isLive: false,
                    sortTime: eventDate,
                    badge: 'Special Event'
                });
            }
        });
        
        // Sort by time
        allEvents.sort((a, b) => a.sortTime - b.sortTime);
        
        if (allEvents.length === 0) {
            container.innerHTML = '<p style="color: #6b6b6b; text-align: center; padding: 1rem;">No upcoming services</p>';
            return;
        }

        // Home page: show only the next event. About page: show all events
        const eventsToShow = isAboutPage ? allEvents : [allEvents[0]];
        
        // Check if this is the top strip or regular countdown section
        const isTopStrip = container.classList.contains('countdown-top-strip');
        
        if (isTopStrip) {
            // Render compact horizontal strip for top of page
            const event = eventsToShow[0]; // Always show only next event in top strip
            const countdown = this.formatCountdown(event.timeUntil);
            const formattedTime = this.formatTime(event.time);
            const isService = event.type === 'service';
            const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            
            let dateTimeStr;
            if (isService) {
                dateTimeStr = `Every ${dayNames[event.day]} at ${formattedTime}`;
            } else {
                dateTimeStr = `${this.formatDate(event.nextTime)} at ${formattedTime}`;
            }
            
            const cardId = `top-strip-${Date.now()}`;
            
            container.innerHTML = `
                <div class="next-event-banner ${event.isLive ? 'happening-now' : ''}" data-card-id="${cardId}">
                    <div class="event-header">
                        <span class="event-icon" data-translate="no">${event.icon}</span>
                        <div class="event-title-wrapper">
                            <div class="event-title">
                                <span data-lang="en">${event.name}</span>
                            </div>
                            ${event.badge ? `<span class="event-badge">${event.badge}</span>` : ''}
                        </div>
                    </div>
                    <div class="event-info">
                        <p data-translate="no">📅 ${dateTimeStr}</p>
                        <p data-translate="no">📍 1325 Richardson St, San Bernardino, CA</p>
                    </div>
                    ${event.isLive ? 
                        `<div class="live-badge">
                            <span data-lang="en">🔴 HAPPENING NOW</span>
                            <span data-lang="bn" style="display:none;">🔴 এখন চলছে</span>
                        </div>` :
                        `<div class="countdown-display">
                            ${this.createCountdownHTML(countdown, false, cardId)}
                        </div>`
                    }
                </div>
            `;
        } else {
            // Render traditional card-based countdown for about page or other sections
            const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            
            const servicesHTML = eventsToShow.map(event => {
                const countdown = this.formatCountdown(event.timeUntil);
                const formattedTime = this.formatTime(event.time);
                const isService = event.type === 'service';
                
                let dateTimeStr;
                if (isService) {
                    dateTimeStr = `${dayNames[event.day]}s at ${formattedTime}`;
                } else {
                    dateTimeStr = `${this.formatDate(event.nextTime)} at ${formattedTime}`;
                }
                
                const cardId = `card-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
                return `
                    <div class="service-card ${event.isLive ? 'happening-now' : ''}" data-card-id="${cardId}">
                        <div class="service-header">
                            <div class="service-icon" data-translate="no">${event.icon}</div>
                            <div class="service-title">
                                <h3>${event.name}</h3>
                                <div class="service-badge">${event.badge || (isService ? 'Regular Service' : 'Special Event')}</div>
                            </div>
                        </div>
                        <div class="service-datetime" data-translate="no">📅 ${dateTimeStr}</div>
                        <div class="service-countdown">
                            ${this.createCountdownHTML(countdown, event.isLive, cardId)}
                        </div>
                    </div>
                `;
            }).join('');
            
            // Different titles for home vs about page
            const title = isAboutPage ? '⏰ Upcoming Services' : '⏰ Next Service';
            
            container.innerHTML = `
                <div class="all-services-banner">
                    <h2 class="services-main-title">${title}</h2>
                    <div class="services-grid">
                        ${servicesHTML}
                    </div>
                </div>
            `;
        }
    }

    formatTime(time) {
        const [hours, minutes] = time.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        return `${displayHours}:${String(minutes).padStart(2, '0')} ${period}`;
    }

    formatDate(date) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    updateCountdownValues() {
        // Update countdown numbers without re-rendering entire HTML
        // This preserves DOM structure during translations
        const now = new Date();
        
        // Update all countdown cards
        document.querySelectorAll('.service-card').forEach(card => {
            const cardId = card.getAttribute('data-card-id');
            if (!cardId) return;
            
            // Find countdown value elements for this card
            const daysEl = card.querySelector(`[data-countdown-days="${cardId}"]`);
            const hoursEl = card.querySelector(`[data-countdown-hours="${cardId}"]`);
            const minutesEl = card.querySelector(`[data-countdown-minutes="${cardId}"]`);
            const secondsEl = card.querySelector(`[data-countdown-seconds="${cardId}"]`);
            
            if (daysEl && hoursEl && minutesEl && secondsEl) {
                // Calculate time remaining (simplified - would need event data)
                // This is a fallback update mechanism
                const currentDays = parseInt(daysEl.textContent);
                const currentHours = parseInt(hoursEl.textContent);
                const currentMinutes = parseInt(minutesEl.textContent);
                let currentSeconds = parseInt(secondsEl.textContent);
                
                // Decrement seconds
                currentSeconds--;
                if (currentSeconds < 0) {
                    // Full recalculation needed
                    return;
                }
                
                secondsEl.textContent = String(currentSeconds).padStart(2, '0');
            }
        });
    }

    updateInlineCountdown() {
        const banner = document.getElementById('specialEventBanner');
        if (!banner) return;

        // Find the Gratitude & New Year Celebration event
        const specialEvent = this.specialEvents.find(e => e.name === 'Gratitude & New Year Celebration');
        if (!specialEvent) {
            banner.style.display = 'none';
            return;
        }

        const now = new Date();
        const eventDate = new Date(specialEvent.date + 'T' + specialEvent.time);
        
        // Hide banner if event has passed
        if (eventDate <= now) {
            banner.style.display = 'none';
            return;
        }

        // Show banner and calculate countdown
        banner.style.display = 'block';
        const timeUntil = eventDate - now;
        const countdown = this.formatCountdown(timeUntil);

        // Update countdown values
        const daysEl = banner.querySelector('[data-unit="days"]');
        const hoursEl = banner.querySelector('[data-unit="hours"]');
        const minutesEl = banner.querySelector('[data-unit="minutes"]');
        const secondsEl = banner.querySelector('[data-unit="seconds"]');

        if (daysEl && hoursEl && minutesEl && secondsEl) {
            daysEl.textContent = String(countdown.days).padStart(2, '0');
            hoursEl.textContent = String(countdown.hours).padStart(2, '0');
            minutesEl.textContent = String(countdown.minutes).padStart(2, '0');
            secondsEl.textContent = String(countdown.seconds).padStart(2, '0');
        }
    }
}

// Initialize countdown system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded - initializing countdown');
    new CountdownSystem();
});

// Also try immediate initialization if DOM is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    console.log('DOM already loaded - initializing countdown immediately');
    setTimeout(() => new CountdownSystem(), 1);
}
