/**
 * Dynamic Countdown Timer System
 * GPBC Next Upcoming Service/Event Banner
 */

class CountdownSystem {
    constructor() {
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
        // Update every second
        setInterval(() => this.updateCountdown(), 1000);
    }

    createCountdownBanner() {
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

    createCountdownHTML(countdown, isLive = false) {
        if (isLive) {
            return `
                <div class="live-now-message">
                    <span class="live-dot"></span>
                    HAPPENING NOW!
                    <span class="live-dot"></span>
                </div>
            `;
        }

        return `
            <div class="countdown-label">Time Remaining</div>
            <div class="countdown-timer">
                <div class="time-unit">
                    <span class="time-value">${String(countdown.days).padStart(2, '0')}</span>
                    <span class="time-label">Days</span>
                </div>
                <div class="time-unit">
                    <span class="time-value">${String(countdown.hours).padStart(2, '0')}</span>
                    <span class="time-label">Hours</span>
                </div>
                <div class="time-unit">
                    <span class="time-value">${String(countdown.minutes).padStart(2, '0')}</span>
                    <span class="time-label">Mins</span>
                </div>
                <div class="time-unit">
                    <span class="time-value">${String(countdown.seconds).padStart(2, '0')}</span>
                    <span class="time-label">Secs</span>
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
        if (!container) return;

        const now = new Date();
        
        // Get all events with their countdowns
        const allEvents = [];
        
        // Add regular services
        this.services.forEach(service => {
            const nextTime = this.getNextOccurrence(service.day, service.time);
            const isLive = this.isServiceHappeningNow(service);
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
            container.innerHTML = '<p style="color: white; text-align: center;">No upcoming services</p>';
            return;
        }

        // Create HTML for all services
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        
        const servicesHTML = allEvents.map(event => {
            const countdown = this.formatCountdown(event.timeUntil);
            const formattedTime = this.formatTime(event.time);
            const isService = event.type === 'service';
            
            let dateTimeStr;
            if (isService) {
                dateTimeStr = `${dayNames[event.day]}s at ${formattedTime}`;
            } else {
                dateTimeStr = `${this.formatDate(event.nextTime)} at ${formattedTime}`;
            }
            
            return `
                <div class="service-card ${event.isLive ? 'happening-now' : ''}">
                    <div class="service-header">
                        <div class="service-icon">${event.icon}</div>
                        <div class="service-title">
                            <h3>${event.name}</h3>
                            <div class="service-badge">${event.badge || (isService ? 'Regular Service' : 'Special Event')}</div>
                        </div>
                    </div>
                    <div class="service-datetime">📅 ${dateTimeStr}</div>
                    <div class="service-countdown">
                        ${this.createCountdownHTML(countdown, event.isLive)}
                    </div>
                </div>
            `;
        }).join('');
        
        container.innerHTML = `
            <div class="all-services-banner">
                <h2 class="services-main-title">⏰ Upcoming Services</h2>
                <div class="services-grid">
                    ${servicesHTML}
                </div>
            </div>
        `;
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
}

// Initialize countdown system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new CountdownSystem();
});

// Also try immediate initialization if DOM is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(() => new CountdownSystem(), 1);
}
