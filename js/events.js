// Comprehensive Events Database for 2026
const events = [
    // BANGLADESHI NATIONAL EVENTS
    { date: '2026-02-21', name: 'International Mother Language Day', category: 'bangladeshi', description: 'UNESCO declared day celebrating martyrs who fought for Bengali language rights' },
    { date: '2026-03-17', name: 'Birthday of Bangabandhu Sheikh Mujibur Rahman', category: 'bangladeshi', description: 'National Children\'s Day - Birth anniversary of Father of the Nation' },
    { date: '2026-03-26', name: 'Independence Day', category: 'bangladeshi', description: 'Celebrating Bangladesh\'s declaration of independence in 1971' },
    { date: '2026-04-14', name: 'Pohela Boishakh', category: 'bangladeshi', description: 'Bengali New Year - First day of Bengali calendar year 1433' },
    { date: '2026-05-01', name: 'May Day', category: 'bangladeshi', description: 'International Workers\' Day' },
    { date: '2026-08-15', name: 'National Mourning Day', category: 'bangladeshi', description: 'Remembering martyrdom of Bangabandhu Sheikh Mujibur Rahman' },
    { date: '2026-12-16', name: 'Victory Day', category: 'bangladeshi', description: 'Celebrating victory in the Liberation War of 1971' },

    // AMERICAN EVENTS
    { date: '2026-01-01', name: 'New Year\'s Day', category: 'american', description: 'First day of the year celebration' },
    { date: '2026-01-19', name: 'Martin Luther King Jr. Day', category: 'american', description: 'Honoring civil rights leader Dr. Martin Luther King Jr.' },
    { date: '2026-02-16', name: 'Presidents\' Day', category: 'american', description: 'Honoring all U.S. presidents, especially Washington and Lincoln' },
    { date: '2026-05-25', name: 'Memorial Day', category: 'american', description: 'Honoring military personnel who died in service' },
    { date: '2026-07-04', name: 'Independence Day', category: 'american', description: 'Celebrating U.S. Declaration of Independence (1776)' },
    { date: '2026-09-07', name: 'Labor Day', category: 'american', description: 'Celebrating American workers and labor movement' },
    { date: '2026-10-12', name: 'Columbus Day', category: 'american', description: 'Commemorating Christopher Columbus\'s arrival in the Americas' },
    { date: '2026-11-11', name: 'Veterans Day', category: 'american', description: 'Honoring military veterans' },
    { date: '2026-11-26', name: 'Thanksgiving Day', category: 'american', description: 'Traditional harvest festival and day of gratitude' },

    // CHRISTIAN EVENTS
    { date: '2026-01-06', name: 'Epiphany', category: 'christian', description: 'Celebrating the visit of the Magi to baby Jesus' },
    { date: '2026-02-17', name: 'Ash Wednesday', category: 'christian', description: 'Beginning of Lent - 40 days before Easter' },
    { date: '2026-03-29', name: 'Palm Sunday', category: 'christian', description: 'Commemorating Jesus\'s entry into Jerusalem' },
    { date: '2026-04-02', name: 'Maundy Thursday', category: 'christian', description: 'Commemorating the Last Supper' },
    { date: '2026-04-03', name: 'Good Friday', category: 'christian', description: 'Commemorating the crucifixion of Jesus Christ' },
    { date: '2026-04-05', name: 'Easter Sunday', category: 'christian', description: 'Celebrating the resurrection of Jesus Christ' },
    { date: '2026-04-06', name: 'Easter Monday', category: 'christian', description: 'Day after Easter Sunday' },
    { date: '2026-05-14', name: 'Ascension Day', category: 'christian', description: 'Commemorating Jesus\'s ascension to heaven' },
    { date: '2026-05-24', name: 'Pentecost', category: 'christian', description: 'Celebrating the descent of the Holy Spirit' },
    { date: '2026-11-29', name: 'First Sunday of Advent', category: 'christian', description: 'Beginning of the Christian liturgical year' },
    { date: '2026-12-24', name: 'Christmas Eve', category: 'christian', description: 'Evening before Christmas Day' },
    { date: '2026-12-25', name: 'Christmas Day', category: 'christian', description: 'Celebrating the birth of Jesus Christ' },
    { date: '2026-12-26', name: 'Boxing Day', category: 'christian', description: 'Traditional day of giving to the less fortunate' },

    // SPECIAL DAYS
    { date: '2026-02-14', name: 'Valentine\'s Day', category: 'special', description: 'Day of love and romance' },
    { date: '2026-03-08', name: 'International Women\'s Day', category: 'special', description: 'Celebrating women\'s achievements and advocating for equality' },
    { date: '2026-04-22', name: 'Earth Day', category: 'special', description: 'Promoting environmental protection and awareness' },
    { date: '2026-05-10', name: 'Mother\'s Day', category: 'special', description: 'Honoring mothers and motherhood' },
    { date: '2026-06-21', name: 'Father\'s Day', category: 'special', description: 'Honoring fathers and fatherhood' },
    { date: '2026-12-31', name: 'New Year\'s Eve', category: 'special', description: 'Celebration on the last day of the year' },
];

// Category colors for visual distinction
const categoryColors = {
    bangladeshi: '#006A4E', // Bangladesh green
    american: '#B22234', // USA red
    christian: '#663399', // Purple
    special: '#FF1493', // Deep pink
    gpbc: '#FF8C00' // GPBC orange
};

// Category emojis
const categoryEmojis = {
    bangladeshi: '🇧🇩',
    american: '🇺🇸',
    christian: '✝️',
    special: '❤️',
    gpbc: '⛪'
};

// Load custom GPBC events from localStorage
function loadCustomEvents() {
    const saved = localStorage.getItem('gpbcEvents');
    if (saved) {
        const customEvents = JSON.parse(saved);
        customEvents.forEach(event => {
            if (!events.find(e => e.date === event.date && e.name === event.name)) {
                events.push(event);
            }
        });
    }
}

// Save custom GPBC events to localStorage
function saveCustomEvents() {
    const gpbcEvents = events.filter(e => e.category === 'gpbc');
    localStorage.setItem('gpbcEvents', JSON.stringify(gpbcEvents));
}

// Load custom events on initialization
loadCustomEvents();

// Function to add recurring Sunday church services for entire year
function addRecurringSundayServices() {
    const year = 2026;
    
    // Remove all existing Sunday services first
    for (let i = events.length - 1; i >= 0; i--) {
        if (events[i].category === 'gpbc' && 
            (events[i].name === 'GPBC Bangla Church Service' || events[i].name === 'Holy Communion Service')) {
            events.splice(i, 1);
        }
    }
    
    // Loop through all months
    for (let month = 0; month < 12; month++) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        let firstSundayFound = false;
        
        // Find all Sundays in this month
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const currentDate = new Date(year, month, day);
            
            // Check if it's Sunday (0 = Sunday)
            if (currentDate.getDay() === 0) {
                const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                
                // First Sunday of the month - Holy Communion Service
                if (!firstSundayFound) {
                    events.push({
                        date: dateString,
                        name: 'Holy Communion Service',
                        category: 'gpbc',
                        description: 'Holy Communion Service at 5:00 PM - Grace and Praise Bangladeshi Church, 1325 Richardson Street, CA 92408'
                    });
                    firstSundayFound = true;
                } else {
                    // Regular Sunday service
                    events.push({
                        date: dateString,
                        name: 'GPBC Bangla Church Service',
                        category: 'gpbc',
                        description: 'Bangla Church Service at 5:00 PM - Grace and Praise Bangladeshi Church, 1325 Richardson Street, CA 92408'
                    });
                }
            }
        }
    }
    
    // Save to localStorage
    saveCustomEvents();
}

// Add Sunday services when page loads
addRecurringSundayServices();
