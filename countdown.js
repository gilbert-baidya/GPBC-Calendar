/**
 * Dynamic Countdown Timer System
 * GPBC Regular Services and Special Events
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
                icon: '🎵'
            },
            {
                name: 'Fasting Prayer',
                day: 6, // Saturday
                time: '12:00', // 12:00 PM
                duration: 120,
                icon: '🙏'
            },
            {
                name: 'Sunday Service',
                day: 0, // Sunday
                time: '17:00', // 5:00 PM
                duration: 150,
                icon: '⛪'
            }
        ];

        // Special events (YYYY-MM-DD format)
        this.specialEvents = [
            {
                name: 'Pre-Christmas Service',
                date: '2025-12-13',
                time: '17:00', // 5:00 PM
                icon: '🎄',
                badge: 'Special'
            },
            {
                name: 'Christmas Eve Service',
                date: '2025-12-24',
                time: '17:00', // 5:00 PM
                icon: '🌟',
                badge: 'Christmas'
            },
            {
                name: 'Gratitude & New Year Celebration',
                date: '2025-12-31',
                time: '22:30', // 10:30 PM
                icon: '🎉',
                badge: 'New Year'
            }
        ];

        this.init();
    }

    init() {
        this.createCountdownSection();
        this.updateCountdowns();
        // Update every second
        setInterval(() => this.updateCountdowns(), 1000);
    }

    createCountdownSection() {
        const section = document.createElement('section');
        section.className = 'countdown-section fade-in';
        section.innerHTML = `
            <div class="countdown-container">
                <div class="countdown-header">
                    <h2>⏰ Upcoming Services & Events</h2>
                    <p>Join us in worship and celebration</p>
                </div>
                
                <div class="service-timers" id="serviceTimers"></div>
                
                <div class="special-events-header">
                    <h3>✨ Special Events</h3>
                    <p>Don't miss these celebration services</p>
                </div>
                <div class="special-events" id="specialEvents"></div>
            </div>
        `;

        // Insert after hero section
        const hero = document.querySelector('.hero');
        if (hero && hero.nextElementSibling) {
            hero.parentNode.insertBefore(section, hero.nextElementSibling);
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

    createCountdownHTML(countdown) {
        return `
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

    updateCountdowns() {
        this.updateServices();
        this.updateSpecialEvents();
    }

    updateServices() {
        const container = document.getElementById('serviceTimers');
        if (!container) return;

        const now = new Date();
        let html = '';

        this.services.forEach(service => {
            const nextTime = this.getNextOccurrence(service.day, service.time);
            const isLive = this.isServiceHappeningNow(nextTime, service.duration);
            const timeUntil = nextTime - now;

            const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const formattedTime = this.formatTime(service.time);

            html += `
                <div class="service-card ${isLive ? 'happening-now' : ''}">
                    <div class="service-icon">${service.icon}</div>
                    <h3 class="service-title">${service.name}</h3>
                    <p class="service-time">${dayNames[service.day]}s at ${formattedTime}</p>
                    ${isLive ? 
                        '<div class="service-status status-live">🔴 HAPPENING NOW!</div>' :
                        '<div class="service-status status-upcoming">Upcoming</div>'
                    }
                    ${!isLive ? this.createCountdownHTML(this.formatCountdown(timeUntil)) : '<p style="text-align: center; font-size: 1.2rem; color: var(--success); font-weight: 700;">Join us now! 🙌</p>'}
                </div>
            `;
        });

        container.innerHTML = html;
    }

    updateSpecialEvents() {
        const container = document.getElementById('specialEvents');
        if (!container) return;

        const now = new Date();
        let html = '';
        let hasUpcoming = false;

        // Filter out past events and sort by date
        const upcomingEvents = this.specialEvents
            .map(event => {
                const [year, month, day] = event.date.split('-').map(Number);
                const [hours, minutes] = event.time.split(':').map(Number);
                const eventDate = new Date(year, month - 1, day, hours, minutes);
                return { ...event, eventDate };
            })
            .filter(event => event.eventDate > now)
            .sort((a, b) => a.eventDate - b.eventDate);

        if (upcomingEvents.length === 0) {
            container.innerHTML = `
                <div class="no-upcoming-events">
                    <div class="icon">📅</div>
                    <p>No special events scheduled at this time.<br>Check back soon for updates!</p>
                </div>
            `;
            return;
        }

        upcomingEvents.forEach(event => {
            const timeUntil = event.eventDate - now;
            const formattedDate = this.formatDate(event.eventDate);
            const formattedTime = this.formatTime(event.time);

            html += `
                <div class="event-card">
                    <div class="event-badge">${event.badge}</div>
                    <div class="event-icon">${event.icon}</div>
                    <h3 class="event-title">${event.name}</h3>
                    <p class="event-date">${formattedDate} at ${formattedTime}</p>
                    <div class="event-countdown">
                        <div class="event-countdown-label">Countdown to Event</div>
                        ${this.createCountdownHTML(this.formatCountdown(timeUntil))}
                    </div>
                </div>
            `;
            hasUpcoming = true;
        });

        container.innerHTML = html;
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
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new CountdownSystem();
    });
} else {
    new CountdownSystem();
}

export default CountdownSystem;
